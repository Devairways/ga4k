<template>
  <div class="col-12 masonry" ref="gallery">
    <div
      class="masonry-item"
      v-for="(item, index) in items"
      :key="index"
      v-for-callback="{
        key: index, // this will contain the item key that was generated with `v-for`
        array: items, // the actual `v-for` array
        callback: callback // your callback function (in this example, it's defined in the component methods
      }"
    >
      <slot name="body" :item="item" :redirectTo="redirectTo"> body goes here</slot>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MasonryGallery",
  props: { items: Array },
  directives: {
    forCallback(el, binding) {
      let element = binding.value;
      if (element.key == element.array.length - 1)
        if (typeof element.callback === "function") {
          element.callback();
        }
    }
  },
  methods: {
    callback() {
      this.waitForImages();
    },
    resizeMasonryItem(item) {
      var grid = document.getElementsByClassName("masonry")[0],
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap")),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"));

      var rowSpan = Math.ceil((Math.random() * 200 + 400) / (rowHeight + rowGap));

      item.style.gridRowEnd = "span " + rowSpan;
      item.querySelector(".masonry-content").style.height = rowSpan * 10 + "px";
    },

    resizeAllMasonryItems() {
      const allItems = this.$refs.gallery.children;
      for (var i = 0; i > allItems.length; i++) {
        this.resizeMasonryItem(allItems[i]);
      }
    },
    waitForImages() {
      const allItems = this.$refs.gallery.children;

      const self = this;
      for (var i = 0; i < allItems.length; i++) {
        imagesLoaded(allItems[i], function(instance) {
          var item = instance.elements[0];
          self.resizeMasonryItem(item);
        });
      }
    },

    redirectTo(route) {
      if (route) {
        router.push(route);
      }
    }
  },

  mounted() {
    var masonryEvents = ["load", "resize"];
    const self = this;
    masonryEvents.forEach(function(event) {
      window.addEventListener(event, self.resizeAllMasonryItems);
    });
  },
  beforeUnmount() {
    var masonryEvents = ["load", "resize"];
    const self = this;
    masonryEvents.forEach(function(event) {
      window.removeEventListener(event, self.resizeAllMasonryItems);
    });
  }
});
</script>

<style lang="scss">
:root {
  counter-reset: masonry;
}
.masonry {
  display: grid;
  overflow: hidden;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-auto-rows: 0;
}

.masonry-item {
  background-color: #eee;
  border-radius: 5px;
  margin: 10px 5px;
  overflow: hidden;
  cursor: pointer;
  &:hover .masonry-item-background {
    transform: scale(1.1);
  }
}

.masonry-item,
.masonry-item img {
  position: relative;
}

.masonry-item:after {
  font-weight: bold;
  content: "\2192";
  padding-bottom: 115px;
  padding-right: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  transition: all 0.1s ease-in;
  pointer-events: none;
}

.masonry-item:hover:after {
  font-size: 55px;
  color: #c59d5f;
  background-color: rgba(0, 0, 0, 0.75);
}

.masonry-item-background {
  height: -webkit-fill-available;
}

.masonry-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-position: center;
  background-size: cover;
  div {
    background-color: #fff;
    padding: 5px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    z-index: 2;
  }
  h2 {
    margin: 5px 0;
  }
}
</style>
