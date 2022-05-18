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
let robots = [];
let numbots = 10;
let player = new Player(1, 1);
let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");

function randint(a, b) {
  return Math.floor(a + (b - a + 1) * Math.random());
}

function collided(thing1, list_of_things) {
  list_of_things.forEach((thing2, i) => {
    if (thing1.x == thing2.x && thing1.y == thing2.y) {
      return true;
    }
  });
  return false;
}

function place_player() {
  return [randint(0, Math.floor(canvas.width / 10) - 1), randint(0, Math.floor(canvas.height / 10) - 1)];
}

function safely_place_player() {
  while (collided(player, robots)) {
    place_player();
  }

  teleport(place_player()[0], place_player()[1]);
}

function place_robots() {
  while (robots.length < numbots) {
    let robot = new Robot(1, 1);
    robot.x = randint(0, Math.floor(canvas.width / 10) - 1);
    robot.y = randint(0, Math.floor(canvas.height / 10) - 1);

    if (!collided(robot, robots)) {
      teleport_robot(robot, robot.x, robot.y);
      robots.push(robot);
    }
  }
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

function teleport_robot(robot, newX, newY) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(robot.x * 10, robot.y * 10, 10, 10);
  robot.x = newX;
  robot.y = newY;
  ctx.fillStyle = "#000000";
  ctx.fillRect(robot.x * 10, robot.y * 10, 10, 10);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(robot.x * 10 + 3, robot.y * 10 + 3, 4, 4);
}

function game() {
  place_robots();
  safely_place_player();
  console.log('moved');
}

game();