$(document).ready(function () {
    try {
        loadContent();
        loadchecklog_master();
        $("#btn_checkluu_password").click(function () {

            var check = checkupvalidate();
            if (check != "") {
                messInfo("messinfo_resetpassword", check, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn đổi mật khẩu ", "Bỏ qua", "Xác nhận", function () {
                capnhatthongtinmatkhau();
            });

        });

    } catch (e) {
        console.log(e);
    }
});
function clearthaypasss() {
    try {
        $("#txt_makhaumoi").val('');
        $("#txt_nhaplaikhaumoi").val('');
    } catch (e) {
        console.log(e);
    }
}
function checkupvalidate() {
    try {
        var makh = $('#txt_makhaumoi').val();
        var makhm = $('#txt_nhaplaikhaumoi').val();
        if (makh == '') {
            return "Mật khẩu mới không được để trống";
        }
        if (makhm == '') {
            return "Mật khẩu nhập lại không được để trống";
        }
        if (makh != makhm) {
            clearthaypasss();
            return "Hai mật khẩu mới không trùng nhau";
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}
function capnhatthongtinmatkhau() {
    try {
        var p = getAllIdMod();

        var makh = $('#txt_makhaumoi').val();
        var makhm = $('#txt_nhaplaikhaumoi').val();
        var config = { namesql: "PKG_USERS.RESETPASSWORD", callback: "f_result_loadsuamatkhau", connstr: "ConnectOracleStreetLight" };
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            v_MANHANVIEN: userinfo.manhanvien,
            v_PASSWORDOLD: makh,
            v_PASSWORDNEW: makh,
        }
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadsuamatkhau(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_resetpassword", row, "ok");
            clearthaypasss();
        } else {
            messInfo("messinfo_resetpassword", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}


