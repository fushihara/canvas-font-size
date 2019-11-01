<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <textarea style="flex:0 0 100px;width:100%;font-size:30px;" v-model="textValue"></textarea>
    <canvas style="flex:1 1 0;" ref="canvas"></canvas>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { 文字サイズ取得 } from "@/utils/canvasUtils";

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
      const canvasRect = canvas.getBoundingClientRect();
      const fontSizePx = 200;
      canvas.setAttribute("width", `${canvasRect.width}px`);
      canvas.setAttribute("height", `${canvasRect.height}px`);
      let leftOffset = 0;
      const 背景色s = ["pink", "silver", "green"];
      const context = canvas.getContext("2d")!;
      let index = -1;
      for (let text of textValues) {
        index += 1;
        let 背景色 = 背景色s[index % 背景色s.length];
        context.textBaseline = "bottom";
        context.fillStyle = "black";
        context.font = `normal ${fontSizePx}px 'Segoe Script'`;
        const 文字サイズ = 文字サイズ取得(text, context);
        const 文字高さ = 文字サイズ.top + 文字サイズ.bottom;
        const 文字幅 = 文字サイズ.right + 文字サイズ.left;
        // 背景の四角を書く
        {
          context.save();
          context.fillStyle = 背景色;
          context.fillRect(leftOffset, 0, 文字幅, 文字高さ);
          context.restore();
        }
        context.fillText(text, leftOffset + 文字サイズ.left, 文字サイズ.top);
        leftOffset += 文字幅;
        console.log(`${text} は ${JSON.stringify(文字サイズ)}`);
      }
      {
        // 下線を引く
          context.save();
          context.strokeStyle = "red";
          context.stroke
          context.beginPath();
          context.moveTo(0,fontSizePx);
          context.lineTo(canvasRect.width,fontSizePx);
          context.closePath();
          context.stroke();
          context.restore();
      }
    }
  }
});
</script>
<style lang="scss" scoped>
</style>