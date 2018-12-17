<template>
  <v-card>

    <v-card-title primary-title>
      <div>
        <h2 class="headline mb-0">{{title}}</h2>
        <p>No worries. We got you covered. Just enter your e-mail address and we'll send you an e-mail with a link to
          reset your password.</p>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="submit" v-model="isValid">
        <v-text-field
            autofocus
            color="dark"
            type="email"
            v-model="email"
            v-validate="'required|email'"
            label="E-mail address"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
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
        email: '',
        error: '',
        status: { submitTitle: this.submitTitle, color: 'secondary', dark: true },
      };
    },

    methods: {
      async submit() {
        await this.$validator.validateAll();

        const { email } = this;

        if (!this.isValid) {
          return;
        }

        this.status = { submitTitle: 'Sending the reset e-mail...', color: 'default' };

        Accounts.forgotPassword({ email }, (error) => {
          this.status = { submitTitle: 'Finished! Please check your e-mail.', color: 'success', dark: true };

          if (error) {
            this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
            console.log(error);
            this.error = error.reason;
            return;
          }
        });
      },
    },
  };
</script>
