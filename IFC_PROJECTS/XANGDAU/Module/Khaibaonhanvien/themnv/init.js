
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadnv_themlsttram();
        loadnv_themcapbac();

        $("#btn_tma").click(function () {
            var check = checkvailidate_tma();
            if (check != "") {
                messInfo("messinfo_themma", check, "error");

                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn thêm", "Bỏ qua", "Xác nhận", function () {
                themmanv();
            });
        });

    } catch (e) {
        console.log(e);
    }

});

function checkvailidate_tma() {
    try {
        var p = getAllIdMod();
        if (p.txt_tennv_tma == "") return "Tên nhân viên không được trống";
        if (p.txt_tennv_tma.length > 100) return "Tên nhân viên không được quá 100 ký tự";
        if ($.isNumeric(p.txt_sodienthoai_tma) == false) return "Số điện thoại phải là số";
        if (p.txt_diachi_tma.length > 250) return "Địa chỉ không được quá 250 ký tự";
        if (IsEmail(p.txt_email_tma) == false) return "Tên email của bạn không đúng định dạng";
        if (p.cb_capbac_tma == "-1" || p.cb_capbac_tma == "") return "Vui lòng chọn cấp bạc";
        if (p.cb_trams_tma == '-1' || p.cb_trams_tma == "") return " Vui lòng chọn trạm"

        return "";

    } catch (e) {
        console.log(e);
    }
}
function loadnv_themlsttram() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTTRAM", callback: "f_result_loadnv_themlsttram", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnv_themlsttram(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_trams_tma", data, "id", "name", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}
function loadnv_themcapbac() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LST_CAPBAC", callback: "f_result_loadnv_themcapbac", connstr: "ConnOracleXangDau" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnv_themcapbac(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_capbac_tma", data, "id", "name", "-1", "Chọn cấp bậc");
    } catch (e) {
        console.log(e);
    }
}
// cap nhật cột
function themmanv() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_KHAIBAONHANVIEN.THEMNHANVIEN", callback: "f_result_themmanv", connstr: "ConnOracleXangDau" };
        var para = {
            v_TENNHANVIEN: p.txt_tennv_tma,
            v_MATRAM: p.cb_trams_tma,
            v_SODIENTHOAI: p.txt_sodienthoai_tma,
            v_EMAIL: p.txt_email_tma,
            v_CAPBAC: p.cb_capbac_tma,
            v_DIACHI: p.txt_diachi_tma,
            v_NGAYSINH: p.txt_ngay_tma,
            v_Userid: ''
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_themmanv(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf('thành công') > 0) {
            messInfo("messinfo_themma", row, "ok");
            loaddanhsach_nv(1);
        } else {
            messInfo("messinfo_themma", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
