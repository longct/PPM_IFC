var check = 0;
var count = 0;
var timer1;
var timer_send_cmd;
var timer_run;
var count_send_cmd = 0;
var check_send_cmd = 0;
var count_run = 0;
$(document).ready(function () {
    try {
        loadContent();
        var sheight = $(window).height();
        var swidth = $(window).width();
        loadLoaicongto();
        getToado();
        $(".meter_info_tbl").css("max-height", sheight - 230);

        $("#search_field").keypress(function (event) {
            if (event.which == 13) {
                if ($("#timkiemdiemdo").val() == null || $("#timkiemdiemdo").val() == "" || $("#timkiemdiemdo").val().length < 16) {
                    showToast("Vui lòng nhập chính xác imei", "error");
                    return;
                }
                $('#read_ressult').hide();
                count_run = 0;
                timer_run = setInterval(function () {
                    count_run++
                    //$('#time_tick').html(count_run);
                    //console.log(count_run);
                }, 1000);
                timer_clear();
                timer_stop();
                timer_timer();
                reset_img();
                //show_kq($(this).val(), "DNPC");
                count_send_cmd = 0;
                check_send_cmd = 0;
                count = 0;
                check = 0;
                clearInterval(timer1);
                clearInterval(timer_send_cmd);
                console.log(JSON.parse(localStorage.getItem("userinfo")));
                //var port_ = JSON.parse(localStorage.getItem("userinfo")).port;
                //var server_ = getIP(port_);
                var type_ct = $("#cb_loaict option:selected").val();
                var pass_ = "";
                if (type_ct != 0) {
                    pass_ = matkhaucongto(type_ct);
                }
                var imei = $("#timkiemdiemdo").val();
                console.log(pass_);
                if ($("#matkhaucto").val() != "") {
                    console.log($("#matkhaucto").val());
                    pass_ = $("#matkhaucto").val();
                }
                var param = { type: type_ct, mkct: pass_, imei: imei }
                send_com(param);
                $(".content-wrapper").click();
            }
            else {
                return /\d/.test(String.fromCharCode(event.keyCode));
            }
        })
        $("#connect_click").click(function () {
            var user = JSON.parse(localStorage.getItem("userinfo"));
            if (user.conn_name_2 == "null" || user.conn_name_2 == null || user.conn_name_2 == undefined || user.conn_name_2 == "") {
                showUpdate_info();
            }
            else {
                $("#connect_click img").attr("src", "img/loading2.gif?" + new Date().getTime());
                $("#connect_click img").css("width", "64px");
                setTimeout(function () {
                    capnhatthongtin();
                }, 2000);
            }
        })
        $("#edit_click").click(function () {
            setthongtin_edit();
        })
        $("#map_click").click(function () {
            showMap();
        })

        $("#btn_OK").click(function () {
            $("#tr_step2").hide();
            $('#read_ressult').hide();
            count_run = 0;
            timer_run = setInterval(function () {
                count_run++
                //$('#time_tick').html(count_run);
                //console.log(count_run);
            }, 1000);
            timer_clear();
            timer_stop();
            timer_timer();
            reset_img();
            //show_kq($(this).val(), "DNPC");
            count_send_cmd = 0;
            check_send_cmd = 0;
            count = 0;
            check = 0;
            clearInterval(timer1);
            clearInterval(timer_send_cmd);
            console.log(JSON.parse(localStorage.getItem("userinfo")));
            //var port_ = JSON.parse(localStorage.getItem("userinfo")).port;
            //var server_ = getIP(port_);
            var type_ct = $("#cb_loaict option:selected").val();
            var pass_ = "";
            if (type_ct != 0) {
                pass_ = matkhaucongto(type_ct);
            }
            var imei = $("#timkiemdiemdo").val();
            console.log(pass_);
            if ($("#matkhaucto").val() != "") {
                console.log($("#matkhaucto").val());
                pass_ = $("#matkhaucto").val();
            }
            var param = { type: type_ct, mkct: pass_, imei: imei }
            send_com(param);
            $(".content-wrapper").click();
        })

        $(".toadohientai").click(function () {
            //callProcess("toadohientai");
            getToado();
        })
        $("#capnhattoado_btn").click(function () {
            $("#capnhattoado_btn img").attr("src", "img/loading2.gif?" + new Date().getTime());
            $("#capnhattoado_btn img").css("width", "64px");
            setTimeout(function () {
                set_toado();
            }, 2000);
        })
        $("#ck_mkct").change(function () {
            if (!$(this).is(":checked")) {
                //$("#matkhaucto").slideDown();
                $("#div_matkhau").slideDown();
            } else {
                //$("#matkhaucto").slideUp();
                $("#div_matkhau").slideUp();
            }
        })
    } catch (e) {
        console.log(e);

    }
});
function getIP(port) {
    var config = { connstr: "ConnectSql_IFCSmart", namesql: "[dbo].[GetInfoIpPort]" };
    var para = {
        PORT: port
    };
    //console.log(para);
    var lst = ExecuteSQL(config, para);
    //console.log(lst);

    return lst.data[0].ip;

}
function showUpdate_info() {
    $("#capnhat_thongtin").modal("show");
}

function reset_img() {
    $('#tr_step1').hide();
    $('#tr_step2').hide();
    $('#tr_step3').hide();
    $('.loading2 ').attr("src", "img/loading2.gif");
    $('#tr_step1 .step_label').html('Kiểm tra kết nối với hệ thống');
    $('#tr_step2 .step_label').html('Kiểm tra trạng thái kết nối của modem');
    $('#tr_step3 .step_label').html('Hệ thống đang đọc dữ liệu, vui lòng đợi 2-5 phút');
    $('#read_ressult').hide();
    $('#step1').css("opacity", "1");
    $('#step2').css("opacity", "1");
    $('#step3').css("opacity", "1");
}

function loadLoaicongto() { // Mất cái DB nên fix trong code loại công tơ luôn, sau sửa lại trên MCF
    //var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_CAUHINH.GET_LOAICONGTO" }; // dùng chung lấy thông tin danh sách công tơ...
    //var para = {};
    //var lst = ExecuteServiceSyns(config, para);
    //console.log(lst);
    //var congto = lst.data;
    //$('#cb_loaict').empty();
    //$('#cb_loaict').append($('<option>', {
    //    value: "0",
    //    text: "Tất cả",
    //}));
    //$.each(congto, function (key, val) {
    //    $('#cb_loaict').append($('<option>', {
    //        value: val.ten_cto,
    //        text: val.ten_cto,
    //    }));
    //})
}
function matkhaucongto(t) { // Mất cái DB nên fix trong code loại công tơ luôn, sau sửa lại trên MCF
    //var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_CAUHINH.GET_MATKHAUCONGTO" }; // dùng chung lấy thông tin danh sách công tơ...
    //var para = {
    //    v_tencongto: t
    //};
    //var lst = ExecuteServiceSyns(config, para);
    //return lst.data[0].mk_cto;
    var mkct = "";
    switch (t) {
        case "ELSTER":
            mkct = "M_KH_DOC";
            break;
        case "LANDIS":
            mkct = "M_KH_DOC";
            break;
        case "GENIUS":
            mkct = "NOTHING";
            break;
        case "STAR-DTS27":
            mkct = "NOTHING";
            break;
        case "GELEX-M4":
            mkct = "111111";
            break;
        case "GELEX-11MGS":
            mkct = "NOTHING";
            break;
        case "DEC_PSMART_3PHASE":
            mkct = "00000001";
            break;
    }
    return mkct;

}
function send_com(p) {
    try {
        //$("#process_status").slideDown();
        //$(".loading_search").slideDown();
        // $(".loading_text").html("Đang kiểm tra kết nối ...");
        console.log(p);
        var user = JSON.parse(localStorage.getItem("userinfo"));
        //var config = { connstr: "Oracle_DongNai", namesql: "PKG_HOTRO.GET_THONGTINCONGTO" };
        //var config = { connstr: "ConnectSql_HTLD", namesql: "HTLD_GET_THONGTINCONGTO" };
        var name_sql = "HT_THONGTINDIEMDO.GET_THONGTINCONGTO";
        if (user.db_type == "sql") {
            name_sql = "HTLD_GET_THONGTINCONGTO"
        };
        var config = { connstr: user.conn_name, namesql: name_sql }; // Lấy thông tin công tơ DB SQL
        var para = {
            v_imei: p.imei
        };
        var lst = ExecuteService(config, para);
        console.log(lst);
        if (lst.data.length == 0) {
            //try call tcp
            $(".loading_search").slideUp();
            callLoad();
            $(".meter_info_tbl").hide();
            $(".act_btn").hide();
            $("#connect_bg_tk").hide();
            var conn = function () {
                stopLoad();
                $(".meter_info_tbl").slideUp();
                $(".act_btn").slideUp();
                //$("#connect_bg_tk").show();
                $('.loading2').attr("src", "img/fail.png");
                $('#step1').html("Modem chưa kết nối với server, vui lòng kiểm tra thiết bị giao tiếp với modem");
                $('#tr_step1').show();
                clearInterval(timer_run);
                timer_stop();
            }
            conn();
            if ($("#ck_mkct").is(":checked"))
                $("#ck_mkct").click();
            alert("Vui lòng chọn Loại công tơ, Mật khẩu để kết nối lại");
            return;
        } else {
            $('#step1').html("Modem đã kết nối tới server");
            $('#step1').css("opacity", "0.5");
            $('#tr_step1').show();
            //$('#tr_step2').show();
            $('#step1_icon').attr("src", "img/checked.png");
            var meterid = lst.data[0].id;
            var port = parseInt(lst.data[0].congserver);
            var server_ = getIP(port);
            console.log(lst.data[0]);
            show_kq(lst.data[0]);
            if (p.type == 0) {
                p.type = lst.data[0].loaicongto;
                p.mkct = matkhaucongto(p.type);
            }
            //if (lst.data[0].socongto == "NOTHING") {
            //    alert("Vui lòng chọn Loại Công tơ và Mật khẩu để kết nối lại.");
            //    if ($("#ck_mkct").is(":checked"))
            //        $("#ck_mkct").click();
            //    return;
            //} else {
            //    //sendCom(p, port, meterid);
            //}
            sendCom(p, port, meterid);

        }
        console.log(lst);
    }
    catch (e) {
        console.log(e.message)
    }
}
function randomInt(min, max) {//

    return Math.floor(Math.random() * (max - min + 1) + min);
}
function sendCom(p, port, meterid) {
    $("#connect_bg_tk").hide();
    //var d_id = JSON.parse(localStorage.getItem("DEVICE")).uuid;
    var d_id = randomInt(0, 9999999999999999) + "";
    var ip = getIP(port);
    console.log(ip + "---" + port + "---" + meterid);
    //$("#td_ipport").html(ip + ": " + port);
    //var ip = "101.99.27.28";
    console.log(p);
    var socket = new Socket();
    console.log(port);
    socket.open(ip, port,
        //socket.open("101.99.51.75", 5213,
        function () {
            console.log("Socket is opened");
            var dataString = "#" + d_id + "+CSQ:IFCMASTER#";
            console.log(dataString);
            var data = new Uint8Array(dataString.length);
            for (var i = 0; i < data.length; i++) {
                data[i] = dataString.charCodeAt(i);
            }
            socket.write(data);
        },
        function (errorMessage) {
            console.log("Socket is close");
        });
    socket.onData = function (data) {
        console.log('DATA RECIVIED');
        console.log(data);
        var kq = bin2String(data);
        console.log(kq);
        callProcess("tbl_data");
        if (kq == "CONNECT3") {
            $(".loading_text").html("Kết nối thành công, bắt đầu đọc ... ");
            var dataString = "@METERCHECK@" + p.imei + "@" + p.type + "@" + p.mkct;
            //var dataString = "@METERCHECK@3531960422813020@ELSTER@M_KH_DOC";
            console.log(dataString);
            var data = new Uint8Array(dataString.length);
            for (var i = 0; i < data.length; i++) {
                data[i] = dataString.charCodeAt(i);
            }
            socket.write(data);

            // sau khi gửi lênh lên com, chạy timmer xem có gửi được kg
            timer_send_cmd = setInterval(function () {
                count_send_cmd++; // 
                if (check_send_cmd != 1) {
                    // nếu chưa ok thì check tiếp
                    sent_cmd();
                }
                else {
                    // nếu gửi được thì hủy timer
                    check_send_cmd = 0;
                    clearInterval(timer_send_cmd);
                }
            }, 1000);
        }
        else if (kq == "@METERCHECK:READY") {
            check_send_cmd = 1;
            $('#step2_icon').attr("src", "img/checked.png");
            $('#step2').html('Công tơ đang online');
            $('#step2').css("opacity", "0.5");
            $('#tr_step2').show();
            $('#tr_step3').show();
            // comserver đã nhận lệnh --> quét bảng tsvh và ngồi đợi được thì thôi
            var currentdate = new Date();
            // ORACLE
            //var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1)
            //               + "/" + currentdate.getFullYear() + " "
            //               + currentdate.getHours() + ":"
            //               + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            // SQL

            var datetime = currentdate.getFullYear() +
                           "-" + (currentdate.getMonth() + 1) +
                           "-" + currentdate.getDate() +
                           " " + currentdate.getHours() +
                           ":" + currentdate.getMinutes() +
                           ":" + currentdate.getSeconds();
            console.log('llllllllllllllllllll');
            console.log(datetime);
            $(".loading_text").html("Đã gửi lệnh đọc, vui lòng chờ ...");
            //SELECT TSVH >>>  SCT >>> Chưa khai báo >>>>
            timer1 = setInterval(function () {
                get_TSVH(p.imei, datetime)
            }, 30000);
        }
        else if (kq == "@METERCHECK:READING") {
            check_send_cmd = 1;
            //$(".loading_text").html("Công tơ đang được đọc, vui lòng thử lại sau");
            $('#step2_icon').attr("src", "img/fail.png");
            $('#step2').html('Modem đang bận, vui lòng thử lại sau ít phút');
            $('#tr_step2').show();
            //$('#step3_icon').attr("src", "img/fail.png");
            //$('#step3').html('Không đọc được dữ liệu ');
            //$('#tr_step3').show();
        }
        else if (kq == "@METERCHECK:ERROR01") {
            check_send_cmd = 1;
            //$(".loading_text").html("Công tơ đang được đọc, vui lòng thử lại sau");
            $('#step2_icon').attr("src", "img/fail.png");
            $('#step2').html('Modem này chưa online hoặc sai IMEI');
            $('#tr_step2').show();
            //$('#step3_icon').attr("src", "img/fail.png");
            //$('#step3').html('Không đọc được dữ liệu ');
            //$('#tr_step3').show();
        }
        else if (kq == "@METERCHECK:ERROR02") {
            check_send_cmd = 1;
            //$(".loading_text").html("Công tơ đang được đọc, vui lòng thử lại sau");
            $('#step2_icon').attr("src", "img/fail.png");
            $('#step2').html('Comserver đang bận, vui lòng thử lại sau ít phút');
            $('#tr_step2').show();
            //$('#step3_icon').attr("src", "img/fail.png");
            //$('#step3').html('Không đọc được dữ liệu ');
            //$('#tr_step3').show();
        }

    };
    socket.onError = function (errorMessage) {
        console.log('erros');
        console.log(errorMessage);
    };
    socket.onClose = function (hasError) {
        console.log('hasError');
        console.log(hasError);
    };

}


function sent_cmd() {
    if (count_send_cmd > 60) { // nếu quá 60s mà kg nhận được gì từ com thì báo là thất bại
        console.log("Clear timer: count_send_cmd > 12")
        clearInterval(timer_send_cmd);
        clearInterval(timer_run);
        timer_stop();
        count_send_cmd = 0;
        $('#step2_icon').attr("src", "img/fail.png");
        $('#step2').html('Modem không online hoặc sai mật khẩu, vui lòng kiểm tra và thử lại');
        $('#tr_step2').show();
    }
}
function get_TSVH(i, time) {
    console.log("Đọc công tơ - count: " + count);
    if (check == 0 && count < 9) {
        // nếu chưa hết time out (6p)
        var imei = i;
        var user = JSON.parse(localStorage.getItem("userinfo"));
        //var config = { connstr: "ConnectSql_HTLD", namesql: "HTLD_CHECK_TSVH" };
        var name_sql = "HT_THONGTINDIEMDO.GET_TSVH";
        if (user.db_type == "sql") {
            name_sql = "HTLD_CHECK_TSVH"
        };
        var config = { connstr: user.conn_name, namesql: name_sql };
        var para = {
            v_imei: imei,
            v_time: time
        };
        console.log(para);
        count++;
        var lst = ExecuteService(config, para);
        if (lst.data != undefined && lst.data != null && lst.data.length != 0) {
            check = 1;
            $('#read_ressult').show();
            show_kq_doc(lst.data[0]);
            $('#step3_icon').attr("src", "img/checked.png");
            $('#step3').html('Đọc thành công ');
            $('#tr_step1').hide();
            $('#tr_step2').hide();
            $('#tr_step3').show();
        }
    } else if (check == 1) {
        console.log("Clear timer: check == 1")
        clearInterval(timer_send_cmd);
        clearInterval(timer1);
        clearInterval(timer_run);
        timer_stop();
        count = 0;
        stopProcess("tbl_data");
    } else if (count >= 9) {
        $('#step3_icon').attr("src", "img/fail.png");
        $('#step3').html('Không đọc được dữ liệu, vui lòng kiểm tra lại ');
        $('#tr_step3').show();
        console.log("Clear timer: count > 12")
        clearInterval(timer1);
        clearInterval(timer_run);
        timer_stop();
        stopProcess("tbl_data");
    }
}
function show_kq(data) {
    var res = data;
    console.log(res);
    localStorage.setItem("diemdo", JSON.stringify(res));

    callLoad();
    getToado();
    console.log(res);

    $("#td_tenthietbi").html(res.tendiemdo);
    $("#td_imei").html(res.makhachhang);
    $("#td_loaimodem").html(res.socongto);
    localStorage.setItem("socongto", res.socongto);
    $("#td_vitri").html(res.kinhdo + " , " + res.vido);
    //$("#td_kinhdo").html(res[0].kinhdo);
    //$("#td_vido").html(res[0].vido);


    $("#cntt_socongto").val(res.socongto);
    $("#cntt_imei").val(res.imei);
    $("#cntt_tendiemdo").val(res.tendiemdo);
    $("#cntt_makhachhang").val(res.makhachhang);

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
    // INSERT MODEM INFO
    //setTimeout(conn, 2000);
}
function show_kq_doc(data) {
    clearInterval(timer_run);
    timer_stop();
    $('#read_ressult').show();
    var res = data;
    console.log(res);
    $.each(data, function (i, item) {
        $("#ua").html(res.ua);
        $("#ub").html(res.ub);
        $("#uc").html(res.uc);

        $("#ia").html(res.ia);
        $("#ib").html(res.ib);
        $("#ic").html(res.ic);

        $("#cosa").html(res.cosa);
        $("#cosb").html(res.cosb);
        $("#cosc").html(res.cosc);

        $("#pa").html(res.pa);
        $("#pb").html(res.pb);
        $("#pc").html(res.pc);
    });


    stopProcess("tbl_data");
    $(".loading_search").slideUp();
    $(".meter_info_tbl").hide();
    $(".act_btn").hide();
    $("#connect_bg_tk").hide();
    var conn = function () {
        $(".meter_info_tbl").slideDown();
        $(".act_btn").slideDown();
        $("#connect_bg_tk").hide();
    }
    conn();
    //localStorage.setItem("diemdo", JSON.stringify(res));
    // INSERT MODEM INFO
    //setTimeout(conn, 2000);
}
function getToado() {
    console.log("Lấy tọa độ");
    $(".process_img").remove();
    $(".toadohientai").append('<div class="process_img"></div>');
    $(".process_img").css("width", $(".toadohientai").width());
    $(".process_img").css("margin-top", -($(".toadohientai").height()));
    $(".process_img").css("height", 40);
    var curentLat;
    var curentLong;
    var distance;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        curentLat = position.coords.latitude;
        curentLong = position.coords.longitude;
        //var des = new google.maps.LatLng(curentLat, curentLong);
        //var org = new google.maps.LatLng(JSON.parse(localStorage.getItem("diemdo")).vido, JSON.parse(localStorage.getItem("diemdo")).kinhdo);
        //var directionsService = new google.maps.DirectionsService;

        //distance = google.maps.geometry.spherical.computeDistanceBetween(org, des);
        ////var request = {
        ////    origin: org,
        ////    destination: des,
        ////    travelMode: google.maps.TravelMode.WALKING
        ////};

        //var rad = function (x) {
        //    return x * Math.PI / 180;
        //};

        //var getDistance = function (org, p2) {
        //    var R = 6378137; // Earth’s mean radius in meter
        //    var dLat = rad(des.lat() - org.lat());
        //    var dLong = rad(des.lng() - org.lng());
        //    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        //      Math.cos(rad(org.lat())) * Math.cos(rad(des.lat())) *
        //      Math.sin(dLong / 2) * Math.sin(dLong / 2);
        //    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //    var d = R * c;
        //    distance = d; // returns the distance in meter
        //};

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


        //stopProcess("toadohientai");
        $(".process_img").fadeOut();
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

    };

    // onError Callback receives a PositionError object
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
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var name_sql = "HT_THONGTINDIEMDO.SET_TOADO";
    if (user.db_type == "sql") {
        name_sql = "HTLD_SET_TOADO"
    };
    var config = { connstr: user.conn_name, namesql: name_sql };
    var para = {
        v_imei: imei,
        v_kinhdo: kinhdo,
        v_vido: vido
    };
    console.log(para);
    console.log(config)
    //var lst = ExecuteServiceSyns(config, para);
    var lst = ExecuteService(config, para)
    console.clear();
    console.log(para);
    console.log(lst);

    if (lst.data[0].count == "OK") {
        showToast("Cập nhật thành công", "success");
        $("#td_vitri").html(kinhdo + " , " + vido);
        $("#capnhattoado_btn img").attr("src", "img/capnhattoado.png");
    } else {
        $("#capnhattoado_btn img").attr("src", "img/capnhattoado.png");
        showToast("Cập nhật thất bại", "error");
    }
}

function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}

function capnhatthongtin() {
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var imei = JSON.parse(localStorage.getItem("diemdo")).imei;
    var mkh = $("#td_imei").text();
    var socongto = $("#td_loaimodem").text();
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var config = { connstr: user.conn_name_3, namesql: "PKG_JOB.GET_THONGTINCONGTO" };
    //var config = { connstr: "Oracle_DongNaiDB", namesql: "PKG_JOB.GET_THONGTINCONGTO" };
    var para = {
        v_socongto: socongto,
        v_mkh: mkh
    };
    console.log(para);
    var lst = ExecuteServiceSyns(config, para);
    console.log(lst.data);
    //show_kq(lst.data[0]);
    updateDongbo(lst.data);
}
function updateDongbo(data) {
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var config = { connstr: user.conn_name_2, namesql: "PKG_HOTRO.UPDATE_THONGTIN" };
    //var config = { connstr: "Oracle_DongNai", namesql: "PKG_HOTRO.UPDATE_THONGTIN" };
    var para = {
        v_tendiemdo: data[0].tendiemdo,
        v_diachi: data[0].dckh,
        v_matram: data[0].matram,
        v_soghi: data[0].soghi,
        v_socongto: data[0].socongto,
    };
    console.log(para);
    var lst = ExecuteServiceSyns(config, para);
    console.log(lst);

    if (lst.data[0].count == "OK") {
        $("#connect_click img").attr("src", "img/connect.png");
        showToast("Cập nhật thành công", "success");
        //$("#td_vitri").html(kinhdo + " , " + vido);
    } else {
        $("#connect_click img").attr("src", "img/connect.png");
        showToast("Cập nhật thất bại", "error");
    }

}


