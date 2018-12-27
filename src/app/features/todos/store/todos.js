import { Meteor } from "meteor/meteor";

export default {
  namespaced: true,

  actions: {
    remove(context, { _id }) {

      return new Promise((resolve, reject) => {
        Meteor.call('removeTodo', { _id }, (error, result) => {
          if (error) {
            console.log(error);
            reject(error.reason);
          } else {
            resolve(result);
          }
        });
      });
    }
  }
}
