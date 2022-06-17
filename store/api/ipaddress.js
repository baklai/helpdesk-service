export const actions = {
  async findAll({ commit }, { params }) {
    try {
      return await this.$axios.$get('ipaddress', { params });
    } catch (err) {
      commit('setError', err, { root: true });
      return [];
    }
  },

  async findOne({ commit }, id) {
    try {
      return await this.$axios.$get(`ipaddress/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async searchOne({ commit }, ip) {
    try {
      return await this.$axios.$get(`ipaddress/search/${ip}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async createOne({ commit }, data) {
    try {
      return await this.$axios.$post('ipaddress', { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async updateOne({ commit }, { id, data }) {
    try {
      return await this.$axios.$put(`ipaddress/${id}`, { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`ipaddress/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  }
};
