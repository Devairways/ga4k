<template>
  <div id="eventdetail">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/custom.jpg')"
        ><div class="overlay-container"></div>
      </parallax>
      <div class="parallax-content-text">
        <h1 class="h1-seo">Events</h1>
      </div>
    </div>
    <div class="main">
      <div class="section">
        <div class="container flex-column">
          <div class="col-10 row mx-auto">
            <div v-if="eventDetail.id" class="col-12">
              <h1 class="title">{{ eventDetail.title }}</h1>
              <p>{{ timestampToDate(eventDetail.createdAt) }}</p>

              <div class="description" v-html="eventDetail.body"></div>
            </div>
            <img v-else class="loadingspinner" src="img/black-spinner.svg" alt="" />
          </div>
          <div>
            <el-image
              v-for="image in eventImages"
              :key="image.slice(4, 12)"
              style="width: 100px; height: 100px"
              class="p-2"
              :src="image"
              :preview-src-list="eventImages"
            >
            </el-image>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container flex-column breaker">
        <div class="title">
          <h2>Gerelateerd</h2>
        </div>
        <div class="col-12 ">
          <Carousel type="card" />
        </div>
      </div>
    </div>
    <div class="section">
      <AchievementCounter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Parallax, Carousel, AchievementCounter } from "@/components";
import { EventItem } from "@/apiServices/interface";
import { storage } from "@/plugins/firebase";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "EventDetail",
  components: { Parallax, Carousel, AchievementCounter },
  props: ["itemId"],
  data() {
    return {
      eventDetail: {} as EventItem,
      eventImages: [] as string[],
      pendingRequest: false,
      timestampToDate
    };
  },
  methods: {
    async getEventItem(eventItemId: string) {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      const eventItem = await ApiController.events.getEventItem(eventItemId);

      if (eventItem) {
        this.eventDetail = ({ ...eventItem, id: eventItemId } as unknown) as EventItem;
      }
      this.pendingRequest = false;
    },
    async getImages(eventItemId: string) {
      const storageRef = storage.ref().child(`events/${eventItemId}`);
      const itemList = await storageRef.listAll();
      itemList.items.forEach(async e => this.eventImages.push(await e.getDownloadURL()));
    }
  },

  created() {
    this.getEventItem(this.itemId);
    this.getImages(this.itemId);
  },
  watch: {
    itemId(updatedId) {
      this.getEventItem(updatedId);
      this.getImages(updatedId);
    }
  }
});
</script>

<style lang="scss" scoped>
#eventdetail {
  .title {
    font-family: inherit;
  }

  .description {
    max-width: unset;
  }

  .info {
    padding: 0;
    &-card {
      max-height: 230px;
      overflow: hidden;
      padding: 0 !important;
      img {
        width: inherit;
      }
    }
  }
}
</style>
