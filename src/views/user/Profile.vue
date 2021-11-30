<template>
  <div id="profile">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/rent.jpg')">
        <div class="overlay-container"></div>
        <div class="parallax-content-text">
          <h1 class="h1-seo">{{ $t("users.profile.title") }}</h1>
        </div></parallax
      >
    </div>
    <div class="section">
      <div class="container">
        <div class="col-12 row">
          <div class="col-md-4 col-12 d-flex flex-column align-items-center ">
            <h3 class="title mt-0 mb-1 pt-4">{{ userName }}</h3>
            <el-avatar :src="profilePictureUrl" :size="150">
              <el-avatar
                :size="150"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar
            ></el-avatar>
            <el-upload
              class="d-flex flex-column justify-content-center my-3"
              :action="'undefined'"
              :limit="1"
              :http-request="uploadNewPicture"
            >
              <el-button size="small" type="primary">{{ $t("users.profile.upload") }}</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  {{ $t("users.profile.size") }}
                </div>
              </template>
            </el-upload>
          </div>
          <div class="col-md-8 col-12">
            <profile-form @dist-userdata="getUserNameAndPicture" :userId="userId"></profile-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Parallax, ProfileForm } from "@/components";
import { storage, usersCollection } from "@/plugins/firebase";
import { defineComponent } from "@vue/runtime-core";
import { mapState } from "vuex";

export default defineComponent({
  name: "Profile",
  components: { Parallax, ProfileForm },
  data() {
    return {
      userName: "",
      profilePictureUrl: ""
    };
  },
  methods: {
    async uploadNewPicture(val: any) {
      try {
        const storageRef = storage.ref().child(`profilePictures/${this.userId}`);
        await storageRef.put(val.file);

        const profilePicUrl = await storageRef.getDownloadURL();
        await usersCollection.doc(this.userId).update({ profilePicUrl });
        this.profilePictureUrl = profilePicUrl;
      } catch (err) {
        console.warn(err);
      }
    },
    getUserNameAndPicture(val: { profilePicture: string; name: string }) {
      this.profilePictureUrl = val.profilePicture;
      this.userName = val.name;
    }
  },
  computed: {
    ...mapState({
      userId: (state: any) => state.auth.userId
    })
  }
});
</script>
<style lang="scss" scoped>
#profile {
  &-pic {
    height: 50px;
  }
  .edit-btn {
    width: 160px;
  }
}
</style>
