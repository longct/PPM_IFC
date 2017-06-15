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
        $("#file_execl_tknctheoexecl").click(function () {
            $("#file_execl_tknctheoexecl").val("");
            $("#btnxuatexecl_tknctheoexecl").attr("disabled", "disabled");
            $("#mgs_notdatakho").hide();
        });
    } catch (e) { console.log(e); }
});

// doc file excel
function f_UploadFile_tknctheoexecl() {
    try {
      
        paraTable_tknctheoexecl = [];
        if (localStorage.getItem("para_tknctheoexeclmoi")) {
            localStorage.removeItem("para_tknctheoexeclmoi");
        }
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_execl_tknctheoexecl").files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", " ");//order by STT
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
 
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_tknctheoexecl", "Không có dữ liệu", "error");
            return;
        }
        paraTable_tknctheoexecl = [];
        var p = getAllIdMod();
        var data = lst.data;
        if (data.length <= 5000) {
            $.each(data, function (key, val) {
                var temp = {
                    SeriesDivice: val.series,
                    Stt: val.stt
                };
                paraTable_tknctheoexecl.push(temp);
               
            });
           
            f_ExcuteDatabase_tknctheoexeclmoi("TB_Search_TimListSeries", "f_resultTB_Search_TimListSeries_tknctheoexeclmoi", -1);
            f_ExcuteDatabase_tknctheoexecl("TB_Search_TimListSeries", "f_resultTB_Search_TimListSeries_tknctheoexecl", 1);
        } else {
            messInfo("messinfo_tknctheoexecl", "File excel tối đa 5000 serial", "error");
        }
       
       
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabase_tknctheoexecl(namesql, calkBackTo, page) {
    try {
       
        if (paraTable_tknctheoexecl.length == 0) {
            messInfo("messinfo_tknctheoexecl", "Không có dữ liệu hiển thị", "error");
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
        //imei không có trong kho
        var datanotkho = data[3].kq3;
        if (datanotkho.length > 0 && data[0].kq0.length == 0) {
            $("#mgs_notdatakho").empty();
            $("#mgs_notdatakho").show();
            var divnotkho = "<span>Có <b>" + datanotkho.length + "</b> thiết bị không có trong kho</span>";
            divnotkho += "<ul>";
            $.each(datanotkho, function (key, val) {
                divnotkho += "<li>" + val.rownum + ": " + val.seriesdivice + "</li>";
            });
            $("#mgs_notdatakho").append(divnotkho);
            return;
        }
        else {
            if (data[0].kq0 == '[]' || data[0].kq0 == "" || data[0].kq0 == null || data[0].kq0.length == 0) {
                messInfo("messinfo_tknctheoexecl", "Không có dữ liệu hiển thị", "error");
                clear_tknctheoexecl();
                return;
            }

            loadtrang_tknctheoexecl(data);
        }
    } catch (e) {
        console.log(e);
    }
}
function loadtrang_tknctheoexecl(data) {
    try {
        $("#btnxuatexecl_tknctheoexecl").removeAttr("disabled");
        $("#mgs_notdatakho").hide();
        $("#TableData_tknctheoexecl").empty();
        
        var rows = "<tr><th>STT</th>"+
                    "<th>IMEI</th>"+
                    "<th>Serial sim</th>"+
                    //"<th>Mã VTTB</th>"+
                    //"<th>Tên thiết bị</th>" +
                    "<th>Kho hiện Tại</th>" +
                    //"<th>Người Quản Lý</th>" +
                    "<th>Dự Án</th>" +
                    "<th>Nhà cung cấp</th>" +
                    "<th>Mã hợp đồng</th>" +
                    "<th>Tình Trạng TB</th>" +
                    "<th>Số điện thoại</th>"+
                    "<th>TG nhập TB vào kho</th>" +
                    "<th>TG kích hoạt sim</th>" +
                    "<th>TG bắt đầu bảo hành</th>" +
                    "<th>TG kết thúc bảo hành</th>" +
                    "<th>Nhà mạng</th>" +
                    "<th>Version Modem</th></tr>";
        $("#TableData_tknctheoexecl").html(rows);
        $("#myTableData_tknctheoexecl").empty();;
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.rownum + "</td><td  class='c w'>"
                + val.seriesmodem + "</td><td  class='c'>"
                + val.seriessim + "</td><td  class='c'>"
                //+ val.mavattu + "</td><td class='w'>"
                //+ val.tenvattu + "</td><td class='w'>"
                + val.tenkho + "</td><td class='w'>"
                //+ val.fullname + "</td><td class='w'>"
                + SetValnull(val.projectname) + "</td><td class='w'>"
                + SetValnull(val.tennhacungcap) + "</td><td  class='c w'>"
                + val.trackingnumber + "</td><td  class='c w'>"
                + val.trangthai + "</td><td  class='c'>"
                + val.phone + "</td><td  class='c'>"
                + val.timeinput + "</td><td  class='c'>"
                + val.timeactive + "</td><td  class='c'>"
                + val.bhtimestart + "</td><td  class='c'>"
                + val.bhtimeend + "</td><td  class='c'>"
                + val.nhamang + "</td><td  class='c'>"
                + val.version + "</td></tr>";
            $("#myTableData_tknctheoexecl").append(row);
        });
        $("#txt_tongsobanghi_tknctheoexecl").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_tknctheoexecl").append(row1);
        });
        loadphantrang_tknctheoexecl(data);
        //imei không có trong kho
        var datanotkho = data[3].kq3;
        if (datanotkho.length > 0) {
            $("#mgs_notdatakho").empty();
            $("#mgs_notdatakho").show();
            var divnotkho = "<span>Có <b>" + datanotkho.length + "</b> thiết bị không có trong kho</span>";
            divnotkho += "<ul>";
            $.each(datanotkho,function(key,val){
                divnotkho += "<li>" + val.rownum +": " + val.seriesdivice + "</li>";
            });
            $("#mgs_notdatakho").append(divnotkho);
        }
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
        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            v_page: 1,
            v_pagecount: 10000
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
    } catch (e) {
        console.log(e);
    }
}
function f_resultTB_Search_TimListSeries_tknctheoexeclmoi(config, para, lst) {
    try {
        var data = lst.data;
        if(lst ==null || lst=="[]" || lst==undefined) return;
      
        localStorage.setItem("para_tknctheoexeclmoi",JSON.stringify(data[0].kq0));
    } catch (e) {
        console.log(e);
    }
}
function Xuatexecl_tknctheoexecl() {
    try {
       
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Search_TimListSeries",
            namefile: "Danhsachtimkiem_tknctheoexecl",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = localStorage.getItem("para_tknctheoexeclmoi");
        
        var dt = '{ "data": ' +para + ' }';
        var colum = {
            kq: [
               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "seriesmodem", name: "IMEI", type: "Text" },
               { field: "seriessim", name: "Serial sim", type: "Text" },
               //{ field: "mavattu", name: "Mã vật tư", type: "Text" },
               //{ field: "tenvattu", name: "Tên vật tư", type: "Text" },
               { field: "tenkho", name: "Kho hiện Tại", type: "Text" },
               //{ field: "fullname", name: "Người quản lý", type: "Text" },
               { field: "projectname", name: "Dự Án", type: "Text" },
               { field: "tennhacungcap", name: "Nhà cung cấp", type: "Text" },
               { field: "trackingnumber", name: "Mã hợp đồng", type: "Text" },
               { field: "trangthai", name: "Tình Trạng Thiết Bị", type: "Text" },
               { field: "phone", name: "Số điện thoại", type: "Text" },
               { field: "timeinput", name: "TG nhập TB vào kho", type: "Text" },
               { field: "timeactive", name: "TG kích hoạt sim", type: "Text" },
               { field: "bhtimestart", name: "TG bắt đầu bảo hành", type: "Text" },
               { field: "bhtimeend", name: "TG kết thúc bảo hành", type: "Text" },
               { field: "nhamang", name: "Nhà mạng", type: "Text" },
               { field: "version", name: "Version Modem", type: "Text" },
               
            ]
        };
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    }catch(e){
        console.log(e);
    }
}