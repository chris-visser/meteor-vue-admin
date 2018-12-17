import { Accounts } from 'meteor/accounts-base';

/**
 * Adds the admin role if its the first user
 */
Accounts.onCreateUser(({ profile }, user) => {

  if (Meteor.users.findOne({})) {
    return {
      ...user,
      profile,
    };
  }

  return {
    ...user,
    profile,
    roles: {
      __global_roles__: ['admin'],
    },
  };
});

