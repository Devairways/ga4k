<template>
  <vee-form
    class="col-12 form mx-auto"
    :validation-schema="schema"
    @submit="!editMode ? toggleEditMode() : updateUserInfo($event)"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="form-group">
      <vee-field
        type="text"
        name="name"
        class="input"
        placeholder="Naam"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      />
      <ErrorMessage class="alert" name="name" />
    </div>
    <!-- Email -->
    <div class="form-group">
      <vee-field
        type="email"
        name="email"
        class="input"
        placeholder="Email"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      />
      <ErrorMessage class="alert" name="email" />
    </div>
    <div class="form-group">
      <vee-field
        type="phone"
        name="phone"
        class="input"
        placeholder="Telefoon"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      />
      <ErrorMessage class="alert" name="phone" />
    </div>
    <div class="form-group">
      <vee-field
        as="select"
        name="role"
        class="input"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      >
        <option value="Founder">{{ $t("forms.profile.role.founder") }}</option>
        <option value="Member">{{ $t("forms.profile.role.member") }}</option>
        <option value="Associate">{{ $t("forms.profile.role.partner") }}</option>
      </vee-field>
      <ErrorMessage class="alert" name="role" />
    </div>
    <!-- Country -->
    <div class="form-group">
      <vee-field
        as="select"
        name="country"
        class="input"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      >
        <option v-for="country in countryList" :key="country.code" :value="$rt(country.code)">{{
          $rt(country.name)
        }}</option>
      </vee-field>
      <ErrorMessage class="alert" name="country" />
    </div>
    <!-- Password -->
    <div class="form-group">
      <p>{{ $t("forms.profile.change_password") }}</p>
      <vee-field
        type="password"
        name="password"
        class="input"
        placeholder="Wachtwoord"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      />
      <ErrorMessage class="alert" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="form-group">
      <vee-field
        type="password"
        name="confirm_password"
        class="input"
        placeholder="Herhaal Wachtwoord"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      />
      <ErrorMessage class="alert" name="confirm_password" />
    </div>
    <button type="submit" class="button mr-auto edit-btn">
      <p class="m-0">{{ $tc("forms.profile.button", !editMode ? 2 : 1) }}</p>
    </button>
  </vee-form>
</template>

<script lang="ts">
import ApiController from "@/apiServices/ApiController";
import { UserData } from "@/apiServices/interface";
import { defineComponent } from "@vue/runtime-core";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "ProfileForm",
  props: {
    userId: { type: String, required: true }
  },
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        role: "required",
        password: "min:3|max:100",
        confirm_password: "passwords_mismatch:@password",
        country: "required|country_excluded:Antarctica"
      },
      userData: {
        role: "",
        country: "",
        email: "",
        name: "",
        phone: "",
        profilePicUrl: "",
        password: "",
        confirm_password: ""
      } as UserData,
      countryList: this.$tm("countries"),
      editMode: false
    };
  },
  emits: ["dist-userdata"],
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async getUserInfo() {
      const user = await ApiController.user.getUserData(this.userId);
      if (!user) {
        return;
      }
      this.userData = ({ ...this.userData, ...user.data() } as unknown) as UserData;
      this.$emit("dist-userdata", {
        profilePicture: this.userData.profilePicUrl,
        name: this.userData.name
      });
    },
    async updateUserInfo(val: UserData) {
      if (!this.editMode) return;
      const { role, name, country, email, phone } = val;
      await ApiController.user.updateUserData(this.userId, { role, name, country, email, phone });
      ElNotification({
        title: "Success",
        message: "Successfully updated profile.",
        type: "success"
      });
      this.toggleEditMode?.();
    }
  },
  created() {
    this.getUserInfo();
  }
});
</script>
<style lang="scss" scoped>
.readonly {
  border-color: #fff !important;
}
</style>
