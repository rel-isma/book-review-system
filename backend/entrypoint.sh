#!/bin/sh
# backend/entrypoint.sh

# Wait for postgres
while ! nc -z db 5432; do
  echo "Waiting for postgres..."
  sleep 1
done

echo "PostgreSQL started"

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver 0.0.0.0:8000