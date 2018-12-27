<template>
  <v-dialog
      v-model="show"
      max-width="350"
      persistent
  >
    <component :is="activeComponent" v-bind="$options.componentProps"/>
  </v-dialog>
</template>

<script>
  export default {
    components: {
      login: () => import('./LoginForm'),
      registration: () => import('./RegistrationForm'),
      forgotPassword: () => import('./PasswordForgotForm'),
      resetPassword: () => import('./PasswordResetForm'),
    },
    created() {
      // The componentProps don't have to be reactive
      this.$options.componentProps = {
        loginLink: '/',
        registrationLink: '?modal=registration',
        forgotPasswordLink: '?modal=forgot-password',
      };
    },
    computed: {
      activeComponent() {
        return this.$route.query.modal || 'login';
      },
      show() {
        return !this.$store.state.user.userId;
      },
    },
  }
</script>
