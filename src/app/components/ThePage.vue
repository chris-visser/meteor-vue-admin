<template>
  <v-content>
    <v-container fluid :fill-height="fillHeight">
      <v-layout>
        <slot name="page-header" />

        <slot name="page-body" />
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    props: {
      'fill-height': Boolean,
    },
  };
</script>
