import random
from random import randint

global WIDTH, HEIGHT, BOARD, TURNS

WIDTH=4
HEIGHT=4
BOARD=['X'*WIDTH]*HEIGHT
TURNS=4
GOALBOARD=['O'*WIDTH]*HEIGHT

def makeboards():
    global BOARD, TURNS, HEIGHT, WIDTH, GOALBOARD
    BOARD=['']*HEIGHT
    for i in range(0,WIDTH):
        for w in range(0,HEIGHT):
            if randint(0,1)==0:
                BOARD[w]=BOARD[w]+'X'
            else:
                BOARD[w]=BOARD[w]+'O'
    GOALBOARD=BOARD.copy()
    strga=[]
    while len(strga)<TURNS:
        strgb=(randint(0,WIDTH-1),randint(0,HEIGHT-1))
        if strgb in strga:
            continue
        strga.append(strgb)
    for i in strga:
        click(i[0],i[1])


def display():
    global BOARD, GOALBOARD
    print('\n'*5)
    for i in GOALBOARD:
        strg=''
        for w in i:
            strg+=w+' '
        print(strg+'\n')
    print('_'*10+'\n')
    for i in BOARD:
        strg=''
        for w in i:
            strg+=w+' '
        print(strg+'\n')


def flip(x,y):
    global BOARD, WIDTH, HEIGHT
    if x>=0 and x<WIDTH and y>=0 and y<HEIGHT:
        if BOARD[y][x]=='O':
            strg='X'
        else:
            strg='O'
        BOARD[y]=BOARD[y][:x]+strg+BOARD[y][(x+1):]

def click(x,y):
    global BOARD, WIDTH, HEIGHT
    for i in range(x-1,x+2):
        for w in range(y-1,y+2):
            flip(i,w)

makeboards()
display()

for i in range(0,TURNS):
    strg=input('Click Where? ')
    strg=strg.split(',')
    x=int(strg[0])-1
    y=int(strg[1])-1
    click(x,y)
    display()
display()
if BOARD==GOALBOARD:
    print('YOU WIN!')
else:
    print('Better luck next time...')
