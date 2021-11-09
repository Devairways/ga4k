<template>
  <div class="col-12 row tab">
    <div
      class="col-4 tab-label"
      v-for="(label, index) in labels"
      :key="index"
      :class="[tab === label ? 'tab-label-active' : '']"
      @click="changeTab(label)"
    >
      <h2 class="title my-0 py-1">{{ label }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";

export default defineComponent({
  name: "Tabs",
  emits: ["update:next-tab"],
  data() {
    return {
      tab: this.labels?.length ? this.labels[0] : "",
      timestampToDate
    };
  },
  props: {
    labels: Array as PropType<string[]>
  },
  methods: {
    changeTab(nextTab: string) {
      this.tab = nextTab;
      this.$emit("update:next-tab", this.tab);
    }
  }
});
</script>

<style lang="scss">
.tab {
  padding: 0 35px;

  &-label {
    overflow: hidden;
    height: 70px;
    min-width: 190px;
    max-width: 260px;
    width: min-content;
    text-align: center;
    border-radius: 15px 15px 0 0;
    background-color: #f8f8f8;
    cursor: pointer;

    @media screen and (max-width: 767px) {
      min-width: unset;
    }

    &-active {
      box-shadow: 0 -12px 15px 0 rgba(0, 0, 0, 0.15);
      background-color: #fff;
      z-index: 2;
    }

    img {
      width: inherit;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;
  }
}
</style>
