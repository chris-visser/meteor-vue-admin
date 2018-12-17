<template>
  <VCard>
    <VCardTitle
      primary-title
      class="mb-0"
    >
      <div>
        <h2 class="headline pb-0">
          {{ title }}
        </h2>
        <p class="mb-0">
          You can create your new account here.
        </p>
      </div>
    </VCardTitle>

    <VCardText>
      <VForm
        v-model="isValid"
        @submit.prevent="submit"
      >
        <VTextField
          v-model="displayName"
          v-validate="'required'"
          autofocus
          type="displayName"
          color="dark"
          label="Display Name"
          data-vv-name="displayName"
          :error-messages="errors.collect('displayName')"
        />
        <VTextField
          v-model="email"
          v-validate="'required|email'"
          type="email"
          color="dark"
          label="E-mail address"
          data-vv-name="email"
          :error-messages="errors.collect('email')"
        />
        <VTextField
          v-model="password"
          v-validate="'required'"
          type="password"
          color="dark"
          label="Password"
          data-vv-name="password"
          :error-messages="errors.collect('password')"
        />
        <VTextField
          v-model="repeatPassword"
          v-validate="'required'"
          type="password"
          color="dark"
          data-vv-name="repeatPassword"
          label="Repeat Password"
          :error-messages="errors.collect('repeatPassword')"
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
          block
        >
          {{ status.submitTitle }}
        </VBtn>

        <p class="text-lg-right mt-4">
          <VBtn
            flat
            small
            to="/login"
          >
            Back to the login!
          </VBtn>
        </p>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script>
import { Accounts } from 'meteor/accounts-base';

export default {
  props: {
    title: String,
    submitTitle: String,
  },
  data() {
    return {
      isValid: false,
      email: '',
      password: '',
      repeatPassword: '',
      displayName: '',
      error: '',

      status: { submitTitle: 'Register', color: 'secondary', dark: true },
    };
  },

  methods: {
    async submit() {
      await this.$validator.validateAll();

      const { email, password, displayName } = this;

      if (!this.isValid) {
        return;
      }

      this.status = { submitTitle: 'Registering your account...', color: 'default' };

      Accounts.createUser({ email, password, profile: { displayName } }, (error) => {
        this.status = { submitTitle: 'Finished! Redirecting you to the login...', color: 'success', dark: true };

        if (error) {
          console.log(error);
          this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
          this.error = error.reason;
          return;
        }

        setTimeout(() => {
          this.$router.replace('/');
        }, 1500);
      });
    },
  },
};
</script>
