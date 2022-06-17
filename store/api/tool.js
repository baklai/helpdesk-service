export const actions = {
  async getVBS({ commit }) {
    try {
      return await this.$axios.$get(`tool/inspector`);
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async getRDP({ commit }, { ip }) {
    try {
      return await this.$axios.$get(`tool/rdp`, { params: { ip } });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async getVNC({ commit }, { ip }) {
    try {
      return await this.$axios.$get(`tool/vnc`, { params: { ip } });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async getPING({ commit }, { ip }) {
    try {
      return await this.$axios.$get(`tool/ping`, { params: { ip } });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async getOPING({ commit }, { ip }) {
    try {
      return await this.$axios.$get(`tool/ping-online`, { params: { ip } });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  }
};
