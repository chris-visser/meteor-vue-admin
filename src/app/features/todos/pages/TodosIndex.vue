<template>
  <v-container grid-list-xl pa0>
    <v-layout row wrap pa0>
      <v-flex xs12 lg8>
        <TodosList />
      </v-flex>
      <v-flex xs12 lg4>
        <TodoForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TodosList from '../components/TodosList';
  import TodoForm from '../components/TodoForm';

  export default {
    components: {
      TodosList,
      TodoForm,
    },
  };
</script>
