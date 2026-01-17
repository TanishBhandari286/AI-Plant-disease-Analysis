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
