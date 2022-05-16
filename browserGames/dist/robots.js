window.addEventListener('keydown', this.check, false);
let x = 15;
let y = 10;
let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");

function check(e) {
  console.log(e.keyCode);
  let dx = 0;
  let dy = 0;

  if (e.keyCode >= 37 && e.keyCode <= 40) {
    dx = [-1, 0, 1, 0][e.keyCode - 37];
    dy = [0, -1, 0, 1][e.keyCode - 37];
  }

  console.log(`move by: (${dx}, ${dy})`);
}

function game() {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 150, 75);
}