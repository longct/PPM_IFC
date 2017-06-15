
var viewAllSearch_tkxq = 1;
$(document).ready(function () {

    try {
        loadContent();
        getLangText();
        init_xungquanh();

        $("#mod_name").html(apiLstLang.lang_modName);
        $('#viewAllNear.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: 'ON', // text for the ON position
                off: 'OFF' // and off
            },
            on: true, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 50, // width used if not set in css
            height: 20, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
        $('#viewAllNear.toggle').on('toggle', function (e, active) {
            if (active) {
                viewAllSearch_tkxq = 1;
            } else {
                viewAllSearch_tkxq = 0;
            }
        });
        f_KhoiTaoTimer();

    } catch (e) {
        console.log(e);
    }
});
function getLangText() {
    $("#httc_tkxq").text(apiLstLang.lang_hienthitatca);
    $("#kc_tkxq").text(apiLstLang.lang_khoangcach);
}
function f_KhoiTaoTimer() {
    try {
        $('.timer').timer({
            editable: false,
            duration: '1s',
            repeat: false,
            callback: function () {
                try {
                    getDanhSachDiaDiem_tkxq();
                    $('.timer').timer('remove');
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }
}
function init_xungquanh() {

    try {
        $("#sliderKhoangCachXungQuanh").ionRangeSlider({
            type: "single",
            grid: false,
            min: 0,
            max: 300,
            from: 50,
            step: 10,
            keyboard: true,
            postfix: "",
            onUpdate: function (data) {
                $("#rangeValue_xq").val(data.from + " m");
            },
            onFinish: function (data) {
                $("#rangeValue_xq").val(data.from + " m");
                f_thayDoiKhoangCach_tkxq(data.from);
                stopLoad();
            }
        });


    } catch (e) {
        console.log(e);
    }
}


function getDanhSachDiaDiem_tkxq() {
    try {
        var p = getAllIdMod();

        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.TIMKIEMXUNGQUANH" };
        var para = {
            V_VIEWALXQ: viewAllSearch_tkxq
        };
        console.log(para);
        var lst = ExecuteServiceSyns(config, para);
        result_timkiemxungquanh(lst);
        stopLoad();
    } catch (e) {
        console.log(e);
    }
}

function result_timkiemxungquanh(lst) {
    try {

        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0)
            return;

        var khoangcach = parseInt($("#rangeValue_xq").val().replace(/[^\d.]/g, ''));
        var config = { khoangcanh: khoangcach, hienViTri: true, circle: true, zoom: 17 };
        console.log("lst.data");
        console.log(lst.data);
        f_hienThongTinBanDo_bds(config, lst.data);

    } catch (e) {
        console.log(e);
    }
}
function f_thayDoiKhoangCach_tkxq(khoangcacha) {
    var config = { khoangcanh: khoangcacha, hienViTri: true, circle: true, zoom: 17 };
    marker.setMap(null);
    //bindMapRange_bds(config);
}
