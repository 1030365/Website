let count = 0
let checker = true
let audio = new Audio('AlphaWaves.mp3');
let alarm = new Audio('Alarm.mp3');

let WORK = document.getElementById("start");
let EXTRA = document.getElementById("extra");
let REST = document.getElementById("break");
let TOTAL = document.getElementById("total");
let button = document.getElementById("playButton")
let button2 = document.getElementById("muteButton")
let song_input = document.getElementById("song")
let work_time = 15;
let extra_time = 5;
let rest_time = 15;
let total_time = 90;
let strg = true
let op1 = document.getElementById("op1")
let op2 = document.getElementById("op2")
let op3 = document.getElementById("op3")
let op4 = document.getElementById("op4")
let q2 = document.getElementById("q2")
let q3 = document.getElementById("q3")
let music = false
let song = "AlphaWaves.mp3"
WORK.value=work_time
EXTRA.value=extra_time
REST.value=rest_time
TOTAL.value=total_time
let timeout=null

function Box1Out() {
    if (!(parseInt(WORK.value)>0)) {
        WORK.value = work_time
    }
    WORK.value = parseInt(WORK.value)
}

function Box2Out() {
    if (!(parseInt(EXTRA.value)>0)) {
        EXTRA.value = extra_time
    }
    EXTRA.value = parseInt(EXTRA.value)
}

function Box3Out() {
    if (!(parseInt(REST.value)>0)) {
        REST.value = rest_time
    }
    REST.value = parseInt(REST.value)
}

function Box4Out() {
    if (!(parseInt(TOTAL.value)>0)) {
        TOTAL.value = total_time
    }
    TOTAL.value = parseInt(TOTAL.value)
}

song_input.onchange = function() {
    reveal_button()
}

op2.onchange = function() {
    op1.checked = false
    q2.style.display="none"
    q3.style.display="none"
    if (count == 0) {
        music = false
    }
    reveal_button()
}

op1.onchange = function() {
    op2.checked = false
    q2.style.display="inline-block"
    if (op4.checked) {
        q3.style.display="inline-block"
    }
    if (count == 0) {
        music = true
    }
    reveal_button
}

op3.onchange = function() {
    op4.checked = false
    q3.style.display="none"
    reveal_button()
}

op4.onchange = function() {
    op3.checked = false
    q3.style.display="inline-block"
    reveal_button()
}

function Work() {
    alarm.play()
    timeout = setTimeout(function() {
        if (music) {
            audio.play()
            button2.style.display = 'inline-block'
        }
        timeout = setTimeout(function() {
            Rest()
        }, (60000*work_time)-(1000*alarm.duration))
    }, 1000*alarm.duration)
}

function reveal_button() {
    if (count == 1) {
        return null
    }
    if (op1.checked) {
        if (op4.checked) {
            if (document.getElementById("song").value == '') {
                button.style.display = 'none'
            } else {
                button.style.display = 'inline-block'
            }
        } else if (op3.checked) {
            button.style.display = 'inline-block'
        } else {
            button.style.display = 'none'
        }
    } else if (op2.checked) {
        button.style.display = 'inline-block'
    } else {
        button.style.display = 'none'
    }
}
                


function Rest() {
    if (total_time > 0) {
        if (music) {
            audio.pause()
            button2.style.display = 'none'
        }
        alarm.play()
        total_time -= work_time
        work_time += extra_time
        if (work_time+2*rest_time >= total_time) {
            work_time = total_time-rest_time
        }
        timeout = setTimeout(function() {
            total_time -= rest_time
            Work()
        }, 60000*rest_time)
        if (total_time == 0) {
            end_ladder()
        }
    }
}


function play() {
    if (count == 0) {
        checker = false
        Box1Out()
        Box2Out()
        Box3Out()
        Box4Out()
        count += 1
        work_time = parseInt(document.getElementById("start").value)
        extra_time = parseInt(document.getElementById("extra").value)
        rest_time = parseInt(document.getElementById("break").value)
        total_time = parseInt(document.getElementById("total").value)
        if (op1.checked && op4.checked) {
            if (!(song_input.value == '')) {
                song = URL.createObjectURL(song_input.files[0])
            }
        }
        audio = new Audio(song);
        audio.loop = true;
        audio.volume = 1
        button.textContent = 'End Ladder'
        begin_ladder()
    }
}

button2.onclick = function() {
    if (audio.volume == 1) {
        audio.volume = 0
        button2.textContent = 'Unmute Study Music'
    } else {
        audio.volume = 1
        button2.textContent = 'Mute Study Music'
    }
}

button.onclick = function() {
    if (checker) {
        play()
    } else {
        end_ladder()
    }
}

function begin_ladder() {
    if (music) {
        audio.play()
        button2.style.display = 'inline-block'
    }
    timeout = setTimeout(function() {
        Rest()
    }, 60000*work_time)
}

function end_ladder() {
    checker = true
    clearTimeout(timeout)
    audio.pause()
    alarm.pause()
    count = 0
    button.textContent = 'Play'
    button2.style.display = 'none'
    reveal_button()
}
