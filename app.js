const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const paintWidth = document.getElementById("paintWidth");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const stroke = document.getElementById("stroke");
const fill = document.getElementById("fill");
const erase = document.getElementById("erase");
const refresh = document.getElementById("refresh");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const textSize = document.getElementById("textSizes");
const textType = document.getElementById("textTypes");
const textWeight = document.getElementById("textWeights");
const save = document.getElementById("save");

const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 660;
const ERASE_COLOR = "#ffffff";

ctx.lineWidth = 5;
ctx.lineCap = "round";

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

function onPaintWidth(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorClick = event.srcElement.dataset.color;
  ctx.strokeStyle = colorClick;
  ctx.fillStyle = colorClick;
  color.value = colorClick;
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
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  color.value = ERASE_COLOR;
}

function onFileUpload(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onTextInput(event) {
  const text = textInput.value;
  const size = textSize.value;
  const type = textType.value;
  const weight = textWeight.value;

  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${weight} ${size}px ${type}`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveFile() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "paint.png";
  a.click();
}

canvas.addEventListener("mousemove", onMovePaint);
canvas.addEventListener("mousedown", onStartPaint);
canvas.addEventListener("mouseup", onStopPaint);
canvas.addEventListener("mouseleave", onStopPaint);
canvas.addEventListener("dblclick", onTextInput);

paintWidth.addEventListener("change", onPaintWidth);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
stroke.addEventListener("click", onStrokeMode);
fill.addEventListener("click", onFillMode);
erase.addEventListener("click", onEraseMode);
refresh.addEventListener("click", onRefreshMode);
file.addEventListener("change", onFileUpload);
save.addEventListener("click", onSaveFile);
