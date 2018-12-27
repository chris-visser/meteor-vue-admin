<template>
  <div class="snack-container">
    <v-snackbar
        v-for="message in messages"
        :key="message.id"
        value="true"
        multi-line
        :color="message.color || 'blue'"
        right
        @click="removeMessage(message)"
        :timeout="message.timeout"
        top
    >
      {{ message.text }}
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    computed: {
      messages() {
        return this.$store.state.notifications.activeMessages;
      },
    },
    methods: {
      removeMessage({ id }) {
        this.$store.dispatch('removeNotification', { id });
      },
    },
  };
</script>

<style>
  .snack-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
  }

  .v-snack {
    position: relative;
    margin-bottom: 1rem;
  }
</style>
