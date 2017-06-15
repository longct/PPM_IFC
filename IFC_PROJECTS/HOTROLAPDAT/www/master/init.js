$(document).ready(function () {
    try {
        loadContent();
        

    } catch (e) {
        console.log(e);
    }
});

var seconds = 0, minutes = 0, hours = 0, t;
function timer_clear() {
    try {
        $('.timer_run').html("00:00");
        seconds = 0; minutes = 0; hours = 0;
    } catch (e) {
        console.log(e);
    }

}
function timer_add() {
    try {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        $('.timer_run').html((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
        $('.timer_run').html((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));


        timer_timer();
    } catch (e) {
        console.log(e);
    }

}

function timer_timer() {
    t = setTimeout(timer_add, 1000);
}

function timer_stop() {
    clearTimeout(t);
}