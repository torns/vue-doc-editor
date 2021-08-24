<template>
  <node-view-wrapper class="doc-draw">
    <div :class="['draw-box']" ref="drawBox">
      <div class="doc-draw-set-box" v-if="editable">
        <button class="pionter" @click="clear">重新签名</button>
        <button
          class="pionter"
          @click="!isFull(drawBox()) ? full(drawBox()) : disableFull(drawBox())"
        >
          切换全屏
        </button>
      </div>
      <svg
        viewBox="0 0 500 250"
        ref="canvas"
        :style="{ cursor: editable ? 'crosshair' : 'pointer' }"
      >
        <template v-for="item in node.attrs.lines">
          <path
            v-if="item.id !== id"
            :key="item.id"
            :d="item.path"
            :id="`id-${item.id}`"
            :stroke="item.color"
            :stroke-width="item.size"
          />
        </template>
      </svg>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper } from "@tiptap/vue-2";
import { v4 as uuid } from "uuid";
import * as d3 from "d3";
import simplify from "simplify-js";

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

export default {
  name: "Drawing",

  components: {
    NodeViewWrapper,
  },

  props: {
    updateAttributes: {
      type: Function,
      required: true,
    },
    editor: {
      type: Object,
    },
    node: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      color: "#000",
      size: 1,
      svg: null,
      path: null,
      points: [],
      drawing: false,
      id: uuid(),
    };
  },
  methods: {
    onStartDrawing(event) {
      this.drawing = true;
      this.points = [];
      this.path = this.svg
        .append("path")
        .data([this.points])
        .attr("id", `id-${this.id}`)
        .attr("stroke", this.color)
        .attr("stroke-width", this.size);

      const moveEvent = event.type === "mousedown" ? "mousemove" : "touchmove";

      this.svg.on(moveEvent, this.onMove);
    },

    onMove(event) {
      event.preventDefault();
      this.points.push(d3.pointers(event)[0]);
      this.tick();
    },

    onEndDrawing() {
      this.svg.on("mousemove", null);
      this.svg.on("touchmove", null);

      if (!this.drawing) {
        return;
      }

      this.drawing = false;
      this.svg.select(`#id-${this.id}`).remove();
      this.id = uuid();
    },

    simplifyPoints(points) {
      return simplify(
        points.map((point) => ({ x: point[0], y: point[1] }))
      ).map((point) => [point.x, point.y]);
    },

    tick() {
      requestAnimationFrame(() => {
        this.path.attr("d", (points) => {
          const path = d3.line().curve(d3.curveBasis)(points);
          // const simplifiedPath = d3.line().curve(d3.curveBasis)(this.simplifyPoints(points))
          const lines = this.node.attrs.lines.filter(
            (item) => item.id !== this.id
          );

          this.updateAttributes({
            lines: [
              ...lines,
              {
                id: this.id,
                color: this.color,
                size: this.size,
                path,
                // path: simplifiedPath,
              },
            ],
          });

          return path;
        });
      });
    },

    clear() {
      this.updateAttributes({
        lines: [],
      });
    },
  },
  computed: {
    editable: (that) => that.editor.options.editable,
    drawBox: (that) => () => that.$refs.drawBox,
    isFull: (that) => (dom) => dom?.style?.position === "fixed",
    full: (that) => (dom) => {
      dom.style.position = "fixed";
      dom.style.top = "0";
      dom.style.left = "0";
      dom.style.width = "100vw";
      dom.style.height = "100vh";
      dom.style.background = "#fff";
      dom.style.zIndex = "99999";
    },
    disableFull: (that) => (dom) => {
      dom.style.position = "";
      dom.style.top = "";
      dom.style.left = "";
      dom.style.width = "";
      dom.style.height = "";
      dom.style.background = "";
      dom.style.zIndex = "";
    },
  },
  mounted() {
    this.svg = d3.select(this.$refs.canvas);
    // this.full(this.drawBox())
    this.editable &&
      this.svg
        .on("mousedown", this.onStartDrawing)
        .on("mouseup", this.onEndDrawing)
        .on("mouseleave", this.onEndDrawing)
        .on("touchstart", this.onStartDrawing)
        .on("touchend", this.onEndDrawing)
        .on("touchleave", this.onEndDrawing);
  },
};
</script>

<style lang="scss">
.doc-draw {
  position: relative;
  .doc-draw-set-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;
    position: absolute;
    bottom: 1em;
    right: 1em;
    input,
    button {
      background: none;
      padding: 0;
      margin: 0;
      border: none;
    }
    button {
      margin-top: 5px;
      color: lightpink;
    }
    input[type="color"] {
      width: 4em;
      height: 2em;
    }
    input[type="number"] {
      width: 4em;
      height: 2em;
    }
  }
  svg {
    background: none;
    border: 1px dashed #f1f1f1;
    cursor: crosshair;
  }

  path {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>