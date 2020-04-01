# autologin-axios-client

a nodejs package that gives an axios instance that auto logins with given credentials. reads user and pass from .env of CWD.

## Installation

```bash
npm i laravel-axios-client
# or
yarn add laravel-axios-client
```

## Usage

Currently only bearer token is supported.
add user pass to .env

```env
LAXC_USER="user"
LAXC_PASS="pass"
```

then

```js
const Axios = require('autologin-axios-client');
const axios = new Axios({
  baseUrl: 'https://example.com/api',
  loginUrl: '/login',
  loginScheme: {
    user: 'username',
    pass: 'password',
    // sends { 'username': LAXC_USER, 'password': LAXC_PASS } to loginUrl
  },
  type: 'bearer' // only bearer supported right now
  tokenPath: 'data.token'
})
// start calling authorized api
axios.post('/users/delete-all');
```
