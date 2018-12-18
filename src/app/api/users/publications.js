import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('users', function () {
  if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'user-manager'])) {
    return [];
  }

  return Meteor.users({}, { sort: { createdAt: 1 } });
});
