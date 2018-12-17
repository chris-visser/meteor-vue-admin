<template>
  <VApp id="inspire">
    <TheNavigation :is-visible="drawerIsVisible" />

    <TheHeader @toggleDrawerVisibility="drawerIsVisible = !drawerIsVisible">
      <UserLogoutButton slot="actions" />
    </TheHeader>

    <VContent>
      <VContainer fluid>
        <VLayout>
          <VAlert
            slot="page-header"
            :value="!isEmailVerified"
            color="error"
          >
            Please verify your e-mail address. This is required before you can do stuff in this system.
          </VAlert>

          <slot />
        </VLayout>
      </VContainer>
    </VContent>
  </VApp>
</template>

<script>
import MeteorUsersMixin from '../mixins/MeteorUsers';
import TheHeader from '../components/TheHeader';
import TheNavigation from '../components/TheNavigation';
import UserLogoutButton from '../components/UserLogoutButton';
import UserLoginForm from '../components/UserLoginForm';

export default {
  mixins: [MeteorUsersMixin({ isPrivate: true })],

  components: {
    UserLoginForm,
    TheNavigation,
    TheHeader,
    UserLogoutButton,
  },
  data: () => ({
    drawerIsVisible: true,
    requiresAuth: true,
  }),
  computed: {
    isEmailVerified() {
      return this.$store.state.user.isEmailVerified;
    },
    userDetailsLoaded() {
      return this.$store.state.user.userDetailsLoaded;
    },
    userId() {
      return this.$store.state.user.userId;
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
