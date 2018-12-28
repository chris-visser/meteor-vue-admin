<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h2 class="headline mb-0">
          Create new todo
        </h2>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form
          ref="form"
          v-model="isValid"
          @submit.prevent="submit"
      >
        <v-text-field
            v-model="title"
            v-validate="'required'"
            autofocus
            color="dark"
            type="text"
            label="Title"
            data-vv-name="title"
            :error-messages="errors.collect('title')"
        />
        <v-text-field
            v-model="description"
            v-validate="'required'"
            autofocus
            color="dark"
            type="text"
            label="Description"
            data-vv-name="description"
            :error-messages="errors.collect('description')"
        />


        <v-alert
            :value="!!error"
            color="error"
            icon="warning"
            outline
        >
          {{ error }}
        </v-alert>


        <VBtn
            type="submit"
            :color="status.color"
            :dark="status.dark"
            :isLoading="status.isLoading"
            block
        >
          {{ status.submitTitle }}
        </VBtn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        isValid: false,
        title: '',
        description: '',
        error: '',
        status: { submitTitle: 'Create', color: 'secondary', dark: true, isLoading: false },
      };
    },

    watch: {
      status() {
        if(this.status.color === 'success') {
          setTimeout(() => {
            this.status = { submitTitle: 'Create', color: 'secondary', dark: true, isLoading: false };
            this.$validator.reset();
            this.$refs.form.reset();
          }, 2500);
        }
      }
    },

    methods: {
      async submit() {
        await this.$validator.validateAll();

        const { title, description } = this;

        if (!this.isValid) {
          return;
        }

        this.status = { submitTitle: 'Saving item...', color: 'default', isLoading: true };

        Meteor.call('addTodo', { title, description }, (error) => {
          if(error) {
            this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
            this.error = error.reason;
          } else {
            this.status = { submitTitle: 'Todo successfully created!', color: 'success', dark: true };
          }
        });
      },
    },
  };
</script>
