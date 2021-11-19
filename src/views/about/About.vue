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
      <div class="container-bg-grey pb-4 d-flex flex-column">
        <h2 class="title ml-4 mr-auto">Oprichters</h2>
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
            <h2 class="title">Locatie Zuid-Holland</h2>
            <p class="description mb-4">
              Ons kantoor is gelegen in Spijkenisse nabij Rotterdam.
            </p>
            <ul class="pl-3">
              <li><i class="fas fa-map-marker-alt"></i> Junopad 5, Spijkenisse</li>
              <li><i class="fas fa-mobile-alt"></i> +31612345678</li>
              <li><i class="far fa-envelope"></i> GA@4kids.nl</li>
              <li>
                KVK: 1234567
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-6 mx-auto ">
            <h2 class="title">Klaar om te rijden?</h2>
            <p class="description mb-4">
              Neem dan contact met ons op via onderstaand formulier.
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
