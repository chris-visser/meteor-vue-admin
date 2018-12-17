<template>
  <div>
    <h1>Welcome back</h1>
    <p>This page uses the default layout which is a Vue component with a sidebar</p>
  </div>
</template>

<script>

  export default {
    components: {},
    meteor: {
      user() {
        return Meteor.user();
      }
    }
  };
</script>
