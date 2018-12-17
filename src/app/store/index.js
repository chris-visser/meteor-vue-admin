import user from './user';
import MeteorUsers from './plugins/meteor-users';

export default {
  plugins: [MeteorUsers],

  modules: {
    user,
  },
};
