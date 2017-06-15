$(document).ready(function () {
    try {
        loadContent();
        var sheight = $(window).height();
        var swidth = $(window).width();
        $(".loidd").css("height", sheight - 80);
        $(".loidd").css("max-height", sheight - 150);
        $(".loidd").css("overflow", "auto");
        $(".loidiemdo_txt").click(function () {
            $("#ds_loidiemdo").modal("show");
        })
        $("#btn_capnhatloi").click(function () {
            setLoidiemdo();
        })
    } catch (e) {
        console.log(e);

    }
});
function setthongtin_edit() {
    console.log(JSON.parse(localStorage.getItem("diemdo")).imei);
    $("#suadiemdo_imei").html(JSON.parse(localStorage.getItem("diemdo")).imei);
    $("#suadiemdo_loaisim").html(JSON.parse(localStorage.getItem("diemdo")).loaisim);
    $("#suadiemdo_sosim").html(JSON.parse(localStorage.getItem("diemdo")).sosim);
    $("#suadiemdo_version").html(JSON.parse(localStorage.getItem("diemdo")).versionmodem);
}
function setLoidiemdo() {

    var device = JSON.parse(localStorage.getItem("SIM"));
    var chitietloi = $(".loidiemdo_ds td").text();
    var imei = JSON.parse(localStorage.getItem("diemdo")).imei;
    var socongto = localStorage.getItem("socongto");
    var sodienthoai = 0;-- device.phoneNumber;
    var user = JSON.parse(localStorage.getItem("userinfo"));
    //var userid = JSON.parse(localStorage.getItem("diemdo")).congserver;
    var name_sql = "HT_THONGTINDIEMDO.SUA_DIEMDO";
    if (user.db_type == "sql") {
        name_sql = "HTLD_SUA_DIEMDO"
    }
    var config = { connstr: user.conn_name, namesql: name_sql };
    var para = {
        v_imei :imei,
        v_socongto :socongto,
        v_chitietloi :chitietloi,
        v_nguoigui: user.tendangnhap,
        v_sodienthoai: sodienthoai
    };
    console.log(para);
    if (chitietloi == "" || chitietloi == null) {
        showToast("Vui lòng chọn loại lỗi", "error");
        return;
    }
    console.log(config);
    console.log(para);
    var lst = ExecuteSQL(config, para);
    console.log(lst);

    if (lst.data[0].count == "OK") {
        showToast("Cập nhật thành công", "success");
    } else {
        showToast("Cập nhật thất bại", "error");
    }
}