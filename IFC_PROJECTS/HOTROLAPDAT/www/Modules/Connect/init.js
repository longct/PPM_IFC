var socket = new Socket();
socket.onData = function (data) {
    console.log('DATA RECIVIED');
    console.log(data);
    var kq = bin2String(data);
    console.log(kq);
    if (kq == "CONNECT3") {

        var dataString = "@METERCHECK@8661040267202222@ELSTER@M_KH_DOC";
        var data = new Uint8Array(dataString.length);
        for (var i = 0; i < data.length; i++) {
            data[i] = dataString.charCodeAt(i);
        }
        socket.write(data);
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

$(document).ready(function () {
    try {
        loadContent();
        //$("#timkiemdiemdo").keypress(function (event) {
        //    if (event.which == 13) {
        //        show_kq($(this).val(), "DNPC");
        //    }
        //})
        var sheight = $(window).height();
        var swidth = $(window).width();
        $("#connect_bg").css("height", sheight - 80);
        $("#connect_bg").css("max-height", sheight - 100);
    } catch (e) {
        console.log(e);

    }
});

function checkConnect() {
    var count = 0;
    var conn = function () {
        console.log(count);
        //$(".conn_status").html("<p class='text-red'>Không đọc được dữ liệu !</p>");
        //$("#img_conn").attr("src", "img/signalx.png");
        $(".conn_status").html("<p class='text-green'>Đọc thành công !</p>");
        $("#img_conn").attr("src", "img/signalv.png");
        $("#data_conn").slideDown();
        $("#btn_conn").slideDown();
    };
    if (count == 0) {
        $(".conn_status").html("<p class='text-blue'>Đang gửi lệnh đọc ...</p>");
        $("#img_conn").attr("src", "img/signal.gif");
        $("#data_conn").slideUp();
        $("#btn_conn").slideUp();
        count++;
        setTimeout(conn, 5000);
    }
    else if (count == 1) {
        setTimeout(conn, 5000);

    }
}


function tcp() {
    socket.open("14.177.66.131", 2005,
        //socket.open("101.99.51.75", 5213,
        function () {
            console.log("Socket is opened");
        },
        function (errorMessage) {
            console.log("Socket is close");
        });
    
}

function send2com() {
    if (socket.state == Socket.State.OPENED) {
        console.log("Socket is opened");
        var dataString = "#0000000000000009+CSQ:IFCMASTER#";
        var data = new Uint8Array(dataString.length);
        for (var i = 0; i < data.length; i++) {
            data[i] = dataString.charCodeAt(i);
        }
        socket.write(data);
    }
}

function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}