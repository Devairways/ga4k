<template>
  <div id="register-user">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/badass.jpg')"
        ><div class="overlay-container"></div>
      </parallax>
      <div class="container">
        <div class="parallax-content-text">
          <h1 class="h1-seo">Manage</h1>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="col-12 container d-flex flex-column">
        <div class="title col-8 mx-auto">
          <h2>Nieuwe gebruiker</h2>
        </div>
        <register-form></register-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Parallax, RegisterForm } from "@/components";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "RegisterUser",
  components: { Parallax, RegisterForm }
});
</script>
