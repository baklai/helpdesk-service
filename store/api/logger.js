export const actions = {
  async findAll({ commit }, { params }) {
    try {
      return await this.$axios.$get('logger', { params });
    } catch (err) {
      commit('setError', err, { root: true });
      return [];
    }
  },

  async removeAll({ commit }) {
    try {
      return await this.$axios.delete('logger');
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  }
};
