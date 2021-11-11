<template>
  <component
    :is="'div'"
    class="row container text-center mx-auto "
    ref="achievementcounter"
    v-click-outside="closeEditMode"
  >
    <div class="col-6 col-md-3">
      <div class="form-group">
        <i v-if="editable" class="fas fa-edit col-1" @click="edit('milesCount')"></i>
        <input
          v-if="inEditMode === 'milesCount'"
          type="number"
          v-model="milesCount"
          ref="milesCount"
          @blur="updateAchievementData('miles', milesCount)"
          class="input"
        />
        <h2 v-else class="special_icon mb-3">{{ milesCount }}</h2>
      </div>
      <p>KM gereden</p>
    </div>
    <div class="col-6 col-md-3">
      <div class="form-group">
        <i v-if="editable" class="fas fa-edit col-1" @click="edit('clientsCount')"></i>
        <input
          v-if="inEditMode === 'clientsCount'"
          type="number"
          v-model="clientsCount"
          ref="clientsCount"
          @blur="updateAchievementData('clients_served', clientsCount)"
          class="input"
        />
        <h2 v-else class="special_icon mb-3">{{ clientsCount }}</h2>
      </div>
      <p>Blije gezichten</p>
    </div>
    <div class="col-6 col-md-3">
      <div class="form-group">
        <i v-if="editable" class="fas fa-edit col-1" @click="edit('eventsCount')"></i>
        <input
          v-if="inEditMode === 'eventsCount'"
          type="number"
          v-model="eventsCount"
          ref="eventsCount"
          @blur="updateAchievementData('events_hosted', eventsCount)"
          class="input mx-2"
        />
        <h2 v-else class="special_icon mb-3">{{ eventsCount }}</h2>
      </div>
      <p>Evenementen</p>
    </div>
    <div class="col-6 col-md-3">
      <div class="form-group">
        <i v-if="editable" class="fas fa-edit col-1" @click="edit('donationsCount')"></i>
        <input
          v-if="inEditMode === 'donationsCount'"
          type="number"
          v-model="donationsCount"
          ref="donationsCount"
          @blur="updateAchievementData('donation_amount', donationsCount)"
          class="input"
        />
        <h2 v-else class="special_icon mb-3">$ {{ donationsCount }}</h2>
      </div>
      <p>Opgehaald voor goede doelen</p>
    </div>
  </component>
</template>

<script lang="ts">
import ApiController from "@/apiServices/ApiController";
import { ElNotification } from "element-plus";
import { defineComponent } from "vue";

export interface MainAchievements {
  clients_served: number;
  donation_amount: number;
  events_hosted: number;
  miles: number;
}

export default defineComponent({
  name: "AchievementCounter",
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      achievements: { clients_served: 0, donation_amount: 0, events_hosted: 0, miles: 0 },
      clientsCount: 0,
      milesCount: 0,
      donationsCount: 0,
      eventsCount: 0,
      inEditMode: "",
      isIntersectingElement: false
    };
  },
  methods: {
    closeEditMode() {
      this.inEditMode = "";
    },
    edit(input: string) {
      const element = this.$refs[input] as HTMLInputElement;
      element?.focus?.();
      this.inEditMode = input;
    },
    async updateAchievementData(field: string, updatedValue: number) {
      await ApiController.data.updateAchievementData(field, updatedValue);
      ElNotification({
        title: "Success",
        message: "Updated achievementcounter field",
        type: "success"
      });
    },
    async getAchievementsData() {
      const main_achievements = await ApiController.data.getAchievementsData();
      if (main_achievements?.data()) {
        this.achievements = main_achievements.data() as MainAchievements;
      }
    }
  },
  mounted() {
    this.getAchievementsData();
    const sentinal = this.$refs["achievementcounter"] as Element;
    const handler = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        this.isIntersectingElement = true;
      }
    };
    const observer = new window.IntersectionObserver(handler);
    observer.observe(sentinal);
  },
  watch: {
    isIntersectingElement() {
      if (this.isIntersectingElement) {
        this.clientsCount++;
        this.milesCount++;
        this.donationsCount++;
        this.eventsCount++;
      }
    },
    clientsCount() {
      if (this.achievements.clients_served <= this.clientsCount) {
        return;
      }
      return setTimeout(() => {
        this.clientsCount++;
      }, 10);
    },
    milesCount() {
      if (this.achievements.miles <= this.milesCount) {
        return;
      }
      return setTimeout(() => {
        if (this.achievements.miles - this.milesCount >= 125) {
          this.milesCount += 125;
          return;
        }
        this.milesCount++;
      }, 10);
    },
    donationsCount() {
      if (this.achievements.donation_amount <= this.donationsCount) {
        return;
      }
      return setTimeout(() => {
        if (this.achievements.donation_amount - this.donationsCount >= 125) {
          this.donationsCount += 125;
          return;
        }
        this.donationsCount++;
      }, 10);
    },
    eventsCount() {
      if (this.achievements.events_hosted <= this.eventsCount) {
        return;
      }
      return setTimeout(() => {
        this.eventsCount++;
      }, 10);
    }
  }
});
</script>

<style lang="scss" scoped>
input {
  width: 80% !important;
  margin: auto !important;
  margin-top: 10px !important;
  z-index: 2;
}
i {
  position: absolute;
  right: 70px;
  cursor: pointer;
  top: 10px;

  &[class="fas fa-times col-1"] {
    top: -5px;
  }
}
</style>
