<template>
  <div id="hamburger-menu" @click="toggleMenuBar">
    <span class="bar" :class="{ cross_bar: showMenu }"></span>
    <span class="bar" :class="{ cross_bar: showMenu }"></span>
    <span class="bar" :class="{ cross_bar: showMenu }"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarToggleButton",
  props: {
    showMenu: Boolean
  },
  emits: ["update:show-menu"],
  provide() {
    return {
      closeNavbar: this.toggleMenuBar
    };
  },

  methods: {
    toggleMenuBar() {
      this.$emit("update:show-menu", !this.showMenu);
    }
  }
});
</script>

<style lang="scss">
#hamburger-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: min-content;
  height: 25px;
  cursor: pointer;
  margin: 15px 0;
  padding-top: 4px;
  padding-right: 10px;

  .bar {
    background: #c59d5f;
    width: 2.5rem;
    height: 0.2rem;
    margin: 2px 0;
    transition: all 0.3s linear;

    &:nth-child(2) {
      width: 1.2rem;
    }

    &:nth-child(3) {
      width: 2rem;
    }
  }

  .cross_bar {
    position: fixed;

    &:nth-child(1) {
      width: 2rem;
      z-index: 32;
      transform: rotateZ(-45deg) translateY(1.1rem);
      margin-top: -6px;
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      z-index: 32;
      transform: rotateZ(45deg) translateY(-1rem);
      margin-top: 18px;
    }
  }
}
</style>
