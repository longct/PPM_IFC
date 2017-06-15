$(document).ready(function () {
    try {
        loadConetent();
        lstbanmien_taikhoan();
        $("#btn_taikhoan_tdmk").on("click", function () {
            var check = check_validate_tdmk();
            if (check != "") {
                messInfo("messinfo_tmk", check, "error");
                return;
            }
            messInfo("messinfo_tmk", '', "error");
            f_confimYesNo("Bạn chắc chắn muốn thêm tài khoản mới", "Bỏ qua", "Xác nhận", function () {
                them_tdmk();
            });
        });
    } catch (e) {
        console.log(e);
    }
});
//load banmien
function lstbanmien_taikhoan() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_LSTKHO", callback: "f_result_lstbanmien_taikhoan", connstr: "ConnectEMS" };
        var para = {
            Code: '',
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstbanmien_taikhoan(config, para, lst) {
    try {
        var data = lst.data;
    
        dataToCob("cbkhobanmien_tttk", data, "code", "name", "-1", "--Chọn kho--");
        $('select#cbkhobanmien_tttk').find('option').each(function () {
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
function check_validate_tdmk() {
    var p = getAllIdMod();
    if (p.txt_hoten_tttk == "") return "Họ tên không được bỏ trống";
    if (p.txt_taikhoan_tttk == "") return "Tên đăng nhập không được bỏ trống";
    if(p.txt_matkhau_tttk=="") return "Vui lòng nhập mật khẩu"
    if (p.txt_matkhau_tttk != p.txt_xacnhanmatkhau_tttk) return "Xác nhận mật khẩu chưa đúng";
    if (p.cbkhobanmien_tttk == '-1') return "Vui lòng chọn ban miền";
    if (p.cbquyenqtri_tttk == '-1') return "Vui lòng chọn quản trị";
    if (p.txt_sodienthoai_tttk != "") {
        if ($.isNumeric(p.txt_sodienthoai_tttk) == false) return "Số điện thoại phải là số";
        if ((p.txt_sodienthoai_tttk).length < 10 || (p.txt_sodienthoai_tttk).length > 11) return " Số điện thoại phải từ 10 hoặc 11 số";
    }
    if (p.txt_email_tttk != "") {
        if (IsEmail(p.txt_email_tttk) == false) return "Email không đúng định dạng";
    }
    return "";
}
function them_tdmk() {
    try {
        var p = getAllIdMod();
        var userid = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_TAOTAIKHOAN", callback: "f_result_them_tdmk", connstr: "ConnectEMS" };
        var para = {
            TENHO:p.txt_hoten_tttk,
            TENDANGNHAP: p.txt_taikhoan_tttk,
            MATKHAU: p.txt_matkhau_tttk,
            EMAIL: p.txt_email_tttk,
            SODT: p.txt_sodienthoai_tttk,
            DIACHI: p.txt_diachi_tttk,
            Code: p.cbkhobanmien_tttk,
            PERMISSTION: p.cbquyenqtri_tttk
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_them_tdmk(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tmk", row, 'ok');
            setTimeout(function () {
                messInfo("messinfo_tmk", '', 'ok');
                clear_taikhoan();
            }, 2000);
        } else {
            messInfo("messinfo_tmk", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clear_taikhoan() {
    try{
        $("#txt_hoten_tttk").val('');
        $("#txt_taikhoan_tttk").val('');
        $("#txt_matkhau_tttk").val('');
        $("#txt_xacnhanmatkhau_tttk").val('');
        $("#cbkhobanmien_tttk").val('-1');
        $("#cbquyenqtri_tttk").val('-1');
        $("#txt_email_tttk").val('');
        $("#txt_sodienthoai_tttk").val('');
        $("#txt_diachi_tttk").val('');
    } catch (e) {
        console.log(e);
    }
}



