import user from '../features/auth/store';
import UserPlugin from '../features/auth/store/plugin';

import notifications from '../features/notifications/store';
import todos from '../features/todos/store';

export default {
  plugins: [UserPlugin], // Connects Meteor's reactive user state to the store using Tracker

  modules: {
    user,
    notifications,
    todos,
  },
};
