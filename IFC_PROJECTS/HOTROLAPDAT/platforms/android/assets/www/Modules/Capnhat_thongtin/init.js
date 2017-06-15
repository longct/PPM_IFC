$(document).ready(function () {
    try {
        loadContent();
        $('#btn_capnhat_thongtin').click(function () {
            f_capnhat_thongtin();
        });
    } catch (e) {
        console.log(e);
    }
});

function f_capnhat_thongtin() {
    var sct = $("#cntt_socongto").val();
    var imei = $("#cntt_imei").val();
    var tenkh = $("#cntt_tendiemdo").val();
    var makh = $("#cntt_makhachhang").val();
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var config = { connstr: user.conn_name, namesql: "HTLD_UPDATE_THONGTINCONGTO" }; // Lấy thông tin công tơ DB SQL
    var para = {
        v_imei: imei,
        v_sct: sct,
        v_makh: makh,
        v_tenkh: tenkh
    };
    console.log(para);
    var lst = ExecuteSQL(config, para);
    if (lst.data[0].ketqua == "OK") {
        showToast("Cập nhật thành công", "success");
        var config = { connstr: user.conn_name, namesql: "HTLD_GET_THONGTINCONGTO" }; // Lấy thông tin công tơ DB SQL
        var para = {
            v_imei: imei
        };
        var lst = ExecuteSQL(config, para);
        $("#td_tenthietbi").html(lst.data[0].tendiemdo);
        $("#td_imei").html(lst.data[0].makhachhang);
    } else {
        showToast("Cập nhật thất bại", "error");
    }
}
