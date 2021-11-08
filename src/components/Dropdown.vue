<template>
  <component
    class="dropdown"
    :is="tag"
    :class="[{ show: isOpen }, { dropdown: direction === 'down' }, { dropup: direction === 'up' }]"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot name="title">
      <a class="dropdown-toggle nav-link" :class="{ 'no-caret': hideArrow }" data-toggle="dropdown">
        <i :class="icon"></i>
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[{ 'dropdown-menu-right': position === 'left' }, { show: isOpen }]"
    >
      <slot></slot>
    </ul>
  </component>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Dropdown",
  props: {
    direction: {
      type: String,
      default: "down"
    },
    title: String,
    icon: String,
    position: String,
    hideArrow: Boolean,
    tag: {
      type: String,
      default: "li"
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  provide() {
    return {
      closeDropDown: this.closeDropDown
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    }
  }
});
</script>
<style lang="scss">
.dropdown {
  list-style-type: none;
  z-index: 6;

  i {
    padding-right: 5px;
    color: #fff;
  }
}

.dropdown .dropdown-toggle {
  cursor: pointer;
}
</style>
