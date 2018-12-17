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
 */
export default ({ isGateway = false, isPrivate = false, mainPagePath = '/', loginPagePath = '/login' }) => ({
  computed: {
    userDetailsLoaded() {
      return this.$store.state.user.userDetailsLoaded;
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
      if (!this.userDetailsLoaded && isPrivate) {
        this.$router.replace(loginPagePath);
      } else if (this.userDetailsLoaded && isGateway) {
        this.$router.replace(mainPagePath);
      }
    },
  },
});
