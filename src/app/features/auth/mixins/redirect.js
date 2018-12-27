/**
 * This is a function that returns a mixin to allow some additional options to be passed
 *
 * Based on the component's 'isGateway' or 'isPrivate' setting this mixin will
 * redirect the user from and to the login page. This is useful for pages where
 * authentication is required. Not setting anything will make this mixin treat
 * the page as 'public' and it will never do any redirects
 *
 * @param {Boolean} [isGateway=false] - Specifies that this is a gateway page.
 * Logged in users will be redirected to the mainPage
 * @param {Boolean} [isPrivate=false] - Specifies that this is a private page.
 * Un-authenticated users will be redirected to the loginPage
 * @param {String} [mainPagePath="/"] - Allows for a custom mainPage.
 * Logged in users will be redirected to this path
 * @param {String} [loginPagePath="/"] - Allows for a custom loginPage.
 * Un-authenticated users will be redirected to this path
 * @returns {{mounted: function, computed: Object, watch: Object, methods: Object}}
 *
 * @example
 * ```
 *
 *
 * // Admin layout or admin page component
 * export default {
 *    // Direct non-authenticated users to the login
 *    mixins: [UsersMixin({ isPrivate: true })],
 * }
 *
 * // A public layout or public component
 * export default {
 *    // Direct authenticated users to private section
 *    mixins: [UsersMixin({ isGateway: true })],
 * }
 *
 * ```
 */
export default ({
  isGateway = false, isPrivate = false, mainPagePath = '/', loginPagePath = '/login',
}) => ({
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

      const isLoading = this.userId && !this.userDetailsLoaded;
      const shouldRedirectToLogin = !this.userId && isPrivate;
      const shouldRedirectToDashboard = this.userId && this.userDetailsLoaded;

      if (isLoading) {
        // TODO show / trigger loader somehow
      } else if (shouldRedirectToLogin && isPrivate) {
        this.$router.replace(loginPagePath);
      } else if (shouldRedirectToDashboard && isGateway) {
        this.$router.replace(mainPagePath);
      }
    },
  },
});
