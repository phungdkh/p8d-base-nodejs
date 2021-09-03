import axios from "axios";
import qs from "qs";
import _ from "lodash";

axios.defaults.timeout = 90000;

const requestHelper = {
  setupInterceptors: (history, intl) => {
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        return response;
      },
      e => {
        const error = { ...e };
        console.log(e);
        return Promise.reject(e);
      }
    );
  },
  request(config = {}) {
    return axios.request(config);
  },
  get(url, params, config = {}) {
    return axios.get(
      url,
      _.assign({}, config, {
        params,
        paramsSerializer: _params => {
          return qs.stringify(_params, { arrayFormat: "repeat" });
        }
      })
    );
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  },
  upload(url, data = {}) {
    return axios.post(url, data, {
      "Content-Type": "multipart/form-data; charset=utf-8;"
    });
  },
  download(url, params, config = {}) {
    config.responseType = "blob";
    return axios.get(
      url,
      _.assign({}, config, {
        params,
        paramsSerializer: _params => {
          return qs.stringify(_params, { arrayFormat: "repeat" });
        }
      })
    );
  }
};

export default requestHelper;
