#!/bin/bash
set -e

# Define app directory
APP_DIR="/home/e2b/laravel-app"

# Ensure Composer is installed
if ! command -v composer &> /dev/null; then
  echo "Installing Composer..."
  curl -sS https://getcomposer.org/installer | php
  mv composer.phar /usr/local/bin/composer
fi

# Create Laravel project if not exists
if [ ! -d "$APP_DIR" ]; then
  echo "Creating Laravel app..."
  composer create-project laravel/laravel "$APP_DIR" --no-interaction
fi

cd "$APP_DIR"

ls

php -v

php artisan about

# Set up SQLite DB
touch database/database.sqlite

# Update .env for SQLite
cp .env.example .env
sed -i "s/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/" .env
sed -i "s/DB_HOST=.*/#DB_HOST=127.0.0.1/" .env
sed -i "s/DB_PORT=.*/#DB_PORT=3306/" .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=database\/database.sqlite/" .env
sed -i "s/DB_USERNAME=.*/#DB_USERNAME=root/" .env
sed -i "s/DB_PASSWORD=.*/#DB_PASSWORD=/" .env

# Generate Laravel key
php artisan key:generate

# Start Laravel dev server
echo "Starting Laravel server on http://0.0.0.0:8000"
php artisan serve --host=0.0.0.0 --port=8000