var idhoad = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        messInfo("messinfo_khhds_t",'', 'error');
        $("#btn_suahoadon_khmhd").click(function () {
            var check = checkvailidates_t();
            if (check!="") {
                messInfo("messinfo_khhds_t", check, 'error');
                return;
            }
           
            f_confimYesNo("Cập nhật thông tin hóa đơn mẫu", "Bỏ qua", "Xác nhận", function () {
                checkdieukien_hdsua();
            });
        });


        $('#txt_sfile_khhd_t').change(function () {
            var setmail = $('#txt_sfile_khhd_t').val();
            if (setmail == '') {
                return;
            }
            var filePath = $('#txt_sfile_khhd_t')[0].files[0].name;
           setValToTxt("txt_tebs_khhd_t", filePath);
        });

    } catch (e) {
        console.log(e);
    }

})
// set điều kiên
function checkdieukien_hdsua() {
    try {
        var p = getAllIdMod();
        if (p.txt_file_skhmhd == "") {
            capnhatthongtin_had();
        } else {
            f_uploadFileMauHd_had();
        }
    } catch (e) {
        console.log(e);
    }
}

function f_uploadFileMauHd_had() {
    var fdata = new FormData();
    var file = $("#txt_sfile_khhd_t").get(0).files;
    fdata.append("file", file[0]);
    var config = { callback: "f_result_f_uploadFileMauHd_had", namefile: file.name };
    api_uploadFileMau(config, fdata);

}

function f_result_f_uploadFileMauHd_had(config, para, lst) {

    if (lst != null && lst.data != null && lst.data != undefined)
        capnhatthongtin_had();
}






function loadthongtinkhhoa_hd(id) {
    try{
        idhoad = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOADON.IDHOADON", callback: "resut_loadthongtinkhhoa_hd" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_loadthongtinkhhoa_hd(config, para, lst) {
    try{
        var data = lst.data;
        console.log(data);
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_khhd_t", 'Không có dữ liệu hiển thị', 'ok');
            $("#txt_ten_skhmhd").val('');
            $("#txt_maumau_skhmhd").val('');
            $("#txt_file_skhmhd").val('');
            $("#cb_loaimauhoadon_khhd_ts").val('0');
            return;
        }
        $("#cb_loaimauhoadon_khhd_ts").val(data[0].loaimauhd);
        setValToTxt("txt_tens_khhd_ts", data[0].tenhoadon);
        setValToTxt("txt_maumaus_khhd_ts", data[0].mamauhoadon);
        setValToTxt("cb_liens_khhd_ts", data[0].lienhoadon);
        setValToTxt("txt_sloaihoadon_khhd_ts", data[0].loaihoadon);
        setValToTxt("txt_mausos_khhd_ts", data[0].mauso);
        setValToTxt("txt_skyhieu_khhd_ts", data[0].kyhieu);
        setValToTxt("txt_ghichus_khhd_ts", data[0].ghichu);
        $('#txt_tebs_khhd_t').val(data[0].thumuc);
       
        if (data[0].sudung == '1') {
            $("#txt_sudung_khhd_ts").prop("checked", true);
        } else {
            $("#txt_sudung_khhd_ts").prop("checked", false);
        }

    }catch(e){
        console.log(e);
    }
}
function capnhatthongtin_had() {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var check = $("#txt_sudung_khhd_ts").is(':checked') ? 1 : 0;
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOADON.CAPNHATHOADON", callback: "resut_capnhatthongtin_had" };
        var para = {
            v_ID: idhoad,
            v_LOAIMAUHD: p.cb_loaimauhoadon_khhd_ts,
            v_TENMAU:p.txt_tens_khhd_ts,
            v_MAMAU:p.txt_maumaus_khhd_ts,
            v_FILEMAU:p.txt_tebs_khhd_t,
            v_MAUSO:p.txt_mausos_khhd_ts,
            v_KYHIEU:p.txt_skyhieu_khhd_ts,
            v_LOAIHOADON:p.txt_sloaihoadon_khhd_ts,
            v_LIENHOADON:p.cb_liens_khhd_ts,
            v_GHICHU:p.txt_ghichus_khhd_ts,
            v_USERID: userinfo.userid,
            v_SUDUNG: check
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function resut_capnhatthongtin_had(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_khhds_t", row, 'ok');
            setTimeout(function () { loadlsthoadon(1); }, 1000);
        } else {
            messInfo("messinfo_khhds_t", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function checkvailidates_t() {
    try {
        var p = getAllIdMod();
        if (p.txt_tens_khhd_ts == "") return "Tên hóa đơn không được bỏ trống";
        if (p.txt_maumaus_khhd_ts == "") return "Mã mẫu hóa đơn không được bỏ trống";
        if (p.txt_sloaihoadon_khhd_ts == "") return "Loại hóa đơn không được bỏ trống";
        if (p.txt_mausos_khhd_ts == "") return "Mã số không được bỏ trống";
        if (p.txt_skyhieu_khhd_ts == "") return "Ký hiệu không được bỏ trống";
        if (p.txt_tebs_khhd_t == "") return "Bạn chưa chọn file";
        var filePath = p.txt_tebs_khhd_t;
        var data = filePath.split('.');
        if (data[1] != 'dotx') return "Không đúng đinh dạng file dotx";

        return "";
    } catch (e) {
        console.log(e);
    }
}