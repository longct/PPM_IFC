var idhmin = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();

        $("#btn_suamayin").click(function () {
            var check = validate_in();
            if (check != "") {
                messInfo("messinfo_suain", check, 'error')
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn sửa", "Bỏ qua", "Xác nhận", function () {
                capnhat_mayin();
            });
        });

    } catch (e) {
        console.log(e);
    }
});
function thongtinidmayin(id) {
    try {
        idhmin = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.IDMAYIN", callback: "resut_thongtinidmayin" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_thongtinidmayin(config, para, lst) {
    try {
        var data = lst.data;
   
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_suain", 'Không có dữ liệu hiển thị', 'ok');
            clear_min();
            return;
        }
        $("#txt_tens_kbmin").val(data[0].tenmayin);
        $("#txt_mahieus_kbmin").val(data[0].mahieuin);
        $("#txt_nhasxs_kbmin").val(data[0].hang);
        $("#datefroms_kbmin").val(data[0].ngaya);
        $("#txt_ghichus_kbmin").val(data[0].ghichu);
        if (data[0].hieuluc == '1') {
            $("#txt_shieuluc_in").prop("checked", true);
        } else {
            $("#txt_shieuluc_in").prop("checked", false);
        }

    } catch (e) {
        console.log(e);
    }
}
function clear_min() {
    try {
        $("#txt_tens_kbmin").val('');
        $("#txt_mahieus_kbmin").val('');
        $("#txt_nhasxs_kbmin").val('');
        $("#txt_ghichus_kbmin").val('');
        $("#datefroms_kbmin").val(gettimenow());
    } catch (e) {
        console.log(e);
    }
}
function validate_in() {
    try {
        var p = getAllIdMod();
        if (p.txt_tens_kbmin = "") return "Tên máy in không được bỏ trống";
        if (p.txt_mahieus_kbmin = "") return "Mã hiệu máy in không được bỏ trống";
        if (p.txt_nhasxs_kbmin = "") return "Nhà sản xuất không được bỏ trống";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function capnhat_mayin() {
    try {
        var p = getAllIdMod();
        var check = $("#txt_shieuluc_in").is(':checked') ? 1 : 0;
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.SUAMOIMAYIN", callback: "result_capnhat_mayin" };
        var para = {
            v_ID: idhmin,
            v_TENSX: p.txt_tens_kbmin,
            v_HANG: p.txt_nhasxs_kbmin,
            v_NGAY: '',
            v_GHICHU: p.txt_ghichus_kbmin,
            v_MAHIEU: p.txt_mahieus_kbmin,
            v_HIEULUC:check,
            v_USERID: userinfo.userid
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_capnhat_mayin(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suain", row, 'ok');
            setTimeout(function () { loadthong_mayin(1); }, 500);
        } else {
            messInfo("messinfo_suain", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}