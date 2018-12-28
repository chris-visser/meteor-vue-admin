<template>
  <v-dialog
      v-model="show"
      max-width="350"
      content-class="page-based"
      persistent
  >
    <component :is="activeComponent" v-bind="$options.componentProps" />
  </v-dialog>
</template>

<script>
  export default {
    components: {
      login: () => import('./LoginForm'),
      registration: () => import('./RegistrationForm'),
      forgotPassword: () => import('./ForgotPasswordForm'),
      resetPassword: () => import('./ResetPasswordForm'),
    },
    created() {
      // The componentProps don't have to be reactive
      this.$options.componentProps = {
        loginLink: '/',
        registrationLink: '?modal=registration',
        forgotPasswordLink: '?modal=forgot-password',
      };
    },
    data() {
      return {
        isPageBased: true,
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
  };
</script>
