<template>
  <v-card>

    <v-card-title primary-title class="mb-0">
      <div>
        <h2 class="headline pb-0">{{title}}</h2>
        <p class="mb-0">You can create your new account here.</p>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="submit" v-model="isValid">
        <v-text-field
            autofocus
            type="displayName"
            color="dark"
            v-model="displayName"
            v-validate="'required'"
            label="Display Name"
            data-vv-name="displayName"
            :error-messages="errors.collect('displayName')"
        ></v-text-field>
        <v-text-field
            type="email"
            color="dark"
            v-model="email"
            v-validate="'required|email'"
            label="E-mail address"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
        ></v-text-field>
        <v-text-field
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

        <v-alert
            :value="!!error"
            color="error"
            icon="warning"
            outline
        >{{error}}
        </v-alert>


        <v-btn type="submit" :color="status.color" :dark="status.dark" block>
          {{status.submitTitle}}
        </v-btn>

        <p class="text-lg-right mt-4">
          <v-btn flat small to="/login">Back to the login!</v-btn>
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
