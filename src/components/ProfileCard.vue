<template>
  <div
    class="item-card col-12 col-md-3 d-flex justify-content-center"
    :style="{ backgroundImage: `url(${user?.profilePicUrl || 'img/julie.jpg'})` }"
  >
    <div class="item-card-content">
      <h2>{{ user?.name }}</h2>
      <p class="description m-0">{{ user?.email }}</p>
      <p>{{ user?.phone }}</p>
      <p>{{ userCountry }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserData } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";

export default defineComponent({
  name: "ProfileCard",
  props: {
    user: { type: Object as PropType<UserData> }
  },
  data() {
    return {
      countryList: this.$tm("countries"),
      timestampToDate
    };
  },
  computed: {
    userCountry() {
      const countryCode = this.user?.country;
      const countrylist = this.countryList as [];
      let countryName;

      countrylist.forEach((country: { code: string; name: string }) => {
        if (this.$rt(country.code) === countryCode) {
          countryName = this.$rt(country.name);
        }
      });
      return countryName ?? countryCode;
    }
  }
});
</script>

<style lang="scss" scoped>
.item {
  padding: 0;
  &-card {
    height: 400px;
    min-width: 350px;
    width: 100%;
    max-width: 400px;
    overflow: hidden;
    filter: grayscale(1);

    @media screen and (max-width: 767px) {
      margin: auto;
    }

    &-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.85);
      box-shadow: inset 0 0 0 0 rgba(21, 21, 21, 0.85);
      opacity: 0;
      box-sizing: border-box;
      transition: opacity 0.4s, box-shadow 0.3s ease;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:hover {
        opacity: 1;
        box-shadow: inset 0 0 0 15px rgba(21, 21, 21, 0.85);
      }
    }
  }
}
</style>
