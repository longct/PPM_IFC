$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        setValToTxt("datefrom_kbmin", gettimenow());
        $("#btn_themayin").click(function () {
            var check = check_kbm();
            if (check != "") {
                messInfo("messinfo_kbmin", check, 'error')
                return;
            }

            f_confimYesNo("Chắc chắn muốn thêm thông tin máy in", "Bỏ qua", "Xác nhận", function () {
                capnhat_khmin();
            });

           
        });

        $("#bt_thoat_min").click(function () {
            clear_kbin();
        });

    } catch (e) {
        console.log(e);
    }
});
function check_kbm() {
    try {
        var p = getAllIdMod();
        if (p.txt_ten_kbmin == "") return "Tên máy in không được bỏ trống";
        if (p.txt_mahieu_kbmin = "") return "Mã hiệu không được bỏ trống";
        if (p.txt_nhasx_kbmin == "") return "Nhà sản xuất không được bỏ trống";
    
        return "";
    } catch (e) {
        console.log(e);
    }
}
function capnhat_khmin() {
    try {
        var check = $("#txt_hieuluc_in").is(":checked") ? 1 : 0;
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.THEMMOIMAYIN", callback: "result_capnhat_khmin" };
        var para = {
            v_TENSX: p.txt_ten_kbmin,
            v_HANG: p.txt_nhasx_kbmin,
            v_NGAY:'',
            v_GHICHU: p.txt_ghichu_kbmin,
            v_MAHIEU: p.txt_mahieu_kbmin,
            v_HIEULUC: check,
            v_USERID: userinfo.userid
        };
        console.log(para);
       
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhat_khmin(confg, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kbmin", row, 'ok');
            setTimeout(function () {
                loadthong_mayin(1);
                clear_kbin();
            }, 500);
        } else {
            messInfo("messinfo_kbmin", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clear_kbin() {
    try {
        $("#txt_ten_kbmin").val('');
        $("#txt_nhasx_kbmin").val('');
        $("#txt_ghichu_kbmin").val('');
        $("#txt_mahieu_kbmin").val('');
        $("#txt_hieuluc_in").prop("checked", false);
    } catch (e) {
        console.log(e);
    }

}