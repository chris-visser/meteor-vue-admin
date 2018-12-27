import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

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
  const url = `${Meteor.absoluteUrl()}?modal=password-reset&token=${token}`;
  console.log(url);
  return `Hello,\n\nTo reset your password, simply click the link below.\n\n${url}\n\nGood luck!`;
};
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return 'Activate your account now!';
  },
  text(user, url) {
    return `Hey ${user.profile.displayName}! Verify your e-mail by following this link: ${url.replace('/#', '')}`;
  },
};
