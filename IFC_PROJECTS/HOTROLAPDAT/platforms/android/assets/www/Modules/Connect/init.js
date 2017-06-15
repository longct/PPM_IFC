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