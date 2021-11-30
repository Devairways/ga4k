<template>
  <div id="news">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/scene.jpg')"
        ><div class="overlay-container"></div>
      </parallax>
      <div class="parallax-content-text">
        <h1 class="h1-seo">{{ $t("news.title") }}</h1>
      </div>
    </div>
    <div class="section">
      <div class="container flex-column">
        <div class="title mr-auto pl-5">
          <h2>{{ $t("news.news.special") }}</h2>
        </div>
        <div class="col-12 ">
          <Carousel fetchType="News" />
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <masonry-gallery :items="newslist">
          <template v-slot:body="{ item: newsItem, redirectTo }">
            <div
              class="masonry-content"
              style="background-image:url('img/scene.jpg')"
              @click="redirectTo(`/news/${newsItem?.id}`)"
            >
              <img
                :src="newsItem.basePictureUrl ?? 'img/ryan.jpg'"
                alt="background"
                class="masonry-item-background"
              />
              <div class="titlecard">
                <h2>{{ newsItem.title }}</h2>
                <p class="description">{{ timestampToDate(newsItem.createdAt) }}</p>
                <span>{{ newsItem.description }}</span>
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
import { newsCollection } from "@/plugins/firebase";
import { NewsItem } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "News",
  components: { Parallax, Carousel, MasonryGallery },
  data() {
    return {
      newslist: [] as NewsItem[],
      pendingRequest: false,
      pageLimit: 9,
      newsItemCounter: 9,
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
        this.newslist.push(({ id: doc.id, ...doc?.data() } as unknown) as NewsItem)
      );

      if (!newsItems?.docs.length || newsItems?.docs.length < this.pageLimit) {
        this.endOfList = true;
        this.pendingRequest = false;
        return;
      }

      this.newsItemCounter += this.pageLimit;
      this.pendingRequest = false;
    }
  },

  watch: {
    newsItemCounter: async function() {
      if (this.newslist.length) {
        console.log("getting");
        const latest = this.newslist[this.newslist.length - 1].id;
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
#news {
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
