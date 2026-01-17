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
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    
    # Frontend static files
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:8000/health;
    }
}
EOF

# Configure supervisord
COPY <<'EOF' /etc/supervisor/conf.d/supervisord.conf
[supervisord]
nodaemon=true
user=root
logfile=/var/log/supervisor/supervisord.log
pidfile=/var/run/supervisord.pid

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:backend]
command=uvicorn main:app --host 127.0.0.1 --port 8000
directory=/app
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
environment=PYTHONUNBUFFERED=1
EOF

# Create log directory
RUN mkdir -p /var/log/supervisor

# Create entrypoint script for handling credentials
COPY <<'ENTRYPOINT' /app/entrypoint.sh
#!/bin/bash
set -e

# Handle Google Cloud credentials from base64 encoded env var
if [ -n "$GOOGLE_CLOUD_CREDENTIALS_BASE64" ]; then
    echo "Setting up Google Cloud credentials..."
    echo "$GOOGLE_CLOUD_CREDENTIALS_BASE64" | base64 -d > /app/credentials.json
    export GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json
fi

# Start supervisord
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
ENTRYPOINT

RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start application
ENTRYPOINT ["/app/entrypoint.sh"]
