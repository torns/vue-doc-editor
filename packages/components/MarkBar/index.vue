<template>
  <div>
    <template v-for="item in items">
      <menu-item :key="item.title" v-bind="item" />
    </template>
    <template v-for="item in marks">
      <MarkItem :key="item.title" :mark="item" />
    </template>
    <el-dialog title="添加标记" :visible.sync="dialogFormVisible" width="400px">
      <div>
        <el-form ref="form" :model="markform" label-width="80px">
          <el-form-item label="标记名称">
            <el-input
              size="small"
              v-model="markform.name"
              placeholder="标记名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="标记颜色">
            <div style="height: 40px; line-height: 40px">
              <el-color-picker
                v-model="markform.color"
                show-alpha
                size="small"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="默认可读">
            <el-switch v-model="markform.defaultRead"> </el-switch>
          </el-form-item>
          <el-form-item label="默认可写">
            <el-switch v-model="markform.defaultWrite"> </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="
            () => {
              dialogFormVisible = false;
              addMark(markform);
            }
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MenuItem from "./MenuItem.vue";
import MarkItem from "./MarkItem.vue";
import {
  Dialog,
  Button,
  Form,
  FormItem,
  Input,
  ColorPicker,
  Switch,
} from "element-ui";
export default {
  components: {
    MenuItem,
    MarkItem,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [ColorPicker.name]: ColorPicker,
    [Switch.name]: Switch,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * @param {{MarkBar}} mark
     */
    addMark(markform) {
      this.marks.push({ ...markform });
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      marks: [
        {
          name: "内容区",
          color: "rgba(184, 158, 65, 1)",
          defaultRead: false,
          defaultWrite: false,
        },
        {
          name: "标题区",
          color: "rgba(67, 65, 184, 1)",
          defaultRead: false,
          defaultWrite: false,
        },
        {
          name: "自定义区",
          color: "rgba(65, 184, 164, 1)",
          defaultRead: false,
          defaultWrite: false,
        },
      ],
      /**
       * @type {MarkBar}
       */
      markform: {
        name: "",
        color: "#4741b8",
        defaultRead: false,
        defaultWrite: false,
      },
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
/deep/ .el-form-item__content {
  line-height: 40px;
}
/deep/ .el-dialog__body {
  padding: 0.2em 1em;
  padding-right: 2em;
}
/deep/.el-form-item {
  margin-bottom: 0.2em;
}
$colorBlack: #4741b8;
.divider {
  width: 1px;
  height: 1rem;
  background-color: rgba($colorBlack, 0.1);
  margin: 0 1rem;
}
</style>