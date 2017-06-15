$('#viewlanguage.toggle').toggles({
    drag: true, // allow dragging the toggle between positions
    click: true, // allow clicking on the toggle
    text: {
        on: 'VI', // text for the ON position
        off: 'EN' // and off
    },
    on: false, // is the toggle ON on init
    animate: 250, // animation time (ms)
    easing: 'swing', // animation transition easing function
    checkbox: null, // the checkbox to toggle (for use in forms)
    clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
    width: 50, // width used if not set in css
    height: 20, // height if not set in css
    type: 'compact' // if this is set to 'select' then the select style toggle will be used
});
$('#viewunit.toggle').toggles({
    drag: true, // allow dragging the toggle between positions
    click: true, // allow clicking on the toggle
    text: {
        on: 'M', // text for the ON position
        off: 'Miles' // and off
    },
    on: false, // is the toggle ON on init
    animate: 250, // animation time (ms)
    easing: 'swing', // animation transition easing function
    checkbox: null, // the checkbox to toggle (for use in forms)
    clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
    width: 50, // width used if not set in css
    height: 20, // height if not set in css
    type: 'compact' // if this is set to 'select' then the select style toggle will be used
});

$('#viewlanguage.toggle').on('toggle', function (e, active) {
    localStorage.removeItem("language");
    if (active) {
        localStorage.setItem("language", "EN");
     //   console.log('EN');
    } else {
        localStorage.setItem("language", "VI");
     //   console.log('VI');
    }
});
$('#viewunit.toggle').on('toggle', function (e, active) {
    localStorage.removeItem("Unit");
    if (active) {
        localStorage.setItem("Unit", "MILE");
      //  console.log('MILE');       
    } else {
        localStorage.setItem("Unit", "M");
      //  console.log('KM');
    }
});
$(document).ready(function () {
   
    if (localStorage.getItem("language") == "VI") {
        $('#viewlanguage.toggle').toggles({ on: false });
    } else {
        $('#viewlanguage.toggle').toggles({ on: true });
    }
    if (localStorage.getItem("Unit") == "M") {
        $('#viewunit.toggle').toggles({ on: false });
    } else {
        $('#viewunit.toggle').toggles({ on: true });
    }
});