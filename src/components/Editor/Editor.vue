<template>
  <div class="my-4">
    <div v-if="editor">
      <menu-bar class="editor__header" :editor="editor" />
    </div>

    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./EditorMenuBar.vue";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";

export default {
  name: "Editor",
  components: {
    EditorContent,
    MenuBar
  },
  props: { bodyContent: String },
  emits: ["update:body-content"],
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Highlight, Text, TextStyle, TaskList, TaskItem],
      onUpdate: () => {
        this.$emit("update:body-content", this.editor.getHTML());
      },
      content: this.bodyContent
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
.ProseMirror {
  height: 600px;
  overflow-y: scroll;
  padding: 20px;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }
}
</style>
