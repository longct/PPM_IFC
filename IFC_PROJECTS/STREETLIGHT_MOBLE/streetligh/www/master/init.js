
$(document).ready(function () {
    try {
        resize();
        loadConetent();
        //checkPermission();
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
        

        $(".tu_panel").click(function () {
            $("#act_home").slideDown();
        })

      //  $("span.uname").html(JSON.parse(localStorage.getItem("userinfo")).tennhanvien);

        $(".bt_logout").click(function () {
            window.location.href = "index.html";
         //   localStorage.clear();
        });
        localStorage.setItem('change', 'TU');

    } catch (e) { console.log(e); }
});

function loadchecklog_master() {
    try {
        return;
        var userinfo = localStorage.getItem('userinfo');
        if (userinfo == null || userinfo == [] || userinfo == undefined) {
            window.location.href = "index.html";
            return;
        }
        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (user.manhanvien == null || user.manhanvien == [] || user.manhanvien == undefined) {
            window.location.href = "index.html";
            return;
        }
    } catch (e) {
        console.log(e);
    }
}

function checkPermission() {
    var permiss = JSON.parse(localStorage.getItem("userinfo")).quyen;
    
    switch (permiss) {
        case 2:
            $("li#thietlapcb").hide();
            $("li#chokb").hide();
            $("li.u-qlnd").hide();
            break;
        case 3:
            $("li#thietlapcb").hide();
            break;
    }
}
