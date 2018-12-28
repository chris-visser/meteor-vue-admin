<template>
  <LoginForm registrationLink="/registration" forgotPasswordLink="/forgot-password" />
</template>

<script>
  import LoginForm from '../components/LoginForm';

  export default {
    components: {
      LoginForm,
    },
  };
</script>
