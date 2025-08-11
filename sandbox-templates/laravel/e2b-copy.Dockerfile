FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# --- System base ---
RUN apt-get update && apt-get install -y \
    lsb-release apt-transport-https ca-certificates curl gnupg2 git unzip zip

# --- PHP 8.3 via Sury ---
RUN curl -fsSL https://packages.sury.org/php/apt.gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/php.gpg && \
    echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list && \
    apt-get update && apt-get install -y \
    php8.3 php8.3-cli php8.3-mbstring php8.3-xml php8.3-curl php8.3-zip \
    php8.3-gd php8.3-intl php8.3-bcmath php8.3-tokenizer php8.3-pdo \
    php8.3-sqlite3 php8.3-dom php8.3-fileinfo php8.3-opcache

# --- Composer ---
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# --- Create empty working directory ---
WORKDIR /home/user
RUN mkdir laravel-app

# --- Copy and make compile script executable ---
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# --- Set sandbox-safe permissions ---
RUN chown -R www-data:www-data /home/user
USER www-data

EXPOSE 8000
CMD ["/compile_page.sh"]