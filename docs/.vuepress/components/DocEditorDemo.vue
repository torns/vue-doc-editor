<template>
  <div style="margin-bottom: 3em" v-if="docEditorLoaded">
    <DocEditor
      :content.sync="content"
      :editor-obj.sync="editor"
      :headings.sync="headings"
      :multiple="false"
      :editable="editable"
    >
    </DocEditor>

    <p>{{ content }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      headings: "",
      editable: true,
      editor: null,
    };
  },
  computed: {
    multiple: (that) => ({
      wsurl: "ws://172.16.26.69:90",
      room: "xsdadsadas1",
      user: `user-${new Date().getTime()}`,
      head: "",
    }),
  },
};
</script>
