<template>
  <div id="manage">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/custom.jpg')"
        ><div class="overlay-container"></div>
      </parallax>

      <div class="parallax-content-text">
        <h1 class="h1-seo">Manage</h1>
      </div>
    </div>
    <div class="section px-0 mt-4">
      <tabs :labels="['Users', 'Events', 'News']" @update:next-tab="changeTab"></tabs>
      <div class="col-12 container-bg-grey py-3">
        <users-overview v-if="currentTab === 'Users'"></users-overview>
        <events-overview v-else-if="currentTab === 'Events'"></events-overview>
        <news-overview v-else></news-overview>
      </div>
    </div>
    <div class="section">
      <AchievementCounter :editable="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Parallax, AchievementCounter, Tabs } from "@/components";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import NewsOverview from "./overviews/NewsOverview.vue";
import EventsOverview from "./overviews/EventsOverview.vue";
import UsersOverview from "./overviews/UsersOverview.vue";

export default defineComponent({
  name: "Manage",
  components: { Parallax, AchievementCounter, Tabs, NewsOverview, EventsOverview, UsersOverview },
  data() {
    return {
      currentTab: "Users",
      timestampToDate
    };
  },
  methods: {
    changeTab(nextTab: string) {
      this.currentTab = nextTab;
    }
  }
});
</script>
