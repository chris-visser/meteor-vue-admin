<template>
  <VCard>
    <VCardTitle primary-title>
      <div>
        <h2 class="headline mb-0">
          Recover password
        </h2>
        <p>
          No worries. We got you covered. Just enter your e-mail address and we'll send you an e-mail with a link to
          reset your password.
        </p>
      </div>
    </VCardTitle>

    <VCardText>
      <VForm
        v-model="isValid"
        @submit.prevent="submit"
      >
        <VTextField
          v-model="email"
          v-validate="'required|email'"
          autofocus
          color="dark"
          type="email"
          label="E-mail address"
          data-vv-name="email"
          :error-messages="errors.collect('email')"
        />

        {{ error }}

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
            :to="loginLink"
          >
            Back to login.
          </VBtn>
        </p>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script>

export default {
  props: {
    loginLink: { type: String, default: '/' },
  },
  data() {
    return {
      isValid: false,
      email: '',
      error: '',
      status: { submitTitle: 'Send reset e-mail', color: 'secondary', dark: true },
    };
  },

  methods: {
    async submit() {
      await this.$validator.validateAll();

      const { email } = this;

      if (!this.isValid) {
        return;
      }

      this.status = { submitTitle: 'Sending the reset e-mail...', color: 'default', dark: true };

      await this.$store.dispatch('forgotPassword', { email })
        .then(() => {
          this.status = { submitTitle: 'Finished! Please check your e-mail.', color: 'success', dark: true };
        })
        .catch((error) => {
          this.status = { submitTitle: 'Oops! Something went wrong...', color: 'error', dark: true };
          this.error = error;
        });
    },
  },
};
</script>
