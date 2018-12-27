import { Random } from 'meteor/random';

/**
 * Allows for the presence of multiple notifications
 */
export default {

  state: {
    activeMessages: [],
  },

  mutations: {
    addMessage(state, message) {
      state.activeMessages.push(message);
    },
    removeMessage(state, { id }) {
      const index = state.activeMessages.findIndex(message => message.id === id);
      state.activeMessages.splice(index, 1);
    },
  },

  actions: {
    notify({ commit }, { text, timeout = 4000, color }) {
      const id = Random.id();

      commit('addMessage', { id, text, timeout, color });

      setTimeout(() => {
        commit('removeMessage', { id });
      }, timeout);
      return id;
    },
    removeNotification({ commit }, { id }) {
      commit('removeMessage', { id });
    },
  },
};
