export const actions = {
  async findAll({ commit }) {
    try {
      return await this.$axios.$get('channel', {});
    } catch (err) {
      commit('setError', err, { root: true });
      return [];
    }
  },

  async findOne({ commit }, id) {
    try {
      return await this.$axios.$get(`channel/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async createOne({ commit }, data) {
    try {
      return await this.$axios.$post('channel', { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async updateOne({ commit }, { id, data }) {
    try {
      return await this.$axios.$put(`channel/${id}`, { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`channel/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  }
};
