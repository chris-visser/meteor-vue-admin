<template>
  <v-btn
    icon
    title="Logout"
    :loading="isLoading"
    @click="logout"
  >
    <VIcon>logout</VIcon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async logout() {
      this.isLoading = true;

      await this.$store.dispatch('logout');

      this.isLoading = false;
    },
  },
};
</script>
