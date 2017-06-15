var idrandomd;
var countpage = 1000;
$(document).ready(function () {
    try {
        loadConetent();
        $("#nhapkhachhang_tl").hide();
        $("#date_thang").val(gettimenow_cscthang());
        $('#date_thang').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        });

        $("#sokychot").change(function () {
            var ky = $(this).val();
            var fixDay;
            switch (ky) {
                case '1':
                    fixDay = "1"; break;
                case '2':
                    fixDay = "1,2"; break;
                case '3':
                    fixDay = "1,2,3"; break;
                default: fixDay = "1"; break;
            }

            $("#txtFixday").val(fixDay);
        });

        $("#btnThietlap").click(function () {
            var check = checkvaidate_nhapcmis();
            if (check != "") {
                messInfo("messinfo_thietlap", check, 'error');
                return;
            }
            messInfo("messinfo_thietlap", '', 'error');
            capnhatkhachhang_tl();
        });

    } catch (e) {
        console.log(e);
    }
});
function f_cleartemp(thiss) {
    try {
        $("#anhload").show();
        // var p = getAllIdMod();
        idrandomd = Math.random().toString(36).substr(2);

        var fdata = new FormData();
        var files = $('#txt_file')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "Oracle_HDDT");
        fdata.append("insertto", "HD_TEMP_CMISS");
        fdata.append("idrandom", idrandomd);
        
        var config = { callback: "f_result_insertCaFile_thietlap" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}
function f_result_insertCaFile_thietlap(config,para,lst)
{

    try{
        var data = lst.data;
        var row = data[0].idrandom
        if (row == idrandomd) {
            setTimeout(function () { loadkhachhang_tl(1); }, 3000);
        } else {
            messInfo("messinfo_thietlap", "Không có dữ liệu hiển thị", 'error');
            $("#nhapkhachhang_tl").hide();
        }
     
    } catch (e) {
        console.log(e);
    }
}
function checkvaidate_nhapcmis() {
    try {
        var p = getAllIdMod();
        if (p.txt_file == '') return "Bạn chưa chọn file";
        var filePath = $('#txt_file')[0].files[0].name;
        var data = filePath.split('.');
        if (data[1] != 'xml') return "Không đúng đinh dạng file xml";
        if (p.txtFixday == "") return "Ngày chốt ko được bỏ trống";
     
        return "";
    } catch (e) {
        console.log(e);
    }
}
function loadkhachhang_tl(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THIETLAPCHOT.DANHSACHKHACHHANG", callback: "f_result_f_nhapkhachhang_tl" };
        var para = {
            v_IDRAMDOM: idrandomd,
            v_pagenum:page,
            v_numrecs:countpage,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_f_nhapkhachhang_tl(config, para, lst) {
    try {
        $("#anhload").hide();
        var data = lst.data;
        if (data == "" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_thietlap", "Không có dữ liệu hiển thị", 'error');
            $("#nhapkhachhang_tl").hide();
            return;
        }
        messInfo("messinfo_thietlap", "", 'error');
        $("#nhapkhachhang_tl").show();
        $("#table_tl").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.ma_ddo) + "</td><td>"
                + setnull(val.SERY_CTO) + "</td><td>"
                 + setnull(val.ten_khang) + "</td><td>"
                + setnull(val.sery_cto) + "</td></tr>";
              
            $("#table_tl").append(row);
        });

    } catch (e) {
        console.log(e);
    }
}
function capnhatkhachhang_tl() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var thang = "01/"+ p.date_thang;
        var apdung = $("#ck_allyear").is(':checked') == true ? 1 : 0;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THIETLAPCHOT.CAPNHATTHIETLAP", callback: "result_capnhatkhachhang_tl" };
        var para = {
            v_IDRAMDOM:idrandomd,
            v_ngaythietlap:p.txtFixday,
            v_ky:p.sokychot,
            v_thangnam: thang,
            v_apdung: apdung,
            v_userId:userinfo.userid,
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_capnhatkhachhang_tl(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_thietlap", row, 'ok');
        } else {
            messInfo("messinfo_thietlap", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}