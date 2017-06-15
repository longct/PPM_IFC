$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        capdl_tk();
        $("#btn_themtk").click(function () {
            var check = validate_tk();
            if (check != "") {
             
                messInfo("messinfo_themtk", check, 'error');
                return;
            }
            f_confimYesNo("Bạn chắc muốn thêm tài khoản", "Bỏ qua", "Xác nhận", function () {
                taotaikhoan();
            });
        });


    } catch (e) {
        console.log(e);
    }
});
function taotaikhoan() {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.TAOTAIKHOANA", callback: "resut_taotaikhoan" };
        var para = {
            v_USERID:userinfo.userid,
            v_TENDANGNHAP:p.txt_tendangnhap_tkl,
            v_MATKHAU:p.txt_password_tkl,
            v_TENNGUOIDUNG:p.txt_tens_tkl,
            v_SODIENTHOAI:p.txt_sodt_tkl,
            v_EMAIL:p.txt_email_tkl,
            v_DIACHI:p.txt_diachi_tkl,
            v_GHICHU:p.txt_ghichus_tkl,
            v_CODE: p.txt_capdtluc_tkl,
            v_QUYEN:'',
            v_TYPE:'',
        };
      
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function resut_taotaikhoan(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;

        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_themtk", row, 'ok');
            setTimeout(function () {
                loaddstaikhoan($("#pagenumber").val());
                clear_taikhoan();
            }, 200);
        } else {
            messInfo("messinfo_themtk", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function validate_tk() {
    try{
        var p = getAllIdMod();
        if (p.txt_tendangnhap_tkl == "") return "Tên đăng nhập không được bỏ trống";
        if (p.txt_password_tkl == "") return "Mật khẩu không được bỏ trống";
        if (p.txt_passwordnhap_tkl == "") return "Nhập lại mật khẩu không được bỏ trống";
        if (p.txt_password_tkl != p.txt_passwordnhap_tkl) {
            $("#txt_password_tkl").val('');
            $("#txt_passwordnhap_tkl").val('');
            return "Mật khẩu không trùng nhập lại";
        }
        if (p.txt_tens_tkl == "") return "Tên tài khoản không được bỏ trống";
        if (p.txt_capdtluc_tkl=="-1") return "Cấp điện lực không được bỏ trống"
        if (p.txt_sodt_tkl == "") return "Số điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_sodt_tkl) == false) return "Số điện thoại phải là số";
        if (p.txt_email_tkl == "") return "Email không được bỏ trống";
        if (IsEmail(p.txt_email_tkl) == false) return "Không đúng định dạng email";
        if (p.txt_diachi_tkl == "") return "Địa chỉ không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function clear_taikhoan() {
    try{
        $("#txt_tendangnhap_tkl").val('');
        $("#txt_password_tkl").val('');
        $("#txt_passwordnhap_tkl").val('');
        $("#txt_tens_tkl").val('');
        $("#txt_email_tkl").val('');
        $("#txt_diachi_tkl").val('');
        $("#txt_ghichus_tkl").val('');

    } catch (e) {
        console.log(e);
    }
}

function capdl_tk() {
    try {
      
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.LSTCAPDIENLUC", callback: "result_capdl_tk" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capdl_tk(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("txt_capdtluc_tkl", data, "id", "ten", "-1", "Chọn cấp điện lực");
    } catch (e) {
        console.log(e);
    }
}