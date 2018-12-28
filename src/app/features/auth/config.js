import { Meteor } from 'meteor/meteor';

export default {
  ...Meteor.settings.public.auth || {
    gatewayMode: 'modal',
  },
};
