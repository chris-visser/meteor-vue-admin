import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Todos from './collections';

Meteor.methods({
  removeTodo({ _id }) {
    if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'todos-admin'])) {
      throw new Meteor.Error('not-allowed', 'You are not allowed to remove users');
    }

    if (!Todos.findOne(_id)) {
      throw new Meteor.Error('not-found', `Todo item with id ${_id} does not exist.`);
    }

    Todos.remove(_id);
  },
  addTodo({ title, description }) {
    if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'todos-admin'])) {
      throw new Meteor.Error('not-allowed', 'You are not allowed to remove users');
    }

    if (Todos.findOne({ title })) {
      throw new Meteor.Error('exists', `There is already a todo item with title: ${title}.`);
    }

    Todos.insert({
      title,
      description,
      createdAt: new Date(),
      isDone: false,
    });
  },
});
