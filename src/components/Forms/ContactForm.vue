<template>
  <vee-form :validation-schema="schema" @submit="submit" class="form" :initial-values="userData">
    <div class="form-group">
      <vee-field class="input" type="text" name="name" placeholder="Naam" />
      <ErrorMessage class="alert" name="name" />
    </div>
    <div class="form-group">
      <vee-field class="input" type="textarea" name="email" placeholder="Email" />
      <ErrorMessage class="alert" name="email" />
    </div>
    <div class="form-group">
      <textarea placeholder="Bericht" rows="5" class="input" name="body"></textarea>
      <ErrorMessage class="alert" name="body" />
    </div>
    <button type="submit" :disabled="reg_in_submission" class="button">
      Verzend
    </button>
  </vee-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        body: "required|min:0|max:3000"
      },
      userData: {
        country: "USA"
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_msg: "Please wait! Your account is being created."
    };
  },
  methods: {
    submit() {
      console.log("sending message");
    }
  }
});
</script>
