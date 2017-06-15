var idkhanghang;
$(document).ready(function () {
    try {
        loadConetent();
        lstbanmien_cttkhoan();
        $("#btn_taikhoan_cttk").on("click", function () {
            var check = check_validate_cttkhoan();
            if (check != "") {
                messInfo("messinfo_cttk", check, "error");
                return;
            }
            messInfo("messinfo_cttk", '', "error");
           
            f_confimYesNo("Bạn chắc chắn muốn thêm tài khoản mới", "Bỏ qua", "Xác nhận", function () {
                capnhat_tdmk();
            });
        });
    } catch (e) {
        console.log(e);
    }
});
function loadthong_tk(val) {
    try {
        idkhanghang = val;
        var config = { namesql: "TB_useridtaikhoan", callback: "f_result_loadthong_tk", connstr: "ConnectEMS" };
        var para = {
            userid: val
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthong_tk(config, para, lst) {
    try {
        var data = lst.data;
        $("#txt_hoten_cttk").val(data[0].fullname);
        $("#txt_taikhoan_cttk").val(data[0].usercode);
        $("#cbkhobanmien_cttk").val(data[0].code);
        $("#cbquyenqtri_cttk").val(fromview(data[0].ispermission));
        $("#txt_email_cttk").val(data[0].email);
        $("#txt_sodienthoai_cttk").val(data[0].phone);
        $("#txt_diachi_cttk").val(data[0].address)

    }catch (e) {
        console.log(e);
    }
}
function fromview(val) {
    var giatri;
    if (val ==true) { giatri = 1; } else { giatri = 0 }
    return giatri;

}

//load banmien
function lstbanmien_cttkhoan() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_LSTKHO", callback: "f_result_lstbanmien_cttkhoan", connstr: "ConnectEMS" };
        var para = {
            Code: '',
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstbanmien_cttkhoan(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkhobanmien_cttk", data, "code", "name", "-1", "--Chọn kho--");

        $('select#cbkhobanmien_cttk').find('option').each(function () {
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 10) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function check_validate_cttkhoan() {
    var p = getAllIdMod();
    if (p.txt_hoten_cttk == "") return "Họ tên không được bỏ trống";
    if (p.cbkhobanmien_cttk == '-1') return "Vui lòng kho";
    if (p.cbquyenqtri_cttk == '-1') return "Vui lòng chọn quản trị";
    if (p.txt_sodienthoai_cttk != "") {
        if ($.isNumeric(p.txt_sodienthoai_cttk) == false) return "Số điện thoại phải là số";
        if ((p.txt_sodienthoai_cttk).length < 10 || (p.txt_sodienthoai_cttk).length > 11) return " Số điện thoại phải từ 10 hoặc 11 số";
    }
    if (p.txt_email_cttk != "") {
        if (IsEmail(p.txt_email_cttk) == false) return "Email không đúng định dạng";
    }
    return "";
}
function capnhat_tdmk() {
    try {
        var p = getAllIdMod();
        var userid = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_CAPNHATTAIKHOAN", callback: "f_result_capnhat_tdmk", connstr: "ConnectEMS" };
        var para = {
            USERID: idkhanghang,
            TENHO: p.txt_hoten_cttk,
            EMAIL: p.txt_email_cttk,
            SODT: p.txt_sodienthoai_cttk,
            DIACHI: p.txt_diachi_cttk,
            Code: p.cbkhobanmien_cttk,
            PERMISSTION: p.cbquyenqtri_cttk
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhat_tdmk(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_cttk", row, 'ok');
            setTimeout(function () {
                messInfo("messinfo_cttk", '', 'ok');
                danhsachnhap_tkhoan(tranghietai);
            }, 2000);
        } else {
            messInfo("messinfo_cttk", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}


