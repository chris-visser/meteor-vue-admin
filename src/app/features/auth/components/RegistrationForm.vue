<template>
  <v-card>
    <v-card-title primary-title class="mb-0">
      <div>
        <h2 class="headline pb-0">
          Registration
        </h2>
        <p class="mb-0">
          You can create your new account here.
        </p>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form v-model="isValid" @submit.prevent="submit">
        <v-text-field
          v-model="displayName"
          v-validate="'required'"
          autofocus
          type="displayName"
          color="dark"
          label="Display Name"
          data-vv-name="displayName"
          :error-messages="errors.collect('displayName')"
        />
        <v-text-field
          v-model="email"
          v-validate="'required|email'"
          type="email"
          color="dark"
          label="E-mail address"
          data-vv-name="email"
          :error-messages="errors.collect('email')"
        />
        <v-text-field
          v-model="password"
          v-validate="'required'"
          type="password"
          color="dark"
          label="Password"
          data-vv-name="password"
          :error-messages="errors.collect('password')"
        />
        <v-text-field
          v-model="repeatPassword"
          v-validate="'required'"
          type="password"
          color="dark"
          data-vv-name="repeatPassword"
          label="Repeat Password"
          :error-messages="errors.collect('repeatPassword')"
        />

        <v-alert
          :value="!!error"
          color="error"
          icon="warning"
          outline
        >
          {{ error }}
        </v-alert>


        <v-btn
          type="submit"
          :color="status.color"
          :dark="status.dark"
          block
        >
          {{ status.submitTitle }}
        </v-btn>

        <p class="text-lg-right mt-4">
          <v-btn
            flat
            small
            :to="loginLink"
          >
            Back to the login!
          </v-btn>
        </p>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    submitTitle: String,
    loginLink: { type: String, default: '/' },
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

      await this.$store.dispatch('register', { email, password, profile: { displayName } })
        .then(() => {
          this.status = { submitTitle: 'Finished! Redirecting you to the login...', color: 'success', dark: true };

          setTimeout(() => {
            this.$router.replace('/');
          }, 1500);
        })
        .catch((error) => {
          this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
          this.error = error;
        });
    },
  },
};
</script>
