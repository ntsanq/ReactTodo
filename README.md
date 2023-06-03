# React TODO App training

This repository is for practicing with React. It's not used by any client. Ticket https://kmtbase.atlassian.net/browse/KMTDH-180

## To run this project

#### Requirements
- PHP : v8.0 or higher. [Install PHP](https://nextgentips.com/2022/01/31/how-to-install-php-8-1-on-ubuntu-20-04/?noamp=mobile)
- MySQL : v8.0. [Install MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)
- Composer : v2.3.7.[Install Composer](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04)

#### Set up

Clone this project:
```sh  
$ git clone git@gitlab.kosmonaut.tools:nfq/react-todo-app-training.git
``` 

Run Backend server:
- Create a database for use and add the name to your `packages/server/.env`

```sh                                     
$ cd react-todo-app-training/packages/server
$ php artisan migrate
$ php artisan serve
``` 

Run Frontend server:
```sh  
$ cd react-todo-app-training/packages/frontend
$ npm install
$ npm start
``` 
