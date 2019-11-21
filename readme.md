<p align="center"><img height="100px" src="![vue-spa-with-laravel](https://user-images.githubusercontent.com/47023016/69350196-ad05c980-0cab-11ea-9c16-6c86834bf8a2.png)
"></p>

## Introduction

Laravue is an Admin starter template for Laravel 5.7 PHP Framework which includes all the necessary boilerplate for your next web application.

# Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Features](#features)
4. [Documentation](#documentation)
5. [Versions](#versions)
6. [License](#license)

## Requirements

SERVER REQUIREMENTS:
- PHP >= 7.1.3
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

OPTIONAL REQUIREMENTS:
- Composer
- NPM / YARN

## Installation

1. Run `git clone https://github.com/gh0zialfat1h/Laravue.git`
2. Using your preferred terminal , go to the laravue folder and run the following command to set a random secure Application Key `php artisan key:generate`
3. Open `.env` file in your favorite text editor and set the database credentials.
4. Open `database/seeds/UsersTableSeeder.php` and change the admin's email & password to your preference.
5. `php artisan migrate --seed` run this command to migrate & seed the database. ( Make sure that you're inside the app's root directory )
6. Install NPM globally if you haven't installed that already , for more information please refer this [Link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
7. After installing NPM globally , run `npm install` inside your webroot , it will download all the required dependencies.
8. Run `npm run dev` for compiling sass and js files.
9. Laraspace makes use of `Laravel Mix` for compiling sass files and js files (webpack).
10. You are ready to launch!
