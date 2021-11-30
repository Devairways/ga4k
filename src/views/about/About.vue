<template>
  <div id="about">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/custom.jpg')"
        ><div class="overlay-container"></div>
      </parallax>

      <div class="parallax-content-text">
        <h1 class="h1-seo">{{ $t("about.title") }}</h1>
      </div>
    </div>
    <div class="section">
      <div class="container text-center">
        <div class="col-12 col-lg-10">
          <h1 class="brand-established f_alg pt-4">-EST- 2020</h1>
          <p class="description mb-4">{{ $t("about.description") }}</p>
        </div>
      </div>
    </div>
    <div class="section p-0">
      <div class="container-bg-grey pb-4 d-flex flex-column">
        <h2 class="title ml-4 mr-auto">{{ $t("about.founders") }}</h2>
        <div class="col-12 row info mx-auto">
          <div v-for="user in usersList" :key="user.id" class="info-card">
            <profile-card :user="user"></profile-card>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="col-12 col-lg-10 row">
          <div class="col-12 col-lg-6 mx-auto">
            <h2 class="title">{{ $t("about.location.province") }}</h2>
            <p class="description mb-4">
              {{ $t("about.location.office_text") }}
            </p>
            <ul class="pl-3">
              <li><i class="fas fa-map-marker-alt"></i> {{ $t("about.location.adress") }}</li>
              <li><i class="fas fa-mobile-alt"></i> {{ $t("about.location.phone") }}</li>
              <li><i class="far fa-envelope"></i> info@guardianangels4kids.nl</li>
              <li>
                {{ $t("about.location.kvk") }}
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-6 mx-auto ">
            <h2 class="title">{{ $t("about.contact_form.title") }}</h2>
            <p class="description mb-4">
              {{ $t("about.contact_form.description") }}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import { Parallax, ProfileCard, ContactForm } from "@/components";
import { UserData } from "@/apiServices/interface";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "About",
  components: { Parallax, ProfileCard, ContactForm },
  data() {
    return {
      usersList: [] as UserData[],
      pendingRequest: false,
      timestampToDate
    };
  },
  methods: {
    async getUsers() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;
      const users = await ApiController.user.getFounders(4);

      users?.docs.map(doc =>
        this.usersList.push(({ id: doc.id, ...doc?.data() } as unknown) as UserData)
      );

      this.pendingRequest = false;
    }
  },

  created() {
    this.getUsers();
  }
});
</script>

<style lang="scss" scoped>
#about {
  .info {
    padding: 0;
    margin-bottom: 20px;

    &-card {
      width: 25%;
      padding: 0;

      .item-card {
        background-position: center;
        background-size: cover;
        max-width: 512px;
      }

      @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 50%;
      }

      @media screen and (max-width: 767px) {
        width: 100%;
      }

      img {
        width: inherit;
        filter: grayscale(1);
      }
    }
  }
  .title {
    font-size: 45px;
    font-weight: 400;
    padding: 0;
  }
}
</style>
