#!/bin/bash
set -e

PROJECT_DIR="/home/user/laravel-app"

# 1️⃣ Check for PHP
if ! command -v php >/dev/null 2>&1; then
  echo "❌ PHP is not installed or not available in PATH."
  exit 1
fi

# 2️⃣ Create Laravel app if missing
if [ ! -f "$PROJECT_DIR/artisan" ]; then
  echo "🛠️ Creating Laravel project..."
  composer create-project laravel/laravel "$PROJECT_DIR" --no-interaction --prefer-dist
fi

cd "$PROJECT_DIR"

# 3️⃣ Laravel setup
if [ -f artisan ]; then
  php artisan key:generate || true
  php artisan migrate --force || true
else
  echo "❌ Laravel 'artisan' not found. Laravel install might have failed."
  exit 1
fi

# 4️⃣ Start Laravel server (background)
php artisan serve --host=0.0.0.0 --port=8000 &

# 5️⃣ Wait until Laravel responds
until curl -s -o /dev/null -w "%{http_code}" http://localhost:8000 | grep -q 200; do
  echo "⏳ Waiting for Laravel to boot..."
  sleep 0.5
done

echo "✅ Laravel is running on http://localhost:8000"
wait