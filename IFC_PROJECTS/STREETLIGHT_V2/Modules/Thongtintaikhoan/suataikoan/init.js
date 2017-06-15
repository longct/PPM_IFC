
$(document).ready(function () {
    try {
        loadConetent();
        loadchecklog_master();
        loadlistquyen_sua();
        loaddonvi_sua();
        $("#btn_checkluu_sua").click(function () {
            var check = checknull_sua();
            if (check != "") {
                messInfo("messinfo_sua", check, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn sửa khách hàng ", "Bỏ qua", "Xác nhận", function () {
                loadsuakhachhang();
            });

        });
    } catch (e) {
        console.log(e);
    }

});
function loadkhachhang_id(val) {
    try {
        var p = getAllIdMod();
        localStorage.setItem('suathongtin', val);
        var config = { namesql: "PKG_USERS.NGUOIDUNG", callback: "reset_loadkhachhang_id", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_IDNHANVIEN: val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function reset_loadkhachhang_id(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_manhanvien", data[0].manhanvien);
        setValToTxt("txt_hoten", data[0].tennhanvien);
        setValToTxt("txt_dienthoai", data[0].sodienthoai);
        setValToTxt("txt_diachi", data[0].diachi);
        setValToTxt("cbdonvi", data[0].madonvi);
        setValToTxt("cbquyen", data[0].quyen);
    } catch (e) {
        console.log(e);
    }
}
function loadlistquyen_sua() {
    try {
        var config = { namesql: "PKG_USERS.LSTQUYEN", callback: "f_result_loadlstquyen_sua", connstr: "ConnectOracleStreetLight" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstquyen_sua(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbquyen", data, "id", "name", "-1", "Chọn quyền");
    } catch (e) {
        console.log(e);
    }
}
function loaddonvi_sua() {
    try {
        var config = { namesql: "PKG_USERS.LSTDONVI", callback: "f_result_loadlstdonvi_sua", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi_sua(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbdonvi", data, "madonvi", "tendonvi", "-1", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}

function loadsuakhachhang() {
    try {
        var p = getAllIdMod();

        var idnhavien = localStorage.getItem("suathongtin");
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_USERS.CREATEUSER", callback: "f_result_loadtaikhoan_suakhachhang", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_IDNHANVIEN: idnhavien,
            v_MANHANVIEN: p.txt_manhanvien,
            v_TENNHANVIEN: p.txt_hoten,
            v_MATKHAU: '',
            v_SODIENTHOAI: p.txt_dienthoai,
            v_MADONVI: p.cbdonvi,
            v_DIACHI: p.txt_diachi,
            v_QUYEN: p.cbquyen,
            v_TYPE: 'UPDATE',
        };
        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan_suakhachhang(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sua", row, "ok");
            loaddanhsachtaikhoang(1);
        } else {
            messInfo("messinfo_sua", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function checknull_sua() {
    try {
        var p = getAllIdMod();
        if (p.txt_manhanvien == "") {
            return "Mã nhân viên không được để trống";
        }
        if (p.txt_hoten == '') {
            return "Không được để trống tên nhân viên";
        }
        if (p.txt_dienthoai == '') {
            return "Không được để trống diện thoại";
        }
        if ($("#txt_dienthoai").val().replace(/[0-9]*/g, "")) {
            return "Điện thoại phải là số ";
        }
        if (p.txt_diachi == '') {
            return "Không được để trống địa chỉ";
        }
        if (p.cbdonvi == '-1') {
            return "Vui lòng chọn đơn vị ";
        }
        if (p.cbquyen == '-1') {
            return "Vui lòng chọn quyền ";
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}