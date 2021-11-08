<template>
  <div id="add-update-event">
    <div class="page-header">
      <parallax class="parallax-header-image" style="background-image:url('img/rent.jpg')">
      </parallax>
      <div class="container">
        <div class="parallax-content-text">
          <h1 class="h1-seo">Events</h1>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="col-12 container d-flex flex-column">
        <div class="title col-8 mx-auto">
          <h2>{{ edit ? "Update item" : "Nieuw item" }}</h2>
        </div>
        <vee-form
          :validation-schema="schema"
          @submit="addEventItem"
          class="col-8 form d-flex flex-wrap"
          :initial-values="data"
        >
          <div class="form-group col-12 col-md-6">
            <vee-field class="input" type="text" name="title" placeholder="Titel" />
            <ErrorMessage class="alert" name="title" />
          </div>
          <div class="form-group col-12 col-md-6">
            <vee-field class="input" type="date" name="eventDate" placeholder="Datum" />
            <ErrorMessage class="alert" name="eventDate" />
          </div>
          <div class="form-group col-12">
            <textarea
              placeholder="Korte omschrijving"
              rows="5"
              class="input"
              name="shortDesc"
              v-model="data.shortDesc"
            ></textarea>
            <ErrorMessage class="alert" name="shortDesc" />
          </div>
          <div class="form-group col-12">
            <editor
              @update:body-content="updateBodyContent"
              :bodyContent="data.body"
              v-if="displayEditor"
            ></editor>
            <ErrorMessage class="alert" name="body" />
          </div>
          <el-upload
            list-type="picture-card"
            :action="'undefined'"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="uploadNewPicture"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" center
            ><img :src="dialogImageUrl" alt="preview" />
          </el-dialog>
          <button type="submit" :disabled="pendingRequest" class="button mx-auto">
            verzend
          </button>
        </vee-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ApiController from "@/apiServices/ApiController";
import { Parallax, Editor } from "@/components";
import { EventItemPost } from "@/apiServices/interface";
import { eventsCollection, storage } from "@/plugins/firebase";
import { timestampToDate } from "@/plugins/helpers/timeHelpers";
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
import { FormActions } from "vee-validate";

export default defineComponent({
  name: "AddEventItem",
  components: { Parallax, Editor },
  props: ["eventItemId", "edit"],
  data() {
    return {
      schema: {
        title: "required|min:3|max:100|alpha_spaces",
        eventDate: "required"
      },
      data: {
        title: "",
        eventDate: new Date(),
        shortDesc: "",
        body: ""
      },
      pendingRequest: false,
      isSubmitted: false,
      itemId: this.eventItemId ?? "",
      basePictureUrl: "",
      displayEditor: false,
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    async uploadNewPicture(val: any) {
      try {
        const storageRef = storage.ref().child(`events/${this.itemId}/${val.file.uid}`);
        const uploadedPicture = await storageRef.put(val.file);
        if (!this.basePictureUrl) this.basePictureUrl = await uploadedPicture.ref.getDownloadURL();
      } catch (err) {
        console.warn(err);
      }
    },
    handleRemove(file: any) {
      const storageRef = storage.ref().child(`events/${this.itemId}/${file.uid}`);
      storageRef.delete();
    },
    async handlePictureCardPreview(file: any) {
      const storageRef = storage.ref().child(`events/${this.itemId}/${file.uid}`);
      const pictureUrl = await storageRef.getDownloadURL();

      this.dialogImageUrl = pictureUrl;
      this.dialogVisible = true;
    },
    updateBodyContent(bodytext: string) {
      this.data.body = bodytext;
    },
    async addEventItem(
      values: { title: string; shortDesc: string; eventDate: string },
      { resetForm }: FormActions<Record<string, unknown>>
    ) {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      const eventItem: EventItemPost = {
        title: values.title,
        body: JSON.stringify(this.data.body),
        createdAt: new Date(),
        eventDate: new Date(values.eventDate),
        description: this.data.shortDesc,
        basePictureUrl: this.basePictureUrl
      };
      ApiController.events.updateEventItem(this.itemId, eventItem);

      this.pendingRequest = false;
      this.data = { title: "", shortDesc: "", eventDate: new Date(), body: "" };
      this.isSubmitted = true;
      resetForm();
      router.push("/manage");
    }
  },
  async created() {
    if (this.eventItemId && this.edit) {
      const item = await ApiController.events.getEventItem(this.eventItemId);
      this.data.title = item?.title ?? "";
      this.data.eventDate = item?.eventDate
        ? new Date(timestampToDate(item?.eventDate))
        : new Date();
      this.data.shortDesc = item?.description ?? "";
      this.data.body = item?.body ?? "";
      this.displayEditor = true;
      return;
    }

    try {
      const createdDoc = await eventsCollection.add({});
      this.itemId = createdDoc.id;
      this.displayEditor = true;
    } catch (error) {
      console.warn(error);
    }
  },
  async beforeUnmount() {
    if (!this.isSubmitted) {
      try {
        await eventsCollection.doc(this.itemId).delete();
      } catch (error) {
        console.warn(error);
      }
    }
  }
});
</script>
