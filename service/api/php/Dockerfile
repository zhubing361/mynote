FROM php:7.4.0-cli-alpine3.10

WORKDIR /web/mynote-api-php
COPY . /web/mynote-api-php

# install dependency
RUN apt-get update
RUN apt-get install -y autoconf pkg-config libssl-dev

# install composer
RUN cd /tmp \
    && wget https://mirrors.aliyun.com/composer/composer.phar \
    && chmod u+x composer.phar \
    && mv composer.phar /usr/local/bin/composer \
    && composer config -g repo.packagist composer https://mirrors.aliyun.com/composer \
    && echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc

# install mongo ext
RUN pecl install mongodb-1.13.0
RUN echo "extension=mongodb.so" >> /usr/local/etc/php/conf.d/mongodb.ini

RUN composer install
RUN cd /web/mynote-api-php/src

EXPOSE 5002
CMD ["php", "-S", "127.0.0.1:5002"]


# docker build -t mynote-api-php .