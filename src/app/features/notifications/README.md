# Notifications feature
This feature sends notifications to any user in the form of a [Vuetify snackbar](https://vuetifyjs.com/en/components/snackbars). 
It is controlled via the Vuex store and supports multiple messages at the same 
time. Also clicking on the snackbar will remove it instantly.

## Usage

In `./src/app/store/index.js` add the following:

```javascript
import notifications from '../features/notifications/store';

export default {
  modules: {
    notifications,
  }
}
```

Also add the notifications component on any layout that you require it in. For example in `AdminLayout`:

```javascript
<template>
  <v-app inspire>
    <Notifications />
  </v-app>
</template>
```

Now you can have your components dispatch notifications like this:

```javascript
export default {
  methods: {
    sendNotification() {
      this.$store.dispatch('notify', { text: 'Hello World' });
    }
  }
}
```

The notify store action also supports some additional options:

| Option  | Description |
|---------| ------------|
| text    | The text of the snackbar message |
| color   | Sets the color of the snackbar like on the [Vuetify docs](https://vuetifyjs.com/en/components/snackbars#api) |
| timeout | A custom timeout after which the snackbar should disappear |

The notify action also returns the `id` of the notification. This allows you to programmatically remove 
the notification like this:

```javascript
export default {
  state: {
    userId: null,
    notificationId: null,
  },
  
  watch: {
    userId() {
      if(!this.userId) { // User logs out
        this.$store.dispatch('removeNotification', { id: this.notificationId });
      }
    }
  },
  
  methods: {
    sendNotification() {
      this.notificationId = this.$store.dispatch('notify', { text: 'Hello World' });
    },
  }
}
```
