import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint no-console: off */
export default {
  state: {
    userId: Meteor.userId(), // On initial load the userId will come from Meteor
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

      // In Meteor the Meteor.userId() can be set while Meteor.user() is still empty
      // This is because the Meteor.userId() comes from the session cookie and Meteor.user()
      // gets its data from a publication. Each new login of page refresh, the client will
      // subscribe to the server and during that time Meteor.user() will be empty
      // The userDetailsLoaded will mark that Meteor.user() is filled on 'true'
      if (!state.userDetailsLoaded) {
        state.userDetailsLoaded = true;
      }
    },
  },
  actions: {
    register(context, { email, password, profile }) {
      return new Promise((resolve, reject) => {
        Accounts.createUser({ email, password, profile }, (error, result) => {
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
    /**
     * Sends a recover email to the given email address
     * @param context
     * @param email
     * @returns {Promise<any>}
     */
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
    /**
     * When users received a recovery email, they can click a link that contains a token,
     * this method will be called with the token and a new password.
     * @param context
     * @param token
     * @param password
     * @returns {Promise<any>}
     */
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

    verifyEmail(context, { token }) {
      return new Promise((resolve, reject) => {
        Accounts.verifyEmail(token, (error, result) => {
          if (error) {
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    },
  },
};
