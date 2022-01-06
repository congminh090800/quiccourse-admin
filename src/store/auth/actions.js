import { UPDATE_AUTH_INFO, REFRESH_AUTH_INFO } from "./constants";
import http from "../../http";
export default {
  async login(context, payload) {
    const res = await http.post("/api/admin/login", {
      email: payload.email,
      password: payload.password,
    });
    if (res.data) {
      const authInfo = res.data;
      const info = {
        accessToken: authInfo.data.accessToken,
        refreshToken: authInfo.data.refreshToken,
        accessExpiredAt: authInfo.data.accessExpiredAt,
        refreshExpiredAt: authInfo.data.expiredAt,
        userInfo: authInfo.data.user,
      };
      context.commit(UPDATE_AUTH_INFO, info);
    }
  },
  logout(context) {
    const info = {
      accessToken: "",
      refreshToken: "",
      accessExpiredAt: 0,
      refreshExpiredAt: 0,
      userInfo: {},
    };
    context.commit(UPDATE_AUTH_INFO, info);
  },
  async refreshAccessToken(context) {
    console.log(context);
    const refreshToken = context.state.refreshToken;
    const res = await http.post("/api/admin/refresh-token", {
      refreshToken: refreshToken,
    });
    if (res.data) {
      const info = res.data;
      const accessToken = info.data;
      context.commit(REFRESH_AUTH_INFO, accessToken);
      return accessToken;
    }
  },
};
