function vertical(grid) {
    let strga = []
    let strgb = ''
    for (let i = 0; i < 3; i++) {
        for (let z = 0; z < 3; z++) {
            strgb += grid[i + (3 * z)]
        }
        strga.push(strgb)
        strgb = ''
    }
    return strga
}
function horizontal(grid) {
    let strga = []
    for (let i = 0; i < 3; i++) {
        strga.push(grid.slice((3 * i), (3 * i + 3)))
    }
    return strga
}

function diagonal(grid) {
    return [grid[0] + grid[4] + grid[8], grid[2] + grid[4] + grid[6]];
}

function display(grid) {
    grid = grid.replaceAll('0', ' ')
    grid = grid.replaceAll('1', 'X')
    grid = grid.replaceAll('2', 'O')
    console.log(`|${grid.slice(0, 3)}|\n|${grid.slice(3, 6)}|\n|${grid.slice(6, grid.length)}|`);
}

function turn(grid) {
    let xcount = 0
    let ocount = 0
    grid.split('').forEach((i, w) => {
        if (i == '1') {
            xcount += 1
        } else if (i == '2') {
            ocount += 1
        }
    });
    if (xcount == ocount) {
        return 1;
    }
    return 2;
}

function winmove(grid) {
    let p = turn(grid);
    return check(grid,p);
}

function block(grid) {
    let p = 0;
    if (turn(grid)==1) {
        p=2
    } else {
        p=1
    }
    return check(grid,p)
}

function check(grid,p) {
    let strg=0
    let c = -1
    horizontal(grid).forEach((i,w) => {
        if (i==`0${p}${p}`) {
            c = 3*strg
            return 3*strg
        }
        if (i==`${p}0${p}`) {
            c = 3*strg+1
            return 3*strg+1
        }
        if (i==`${p}${p}0`) {
            c = 3*strg+2
            return 3*strg+2
        }
        strg+=1
    });
    if (c > -1) {
        return c;
    }
    strg=0
    vertical(grid).forEach((i,w) => {
        if (i==`0${p}${p}`) {
            c = strg
            return strg
        }
        if (i==`${p}0${p}`) {
            c = strg+3
            return 3+strg
        }
        if (i==`${p}${p}0`) {
            c = strg+6
            return 6+strg
        }
        strg+=1
    });
    if (c > -1) {
        return c;
    }
    strg=0
    diagonal(grid).forEach((i,w) => {
        if (i==`0${p}${p}`) {
            c = strg*2
            return 2*strg
        }
        if (i==`${p}0${p}`) {
            c = 4
            return 4
        }
        if (i==`${p}${p}0`) {
            c = 8-(2*strg)
            return 8-(2*strg)
        }
        strg+=1
    });
    if (c > -1) {
        return c;
    }
    return '?'
}

function move(grid) {
    if (winmove(grid)=='?') {
        if (block(grid) == '?') {
            return '?'
        }
        return block(grid)
    }
    return winmove(grid)
}

function options(grid) {
    if (move(grid)=='?') {
        let strg=[]
        for (let i = 0; i < 9; i++) {
            if (grid[i]=='0') {
                strg.push(i)
            }
        }
        return strg
    }
    return [move(grid)]
}

function play(grid) {
    let strga = options(grid)
    let choice
    if (strga.length==1) {
        choice=strga[0]
    } else {
        let strgb=strga.length
        let strgc='choose to play at '
        for (let i = 0; i < strgb; i++) {
            if (strgb-i==1) {
                if (strgb==2) {
                    strgc+=' '
                }
                strgc += `or ${strga[strga.length-1]+1}:`
                break
            }
            strgc+= `${strga[i]+1}`
            if (strgb>2) {
                strgc+=', '
            }
        }
        choice=strga[Math.floor(strgb * Math.random())]
    }
    return grid.slice(0,choice)+`${turn(grid)}`+grid.slice((choice+1), grid.length)
}




let board='000000000'

let winner=0

function runGame() {
    for (let i = 0; i < 9; i++) {
        display(board)
        console.log('_____')
        if (winmove(board)=='?') {
            board=play(board)
        } else {
            winner=turn(board)
            board=play(board)
            break
        }
    }
    display(board)
    if (winner==0) {
        console.log('it\'s a tie')
    } else {
        console.log(`player ${winner} wins!`)
    }
}

runGame()
