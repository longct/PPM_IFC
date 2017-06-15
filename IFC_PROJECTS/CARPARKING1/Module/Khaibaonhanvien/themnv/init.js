
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
         loadnv_lst_diemdoxe_suanv();
        $("#btn_tma").click(function () {
            var check = checkvailidate_tma();
            if (check != "") {
                messInfo("messinfo_themma", check, "error");
                clear_tma();
                return;
            }
            messInfo("messinfo_themma", "", "error");
            f_confimYesNo("Bạn chắc chắn muốn thêm", "Bỏ qua", "Xác nhận", function () {
                themmoinhanvien();
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
        if (p.cb_diemdoxe == '-1' || p.cb_diemdoxe == "") return " Vui lòng chọn trạm"
        if (p.txt_matkhau_tma == "") return "Mật khẩu không được để trống";
        if (p.txt_matkhaunl_tma == "") return "Nhập lại mật khẩu không được để trống";
        if (p.txt_matkhau_tma != p.txt_matkhaunl_tma) return "Khai mật khẩu không trùng hớp";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function clear_tma() {
    try{
        $("#txt_matkhau_tma").val('');
        $("#txt_matkhaunl_tma").val('');
    } catch (e) {
        console.log(e);
    }
}
function loadnv_lst_diemdoxe_suanv() {
    try {
   
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var config = { namesql: "CAR_LOAD_LST.LOADLSTDIEMDOXE", callback: "f_result_loadnv_lstdiemdoxe_suanv", connstr: "Oracle_HDDT" };
        var para = {
            v_CODE: infotree.code
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnv_lstdiemdoxe_suanv(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_diemdoxe", data, "id_ddx", "ten_ddx", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}


function themmoinhanvien() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var p = getAllIdMod();
        var config = { namesql: "CAR_CAPNHATNHANVIEN.THEMNHANVIEN", callback: "f_result_themmoinhanvien", connstr: "Oracle_HDDT" };
        var para = {
            v_USERID:userinfo.userid ,
            v_TEN:p.txt_tennv_tma,
            v_DIACHI:p.txt_diachi_tma,
            v_DIENTHOAI:p.txt_sodienthoai_tma,
            v_IDDIEMDOXE:p.cb_diemdoxe,
            v_MANHANVIEN:p.txt_manv,
            v_MAKHAU: p.txt_matkhau_tma,
            v_GHICHU: p.txt_ghichu
        };
    
    ExecuteServiceSyns(config, para);
} catch (e) {
    console.log(e);
}
}
function f_result_themmoinhanvien(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_themma", row, 'ok');
            setTimeout(function () {  loaddanhsach_nv(1); 
            $('button.close').click();
        }, 500);
        } else {
            messInfo("messinfo_themma", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
