<template>
  <v-btn icon title="Logout" :loading="isLoading" @click.once="logout">
    <v-icon>logout</v-icon>
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
