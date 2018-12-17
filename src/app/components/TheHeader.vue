<template>
  <VToolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="primary"
    app
    fixed
  >
    <VToolbarSideIcon @click.stop="toggleDrawer" />
    <VToolbarTitle>Cloudspider - Admin</VToolbarTitle>

    <slot name="main" />

    <VSpacer />

    <slot name="actions" />
  </VToolbar>
</template>

<script>
export default {
  methods: {
    toggleDrawer() {
      this.$emit('toggleDrawerVisibility');
    },
  },
};
</script>
