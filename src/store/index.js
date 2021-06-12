import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    accessToken: null,
    userId: "",
    userName: "",
    isAdmin: "",
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getUserId(state) {
      return state.userId;
    },
    getUserName(state) {
      return state.userName;
    },
    getIsAdmin(state) {
      return state.isAdmin;
    },
  },
  mutations: {
    LOGIN(state, payload) {
      state.accessToken = payload["auth-token"];
      state.userId = payload["user-id"];
      state.userName = payload["user-name"];
      state.isAdmin = payload["is-admin"];
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.userId = "";
      state.userName = "";
      state.isAdmin = "";
    },
  },
  actions: {
    LOGIN(context, user) {
      return axios.post(`${SERVER_URL}/user/login`, user).then((response) => {
        if (response.data.message) {
          alert("로그인에 실패하였습니다.");
        } else {
          context.commit("LOGIN", response.data);
          axios.defaults.headers.common["auth-token"] = `${response.data["auth-token"]}`;
        }
      });
    },
    LOGOUT(context) {
      context.commit("LOGOUT");
      axios.defaults.headers.common["auth-token"] = undefined;
    },
  },
});
