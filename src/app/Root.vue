<template>
  <the-gateway :adminLayout="adminLayout" :publicLayout="publicLayout">
    <router-view />
  </the-gateway>
</template>

<script>
  import TheGateway from './features/auth/components/TheGateway';

  export default {
    components: {
      TheGateway,
    },
    data() {
      return {
        adminLayout: () => import('./layouts/AdminLayout'),
        publicLayout: () => import('./layouts/PublicLayout'),
      };
    },
  };
</script>
