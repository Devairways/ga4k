<template>
  <footer class="footer" :data-background-color="backgroundColor">
    <div class="container" style="max-width: 1400px;">
      <div class="row mx-auto">
        <div class="text-center col-10 col-lg-4 mx-auto">
          <h2>{{ $t("layout.footer.interested_title") }}</h2>
          <h5 class="description mb-4">
            {{ $t("layout.footer.interested_body") }}
          </h5>
        </div>
        <div class="col-10 col-lg-8 d-md-flex links mx-auto">
          <div class="p-3 link-block">
            <h3 class="mb-2">{{ $t("layout.footer.contact_title") }}</h3>
            <ul>
              <li>
                <router-link to="/">
                  <i class="fas fa-map-marker-alt special_icon"></i>
                  {{ $t("layout.footer.contact_adres") }}
                </router-link>
              </li>
              <li>
                <router-link to="/">
                  <i class="fas fa-mobile-alt special_icon"></i>
                  {{ $t("layout.footer.contact_phone") }}
                </router-link>
              </li>
              <li>
                <a href="mailto: info@guardianangels4kids.nl">
                  <i class="far fa-envelope special_icon"></i>
                  info@guardianangels4kids.nl
                </a>
              </li>
              <li>
                <router-link to="/">
                  {{ $t("layout.footer.contact_kvk") }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="p-3 link-block">
            <h3 class="mb-2">{{ $t("layout.footer.more_title") }}</h3>
            <ul>
              <li>
                <router-link to="/about">
                  <i class="now-ui-icons business_chart-pie-36"></i>
                  {{ $t("layout.footer.more_about") }}
                </router-link>
              </li>
              <li>
                <router-link to="/news">
                  <i class="now-ui-icons business_chart-pie-36"></i
                  >{{ $t("layout.footer.more_news") }}
                </router-link>
              </li>
              <li>
                <router-link to="/events">
                  <i class="now-ui-icons business_chart-pie-36"></i>
                  {{ $t("layout.footer.more_events") }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="p-3 link-block">
            <div>
              <h3 class="mb-2">{{ $t("layout.footer.links_title") }}</h3>
              <ul>
                <li>
                  <router-link to="/">
                    <i class="now-ui-icons business_chart-pie-36"></i>
                    {{ $t("layout.footer.links_placeholder") }}
                  </router-link>
                </li>
                <li>
                  <router-link to="/">
                    <i class="now-ui-icons business_chart-pie-36"></i>
                    {{ $t("layout.footer.links_placeholder") }}
                  </router-link>
                </li>
                <li>
                  <router-link to="/">
                    <i class="now-ui-icons business_chart-pie-36"></i>
                    {{ $t("layout.footer.links_placeholder") }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
    <div class="container">
      <div class="copyright">{{ `GA4k &copy; - ${year}.` }}</div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainFooter",
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
});
</script>

<style lang="scss" scoped>
footer {
  background-color: #2c2c2c;
  color: #fff;
  padding-top: 6rem;

  @media screen and (max-width: 1065px) {
    padding-top: 3rem;
  }

  .links {
    justify-content: space-around;

    li {
      padding: 2px;
      margin: auto;
      a {
        color: #fff;
        .fa-map-marker-alt:before {
          padding-left: 2px;
        }
        .fa-mobile-alt:before {
          padding-left: 3px;
        }
      }
    }
    @media screen and (max-width: 1065px) {
      display: block;
    }
    @media screen and (max-width: 767px) {
      text-align: center;
    }
  }
}
</style>
