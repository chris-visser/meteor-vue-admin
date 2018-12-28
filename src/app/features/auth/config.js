import { Meteor } from 'meteor/meteor';

export default {
  ...Meteor.settings.public.auth || {
    gatewayType: 'modal',
  },
};
