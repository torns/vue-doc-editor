<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="index" />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>
<script>
import MenuItem from "./MarkItem.vue";
export default {
  components: {
    MenuItem,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      marks: [],
      items: [
        {
          icon: "add-fill",
          title: "添加标记",
          isActive: () => true,
          action: () => {},
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$colorBlack: #4741b8;
.divider {
  width: 1px;
  height: 1rem;
  background-color: rgba($colorBlack, 0.1);
  margin: 0 1rem;
}
</style>