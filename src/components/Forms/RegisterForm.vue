<template>
  <vee-form
    class="col-8 form d-flex flex-wrap mx-auto"
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData"
  >
    <div class="form-group col-12 col-md-6">
      <vee-field type="text" name="name" class="input" placeholder="Naam" />
      <ErrorMessage class="alert" name="name" />
    </div>
    <div class="form-group col-12 col-md-6">
      <vee-field type="email" name="email" class="input" placeholder="Email" />
      <ErrorMessage class="alert" name="email" />
    </div>
    <div class="form-group col-12 col-md-6">
      <vee-field type="number" name="age" class="input" />
      <ErrorMessage class="alert" name="age" />
    </div>
    <div class="form-group col-12 col-md-6">
      <vee-field as="select" name="country" class="input">
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="alert" name="country" />
    </div>
    <div class="form-group col-12 col-md-6">
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input class="input" type="password" placeholder="Wachtwoord" v-bind="field" />
        <div class="alert" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <div class="form-group col-12 col-md-6">
      <vee-field
        type="password"
        name="confirm_password"
        class="input"
        placeholder="Herhaal Wachtwoord"
      />
      <ErrorMessage class="alert" name="confirm_password" />
    </div>
    <button type="submit" :disabled="reg_in_submission" class="button mr-auto ml-3">
      <img v-if="reg_in_submission" class="loadingspinner" src="img/spinner.svg" alt="" />
      <p v-else class="m-0">Registreer</p>
    </button>
  </vee-form>
</template>

<script lang="ts">
import { UserData } from "@/apiServices/interface";
import { defineComponent } from "@vue/runtime-core";
import { ElNotification } from "element-plus";
import { mapState } from "vuex";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:3|max:100",
        confirm_password: "passwords_mismatch:@password",
        country: "required|country_excluded:Antarctica"
      },
      userData: {
        age: 0,
        country: "USA"
      },
      reg_in_submission: false
    };
  },
  methods: {
    async register(values: UserData) {
      this.reg_in_submission = true;

      try {
        await this.$store.dispatch("register", values);
      } catch (error) {
        this.reg_in_submission = false;
        ElNotification({
          title: "Failed",
          message: "An unexpected error occured. Please try again later.",
          type: "error"
        });
        return;
      }
      ElNotification({
        title: "Success",
        message: "The account has been created.",
        type: "success"
      });
    }
  },
  computed: {
    ...mapState({
      userId: (state: any) => state.auth.userId
    })
  }
});
</script>
