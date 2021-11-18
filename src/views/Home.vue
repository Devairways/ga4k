<template>
  <div id="home">
    <div class="page-header-enlarge">
      <parallax class="parallax-header-image" style="background-image:url('img/main.png')"
        ><div class="overlay-container"></div>
      </parallax>

      <div class="parallax-content">
        <img class="GA-logo" src="img/logo.svg" alt="" />
        <h1>Welkom bij de <span class="brand-label special_icon">Guardian Angels</span></h1>
        <h3>Klaar voor de rit van je leven?</h3>
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
          <button type="primary" @click="redirect('/about')" class="button mx-auto">
            Lees meer
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
              <h2 class="title f_GthR">Beleven</h2>
              <p class="description m-2">
                De wind in je haar en de kracht van de motor die je voelt ronken vanuit je stoel.
              </p>
            </div>
            <div class="col-10 col-md-4 d-none d-md-block info-card">
              <img src="img/black_trike.jpg" alt="" />
            </div>
          </div>
          <div class="col-md-12 row info mx-auto">
            <div class="col-12 col-md-4 text-center info-card">
              <h2 class="title f_GthR">Toeren</h2>
              <p class="description m-2">
                The great open road awaits! Het stalen ros staat klaar om je een rit te bezorgen die
                je niet snel vergeet.
              </p>
            </div>
            <div class="col-10 col-md-4 d-none d-md-block info-card">
              <img src="img/scene.jpg" alt="" />
            </div>
            <div class="col-12 col-md-4 text-center info-card">
              <h2 class="title f_GthR">Nooit meer vergeten!</h2>
              <p class="description m-2">
                Een dag triken is een dag leven alsof je je op Route 66 begeeft, zeker een ervaring
                die je nog lang bij zal blijven.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container flex-column">
        <div class="title mr-auto">
          <h2>Recente events</h2>
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
      padding: 10px 0;

      @media screen and (max-width: 767px) {
        width: 240px;
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
