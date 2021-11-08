<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface ParallaxDataType {
  styles: Record<string, unknown>;
  debounceTimeout: number;
}

function debounce(func: () => void, wait: number, context: any, immediate = false) {
  let timeout: any = 0;
  return function() {
    const args: any = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export default defineComponent({
  name: "Parallax",
  data() {
    return {
      styles: {},
      debounceTimeout: 6
    };
  },
  methods: {
    handleScroll(scrollVal: number) {
      let oVal = scrollVal / 3;
      this.styles = {
        transform: `translate3d(0, ${oVal}px,0)`
      };
    },
    checkForParallax(scrollVal: number) {
      let fn = debounce(() => this.handleScroll(scrollVal), this.debounceTimeout, this);
      fn();
    }
  },
  mounted() {
    let self = this;
    window.addEventListener("scroll", function() {
      let scrollVal = this.scrollY;
      self.checkForParallax(scrollVal);
    });
  }
});
</script>
