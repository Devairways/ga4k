<template>
  <div id="events-overview">
    <div class="col-12">
      <h2 class="title">{{ $t("manage.overview.events.title") }}</h2>
      <div class="col-12 row">
        <h3 class="col-10">
          {{ $t("manage.overview.events.amount") }}
          <span>{{
            $t("manage.overview.events.items", eventsList.length, { count: eventsList.length })
          }}</span>
        </h3>
        <router-link to="/events/add"
          ><button class="button">
            {{ $t("manage.overview.events.button") }}<i class="fas fa-plus"></i></button
        ></router-link>
      </div>

      <div class="col-12 row mx-auto p-0">
        <h3 class="col-3">{{ $t("manage.overview.events.title_header") }}</h3>
        <h3 class="col-3">{{ $t("manage.overview.events.created_on_header") }}</h3>
        <h3 class="col-4">{{ $t("manage.overview.events.description_header") }}</h3>
        <h3 class="col-2">{{ $t("manage.overview.events.action_header") }}</h3>
      </div>
      <div class="col-12 item">
        <div v-for="eventsItem in eventsList" :key="eventsItem.id" class="item-row">
          <h4 class="col-3">{{ eventsItem?.title }}</h4>
          <p class="col-3">{{ timestampToDate(eventsItem?.createdAt) }}</p>
          <p class="col-4">{{ truncateString(eventsItem?.description, 80) }}</p>
          <div class="col-2">
            <router-link :to="{ path: `/events/edit/${eventsItem?.id}` }" append
              ><i class="fas fa-edit col-1"></i
            ></router-link>
            <i class="far fa-trash-alt col-1" @click="deleteItem(eventsItem?.id)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { eventsCollection } from "@/plugins/firebase";
import { EventItem } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import { truncateString } from "@/plugins/helpers/stringHelpers";
import ApiController from "@/apiServices/ApiController";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "EventsOverview",
  data() {
    return {
      eventsList: [] as EventItem[],
      pendingRequest: false,
      pageLimit: 20,
      eventsItemCounter: 20,
      lastestDoc: null as any,
      endOfList: false,
      timestampToDate,
      truncateString
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
        this.eventsList.push(({ id: doc.id, ...doc?.data() } as unknown) as EventItem)
      );

      if (!eventsItems?.docs.length || eventsItems.docs.length < this.pageLimit) {
        this.endOfList = true;
        this.pendingRequest = false;
        return;
      }

      this.eventsItemCounter += this.pageLimit;
      this.pendingRequest = false;
    },
    async deleteItem(id: string) {
      this.eventsList = this.eventsList.filter(item => item.id !== id);
      await ApiController.events.deleteEventItem(id);
      ElNotification({
        title: "Success",
        message: "Deleted eventitem",
        type: "success"
      });
    }
  },

  watch: {
    eventsItemCounter: async function() {
      if (this.eventsList.length) {
        const latest = this.eventsList[this.eventsList.length - 1].id;
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
#events-overview {
  width: 100%;
  .item {
    padding: 0;
    &-row {
      max-height: 65px;
      margin: 5px 0;
      border: 1px solid;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      align-items: center;

      img {
        width: inherit;
      }
      i {
        color: #000 !important;
        cursor: pointer;
      }
    }
  }
}
</style>
