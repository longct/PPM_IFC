var paraTable_bctke = [];
var pageSize=10;
$(document).ready(function () {
    try {
        $("#file_execl_bctke").change(function () {
            f_UploadFile_bctke();
        });
        $("#btnxuatexecl_bctke").click(function () {
            Xuatexecl_bctke();
          
        });
        
    } catch (e) { console.log(e); }
});

// doc file excel
function f_UploadFile_bctke() {
    try {
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_execl_bctke").files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_bctke", "Bạn chưa chọn file execl", "error");
            return;
        }
        messInfo("messinfo_bctke", "", "error");
        var config = { callback: "f_resultImportExcel_bctke" };
        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_bctke(config, para, lst) {
    try {
        paraTable_bctke = [];
        var p = getAllIdMod();
        $.each(lst.data, function (key, val) {
            var temp = {
                SeriesDivice: val.series
            };
            paraTable_bctke.push(temp);
        });
        f_ExcuteDatabase_bctke("TB_BARCODE_TIMEXCEL", "f_resultTB_Search_TimListSeries_bctke", 1);
       
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabase_bctke(namesql, calkBackTo, page) {
    try {
        if (paraTable_bctke == null || paraTable_bctke == undefined || paraTable_bctke == "" || paraTable_bctke == "[]" || paraTable_bctke.length == 0) {
            messInfo("messinfo_bctke", "Không có dữ liệu", "error");
            return;
        }
        var p = getAllIdMod();
        var dt = '{ "table": ' + JSON.stringify(paraTable_bctke) + ' }';
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
function f_resultTB_Search_TimListSeries_bctke(config, para, lst) {
    try {
        clear_bctke();
        if (lst == null || lst == undefined || lst == '[]' || lst == "" ||  lst.data.length==0) {
            messInfo("messinfo_bctke", "Không có dữ liệu hiển thị", "error");            
            return;
        }
        loadtrang_bctke(lst);
    } catch (e) {
        console.log(e);
    }
}
function loadtrang_bctke(lst) {
    try{
        $.each(lst.data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.rownum + "</td><td>"
                + val.mabarcode + "</td><td>"
                + val.detailbarcode + "</td><td>"
                + SetValnull(val.vend_name) + "</td><td>"
                + SetValnull(val.manhacungcap) + "</td><td>"
                + val.timeinput + "</td></tr>";
            $("#grview_bctke tbody").append(row);
        });
        
       
        $.each(lst.data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_bctke").append(row1);
        });
        loadphantrang_bctke(lst);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_bctke(lst) {
    try {
        $("#pagecurent_bctke ul").empty();
        $("#pagecurent_bctke ul").append('<li><a  >Trang đầu</a></li>');
        $.each(lst.data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_bctke ul").append(row2);
        });
        $("#pagecurent_bctke ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_bctke").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_bctke ul li a").addClass("active");
            var p = getAllIdMod();
            f_ExcuteDatabase_bctke("TB_BARCODE_TIMEXCEL", "f_resultTB_Search_TimListSeries_bctke", page);
            //f_ExcuteDatabase_bctke(page);
        });
    } catch (e) {
        console.log(e);
    }
}
function clear_bctke() {
    try {
        $("#txt_tongsobanghi_bctke").empty();
        $("#grview_bctke tbody").empty();
    } catch (e) {
        console.log(e);
    }
}


function Xuatexecl_bctke(){
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BARCODE_TIMEXCEL",
            namefile: "Danhsachtimkiem_bctke",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            v_page: -1,
            v_pagecount: pageSize
        };
        var dt = '{ "table": ' + JSON.stringify(paraTable_bctke) + ' }';
        var colum = {
            kq: [
               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "mabarcode", name: "Tên barcode", type: "Text" },
               { field: "detailbarcode", name: "Chi tiết thiết bị", type: "Text" },
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
