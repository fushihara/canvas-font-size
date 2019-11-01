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