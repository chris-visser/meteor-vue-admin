import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

const authConfig = Meteor.settings.public.auth || {};

/**
 * Generates a link based on a modal based gateway or a redirect based
 * @param token
 * @param action
 * @returns {string}
 */
const generateLink = (token, action) => {
  if(authConfig.gatewayType === 'redirect') {
    return `${Meteor.absoluteUrl()}${action}?token=${token}`;
  }

  return `${Meteor.absoluteUrl()}?modal=${action}&token=${token}`;
};

Accounts.config({
  sendVerificationEmail: true,
});

Accounts.emailTemplates.siteName = 'Cloudspider - Admin';
Accounts.emailTemplates.from = 'Cloudspider Admin <info@cloudspider.io>';

Accounts.emailTemplates.enrollAccount.subject = user => `Welcome to The admin area, ${user.profile.name}`;

Accounts.emailTemplates.enrollAccount.text = (user, url) => `${'You have been invited to the Cloudspider admin dashboard!'
+ ' To activate your account, simply click the link below:\n\n'}${
  url}`;

Accounts.emailTemplates.resetPassword.text = (user) => {
  const { token } = user.services.password.reset;
  const url = generateLink(token, 'reset-password');
  console.log(url);
  return `Hello,\n\nTo reset your password, simply click the link below.\n\n${url}\n\nGood luck!`;
};
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return 'Activate your account now!';
  },
  text(user) {
    const url = `${Meteor.absoluteUrl()}?action=verify-email&token=${user.services.email.verificationTokens[0].token}`;
    console.log(url);
    return `Hey ${user.profile.displayName}! Verify your e-mail by following this link: ${url}`;
  },
};
