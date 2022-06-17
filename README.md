# HELPDESK («Help Desk Service»)

Web Application of Technical Support Department.

<img src="/static/img/social-preview.png">

## Demo application -> [Helpdesk service](https://helpdesk-service.herokuapp.com/)

```bash
  # User account of demo application

  LOGIN: user
  PASSWORD: password
```

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```bash
# install dependencies
$ npm install
```

## Create env config key

```bash
# API_URI key
API_URI=http://localhost:3000
# MONGO_URI key
MONGO_URI=mongodb://user:password@localhost:27017/helpdesk
# BCRYPT_SALT key
BCRYPT_SALT=10
# TOKEN_EXPIRES_IN key
TOKEN_EXPIRES_IN=24h
# JWT_SECRET_KEY key
JWT_SECRET_KEY=JWT_SECRET_KEY
```

## Run dev application

```bash
# serve with hot reload at localhost:3000
$ npm run dev
```

## Build application

```bash
# build for production
$ npm run build
```

## Running application

```bash
# run production and launch server
$ npm run start
```

## Default login to the application

```bash
  LOGIN: helpdesk
  PASSWORD: ksedpleh
```

After starting the app on port (3000 as default) you can open
in your browser helpdesk by typing http://localhost:3000/.
