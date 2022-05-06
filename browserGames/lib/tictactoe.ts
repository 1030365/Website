function vertical(grid) {
    let strga=[]
    let strgb=''
    for (let i=0; i<3; i++) {
        for (let z=0; z<3; z++) {
            strgb += grid[i+(3*z)]
        }
        strga.push(strgb)
        strgb=''
    }
    return strga
}
function horizontal(grid) {
    let strga=[]
    for (let i=0; i<3; i++) {
        strga.push(grid[(3*i):(3*i+3)])
    }
    return strga
}

def diagonal(grid):
    return [grid[0]+grid[4]+grid[8],grid[2]+grid[4]+grid[6]]

def display(grid):
    grid=grid.replace('0',' ')
    grid=grid.replace('1','X')
    grid=grid.replace('2','O')
    print(f'|{grid[:3]}|\n|{grid[3:6]}|\n|{grid[6:]}|')

def turn(grid):
    xcount=0
    ocount=0
    for i in grid:
        if i=='1':
            xcount+=1
        elif i=='2':
            ocount+=1
    if xcount==ocount:
        return 1
    return 2

def winmove(grid):
    p=turn(grid)
    return check(grid,p)

def block(grid):
    if turn(grid)==1:
        p=2
    else:
        p=1
    return check(grid,p)

def check(grid,p):
    strg=0
    for i in horizontal(grid):
        if i==f'0{p}{p}':
            return 3*strg
        if i==f'{p}0{p}':
            return 3*strg+1
        if i==f'{p}{p}0':
            return 3*strg+2
        strg+=1
    strg=0
    for i in vertical(grid):
        if i==f'0{p}{p}':
            return strg
        if i==f'{p}0{p}':
            return 3+strg
        if i==f'{p}{p}0':
            return 6+strg
        strg+=1
    strg=0
    for i in diagonal(grid):
        if i==f'0{p}{p}':
            return 2*strg
        if i==f'{p}0{p}':
            return 4
        if i==f'{p}{p}0':
            return 8-(2*strg)
        strg+=1
    return '?'

def move(grid):
    if winmove(grid)=='?':
        if block=='?':
            return '?'
        return block(grid)
    return winmove(grid)

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
