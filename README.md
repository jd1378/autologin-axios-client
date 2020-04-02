# autologin-axios-client

a quick wrapper around axios-auth-refresh for specific needs and defaults. for nodejs use.

does autologin on 401 response and redo the request.

## Installation

```bash
npm i autologin-axios-client
# or
yarn add autologin-axios-client
```

## Usage

add user pass to .env

```env
ALXC_USER="user"
ALXC_PASS="pass"
```

dotenv module autoloads the .env and you can use in your refreshAuthLogic

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

or

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
    // it will send { email_or_mobile_number: process.env.ALXC_USER, password: process.env.ALXC_PASS }
    tokenPath: 'data.token',
    tokenType: 'Bearer',
  }
})
// start calling authorized api
axios.post('/users/delete-all');
```
