<template>
  <div id="news-overview">
    <div class="col-12">
      <h2 class="title">Nieuws</h2>
      <div class="col-12 row">
        <h3 class="col-10">
          aantal: <span>{{ newsList.length }}</span>
        </h3>
        <router-link to="/news/add"
          ><button class="button">{{ `Nieuw item  ` }}<i class="fas fa-plus"></i></button
        ></router-link>
      </div>

      <div class="col-12 row mx-auto p-0">
        <h3 class="col-3">Titel</h3>
        <h3 class="col-3">Aangemaakt op</h3>
        <h3 class="col-4">Omschrijving</h3>
        <h3 class="col-2">Acties</h3>
      </div>
      <div class="col-12 item">
        <div v-for="newsItem in newsList" :key="newsItem.id" class="item-row">
          <h4 class="col-3">{{ newsItem?.title }}</h4>
          <p class="col-3">{{ timestampToDate(newsItem?.createdAt) }}</p>
          <p class="col-4">{{ truncateString(newsItem?.description, 80) }}</p>
          <div class="col-2">
            <router-link :to="{ path: `/news/edit/${newsItem?.id}` }" append
              ><i class="fas fa-edit col-1"></i
            ></router-link>
            <i class="far fa-trash-alt col-1" @click="deleteItem(newsItem?.id)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { newsCollection } from "@/plugins/firebase";
import { NewsItem } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import { truncateString } from "@/plugins/helpers/stringHelpers";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "NewsOverview",
  data() {
    return {
      newsList: [] as NewsItem[],
      pendingRequest: false,
      pageLimit: 20,
      newsItemCounter: 20,
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
        this.getNewsItems();
      }
    },
    async getNewsItems() {
      if (this.pendingRequest || this.endOfList) {
        return;
      }
      this.pendingRequest = true;
      const newsItems = await ApiController.news.getNewsItemList(this.pageLimit, this.lastestDoc);

      newsItems?.docs.map(doc =>
        this.newsList.push(({ id: doc.id, ...doc?.data() } as unknown) as NewsItem)
      );

      if (!newsItems?.docs.length || newsItems.docs.length < this.pageLimit) {
        this.endOfList = true;
        this.pendingRequest = false;
        return;
      }

      this.newsItemCounter += this.pageLimit;
      this.pendingRequest = false;
    },
    async deleteItem(id: string) {
      this.newsList.filter(item => item.id !== id);
      await ApiController.news.deleteNewsItem(id);
    }
  },

  watch: {
    newsItemCounter: async function() {
      if (this.newsList.length) {
        const latest = this.newsList[this.newsList.length - 1].id;
        this.lastestDoc = await newsCollection.doc(latest).get();
      }
    }
  },
  created() {
    this.getNewsItems();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
});
</script>

<style lang="scss">
#news-overview {
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
