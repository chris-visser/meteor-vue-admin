<template>
  <LoginForm
    title="Login"
    submit-title="Login"
    registrationLink="/registration"
    forgotPasswordLink="/forgot-password"
  />
</template>

<script>
import LoginForm from '../components/LoginForm';

export default {
  components: {
    LoginForm,
  },
};
</script>
