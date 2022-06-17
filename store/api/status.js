export const actions = {
  async findAll({ commit }) {
    try {
      return await this.$axios.$get('status', {});
    } catch (err) {
      commit('setError', err, { root: true });
      return [];
    }
  },

  async findOne({ commit }, { id }) {
    try {
      return await this.$axios.$get(`status/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async createOne({ commit }, { item }) {
    try {
      return await this.$axios.$post('status', { ...item });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async updateOne({ commit }, { id, item }) {
    try {
      return await this.$axios.$put(`status/${id}`, { ...item });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`status/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  }
};
