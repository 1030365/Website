let WIDTH = 4;
let HEIGHT = 4;
function listMultiply(theList: any[], theNum: number): any[] {
    let x = [];
    for (let i = 0; i < theNum; i++) {
        for (let j = 0; j < theList.length; j++) {
            x.push(theList[j]);
        }
    }
    return x;
}
let BOARD: string[] = listMultiply(['X'.repeat(WIDTH)], HEIGHT);
console.log(BOARD);
let TURNS: number = 4;
let GOALBOARD: string[] = listMultiply(['O'.repeat(WIDTH)], HEIGHT);
function makeboards(): void {
    BOARD = listMultiply([''], HEIGHT);
    console.log(BOARD);
    for (let i = 0; i < WIDTH; i++) {
        for (let w = 0; w < HEIGHT; w++) {
            if (Math.round(Math.random()) == 0) {
                BOARD[w] = BOARD[w] + 'X';
            } else {
                BOARD[w] = BOARD[w] + 'O';
            }
        }
    }
    console.log(BOARD);
    for (let i = 0; i < BOARD.length; i++) {
        GOALBOARD[i] = BOARD[i];
    }
    let strga = [];
    let repeat = false;
    while (strga.length < TURNS) {
        let strgb = [Math.round((WIDTH - 1) * Math.random() - 0.5), Math.round((HEIGHT - 1) * Math.random() - 0.5)];
        repeat = false;
        if (strga.length > 0) {
            strga.forEach((coord, i) => {
                if (coord[0][0] == strgb[0] && coord[0][1] == strgb[1]) {
                    repeat = true;
                }
            });
        }
        if (repeat) {
            continue
        }
        strga.push(strgb);
    }
    for (let i = 0; i < strga.length; i++) {
        click(strga[i][0], strga[i][1]);
    }
}

function display() {
    console.log('\n'.repeat(5))
    GOALBOARD.forEach((rows, i) => {
        let strg='';
        rows.split('').forEach((col, w) => {
            strg+=col+' ';
        });
        console.log(strg+'\n');
    });
    console.log('_'.repeat(10)+'\n');
    BOARD.forEach((rows, i) => {
        let strg='';
        rows.split('').forEach((col, w) => {
            strg+=col+' ';
        });
        console.log(strg+'\n');
    });
}

function flip(x,y) {
    let strg='O';
    if (x>=0 && x<WIDTH && y>=0 && y<HEIGHT) {
        strg='O';
        if (BOARD[y][x]=='O') {
            strg='X';
        }
        BOARD[y]= BOARD[y].slice(0,x)+strg+BOARD[y].slice(x+1,BOARD[y].length)
    }
}

function click(x,y) {
    for (let i = x-1; i < x+2; i++) {
        for (let w = y-1; w < y+2; w++) {
            flip(i,w)
        }
    }
}

makeboards()
display()

for (let i = 0; i < TURNS; i++) {
    console.log("test");
    let strg=prompt('Click Where? ');
    let strgb=strg.split(',')
    let x=parseInt(strgb[0])-1
    let y=parseInt(strgb[1])-1
    click(x,y)
    display()
}
display()
if (BOARD==GOALBOARD) {
    console.log('YOU WIN!')
} else {
    console.log('Better luck next time...')
}
