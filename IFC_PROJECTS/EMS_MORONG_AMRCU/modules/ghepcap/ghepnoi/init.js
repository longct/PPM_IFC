var itemCount = 0;
var paraTable_ghepnoi = [];
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        loaddatabasebandau_ghepnoi();
        $("#btnCapNhat_ghepnoi").click(function () {
            f_confimYesNo("Cập nhật ghép nối?", "Bỏ qua", "Đồng ý",
                function () { f_ExcuteDatabase_ghepnoi("TB_GROUP_INSERTGHEPNOI", "f_resultCapNhatDatabase_ghepnoi") });
        });


    } catch (e) { console.log(e); }
});

//============================================================ XY LY CAC CHUC NANG==========================================================

// doc file excel
function f_UploadFile_ghepnoi() {
    try {
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_chonexecl_ghepnoi").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_ghepnoi", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_ghepnoi" };
        
        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_ghepnoi(config, para, lst) {
    try {
        console.log(lst);
        paraTable_ghepnoi = [];


        var p = getAllIdMod();
        $.each(lst.data, function (key, val) {            
            var temp = {
                TypeDeviceId: "",
                VendorId: "",
                SeriesDivice1: val.series1,
                SeriesDivice2: val.series2,
                CountDivice: 1,
                StatusDivice: "",
                Stt: key
            };
            paraTable_ghepnoi.push(temp);
        });

        setTimeout(
        f_ExcuteDatabase_ghepnoi("TB_GROUP_CHECKSAME", "f_resultCheckTrungTB_ghepnoi"), 1000);
    } catch (e) { console.log(e); }
}

// excute database

function f_ExcuteDatabase_ghepnoi(namesql, calkBackTo) {
    try {

        if (paraTable_ghepnoi == null || paraTable_ghepnoi == undefined || paraTable_ghepnoi == "" || paraTable_ghepnoi == "[]" || paraTable_ghepnoi.length == 0) {
            messInfo("messinfo_ghepnoi", "Không có dữ liệu, vui lòng kiểm tra", "error");
            return;
        }
        
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_ghepnoi) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
       

        var para = {
           VoiceCode: p.txtMaphieu_ghepnoi
         , UserId: user.userid
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}

function f_resultCheckTrungTB_ghepnoi(config, para, lst) {
    try {
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0].kq0.length > 0) {
            // check trung loi vao day
            localStorage.setItem("loi_ghepnoi", JSON.stringify(lst.data[1].kq1));
            messInfo("messinfo_ghepnoi", lst.data[0].kq0[0].result, "error");
            f_drowCheckTrung_ghepnoi(lst.data[1].kq1);
            $("#btnCapNhat_ghepnoi").attr("disabled", "disabled");
            
        }
        else {
            // check trung ok moi xuong day  
            messInfo("messinfo_ghepnoi", "", "ok");
            f_drawOk_ghepnoi(paraTable_ghepnoi);
            $("#btnCapNhat_ghepnoi").removeAttr("disabled");
        }
    } catch (e) {
        console.log(e);
    }
}

function f_resultCapNhatDatabase_ghepnoi(config, para, lst) {
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_ghepnoi", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_ghepnoi", lst.data[0].result, "ok");
            paraTable_ghepnoi = [];
            loaddatabasebandau_ghepnoi();
        }
        else
            messInfo("messinfo_ghepnoi", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}

function f_drawOk_ghepnoi(data) {
    try {
        $("#grview_ghepnoi tbody").empty();
        $.each(data, function (key, val) {
            var tr = "<tr>";
            tr += "<td>" + (key + 1) + "</td>";
            tr += "<td>" + val.SeriesDivice1 + "</td>";
            tr += "<td>" + val.SeriesDivice2 + "</td>";
            tr += "</tr>";
            $("#grview_ghepnoi tbody").append(tr);
        });
    } catch (e) { console.log(e); }
}

function f_drowCheckTrung_ghepnoi(data) {
    try {
        
        $("#grview_ghepnoi tbody").empty();
        $.each(data, function (key, val) {
            var tr = "<tr>";
            tr += "<td>" + (key + 1) + "</td>";
            tr += "<td>" + val.seriesdivice1 + "</td>";
            tr += "<td>" + val.seriesdivice2 + "</td>";
            tr += "</tr>";
            $("#grview_ghepnoi tbody").append(tr);
        });
    } catch (e) { console.log(e); }
}



//============================================================KET THUC XY LY CAC CHUC NANG==========================================================



//============================================================ LOAD CAC CONTROL==========================================================
// load ra list du lieu ban dau
function loaddatabasebandau_ghepnoi() {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddulieu_ghepnoi", connstr: "ConnectEMS" };
        var para = { IsType: 'GN_MAPHIEU', Code: "" };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddulieu_ghepnoi(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0)
            return;
        var data = lst.data;
        setValToTxt("txtMaphieu_ghepnoi",data[0].voicecode) ;

    } catch (e) {
        console.log(e);
    }
}

//============================================================KET THUC LOAD CAC CONTROL==========================================================


