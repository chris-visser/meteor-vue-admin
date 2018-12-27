<template>
  <Component
      :is="layout"
      v-if="$route.name"
  >
    <RouterView />
  </Component>
</template>

<script>
  export default {
    computed: {
      layout() {
        return `${this.$route.meta.layout || 'admin'}-layout`;
      },
    },
  };
</script>
