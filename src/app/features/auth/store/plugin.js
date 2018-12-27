import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

/**
 * This plugin tracks the user's session with Meteor Tracker and
 * keeps it in sync with the Vuex user store
 * @param store
 */
export default (store) => {
  /**
   * Tracks changes on the user
   */
  Tracker.autorun(() => {
    const user = Meteor.user();

    if (user) {
      store.commit('setUser', user);
    }
  });

  /**
   * Tracks if the user is logging out
   */
  Tracker.autorun((c) => {
    const userId = Meteor.userId();

    // The Meteor.userId state is never set on the firstRun (refresh or initial load) so skip that
    if (c.firstRun) {
      return;
    }

    // Only commit 'unsetUser' when userId was changed and set to empty
    if (!userId) {
      store.commit('unsetUser');
    }
  });
};
