<template>
  <component :is="componentType" :to="to" class="dropdown-item" @click.stop="closeNav">
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "nav-link",
  inject: ["toggleShowMenu", "closeDropDown"],
  props: {
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  computed: {
    componentType() {
      return this.to ? "router-link" : "a";
    }
  },
  methods: {
    closeNav() {
      if (this.toggleShowMenu) {
        this.toggleShowMenu(false);
      }
      if (this.closeDropDown) {
        this.closeDropDown();
      }
    }
  }
};
</script>
<style></style>
