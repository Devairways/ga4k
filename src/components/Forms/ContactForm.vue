<template>
  <vee-form
    :validation-schema="schema"
    @submit="submitContactForm"
    class="form"
    :initial-values="userData"
  >
    <div class="form-group">
      <vee-field class="input" type="text" name="name" placeholder="Naam" />
      <ErrorMessage class="alert" name="name" />
    </div>
    <div class="form-group">
      <vee-field class="input" type="textarea" name="email" placeholder="Email" />
      <ErrorMessage class="alert" name="email" />
    </div>
    <div class="form-group">
      <textarea placeholder="Bericht" rows="5" class="input" name="body" v-model="body"></textarea>
      <ErrorMessage class="alert" name="body" />
    </div>
    <p v-if="reg_show_alert">{{ reg_alert_msg }}</p>
    <button type="submit" :disabled="reg_in_submission" class="button">
      Verzend
    </button>
  </vee-form>
</template>

<script lang="ts">
import ApiController from "@/apiServices/ApiController";
import { FormActions } from "vee-validate";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email"
      },
      body: "",
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_msg: "Bericht is verzonden!"
    };
  },
  methods: {
    async submitContactForm(
      values: { name: string; email: string },
      { resetForm }: FormActions<Record<string, unknown>>
    ) {
      const { name, email } = values;
      this.reg_in_submission = true;

      const submitResponse = await ApiController.data.submitContactForm(name, email, this.body);
      this.reg_in_submission = false;

      if (submitResponse) {
        this.reg_show_alert = true;
        this.body = "";
        resetForm();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
p {
  color: green;
}
</style>
