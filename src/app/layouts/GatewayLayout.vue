<template>
  <VApp id="inspire">
    <VContent>
      <VContainer
        fluid
        fill-height
      >
        <VLayout
          align-center
          justify-center
        >
          <VFlex
            xs12
            sm8
            md4
          >
            <slot />
          </VFlex>
        </VLayout>
      </VContainer>
    </VContent>
  </VApp>
</template>

<script>
import MeteorUsersMixin from '../mixins/gateway';

export default {
  mixins: [MeteorUsersMixin({ isGateway: true })],

  components: {},

};
</script>

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>
