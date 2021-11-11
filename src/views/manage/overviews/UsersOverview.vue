<template>
  <div id="users-overview">
    <div class="col-12">
      <h2 class="title">Gebruikers</h2>
      <div class="col-12 row">
        <h3 class="col-10">
          aantal: <span>{{ usersList.length }}</span>
        </h3>
        <router-link to="/register"
          ><button class="button">{{ `Nieuwe gebruiker  ` }}<i class="fas fa-plus"></i></button
        ></router-link>
      </div>
      <div class="item row">
        <div
          v-for="user in usersList"
          :key="user.id"
          class="item-card col-12 col-md-3 d-flex justify-content-center"
          :style="{ backgroundImage: `url(${user?.profilePicUrl || 'img/julie.jpg'})` }"
        >
          <div class="item-card-content">
            <h2>{{ user?.name }}</h2>
            <p class="description m-0">{{ user?.email }}</p>
            <p>{{ user?.phone }}</p>
            <p>{{ user?.country }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usersCollection } from "@/plugins/firebase";
import { UserData } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";

export default defineComponent({
  name: "UsersOverview",
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
      try {
        this.pendingRequest = true;
        const users = await usersCollection.get();

        users.docs.map(doc =>
          this.usersList.push(({ id: doc.id, ...doc?.data() } as unknown) as UserData)
        );
      } catch (error) {
        console.warn(error);
      }
      this.pendingRequest = false;
    }
  },
  created() {
    this.getUsers();
  }
});
</script>

<style lang="scss">
#users-overview {
  width: 100%;
  .item {
    padding: 0;
    &-card {
      height: 400px;
      width: 100%;
      min-width: 350px;
      max-width: 400px;
      width: 400px;
      overflow: hidden;
      filter: grayscale(1);

      @media screen and (max-width: 767px) {
        margin: auto;
      }

      &-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.85);
        box-shadow: inset 0 0 0 0 rgba(21, 21, 21, 0.85);
        opacity: 0;
        box-sizing: border-box;
        transition: opacity 0.4s, box-shadow 0.3s ease;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &:hover {
          opacity: 1;
          box-shadow: inset 0 0 0 15px rgba(21, 21, 21, 0.85);
        }
      }
    }
  }
}
</style>
