import Vue from 'vue';

const state = {
  initial_setup: false,
  user: {},
  logged_in: false,
  session: '',
};

// getters
const getters = {
  initial_setup: state => state.initial_setup,
  user: state => state.user,
  logged_in: state => state.logged_in,
};

// actions
const actions = {
  check_initial_setup({ commit }) {
    return new Promise((resolve, reject) => {
      fetch('/api/check_initial_setup').then((response) => {
        response.json().then((data) => {
          commit('update_initial_setup', data.initial_setup);
          resolve();
        });
      }).catch(() => {
        reject();
      });
    });
  },
  check_logged_in({ commit }) {
    return new Promise((resolve, reject) => {
      fetch('/api/check_login').then((response) => {
        response.json().then((data) => {
          if (data.success) {
            commit('login', data);
            resolve();
          } else {
            commit('logout');
            resolve();
          }
        });
      }).catch(() => {
        reject();
      });
    });
  },
};

// mutations
const mutations = {
  update_initial_setup(state, value) {
    state.initial_setup = value;
  },
  login(state, data) {
    if (data.success) {
      state.logged_in = true;
      Vue.set(state, 'user', data.user);
      Vue.set(state, 'session', data.session);
    } else {
      state.logged_in = false;
    }
  },
  logout(state) {
    state.user = {};
    state.session = '';
    state.logged_in = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
