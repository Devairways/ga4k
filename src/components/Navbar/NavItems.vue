<template>
  <li class="nav-item">
    <router-link to="/" class="nav-link" @click.stop="closeNav">
      <i class="fa fa-home" aria-hidden="true"></i>
      <p>Home</p>
    </router-link>
  </li>
  <li class="nav-item">
    <router-link to="/news" class="nav-link" @click.stop="closeNav">
      <i class="fa fa-newspaper-o" aria-hidden="true"></i>
      <p>Nieuws</p>
    </router-link>
  </li>
  <template v-if="!isPortableDevice">
    <drop-down tag="li" title="Evenementen" icon="fa fa-calendar" class="nav-item">
      <router-link to="/events" class="dropdown-item">
        <i class="now-ui-icons business_chart-pie-36"></i> Aankomende events
      </router-link>
      <router-link to="/eventshistory" class="dropdown-item">
        <i class="now-ui-icons design_bullet-list-67"></i> Eventshistorie
      </router-link>
    </drop-down>
    <drop-down tag="li" title="Over ons" icon="fa fa-building" class="nav-item">
      <router-link to="/about" class="dropdown-item">
        <i class="now-ui-icons business_chart-pie-36"></i> Over ons </router-link
      ><router-link to="/partners" class="dropdown-item">
        <i class="now-ui-icons design_bullet-list-67"></i> Partners
      </router-link>
    </drop-down>
    <li class="nav-item" v-if="!userLoggedIn">
      <router-link class="nav-link" to="/" @click.prevent="toggleAuthModal">
        <i class="fa fa-user" aria-hidden="true"></i>
        <p>Leden</p>
      </router-link>
    </li>
    <drop-down tag="li" title="Leden" icon="fa fa-user" class="nav-item" v-else>
      <router-link to="/profile" class="dropdown-item">
        <i class="now-ui-icons users_circle-08"></i> Profiel
      </router-link>
      <router-link to="/manage" class="dropdown-item">
        <i class="now-ui-icons users_single-02"></i> Manage </router-link
      ><router-link to="/" @click="signout" class="dropdown-item">
        <i class="now-ui-icons ui-1_calendar-60"></i> Logout
      </router-link>
    </drop-down>
  </template>
  <template v-else>
    <li class="nav-drop d-flex flex-column">
      <div class="nav-drop-title" @click="showSublist('events')">
        <i class="fa fa-calendar" aria-hidden="true"></i>
        <p>Evenementen</p>
      </div>
      <div v-if="sublistToShow === 'events'" class="nav-drop-sublist">
        <router-link class="nav-link" to="/events" @click.stop="closeNav">
          <i class="now-ui-icons business_chart-pie-36"></i>+ Aankomende events
        </router-link>
        <router-link class="nav-link" to="/eventshistory" @click.stop="closeNav">
          <i class="now-ui-icons design_bullet-list-67"></i>+ Eventshistorie
        </router-link>
      </div>
    </li>
    <li class="nav-drop d-flex flex-column">
      <div class="nav-drop-title" @click="showSublist('about')">
        <i class="fa fa-building" aria-hidden="true"></i>
        <p>Over ons</p>
      </div>
      <div v-if="sublistToShow === 'about'" class="nav-drop-sublist">
        <router-link class="nav-link" to="/about" @click.stop="closeNav">
          <i class="now-ui-icons business_chart-pie-36"></i>+ Over ons
        </router-link>
        <router-link class="nav-link" to="/partners" @click.stop="closeNav">
          <i class="now-ui-icons design_bullet-list-67"></i>+ Partners
        </router-link>
      </div>
    </li>
    <li class="nav-item" v-if="!userLoggedIn">
      <router-link class="nav-link" to="/" @click.prevent="toggleAuthModal">
        <i class="fa fa-user" aria-hidden="true"></i>
        <p>Leden</p>
      </router-link>
    </li>
    <li v-else class="nav-drop d-flex flex-column">
      <div class="nav-drop-title" @click="showSublist('members')">
        <i class="fa fa-user" aria-hidden="true"></i>
        <p>Leden</p>
      </div>

      <div v-if="sublistToShow === 'members'" class="nav-drop-sublist">
        <router-link class="nav-link" to="/profile" @click.stop="closeNav">
          <i class="now-ui-icons business_chart-pie-36"></i>+ Profiel
        </router-link>
        <router-link class="nav-link" to="/manage" @click.stop="closeNav">
          <i class="now-ui-icons design_bullet-list-67"></i>+ Manage </router-link
        ><router-link
          class="nav-link"
          to="/"
          @click="
            () => {
              signout();
              closeNav();
            }
          "
        >
          <i class="now-ui-icons design_bullet-list-67"></i>+ Logout
        </router-link>
      </div>
    </li>
  </template>

  <li class="nav-item">
    <a
      class="nav-link special_icon"
      rel="tooltip"
      title="Follow us on Twitter"
      data-placement="bottom"
      href="https://twitter.com/CreativeTim"
      target="_blank"
    >
      <i class="fab fa-twitter"></i>
      <p class="d-md-none">Twitter</p>
    </a>
  </li>
  <li class="nav-item">
    <a
      class="nav-link special_icon"
      rel="tooltip"
      title="Like us on Facebook"
      data-placement="bottom"
      href="https://www.facebook.com/CreativeTim"
      target="_blank"
    >
      <i class="fab fa-facebook-square"></i>
      <p class="d-md-none">Facebook</p>
    </a>
  </li>
  <li class="nav-item">
    <a
      class="nav-link special_icon"
      rel="tooltip"
      title="Follow us on Instagram"
      data-placement="bottom"
      href="https://www.instagram.com/CreativeTimOfficial"
      target="_blank"
    >
      <i class="fab fa-instagram"></i>
      <p class="d-md-none">Instagram</p>
    </a>
  </li>
</template>

<script>
import { DropDown } from "@/components";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "NavItems",
  components: {
    DropDown
  },
  inject: ["toggleShowMenu"],
  props: {
    isPortableDevice: Boolean
  },
  data() {
    return {
      sublistToShow: ""
    };
  },
  computed: {
    ...mapState({
      authModalShow: state => state.auth.authModalShow,
      userLoggedIn: state => state.auth.userLoggedIn
    })
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    signout() {
      this.$store.dispatch("signout");
      this.$router.push("/");
      window.location.reload();
    },
    showSublist(sublist) {
      if (this.sublistToShow === sublist) this.sublistToShow = "";
      this.sublistToShow = sublist;
    },
    closeNav() {
      if (this.toggleShowMenu) {
        this.toggleShowMenu(false);
      }
    }
  },
  created() {
    this.$store.dispatch("init_login");
  }
});
</script>

<style lang="scss" scoped>
.nav-drop {
  &-title {
    padding-left: 0.7rem;
    color: #fff;
    cursor: pointer;
    i {
      opacity: 0.5;
    }
  }
  &-sublist {
    display: flex;
    flex-direction: column;
    padding-left: 2rem;

    a {
      color: #fff;
      padding: 8px 0 !important;
      cursor: pointer;
    }
  }
}

i {
  padding-right: 5px;
}
</style>
