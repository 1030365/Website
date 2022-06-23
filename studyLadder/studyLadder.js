let count = 0
let checker = true
let audio = new Audio('AlphaWaves.mp3');
let alarm = new Audio('Alarm.mp3');
let beep = new Audio('beep.mp3');
let lastTime = null
let WORK = document.getElementById("start");
let EXTRA = document.getElementById("extra");
let REST = document.getElementById("break");
let TOTAL = document.getElementById("total");
let button = document.getElementById("playButton")
let button2 = document.getElementById("muteButton")
let button3 = document.getElementById("pauseButton")
let song_input = document.getElementById("song")
let timeText = document.getElementById("nextTime")
let nextRung = document.getElementById("nextRung")
let endTime = document.getElementById("endTime")
let addTime = document.getElementById("addButton")
let working = false
let paused = false
let Time = new Date()
let PauseTime = new Date()
let nextTime = new Date()
let work_time = 15;
let extra_time = 5;
let rest_time = 15;
let total_time = 90;
let added_time = 0;
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

var Timer = function(callback, delay) {
    var timerId, start, remaining = delay;
    this.pause = function() {
        window.clearTimeout(timerId);
        timerId = null;
        remaining -= Date.now() - start;
    };
    this.resume = function() {
        if (timerId) {
            return;
        }
        start = Date.now();
        timerId = window.setTimeout(callback, remaining);
    };
    this.resume();
};

function Box1Out() {
    if (!(parseInt(WORK.value)>0)) {
        WORK.value = work_time
    }
    WORK.value = parseInt(WORK.value)
    Box4Out()
}

function Box2Out() {
    if (!(parseInt(EXTRA.value)>=0)) {
        EXTRA.value = extra_time
    }
    EXTRA.value = parseInt(EXTRA.value)
}

function Box3Out() {
    if (!(parseInt(REST.value)>0)) {
        REST.value = rest_time
    }
    REST.value = parseInt(REST.value)
    Box4Out()
}

function Box4Out() {
    if (!(parseInt(TOTAL.value)>(parseInt(WORK.value)+parseInt(REST.value)+1))) {
        TOTAL.value = parseInt(WORK.value)+parseInt(REST.value)+1
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
    working = true
    set_the_time()
    alarm.play()
    timeout = new Timer(function() {
        if (music) {
            audio.play()
            button2.style.display = 'inline-block'
        }
        addTime.style.display = 'inline-block'
        timeout = new Timer(function() {
            if (added_time == 0) {
                beep.play()
            }
            timeout = new Timer(function() {
                extra_minutes()
            }, 30000)
        }, (60000*work_time)-(1000*alarm.duration)-30000)
    }, 1000*alarm.duration)
}

function reveal_button() {
    if (count == 1) {
        return null
    }
    if (op1.checked) {
        if (op4.checked) {
            if (song_input.value.length < 5) {
                button.style.display = 'none'
            } else if ((song_input.value.slice(-4) == '.mp3') || (song_input.value.slice(-4) == '.wav')) {
                button.style.display = 'inline-block'
            } else {
                button.style.display = 'none'
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
    working = false
    if (total_time > 0) {
        if (music) {
            audio.pause()
            button2.style.display = 'none'
        }
        addTime.style.display = 'none'
        set_the_time()
        alarm.play()
        total_time -= work_time
        work_time += extra_time
        if (work_time+2*rest_time >= total_time) {
            work_time = total_time-rest_time
            nextRung.textContent = `Next Rung: ${work_time} min`
        }
        timeout = new Timer(function() {
            beep.play()
            timeout = new Timer(function() {
                total_time -= rest_time
                Work()
            }, 30000)
        }, 60000*rest_time-30000)
        if (total_time == 0) {
            end_ladder()
        }
    }
}

function extra_minutes() {
    if (added_time > 0) {
        timeout = new Timer(function() {
            if (added_time == 1) {
                beep.play()
            }
            timeout = new Timer(function() {
                added_time -= 1
                extra_minutes()
            }, 30000)
        }, 30000)
    } else {
        Rest()
    }
}


function play() {
    if (count == 0) {
        added_time = 0
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
        button2.textContent = 'Mute Study Music'
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

button3.onclick = function() {
    if (paused) {
        paused = false
        button3.textContent = 'Pause Study Ladder'
        lastTime = new Date(lastTime.getTime()+new Date().getTime()-PauseTime.getTime())
        nextTime = new Date(nextTime.getTime()+new Date().getTime()-PauseTime.getTime())
        update_time()
        timeText.style.display = 'inline-block'
        if (working) {
            addTime.style.display = 'inline-block'
            if (music) {
                audio.play()
                button2.style.display = 'inline-block'
            }
        }
        if (!((work_time == total_time) && working)) {
            nextRung.style.display = 'inline-block'
            endTime.style.display = 'inline-block'
        }
        timeout.resume()
    } else {
        PauseTime = new Date()
        paused = true
        button3.textContent = 'Unpause Study Ladder'
        addTime.style.display = 'none'
        button2.style.display = 'none'
        timeText.style.display = 'none'
        nextRung.style.display = 'none'
        endTime.style.display = 'none'
        if (music) {
            audio.pause()
        }
        timeout.pause()
    }
}
    

function set_the_time() {
    Time = new Date()
    nextTime = new Date(Time.getTime()+(60000*rest_time))
    if (lastTime == null) {
        lastTime = new Date(Time.getTime()+(60000*total_time))
    }
    if (working) {
        nextTime = new Date(Time.getTime()+(60000*work_time))
    }
    update_time()
}

function update_time() {
    let hr = 0
    let ampm = 'A.M.'
    let message = 'Break Ends'
    let extraZero = ''
    if (working) {
        message = 'Next Break'
        if (work_time == total_time) {
            message = 'Ladder Finishes'
            endTime.style.display = 'none'
            nextRung.style.display = 'none'
        } else if (2*work_time+extra_time+2*rest_time >= total_time) {
            nextRung.textContent = `Next Rung: ${total_time-work_time-rest_time} min`
        } else {
            nextRung.textContent = `Next Rung: ${work_time+extra_time} min`
        }
    }
    if (nextTime.getHours() == 0) {
        hr = 12
    } else if (nextTime.getHours() == 12) {
        ampm = 'P.M.'
    } else if (nextTime.getHours() > 12) {
        ampm = 'P.M.'
        hr = -12
    }
    if (nextTime.getMinutes() < 10) {
        extraZero = '0'
    } else {
        extraZero = ''
    }
    timeText.textContent = `${message} at ${nextTime.getHours()+hr}:${extraZero}${nextTime.getMinutes()} ${ampm}`
    hr = 0
    ampm = 'A.M.'
    extraZero = ''
    if (lastTime.getHours() == 0) {
        hr = 12
    } else if (lastTime.getHours() == 12) {
        ampm = 'P.M.'
    } else if (lastTime.getHours() > 12) {
        ampm = 'P.M.'
        hr = -12
    }
    if (lastTime.getMinutes() < 10) {
        extraZero = '0'
    }
    endTime.textContent = `Ladder Finishes at ${lastTime.getHours()+hr}:${extraZero}${lastTime.getMinutes()} ${ampm}`
}

addTime.onclick = function() {
    added_time += 1
    lastTime = new Date(lastTime.getTime()+60000)
    nextTime = new Date(nextTime.getTime()+60000)
    update_time()
}


function begin_ladder() {
    working = true
    button3.style.display = 'inline-block'
    set_the_time()
    if (music) {
        audio.play()
        button2.style.display = 'inline-block'
    }
    addTime.style.display = 'inline-block'
    timeText.style.display = 'inline-block'
    nextRung.style.display = 'inline-block'
    endTime.style.display = 'inline-block'
    timeout = new Timer(function() {
        if (added_time == 0) {
            beep.play()
        }
        timeout = new Timer(function() {
            extra_minutes()
        }, 30000)
    }, 60000*work_time-30000)
}

function end_ladder() {
    working = false
    checker = true
    paused = false
    timeout.pause()
    audio.pause()
    count = 0
    lastTime = null
    button.textContent = 'Play'
    button2.style.display = 'none'
    button3.style.display = 'none'
    button3.textContent = 'Pause Study Ladder'
    reveal_button()
    timeText.style.display = 'none'
    nextRung.style.display = 'none'
    endTime.style.display = 'none'
    addTime.style.display = 'none'
}
