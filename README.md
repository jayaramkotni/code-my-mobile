## Get Started

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/) LTS version(minimium v12.14.1)
- [NPM](https://npmjs.org/) - Node package manager (6.13.4)
- [POSTGRESQL](https://www.postgresql.org/) (> 10.0.0)

### 2. Installation

On the command prompt run the following commands:

``` 
 $ git clone https://github.com/Bikranshu/express-react-boilerplate.git
 $ cd code-my-mobile
 $ cp .env.example .env (edit it with your secret key and database information)
 $ npm install
 $ npm run migrate:dev
 $ npm run seed:dev
 ```
 Finally, start and build the application:
 
 ```
  $ npm run start:dev (For development)
 ```

List of NPM Commands:
 
  ```
  $ npm debug          # To run API server in debug mode
  $ npm start          # To start only API server (For development)
  $ npm start:app      # To start only APP(For development)
  $ npm run lint       # linting
  $ npm run clean      # remove dist and node_modules folder and install dependencies
 ```

### 3. Usage

URL : http://localhost:3000/

### 5. API'S
```
  DESC:To get all users with pagination
  API: http://localhost:3000/v1/users 
  METHOD: GET
  QUERY-PARAMTERS:page,page_size

  usage: http://localhost:3000/v1/users?page=1&page_size=10
```
```
  DESC:To get all friends of specified user
  API: http://localhost:3000/v1/users/:user_id/friends  
  METHOD: GET
   
  usage:http://localhost:3000/v1/users/1/friends 
```
```
  DESC:To get all friends of specified user
  API: http://localhost:3000/v1/users/:user_id/friends-of-friends  
  METHOD: GET
   
  usage:http://localhost:3000/v1/users/1/friends 
```

    
### 4. Useful Link
- Web framework for Node.js - [Express](http://expressjs.com/)
- Sequelize ORM - [Sequelize](https://sequelize.org/)
- Code linting tool - [ESLint](http://eslint.org/)

