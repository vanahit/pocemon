import qs from "qs";
import axios from "axios";

export default class ApiClient {
  configs = {};
  defaultConfigs = {};

  constructor() {
    let headers = {
      "Content-Type": "application/json"
    };
    this.defaultConfigs = {
      headers,
      params: {}
    };

    this.resetConfigs();
  }

  getRuntimeConfigs() {
    let headers = {
      "Content-Type": "application/json"
    };

    return Object.assign({}, this.configs, {
      headers
    });
  }

  resetConfigs() {
    this.configs = Object.assign({}, this.defaultConfigs);
  }

  setConfig(key, value) {
    console.log(key, value);
    this.configs = Object.assign({}, this.configs, {
      [key]: value
    });
  }

  mergeConfigs(params, headers, configs) {
    const runtimeConfigs = this.getRuntimeConfigs();
    let responseType = {};
    if (params && params.responseType) {
      responseType = params.responseType;
    }
    return Object.assign(
      {},
      runtimeConfigs,
      Object.assign(
        {},
        configs,
        {
          ...responseType,
          params: Object.assign({}, runtimeConfigs.params, params),
          headers: Object.assign({}, runtimeConfigs.headers, headers),
          paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: "brackets" });
          }
        }
      )
    );
  }


  get(uri, params = {}, headers = {}, configs = {}) {
    return axios.get(`${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  post(uri, data, params = {}, headers = {}, configs = { hasFile: false }) {
    let formData = new FormData();

    if (configs.hasFile) {
      for (let key in data) {
        if (Array.isArray(data[key])) {
          for (let i = 0; i < data[key].length; i++) {
            formData.append(`${key}[]`, data[key][i]);
          }
        } else {
          formData.set(key, data[key]);
        }
      }
      data = formData;
    }
    return axios.post(`${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }
}
