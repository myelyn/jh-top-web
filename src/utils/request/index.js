import axios from "axios";
import NProgress from "nprogress";

axios.defaults.baseURL = "/jh";
axios.defaults.timeout = 30e3;

axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  (response) => {
    NProgress.done()
    const { data } = response;
    if (data.code >= 200 && data.code < 300 || data.code === 0) {
      return data
    }
    return Promise.reject(data)
  },
  (error) => {
    NProgress.done()
    const err = {
      code: 500,
      msg: error.message || "请求失败",
    }
    return Promise.reject(err);
  }
);

export default axios