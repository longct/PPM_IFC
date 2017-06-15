$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        $("#btn_them_khmhd").click(function () {
            var check = validate_khmhoad();
            if (check != "") {
                messInfo("messinfo_khhd_t", check, 'error');
                return;
            }
            f_confimYesNo(" Chắc chắn muốn thêm Mẫu hóa đơn", "Bỏ qua", "Xác nhận", function () {
                f_uploadFileMauHd_thdm();
            });
        });
        $("#btn_thoat_khmhd").click(function () {
            clear_thoadon();
        });
    } catch (e) {
        console.log(e);
    }
});
function f_uploadFileMauHd_thdm()
{
    var fdata = new FormData();
    var file = $("#txt_file_khhd_t").get(0).files;
    fdata.append("file", file[0]);

    var config = { callback: "f_result_uploadFileMauHd_thdm", namefile: file.name };
    api_uploadFileMau(config, fdata);

}

function f_result_uploadFileMauHd_thdm(config, para, lst)
{
   if(lst != null && lst.data != null && lst.data != undefined)
    Capnhat_khmauhoadon();
}
function Capnhat_khmauhoadon() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var filePath = $('#txt_file_khhd_t')[0].files[0].name;
        var check = $("#txt_hieuluc_khhd_t").is(':checked') ? 1 : 0;
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOADON.THEMHOADON", callback: "result_Capnhat_khmauhoadon" };
        var para = {
            v_LOAIMAUHD: p.cb_loaimauhoadon_khhd_t,
            v_TENMAU:p.txt_ten_khhd_t,
            v_MAMAU:p.txt_maumau_khhd_t,
            v_FILEMAU:filePath,
            v_MAUSO:p.txt_mauso_khhd_t,
            v_KYHIEU:p.txt_kyhieu_khhd_t,
            v_LOAIHOADON:p.txt_loaihoadon_khhd_t,
            v_LIENHOADON:p.cb_lien_khhd_t,
            v_GHICHU:p.txt_ghichu_khhd_t,
            v_USERID: userinfo.userid,
            v_SUDUNG: check
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_Capnhat_khmauhoadon(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_khhd_t", row, 'ok');
            setTimeout(function () {
                clear_thoadon();
                loadlsthoadon(1);
            }, 1000);
        } else {
            messInfo("messinfo_khhd_t", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function validate_khmhoad() {
    try{
        var p = getAllIdMod();
        if (p.txt_ten_khhd_t == "") return "Tên hóa đơn không được bỏ trống";
        if (p.txt_maumau_khhd_t == "") return "Mã mẫu hóa đơn không được bỏ trống";
        if (p.txt_loaihoadon_khhd_t == "") return "Loại hóa đơn không được bỏ trống";
        if (p.txt_mauso_khhd_t == "") return "Mã số không được bỏ trống";
        if (p.txt_kyhieu_khhd_t == "") return "Ký hiệu không được bỏ trống";
        if (p.txt_file_khhd_t == "") return "Bạn chưa chọn file";
        var filePath = $('#txt_file_khhd_t')[0].files[0].name;
        var data = filePath.split('.');
        if (data[1] != 'dotx') return "Không đúng đinh dạng file dotx";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function clear_thoadon() {
    try {
        $("#cb_loaimauhoadon_khhd_t").val('0');
        $("#txt_ten_khhd_t").val('');
        $("#txt_maumau_khhd_t").val('');
        $("#txt_loaihoadon_khhd_t").val('');
        $("#txt_kyhieu_khhd_t").val('');
        $("#txt_file_khhd_t").val('');
        $("#txt_mauso_khhd_t").val('');
        $("#txt_hieuluc_khhd_t").prop("checked", false);
        messInfo("messinfo_khhd_t", '', 'error');
    } catch (e) {
        console.log(e);
    }
}
