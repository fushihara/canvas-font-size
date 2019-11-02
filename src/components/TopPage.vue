<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <textarea style="flex:0 0 100px;width:100%;font-size:30px;" v-model="textValue"></textarea>
    <canvas style="flex:1 1 0;" ref="canvas"></canvas>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { 文字サイズ取得,drawCanvas } from "@/utils/canvasUtils";

export default Vue.extend({
  mounted() {
    this.updateCanvas();
  },
  data() {
    return {
      textValue: "🌕には𩸽,-_.^MA!❗吉𠮷👪"
    };
  },
  watch: {
    textValue: {
      handler: function(newVal: string) {
        this.updateCanvas();
      },
      immediate: false
    }
  },
  methods: {
    updateCanvas(): void {
      const canvas = this.$refs["canvas"] as HTMLCanvasElement;
      const textValues = Array.from(this.textValue);
      drawCanvas(canvas,this.textValue);
    }
  }
});
</script>
<style lang="scss" scoped>
</style>