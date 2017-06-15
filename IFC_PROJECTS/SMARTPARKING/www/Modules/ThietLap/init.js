var hethong = { lang: "VI", donvi: "KM" };
$(document).ready(function () {
    getLangText();
    LoadToggle();
    $('#viewlanguage.toggle').on('toggle', function (e, active) {
        if (active) {
            hethong.lang = "EN";
        } else {
            hethong.lang = "VI";
        }
        localStorage.setItem("thietlap", JSON.stringify(hethong));
        getLangText();
        CheckThietLap();
    });
    $('#viewunit.toggle').on('toggle', function (e, active) {
        if (active) {
            hethong.donvi = "MILE";
        } else {
            hethong.donvi = "KM";
        }
        localStorage.setItem("thietlap", JSON.stringify(hethong));
    });
});
function LoadToggle() {
    var tl = JSON.parse(localStorage.getItem("thietlap"));
    if (tl.lang.indexOf("VI") > -1) {
        $('#viewlanguage.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: '', // text for the ON position
                off: '' // and off
            },
            on: false, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 60, // width used if not set in css
            height: 23, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
    } else if (tl.lang.indexOf("EN") > -1) {
        $('#viewlanguage.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: '', // text for the ON position
                off: '' // and off
            },
            on: true, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 60, // width used if not set in css
            height: 23, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
    }
    if (tl.donvi.indexOf("KM") > -1) {
        $('#viewunit.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: '', // text for the ON position
                off: '' // and off
            },
            on: false, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 60, // width used if not set in css
            height: 23, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
    } else {
        $('#viewunit.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: '', // text for the ON position
                off: '' // and off
            },
            on: true, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 60, // width used if not set in css
            height: 23, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
    }
};
function getLangText() {
    apiLstLang = [];
    var url = window.location.hash.substr(1) + "/lang.json";
   
    f_langInit_2(url, test);
}
function test() {
    $("#mod_name").html(apiLstLang.lang_modeName);
    $("#nn_tl").text(apiLstLang.lang_ngongu);
    $("#dv_tl").text(apiLstLang.lang_donvi);
}




