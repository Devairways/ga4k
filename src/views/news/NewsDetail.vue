<template>
  <div id="newsdetail">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/rent.jpg')"
        ><div class="overlay-container"></div>
      </parallax>
      <div class="parallax-content-text">
        <h1 class="h1-seo">Nieuws</h1>
      </div>
    </div>
    <div class="main">
      <div class="section">
        <div class="container flex-column">
          <div class="col-10 row mx-auto">
            <div v-if="newsDetail.id" class="col-12">
              <h1 class="title">{{ newsDetail.title }}</h1>
              <p class="description m-2">{{ timestampToDate(newsDetail.createdAt) }}</p>

              <div v-html="newsDetail.body"></div>
            </div>
            <img v-else class="loadingspinner" src="img/black-spinner.svg" alt="" />
          </div>
          <div>
            <el-image
              v-for="image in newsImages"
              :key="image.slice(4, 12)"
              style="width: 100px; height: 100px"
              class="m-2 rounded"
              :src="image"
              :preview-src-list="newsImages"
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
          <Carousel type="card" fetchType="News" />
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
import { NewsItem } from "@/apiServices/interface";
import { storage } from "@/plugins/firebase";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "NewsDetail",
  components: { Parallax, Carousel, AchievementCounter },
  props: ["itemId"],
  data() {
    return {
      newsDetail: {} as NewsItem,
      newsImages: [] as string[],
      pendingRequest: false,
      timestampToDate
    };
  },
  methods: {
    async getNewsItem(newsItemId: string) {
      if (this.pendingRequest) {
        return;
      }
      try {
        this.pendingRequest = true;
        const newsItem = await ApiController.news.getNewsItem(newsItemId);

        if (newsItem) {
          this.newsDetail = ({ ...newsItem, id: newsItemId } as unknown) as NewsItem;
        }
      } catch (error) {
        console.warn(error);
      }
      this.pendingRequest = false;
    },
    async getImages(newsItemId: string) {
      const storageRef = storage.ref().child(`news/${newsItemId}`);
      this.newsImages = [];
      const itemList = await storageRef.listAll();
      itemList.items.forEach(async e => this.newsImages.push(await e.getDownloadURL()));
    }
  },

  created() {
    this.getNewsItem(this.itemId);
    this.getImages(this.itemId);
  },
  watch: {
    itemId(updatedId) {
      this.getNewsItem(updatedId);
      this.getImages(updatedId);
    }
  }
});
</script>

<style lang="scss" scoped>
#newsdetail {
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
