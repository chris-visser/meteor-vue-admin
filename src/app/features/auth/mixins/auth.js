import config from '../config';

/**
 * When auth mode is redirect, this mixin will redirect users from or to private pages
 */
export default config.gatewayMode !== 'redirect' ? {} : {
  computed: {
    userDetailsLoaded() {
      return this.$store.state.user.userDetailsLoaded;
    },
    userId() {
      return this.$store.state.user.userId;
    },
  },

  mounted() {
    this.trackUser();
  },

  watch: {
    userDetailsLoaded() {
      this.trackUser();
    },
  },

  methods: {
    trackUser() {
      // userId is set first, because it comes from the session
      // userDetails come from a publication. The time between a userId and when
      // details are available is the loading time.
      const { isPublic } = this.$route.meta;

      const isLoading = this.userId && !this.userDetailsLoaded;
      const shouldRedirectToLogin = !this.userId && !isPublic;
      const shouldRedirectToDashboard = (this.userId && this.userDetailsLoaded) && isPublic;
      //
      if (isLoading) {
        // TODO show / trigger loader somehow
      } else if (shouldRedirectToLogin) {
        this.$router.replace('/login');
      } else if (shouldRedirectToDashboard) {
        this.$router.replace('/');
      }
    },
  },
};
