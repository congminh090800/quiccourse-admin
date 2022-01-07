import axios from "axios";
import router from "./router";
import store from "./store";
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000,
});

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const onAccessTokenFetched = (accessToken) => {
  subscribers.forEach((callback) => {
    callback(accessToken);
  });
  subscribers = [];
};

const addSubscriber = (callback) => {
  subscribers.push(callback);
};

http.interceptors.request.use(
  function (config) {
    let accessToken = "";
    if (
      store &&
      store.state &&
      store.state.auth &&
      store.state.auth.accessToken
    ) {
      accessToken = store.state.auth.accessToken;
    }
    if (!accessToken) {
      let localStore = localStorage.getItem("vuex-quiccourse-admin");
      if (localStore) {
        localStore = JSON.parse(localStore);
        accessToken = localStore?.auth?.accessToken || "";
      }
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const { config } = error;
    const originalRequest = config;
    const err = (error.response && error.response.data) || error;
    if (error.response && error.response.status === 401) {
      const refreshToken = store?.state?.auth?.refreshToken || "";
      if (refreshToken) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          store
            .dispatch("auth/refreshAccessToken")
            .then((accessToken) => {
              isAlreadyFetchingAccessToken = false;
              onAccessTokenFetched(accessToken);
            })
            .catch(() => {
              store.dispatch("auth/logout");
              router.push("/login");
              return Promise.reject(err);
            });
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(http(originalRequest));
          });
        });
        return retryOriginalRequest;
      }
      router.push("/login");
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default http;
