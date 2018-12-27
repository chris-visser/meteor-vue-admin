<template>
  <PasswordForgotForm
    title="Forgot Password"
    submit-title="Send reset e-mail"
    loginLink="/login"
  />
</template>

<script>
import PasswordForgotForm from '../components/PasswordForgotForm';

export default {
  components: {
    PasswordForgotForm,
  },
};
</script>
