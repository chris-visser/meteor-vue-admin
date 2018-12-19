<template>
  <v-flex xs12>
    <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.displayName }}</td>
        <td>{{ props.item.email }}</td>
        <td class="text-xs-center">{{ props.item.online }}</td>
        <td class="text-xs-center">{{ props.item.verified }}</td>
        <td>{{ props.item.createdAt }}</td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
  export default {
    components: {},
    meteor: {
      $subscribe: {
        users: [],
      },
      users() {
        return Meteor.users.find().map((doc) => ({
          value: false,
          displayName: doc.profile.displayName,
          email: doc.emails[0].address,
          online: doc.status.online,
          verified: doc.emails[0].verified,
          createdAt: doc.createdAt,
        }));
      },
    },
    data() {
      return {
        headers: [
          { text: 'Display name', align: 'left', sortable: false, value: 'displayName' },
          { text: 'E-mail', value: 'email' },
          { text: 'Online', align: 'center', value: 'online' },
          { text: 'Verified', align: 'center', value: 'verified' },
          { text: 'Created At', value: 'createdAt' },
        ],
      };
    },
  };
</script>
