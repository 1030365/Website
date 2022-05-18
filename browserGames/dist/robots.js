window.addEventListener('keydown', check, false);

class Player {
  constructor(x, y) {
    this.x = 1;
    this.y = 2;
  }

}

;

class Robot {
  constructor(x, y) {
    this.x = 1;
    this.y = 2;
  }

}

let moved = false;
let player = new Player(1, 1);
let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");

function randint(a, b) {
  return Math.floor(a + (b - a + 1) * Math.random());
}

function place_player() {
  return [randint(0, Math.floor(canvas.width / 10) - 1), randint(0, Math.floor(canvas.height / 10) - 1)];
}

function safely_place_player() {
  /*while (collided(player,robots)) {
      place_player()
  }*/
  teleport(place_player()[0], place_player()[1]);
}

function check(e) {
  let dx = 0;
  let dy = 0;

  if (e.keyCode >= 37 && e.keyCode <= 40) {
    dx = [-1, 0, 1, 0][e.keyCode - 37];
    dy = [0, -1, 0, 1][e.keyCode - 37];

    if (10 * (player.x + dx) < canvas.width && 10 * (player.y + dy) < canvas.height && 10 * (player.x + dx) >= 0 && 10 * (player.y + dy) >= 0) {
      move(dx, dy);
    }

    moved = true;
    console.log('moved');
    return true;
  } else if (e.keyCode == 57) {
    safely_place_player();
    moved = false;
    return false;
  }

  console.log(`move by: (${dx}, ${dy})`);
}

function move(newX, newY) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(player.x * 10, player.y * 10, 10, 10);
  player.x += newX;
  player.y += newY;
  ctx.fillStyle = "#000000";
  ctx.fillRect(player.x * 10, player.y * 10, 10, 10);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(player.x * 10 + 1, player.y * 10 + 1, 8, 8);
}

function teleport(newX, newY) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(player.x * 10, player.y * 10, 10, 10);
  player.x = newX;
  player.y = newY;
  ctx.fillStyle = "#000000";
  ctx.fillRect(player.x * 10, player.y * 10, 10, 10);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(player.x * 10 + 1, player.y * 10 + 1, 8, 8);
}

function game() {
  move(0, 0);
  console.log('moved');
}

game();