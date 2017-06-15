var click1 = 0;
var click2 = 0;
$(document).ready(function () {
    createMap();

    //$("#gmap .panel-refresh").on("click", function () {
    //    var panel = $(this).parents(".panel");
    //    panel_refresh(panel, "shown", reload);

    //    setTimeout(function () {
    //        panel_refresh(panel);
    //    }, 3000);

    //    $(this).parents(".dropdown").removeClass("open");
    //    return false;
    //});
    //var chart_height = eval($("#google_ptm_map").height() - $("#dieukhientu").height() - 257 -20 );
    //var chart_height = eval($("#google_ptm_map").height() - 220);
    //console.log("=" + chart_height);
    //$("#container").height(chart_height);
    //chart_home();

    //setInterval(load, 10000);
    //function load() {
    //    $("#lognguoidung .panel-refresh").click();
    //    $("#boxcanhbao .panel-refresh").click();
    //    $("#boxchitiettu .panel-refresh").click();
    //}

    /* Google maps */
    $(".panel-full-right").on("click", function () {
        if ($(this).parents().parent().hasClass("has-right")) {
            $(this).parents().parent().removeClass("has-right");
            $(".page-content-right").show();
            $("#row-bottom").show();
            $("#row-bottom").css("height", 168);
            createMap();
        } else {
            $(this).parents().parent().addClass("has-right");
            $(".page-content-right").hide();
            $("#row-bottom").hide();
            $("#row-bottom").css("height", 0);
            createMap();
        }
    });


});
function createMap() {
    /*TỦ*/
    var vpW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log($("#row-bottom").height());
    var loguser = $(".loguser");
    $("#google_ptm_map").css("height", vpH - $("#row-bottom").height() - 170);

    //alert(($("#gmap").height() - $("#boxchitiettu").height())/3)
    //loguser.css("height", ($("#gmap").height() - $("#boxchitiettu").height()) / 3 - 25);
    loguser.css("max-height", ($("#gmap").height() - $("#boxchitiettu").height()) / 3 - 30);
    //$(".body-chitiettu").css("height",)
    gPTMCords = new google.maps.LatLng(10.633913, 106.741170);
    gPTMOptions = { zoom: 17, center: gPTMCords, mapTypeId: google.maps.MapTypeId.ROADMAP }
    gPTM = new google.maps.Map(document.getElementById("google_ptm_map"), gPTMOptions);
    var cords1 = new google.maps.LatLng(10.633913, 106.741170);
    var marker1 = new google.maps.Marker({ position: cords1, map: gPTM, title: "HIỆP PHƯỚC 14", icon: "img/Modem_kn.png" });
    var cords2 = new google.maps.LatLng(10.633985, 106.742953);
    var marker2 = new google.maps.Marker({ position: cords2, map: gPTM, title: "HIỆP PHƯỚC 13", icon: "img/Modem_kn.png" });

    var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h4 id="firstHeading" class="firstHeading">HIỆP PHƯỚC 14</h4>' +
                            '<div id="bodyContent">' +
                            '<span>Giờ tắt: 06:30 ~ 17:30</span><br/>' +
                            '<span>Giờ bật: 17:30 ~ 06:30</span><br/>' +
                            //'<span>Tổng số bóng: 26</span><br/>' +
                            //'<span>Người quản lý: Cao Thanh Long</span><br/>' +
                            //'<span>Số điện thoại: 0976365728</span><br/>' +
                            '</div>' +
                        '</div>';

    var contentString2 = '<div id="content">' +
                                '<div id="siteNotice">' +
                                '</div>' +
                                '<h4 id="firstHeading" class="firstHeading">HIỆP PHƯỚC 13</h4>' +
                                '<div id="bodyContent">' +
                                '<span>Giờ tắt: 06:30 ~ 17:30</span><br/>' +
                                '<span>Giờ bật: 17:30 ~ 06:30</span><br/>' +
                                //'<span>Tổng số bóng: 26</span><br/>' +
                                //'<span>Người quản lý: Cao Thanh Long</span><br/>' +
                                //'<span>Số điện thoại: 0976365728</span><br/>' +
                                '</div>' +
                            '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var infowindow = new google.maps.InfoWindow({
        content: contentString2
    });



    marker1.addListener('mouseover', function () {
        infowindow.open(gPTM, marker1);
    });

    marker1.addListener('click', function () {
        doimauden1(light_data);
    });

    marker2.addListener('mouseover', function () {
        infowindow.open(gPTM, marker2);
    });
    marker2.addListener('click', function () {
        doimauden2(light_data2);
    });

    /**/
    $.each(light_data, function (key, val) {
        var cords_bong1 = new google.maps.LatLng(val.lat, val.lng);
        var marker_bong1 = new google.maps.Marker({ position: cords_bong1, map: gPTM, title: "PVBAY_HP14_" + key, icon: "img/trangthai_tree_1.png" });
    })

    $.each(light_data2, function (key, val) {
        var cords_bong2 = new google.maps.LatLng(val.lat, val.lng);
        var marker_bong2 = new google.maps.Marker({ position: cords_bong2, map: gPTM, title: "PVBAY_HP13_" + key, icon: "img/trangthai_tree_1.png" });
    })
    /********************************************TỦ 2***************************************/

    /***************************************************/////////////******************************

    var cap2 = new google.maps.Polyline({
        path: light_data2,
        geodesic: true,
        strokeColor: '#b64645',
        strokeOpacity: 1.0,
        strokeWeight: 1
    });
    var cap = new google.maps.Polyline({
        path: light_data,
        geodesic: true,
        strokeColor: '#2196F3',
        strokeOpacity: 1.0,
        strokeWeight: 1
    });
    

    cap.setMap(gPTM);
    cap2.setMap(gPTM);
}

function reload() {
    alert("Hàm callback() sự kiện Refresh");
}
function reloadTu() {
    alert("Hàm callback() sự kiện Refresh Thông tin tủ");
}
function reloadLog() {
    console.log("Hàm callback() sự kiện Refresh Thông tin tủ");
}
function tu_only() {
    var gPTMCords = new google.maps.LatLng(10.633913, 106.741170);
    var gPTMOptions = { zoom: 17, center: gPTMCords, mapTypeId: google.maps.MapTypeId.ROADMAP }
    var gPTM = new google.maps.Map(document.getElementById("google_ptm_map"), gPTMOptions);
    /*TỦ*/
    var cords1 = new google.maps.LatLng(10.633913, 106.741170);
    var marker1 = new google.maps.Marker({ position: cords1, map: gPTM, title: "HIỆP PHƯỚC 14", icon: "img/Modem_kn.png" });
    var cords2 = new google.maps.LatLng(10.633985, 106.742953);
    var marker2 = new google.maps.Marker({ position: cords2, map: gPTM, title: "HIỆP PHƯỚC 13", icon: "img/Modem_kn.png" });
    /**/
    var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h4 id="firstHeading" class="firstHeading">HIỆP PHƯỚC 14</h4>' +
                            '<div id="bodyContent">' +
                            '<span>Giờ tắt: 06:30 ~ 17:30</span><br/>' +
                            '<span>Giờ bật: 17:30 ~ 06:30</span><br/>' +
                            //'<span>Tổng số bóng: 26</span><br/>' +
                            //'<span>Người quản lý: Cao Thanh Long</span><br/>' +
                            //'<span>Số điện thoại: 0976365728</span><br/>' +
                            '</div>' +
                        '</div>';

    var contentString2 = '<div id="content">' +
                                '<div id="siteNotice">' +
                                '</div>' +
                                '<h4 id="firstHeading" class="firstHeading">HIỆP PHƯỚC 13</h4>' +
                                '<div id="bodyContent">' +
                                '<span>Giờ tắt: 06:30 ~ 17:30</span><br/>' +
                                '<span>Giờ bật: 17:30 ~ 06:30</span><br/>' +
                                //'<span>Tổng số bóng: 26</span><br/>' +
                                //'<span>Người quản lý: Cao Thanh Long</span><br/>' +
                                //'<span>Số điện thoại: 0976365728</span><br/>' +
                                '</div>' +
                            '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var infowindow = new google.maps.InfoWindow({
        content: contentString2
    });

    marker1.addListener('mouseover', function () {
        infowindow.open(gPTM, marker1);
    });

    marker2.addListener('mouseover', function () {
        infowindow.open(gPTM, marker2);
    });
}

function tu_bong() {
    var gPTMCords = new google.maps.LatLng(10.633913, 106.741170);
    var gPTMOptions = { zoom: 17, center: gPTMCords, mapTypeId: google.maps.MapTypeId.ROADMAP }
    var gPTM = new google.maps.Map(document.getElementById("google_ptm_map"), gPTMOptions);
    /*TỦ*/
    var cords1 = new google.maps.LatLng(10.633913, 106.741170);
    var marker1 = new google.maps.Marker({ position: cords1, map: gPTM, title: "HIỆP PHƯỚC 14", icon: "img/Modem_kn.png" });
    var cords2 = new google.maps.LatLng(10.633985, 106.742953);
    var marker2 = new google.maps.Marker({ position: cords2, map: gPTM, title: "HIỆP PHƯỚC 13", icon: "img/Modem_kn.png" });
    /**/
    var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h4 id="firstHeading" class="firstHeading">HIỆP PHƯỚC 14</h4>' +
                            '<div id="bodyContent">' +
                            '<span>Giờ tắt: 06:30 ~ 17:30</span><br/>' +
                            '<span>Giờ bật: 17:30 ~ 06:30</span><br/>' +
                            //'<span>Tổng số bóng: 26</span><br/>' +
                            //'<span>Người quản lý: Cao Thanh Long</span><br/>' +
                            //'<span>Số điện thoại: 0976365728</span><br/>' +
                            '</div>' +
                        '</div>';

    var contentString2 = '<div id="content">' +
                                '<div id="siteNotice">' +
                                '</div>' +
                                '<h4 id="firstHeading" class="firstHeading">HIỆP PHƯỚC 13</h4>' +
                                '<div id="bodyContent">' +
                                '<span>Giờ tắt: 06:30 ~ 17:30</span><br/>' +
                                '<span>Giờ bật: 17:30 ~ 06:30</span><br/>' +
                                //'<span>Tổng số bóng: 26</span><br/>' +
                                //'<span>Người quản lý: Cao Thanh Long</span><br/>' +
                                //'<span>Số điện thoại: 0976365728</span><br/>' +
                                '</div>' +
                            '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var infowindow = new google.maps.InfoWindow({
        content: contentString2
    });

    marker1.addListener('mouseover', function () {
        infowindow.open(gPTM, marker1);
    });

    marker2.addListener('mouseover', function () {
        infowindow.open(gPTM, marker2);
    });
    /**/
    $.each(light_data, function (key, val) {
        var cords_bong1 = new google.maps.LatLng(val.lat, val.lng);
        var marker_bong1 = new google.maps.Marker({ position: cords_bong1, map: gPTM, title: "PVBAY_HP14_" + key, icon: "img/trangthai_tree_1.png" });
    })

    $.each(light_data2, function (key, val) {
        var cords_bong2 = new google.maps.LatLng(val.lat, val.lng);
        var marker_bong2 = new google.maps.Marker({ position: cords_bong2, map: gPTM, title: "PVBAY_HP13_" + key, icon: "img/trangthai_tree_1.png" });
    })
    var cap = new google.maps.Polyline({
        path: light_data,
        geodesic: true,
        strokeColor: '#2196F3',
        strokeOpacity: 1.0,
        strokeWeight: 1
    });
    var cap2 = new google.maps.Polyline({
        path: light_data2,
        geodesic: true,
        strokeColor: '#b64645',
        strokeOpacity: 1.0,
        strokeWeight: 1
    });
    $("#hienvung_map").change(function () {
        if ($("#hienvung_map").is(':checked')) {
            cap.setMap(gPTM);
            cap2.setMap(gPTM);
        }
        else {
            cap.setMap(null);
            cap2.setMap(null);
        }
    })
    $("#hiencap_map").change(function () {
        if ($("#hiencap_map").is(':checked')) {
            cap.setMap(gPTM);
            cap2.setMap(gPTM);
        }
        else {
            cap.setMap(null);
            cap2.setMap(null);
        }
    })

    if ($("#hiencap_map").is(':checked')) {
        cap.setMap(gPTM);
        cap2.setMap(gPTM);
    }
    else {
        cap.setMap(null);
        cap2.setMap(null);
    }
}

function doimauden1(data) {
    console.log(click1);
    if (click1 == 0) {
        $.each(data, function (key, val) {
            var cords_bong1 = new google.maps.LatLng(val.lat, val.lng);
            var marker_bong1 = new google.maps.Marker({ position: cords_bong1, map: gPTM, icon: "img/trangthai2.png" });
        });

        click1 = 1;
    }
    else {
        $.each(data, function (key, val) {
            var cords_bong1 = new google.maps.LatLng(val.lat, val.lng);
            var marker_bong1 = new google.maps.Marker({ position: cords_bong1, map: gPTM, icon: "img/trangthai_tree_1.png" });
        });
        click1 = 0;
    }

}

function doimauden2(data) {
    console.log(click2);
    if (click2 == 0) {
        $.each(data, function (key, val) {
            var cords_bong1 = new google.maps.LatLng(val.lat, val.lng);
            var marker_bong1 = new google.maps.Marker({ position: cords_bong1, map: gPTM, icon: "img/trangthai2.png" });
        });

        click2 = 1;
    }
    else {
        $.each(data, function (key, val) {
            var cords_bong1 = new google.maps.LatLng(val.lat, val.lng);
            var marker_bong1 = new google.maps.Marker({ position: cords_bong1, map: gPTM, icon: "img/trangthai_tree_1.png" });
        });
        click2 = 0;
    }

}