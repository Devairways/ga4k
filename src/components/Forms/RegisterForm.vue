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
      <vee-field as="select" name="country" class="input">
        <option v-for="country in countryList" :key="country.code" :value="$rt(country.code)">{{
          $rt(country.name)
        }}</option>
      </vee-field>
      <ErrorMessage class="alert" name="country" />
    </div>
    <div class="form-group col-12 col-md-6">
      <vee-field as="select" name="role" class="input">
        <option value="Founder">Oprichter</option>
        <option value="Member">Lid</option>
        <option value="Associate">Partner</option>
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

export type CountryType = {
  name: string;
  code: string;
};

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        password: "required|min:3|max:100",
        confirm_password: "passwords_mismatch:@password",
        country: "required|country_excluded:Antarctica",
        role: "required"
      },
      userData: {
        country: "US",
        memberSince: new Date()
      },
      countryList: this.$tm("countries"),
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
      this.reg_in_submission = false;
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
