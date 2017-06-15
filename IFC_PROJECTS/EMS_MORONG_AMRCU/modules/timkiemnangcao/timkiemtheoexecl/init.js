var paraTable_tknctheoexecl = [];
var pageSize=10;
$(document).ready(function () {
    try {
        $("#file_execl_tknctheoexecl").change(function () {
            f_UploadFile_tknctheoexecl();
        });
        $("#btnxuatexecl_tknctheoexecl").click(function () {
            Xuatexecl_tknctheoexecl();
        });
        
    } catch (e) { console.log(e); }
});

// doc file excel
function f_UploadFile_tknctheoexecl() {
    try {
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_execl_tknctheoexecl").files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_tknctheoexecl", "Bạn chưa chọn file execl", "error");
            return;
        }
        messInfo("messinfo_tknctheoexecl", "", "error");
        var config = { callback: "f_resultImportExcel_tknctheoexecl" };
        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_tknctheoexecl(config, para, lst) {
    try {
        paraTable_tknctheoexecl = [];
        var p = getAllIdMod();
        $.each(lst.data, function (key, val) {
            var temp = {
                SeriesDivice: val.series
            };
            paraTable_tknctheoexecl.push(temp);
        });
        f_ExcuteDatabase_tknctheoexeclmoi("TB_Search_TimListSeries", "f_resultTB_Search_TimListSeries_tknctheoexeclmoi", -1);
        f_ExcuteDatabase_tknctheoexecl("TB_Search_TimListSeries", "f_resultTB_Search_TimListSeries_tknctheoexecl", 1);
       
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabase_tknctheoexecl(namesql, calkBackTo, page) {
    try {
        if (paraTable_tknctheoexecl == null || paraTable_tknctheoexecl == undefined || paraTable_tknctheoexecl == "" || paraTable_tknctheoexecl == "[]" || paraTable_tknctheoexecl.length == 0) {
            messInfo("messinfo_tknctheoexecl", "Không có dữ liệu", "error");
            return;
        }
        var p = getAllIdMod();
        var dt = '{ "table": ' + JSON.stringify(paraTable_tknctheoexecl) + ' }';
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
function f_resultTB_Search_TimListSeries_tknctheoexecl(config, para, lst) {
    try {
        var data = lst.data;
        if (data[0].kq0 == '[]' || data[0].kq0 == "" || data[0].kq0 == null || data[0].kq0.length == 0) {
            messInfo("messinfo_tknctheoexecl", "Không có dữ liệu hiển thị", "error");
            clear_tknctheoexecl();
            return;
        }
        loadtrang_tknctheoexecl(data);
    } catch (e) {
        console.log(e);
    }
}
function loadtrang_tknctheoexecl(data) {
    try{
        $("#TableData_tknctheoexecl").empty();
        var rows = "<tr><th>STT</th><th>Vật Tư</th><th>Loại Vật Tư</th><th>Vị Trí Hiện Tại</th><th>Người Quản Lý</th><th>Tình Trạng Thiết Bị</th><th>Serial</th><<th>Mã Vận Đơn</th><th>Dự Án</th><th>Ngày Giao Nhận Cuối</th></tr>";
        $("#TableData_tknctheoexecl").html(rows);
        $("#myTableData_tknctheoexecl").empty();;
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.rownum + "</td><td>"
                + val.tenvattu + "</td><td>"
                + val.mavattu + "</td><td>"
                + val.tenkho + "</td><td>"
                + val.fullname + "</td><td>"
                + val.trangthai + "</td><td>"
                + val.seriesdivice + "</td><td>"
                + val.trackingnumber + "</td><td>"
                + SetValnull(val.projectname) + "</td><td>"
                + val.bhtimeend + "</td></tr>";
            $("#myTableData_tknctheoexecl").append(row);
        });
        $("#txt_tongsobanghi_tknctheoexecl").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_tknctheoexecl").append(row1);
        });
        loadphantrang_tknctheoexecl(data);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_tknctheoexecl(data) {
    try {
        $("#pagecurent_tknctheoexecl ul").empty();
        $("#pagecurent_tknctheoexecl ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_tknctheoexecl ul").append(row2);
        });
        $("#pagecurent_tknctheoexecl ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_tknctheoexecl").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_tknctheoexecl ul li a").addClass("active");
            var p = getAllIdMod();
            f_ExcuteDatabase_tknctheoexecl("TB_Search_TimListSeries", "f_resultTB_Search_TimListSeries_tknctheoexecl", page);
            //f_ExcuteDatabase_tknctheoexecl(page);
        });
    } catch (e) {
        console.log(e);
    }
}
function clear_tknctheoexecl() {
    try {
        $("#txt_tongsobanghi_tknctheoexecl").empty();
        $("#TableData_tknctheoexecl").empty();
        $("#myTableData_tknctheoexecl").empty();;
    } catch (e) {
        console.log(e);
    }
}



function f_ExcuteDatabase_tknctheoexeclmoi(namesql, calkBackTo, page) {
    try {
        var p = getAllIdMod();
        var dt = '{ "table": ' + JSON.stringify(paraTable_tknctheoexecl) + ' }';
       // var config = { namesql: 'TB_Search_TimListSeries', callback: 'f_resultTB_Search_TimListSeries_tknctheoexeclmoi', connstr: "ConnectEMS" };
        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            v_page: page,
            v_pagecount: pageSize
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
    } catch (e) {
        console.log(e);
    }
}
function f_resultTB_Search_TimListSeries_tknctheoexeclmoi(config, para, lst) {
    try {
        var data = lst.data;
        localStorage.setItem("para_tknctheoexeclmoi", JSON.stringify(lst.data[0].kq0));
    } catch (e) {
        console.log(e);
    }
}
function Xuatexecl_tknctheoexecl(){
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Search_TimListSeries",
            namefile: "Danhsachtimkiem_tknctheoexecl",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = JSON.parse(localStorage.getItem("para_tknctheoexeclmoi"));
        var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var colum = {
            kq: [
               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "tenvattu", name: "Tên vật tư", type: "Text" },
               { field: "mavattu", name: "Mã vật tư", type: "Text" },
               { field: "tenkho", name: "Series", type: "Text" },
               { field: "fullname", name: "Người quản lý", type: "Text" },
                { field: "trangthai", name: "Tình Trạng Thiết Bị", type: "Text" },
                { field: "seriesdivice", name: "Serial", type: "Text" },
               { field: "trackingnumber", name: "Mã Vận Đơn", type: "Text" },
               { field: "projectname", name: "Dự Án", type: "Text" },
               { field: "bhtimeend", name: "Ngày Giao Nhận Cuối", type: "Text" }
            ]
        };
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    }catch(e){
        console.log(e);
    }
}