export const actions = {
  async findAll({ commit }, { params }) {
    try {
      return await this.$axios.$get('request', { params });
    } catch (err) {
      commit('setError', err, { root: true });
      return [];
    }
  },

  async findOne({ commit }, id) {
    try {
      return await this.$axios.$get(`request/${id}`);
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async createOne({ commit }, data) {
    try {
      return await this.$axios.$post('request', { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async updateOne({ commit }, { id, data }) {
    try {
      return await this.$axios.$put(`request/${id}`, { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`request/${id}`);
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  }
};
