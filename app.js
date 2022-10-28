const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.getElementById("color");
const stroke = document.getElementById("stroke");
const fill = document.getElementById("fill");
const erase = document.getElementById("erase");
const refresh = document.getElementById("refresh");
const fileInput = document.getElementById("file");

const CANVAS_DEFAULT = 800;
const ERASE_COLOR = "#ffffff";

canvas.width = CANVAS_DEFAULT;
canvas.height = CANVAS_DEFAULT;
ctx.lineWidth = 5;

let setPaint = false;
let setMode = false;

function onMovePaint(event) {
  if (setPaint) {
    ctx.lineTo(event.offsetX, event.offsetY);
    if (setMode) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onStartPaint() {
  setPaint = true;
}

function onStopPaint() {
  setPaint = false;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onStrokeMode() {
  setMode = false;
}

function onFillMode() {
  setMode = true;
}

function onEraseMode() {
  ctx.strokeStyle = ERASE_COLOR;
  ctx.fillStyle = ERASE_COLOR;
  color.value = ERASE_COLOR;
}

function onRefreshMode() {
  ctx.fillStyle = ERASE_COLOR;
  ctx.fillRect(0, 0, CANVAS_DEFAULT, CANVAS_DEFAULT);
  color.value = ERASE_COLOR;
}

function onFileUpload(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_DEFAULT, CANVAS_DEFAULT);
    fileInput.value = null;
  };
}

canvas.addEventListener("mousemove", onMovePaint);
canvas.addEventListener("mousedown", onStartPaint);
canvas.addEventListener("mouseup", onStopPaint);
canvas.addEventListener("mouseleave", onStopPaint);

color.addEventListener("change", onColorChange);
stroke.addEventListener("click", onStrokeMode);
fill.addEventListener("click", onFillMode);
erase.addEventListener("click", onEraseMode);
refresh.addEventListener("click", onRefreshMode);
file.addEventListener("change", onFileUpload);
