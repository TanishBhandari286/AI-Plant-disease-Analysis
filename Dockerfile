# ==========================================
# AgroVision - Multi-stage Production Build
# ==========================================

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy frontend source
COPY frontend/ .

# Build argument for API URL (will be /api in production with nginx proxy)
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}

# Build frontend
RUN npm run build


# Stage 2: Build Backend
FROM python:3.12-slim AS backend-builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install --no-cache-dir uv

# Copy dependency files
COPY backend/pyproject.toml backend/uv.lock ./

# Install dependencies
RUN uv pip install --system -r pyproject.toml


# Stage 3: Production Runtime
FROM python:3.12-slim AS production

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    libpq5 \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies from builder
COPY --from=backend-builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=backend-builder /usr/local/bin /usr/local/bin

# Copy backend application
COPY backend/main.py backend/app ./
COPY backend/app ./app

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Configure nginx
RUN rm /etc/nginx/sites-enabled/default 2>/dev/null || true
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configure supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create log directory
RUN mkdir -p /var/log/supervisor

# Copy and setup entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start application
ENTRYPOINT ["/app/entrypoint.sh"]
