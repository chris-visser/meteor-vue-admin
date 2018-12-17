<template>
  <component v-if="$route.name" :is="layout">
    <router-view />
  </component>
</template>

<script>
  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || 'admin') + '-layout';
      },
    },
  };
</script>
