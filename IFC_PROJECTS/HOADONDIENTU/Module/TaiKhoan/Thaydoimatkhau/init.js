$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        var userid = JSON.parse(localStorage.getItem('userinfo'));
        if (userid == null|| userid==undefined) {
            $(location).attr('href', 'login.html');
            return;
        }
        $("#btn_thaytk").click(function () {
          
            var check = validate_thayk();
            if (check != "") {
                messInfo("messinfo_thaydoi", check, 'error');
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn thay đổi mật khẩu", "Bỏ qua", "Xác nhận", function () {
                thaydoimatkh();
            });
        });


    } catch (e) {
        console.log(e);
    }
});
function validate_thayk() {
    try{
        var p = getAllIdMod();
        if (p.txt_passwordcu_tps == "") return "Mật khẩu cũ không được bỏ trống";
        if (p.txt_password_tps == "") return "Mật khẩu mới không được bỏ trống";
        if (p.txt_passwordnhap_tps == "") return "Nhập lại mật khẩu mới không được bỏ trống";
        if (p.txt_password_tps != p.txt_passwordnhap_tps) {
            $("#txt_password_tps").val('');
            $("#txt_passwordnhap_tps").val('');
            return "Mật khẩu mới không trùng nhập lại";
        }

        return "";
    } catch (e) {
        console.log(e);
    }
}
function thaydoimatkh() {
    try {
        var p = getAllIdMod();
        var userid = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.THAYMATKHAU", callback: "resut_thaydoimatkh" };
        var para = {
            v_TENDANGNHAP: userid.usercode,
            v_MATKHAUCU: p.txt_passwordcu_tps,
            v_MATKHAU: p.txt_password_tps,
        };

        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function resut_thaydoimatkh(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_thaydoi", row, 'ok');
            clearthay();
        } else {
            messInfo("messinfo_thaydoi", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function clearthay() {
    try{
   
        $("#txt_passwordcu_tps").val('');
        $("#txt_password_tps").val('');
        $("#txt_passwordnhap_tps").val('');
    } catch (e) {
        console.log(e);
    }
}
