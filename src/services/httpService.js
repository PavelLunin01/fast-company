import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorageService";
import authService from "./authService";
const http = axios.create({
  baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      const expiresDate = localStorageService.getTokenExpireDate();
      const refreshToken = localStorageService.getRefreshToken();
      if (refreshToken && expiresDate < Date.now()) {
        const data = await authService.refresh();
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        });
      };
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id ? Object.keys(data).map((key) => ({
    ...data[key]
  }))
    : data;
};

http.interceptors.response.use(
  (res) => {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error("Something wrong. Try latter");
    }
    return Promise.reject(error);
  });

const httpService = {
  get: http.get,
  put: http.put,
  post: http.post,
  patch: http.patch,
  delete: http.delete
};

export default httpService;
