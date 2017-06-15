$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        $("#btn_them_khmhd").click(function () {
            var check = validate_khmhd();
            if (check != "") {
                messInfo("messinfo_khmhd", check, 'error');
                return;
            }
            f_confimYesNo(" Chắc chắn muốn thêm Mẫu hợp đồng", "Bỏ qua", "Xác nhận", function () {
                f_uploadFileMauHd_khmau();
            });
        });
        $("#btn_thopdong").click(function () {
            clear_hdong();
        });



    } catch (e) {
        console.log(e);
    }
});
function f_uploadFileMauHd_khmau() {
    var fdata = new FormData();
    var file = $("#txt_file_khmhd").get(0).files;
    fdata.append("file", file[0]);
   
    var config = { callback: "f_result_f_uploadFileMauHd_khmau", namefile: file.name };
    api_uploadFileMau(config, fdata);
    
}

function f_result_f_uploadFileMauHd_khmau(config, para, lst) {
   
    if (lst != null && lst.data != null && lst.data != undefined)
        Capnhat_khmau();
}

function Capnhat_khmau() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
     
        var check = $("#txt_hieuluct_khmhd").is(':checked') ? 1 : 0;
        var filePath = $('#txt_file_khmhd')[0].files[0].name;
        var mamau= $("#txt_maumau_khmhd").val();
        var tenmau= $("#txt_ten_khmhd").val();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOPDONG.THEMHODONG", callback: "result_Capnhat_khmau" };
        var para = {
            v_TENMAU:tenmau,
            v_MAMAU: mamau,
            v_FILEMAU:filePath,
            v_USERID: userinfo.userid,
            v_HIEULUC: check
        };
    
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_Capnhat_khmau(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_khmhd", row, 'ok');
            setTimeout(function () { loadlsthopdong(1); clear_hdong(); }, 1000);
        } else {
            messInfo("messinfo_khmhd", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function validate_khmhd() {
    try{
        var p = getAllIdMod();
        if (p.txt_ten_khmhd == "") return "Tên hợp đồng không được bỏ trống";
        if (p.txt_maumau_khmhd == "") return "Mã mẫu hợp đồng không được bỏ trống";
        if (p.txt_file_khmhd == "") return "Bạn chưa chọn file";
        var filePath = $('#txt_file_khmhd')[0].files[0].name;
        var data = filePath.split('.');
        if (data[1] != 'dotx') return "Không đúng đinh dạng file dotx";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function clear_hdong() {
    try{
        $("#txt_ten_khmhd").val('');
        $("#txt_maumau_khmhd").val('');
        $("#txt_file_khmhd").val('');
        $("#txt_hieuluct_khmhd").prop("checked", false);
        messInfo("messinfo_khmhd", '', 'error');
    } catch (e) {
        console.log(e);
    }
}