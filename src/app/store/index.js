import user, { plugin as UserPlugin } from '../features/auth/store';
import notifications from '../features/notifications/store';
import todos from '../features/todos';

export default {
  plugins: [UserPlugin], // Connects Meteor's reactive user state to the store using Tracker

  modules: {
    user,
    notifications,
    todos,
  },
};
