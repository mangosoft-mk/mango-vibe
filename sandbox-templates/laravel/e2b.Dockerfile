# Base PHP image
FROM php:8.3-cli

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    zip \
    libzip-dev \
    libsqlite3-dev \
    sqlite3 \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo pdo_sqlite zip

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Set working directory
WORKDIR /var/www

# Create new Laravel project
RUN composer create-project laravel/laravel laravel-app --no-interaction

# Move into project directory
WORKDIR /var/www/laravel-app

# Set up SQLite database
RUN touch database/database.sqlite

# Configure Laravel .env for SQLite
RUN cp .env.example .env && \
    sed -i "s/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/" .env && \
    sed -i "s/DB_HOST=.*/#DB_HOST=127.0.0.1/" .env && \
    sed -i "s/DB_PORT=.*/#DB_PORT=3306/" .env && \
    sed -i "s/DB_DATABASE=.*/DB_DATABASE=database\/database.sqlite/" .env && \
    sed -i "s/DB_USERNAME=.*/#DB_USERNAME=root/" .env && \
    sed -i "s/DB_PASSWORD=.*/#DB_PASSWORD=/" .env

# Generate Laravel app key
RUN php artisan key:generate

# Make artisan available globally
RUN ln -s /var/www/laravel-app/artisan /usr/local/bin/artisan

# Create /compile_page.sh
RUN echo '#!/bin/bash\nphp /var/www/laravel-app/artisan serve --host=0.0.0.0 --port=8000' > /compile_page.sh \
    && chmod +x /compile_page.sh

# Expose Laravel port
EXPOSE 8000

# Start Laravel app using E2B expected script
CMD ["/compile_page.sh"]