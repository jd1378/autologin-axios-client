/* eslint-disable no-restricted-syntax,
  prefer-spread,prefer-rest-params,
  func-names, no-param-reassign  */
// following code is borrowed from nuxt's axios module
const Axios = require('axios').default;

const axiosExtra = {
  setBaseURL(baseURL) {
    this.defaults.baseURL = baseURL;
  },
  setHeader(name, value, scopes = 'common') {
    for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return;
      }
      this.defaults.headers[scope][name] = value;
    }
  },
  setToken(token, type, scopes = 'common') {
    const value = !token ? null : (type ? `${type} ` : '') + token;
    this.setHeader('Authorization', value, scopes);
  },
};
for (const method of [
  'request',
  'delete',
  'get',
  'head',
  'options',
  'post',
  'put',
  'patch',
]) {
  axiosExtra[`$${method}`] = function () {
    return this[method].apply(this, arguments).then((res) => res && res.data);
  };
}

const extendAxiosInstance = (axios) => {
  for (const key of axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios);
  }
};

const createAxiosInstance = (axiosOptions) => {
  if (!axiosOptions.headers) {
    axiosOptions.headers = {};
  }
  // Don't accept brotli encoding because Node can't parse it
  axiosOptions.headers.common['accept-encoding'] = 'gzip, deflate';

  const axios = Axios.create(axiosOptions);
  axios.CancelToken = Axios.CancelToken;
  axios.isCancel = Axios.isCancel;

  // Extend axios proto
  extendAxiosInstance(axios);
  return axios;
};

module.exports = { createAxiosInstance };
