/* eslint-disable no-param-reassign */
const createAuthRefreshInterceptor = require('axios-auth-refresh');
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
    options.refreshAuthLogic = async (failedRequest) => {
      const resp = await instance.post('/login', {
        email_or_mobile_number: process.env.ALXC_USER,
        password: process.env.ALXC_PASS,
      }, { skipAuthRefresh: true });
      const token = get(resp, 'data.token', false);
      if (token) {
        instance.setToken(token, 'Bearer');
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
  createAuthRefreshInterceptor(instance, options.refreshAuthLogic, options.refreshAuthOptions);
  return instance;
}
