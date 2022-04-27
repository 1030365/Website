let WIDTH = 4;
let HEIGHT = 4;
function listMultiply(theList: any[], theNum: number): any[] {
    let x = [];
    for (let i = 0; i < theNum; i++) {
        x.concat(theList);
    }
    return x;
}
let testing = 'a';
testing.repeat(6);
let BOARD = listMultiply(['X'.repeat(WIDTH)], HEIGHT);
let TURNS = 4;
let GOALBOARD = listMultiply(['O'.repeat(WIDTH)], HEIGHT);
function makeboards() {
    BOARD = listMultiply([''], HEIGHT);
    for (let i = 0; i < WIDTH; i++) {
        for (let w = 0; w < HEIGHT; w++) {
            if (Math.round(Math.random()) == 0) {
                BOARD[w] = BOARD[w] + 'X';
            } else {
                BOARD[w] = BOARD[w] + 'O';
            }
        }
    }
    for (let i = 0; i < BOARD.length; i++) {
        GOALBOARD[i] = BOARD[i];
    }
    let strga = [];
    while (strga.length < TURNS) {
        let strgb = (Math.round((WIDTH - 1) * Math.random() - 0.5), Math.round((HEIGHT - 1) * Math.random() - 0.5));
        if (strgb in strga) {
            continue
        }
        strga.push(strgb)
    }
    for (let i; i<strga.length; i++) {}
        click(strga[i][0], strga[i][1])
    }
}
