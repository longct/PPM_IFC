$(document).ready(function () {
    $("#curentPage").html("Danh sách hóa đơn");

    initformelement();
    var width = $(window).width();
    var height = $(window).height();
    //$(".content-wrapper").css("min-height", height - 81);
    var height = $(window).height();
    $(".content-wrapper").css("overflow", "hidden");
    drawTable();
    createColumsFilter_danhsachsoghi();


});


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    hideColumn(["tenso", "khuvuc", "ghichu"]);
}

function createColumsFilter_danhsachsoghi() {
    var li = "<li id='mahoadon' class='hien'>Mã</li>" +
         "<li id='makhachhang' class='hien'>Mã KH</li>" +
         "<li id='tenkh' class='hien'>Tên KH</li>" +
         "<li id='sohopdong' class='hien'>Hợp đồng</li>" +
         "<li id='loaikh' class='hien'>Loại KH</li>" +
         "<li id='diachi' class='hien'>Địa chỉ</li>";
    $("ul.filter_column").empty();
    $("ul.filter_column").append(li);
    $("#curentPage").html("Danh sách sổ ghi");

    $("ul.filter_column li").click(function () {
        var td_id = $(this)[0].id;
        if ($(this).hasClass("hien")) {
            $(this).removeClass("hien");
            $(this).addClass("an");
            $("." + td_id).addClass("hide");
        }
        else {
            $(this).removeClass("an");
            $(this).addClass("hien");
            $("." + td_id).removeClass("hide");
        }
    });
}
function hideColumn(columns) {
    for (var i = 0; i < columns.length ; i++) {
        $("ul.filter_column li#" + columns[i]).removeClass("hien");
        $("ul.filter_column li#" + columns[i]).addClass("an");
        $("." + columns[i]).addClass("hide");
    }
}
function drawTable() {
    var tr2 = "";
    for (var i = 0; i < 10; i++) {
        tr2 += "<tr><td class='mahoadon'> Mã Hóa đơn " + i + "</td>" +
            "<td class='makhachhang'> Mã khách hàng " + i + "</td>" +
            "<td class='tenkh'>Tên khách hàng " + i + "</td>" +
            "<td class='sohopdong'>Số hợp đồng " + i + "</td>" +
            "<td class='loaikh'>Loại Khách hàng " + i + "</td>" +
            "<td class='diachi'>Địa chỉ" + i + "</td>" +
            "</tr>";
    }
    $("tbody#soghi_details").empty();
    $("tbody#soghi_details").append(tr2);
}
