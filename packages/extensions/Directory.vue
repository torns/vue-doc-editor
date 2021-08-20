<template>
  <div class="Directory-container" v-if="editor">
    {{ headings }}
    <!-- {{ editor && editor.state.doc }} -->
  </div>
</template>
<script>
import * as R from "ramda";
export default {
  props: {
    content: {
      type: [String, Object],
      default: "",
    },
    editor: "",
  },
  computed: {
    that: (that) => that,
    debug: () => R.tap(console.log),
  },
  mounted() {
    this.editor.on("update", this.handleUpdate);
    this.$nextTick(this.handleUpdate);
  },

  data() {
    return {
      headings: [],
    };
  },
  methods: {
    handleUpdate() {
      const headings = [];
      const transaction = this.editor.state.tr;
      this.editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") {
          const id = `heading-${headings.length + 1}`;
          if (node.attrs.id !== id) {
            transaction.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              id,
            });
          }
          headings.push({
            level: node.attrs.level,
            text: node.textContent,
            id,
          });
        }
      });

      transaction.setMeta("preventUpdate", true);

      this.editor.view.dispatch(transaction);

      this.headings = headings;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
