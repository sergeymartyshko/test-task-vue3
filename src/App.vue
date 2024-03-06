<script setup lang="ts">
  import AppFooter from "@/components/app-footer/app-footer.vue";
</script>
<style lang="scss">
  @import "@/assets/scss/app.scss";
</style>
<template>
  <v-app>
    <v-card class="fill-height">
      <v-container fluid class="bg-swap-variant">
          <router-view></router-view>
      </v-container>
    </v-card>
    <AppFooter></AppFooter>
  </v-app>
</template>
