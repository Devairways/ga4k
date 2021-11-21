<template>
  <div id="partners">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/custom.jpg')"
        ><div class="overlay-container"></div>
      </parallax>

      <div class="parallax-content-text">
        <h1 class="h1-seo">Partners</h1>
      </div>
    </div>
    <div class="section">
      <div class="container text-center">
        <div class="col-12 col-lg-10 partner-list">
          <div class="partner-list-card">
            <a href="https://angelanddemontattoo.nl/" target="_blank" rel="noopener noreferrer"
              ><img
                src="https://firebasestorage.googleapis.com/v0/b/guardianangels-31d3f.appspot.com/o/partners%2Fangel_and_demon.png?alt=media&token=d6466b4e-b9d9-41f3-b58a-2a4aef93267d"
                alt="partner"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Parallax } from "@/components";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Partners",
  components: { Parallax }
});
</script>

<style lang="scss" scoped>
#partners {
  .partner-list {
    min-height: 300px;
    padding: 35px 0;
    &-card {
      width: 200px;
      max-width: 50%;
      padding: 10px;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
