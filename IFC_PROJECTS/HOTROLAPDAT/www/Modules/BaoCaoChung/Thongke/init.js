var ds_loi = [];
var loi_ifc = 0;
var loi_dienluc = 0;
var loi_nhamang = 0;
var daxuly = 0;
var define_ifc = ["Modem cháy nổ", "Modem hư hỏng", "Modem mất kết nối", "Đứt cáp nguồn", "Hư hỏng cáp dữ liệu", "Hết tiền"];
var define_dienluc = ["Cắt điện", "Lắp đặt chưa đúng quy cách", "Vị trí hướng Anten sai", "Sai loại công tơ", "Chưa mở Port"];
var define_nhamang = ["Sóng yếu", "Hỏng SIM"];
$(document).ready(function () {
    try {
        loadContent();
        var ds = JSON.parse(localStorage.getItem("ds"));
        thongkeloi(ds);
        //console.log(ds);
    } catch (e) {
        console.log(e);
    }

});
function thongkeloi(data) {
    $.each(data, function (key, val) {
        var chitietloi = val.chitietloi;
        if (val.trangthai != "DAXULY") {
            ds_loi.push(val.chitietloi);
        } else {
            daxuly++;
        }
    });
    ds_loi = ds_loi.toString().split(",");
    $.each(ds_loi, function (key, val) {
        if ($.inArray(val, define_ifc) != -1) {
            loi_ifc++;
        }
        if ($.inArray(val, define_dienluc) != -1) {
            loi_dienluc++;
        }
        if ($.inArray(val, define_nhamang) != -1) {
            loi_nhamang++;
        }
    })
    console.log(ds_loi);
    $("#soloi_ifc").html(loi_ifc);
    $("#soloi_dl").html(loi_dienluc)
    $("#soloi_nm").html(loi_nhamang);
    $("#soloi_kq").html(ds_loi.length - loi_ifc - loi_dienluc - loi_nhamang);
    $("#tyle_ifc").html(tinh_tyle(ds_loi.length, loi_ifc) + "%");
    $("#tyle_dl").html(tinh_tyle(ds_loi.length, loi_dienluc) + "%");
    $("#tyle_nm").html(tinh_tyle(ds_loi.length, loi_nhamang) + "%");
    $("#tyle_kq").html(tinh_tyle(ds_loi.length, ds_loi.length - loi_ifc - loi_dienluc - loi_nhamang) + "%");

    var tyle = JSON.stringify([{
        name: 'Lỗi do IFC',
        tyleloi: tinh_tyle(ds_loi.length, loi_ifc)
    }, {
        name: 'Lỗi do Điện lực',
        tyleloi: tinh_tyle(ds_loi.length, loi_dienluc)
    }, {
        name: 'Lỗi do Nhà mạng',
        tyleloi: tinh_tyle(ds_loi.length, loi_nhamang)
    }, {
        name: 'Lỗi Khách quan',
        tyleloi: tinh_tyle(ds_loi.length, ds_loi.length - loi_ifc - loi_dienluc - loi_nhamang)
    }]);
    localStorage.setItem("tyle", tyle);
}
function tinh_tyle(tong, n) {
    return parseFloat(eval(n / tong * 100)).toFixed(2);
}