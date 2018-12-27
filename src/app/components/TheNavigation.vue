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
      <VListTile v-for="item in items" :key="item.to" :to="item.to">
        <VListTileAction>
          <VIcon>{{item.icon}}</VIcon>
        </VListTileAction>
        <VListTileContent>
          <VListTileTitle>{{item.title}}</VListTileTitle>
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
    data() {
      return {
        items: [{
          to: '/',
          icon: 'home',
          title: 'Home',
        }, {
          to: '/users',
          icon: 'group',
          title: 'Users',
        }, {
          to: '/todos',
          icon: 'assignment',
          title: 'Todos',
        }],
      };
    },
  };
</script>
