<template>
  <v-app id="inspire">
    <TheNavigation :is-visible="drawerIsVisible" />

    <TheHeader @toggleDrawerVisibility="drawerIsVisible = !drawerIsVisible">
      <UserLogoutButton slot="actions" />
    </TheHeader>

    <v-content>

      <v-alert
          slot="page-header"
          :value="showEmailUnverified"
          color="error"
      >
        Please verify your e-mail address. This is required before you can do stuff in this system.
      </v-alert>


      <slot />

      <Notifications />
    </v-content>
  </v-app>
</template>

<script>
  import TheHeader from '../components/TheHeader';
  import TheNavigation from '../components/TheNavigation';
  import Notifications from '../features/notifications';

  import AuthRedirectMixin from '../features/auth/redirect-mixin';
  import UserLogoutButton from '../features/auth/components/LogoutButton';

  export default {
    mixins: [AuthRedirectMixin({ isPrivate: true })],

    components: {
      Notifications,
      TheNavigation,
      TheHeader,
      UserLogoutButton,
    },
    data: () => ({
      drawerIsVisible: true,
      requiresAuth: true,
    }),
    mounted() {
      if (this.userDetailsLoaded) {
        this.$store.dispatch('notify', { text: `Welcome back ${this.$store.state.user.profile.displayName}` });
      }
    },
    computed: {
      showEmailUnverified() {
        const isLoading = !this.$store.state.user.userDetailsLoaded;

        return !isLoading && !this.$store.state.user.isEmailVerified;
      },
      userDetailsLoaded() {
        return this.$store.state.user.userDetailsLoaded;
      },
      userId() {
        return this.$store.state.user.userId;
      },
    },
    watch: {
      userDetailsLoaded(userDetailsLoaded) {
        if (userDetailsLoaded) {
          this.$store.dispatch('notify', { text: `Welcome back ${this.$store.state.user.profile.displayName}` });
        }
      },
    },
  };
</script>

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>
