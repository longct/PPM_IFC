var idhdkb = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        $("#btn_sua_khmhd").click(function () {
            var check = checkvailidate_t();
            if (check != "") {
                messInfo("messinfo_skhmhd", check, 'error');
                return;
            }
            f_confimYesNo("Cập nhật thông tin mẫu hợp đồng", "Bỏ qua", "Xác nhận", function () {
                checkdieukien();
            });

        });


        $('#txt_file_skhmhd').change(function () {
            var setmail = $('#txt_file_skhmhd').val();
            if (setmail == '') {
                return;
            }
            var filePath = $('#txt_file_skhmhd')[0].files[0].name;
            setValToTxt("txt_tes_shd", filePath);
        });

    } catch (e) {
        console.log(e);
    }

});
// set điều kiên
function checkdieukien() {
    try{
        var p = getAllIdMod();
        if (p.txt_file_skhmhd == "") {
            capnhatthongtin_hd();
        } else {
            f_uploadFileMauHd_hdsua();
        }
    } catch (e) {
        console.log(e);
    }
}

function f_uploadFileMauHd_hdsua() {
    var fdata = new FormData();
    var file = $("#txt_file_skhmhd").get(0).files;
    fdata.append("file", file[0]);
    
    var config = { callback: "f_result_f_uploadFileMauHd_hd", namefile: file.name };
    api_uploadFileMau(config, fdata);

}

function f_result_f_uploadFileMauHd_hd(config, para, lst) {
  
    if (lst != null && lst.data != null && lst.data != undefined)
        capnhatthongtin_hd();
}



function  loadthongtinkh_hd(id){
    try{
        idhdkb = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOPDONG.IDHOPDONG", callback: "resut_loadthongtinkh_hd" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function resut_loadthongtinkh_hd(config, para, lst) {
    try{
        var data = lst.data;

        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_skhmhd", 'Không có dữ liệu hiển thị', 'ok');
            $("#txt_ten_skhmhd").val('');
            $("#txt_maumau_skhmhd").val('');
            $("#txt_file_skhmhd").val('');
            return;
        }
        setValToTxt("txt_ten_skhmhd", data[0].ten);
        setValToTxt("txt_maumau_skhmhd", data[0].mamauhopdong);
        $('#txt_tes_shd').val(data[0].duongdanfile);

        if (data[0].hieuluc == '1') {
            $("#txt_hieuluc_skhmd").prop("checked", true);
        } else {
            $("#txt_hieuluc_skhmd").prop("checked", false);
        }

    }catch(e){
        console.log(e);
    }
}
function capnhatthongtin_hd() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var check = $("#txt_hieuluc_skhmd").is(':checked') ? 1 : 0;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOPDONG.CAPNHAT", callback: "resut_capnhatthongtin_hd" };
        var para = {
            v_ID:idhdkb,
            v_TENMAU:$("#txt_ten_skhmhd").val(),
            v_MAMAU:$("#txt_maumau_skhmhd").val(),
            v_FILEMAU: $("#txt_tes_shd").val(),
            v_HIEULUC: check,
            v_USERID: userinfo.userid
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function resut_capnhatthongtin_hd(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_skhmhd", row, 'ok');
            setTimeout(function () {
                loadlsthopdong(1);
                messInfo("messinfo_skhmhd", '', 'error');
            }, 1000);
        } else {
            messInfo("messinfo_skhmhd", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function checkvailidate_t() {
    try {
        var p = getAllIdMod();
        if (p.txt_ten_skhmhd == "") return "Tên hợp đồng không được bỏ trống ";
        if (p.txt_maumau_skhmhd == "") return "Mã mẫu không được bỏ trống";
        if (p.txt_tes_shd == "") return "Chọn file không được  bỏ trống ";
        var filePath = p.txt_tes_shd;
        var data = filePath.split('.');
        if (data[1] != 'dotx') return "Không đúng đinh dạng file dotx";
        return "";
    } catch (e) {
        console.log(e);
    }
}