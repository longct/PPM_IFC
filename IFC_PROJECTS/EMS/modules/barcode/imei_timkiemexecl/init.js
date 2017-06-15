var paraTable_imeitke = [];
var pageSize=10;
$(document).ready(function () {
    try {
        $("#file_execl_imeitke").change(function () {
            f_UploadFile_imeitke();
        });
        $("#btnxuatexecl_imeibctke").click(function () {
            Xuatexecl_imeitke();
          
        });
        
    } catch (e) { console.log(e); }
});

// doc file excel
function f_UploadFile_imeitke() {
    try {
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_execl_imeitke").files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_bctke", "Bạn chưa chọn file execl", "error");
            return;
        }
        messInfo("messinfo_imeitke", "", "error");
        var config = { callback: "f_resultImportExcel_imeitke" };
        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_imeitke(config, para, lst) {
    try {
        paraTable_imeitke = [];
        var p = getAllIdMod();
        $.each(lst.data, function (key, val) {
            var temp = {
                SeriesDivice: val.series
            };
            paraTable_imeitke.push(temp);
        });
       
        f_ExcuteDatabase_imeitke("TB_IMEI_TIMEXCEL", "f_resultTB_Search_TimListSeries_imeitke", 1);
       
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabase_imeitke(namesql, calkBackTo, page) {
    try {
        if (paraTable_imeitke == null || paraTable_imeitke == undefined || paraTable_imeitke == "" || paraTable_imeitke == "[]" || paraTable_imeitke.length == 0) {
            messInfo("messinfo_bctke", "Không có dữ liệu", "error");
            return;
        }
        var p = getAllIdMod();
        var dt = '{ "table": ' + JSON.stringify(paraTable_imeitke) + ' }';
        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            v_page:page,
            v_pagecount: pageSize
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
    } catch (e) {
        console.log(e);
    }
}
function f_resultTB_Search_TimListSeries_imeitke(config, para, lst) {
    try {
        clear_imeitke();
        if (lst == null || lst == undefined || lst == '[]' || lst == "" ||  lst.data.length==0) {
            messInfo("messinfo_imeitke", "Không có dữ liệu hiển thị", "error");
            return;
        }
        loadtrang_imeitke(lst);
    } catch (e) {
        console.log(e);
    }
}
function loadtrang_imeitke(lst) {
    try{
        $.each(lst.data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.rownum + "</td><td>"
                + val.mabarcode + "</td><td>"
                + val.detailbarcode + "</td><td>"
                + SetValnull(val.vattuthietbi) + "</td><td>"
                + SetValnull(val.vend_name) + "</td><td>"
                + SetValnull(val.manhacungcap) + "</td><td>"
                + val.timeinput + "</td></tr>";
            $("#grview_imeitke tbody").append(row);
        });
        
       
        $.each(lst.data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_imeitke").append(row1);
        });
        loadphantrang_imeitke(lst);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_imeitke(lst) {
    try {
        $("#pagecurent_imeitke ul").empty();
        $("#pagecurent_imeitke ul").append('<li><a  >Trang đầu</a></li>');
        $.each(lst.data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_imeitke ul").append(row2);
        });
        $("#pagecurent_imeitke ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_imeitke").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_imeitke ul li a").addClass("active");
            var p = getAllIdMod();
            f_ExcuteDatabase_bctke("TB_BARCODE_TIMEXCEL", "f_resultTB_Search_TimListSeries_bctke", page);
           
        });
    } catch (e) {
        console.log(e);
    }
}
function clear_imeitke() {
    try {
        $("#txt_tongsobanghi_imeitke").empty();
        $("#grview_imeitke tbody").empty();
    } catch (e) {
        console.log(e);
    }
}


function Xuatexecl_imeitke(){
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_IMEI_TIMEXCEL",
            namefile: "Danhsachtimkiem_imeitke",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            v_page: -1,
            v_pagecount: pageSize
        };
        var dt = '{ "table": ' + JSON.stringify(paraTable_imeitke) + ' }';
        var colum = {
            kq: [
               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "mabarcode", name: "Tên barcode", type: "Text" },
               { field: "detailbarcode", name: "Chi tiết thiết bị", type: "Text" },
               { field: "vattuthietbi", name: "Vật tư thiết bị", type: "Text" },
               { field: "vend_name", name: "Loại vật tư", type: "Text" },
               { field: "manhacungcap", name: "Mã nhà cung cấp", type: "Text" },
                { field: "timeinput", name: "Thời điểm in", type: "Text" }
            ]
        };
        api_excuteExcel_New(config, para,JSON.parse(dt), colum);
    }catch(e){
        console.log(e);
    }
}
