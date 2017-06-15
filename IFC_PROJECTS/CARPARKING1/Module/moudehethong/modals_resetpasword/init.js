$(document).ready(function () {
    try {

        loadConetent();
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
        $("#txt_makhaucu").val('');
        $("#txt_makhaumoi").val('');
        $("#txt_nhaplaikhaumoi").val('');
    } catch (e) {
        console.log(e);
    }
}
function checkupvalidate() {
    try {
        var p = getAllIdMod();
        if (p.txt_makhaucu == '') return "Mật khẩu cũ không được bỏ trống";
        if (p.txt_makhaumoi == '') {
            return "Mật khẩu mới không được để trống";
        }
        if (p.txt_nhaplaikhaumoi == '') {
            return "Mật khẩu nhập lại không được để trống";
        }
        if (p.txt_nhaplaikhaumoi != p.txt_makhaumoi) {
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
        var config = { namesql: "CAR_DANGNHAP.THAYMATKHAU", callback: "f_result_loadsuamatkhau", connstr: "Oracle_HDDT" };
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            v_TENDANGNHAP: userinfo.usercode,
            v_MATKHAUCU: p.txt_makhaucu,
            v_MATKHAU: p.txt_nhaplaikhaumoi
        }
        ExecuteServiceSyns(config, para);        
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadsuamatkhau(config, para, lst) {
    try{
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


