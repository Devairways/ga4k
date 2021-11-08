<template>
  <div class="modal" :class="{ hidden: !showModal }">
    <div class="body" :class="large ? 'col-12 col-md-6' : 'col-10 col-md-4'">
      <div class="header">
        <slot name="title"><h2>Title</h2></slot>
        <div class="modal-close" @click.prevent="close">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <slot name="body"><h2>body</h2></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Modal",
  props: {
    close: { type: Function as PropType<() => void> },
    showModal: {
      type: Boolean
    },
    large: {
      type: Boolean,
      default: false
    }
  }
});
</script>
