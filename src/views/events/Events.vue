<template>
  <div id="events">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/custom.jpg')"
        ><div class="overlay-container"></div>
      </parallax>

      <div class="parallax-content-text">
        <h1 class="h1-seo">Events</h1>
      </div>
    </div>
    <div class="section">
      <div class="container flex-column">
        <el-calendar ref="calendar">
          <template #header="{ date }">
            <span>{{ date }}</span>
            {{ setCalendarDate(date) }}
            <el-button-group>
              <el-button size="mini" @click="selectDate('prev-month')">Vorige maand</el-button>
              <el-button size="mini" @click="selectDate('today')">Vandaag </el-button>
              <el-button size="mini" @click="selectDate('next-month')">Volgende maand</el-button>
            </el-button-group> </template
          ><template #dateCell="{ data  }">
            <div class="calendaricon mx-auto" v-if="isEventDay(data.date)">
              <router-link :to="`/events/${isEventDay(data.date).id}`">
                <p class="m-0">
                  {{ data.date.toLocaleString("en-us", { month: "long" }) }}
                </p>
                <span> {{ data.date.getDate() }}</span>
              </router-link>
            </div>
            <p v-else>
              {{
                data.day
                  .split("-")
                  .slice(1)
                  .reverse()
                  .join("-")
              }}
            </p>
          </template></el-calendar
        >
      </div>
    </div>
    <div class="section">
      <div class="container flex-column">
        <div class="title mr-auto pl-5">
          <h2>Uitgelicht</h2>
        </div>
        <div class="col-12 ">
          <Carousel />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Parallax, Carousel } from "@/components";
import { EventItem } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import ApiController from "@/apiServices/ApiController";

export default defineComponent({
  name: "event",
  components: { Parallax, Carousel },
  setup() {
    const calendar = ref();
    const selectDate = (val: string) => {
      calendar.value.selectDate(val);
    };
    return {
      calendar,
      selectDate
    };
  },

  data() {
    return {
      eventList: [] as EventItem[],
      pendingRequest: false,
      pageLimit: 9,
      eventsItemCounter: 9,
      lastestDoc: null as any,
      endOfList: false,
      calendarMonth: "",
      timestampToDate
    };
  },
  methods: {
    setCalendarDate(date: string) {
      this.calendarMonth = date;
    },
    isEventDay(date: Date) {
      return this.eventList.find(event => timestampToDate(event.eventDate) === date.toDateString());
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getEvents();
      }
    },
    async getEvents() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;

      const eventItems = await ApiController.events.getSpecifiedMonthEvents(this.calendarMonth);

      if (eventItems?.docs.length) {
        eventItems.docs.map(doc =>
          this.eventList.push(({ id: doc.id, ...doc.data() } as unknown) as EventItem)
        );
      }
      this.pendingRequest = false;
    }
  },

  watch: {
    calendarMonth(next, current) {
      if (next !== current) {
        this.getEvents();
      }
    }
  },
  created() {
    this.getEvents();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
});
</script>

<style lang="scss">
#events {
  .cardlist {
    display: flex;
    flex-wrap: wrap;
  }
  .calendaricon {
    font-size: 1em; /* change icon size */
    display: block;
    position: relative;
    max-width: 130px;
    background-color: #fff;
    border-radius: 0.6em;
    box-shadow: 0 1px 0 #bdbdbd, 0 2px 0 #fff, 0 3px 0 #bdbdbd, 0 4px 0 #fff, 0 5px 0 #bdbdbd,
      0 0 0 1px #bdbdbd;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-transform: rotate(0deg) skewY(0deg);
    -webkit-transform-origin: 50% 10%;
    transform-origin: 50% 10%;
    * {
      display: block;
      width: 100%;
      font-size: 1em;
      font-weight: bold;
      font-style: normal;
      text-align: center;
    }

    p {
      position: absolute;
      top: 0;
      padding: 0.4em 0;
      color: #fff;
      background-color: #c59d5f;
      border-bottom: 1px dashed #8d6d3c;
      box-shadow: 0 2px 0 #c59d5f;
    }

    span {
      width: 100%;
      font-size: 1.5em;
      letter-spacing: -0.05em;
      padding-top: 1.6em;
      padding-bottom: 0.4em;
      color: #2f2f2f;
    }
  }

  .loadingspinner {
    height: 50px;
  }

  .eventday {
    .el-calendar-day & {
      background-color: rgba($color: #1cb15a8e, $alpha: 0.55);
    }
  }
}
</style>
