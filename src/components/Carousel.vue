<template>
  <el-carousel v-if="listToRender.length" :type="carouselType">
    <el-carousel-item v-for="item in listToRender" :key="item.id">
      <card :linkToItem="`/${fetchType.toLowerCase()}/${item.id}`"
        ><template v-slot:img
          ><img
            class="d-block"
            :src="item?.basePictureUrl ?? 'img/julie.jpg'"
            :alt="item?.id"/></template
        ><template v-slot:title
          ><h1>{{ item.title }}</h1></template
        >
        <template v-slot:timestamp>
          <p class="description my-2">{{ timestampToDate(item.createdAt) }}</p></template
        ><template v-slot:description
          ><p>
            {{ item.description }}
          </p></template
        >
      </card>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { EventItem, NewsItem } from "@/apiServices/interface";
import { defineComponent, PropType } from "vue";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import Card from "./Card.vue";
import ApiController from "@/apiServices/ApiController";

export enum FetchType {
  News = "News",
  Events = "Events"
}

export default defineComponent({
  name: "Carousel",
  components: { Card },
  props: {
    type: {
      type: String,
      default: ""
    },
    fetchType: {
      type: String as PropType<FetchType>,
      default: FetchType.Events
    }
  },
  data() {
    return {
      newsList: [] as NewsItem[],
      eventList: [] as EventItem[],
      limit: 4,
      pendingRequest: false,
      timestampToDate
    };
  },
  methods: {
    async getNewsItems() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      const newsItems = await ApiController.news.getNewsItemList(this.limit);

      if (newsItems?.docs.length) {
        newsItems.docs.map(doc =>
          this.newsList.push(({ id: doc.id, ...doc.data() } as unknown) as NewsItem)
        );
      }

      this.pendingRequest = false;
    },
    async getEventItems() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      const eventItems = await ApiController.events.getEventItemList(this.limit);

      if (eventItems?.docs.length) {
        eventItems.docs.map(doc =>
          this.eventList.push(({ id: doc.id, ...doc.data() } as unknown) as EventItem)
        );
      }
      this.pendingRequest = false;
    }
  },
  computed: {
    carouselType() {
      if (window.innerWidth < 767) {
        return "";
      }
      return this.type;
    },
    listToRender() {
      if (this.fetchType === FetchType.Events) {
        return this.eventList;
      }
      return this.newsList;
    }
  },
  created() {
    if (this.fetchType === FetchType.Events) {
      this.getEventItems();
      return;
    }
    this.getNewsItems();
  }
});
</script>

<style lang="scss">
.el-carousel {
  width: 80%;
  margin: auto;
  &__container {
    height: 400px !important;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
}
</style>
