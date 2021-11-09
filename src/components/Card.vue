<template>
  <div class="col-11 card mx-auto p-0">
    <slot name="img"><img class="d-block" src="img/scene.jpg" :alt="itemId"/></slot>
    <div class="card-text">
      <slot name="title">No data found.</slot>
      <slot name="timestamp"></slot>
      <slot name="description"></slot>
      <router-link v-if="linkToItem" :to="linkToItem" class="mt-auto">
        <button type="primary" class="button" round block size="lg">Bekijk de rit</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Card",
  props: { linkToItem: String }
});
</script>

<style lang="scss">
.card {
  width: 100%;
  margin: 20px auto;
  display: flex !important;
  color: #475669;
  font-size: 18px;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 40px -10px rgba(60, 113, 224, 0.25);

  &-text {
    padding: 10px 30px;
    width: 60%;
  }

  img {
    width: 40%;
    filter: grayscale(1);
  }

  p:nth-of-type(2) {
    height: 134px;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  a {
    text-decoration: none;
    position: fixed;
    bottom: 25px;
  }

  button {
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    &-text {
      color: #fff !important;
      padding: 10px 30px;
      width: 100%;
      z-index: 2;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    a {
      text-decoration: none;
      position: fixed;
      bottom: 25px;
    }

    button {
      cursor: pointer;
    }
  }
}
</style>
