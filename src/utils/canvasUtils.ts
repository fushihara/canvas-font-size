export function 文字サイズ取得(text: string, context: CanvasRenderingContext2D) {
  const tm = context.measureText(text);
  return {
    left: tm.actualBoundingBoxLeft,
    right: tm.actualBoundingBoxRight,
    top: tm.actualBoundingBoxAscent,
    bottom: tm.actualBoundingBoxDescent,
    width: tm.width
  };
}
export function drawCanvas(canvas: HTMLCanvasElement, text: string) {
  const textValues = Array.from(text);
  const canvasRect = canvas.getBoundingClientRect();
  const fontSizePx = 200;
  canvas.setAttribute("width", `${canvasRect.width}px`);
  canvas.setAttribute("height", `${canvasRect.height}px`);
  let leftOffset = 0;
  let yOffset = 0;
  const 背景色s = ["pink", "silver", "green"];
  const context = canvas.getContext("2d")!;
  let 配置した位置一覧: { x: number, y: number, w: number, h: number }[] = [];
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
    {
      // yOffsetを調査
      if (canvasRect.width < leftOffset + 文字幅) {
        leftOffset = 0;
        yOffset = 配置した位置一覧.map(a=>a.y+a.h).reduce((a,b)=>{return Math.max(a,b);},0);
        配置した位置一覧 = [];
      }
    }
    // 背景の四角を書く
    {
      context.save();
      context.fillStyle = 背景色;
      context.fillRect(leftOffset, yOffset, 文字幅, 文字高さ);
      配置した位置一覧.push({
        x: leftOffset,
        y: yOffset,
        w: 文字幅,
        h: 文字高さ
      });
      context.restore();
    }
    context.fillText(text, leftOffset + 文字サイズ.left, yOffset + 文字サイズ.top);
    leftOffset += 文字幅;
    console.log(`${text} は ${JSON.stringify(文字サイズ)}`);
  }
  {
    // 下線を引く
    context.save();
    context.strokeStyle = "red";
    context.stroke
    context.beginPath();
    context.moveTo(0, fontSizePx);
    context.lineTo(canvasRect.width, fontSizePx);
    context.closePath();
    context.stroke();
    context.restore();
  }
}