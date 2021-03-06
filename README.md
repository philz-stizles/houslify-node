# Houslify

![example workflow](https://github.com/philz-stizles/houslify-node/actions/workflows/test-houslify.yml/badge.svg)
[![codecov](https://codecov.io/gh/philz-stizles/houslify-node/branch/main/graph/badge.svg?token=G5FWOA2QK1)](https://codecov.io/gh/philz-stizles/houslify-node)

## Introduction

This is a real estate platform

## Technologies

- Node, Express,
- REST, GraphQL, Sockets
- Typescript, Eslint, Prettier
- Jest, Istanbul, Supertest
- AWS SES, S3, EC2, Serverless
- Cloudinary
- MongoDB, Redis
- Docker

## Features

- Multitenancy
- Authentication, Authorization
- Crone jobs, and schedulers
- GraphQL DataSources
- Testing and coveralls

## Typescript

- Overview:
  - Helps us catch errors during development
  - Only active during development
  - Does not provide any performance optimization
  - Neither your browser nor node JS know what typescript is
  - Typescript compiler reads our code, checks for errors and convert it to plain js
- Install packages:
  - npm install -g typescript ts-node
  - npm install -D typescript ts-node tsconfig-paths @types/node @types/express
- Create tsconfig file: npx tsc --init

## Configure Eslint

- Install vscode eslint plugin
- Recommendation to install eslint on a local level: npm install -D eslint
- Configure eslint: npx eslint --init

  - To check syntax, find problems, and enforce code style
  - JavaScript modules (import/export)
  - Which framework does your project use? None of these
  - Does your project use TypeScript? » Yes
  - Where does your code run? Node
  - How would you like to define a style for your project?
    Use a popular style guide
    Airbnb: https://github.com/airbnb/javascript
  - What format do you want your config file to be in? JavaScript
  - Would you like to install them now with npm? » Yes

- Create .eslintignore file: touch .eslintignore
  add:
  node_modules
  dist
  coverage

- Install import resolver(optional): npm install -D eslint-import-resolver-typescript tsconfig-paths
- Reload vscode for configurations to kick in: ctrl + shift + p > reload

## Configure Prettier

- Install vscode eslint plugin
- Install prettier in project: npm install -D prettier

  {
  "semi": true,
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "avoid",
  "jsxBracketSameLine": true
  }

- Install prettier eslint plugins: npm install -D eslint-config-prettier eslint-plugin-prettier eslint-plugin-node
  eslint-config-prettier: 
  eslint-plugin-prettier:
  eslint-plugin-node:

## Jest

- Install dependencies: npm install -D jest ts-jest @types/jest supertest
- Configure eslint: npx ts-jest config:init
- Add your configs to 'jest.config.js'
- Configure '.eslintrc.js':
  env: {
  ...
  jest: true,
  },
- Configure 'package.json'
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",

## Environment Variables

- install packages
  npm i dotenv-safe
  npm i --save-dev @types/dotenv-safe
- Create files '.env.example' and '.env'

## Sequelize

  Create .sequelizerc file:

    ```js
      const path = require('path');

      module.exports = {
        config: path.resolve('./src/db/config', 'config.js'),
        'models-path': path.resolve('./src/db', 'models'),
        'seeders-path': path.resolve('./src/db', 'seeders'),
        'migrations-path': path.resolve('./src/db', 'migrations'),
      };
    ```

  Install sequelize in project:

      npm install --save sequelize

  Install the sequelize-cli:

      npm install --save-dev sequelize-cli
      npx sequelize --help

  Project Bootstrapping:

      npx sequelize-cli init

  Create database:
  
      npx sequelize-cli db:create

  Create model:

      npx sequelize-cli model:generate --name User --attributes username:string,age:integer,isActive:boolean,createdAt:date,updatedAt:date

  Run Migrations:

      npx sequelize-cli db:migrate

  DataTypes.STRING    // VARCHAR(255)
  DataTypes.TEXT      // Text
  DataTypes.BOOLEAN   // TINYINT(1)
  DataTypes.INTEGER   // Integer
  DataTypes.FLOAT     // Float
  DataTypes.DOUBLE    // Double
  DataTypes.DECIMAL   // Decimal
  DataTypes.DATE      // Date
  DataTypes.DATEONLY  // Date without time

## File Uploads

- multer - for parsing, validation etc
- formidable
- sharp:
  - description: for resizing
  - installation:
    npm install sharp | yarn add sharp
    [typescript] npm install @types/sharp | yarn add @types/sharp
- cloudinary:
- aws sdk

## Bull

## Redis

## 2FA Authentication

npm i speakeasy
npm i qrcode

## GraphQL

Install packages:

type definitions: npm install @graphql-tools/load-files @graphql-tools/merge

    npm install @graphql-tools/load-files @graphql-tools/schema @graphql-tools/utils
    npm install apollo-datasource-mongodb
    npm install apollo-server-cache-redis
    npm install apollo-server-express
    npm install graphql
    npm install graphql-subscriptions
    npm install graphql-upload

## Socket.io

- install packages
  npm install socket.io --save
  npm install --save-optional bufferutil utf-8-validate
- Definitions:
  bufferutil: Allows to efficiently perform operations such as masking and unmasking the data payload of the WebSocket frames.
  utf-8-validate: Allows to efficiently check if a message contains valid UTF-8 as required by the spec.

## AWS

aws-sdk: npm install aws-sdk

## Pre-Deployment

- Ensure .gitignore with node_modules, .env(secrets) on both client and server
- (Recommended)Implement code splitting on react client

## Deployment

- Heroku deploy

  - Limitations:
    - Database: You may need to use cloud mongo
  - Implementation:

    - Travis CI:
      Download and install Ruby
      gem install travis
      travis version
      npm install -g heroku
      heroku login
      heroku authorizations:create
      cd to project root
      Generate a github personal token: Settings > Developer > Personal access tokens Generate new token
      Travis Project > More options > Settings > Environment variables
      name: GH_TOKEN value: <token> Add
      travis login --com --github-token <token>
      travis encrypt $(heroku auth:token) --com --add deploy.api_key
      heroku logs -a <app-name> --tail

    - Circle CI

- Digital Ocean deploy

## Swagger Documentation

- Resources:

  - [API general info](https://swagger.io/docs/specification/api-general-info/)

- http://localhost:<PORT>/api-docs.

## Security issues and best practices

Compromised Database

    - Strongly encrypt passwords with salt and hash (bcrypt)
    - Strongly encrypt password reset tokens (SHA 256)

Brute Force Attacks

    - Use bcrypt to make login requests slow
    - Implement rate limiting(npm install express-rate-limit) which limits the no of requests from on single IP
    - Implement max login attempts

Cross-site Scripting Attacks

    - Store JWT in HTTPOnly cookies
    - Sanitize user input data
    - Set special HTTP headers(helmet)

Cross-site Scripting Attacks - This attack allows the attacker to read the localStorage which is the reason we should never store token in localstorage

    - Store JWT in HTTPOnly cookies
    - Sanitize user input data
    - Set special HTTP headers(helmet)

Sanitization

    - xss-clean
    - express-mongo-sanitize

npm i --save-dev @types/morgan @types/hpp

- -JWT_EXPIRES_IN=90d # 30s | 5m | 5h | 1d
  xss-clean
  create folder '@types'
  Add "../@types" to tsconfig.json's typeRoots attribute along with "../node_modules/@types" if it is not already there
  .d.ts declare module 'xss-clean';

  express-mongo-sanitize
  @types/express-mongo-sanitize

  express-rate-limit
  @types/express-rate-limit

  helmet

  cors
  @types/cors

  compression
  @types/compression

nodemailer

// Put as much business logic in the models to keep the controllers as simple and lean as possible, so that controllers can focus on handling requests and interacting with models and send responses

// Configure Eslint & Prettier: npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-markdown

DATA MODELLING
This is the process of converting unstructured data from real-world scenarios into structured, logical data models

// BUNDLING MVC JS FILES
parcel - npm install --save-dev parcel-bundler
package.json
"scripts": {
...,
"watch:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js"
},

// TESTING
npm install --save-dev jest

jest --watchAll

npm run test

// CHALLENGES => TODO
// Users can only review a tour that they have actually booked

mongoose@5.11.16
node@14.15.5
typescript@4.1.5

-JWT_EXPIRES_IN=90d # 30s | 5m | 5h | 1d
xss-clean
express-mongo-sanitize
express-rate-limit
helmet
cors
compression

nodemailer

// Put as much business logic in the models to keep the controllers as simple and lean as possible, so that controllers can focus on handling requests and interacting with models and send responses

// Configure Eslint & Prettier: npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
//
//
//
// SECURITY ISSUES AND BEST PRACTISES
// Compromised Database
// - Strongly encrypt passwords with salt and hash (bcrypt)
// - Strongly encrypt password reset tokens (SHA 256)
//
// Brute Force Attacks
// - Use bcrypt to make login requests slow
// - Implement rate limiting(npm install express-rate-limit) which limits the no of requests from on single IP
// - Implement max login attampts
//
// Cross-site Scripting Attacks
// - Store JWT in HTTPOnly cookies
// - SAanitize user input data
// - Set special HTTP headers(helmet)
//
// Cross-site Scripting Attacks - This attack allows the attacker to read the localStorage which is the reason we should never store token in localstorage
// - Store JWT in HTTPOnly cookies
// - SAanitize user input data
// - Set special HTTP headers(helmet)
//
// Sanitization
// - xss-clean
// - express-mongo-sanitize

// FILE UPLOADS

- multer - for parsing, validation etc
- sharp - for resizing

DATA MODELLING
This is the process of converting unstructured data from real-world scenarios into structured, logical data models

// BUNDLING MVC JS FILES
parcel - npm install --save-dev parcel-bundler
package.json
"scripts": {
...,
"watch:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js"
},

// TESTING
npm install --save-dev jest

jest --watchAll

npm run test

// DEPLOYMENT

// CHALLENGES => TODO
// Users can only review a tour that they have actually booked
# hously-node

"scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    // "db:reset": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all",
    "db:reset": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate",
    "test": "cross-env NODE_ENV=test jest --testTimeout=10000",
    "test:ci": "cross-env NODE_ENV=test jest --testTimeout=10000",
    "test:watch": "cross-env NODE_ENV=test jest --watchAll",
    "pretest": "cross-env NODE_ENV=test npm run db:reset",
    "db:create:test": "cross-env NODE_ENV=test npx sequelize-cli db:create"
  },