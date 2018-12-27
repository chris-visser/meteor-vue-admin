import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  removeUser({ _id }) {
    if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'user-admin'])) {
      throw new Meteor.Error('not-allowed', 'You are not allowed to remove users');
    }

    if (!_id) {
      throw new Meteor.Error('invalid-parameter', `Invalid parameter _id. Expected a string, but ${typeof _id} given`);
    }

    if (Roles.userIsInRole(this.userId, 'owner') && this.userId === _id) {
      throw new Meteor.Error('invalid-action', 'You cannot remove yourself while you are the owner of the system. Transfer ownership first');
    }

    Meteor.users.remove({ _id });
  },
});
