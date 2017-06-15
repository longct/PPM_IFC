$(document).ready(function () {
    try {
        loadContent();
        var sheight = $(window).height();
        var swidth = $(window).width();
        loadLoaicongto();
        $(".meter_info_tbl").css("max-height", sheight - 230);

        $("#search_field").keypress(function (event) {
            if (event.which == 13) {
                //show_kq($(this).val(), "DNPC");
                console.log(JSON.parse(localStorage.getItem("userinfo")));
                var server_ = JSON.parse(localStorage.getItem("userinfo")).server;
                var port_ = JSON.parse(localStorage.getItem("userinfo")).port;
                var type_ct = $("#cb_loaict option:selected").val();
                var pass_ = matkhaucongto(type_ct);
                var imei = $("#timkiemdiemdo").val();
                console.log(pass_);
                if ($("#matkhaucto").val() != "") {
                    console.log($("#matkhaucto").val());
                    pass_ = $("#matkhaucto").val();
                }
                var param = { server: server_, port: port_, type: type_ct, mkct: pass_, imei: imei }
                send_com(param);
            }
        })
        $("#connect_click").click(function () {
            checkConnect();
        })
        $("#map_click").click(function () {
            showMap();
        })

        $(".toadohientai").click(function () {
            callProcess("toadohientai");
            getToado();
        })
        $("#capnhattoado_btn").click(function () {
            set_toado();
        })
        $("#ck_mkct").change(function () {
            if (!$(this).is(":checked")) {
                $("#matkhaucto").slideDown();
            } else {
                $("#matkhaucto").slideUp();
            }
        })
    } catch (e) {
        console.log(e);

    }
});
function loadLoaicongto() {
    var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_CAUHINH.GET_LOAICONGTO" };
    var para = {};
    var lst = ExecuteServiceSyns(config, para);
    console.log(lst);
    var congto = lst.data;
    $('#cb_loaict').empty();
    $.each(congto, function (key, val) {
        $('#cb_loaict').append($('<option>', {
            value: val.ten_cto,
            text: val.ten_cto,
        }));
    })
}
function matkhaucongto(t) {
    var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_CAUHINH.GET_MATKHAUCONGTO" };
    var para = {
        v_tencongto: t
    };
    var lst = ExecuteServiceSyns(config, para);
    return lst.data[0].mk_cto;

}
function send_com(p) {
    console.log(p);
    var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_THONGTINDIEMDO.GET_THONGTINCONGTO" };
    var para = {
        v_imei: p.imei,
        v_port: p.port
    };
    var lst = ExecuteServiceSyns(config, para);
    console.log(lst);
    $(".loading_search").slideDown();
    $(".loading_text").html("Đang kiểm tra kết nối ...");
    var guilenh = function () {
        $(".loading_text").html("Kết nối thành công ! Bắt đầu gửi lệnh đọc ...");
    }
    setTimeout(guilenh, 3000);
    var kq = function () {
        $(".loading_text").html("Đọc thành công !");
        if (lst.result == "OK") {
            show_kq(lst.data);
        }
    }
    setTimeout(kq, 6000);
}
function show_kq(data) {
    var res = data;
    console.log(res);
    localStorage.setItem("diemdo", JSON.stringify(res[0]));
    if (res.length == 0) {
        $(".loading_search").slideUp();
        callLoad();
        $(".meter_info_tbl").hide();
        $(".act_btn").hide();
        $("#connect_bg_tk").hide();
        var conn = function () {
            stopLoad();
            $(".meter_info_tbl").slideUp();
            $(".act_btn").slideUp();
            $("#connect_bg_tk").show();
        }
        conn();
        //setTimeout(conn, 5000);
    } else {
        callLoad();
        getToado();

        $("#td_tenthietbi").html(res[0].tenthietbi);
        $("#td_imei").html(res[0].imei);
        $("#td_loaimodem").html(res[0].loaimodem);
        $("#td_vitri").html(res[0].vitri);
        $("#td_kinhdo").html(res[0].kinhdo);
        $("#td_vido").html(res[0].vido);

        $(".loading_search").slideUp();
        $(".meter_info_tbl").hide();
        $(".act_btn").hide();
        $("#connect_bg_tk").hide();
        var conn = function () {
            stopLoad();
            $(".meter_info_tbl").slideDown();
            $(".act_btn").slideDown();
            $("#connect_bg_tk").hide();
        }
        conn();
        //setTimeout(conn, 2000);
    }


}
function getToado() {
    console.log("Lấy tọa độ");
    var curentLat;
    var curentLong;
    var distance;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        curentLat = position.coords.latitude;
        curentLong = position.coords.longitude;
        var des = new google.maps.LatLng(curentLat, curentLong);
        var org = new google.maps.LatLng(JSON.parse(localStorage.getItem("diemdo")).vido, JSON.parse(localStorage.getItem("diemdo")).kinhdo);
        var directionsService = new google.maps.DirectionsService;

        distance = google.maps.geometry.spherical.computeDistanceBetween(org, des);
        //var request = {
        //    origin: org,
        //    destination: des,
        //    travelMode: google.maps.TravelMode.WALKING
        //};

        var rad = function (x) {
            return x * Math.PI / 180;
        };

        var getDistance = function (org, p2) {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(des.lat() - org.lat());
            var dLong = rad(des.lng() - org.lng());
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(org.lat())) * Math.cos(rad(des.lat())) *
              Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            distance = d; // returns the distance in meter
        };
        $(".toadohientai span").html('Vị trí hiện tại <i style="font-size:11px">(Click để lấy lại tọa độ)</i><br/>Kinh Độ:  <span class="text-orange text-bold">' + curentLong + '</span> Vĩ Độ:  <span class="text-orange text-bold">' + curentLat + '</span>');
        //$(".toadohientai span").html('Vị trí hiện tại cách tọa độ cũ <span class="text-orange text-bold">' + format_number_map(distance) + 'm </span><i style="font-size:11px">(Click để lấy lại tọa độ)</i><br/>Kinh Độ:  <span class="text-orange text-bold">' + curentLong + '</span> Vĩ Độ:  <span class="text-orange text-bold">' + curentLat + '</span>');
        //directionsService.route(request, function (response, status) {
        //    if (status == google.maps.DirectionsStatus.OK) {
        //        console.log(response.routes[0].legs[0].distance.text);
        //        distance = response.routes[0].legs[0].distance.text;
        //        $(".toadohientai span").html('Vị trí hiện tại cách tọa độ cũ ' + distance + ' <i>(Click để lấy lại tọa độ)</i><br/>Kinh Độ: ' + curentLong + ' Vĩ Độ: ' + curentLat);
        //        //directionsDisplay.setDirections(response);
        //    }
        //});
        localStorage.setItem("kinhdo", curentLong);
        localStorage.setItem("vido", curentLat);


        stopProcess("toadohientai");
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
        stopProcess("toadohientai");
    }

}

function showMap() {
    console.log("Vẽ lại");
    var height = $(window).height();
    var width = $(window).width();
    $("#map-canvas").css("height", height - 80);
    $("#map-canvas").css("width", width - 20);
    var curentLat;
    var curentLong;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
        curentLat = JSON.parse(localStorage.getItem("diemdo")).vido
        curentLong = JSON.parse(localStorage.getItem("diemdo")).kinhdo;
        myLatlng = new google.maps.LatLng(curentLat, curentLong);
        var mapOptions = {
            zoom: 16,
            center: myLatlng
        }
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        //var directionsService = new google.maps.DirectionsService;
        //var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
        marker2 = new google.maps.Marker({
            position: myLatlng,
            map: map,
            draggable: true
        });

        google.maps.event.addListener(marker2, 'dragend', function (marker2) {
            var latLng = marker2.latLng;
            currentLatitude = latLng.lat();
            currentLongitude = latLng.lng();
            alert(currentLatitude + ' , ' + currentLongitude);
        });


        //var request = {
        //    origin: myLatlng,
        //    destination: des,
        //    travelMode: google.maps.TravelMode.DRIVING
        //};
        //directionsService.route(request, function (response, status) {
        //    if (status == google.maps.DirectionsStatus.OK) {
        //        console.log(response.routes[0].legs[0].distance.text);
        //        showToast("Khoảng cách ước tính: " + response.routes[0].legs[0].distance.text, "note");
        //        //directionsDisplay.setDirections(response);
        //    }
        //});
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

}


function set_toado() {
    var kinhdo = localStorage.getItem("kinhdo");
    var vido = localStorage.getItem("vido");
    var imei = JSON.parse(localStorage.getItem("diemdo")).imei;
    var port = JSON.parse(localStorage.getItem("diemdo")).congserver;
    var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_THONGTINDIEMDO.SET_TOADO" };
    var para = {
        v_imei: imei,
        v_port: port,
        v_kinhdo: kinhdo,
        v_vido: vido
    };
    console.log(para);
    var lst = ExecuteServiceSyns(config, para);
    console.log(lst);

    if (lst.data[0].count == "OK") {
        showToast("Cập nhật thành công", "success");
        $("#td_kinhdo").html(kinhdo);
        $("#td_vido").html(vido);
    } else {
        showToast("Cập nhật thất bại", "error");
    }
}