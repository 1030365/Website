window.addEventListener('keydown',this.check,false);

let x = 15
let y = 10

let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");

function check(e) {
    let dx = 0
    let dy = 0
    if (e.keyCode >= 37 && e.keyCode <= 40) {
        dx = [-1,0,1,0][e.keyCode-37]
        dy = [0,-1,0,1][e.keyCode-37]
        if (10*(x+dx) < canvas.width && 10*(y+dy) < canvas.height && 10*(x+dx) >= 0 && 10*(y+dy) >= 0) { 
            move(dx, dy);
        }
    }
    console.log(`move by: (${dx}, ${dy})`)
}

function move(newX, newY) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x*10, y*10, 10, 10);
    x += newX;
    y += newY;
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x*10, y*10, 10, 10);
}

function game() {
    move(0,0)
}

game()
