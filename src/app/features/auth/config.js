export default {
  ...Meteor.settings.public.auth || {
    gatewayType: 'modal',
  },
}
