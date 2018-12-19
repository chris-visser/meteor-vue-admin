import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint no-console: off */

export default {
  state: {
    userId: Meteor.userId(),
    email: null,
    isEmailVerified: null,
    profile: null,
    userDetailsLoaded: false,
  },
  mutations: {
    unsetUser(state) {
      state.userId = null;
      state.email = null;
      state.isEmailVerified = null;
      state.profile = null;
      state.userDetailsLoaded = false;
    },
    setUser(state, { _id, emails, profile }) {
      const { address, verified } = emails && emails[0] ? emails[0] : {};
      state.userId = _id;
      state.email = address;
      state.isEmailVerified = verified;
      state.profile = profile;

      if (!state.userDetailsLoaded) {
        state.userDetailsLoaded = true;
      }
    },
  },
  actions: {
    register(context, { email, password }) {
      return new Promise((resolve, reject) => {
        Accounts.createUser({ email, password }, (error, result) => {
          if (error) {
            console.log(error);
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    },
    login(context, { email, password }) {
      return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(email, password, (error, result) => {
          if (error) {
            console.log(error);
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        Meteor.logout((error, result) => {
          if (error) {
            console.log(error);
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    },
    forgotPassword(context, { email }) {
      return new Promise((resolve, reject) => {
        Accounts.forgotPassword({ email }, (error, result) => {
          if (error) {
            console.log(error);
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    },
    resetPassword(context, { token, password }) {
      return new Promise((resolve, reject) => {
        Accounts.resetPassword(token, password, (error, result) => {
          if (error) {
            console.log(error);
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    },
    removeUser(context, { _id }) {
      return new Promise((resolve, reject) => {
        Meteor.call('removeUser', { _id }, (error, result) => {
          if (error) {
            console.log(error);
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    },
  },
};
