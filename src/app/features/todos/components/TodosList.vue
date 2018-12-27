<template>
  <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.description }}</td>
      <td class="text-xs-center">{{ props.item.isDone | boolean }}</td>
      <td>{{ props.item.createdAt | date }}</td>
      <td class="text-xs-right">
        <!--<v-icon small class="mr-2" @click="editDoc(props.item)">-->
        <!--edit-->
        <!--</v-icon>-->
        <v-icon small @click.prevent="deleteDoc(props.item)">
          delete
        </v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  import Todos from '../api/collections';

  export default {
    components: {},
    meteor: {
      $subscribe: {
        todos: [],
      },
      items() {
        return Todos.find({}, { createdAt: -1 }).map((doc) => ({
          value: false,
          title: doc.title,
          description: doc.description,
          isDone: doc.isDone,
          createdAt: doc.createdAt,
          _id: doc._id,
        }));
      },
    },
    data() {
      return {
        headers: [
          { text: 'Title', align: 'left', value: 'title' },
          { text: 'Description', value: 'description' },
          { text: 'Is Done', align: 'center', value: 'isDone' },
          { text: 'Created At', value: 'createdAt' },
          { text: 'Actions', align: 'right', value: '_id' },
        ],
      };
    },
    methods: {
      async deleteDoc({ _id, displayName, email }) {
        const bool = confirm(`Are you sure that you want to remove ${displayName || email}?`);
        if (!bool) {
          return;
        }

        await this.$store.dispatch('todos/remove', { _id })
          .then(() => this.$store.dispatch('notify', { text: 'Todo item successfully removed.', color: 'success' }))
          .catch((error) => this.$store.dispatch('notify', { text: error, color: 'error' }));
      },
      editDoc(doc) {
        console.log('Edit action not yet implemented', doc);
      }
    },
  };
</script>
