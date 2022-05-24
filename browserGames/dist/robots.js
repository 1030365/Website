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
let junk = [];
let robots = [];
let numbots = 10;
let finished = false;
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
  let code = e.keyCode;

  if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode <= 56 && e.keyCode >= 49) {
    if (e.keyCode <= 56 && e.keyCode >= 49) {
      code -= 8;
    }

    dx = [-1, 0, 1, 0, 1, 0, -1, -1, -1, 0, 1, 1][code - 37];
    dy = [0, -1, 0, 1, 1, 1, 1, 0, -1, -1, -1, 0][code - 37];

    if (!(10 * (player.x + dx) < canvas.width && 10 * (player.x + dx) >= 0)) {
      dx = 0;
    }

    if (!(10 * (player.y + dy) < canvas.height && 10 * (player.y + dy) >= 0)) {
      dy = 0;
    }

    if (!(dx == 0 && dy == 0)) {
      move(dx, dy);
    }

    moved = true;
    return true;
  } else if (e.keyCode == 57) {
    safely_place_player();
    moved = false;
    return false;
  }
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
  move_robots();
}

function move_robots() {
  let newBotX = 0;
  let newBotY = 0;
  robots.forEach((bot, i) => {
    newBotX = 0;
    newBotY = 0;

    if (bot.x > player.x) {
      newBotX -= 1;
    } else if (bot.x < player.x) {
      newBotX += 1;
    }

    if (bot.y > player.y) {
      newBotY -= 1;
    } else if (bot.y < player.y) {
      newBotY += 1;
    }

    teleport_robot(bot, bot.x + newBotX, bot.y + newBotY);
  });
  check_collisions();
  console.log(robots.length);
  Draw_All_Elements();
}

function robot_crashed(the_bot) {
  let c;
  let a = false;
  robots.forEach((a_bot, i) => {
    if (a_bot == the_bot) {
      c = false;
      return false;
    }

    if (a_bot.x == the_bot.x && a_bot.y == the_bot.y) {
      c = a_bot;
      a = true;
      return a_bot;
    }
  });

  if (a) {
    return the_bot;
  }

  return false;
}

function check_collisions() {
  let surviving_robots = [];
  let jbot;
  robots.forEach((bot, i) => {
    if (!collided(bot, junk)) {
      jbot = robot_crashed(bot);

      if (jbot === false) {
        surviving_robots.push(bot);
      } else {
        junk.push(jbot);
      }
    }
  });
  robots = [];
  console.log(surviving_robots);
  surviving_robots.forEach((bot, i) => {
    if (!collided(bot, junk)) {
      robots.push(bot);
    }
  });

  if (robots == []) {
    console.log('VICTORY!');
    finished = true;
  }

  if (collided(player, robots) || collided(player, junk)) {
    console.log('You\'ve been caught!');
    finished = true;
  }
}

function Draw_All_Elements() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(player.oldX * 10, player.oldY * 10, 10, 10);
  robots.forEach((bot, i) => {
    ctx.fillRect(bot.oldX * 10, bot.oldY * 10, 10, 10);
  });
  junk.forEach((trash, i) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(trash.oldX * 10, trash.oldY * 10, 10, 10);
    ctx.fillStyle = "#000000";
    ctx.fillRect(trash.x * 10, trash.y * 10, 10, 10);
  });
  robots.forEach((bot, i) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(bot.x * 10, bot.y * 10, 10, 10);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(bot.x * 10 + 3, bot.y * 10 + 3, 4, 4);
  });
  ctx.fillStyle = "#000000";
  ctx.fillRect(player.x * 10, player.y * 10, 10, 10);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(player.x * 10 + 1, player.y * 10 + 1, 8, 8);
}

function teleport(newX, newY) {
  player.oldX = player.x;
  player.oldY = player.y;
  player.x = newX;
  player.y = newY;
  Draw_All_Elements();
}

function teleport_robot(robot, newX, newY) {
  robot.oldX = robot.x;
  robot.oldY = robot.y;
  robot.x = newX;
  robot.y = newY;
}

function game() {
  place_robots();
  safely_place_player();
}

game();