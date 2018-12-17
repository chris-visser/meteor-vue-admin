import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

/**
 * This plugin tracks the user's session with Meteor Tracker and
 * keeps it in sync with the Vuex user store
 * @param store
 */
export default (store) => {
  Tracker.autorun(() => {
    const user = Meteor.user();

    if (user) {
      store.commit('setUser', user);
    }
  });

  // We only unset the user when the userId is removed
  // For example during logout
  // the user state is never set on hard refresh
  // So prevent committing unsetUser on the firstRun - saving some cycles
  Tracker.autorun((c) => {
    const userId = Meteor.userId();

    if (c.firstRun) {
      return;
    }

    if (!userId) {
      store.commit('unsetUser');
    }
  });
};
