import { Mongo } from 'meteor/mongo';

const Todos = new Mongo.Collection('todos');

Todos.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

export default Todos;
