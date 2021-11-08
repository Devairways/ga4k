<template>
  <main-navbar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <main-footer />
</template>

<script lang="ts">
import MainNavbar from "@/components/Layout/MainNavbar.vue";
import MainFooter from "@/components/Layout/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainNavbar,
    MainFooter
  }
};
</script>

<style lang="scss"></style>
