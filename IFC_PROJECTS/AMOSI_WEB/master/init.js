$(document).ready(function () {
    try {

        resize();
        loadConetent();
        //loaddonvi();
        var wrapper_w = $(".wrapper").width();
        var wrapper_h = $(".wrapper").height();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $(".tu_panel").css("width", wrapper_w / 1.5);
            $(".tu_panel").css("height", wrapper_w / 1.4);
            $(".panel").css("max-height", wrapper_h - 50);
        } else {
            $(".tu_panel").css("width", wrapper_w / 5.2);
            $(".tu_panel").css("height", wrapper_w / 4.5);
            $(".panel").css("max-height", wrapper_h - 50);
        }
        
        $(".bt_logout").click(function () {
            window.location.href = "login.html";
            localStorage.clear();
        });

      
    } catch (e) { console.log(e); }
});

function loadchecklog_master() {
    try {
        var userinfo = localStorage.getItem('userinfo');
        if (userinfo == null || userinfo == [] || userinfo == undefined) {
            window.location.href = "login.html";
            return;
        }
        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (user.manhanvien == null || user.manhanvien == [] || user.manhanvien == undefined) {
            window.location.href = "login.html";
            return;
        }
    } catch (e) {
        console.log(e);
    }
}

$('.tooltips').tooltip();

function resize() {
    var width = $(window).width();
    var height = $(window).height();
    $(".site-min-height").css("height", height - 100);
    if (width <= 1024) {
        $("#menu ul li").css("font-size", "10px !important");
    }
}