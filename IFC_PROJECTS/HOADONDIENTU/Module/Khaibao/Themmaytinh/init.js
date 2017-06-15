$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();

        $("#btn_them_kbmt").click(function () {
            var check = check_kbmt();
            if (check != "") {
                messInfo("messinfo_kbmt", check, 'error')
                return;
            }
         
            f_confimYesNo("Chắc chắn muốn thêm thông tin máy tính", "Bỏ qua", "Xác nhận", function () {
                capnhat_khmt();
            });
        });
        $("#bt_thoat_mtinh").click(function () {
            clear_kbmt();
        });

    } catch (e) {
        console.log(e);
    }
});

function capnhat_khmt() {
    try {
    
        var check = $("#txt_hieuluc").is(':checked') ? 1 : 0;

        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.THEMMOIMAYTINH", callback: "result_capnhat_khmt" };
        var para = {
            v_TENMAYTINH: p.txt_ten_kbmt,
            v_MAHIEU: p.txt_mahieu_kbmt,
            v_HEDIEUHANH: p.txt_hedh_kbmt,
            v_VIXULY: p.txt_vixly_kbmt,
            v_RAM: p.txt_ram_kbmt,
            v_GHICHU: p.txt_ghichu_kbmt,
            v_NGAY: '',
            v_SANXUAT: p.txt_sanxuat_kbmt,
            v_HIEULUC: check,
            v_USERID:userinfo.userid
    };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhat_khmt(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kbmt", row, 'ok');
            setTimeout(function () { loadthongtinh(1); clear_kbmt(); }, 500);
        } else {
            messInfo("messinfo_kbmt", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function check_kbmt() {
    try {
        var p = getAllIdMod();
        if (p.txt_ten_kbmt == "") return "Tên máy in không được bỏ trống";
        if (p.txt_mahieu_kbmt == "") return "Mã hiệu không được bỏ trống";
        if (p.txt_hedh_kbmt == "") return " Hệ điều hành máy tính không được bỏ trống "
        if (p.txt_vixly_kbmt == "") return "Vi xử lý không được bỏ trống";
        if (p.txt_ram_kbmt == "") return "Ram máy không được bỏ trống";
    
        return "";
    } catch (e) {
        console.log(e);
    }
}
function clear_kbmt() {
    try{
        $("#txt_ten_kbmt").val('');
        $("#txt_mahieu_kbmt").val('');
        $("#txt_hedh_kbmt").val('');
        $("#txt_vixly_kbmt").val('');
        $("#txt_ram_kbmt").val('');
        $("#txt_sanxuat_kbmt").val('');
        $("#txt_ghichu_kbmt").val('');
        $("#txt_hieuluc").prop("checked", false);
    } catch (e) {
        console.log(e);
    }

}