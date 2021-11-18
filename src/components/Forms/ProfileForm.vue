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
        <option value="Founder">Oprichter</option>
        <option value="Member">Lid</option>
        <option value="Associate">Partner</option>
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
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="alert" name="country" />
    </div>
    <!-- Password -->
    <div class="form-group">
      <p>Wachtwoord aanpassen</p>
      <vee-field
        name="password"
        :bails="false"
        v-slot="{ field, errors }"
        :class="editMode ? 'readonly' : ''"
        :readonly="!editMode"
      >
        <input class="input" type="password" placeholder="Wachtwoord" v-bind="field" />
        <div class="alert" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
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
      <p class="m-0">{{ editMode ? "Opslaan" : "Bewerken" }}</p>
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
