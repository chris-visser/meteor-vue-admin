<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import IndexPage from './pages/TodosIndex';
  import routes from './routes';

  export default {
    components: {
      IndexPage,
    },

    created() {
      this.$router.addRoutes(routes);
    }
  }
</script>
