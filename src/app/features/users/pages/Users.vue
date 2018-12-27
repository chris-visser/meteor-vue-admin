<template>
  <v-container grid-list-xl pa0>
    <v-layout row wrap pa0>
      <v-flex xs12>
        <UserList />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import UserList from '../components/UserList';

  export default {
    components: {
      UserList,
    },
  };
</script>
