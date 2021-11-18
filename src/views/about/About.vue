<template>
  <div id="about">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/custom.jpg')"
        ><div class="overlay-container"></div>
      </parallax>

      <div class="parallax-content-text">
        <h1 class="h1-seo">About us</h1>
      </div>
    </div>
    <div class="section">
      <div class="container text-center">
        <div class="col-12 col-lg-10">
          <h1 class="brand-established f_alg pt-4">-EST- 2020</h1>
          <p class="description mb-4">
            Wij zijn een nederlandse trikestichting die toerritten aanbied voor kansarme
            kinderen/volwassene of anderzijds met beperkingen, ons team is volledig uitgerust met de
            kennis en ervaring om voor deze groep leuke, stoere en vooral veilige dagtrips te
            verzorgen. Dit doen wij met heel veel plezier en natuurlijk onze trikes!
          </p>
        </div>
      </div>
    </div>
    <div class="section p-0">
      <div class="container-bg-grey d-flex flex-column">
        <h2 class="title mr-auto">Oprichters</h2>
        <div>
          <div class="col-md-12 row info mx-auto">
            <div v-for="user in usersList" :key="user.id" class="col-10 col-md-4 info-card">
              <profile-card :user="user"></profile-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Parallax } from "@/components";
import { defineComponent } from "@vue/runtime-core";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import { ProfileCard } from "@/components";
import { UserData } from "@/apiServices/interface";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "About",
  components: { Parallax, ProfileCard },
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
      const users = await ApiController.user.getAllUsers(3);

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
      padding: 0;

      @media screen and (max-width: 767px) {
        width: 240px;
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
    line-height: 10px;
  }
}
</style>
