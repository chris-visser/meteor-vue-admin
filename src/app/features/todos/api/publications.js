import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Todos from './collections';

Meteor.publish('todos', function () {
  if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'user-manager'])) {
    return [];
  }

  return Todos.find({}, { sort: { createdAt: 1 } });
});
