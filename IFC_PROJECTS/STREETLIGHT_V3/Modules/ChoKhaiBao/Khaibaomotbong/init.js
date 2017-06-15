$(document).ready(function () {
    try {
        loadtu_khbong();
        loadbong_khbong();
        $("#txt_ngaylapdat_kbbong").val(gettimenow());
        messInfo("messinfo_kbbong", "", "error");
        $("#btn_checkluu_kbbong").click(function () {
            var check = checkvalidate_kbbong();
            if (check !== "") {
                messInfo("messinfo_kbbong", check, "error");
                return "";
            }
            messInfo("messinfo_kbbong", "", "error");
            Thembong_kbong();
        });


    } catch (e) {
        console.log(e);
    }
});
function loadtu_khbong() {
    try {
        var config = { namesql: "PKG_QUANLYBONG.DANHSACHTU", callback: "f_result_loadtu_khbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Code: '0119'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtu_khbong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbtu_kbbong", data, "id", "tenkhachhang", "-1", "Vui lòng chọn tủ");
    } catch (e) {
        console.log(e);
    }
}
function loadbong_khbong() {
    try {
        var config = { namesql: "PKG_QUANLYBONG.LST_LOAIBONG", callback: "f_result_loadbong_khbong", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbong_khbong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cb_loaibong_kbbong", data, "id", "tenloaibong", "-1", "Vui lòng chọn loại bóng");
    } catch (e) {
        console.log(e);
    }
}
function checkvalidate_kbbong() {
    try {
        var p = getAllIdMod();
        if (p.cbtu_kbbong== '-1') return "Vui lòng chọn tủ";
        if (p.txt_idrfbong_kbbong == '') return "ID RF không được để trống";
        if ($.isNumeric(p.txt_idrfbong_kbbong) == false) return "Không phải là số";
        if (p.txt_idrfbong_kbbong.length > 20) return "ID RF không được quá 20 ký tự";
        if (p.txt_ten_kbbong == '') return "Tên bóng không được để trống";
        if (p.txt_ten_kbbong.length > 20) return "Tên bóng không được quá 20 ký tự";
        if (p.txt_kinhdo_kbbong == '') return "Kinh độ không được để trống";
        if (p.txt_kinhdo_suattbong.length > 20) return "Kinh độ không được quá 20 ký tự";
        if (p.txt_vido_kbbong == '') return "Vĩ độ không được để trống";
        if (p.txt_vido_kbbong.length > 20) return "Vĩ độ  không được quá 20 ký tự";
        if (p.cb_loaibong_kbbong == '-1') return "Bạn chưa chọn loại bóng";
        if (p.txt_congsuat_kbbong == '') return "Công suất không được để trống";
        if (p.txt_congsuat_kbbong.length > 20) return "Công suất  không được quá 20 ký tự";
        if (p.txt_dienap_kbbong == '') return "Điện áp không được để trống";
        if (p.txt_dienap_kbbong.length > 20) return "Điện áp không được quá 20 ký tự";
        if (p.txt_docaocot_kbbong == '') return "Độ cao cột không được để trống";
        if (p.txt_docaocot_kbbong.length > 20) return "Độ cao cột không được quá 20 ký tự";
        if (p.cb_phabong_kbbong == '-1' || p.cb_phabong_kbbong == "") return "Vui lòng chọn pha"

        return "";

    } catch (e) {
        console.log(e);
    }
}
function Thembong_kbong() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var p = getAllIdMod();
        var config = { namesql: "PKG_QUANLYBONG.THEMTHONGTINBONG", callback: "f_result_Thembong_kbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_idtu:p.cbtu_kbbong,
            v_tenbong:p.txt_ten_kbbong,
            v_idrfbong:p.txt_idrfbong_kbbong,
            v_kinhdo:p.txt_kinhdo_kbbong,
            v_vido:p.txt_vido_kbbong,
            v_loaibong:p.cb_loaibong_kbbong,
            v_thoidiemlap:p.txt_ngaylapdat_kbbong,
            v_dienap:p.txt_dienap_kbbong,
            v_consuat:p.txt_congsuat_kbbong,
            v_chieucaocot:p.txt_docaocot_kbbong,
            v_ghichu: p.txt_ghichu_kbbong,
            v_phabong:p.cb_phabong_kbbong
        };
 
        ExecuteServiceSyns(config, para, false);
        
    } catch (e) {
        console.log(e);
    }
}
function f_result_Thembong_kbong(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kbbong", row, "ok");
            clear_bong();
        } else {
            messInfo("messinfo_kbbong", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function clear_bong() {
    try{
        $("#cbtu_kbbong").val("-1");
        $("#txt_idrfbong_kbbong").val("");
        $("#txt_ten_kbbong").val("");
        $("#txt_kinhdo_kbbong").val("");
        $("#txt_vido_kbbong").val("");
        $("#txt_kinhdo_kbbong").val("");
        $("#cb_loaibong_kbbong").val("-1");
        $("#cb_phabong_kbbong").val("-1");
        $("#txt_docaocot_kbbong").val("");
        $("#txt_dienap_kbbong").val("");
        $("#txt_congsuat_kbbong").val("");
        $("#txt_ghichu_kbbong").val("");
        $("#txt_ngaylapdat_kbbong").val(gettimenow());
    } catch (e) {
        console.log(e);
    }
}