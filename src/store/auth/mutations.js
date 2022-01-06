import { UPDATE_AUTH_INFO, REFRESH_AUTH_INFO } from "./constants";
export default {
  [UPDATE_AUTH_INFO](state, payload) {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    state.accessExpiredAt = payload.accessExpiredAt;
    state.refreshExpiredAt = payload.refreshExpiredAt;
    state.userInfo = payload.userInfo;
  },
  [REFRESH_AUTH_INFO](state, payload) {
    state.accessToken = payload;
  },
};
