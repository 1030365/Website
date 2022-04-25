let WIDTH=4;
let HEIGHT=4;
let BOARD=['X'*WIDTH]*HEIGHT;
let TURNS=4;
let GOALBOARD=['O'*WIDTH]*HEIGHT;
function makeboards() {
    BOARD=['']*HEIGHT;
    for (i = 0; i < WIDTH; i++) {
        for (w = 0; w < HEIGHT; w++) {
            if (Math.round(Math.random()) == 0) {
                BOARD[w]=BOARD[w]+'X';
            } else {
                BOARD[w]=BOARD[w]+'O';
            }
        }
    }
    for (i=0; i<BOARD.length; i++) {
        GOALBOARD[i] = BOARD[i];
    }
    let strga = [];
    while (strga.length < TURNS) {
        strgb=(randint(0,WIDTH-1),randint(0,HEIGHT-1))
        if strgb in strga:
            continue
        strga.append(strgb)
    }
    for i in strga:
        click(i[0],i[1])
}
