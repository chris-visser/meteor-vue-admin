<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h2 class="headline mb-0">
          Reset your password here
        </h2>
        <p>
          Please enter your new password below and you will be good to go! If this was a mistake, simply close this
          page or return to the login by clicking the link below the form.
        </p>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form v-model="isValid" @submit.prevent="submit">
        <v-text-field
          v-model="password"
          v-validate="'required'"
          autofocus
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

        {{ error }}

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
            Back to login.
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
    tokenFrom: { type: String, default: 'query' }
  },
  data() {
    return {
      isValid: false,
      password: '',
      repeatPassword: '',
      error: '',
      status: { submitTitle: 'Reset', color: 'secondary', dark: true },
    };
  },

  methods: {
    async submit() {
      await this.$validator.validateAll();

      const { password } = this;
      const { token } = this.$route.query;

      if (!this.isValid) {
        return;
      }

      this.status = { submitTitle: 'Saving the new password...', color: 'default' };

      await this.$store.dispatch('resetPassword', { token, password })
        .then(() => {
          this.$router.replace('/');
          this.status = { submitTitle: 'Reset', color: 'secondary', dark: true };
        })
        .catch((error) => {
          this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
          this.error = error;
        });
    },
  },
};
</script>
