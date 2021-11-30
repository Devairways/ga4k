<template>
  <vee-form class="col-12 col-lg-l8 form mx-auto" :validation-schema="loginSchema" @submit="login">
    <div class="form-group">
      <vee-field class="input" type="email" name="email" placeholder="Email" />
      <ErrorMessage class="alert" name="email" />
    </div>
    <div class="form-group">
      <vee-field class="input" type="password" name="password" placeholder="Wachtwoord" />
      <ErrorMessage class="alert" name="password" />
    </div>
    <button type="submit" :disabled="login_in_submission" class="button mr-auto">
      <img v-if="login_in_submission" class="loadingspinner" src="img/spinner.svg" alt="" />
      <p v-else class="m-0">{{ $t("forms.login.button") }}</p>
    </button>
  </vee-form>
</template>

<script lang="ts">
import { ElNotification } from "element-plus";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "LoginForm",
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:3|max:32"
      },
      login_in_submission: false
    };
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    async login(values: { email: string; password: string }) {
      this.login_in_submission = true;

      try {
        await this.$store.dispatch("login", values);
      } catch (error) {
        this.login_in_submission = false;
        ElNotification({
          title: "Login failed",
          message: "Invalid login details.",
          type: "error"
        });
        return;
      }
      ElNotification({
        title: "Login success",
        message: "You are now logged in.",
        type: "success"
      });
      this.toggleAuthModal();
    }
  }
});
</script>
