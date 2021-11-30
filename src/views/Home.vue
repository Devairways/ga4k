<template>
  <div id="home">
    <div class="page-header-enlarge">
      <parallax class="parallax-header-image" style="background-image:url('img/main.png')"
        ><div class="overlay-container"></div>
      </parallax>

      <div class="parallax-content">
        <img class="GA-logo" src="img/logo.svg" alt="" />
        <h1>
          {{ $t("home.title") }}
          <span class="brand-label special_icon">{{ $t("home.brand") }}</span>
        </h1>
        <h3>{{ $t("home.subtitle") }}</h3>
      </div>
    </div>
    <div class="section">
      <div class="container text-center">
        <div class="col-12 col-lg-10">
          <h1 class="brand-established f_alg pt-4">-EST- 2020</h1>
          <p class="description mb-4">{{ $t("home.description") }}</p>
          <button type="primary" @click="redirect('/about')" class="button mx-auto">
            {{ $t("home.read_more") }}
          </button>
        </div>
      </div>
    </div>
    <div class="section p-0">
      <div class="container-bg-grey">
        <div>
          <div class="col-md-12 row info mx-auto">
            <div class="col-10 col-md-4 d-none d-md-block info-card">
              <img src="img/eva.jpg" alt="" />
            </div>
            <div class="col-12 col-md-4 text-center info-card">
              <h2 class="title f_GthR">{{ $t("home.activity.one.title") }}</h2>
              <p class="description m-2">
                {{ $t("home.activity.one.description") }}
              </p>
            </div>
            <div class="col-10 col-md-4 d-none d-md-block info-card">
              <img src="img/black_trike.jpg" alt="" />
            </div>
          </div>
          <div class="col-md-12 row info mx-auto">
            <div class="col-12 col-md-4 text-center info-card">
              <h2 class="title f_GthR">{{ $t("home.activity.two.title") }}</h2>
              <p class="description m-2">
                {{ $t("home.activity.two.description") }}
              </p>
            </div>
            <div class="col-10 col-md-4 d-none d-md-block info-card">
              <img src="img/scene.jpg" alt="" />
            </div>
            <div class="col-12 col-md-4 text-center info-card">
              <h2 class="title f_GthR">{{ $t("home.activity.three.title") }}</h2>
              <p class="description m-2">
                {{ $t("home.activity.three.description") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container flex-column">
        <div class="title mr-auto">
          <h2>{{ $t("home.recent_events") }}</h2>
        </div>
        <div class="col-12 ">
          <Carousel />
        </div>
      </div>
    </div>
    <div class="section">
      <AchievementCounter />
    </div>
    <div class="section">
      <div class="container">
        <div class="col-12 col-lg-10 row breaker">
          <div class="col-12 col-lg-6 mx-auto">
            <h2 class="title">{{ $t("home.location.province") }}</h2>
            <p class="description mb-4">
              {{ $t("home.location.office_text") }}
            </p>
            <ul class="pl-3">
              <li><i class="fas fa-map-marker-alt"></i> {{ $t("home.location.adress") }}</li>
              <li><i class="fas fa-mobile-alt"></i> {{ $t("home.location.phone") }}</li>
              <li><i class="far fa-envelope"></i> info@guardianangels4kids.nl</li>
              <li>
                {{ $t("home.location.kvk") }}
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-6 mx-auto ">
            <h2 class="title">{{ $t("home.contact_form.title") }}</h2>
            <p class="description mb-4">
              {{ $t("home.contact_form.description") }}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Parallax, Carousel, AchievementCounter, ContactForm } from "@/components";
import router from "@/router";

export default defineComponent({
  name: "Home",
  components: { Parallax, Carousel, AchievementCounter, ContactForm },
  methods: {
    redirect(route: string) {
      router.push(route);
    }
  }
});
</script>

<style lang="scss" scoped>
#home {
  .brand {
    &-established {
      font-size: 60px;
      font-weight: 700;
      line-height: 5px;
    }

    &-label {
      font-size: 45px;
      font-weight: 400;
      font-family: "GothRough";
    }
  }

  .info {
    padding: 0;
    &-card {
      max-height: 300px;
      overflow: hidden;
      padding: 0;

      @media screen and (max-width: 767px) {
        width: 240px;
        padding: 10px 0;
      }

      &-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.35);
        z-index: 10;
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
    padding-top: 0;
  }
}
</style>
