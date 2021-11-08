<template>
  <div id="about">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/custom.png')">
      </parallax>
      <div class="container">
        <div class="parallax-content">
          <img class="GA-logo" src="img/logo.svg" alt="" />
          <h1 class="h1-seo">Welkom bij de <span class="special_icon">Guardian Angels</span></h1>
          <h3>Klaar voor de rit van je leven?</h3>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="col-12 container">
        <Carousel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Carousel from "@/components/Carousel.vue";
import { Parallax } from "@/components";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "About",
  components: { Carousel, Parallax }
});
</script>
