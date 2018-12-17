<template>
  <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      app
      fixed
  >
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Cloudspider - Admin</v-toolbar-title>

    <slot name="main" />

    <v-spacer></v-spacer>

    <slot name="actions" />

  </v-toolbar>
</template>

<script>
  export default {
    methods: {
      toggleDrawer() {
        this.$emit('toggleDrawerVisibility');
      }
    },
  };
</script>
