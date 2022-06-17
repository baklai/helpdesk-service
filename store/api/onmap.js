export const actions = {
  async findAll({ commit }) {
    try {
      return await this.$axios.$get('onmap', {});
    } catch (err) {
      commit('setError', err, { root: true });
      return [];
    }
  },

  async findOne({ commit }, { id }) {
    try {
      return await this.$axios.$get(`onmap/${id}`);
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async createOne({ commit }, data) {
    try {
      return await this.$axios.$post('onmap', { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async updateOne({ commit }, { id, data }) {
    try {
      return await this.$axios.$put(`onmap/${id}`, { ...data });
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  },

  async removeOne({ commit }, { id }) {
    try {
      return await this.$axios.delete(`onmap/${id}`, {});
    } catch (err) {
      commit('setError', err, { root: true });
      return null;
    }
  }
};
