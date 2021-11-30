<template>
  <div id="users-overview">
    <div class="col-12">
      <h2 class="title">{{ $t("manage.overview.users.title") }}</h2>
      <div class="col-12 row">
        <h3 class="col-10">
          {{ $t("manage.overview.users.amount") }}
          <span>{{
            $t("manage.overview.users.users", usersList.length, { count: usersList.length })
          }}</span>
        </h3>
        <router-link to="/register"
          ><button class="button">
            {{ $t("manage.overview.users.button") }}<i class="fas fa-plus"></i></button
        ></router-link>
      </div>
      <div class="item row">
        <profile-card v-for="user in usersList" :key="user.id" :user="user"> </profile-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usersCollection } from "@/plugins/firebase";
import { UserData } from "@/apiServices/interface";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import { ProfileCard } from "@/components";

export default defineComponent({
  name: "UsersOverview",
  components: { ProfileCard },
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
  }
}
</style>
