<template>
  <nav
    :class="[!backgroundTransparent || showMenu ? '' : 'transparent']"
    class="navbar d-flex justify-content-between"
  >
    <slot name="navbar-logo"></slot>
    <navbar-toggle-button
      v-if="isPortableDevice"
      @update:show-menu="toggleShowMenu"
      :showMenu="showMenu"
    ></navbar-toggle-button>
    <ul class="navbar-nav" :class="{ 'd-flex': !isPortableDevice, 'navbar-nav-open': showMenu }">
      <slot name="navbar-menu"></slot>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarToggleButton from "./NavbarToggleButton.vue";

export default defineComponent({
  name: "Navbar",
  props: {
    colorOnScroll: {
      type: String,
      default: "0"
    },
    isPortableDevice: Boolean
  },
  provide() {
    return { toggleShowMenu: this.toggleShowMenu };
  },
  components: {
    NavbarToggleButton
  },
  data() {
    return {
      showMenu: false,
      backgroundTransparent: true,
      currentScrollValue: 0
    };
  },
  methods: {
    toggleShowMenu(bool: boolean) {
      this.showMenu = bool;
    },
    scrollListener() {
      let scrollValue = document.body.scrollTop || document.documentElement.scrollTop;
      this.backgroundTransparent = scrollValue < Number(this.colorOnScroll);
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeUnmount() {
    document.removeEventListener("scroll", this.scrollListener);
  }
});
</script>

<style lang="scss">
.navbar {
  position: fixed;
  padding: 0 35px;
  background-color: rgb(44, 44, 44);
  width: 100%;
  z-index: 5;
  transition: background-color 0.2s linear;
  @media screen and (max-width: 1065px) {
    padding: 0 15px;
    p {
      width: max-content;
    }
  }

  &-nav {
    @media screen and (max-width: 1065px) {
      position: absolute;
      left: 0;
      top: -600px;
      opacity: 0;
      background-color: rgb(44, 44, 44);
      width: 100%;
      transition: all 0.6s ease-in-out;
    }
    &-open {
      top: 60px;
      opacity: 1;
    }
  }

  li {
    max-width: max-content;
    @media screen and (max-width: 1065px) {
      max-width: unset;
      margin: 5px 10px;
      padding: 10px 0;
      border: 1px solid #262525;
      border-radius: 5px;
    }
  }
}

.transparent {
  background-color: transparent;
}
</style>
