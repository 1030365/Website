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
    horizontal(grid).forEach((i,w) => {
        if (i==`0${p}${p}`) {
            return 3*strg
        }
        if (i==`${p}0${p}`) {
            return 3*strg+1
        }
        if (i==`${p}${p}0`) {
            return 3*strg+2
        }
        strg+=1
    });
    strg=0
    vertical(grid).forEach((i,w) => {
        if (i==`0${p}${p}`) {
            return strg
        }
        if (i==`${p}0${p}`) {
            return 3+strg
        }
        if (i==`${p}${p}0`) {
            return 6+strg
        }
        strg+=1
    });
    strg=0
    diagonal(grid).forEach((i,w) => {
        if (i==`0${p}${p}`) {
            return 2*strg
        }
        if (i==`${p}0${p}`) {
            return 4
        }
        if (i==`${p}${p}0`) {
            return 8-(2*strg)
        }
        strg+=1
    });
    return '?'
}

function move(grid) {
    if (winmove(grid)=='?') {
        return block(grid)
    }
    return winmove(grid)
}

def options(grid):
    if move(grid)=='?':
        strg=[]
        for i in range(0,9):
            if grid[i]=='0':
                strg.append(i)
        return strg
    return [move(grid)]

def play(grid):
    strga=options(grid)
    if len(strga)==1:
        choice=strga[0]
    else:
        strgb=len(strga)
        strgc='choose to play at '
        for i in range(0,strgb):
            if strgb-i==1:
                if strgb==2:
                    strgc+=' '
                strgc+=f'or {strga[-1]+1}:'
                break
            strgc+=str(strga[i]+1)
            if strgb>2:
                strgc+=', '
        #while True:
            #choice=int(input(strgc))-1
            #if choice in strga:
                #break
            #print('invalid choice')
        choice=strga[randint(0,strgb-1)]
    return grid[:choice]+str(turn(grid))+grid[(choice+1):]




board='000000000'

winner=0

for i in range(0,9):
    display(board)
    print('_____')
    if winmove(board)=='?':
        board=play(board)
    else:
        winner=turn(board)
        board=play(board)
        break
display(board)
if winner==0:
    print('it\'s a tie')
else:
    print(f'player {winner} wins!')
