<template>
  <VAlert
      value="true"
      :color="status.color"
      outline
  >
    {{ status.title }}
  </VAlert>
</template>

<script>
  export default {
    data() {
      return {
        status: { title: 'Verifying your e-mail address', color: 'default' },
      };
    },

    mounted() {
      const { token } = this.$route.params;

      Accounts.verifyEmail(token, (error) => {
        if (error) {
          this.status = { title: error.reason, color: 'error' };
        } else {
          this.status = { title: 'Success!', color: 'success' };
          setTimeout(() => {
            this.$router.replace('/');
          }, 1500);
        }
      });
    },
  };
</script>
