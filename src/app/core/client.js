import { Meteor } from 'meteor/meteor';
import CreateApp from './app';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  CreateApp({
    ssr: false,
  });
});

