<script setup lang="ts">
  import {onMounted} from "vue";
  import { useCoreStore } from '@/modules/core';
  let coreStore = useCoreStore();
  onMounted(() => {
    coreStore.init();
  })
</script>
<style lang="scss">
  @import "@/assets/scss/app.scss";
</style>
<template>
  <v-app>
    <div v-if="!coreStore.isInited">
      loader
    </div>
    <v-card>
      <v-layout>
        <v-main style="height: 1200px">
          <router-view></router-view>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>
