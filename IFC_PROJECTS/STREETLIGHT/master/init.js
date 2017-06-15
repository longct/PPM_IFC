$(document).ready(function () {
    try {

        resize();
        var q = JSON.parse(localStorage.getItem("userinfo")).quyen;
        //if (q == "1") {
        //    $(".main-content-delete").empty();
        //    $(".main-content-delete").html('<div data-include="Module/BaoCaoChung/Baocaocanhbaosukiencongto"></div>');
        //}
        //else if (q == "3") {
        //    $(".main-content-delete").empty();
        //    $(".main-content-delete").html('<div data-include="Module/Home"></div>');
        //}
        //else if (q == "4") {
        //    $(".main-content-delete").empty();
        //    $(".main-content-delete").html('<div data-include="Module/bandotu01"></div>');
        //}
        loadConetent();
        checkPermission();
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

        $("span.uname").html(JSON.parse(localStorage.getItem("userinfo")).tennhanvien);

        $(".bt_logout").click(function () {
            window.location.href = "login.html";
            localStorage.clear();
        });
        localStorage.setItem('change', 'TU');
        $("#change").click(function () {
            if ($(this).attr("href") == "#Module/HomeDenTrangTri") {
                $(this).attr("href", "#Module/Home");
                $("#nameTitle").attr("href", "#Module/HomeDenTrangTri");
                $("#change_img").attr("src", "img/chieusang.png");
                localStorage.setItem('change', 'DEN');
            }
            else {
                $(this).attr("href", "#Module/HomeDenTrangTri");
                $("#nameTitle").attr("href", "#Module/Home");
                $("#change_img").attr("src", "img/trangtri.png");
                localStorage.setItem('change', 'TU');
            }
            //$(this).click();
            try
            {
                f_loadChangeFilter();
            } catch (e) { }
            try{
                f_loadname();
            }catch(e){}
        })



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

function checkPermission() {
    var permiss = JSON.parse(localStorage.getItem("userinfo")).quyen;
    console.log(permiss);
    
    switch (permiss) {
        case 1:
            console.log(permiss);
            $("li#canhbao").click();
            break;
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