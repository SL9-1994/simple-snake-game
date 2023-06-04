"use strict";
// canvasを作成
const canvas = document.createElement("canvas");
// canvasのメソッドを使用するために、contextを生成
const context = canvas.getContext("2d");
// キャンバスの大きさ
canvas.width = 600;
canvas.height = 600;
canvas.setAttribute(
  "style",
  "display: block; margin: auto; background-color: #aaa"
);
document.body.appendChild(canvas);
// マス目を作成(20px * 20px)
const GRID = 20;
// 縦横20マスのステージを作成
const STAGE = canvas.width / GRID;
const snake = {
  x: null,
  y: null,
  dx: 1,
  dy: 0,
  tail: null,
  body: [],
  //   蛇の描画処理
  update: function () {
    this.body.push({ x: this.x, y: this.y });
    this.x += this.dx;
    this.y += this.dy;
    // 蛇色変更
    context.fillStyle = "blue";
    this.body.forEach((obj) => {
      context === null || context === void 0
        ? void 0
        : context.fillRect(obj.x * GRID, obj.y * GRID, GRID - 2, GRID - 2);
      //   自己衝突すると、最初からになる
      if (this.x === obj.x && this.y === obj.y) init();
    });
    if (this.body.length > this.tail) this.body.shift();
  },
};
const item = {
  x: null,
  y: null,
  //   アイテムの描画処理
  update: function () {
    context.fillStyle = "red";
    context === null || context === void 0
      ? void 0
      : context.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
  },
};
const init = () => {
  snake.x = STAGE / 2;
  snake.y = STAGE / 2;
  snake.tail = 4;
  snake.body = [];
  //   アイテムの乱数生成(ステージの画面内のみ)
  item.x = Math.floor(Math.random() * STAGE);
  item.y = Math.floor(Math.random() * STAGE);
};
const loop = () => {
  context === null || context === void 0
    ? void 0
    : context.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  item.update();
  //   画面外に行くと、逆方向からループする
  if (snake.x < 0) snake.x = STAGE - 1;
  if (snake.y < 0) snake.y = STAGE - 1;
  if (snake.x > STAGE - 1) snake.x = 0;
  if (snake.y > STAGE - 1) snake.y = 0;
  //   アイテムを食べると、新しくアイテムが追加され、体も長くなる。
  if (snake.x === item.x && snake.y === item.y) {
    snake.tail++;
    item.x = Math.floor(Math.random() * STAGE);
    item.y = Math.floor(Math.random() * STAGE);
  }
};
init();
// 1秒間に15回処理を実行(15フレーム)
// 描画速度 = 蛇の速度
setInterval(loop, 1000 / 15);
// 十字キーによる蛇の操作
document.addEventListener("keydown", (e) => {
  //   console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      snake.dx = -1;
      snake.dy = 0;
      break;
    case "ArrowRight":
      snake.dx = 1;
      snake.dy = 0;
      break;
    case "ArrowUp":
      snake.dx = 0;
      snake.dy = -1;
      break;
    case "ArrowDown":
      snake.dx = 0;
      snake.dy = 1;
      break;
  }
});
