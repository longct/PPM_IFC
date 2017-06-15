var id_suaxe;
$(document).ready(function () {
    try {
        loadConetent();
        loadlst_sxe();
        $("#btn_sxe").click(function () {
            var check = check_validate_sua();
            if (check != "") {
                messInfo("messinfo_suama", check, 'ok');
                return;
            }

            f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
                capnhatthongtin_xe();
            });
           
        });

    } catch (e) {
        console.log(e);
    }
});
function check_validate_sua() {
    try {
        var p = getAllIdMod();
        if (p.txt_tendiemdo_sxe == "") return " Tên điểm đỗ không được bỏ trống";
        if (p.txt_madiemquanly_sxe == "") return "Mã điểm đỗ không được bỏ trống";
        if (p.txt_nguoiquanly_sxe == "") return "Người quản lý không được bỏ trống";
        if (p.txt_tongsocho_sxe == "") return " Tổng số chỗ không được bỏ trống";
        if ($.isNumeric(p.txt_sodienthoai_sxe) == false) return "Số điện thoại không phải là số";
        if ((p.txt_sodienthoai_sxe).length < 10 || (p.txt_sodienthoai_sxe).length > 11) return " Số điện thoại phải từ 10 hoặc 11 số";
        if (IsEmail(p.txt_email_sxe) == false) return "Email không đúng định dạng";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function loadlst_sxe() {
    try {
        var config = { namesql: "CAR_LSTBOX.DIEMDOXE", callback: "f_result_loadlst_sxe", connstr: "Oracle_HDDT" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlst_sxe(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
            // messInfo("messinfo_master", "Username hoăc Password của bạn đã sai ", "error");
            return;
        }
        dataToCob("cb_diemdoxe_sxe", lst.data, "code", "ten");
        $('select#cb_diemdoxe_sxe').find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });

    } catch (e) { console.log(e); }
}

function loadthongtin_dxe(val) {
    try{

        id_suaxe = val;
        var config = { namesql: "CAR_DANHSACHDIEMDO.LAYIDDIEMDO", callback: "f_result_loadthongtindoxe", connstr: "Oracle_HDDT" };
        var para = {
            v_ID:val
        };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtindoxe(config, para, lst) {
    try{
        console.log(lst);
        var data = lst.data;
        $("#txt_tendiemdo_sxe").val(data[0].ten_ddx);
        $("#txt_madiemquanly_sxe").val(data[0].madiemdoxe);
        $("#txt_nguoiquanly_sxe").val(data[0].nguoiquanly);
        $("#txt_tongsocho_sxe").val(data[0].tong_ddx);
        $("#txt_kinhdo_sxe").val(data[0].kinhdo);
        $("#txt_vido_sxe").val(data[0].vido);
        $("#cb_diemdoxe_sxe").val(data[0].code);
        $("#txt_sodienthoai_sxe").val(data[0].sodienthoai);
        $("#txt_email_sxe").val(data[0].email);

    } catch (e) {
        console.log(e);
    }
}

function capnhatthongtin_xe() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "CAR_DANHSACHDIEMDO.UPDATEDIEMDO", callback: "f_result_capnhatthongtin_xe", connstr: "Oracle_HDDT" };
        var para = {
            v_USERID: userinfo.userid,
            v_ID : id_suaxe,
            v_TENDIEMDO:p.txt_tendiemdo_sxe,
            v_MADIEMDO: p.txt_madiemquanly_sxe,
            v_NGUOIQUANLY:p.txt_nguoiquanly_sxe,
            v_TONGSOCHO:p.txt_tongsocho_sxe,
            v_SODIENTHOAI:p.txt_sodienthoai_sxe,
            v_EMAIL:p.txt_email_sxe,
            v_KINHDO:p.txt_kinhdo_sxe,
            v_VIDO:p.txt_vido_sxe,
            v_CODE: p.cb_diemdoxe_sxe,
        };
    ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatthongtin_xe(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suama", row, 'ok');
            setTimeout(function () {
                loaddanhsach_ddxe(1);
            });
        } else {
            messInfo("messinfo_suama", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}

