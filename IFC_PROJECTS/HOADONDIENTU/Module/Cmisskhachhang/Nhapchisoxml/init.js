var idram_nhacso;
var countpage = 1000;
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();
        $("#nhapkhach_ncsxml").hide();
        $("#btn_khachang_ncsxml").click(function () {
            var check = validate_ncsxml();
            if (check != "") {
                messInfo("messinfo_ncsxml", check, 'error');
                return;
            }
            messInfo("messinfo_ncsxml", '', 'error');
            capnhatthongchiso_xml();

        });

    } catch (e) {
        console.log(e);
    }
});
function validate_ncsxml() {
    try{
        var p = getAllIdMod();
        if (p.txt_file_ncsxml == "") return "Chưa chọn file xml";
        var filePath = $('#txt_file_ncsxml')[0].files[0].name;
        var data = filePath.split('.');
        if (data[1] != 'xml') return "Không đúng đinh dạng file xml";

        return "";

    } catch (e) {
        console.log(e);
    }
}

function f_insertCaFile_ncsxml(thiss) {
    try {
        $("#anhload").show();
        // var p = getAllIdMod();
        idram_nhacso = Math.random().toString(36).substr(2);

        var fdata = new FormData();
        var files = $('#txt_file_ncsxml')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "Oracle_HDDT");
        fdata.append("insertto", "HD_TEMP_CMISS");
        fdata.append("idrandom", idram_nhacso);

        var config = { callback: "f_result_insertCaFile_ncsxml" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}

function f_result_insertCaFile_ncsxml(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].idrandom
        if (row == idram_nhacso) {
            setTimeout(function () { loadkhachhang_ncsxml(1); }, 2000);
        } else {
            messInfo("messinfo_ncsxml", "Không có dữ liệu hiển thị", 'error');
            $("#nhapkhach_ncsxml").hide();
        }

    } catch (e) {
        console.log(e);
    }
} 

function loadkhachhang_ncsxml(page) {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_NHAPCHISO.DANHSACHKHACHHANG", callback: "f_result_f_nhapkhachhang_cmisskh" };
        var para = {
           v_IDRAMDOM: idram_nhacso,
            v_pagenum: page,
            v_numrecs: countpage,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_f_nhapkhachhang_cmisskh(config, para, lst) {
    try {
        $("#anhload").hide();
        var data = lst.data;
     
        if (data == "" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ncsxml", "Không có dữ liệu hiển thị", 'error');
            $("#nhapkhach_ncsxml").hide();
            return;
        }
        messInfo("messinfo_ncsxml", "", 'error');
        $("#nhapkhach_ncsxml").show();
        $("#table_ncsxml").empty();
        var row = "";
        $.each(data, function (key, val) {
            row += "<tr id_auto='" + val.ma_ddo + "'><td>"
                + val.stt + "</td><td>"
                + setnull(val.madiemdo) + "</td><td>"
                + setnull(val.socongto) + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.kychot) + "</td><td>"
                + setnull(val.thang) + "</td><td>"
                + setnull(val.nam) + "</td><td>"
                + setnull(val.ngaycu) + "</td><td>"
                + setnull(val.ngaymoi) + "</td><td>"
                + val.pgiao1 + "</td><td>"
                + val.pgiao2 + "</td><td>"
                + val.pgiao3 + "</td><td>"
                + val.pgiaotong + "</td><td>"
                + val.qgiaotong + "</td></tr>";
            });
      
        $("#table_ncsxml").append(row);
        $("#nhapkhach_ncsxml").append("<div class='bottom-mar-50'></div>");
    } catch (e) {
        console.log(e);
    }
}

function capnhatthongchiso_xml() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_NHAPCHISO.NHAPCHISO", callback: "result_capnhatthongchiso_xml" };
        var para = {
            v_IDRAMDOM: idram_nhacso,
            v_USERID: userinfo.userid
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_capnhatthongchiso_xml(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_ncsxml", row, 'ok');
        } else {
            messInfo("messinfo_ncsxml", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}













