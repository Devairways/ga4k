<template>
  <Modal :showModal="authModalShow" :close="toggleAuthModal">
    <template v-slot:title><h2>Login</h2></template>
    <template v-slot:body><login-form></login-form></template>
  </Modal>
</template>

<script lang="ts">
import { mapMutations, mapState } from "vuex";
import LoginForm from "./Forms/LoginForm.vue";
import Modal from "./Modal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthModal",
  components: {
    LoginForm,
    Modal
  },
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      authModalShow: (state: any) => state.auth.authModalShow
    })
  },
  methods: {
    ...mapMutations(["toggleAuthModal"])
  }
});
</script>
