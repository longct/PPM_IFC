$(document).ready(function () {
    try {
        loadConetent();
        $("#btn_edit_tdmk").click(function () {
            var check = check_validate_tdmk();
            if (check != "") {
                messInfo("messinfo_tdmk", check, "error");
                return;
            }
            messInfo("messinfo_tdmk", '', "error");
            f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
                changepass_tdmk();
            });

        });
    } catch (e) {
        console.log(e);
    }
});
function clear_tdmk() {
    try{
        $("#txt_matkhauhientai_tdmk").val('');
        $("#txt_matkhaumoi_tdmk").val('');
        $("#txt_matkhaumoi_tdmk").val('');
    } catch (e) {

    }
}

function check_validate_tdmk() {
    try {
        var p = getAllIdMod();
        if (p.txt_matkhauhientai_tdmk == "") return "Vui lòng nhập mật khẩu cũ";
        if (p.txt_matkhaumoi_tdmk == "") return "Vui lòng nhập mật khẩu mới";
        if (p.txt_matkhaumoi_tdmk != p.txt_xacnhanmatkhaumoi_tdmk) return "Xác nhận mật khẩu mới chưa đúng";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function changepass_tdmk() {
    try {
        var p = getAllIdMod();
        var userid = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TBRESETPASS", callback: "f_result_changepass_tdmk", connstr: "ConnectEMS" };
        var para = {
            TENDANGNHAP: userid.usercode,
            MatKhaucu: p.txt_matkhauhientai_tdmk,
            Matkhaumoi: p.txt_matkhaumoi_tdmk
        };
        ExecuteServiceSyns(config, para);


    } catch (e) {
        console.log(e);
    }
}
function f_result_changepass_tdmk(config,para,lst)
{
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tdmk", row, 'ok');
            setTimeout(function () {
                messInfo("messinfo_tdmk", '', 'ok');
                clear_tdmk();
            }, 2000);
        } else {
            messInfo("messinfo_tdmk", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
