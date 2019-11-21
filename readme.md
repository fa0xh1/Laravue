<p align="center"><img height="4000px" width="100%" src="https://user-images.githubusercontent.com/47023016/69350196-ad05c980-0cab-11ea-9c16-6c86834bf8a2.png"></p>

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

## Features

# Login Page (Use default you can modify)
![login](https://user-images.githubusercontent.com/47023016/69351293-a710e800-0cad-11ea-84f3-77574bffd607.png)

# SignUp Page (Use default you can modify)
![Screenshot from 2019-11-21 22-22-28](https://user-images.githubusercontent.com/47023016/69351377-cf98e200-0cad-11ea-9018-c0996942550c.png)

# List Users Page
![list_users](https://user-images.githubusercontent.com/47023016/69351339-b98b2180-0cad-11ea-96ff-2bc943efa18e.png)

# Profile Page (You can edit anything)
![profile](https://user-images.githubusercontent.com/47023016/69351428-e808fc80-0cad-11ea-8816-862d1c75518a.png)


