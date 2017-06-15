var itemCount = 0;
var paraTable_xuatexcel = [];
var manggiatrixuatexcel = [];
var checkkiemtra = 0;
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        loaddatabasebandau_xuatexcel();
        $("#cbloainhapxuat_xuatexcel").change(function () {

            clearthanhcong_xuatexcel();
            f_thaydoitenlable_xuatexcel();
            var p = getAllIdMod();
            if (p.cbloainhapxuat_xuatexcel != "-1") {
                f_loadkho();
            }
        });
        $("#cb_toikho_xuatexcel").change(function () {
            $("#grvnhapkhotrung_xuatexcel").hide();
            if ($("#cb_toikho_xuatexcel").val().length == 8) {
                $("#cb_project_xuatexcel").removeAttr("disabled");
            } else {
                $("#cb_project_xuatexcel").attr("disabled", true);
            }
            loaduserkho_xuatexcel();
            loadtrangthai_xuatexcel();
            
        });

      
        $("#btn_them_xuatexcel").click(function () {
            itemCount++;
            f_addThemTBChoValue_xuatexcel();
        });
        $("#btnCapNhat_xuatexcel").click(function () {

            var check = checkkytunull_xuatexcel();
            if (check != "") {
                messInfo("messinfo_xuatexcel", check, "error");
                return;
            }
            if (check == 0) {
                f_CheckFile_xuatexcel("TB_Export_CheckSameInHard_Excel", "f_resultCheckTrungTB_xuatexcel");
            }

            f_confimYesNo("Cập nhật phiếu xuất?", "Bỏ qua", "Đồng ý",
                function () {
                    $("#btnCapNhat_xuatexcel").attr("disabled", "disabled");
                    f_ExcuteDatabase_xuatexcel("TB_Export_WaitInHard", "f_resultCapNhatDatabase_xuatexcel")
                });
        });

       
        $("#btnXuatExecl_xuatexcel").click(function () {
            try{
                Xuatexecl_xuatexecl();
            } catch (e) {
                console.log(e);
            }
        });
        $("#btnkiemtra_xuatexcel").click(function () {
            messInfo("messinfo_xuatexcel", "", "error");
            messInfo("messinfo_xuatexcel", "", "ok");
            var check = checkkytunull_xuatexcel();
            if (check != "") {
                messInfo("messinfo_xuatexcel", check, "error");
                return;
            }

            f_CheckFile_xuatexcel("TB_Export_CheckSameInHard_Excel", "f_resultCheckTrungTB_xuatexcel");
        });
        $("#file_chonexecl_xuatexcel").click(function () {
            $("#file_chonexecl_xuatexcel").val("");
        });
    } catch (e) { console.log(e); }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
//Load Trang thai
function loadtrangthai_xuatexcel() {
    try {
        // load trang thai thiet bi
        var p = getAllIdMod();
        var code = "";
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_Xuatexcel", connstr: "ConnectEMS" };
        if (p.cbloainhapxuat_xuatexcel == "4") {
            code = userInfo.code;
        } else
            code = p.cb_toikho_xuatexcel;
        var para = { IsType: "LoadTrangThaiXuat", Code: code };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_Xuatexcel(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0)
            return;
        dataToCob("cbtrangthai_xuatexcel", lst.data, "code", "name", "-1", "--Chọn trạng thái--");
    } catch (e) {
        console.log(e);
    }
}
// doc file excel
function f_UploadFile_xuatexcel() {
    try {
        messInfo("messinfo_xuatexcel", "", "error");
        messInfo("messinfo_xuatexcel", "", "ok");
        $("#grview_xuatexcel").hide();
        $("#grvnhapkhotrung_xuatexcel").hide();
        $("#grview_xuatexcel tbody").empty();
        $("#grvnhapkhotrung_xuatexcel tbody").empty();

        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_chonexecl_xuatexcel").files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_xuatexcel", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_xuatexcel" };
        
        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_xuatexcel(config, para, lst) {
    try {
       
        paraTable_xuatexcel = [];
        var p = getAllIdMod();
        var ii = 0;
        $.each(lst.data, function (key, val) {
            if (val.series1 != undefined || val.series2 != undefined) {
                var temp = {
                    TypeDeviceId: "",
                    VendorId: "",
                    SeriesDivice1: val.series1,
                    SeriesDivice2: val.series2,
                    CountDivice: 1,
                    StatusDivice: 1,
                    Stt: key
                };
                paraTable_xuatexcel.push(temp);
                ii++;
            }
          
           
        });
        if (ii == 0) {
            messInfo("messinfo_xuatexcel", "Không có dữ liệu, Vui lòng chọn file excel", "error");
        } else {
            f_drawOk_xuatexcel(paraTable_xuatexcel);

        }
    } catch (e) { console.log(e); }
}
//checkfile execl
function f_CheckFile_xuatexcel(namesql, calkBackTo) {
    if (paraTable_xuatexcel == null || paraTable_xuatexcel == undefined || paraTable_xuatexcel == "" || paraTable_xuatexcel == "[]" || paraTable_xuatexcel.length == 0) {
        messInfo("messinfo_xuatexcel", "Không có dữ liệu, vui lòng chọn file excel", "error");
        return;
    }
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var p = getAllIdMod();

    var dt = '{ "table": ' + JSON.stringify(paraTable_xuatexcel) + ' }';

    var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };

    var CodeStockFrom = "";
    var CodeStockTo = "";
    var UserIdFrom = "";
    var UserIdTo = "";
    if (p.cbloainhapxuat_xuatexcel == "5" && user.code.length == 4) {

        CodeStockFrom = p.cb_toikho_xuatexcel
        CodeStockTo = user.code
        UserIdFrom = parseInt(p.cb_nguoiduyet_xuatexcel)
        UserIdTo = parseInt(user.userid)
    }
    else if (p.cbloainhapxuat_xuatexcel == "5" && p.cb_toikho_xuatexcel.length == 8) {
        CodeStockFrom = p.cb_toikho_xuatexcel
        CodeStockTo = user.code
        UserIdFrom = parseInt(user.userid)
        UserIdTo = parseInt(p.cb_nguoiduyet_xuatexcel)
    }
    else {
        CodeStockFrom = user.code
        CodeStockTo = p.cb_toikho_xuatexcel
        UserIdFrom = parseInt(user.userid)
        UserIdTo = parseInt(p.cb_nguoiduyet_xuatexcel)
    }
    var para = {
        TypeExport: p.cbloainhapxuat_xuatexcel
      , ProjectId: p.cb_project_xuatexcel
      , UserIdFrom: UserIdFrom
      , UserIdTo: UserIdTo
      , FileCV: p.file_bienban_xuatexcel
      , Note: p.txtlydo_xuatexcel
      , CodeStockFrom: CodeStockFrom
      , CodeStockTo: CodeStockTo
      , VendorId: -1
      , TrangThai: 1
      , CountDivice: 1
      , TypeDetailOrCount: 0
    };
    ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
}
function f_resultCheckTrungTB_xuatexcel(config, para, lst) {
    try {
        checkkiemtra = 1;
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0] != null && lst.data[0].kq0.length > 0) {
            // check trung loi vao day
            if (lst.data[0].kq0[0].result.toLowerCase().indexOf("mã phiếu đã có tồn tại") < 0) {
                messInfo("messinfo_xuatexcel", lst.data[0].kq0[0].result, "error");
                $("#btnCapNhat_xuatexcel").attr("disabled", "disabled");
                $("#btnXuatExecl_xuatexcel").removeAttr("disabled");
                $("#grvnhapkhotrung_xuatexcel").show();
                f_drowCheckTrung_xuatexcel(lst.data[1].kq1, lst.data[0].kq0[0].result);

            } else {
                f_loadMaPhieuNhap_xuatexcel();
                messInfo("messinfo_xuatexcel", "Bạn có thể xuất những thiết bị này", "ok");
                $("#grvnhapkhotrung_xuatexcel").hide();
                $("#btnCapNhat_xuatexcel").removeAttr("disabled");
                $("#grview_xuatexcel").show();
                $("#btnCapNhat_xuatexcel").removeAttr("disabled");
                $("#btnXuatExecl_xuatexcel").removeAttr("disabled");
            }
           
        }
        else {

            // check trung ok moi xuong day  
           
            messInfo("messinfo_xuatexcel", "Bạn có thể xuất những thiết bị này", "ok");
            $("#grvnhapkhotrung_xuatexcel").hide();
            $("#grview_xuatexcel").show();
            $("#btnCapNhat_xuatexcel").removeAttr("disabled");
            $("#btnXuatExecl_xuatexcel").removeAttr("disabled");
        }
    } catch (e) {
        console.log(e);
    }
}
// excute database

function f_ExcuteDatabase_xuatexcel(namesql, calkBackTo) {
    try {

        var check = checkkytunull_xuatexcel();
        if (check != "") {
            messInfo("messinfo_xuatexcel", check, "error");
            f_loadMaPhieuNhap_xuatexcel();
            return;
        }

        if (paraTable_xuatexcel == null || paraTable_xuatexcel == undefined || paraTable_xuatexcel == "" || paraTable_xuatexcel == "[]" || paraTable_xuatexcel.length == 0) {
            messInfo("messinfo_xuatexcel", "Không có dữ liệu, vui lòng kiểm tra", "error");
            return;
        }
        
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_xuatexcel) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
       
        var CodeStockFrom = "";
        var CodeStockTo = "";
        var UserIdFrom = "";
        var UserIdTo = "";
        if (p.cbloainhapxuat_xuatexcel == "5" && user.code.length == 4) {

            CodeStockFrom = p.cb_toikho_xuatexcel
            CodeStockTo = user.code
            UserIdFrom = parseInt(p.cb_nguoiduyet_xuatexcel)
            UserIdTo=parseInt(user.userid)
        }
        else if (p.cbloainhapxuat_xuatexcel == "5" && p.cb_toikho_xuatexcel.length == 8) {
            CodeStockFrom = p.cb_toikho_xuatexcel
            CodeStockTo = user.code
            UserIdFrom = parseInt(user.userid)
            UserIdTo = parseInt(p.cb_nguoiduyet_xuatexcel)
        }
        else {
            CodeStockFrom = user.code
            CodeStockTo = p.cb_toikho_xuatexcel
            UserIdFrom =parseInt(user.userid)
            UserIdTo = parseInt(p.cb_nguoiduyet_xuatexcel)
        }
        var para = {
            TypeExport: p.cbloainhapxuat_xuatexcel
            , ProjectId: p.cb_project_xuatexcel
            , UserIdFrom: UserIdFrom
            , UserIdTo: UserIdTo
            , FileCV: p.file_bienban_xuatexcel
            , Note: p.txtlydo_xuatexcel
            , CodeStockFrom: CodeStockFrom
            , CodeStockTo: CodeStockTo
            ,VendorId:-1
            ,TrangThai:parseInt(p.cbtrangthai_xuatexcel)
	        ,CountDivice:1
	        , TypeDetailOrCount: 0
            , SeriesDivice: ''
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));

    } catch (e) {
        console.log(e);
    }
}


function f_resultCapNhatDatabase_xuatexcel(config, para, lst) {
    try {
      
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_xuatexcel", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            paraTable_xuatexcel = [];
            clearthanhcong_xuatexcel();
            $("#myTableData_xuatexcel").empty();
            $("#file_chonexecl_xuatexcel").val("");
            $("#btnCapNhat_xuatexcel").attr("disabled", "disabled");
            checkkiemtra = 0;
            messInfo("messinfo_xuatexcel", lst.data[0].result, "ok");
        }
        else {
            messInfo("messinfo_xuatexcel", lst.data[0].result, "error");
            return;
        }
    } catch (e) { console.log(e); }
}

function f_drawOk_xuatexcel(data) {
    try {
        $("#grview_xuatexcel").show();
        $("#grview_xuatexcel tbody").empty();
        var i11 = 0;
        $.each(data, function (key, val) {
            var tr = "<tr>";
            tr += "<td>" + (key + 1) + "</td>";
            tr += "<td>" + SetValnullEmpty(val.SeriesDivice1) + "</td>";
            tr += "<td>" + SetValnullEmpty(val.SeriesDivice2) + "</td>";
            tr += "<td>" + SetValnullEmpty(val.thongtinthem) + "</td>";
            tr += "</tr>";
            $("#grview_xuatexcel tbody").append(tr);
            i11++;
        });
        $("#messinfo_tongbanghi").html("Tổng số bản ghi: " + i11);
        if (i11 == 0) {
            messInfo("messinfo_xuatexcel", "Vui lòng kiểm tra lại file excel", "error");
        }
    } catch (e) { console.log(e); }
}

function f_drowCheckTrung_xuatexcel(data,tile) {
    try {
        $("#grvnhapkhotrung_xuatexcel tbody").empty();
        manggiatrixuatexcel = data;
        $.each(data, function (key, val) {
            var tr = "<tr>";
            tr += "<td>" + (key + 1) + "</td>";
            tr += "<td>" + SetValnullEmpty(val.seriesdivice1) + "</td>";
            tr += "<td>" + SetValnullEmpty(val.seriesdivice2) + "</td>";
            tr += "</tr>";
            $("#grvnhapkhotrung_xuatexcel tbody").append(tr);
         
        });
        
    } catch (e) { console.log(e); }
}


function f_uploadFileMaVanDon_xuatexcel() {
    try {
        var fdata = new FormData();
        var file = document.getElementById("file_bienban_nhaptay").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        if (file == null || file == 'undefined' || file.length == 0) {
            return;
        }
        var config = { callback: "f_resultuploadFileMaVanDon_xuatexcel" };
        f_UploadFileAny(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultuploadFileMaVanDon_xuatexcel(config, para, data) {
    
}
function Xuatexecl_xuatexecl() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Export_CheckSameInHard_Excel",
            namefile: "Loi_series_xuat_execl",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var dt = '{ "data": ' + JSON.stringify(manggiatrixuatexcel) + ' }';
        var colum = {
            kq: [
               { field: "seriesdivice1", name: "Series1", type: "TextAndBoldCenter" },
               { field: "seriesdivice2", name: "Series2", type: "TextAndBoldCenter" },
            ]
        };
        
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);


    } catch (e) {
        console.log(e);
    }
}

//============================================================KET THUC XY LY CAC CHUC NANG==========================================================



//============================================================ LOAD CAC CONTROL==========================================================
// load ra list du lieu ban dau
function loaddatabasebandau_xuatexcel() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "f_result_loaddulieu_xuatexcel", connstr: "ConnectEMS" };
        var para = { Type: 'loainhapxuat', UserId: userInfo.userid };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddulieu_xuatexcel(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloainhapxuat_xuatexcel", data, "code", "name", "-1", "--Chọn loại xuất--");

    } catch (e) {
        console.log(e);
    }
}


// load du an user kho

function loaduserkho_xuatexcel() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_loadlistuserkho_xuatexcel", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadUserXuat', Code: p.cb_toikho_xuatexcel, Userid: userInfo.userid, TypeExport: p.cbloainhapxuat_xuatexcel };
        ExecuteServiceSyns(config, para, false);

        loadduan_xuatexcel();
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistuserkho_xuatexcel(config, para, lst) {
    try {
        dataToCob("cb_nguoiduyet_xuatexcel", lst.data, "code", "name", "-1", "--Chọn người duyệt--");
    } catch (e) {
        console.log(e);
    }
}
// load du an
function loadduan_xuatexcel() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_xuatexcel", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: p.cb_toikho_xuatexcel };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_xuatexcel(config, para, lst) {
    try {
        dataToCob("cb_project_xuatexcel", lst.data, "code", "name", "-1", "--Chọn dự án--");
    } catch (e) {
        console.log(e);
    }
}

function f_loadkho() {

    var userInfo = JSON.parse(localStorage.getItem("userinfo"));
    // load KHO TUONG UNG
    var p = getAllIdMod();
    var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_resultLoadKhoXuat_xuatexcel", connstr: "ConnectEMS" };
    var para = { IsType: "LoadKhoXuat", TypeExport: p.cbloainhapxuat_xuatexcel, Userid: userInfo.userid, Code: userInfo.code };

    ExecuteServiceSyns(config, para, false);
}
function f_resultLoadKhoXuat_xuatexcel(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0) {
            messInfo("messinfo_xuatexcel", "Bạn không có quyền", "error");
            clearthanhcong_xuatexcel();
            return;
        }
        dataToCob("cb_toikho_xuatexcel", lst.data, "code", "name", "-1", "--Chọn kho--");
        messInfo("messinfo_xuatexcel", "", "error");
    } catch (e) {
        console.log(e);
    }
}


function f_resultLoadTrangThai_xuatexcel(config, para, lst) {
    try {
        dataToCob("cbtrangthai_xuatexcel", lst.data, "code", "name", "-1", "--Chọn trạng thái--");
    } catch (e) {
        console.log(e);
    }
}


// check giá trị null
function checkkytunull_xuatexcel() {
    try {
        var p = getAllIdMod();        
        if (p.cbloainhapxuat_xuatexcel == "-1") return "Vui lòng chọn loại xuất- thu hồi";
        if (p.cb_toikho_xuatexcel == "-1") return "vui lòng chọn kho nhận";
        if (p.cb_nguoiduyet_xuatexcel == "-1") return "Vui lòng chọn người duyệt";
        if (p.cb_project_xuatexcel == "-1" && $("#cb_toikho_xuatexcel").val().length == 8) return "Vui lòng chọn dự án";
        if (p.txtlydo_xuatexcel == "") return "Vui lòng nhập lý do xuất";
    
        return "";

    } catch (e) {
        console.log(e);
    }
}

// clear nhập thành công
function clearthanhcong_xuatexcel() {
    try {
        f_loadMaPhieuNhap_xuatexcel();
        setValToTxt('cb_nguoiduyet_xuatexcel', '-1');
        setValToTxt('txtmavandon_xuatexcel', '');
        setValToTxt('txtlydo_xuatexcel', '');
        setValToTxt('txtserial_xuatexcel', '');
        $("#messinfo_tongbanghi").html("");
        $("#grview_xuatexcel").hide();
        $("#grview_xuatexcel tbody").empty();
        $("#grvnhapkhotrung_xuatexcel").hide();
        $("#grvnhapkhotrung_xuatexcel tbody").empty();
    } catch (e) {
        console.log(e);
    }
}

function f_thaydoitenlable_xuatexcel()
{
    var p = getAllIdMod();
    if (p.cbloainhapxuat_xuatexcel == 5) {
        $("#lbkho_xuatexcel").text("Thu hồi tại kho");

    }
    else {
        $("#lbkho_xuatexcel").text("Xuất tới kho");

    }
}
//============================================================KET THUC LOAD CAC CONTROL==========================================================


