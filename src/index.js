/* eslint-disable no-param-reassign */
require('./config');
const createAuthRefreshInterceptor = require('axios-auth-refresh').default;
const get = require('lodash/get');
const { createAxiosInstance } = require('./axios');

function createAutoLoginAxiosInstance(options) {
  if (!options.baseURL) throw new Error('baseURL is mandatory');
  if (!options.headers) {
    options.headers = {
      common: {
        Accept: 'application/json',
      },
    };
  }
  // first one is used for refreshing token (no interceptors)
  const instance = createAxiosInstance(options);
  if (!options.refreshAuthLogic) {
    const authInfo = {
      loginUrl: '/login',
      userField: 'email_or_mobile_number',
      passField: 'password',
      tokenPath: 'token',
      tokenType: 'Bearer',
      ...options.refreshAuthInfo,
    };
    options.refreshAuthLogic = async (failedRequest) => {
      const data = {
        [authInfo.userField]: process.env.ALXC_USER,
        [authInfo.passField]: process.env.ALXC_PASS,
      };
      const resp = await instance.$post(authInfo.loginUrl, data, { skipAuthRefresh: true });
      const token = get(resp, authInfo.tokenPath, false);
      if (token) {
        instance.setToken(token, authInfo.tokenType);
      } else {
        throw new Error('Refresh token response invalid');
      }
    };
  }
  if (!options.refreshAuthOptions) {
    options.refreshAuthOptions = {
      skipWhileRefreshing: false,
    };
  }
  const id = createAuthRefreshInterceptor(
    instance,
    options.refreshAuthLogic,
    options.refreshAuthOptions,
  );
  instance.authRefreshInterceptorId = id;

  return instance;
}

module.exports = createAutoLoginAxiosInstance;
