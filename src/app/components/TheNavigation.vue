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
      <VListTile>
        <VListTileAction>
          <VIcon>home</VIcon>
        </VListTileAction>
        <VListTileContent>
          <VListTileTitle>Home</VListTileTitle>
        </VListTileContent>
      </VListTile>
      <VListTile>
        <VListTileAction>
          <VIcon>contact_mail</VIcon>
        </VListTileAction>
        <VListTileContent>
          <VListTileTitle>Contact</VListTileTitle>
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
