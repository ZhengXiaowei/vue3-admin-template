const useCanvasApi = (size: number, radius: number) => {
  const pi = Math.PI;

  const onDraw = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    operator: "clip" | "fill"
  ) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + size / 2, y - radius + 2, radius, 0.72 * pi, 2.26 * pi);
    ctx.lineTo(x + size, y);
    ctx.arc(x + size + radius - 2, y + size / 2, radius, 1.21 * pi, 2.78 * pi);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y + size);
    ctx.arc(
      x + radius - 2,
      y + size / 2,
      radius + 0.4,
      2.76 * pi,
      1.24 * pi,
      true
    );
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(255, 255, 255, .5)";
    ctx.strokeStyle = "rgba(255, 255, 255, .5)";
    // 制造阴影
    if (operator === "clip") {
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "rgba(255, 255, 255, .6)";
    }
    ctx.stroke();
    ctx[operator]();

    ctx.globalCompositeOperation = "destination-over";
  };

  return { onDraw };
};

export default useCanvasApi;
