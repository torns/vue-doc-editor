<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="index" />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
    <el-dialog title="添加标记" :visible.sync="dialogFormVisible" width="30%">
      <div style="width: 300px"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MenuItem from "./MarkItem.vue";
import { Dialog, Button } from "element-ui";
export default {
  components: {
    MenuItem,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialogFormVisible: false,
      marks: [],
      items: [
        {
          icon: "add-fill",
          title: "添加标记",
          isActive: () => true,
          action: () => (this.dialogFormVisible = true),
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