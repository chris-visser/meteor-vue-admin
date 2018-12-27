<template>
  <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.displayName }}</td>
      <td>{{ props.item.email }}</td>
      <td class="text-xs-center">{{ props.item.online | boolean }}</td>
      <td class="text-xs-center">{{ props.item.verified | boolean }}</td>
      <td>{{ props.item.roles | list }}</td>
      <td>{{ props.item.createdAt | date }}</td>
      <td>{{ props.item.lastSeen | date }}</td>
      <td class="text-xs-right">
        <!--<v-icon small class="mr-2" @click="editDoc(props.item)">-->
        <!--edit-->
        <!--</v-icon>-->
        <v-icon small @click="deleteDoc(props.item)">
          delete
        </v-icon>
      </td>
    </template>
  </v-data-table>
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
          online: doc.status && doc.status.online,
          verified: doc.emails[0].verified,
          roles: doc.roles && doc.roles.__global_roles__,
          lastSeen: doc.status && doc.status.lastLogin.date,
          createdAt: doc.createdAt,
          _id: doc._id,
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
          { text: 'Roles', align: 'center', value: 'roles' },
          { text: 'Last Seen', value: 'lastSeen' },
          { text: 'Joined On', value: 'createdAt' },
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

        Meteor.call('removeUser', { _id }, (error) => {
          if (error) {
            this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
            this.error = error.reason;
          } else {
            this.status = { submitTitle: `${displayName || email} was removed!`, color: 'success', dark: true };
          }
        });
      },
      editDoc(doc) {
        console.log('Edit action not yet implemented', doc);
      },
    },
  };
</script>
