# Use Python 3.12 slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install uv for faster Python package management
RUN pip install --no-cache-dir uv

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install Python dependencies using uv
RUN uv pip install --system -r pyproject.toml

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Create entrypoint script to handle credentials
RUN echo '#!/bin/bash\n\
if [ -n "$GOOGLE_CLOUD_CREDENTIALS_BASE64" ]; then\n\
    echo "Decoding Google Cloud credentials from base64..."\n\
    echo "$GOOGLE_CLOUD_CREDENTIALS_BASE64" | base64 -d > /app/credentials.json\n\
    export GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json\n\
fi\n\
exec uvicorn main:app --host 0.0.0.0 --port 8000\n\
' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Run the application
ENTRYPOINT ["/app/entrypoint.sh"]
