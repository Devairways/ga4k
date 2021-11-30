<template>
  <navbar colorOnScroll="400" :isPortableDevice="isPortableDevice">
    <template v-slot:navbar-logo>
      <router-link class="navbar-brand special_icon" to="/">
        {{ $t("layout.nav.title") }}
      </router-link>
    </template>
    <template v-slot:navbar-menu>
      <nav-items :isPortableDevice="isPortableDevice"></nav-items> </template
    ><teleport v-if="authModalShow" to="#app"><auth-modal></auth-modal></teleport>
  </navbar>
</template>

<script>
import { Navbar, NavItems, AuthModal } from "@/components";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "MainNavbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    Navbar,
    NavItems,
    AuthModal
  },
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  computed: {
    ...mapState({
      authModalShow: state => state.auth.authModalShow
    }),
    isPortableDevice() {
      if (this.windowWidth < 1065) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  }
});
</script>

<style scoped>
i {
  padding-right: 5px;
}
</style>
