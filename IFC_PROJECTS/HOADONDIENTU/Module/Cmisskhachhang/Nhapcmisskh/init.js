var idrandom;
var countpage = 1000;
$(document).ready(function () {
    try {
        loadchecklog_master();
        donvi_cmiss();
        $("#nhapkhachhangcmiss").hide();
        $("#btn_khachang_cmiss").click(function () {
           
            var check = checkvaidate_nhapcmis();
            if (check != "") {
                messInfo("messinfo_nhapcmiss", check, 'error');
                //$("#nhapkhachhangcmiss").hide();
                return;
            }
            capnhatchitiet_cachot();
        });



    } catch (e) {
        console.log(e);
    }
});


function f_insertCaFile_ckh(thiss) {
    try {
        $("#anhload").show();
        // var p = getAllIdMod();
        idrandom = Math.random().toString(36).substr(2);

        var fdata = new FormData();
        var files = $('#txt_file_cmiss')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "Oracle_HDDT");
        fdata.append("insertto", "HD_TEMP_CMISS");
        fdata.append("idrandom", idrandom);
        
        var config = { callback: "f_result_insertCaFile_ckh" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}

function f_result_insertCaFile_ckh(config,para,lst)
{

    try{
        var data = lst.data;
        var row =   data[0].idrandom
        if (row == idrandom) {
            setTimeout(function () { loadkhachhangcmiss(1); }, 3000);
        } else {
            messInfo("messinfo_nhapcmiss", "Không có dữ liệu hiển thị", 'error');
            $("#nhapkhachhangcmiss").hide();
        }
     
    } catch (e) {
        console.log(e);
    }
}

function checkvaidate_nhapcmis() {
    try {
        var p = getAllIdMod();
        if (p.txt_file_cmiss == '') return "Bạn chưa chọn file";
        var filePath = $('#txt_file_cmiss')[0].files[0].name;
        var data = filePath.split('.');
        if (data[1] != 'xml') return "Không đúng đinh dạng file xml";
        if (p.cb_soghihd_cmiss == "-1") return "Vui lòng chọn đơn vị";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function donvi_cmiss() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVICMIS", callback: "result_lst_donvi_cmiss" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvi_cmiss(config, para, lst) {
    try {
        var data = lst.data;

        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_soghihd_cmiss", data, "id", "ten", "-1", "Vui lòng chọn đơn vị");
        $('select#cb_soghihd_cmiss').find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("---- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("------- " + text);
            }
            if ($(this).val().length == 10) {
                text = $(this).text();
                $(this).text("--------- " + text);
            }
            if ($(this).val().length == 12) {
                text = $(this).text();
                $(this).text("----------- " + text);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function apgia_cmiss() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_APGIA", callback: "result_apgia_cmisss" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_apgia_cmisss(config, para, lst) {
    try {
        var data = lst.data;

        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCobClass("cbchitiet_apgia", data, "id", "ten", "-1", "Vui lòng áp giá");
     
    } catch (e) {
        console.log(e);
    }
}

function loadkhachhangcmiss(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCMISS.DANHSACHKHACHHANG", callback: "f_result_f_nhapkhachhang_cmisskh" };
        var para = {
            v_IDRAMDOM:idrandom,
            v_pagenum:page,
            v_numrecs:countpage,
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
            messInfo("messinfo_nhapcmiss", "Không có dữ liệu hiển thị", 'error');
            $("#nhapkhachhangcmiss").hide();
            return;
        }
        messInfo("messinfo_nhapcmiss", "", 'error');
        $("#nhapkhachhangcmiss").show();
        $("#table_ldapgia").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr id_auto='" + val.ma_ddo + "'><td>"
                + val.stt + "</td><td>"
                + setnull(val.ma_ddo) + "</td><td>"
                + setnull(val.ten_khang) + "</td><td>"
                + setnull(val.sery_cto) + "</td><td>"
                  + "<select class='form-control input-sm m-bot15 cbchitiet_apgia " + val.apgiakhach + "' value='" + val.apgiakhach + "'> </select>" + "</td> </tr>";

            $("#table_ldapgia").append(row);
        });

        $("#nhapkhachhangcmiss").append("<div class='bottom-mar-50'></div>");
        setTimeout(function () { apgia_cmiss(); }, 1000);


    } catch (e) {
        console.log(e);
    }
}

///cap nhat
function capnhatchitiet_cachot() {
    try {

        var paraa = [];
        $('#table_ldapgia tr').each(function () {
            var info = { madiemdo: $(this).attr("id_auto"), apgia: $(this).find('.cbchitiet_apgia').first().val() };
            paraa.push(info);
        });
        var data = paraa;
        var lstId = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].madiemdo != null) {
                var ID = {
                    cot1: data[i].madiemdo,
                    cot2: data[i].apgia,
                    cot3: 'CAPNHATCMISS'
                };
                lstId.push(ID);
            } else {
                messInfo("messinfo_nhapcmiss", 'Cập nhật chỉ số không đúng', "error");
                return;
            }
        }
        var config = {
            connstr: "Oracle_HDDT",
            insertto: "HD_TEMNHIEU",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
            capnhatkhachhang_apgias();    
        }
        else {
            messInfo("messinfo_nhapcmiss", 'Lỗi không cập bằng tay', "error");
        }


    } catch (e) {
        console.log(e);
    }
}
function capnhatkhachhang_apgias() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCMISS.UPDATEAPGIAKHACHHANG", callback: "result_capnhatkhachhang_apgias" };
        var para = {
            v_userid: userinfo.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatkhachhang_apgias(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            setTimeout(function () { capnhatkhachhang_cmiss();}, 1000);
        } else {
            messInfo("messinfo_nhapcmiss", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}

function capnhatkhachhang_cmiss() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCMISS.CAPNHATKHACHHANG", callback: "result_capnhatkhachhang" };
        var para = {
            v_IDRAMDOM: idrandom,
            v_CODE:p.cb_soghihd_cmiss,
            v_USERID:userinfo.userid,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_capnhatkhachhang(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_nhapcmiss", row, 'ok');
        } else {
            messInfo("messinfo_nhapcmiss", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}