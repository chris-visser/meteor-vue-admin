<template>
  <div>
    <RegistrationForm title="Register" loginLink="/login" />
  </div>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm';

export default {
  components: {
    RegistrationForm,
  },
};
</script>
