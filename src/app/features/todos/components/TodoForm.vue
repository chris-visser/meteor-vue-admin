<template>
  <VCard>
    <VCardTitle primary-title>
      <div>
        <h2 class="headline mb-0">
          Create new todo
        </h2>
      </div>
    </VCardTitle>

    <VCardText>
      <VForm
          ref="form"
          v-model="isValid"
          @submit.prevent="submit"
      >
        <VTextField
            v-model="title"
            v-validate="'required'"
            autofocus
            color="dark"
            type="text"
            label="Title"
            data-vv-name="title"
            :error-messages="errors.collect('title')"
        />
        <VTextField
            v-model="description"
            v-validate="'required'"
            autofocus
            color="dark"
            type="text"
            label="Description"
            data-vv-name="description"
            :error-messages="errors.collect('description')"
        />


        <VAlert
            :value="!!error"
            color="error"
            icon="warning"
            outline
        >
          {{ error }}
        </VAlert>


        <VBtn
            type="submit"
            :color="status.color"
            :dark="status.dark"
            :isLoading="status.isLoading"
            block
        >
          {{ status.submitTitle }}
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
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
