<template>
  <div id="events-history">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/scene.jpg')"
        ><div class="overlay-container"></div>
      </parallax>
      <div class="parallax-content-text">
        <h1 class="h1-seo">{{ $t("events.title") }}</h1>
      </div>
    </div>
    <div class="section">
      <div class="container flex-column">
        <div class="title mr-auto pl-5">
          <h2>{{ $t("events.history.special") }}</h2>
        </div>
        <div class="col-12 ">
          <Carousel />
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <masonry-gallery :items="eventslist">
          <template v-slot:body="{ item: eventsItem, redirectTo }">
            <div
              class="masonry-content"
              style="background-image:url('img/scene.jpg')"
              @click="redirectTo(`/events/${eventsItem?.id}`)"
            >
              <img
                :src="eventsItem?.basePictureUrl ?? 'img/ryan.jpg'"
                alt="background"
                class="masonry-item-background"
              />
              <div class="titlecard">
                <h2>{{ eventsItem.title }}</h2>
                <p class="description">{{ timestampToDate(eventsItem.createdAt) }}</p>
                <span>{{ eventsItem.description }}</span>
              </div>
            </div>
          </template>
        </masonry-gallery>
      </div>
      <img v-if="pendingRequest" class="loadingspinner col-12" src="img/black-spinner.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Parallax, Carousel, MasonryGallery } from "@/components";
import { eventsCollection } from "@/plugins/firebase";
import { EventItem } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "EventsHistory",
  components: { Parallax, Carousel, MasonryGallery },
  data() {
    return {
      eventslist: [] as EventItem[],
      pendingRequest: false,
      pageLimit: 9,
      eventsItemCounter: 9,
      lastestDoc: null as any,
      endOfList: false,
      timestampToDate
    };
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getEventsItems();
      }
    },
    async getEventsItems() {
      if (this.pendingRequest || this.endOfList) {
        return;
      }
      this.pendingRequest = true;
      const eventsItems = await ApiController.events.getEventItemList(
        this.pageLimit,
        this.lastestDoc
      );

      eventsItems?.docs.map(doc =>
        this.eventslist.push(({ id: doc.id, ...doc?.data() } as unknown) as EventItem)
      );

      if (!eventsItems?.docs.length || eventsItems?.docs.length < this.pageLimit) {
        this.endOfList = true;
        this.pendingRequest = false;
        return;
      }
      this.eventsItemCounter += this.pageLimit;
      this.pendingRequest = false;
    }
  },

  watch: {
    eventsItemCounter: async function() {
      if (this.eventslist.length) {
        const latest = this.eventslist[this.eventslist.length - 1].id;
        this.lastestDoc = await eventsCollection.doc(latest).get();
      }
    }
  },
  created() {
    this.getEventsItems();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
});
</script>

<style lang="scss">
#events-history {
  .loadingspinner {
    height: 50px;
  }

  .titlecard {
    height: 144px;
    padding-bottom: 35px;
    p {
      font-size: 14px;
      line-height: 5px;
      margin: 15px 0;
    }
  }
}
</style>
