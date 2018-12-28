<template>
  <v-app id="inspire">
    <TheNavigation :is-visible="drawerIsVisible" />

    <TheHeader @toggleDrawerVisibility="drawerIsVisible = !drawerIsVisible">
      <UserLogoutButton slot="the-header-actionbar" />
    </TheHeader>

    <v-content>
      <slot />
      <Notifications />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    components: {
      TheNavigation: () => import('../components/TheNavigation'),
      TheHeader: () => import('../components/TheHeader'),
      Notifications: () => import('../features/notifications/components/NotificationsToast'),
      UserLogoutButton: () => import('../features/auth/components/LogoutButton'),
    },
    data: () => ({
      drawerIsVisible: true,
    }),
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
