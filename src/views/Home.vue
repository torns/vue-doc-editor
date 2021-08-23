<template>
  <div class="flex-row">
    <p style="width: 20%">
      {{ content }}
    </p>

    <div style="width: 80%">
      <DocEditor
        :content.sync="content"
        :editor-obj.sync="editor"
        :multiple="false"
        :editable="editable"
      >
      </DocEditor>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      editable: true,
      editor: null,
    };
  },
  computed: {
    multiple: (that) => ({
      wsurl: "ws://liu.testoa3.pinnongjt.com:90",
      room: "xsdadsadas",
      user: `user-${new Date().getTime()}`,
      head: "",
    }),
  },
};
</script>
<style lang="scss" >
.flex-row {
  display: flex;
  flex-direction: row;
}
</style>
