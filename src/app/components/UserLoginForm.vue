<template>
  <v-card>

    <v-card-title primary-title>
      <div>
        <h2 class="headline mb-0">Cloudspider Admin</h2>
        <p>Welcome! Please login first</p>
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
        <v-text-field
            type="password"
            color="dark"
            v-model="password"
            v-validate="'required'"
            label="Password"
            data-vv-name="password"
            :error-messages="errors.collect('password')"
        ></v-text-field>

        <v-alert
            :value="!!error"
            color="error"
            icon="warning"
            outline
        >
          {{error}}
        </v-alert>


        <v-btn type="submit" :color="status.color" :dark="status.dark" block>
          {{status.submitTitle}}
        </v-btn>

        <p class="text-lg-right mt-4">
          <v-btn flat small to="/forgot-password">Lost your password? Reset it here!</v-btn>
        </p>
        <p class="text-lg-right mt-4">
          <v-btn flat small to="/registration">Register yourself now!</v-btn>
        </p>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      title: String,
      submitTitle: String,
    },
    data() {
      return {
        isValid: false,
        email: 'redroest@gmail.com',
        password: 'gompie2:',
        error: '',
        status: { submitTitle: 'Login', color: 'secondary', dark: true },
      };
    },

    methods: {
      async submit() {
        await this.$validator.validateAll();

        const { email, password } = this;

        if (!this.isValid) {
          return;
        }

        this.status = { submitTitle: 'Logging you in...', color: 'default' };

        await this.$store.dispatch('login', { email, password })
          .catch((error) => {
            this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
            this.error = error;
          })
      },
    },
  };
</script>
