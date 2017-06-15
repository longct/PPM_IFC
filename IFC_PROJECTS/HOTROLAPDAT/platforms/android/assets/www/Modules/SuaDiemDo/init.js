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
        console.log(JSON.parse(localStorage.getItem("diemdo")).imei);
        $("#suadiemdo_imei").html(JSON.parse(localStorage.getItem("diemdo")).imei);
        $("#suadiemdo_loaisim").html(JSON.parse(localStorage.getItem("diemdo")).loaisim);
        $("#suadiemdo_sosim").html(JSON.parse(localStorage.getItem("diemdo")).sosim);
        $("#suadiemdo_version").html(JSON.parse(localStorage.getItem("diemdo")).versionmodem);


        $("#btn_capnhatloi").click(function () {
            setLoidiemdo();
        })
    } catch (e) {
        console.log(e);

    }
});
function setLoidiemdo() {

    var device = JSON.parse(localStorage.getItem("SIM"));
    var chitietloi = $(".loidiemdo_ds td").text();
    console.log(chitietloi);
    var imei = JSON.parse(localStorage.getItem("diemdo")).imei;
    console.log(imei);
    var socongto = JSON.parse(localStorage.getItem("diemdo")).congserver;
    console.log(socongto);
    var sodienthoai = device.phoneNumber;
    console.log(sodienthoai);
    //var userid = JSON.parse(localStorage.getItem("diemdo")).congserver;
    var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_THONGTINDIEMDO.SUA_DIEMDO" };
    var para = {
        v_imei :imei,
        v_socongto :socongto,
        v_chitietloi :chitietloi,
        v_nguoigui : 1,
        v_sodienthoai: sodienthoai
    };
    console.log(para);
    var lst = ExecuteServiceSyns(config, para);
    console.log(lst);

    if (lst.data[0].count == "OK") {
        showToast("Cập nhật thành công", "success");

    } else {
        showToast("Cập nhật thất bại", "error");
    }
}