var paraTable_gbcexcel = [];
$(document).ready(function () {
    try {

        loadConetent();
        $("#btnThucHien_gbcexcel").click(function () {
            f_ExcuteDatabase_gbcexcel("TB_GROUP_GOBO_GOBOEXCEL", "f_resultGoBoCap_gbcexcel")
        });

    } catch (e) { console.log(e); }
});

// doc file excel
function f_UploadFile_gbcexcel() {
    try {
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_chonexecl_gbcexcel").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_gbcexcel", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_gbcexcel" };

        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_gbcexcel(config, para, lst) {
    try {
        paraTable_gbcexcel = [];
        var p = getAllIdMod();
        $.each(lst.data, function (key, val) {
            var temp = {
                typedeviceid: "",
                vendorid: "",
                seriesdivice1: val.series1,
                seriesdivice2: val.series2,
                countdivice: 1,
                statusdivice: "",
                stt: key
            };
            paraTable_gbcexcel.push(temp);
        });
        setTimeout(
        f_ExcuteDatabase_gbcexcel("TB_GROUP_GOBO_CHECKTRUNGEXCEL", "f_resultCheckTrungImportExcel_gbcexcel"), 1000);
    } catch (e) { console.log(e); }
}


function f_ExcuteDatabase_gbcexcel(namesql, calkBackTo) {
    try {

        if (paraTable_gbcexcel == null || paraTable_gbcexcel == undefined || paraTable_gbcexcel == "" || paraTable_gbcexcel == "[]" || paraTable_gbcexcel.length == 0) {
            messInfo("messinfo_gbcexcel", "Không có dữ liệu, vui lòng kiểm tra", "error");
            return;
        }

        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_gbcexcel) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };

        var para = {
          UserId: user.userid
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}


function f_resultCheckTrungImportExcel_gbcexcel(config, para, lst) {
    try {
        //if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0].kq0 != null && lst.data[0].kq0 != undefined && lst.data[0].kq0.length > 0) {
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data[0].kq0 != null && lst.data[0].kq0 != undefined && lst.data[0].kq0.length > 0) {
            // check trung loi vao day  
                messInfo("messinfo_gbcexcel", lst.data[0].kq0[0].result, "error");
                f_drawOk_gbcexcel(lst.data[1].kq1);
                $("#btnThucHien_gbcexcel").attr("disabled", "disabled");
        }
        else {
            //check trung ok moi xuong day          
            messInfo("messinfo_gbcexcel", "", "ok");
            f_drawOk_gbcexcel(paraTable_gbcexcel);
            $("#btnThucHien_gbcexcel").removeAttr("disabled");
        }
    } catch (e) {
        console.log(e);
    }
}


function f_drawOk_gbcexcel(data) {
    try {
        $("#grview_gbcexcel tbody").empty();
        $.each(data, function (key, val) {
            var tr = "<tr>";
            tr += "<td>" + (key + 1) + "</td>";
            tr += "<td>" + val.seriesdivice1 + "</td>";
            tr += "<td>" + val.seriesdivice2 + "</td>";
            tr += "</tr>";
            $("#grview_gbcexcel tbody").append(tr);
        });
    } catch (e) { console.log(e); }
}

function f_resultGoBoCap_gbcexcel(config,para,lst)
{
    if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]" || lst.data.length == 0) {
        messInfo("messinfo_gbcexcel", "Gỡ bỏ thiết bị lỗi", "error");
        return;
    }
    else {
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_gbcexcel", lst.data[0].result, "ok");
            paraTable_gbcexcel = [];
        }
        else
            messInfo("messinfo_gbcexcel", lst.data[0].result, "error");
    }
}