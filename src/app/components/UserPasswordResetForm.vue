<template>
  <v-card>

    <v-card-title primary-title>
      <div>
        <h2 class="headline mb-0">{{title}}</h2>
        <p>Please enter your new password below and you will be good to go! If this was a mistake, simply close this
          page or return to the login by clicking the link below the form.</p>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="submit" v-model="isValid">
        <v-text-field
            autofocus
            type="password"
            v-model="password"
            color="dark"
            v-validate="'required'"
            label="Password"
            data-vv-name="password"
            :error-messages="errors.collect('password')"
        ></v-text-field>
        <v-text-field
            type="password"
            v-model="repeatPassword"
            color="dark"
            v-validate="'required'"
            data-vv-name="repeatPassword"
            label="Repeat Password"
            :error-messages="errors.collect('repeatPassword')"
        ></v-text-field>

        {{error}}

        <v-btn type="submit" :color="status.color" :dark="status.dark" block>
          {{status.submitTitle}}
        </v-btn>

        <p class="text-lg-right mt-4">
          <v-btn flat small to="/login">Back to login.</v-btn>
        </p>
      </v-form>
    </v-card-text>
  </v-card>
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
        const { token } = this.$route.params;

        if (!this.isValid) {
          return;
        }

        this.status = { submitTitle: 'Saving the new password...', color: 'default' };

        await this.$store.dispatch('resetPassword', { token, password })
          .then(() => {
            this.status = { submitTitle: 'Finished! Logging you in automatically...', color: 'success', dark: true };
          })
          .catch((error) => {
            this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
            this.error = error;
          });
      },
    },
  };
</script>
