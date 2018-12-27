<template>
  <PasswordResetForm
    title="Reset Password"
    submit-title="Reset"
    loginLink="/login"
  />
</template>

<script>
import PasswordResetForm from '../components/PasswordResetForm';

export default {
  components: {
    PasswordResetForm,
  },
};
</script>
