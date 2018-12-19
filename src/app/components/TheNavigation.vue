<template>
  <VNavigationDrawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    :value="isVisible"
    class="secondary"
    dark
    fixed
    app
  >
    <VList dense>
      <VListTile to="/">
        <VListTileAction>
          <VIcon>home</VIcon>
        </VListTileAction>
        <VListTileContent>
          <VListTileTitle>Home</VListTileTitle>
        </VListTileContent>
      </VListTile>
      <VListTile  to="/users">
        <VListTileAction>
          <VIcon>group</VIcon>
        </VListTileAction>
        <VListTileContent>
          <VListTileTitle>Users</VListTileTitle>
        </VListTileContent>
      </VListTile>
    </VList>
  </VNavigationDrawer>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
  },
};
</script>
