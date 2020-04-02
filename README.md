# autologin-axios-client

a quick wrapper around axios-auth-refresh for specific needs and defaults. for nodejs use.

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
  refreshAuthOptions: {} // options for 'axios-auth-refresh'
})
// start calling authorized api
axios.post('/users/delete-all');
```
