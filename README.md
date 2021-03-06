# autologin-axios-client

a quick wrapper around [`axios-auth-refresh`](https://github.com/Flyrell/axios-auth-refresh) for specific needs and defaults. for nodejs use.

does autologin on 401 response and redo the request.

## Installation

```bash
npm i autologin-axios-client
# or
yarn add autologin-axios-client
```

## Usage

```js
const Axios = require('autologin-axios-client');
const axios = new Axios({
  baseUrl: 'https://example.com/api',
  refreshAuthLogic: (failedRequest: any) => Promise<any>,
  refreshAuthOptions: {
    // options for 'axios-auth-refresh'
  },
})
// start calling authorized api
axios.post('/users/delete-all');
```

or use the defaults and provide following env variables using `dotenv` module or other means.

```js
const Axios = require('autologin-axios-client');
const axios = new Axios({
  baseUrl: 'https://example.com/api',
  refreshAuthInfo: {
    // change any of the defaults , use one or more
    // all are optional
    loginUrl: '/login',
    userField: 'email_or_mobile_number',
    passField: 'password',
    user: process.env.ALXC_USER,
    pass: process.env.ALXC_PASS,
    // it will send { email_or_mobile_number: user, password: pass }
    tokenPath: 'token',
    tokenType: 'Bearer',
  }
})
// start calling authorized api
axios.post('/users/delete-all');
```
