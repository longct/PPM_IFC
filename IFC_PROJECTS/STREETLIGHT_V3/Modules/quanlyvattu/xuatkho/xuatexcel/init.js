//var itemCount = 0;
//var paraTable_xuatexcel = [];
//$(document).ready(function () {
//    try {
        
//        loadConetent();
//        loadInitDate();
//        loaddatabasebandau_xuatexcel();
//        $("#cb_toikho_xuatexcel").change(function () {
//            loaduserkho_xuatexcel();
//        });

//        //$("#cbvattu_xuatexcel").change(function () {
//        //    loadgetlistthietbi_xuatexcel();
//        //});

//        $("#btn_them_xuatexcel").click(function () {
//            itemCount++;
//            f_addThemTBChoValue_xuatexcel();
//        });
//        $("#btnCapNhat_xuatexcel").click(function () {
//            f_confimYesNo("Cập nhật phiếu xuất?", "Bỏ qua", "Đồng ý",
//                function () { f_ExcuteDatabase_xuatexcel("TB_Export_WaitInHard", "f_resultCapNhatDatabase_xuatexcel") });
//        });

//        $("#cbloainhapxuat_xuatexcel").change(function () {
//            clearthanhcong_xuatexcel();
//            f_thaydoitenlable_xuatexcel();
//            var p = getAllIdMod();
//            if (p.cbloainhapxuat_xuatexcel != "-1")
//            f_loadMaPhieuNhap_xuatexcel();
//        });
//        $("#btnXuatExecl_xuatexcel").click(function () {
//            try{
//                Xuatexecl_xuatexecl();
//            } catch (e) {
//                console.log(e);
//            }
//        });

//    } catch (e) { console.log(e); }
//});

////============================================================ XY LY CAC CHUC NANG==========================================================

//// doc file excel
//function f_UploadFile_xuatexcel() {
//    try {
//        $("#grview_xuatexcel").hide();
//        $("#grvnhapkhotrung_xuatexcel").hide();
//        $("#grview_xuatexcel tbody").empty();
//        $("#grvnhapkhotrung_xuatexcel tbody").empty();

//        var p = getAllIdMod();
//        var fdata = new FormData();
//        var file = document.getElementById("file_chonexecl_xuatexcel").files[0];
//        //var file = p.btn_import_1pha_khachhang.files[0];
//        fdata.append("file", file);
//        fdata.append("select", "select *");
//        fdata.append("where", "");
//        if (file == null || file == 'undefined' || file.length == 0) {
//            messInfo("messinfo_xuatexcel", "Bạn chưa chọn file execl", "error");
//            return;
//        }
//        var config = { callback: "f_resultImportExcel_xuatexcel" };
        
//        f_importExcel(config, fdata);
//    } catch (e) { console.log(e); }
//}

//function f_resultImportExcel_xuatexcel(config, para, lst) {
//    try {
//        paraTable_xuatexcel = [];
//        var p = getAllIdMod();
//        $.each(lst.data, function (key, val) {            
//            var temp = {
//                TypeDeviceId: "",
//                VendorId: "",
//                SeriesDivice1: val.series1,
//                SeriesDivice2: val.series2,
//                CountDivice: 1,
//                StatusDivice: p.cbtrangthai_xuatexcel,
//                Stt: key
//            };
//            paraTable_xuatexcel.push(temp);
//        });

//        setTimeout(
//        f_ExcuteDatabase_xuatexcel("TB_Export_CheckSameInHard", "f_resultCheckTrungTB_xuatexcel"), 1000);
//    } catch (e) { console.log(e); }
//}

//// excute database

//function f_ExcuteDatabase_xuatexcel(namesql, calkBackTo) {
//    try {
//        var check = checkkytunull_xuatexcel();
//        if (check != "") {
//            messInfo("messinfo_xuatexcel", check, "error");
//            return;
//        }

//        if (paraTable_xuatexcel == null || paraTable_xuatexcel == undefined || paraTable_xuatexcel == "" || paraTable_xuatexcel == "[]" || paraTable_xuatexcel.length == 0) {
//            messInfo("messinfo_xuatexcel", "Không có dữ liệu, vui lòng kiểm tra", "error");
//            return;
//        }
        
//        var user = JSON.parse(localStorage.getItem("userinfo"));
//        var p = getAllIdMod();

//        var dt = '{ "table": ' + JSON.stringify(paraTable_xuatexcel) + ' }';

//        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
       

//        var para = {
//            TypeExport: p.cbloainhapxuat_xuatexcel
//           , VoiceCode: p.txtMaphieu_xuatexcel
//         , ProjectId: p.cb_project_xuatexcel
//         , UserIdFrom: user.userid
//         , UserIdTo: p.cb_nguoiduyet_xuatexcel
//         , FileCV: p.file_bienban_xuatexcel
//         , Note: p.txtlydo_xuatexcel
//         , CodeStockFrom: user.code
//         , CodeStockTo: p.cb_toikho_xuatexcel
//        };
//        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_resultCheckTrungTB_xuatexcel(config, para, lst) {
//    try {
//        console.log(lst);
        
//        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0] != null && lst.data[0].kq0.length > 0) {
//            // check trung loi vao day
//            localStorage.setItem("loi_xuatexcel", JSON.stringify(lst.data[1].kq1));
//            messInfo("messinfo_xuatexcel", lst.data[0].kq0[0].result, "error");
//            f_drowCheckTrung_xuatexcel(lst.data[1].kq1);
//            $("#grvnhapkhotrung_xuatexcel").show();
//            $("#btnCapNhat_xuatexcel").attr("disabled", "disabled");
//            $("#btnXuatExecl_xuatexcel").removeAttr("disabled");
            
//        }
//        else {
//            // check trung ok moi xuong day  
//            messInfo("messinfo_xuatexcel", "", "ok");
//            f_drawOk_xuatexcel(paraTable_xuatexcel);
//            $("#grview_xuatexcel").show();
//            $("#btnCapNhat_xuatexcel").removeAttr("disabled");
//            $("#btnXuatExecl_xuatexcel").attr("disabled", "disabled");
//        }
//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_resultCapNhatDatabase_xuatexcel(config, para, lst) {
//    try {
//        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
//            messInfo("messinfo_xuatexcel", "Cập nhật thiết bị lỗi", "error");
//            return;
//        }
//        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
//            messInfo("messinfo_xuatexcel", lst.data[0].result, "ok");
//            paraTable_xuatexcel = [];
//            clearthanhcong_xuatexcel();
//            $("#myTableData_xuatexcel").empty();
//            f_uploadFileMaVanDon_xuatexcel();
//        }
//        else
//            messInfo("messinfo_xuatexcel", lst.data[0].result, "error");
//    } catch (e) { console.log(e); }
//}

//function f_drawOk_xuatexcel(data) {
//    try {
//        $("#grview_xuatexcel tbody").empty();
//        $.each(data, function (key, val) {
//            var tr = "<tr>";
//            tr += "<td>" + (key + 1) + "</td>";
//            tr += "<td>" + val.SeriesDivice1 + "</td>";
//            tr += "<td>" + val.SeriesDivice2 + "</td>";
//            tr += "</tr>";
//            $("#grview_xuatexcel tbody").append(tr);
//        });
//    } catch (e) { console.log(e); }
//}

//function f_drowCheckTrung_xuatexcel(data) {
//    try {
//        console.log(data);
//        $("#grvnhapkhotrung_xuatexcel tbody").empty();
//        $.each(data, function (key, val) {
//            var tr = "<tr>";
//            tr += "<td>" + (key + 1) + "</td>";
//            tr += "<td>" + val.seriesdivice1 + "</td>";
//            tr += "<td>" + val.seriesdivice2 + "</td>";
//            tr += "</tr>";
//            $("#grvnhapkhotrung_xuatexcel tbody").append(tr);
//        });
//    } catch (e) { console.log(e); }
//}


//function f_uploadFileMaVanDon_xuatexcel() {
//    try {
//        var fdata = new FormData();
//        var file = document.getElementById("file_bienban_nhaptay").files[0];
//        //var file = p.btn_import_1pha_khachhang.files[0];
//        fdata.append("file", file);
//        if (file == null || file == 'undefined' || file.length == 0) {
//            return;
//        }
//        var config = { callback: "f_resultuploadFileMaVanDon_xuatexcel" };
//        f_UploadFileAny(config, fdata);
//    } catch (e) { console.log(e); }
//}

//function f_resultuploadFileMaVanDon_xuatexcel(config, para, data) {
//    console.log(data);
//}
//function Xuatexecl_xuatexecl() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = {
//            namesql: "TB_Export_CheckSameInHard",
//            namefile: "Loi_series_xuat_execl",
//            connstr: "ConnectEMS",
//            userid: userInfo.userid
//        };
//        var para = JSON.parse(localStorage.getItem('loi_xuatexcel'));
//        var dt = '{ "data": ' + JSON.stringify(para) + ' }';
//        var colum = {
//            kq: [
//               { field: "seriesdivice", name: "Series", type: "TextAndBoldCenter" },
//            ]
//        };

//        excuteExcelHaveData(config, JSON.parse(dt), colum, true);


//    } catch (e) {
//        console.log(e);
//    }
//}

////============================================================KET THUC XY LY CAC CHUC NANG==========================================================



////============================================================ LOAD CAC CONTROL==========================================================
//// load ra list du lieu ban dau
//function loaddatabasebandau_xuatexcel() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "f_result_loaddulieu_xuatexcel", connstr: "ConnectEMS" };
//        var para = { Type: 'Basic', UserId: userInfo.userid };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loaddulieu_xuatexcel(config, para, lst) {
//    try {
//        var data = lst.data;
//        //dataToCob("cbvattu_xuatexcel", lst.data[0].kq0, "code", "name", "-1", "--Chọn loại vật tư--");
//        dataToCob("cbloainhapxuat_xuatexcel", data[5].kq5, "code", "name", "-1", "--Chọn loại xuất--");

//    } catch (e) {
//        console.log(e);
//    }
//}


////// load ra list thiet bi
////function loadgetlistthietbi_xuatexcel() {
////    try {
////        var p = getAllIdMod();
////        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadlistthietbi_xuatexcel", connstr: "ConnectEMS" };
////        var para = { IsType: 'LoaiThietBi', Code: p.cbvattu_xuatexcel };
////        ExecuteServiceSyns(config, para, false);
////    } catch (e) {
////        console.log(e);
////    }
////}
////function f_result_loadlistthietbi_xuatexcel(config, para, lst) {
////    try {
////        var data = lst.data;
////        dataToCob("cbloaithietbi_xuatexcel", data, "code", "name", "-1", "--Chọn loại thiết bị--");
////    } catch (e) {
////        console.log(e);
////    }
////}

//// load du an user kho

//function loaduserkho_xuatexcel() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_loadlistuserkho_xuatexcel", connstr: "ConnectEMS" };
//        var para = { IsType: 'LoadUserXuat', Code: p.cb_toikho_xuatexcel, Userid: userInfo.userid, TypeExport: p.cbloainhapxuat_xuatexcel };
//        ExecuteServiceSyns(config, para, false);

//        loadduan_xuatexcel();
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadlistuserkho_xuatexcel(config, para, lst) {
//    try {
//        dataToCob("cb_nguoiduyet_xuatexcel", lst.data, "code", "name", "-1", "--Chọn người duyệt--");
//    } catch (e) {
//        console.log(e);
//    }
//}
//// load du an
//function loadduan_xuatexcel() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_xuatexcel", connstr: "ConnectEMS" };
//        var para = { IsType: 'LoadDuAn', Code: p.cb_toikho_xuatexcel };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadduan_xuatexcel(config, para, lst) {
//    try {
//        dataToCob("cb_project_xuatexcel", lst.data, "code", "name", "-1", "--Chọn dự án--");
//    } catch (e) {
//        console.log(e);
//    }
//}

//// load ra mã phiếu xuat
//function f_loadMaPhieuNhap_xuatexcel() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadMaPhieu_xuatexcel", connstr: "ConnectEMS" };
//        var para = { IsType: "LoaiNhapXuat", Code: p.cbloainhapxuat_xuatexcel };
//        ExecuteServiceSyns(config, para, false);
//        // load trang thai thiet bi
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_xuatexcel", connstr: "ConnectEMS" };
//        var para = { IsType: "LoadTrangThai", Code: p.cbloainhapxuat_xuatexcel };
//        ExecuteServiceSyns(config, para, false);

//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        // load KHO TUONG UNG
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_resultLoadKhoXuat_xuatexcel", connstr: "ConnectEMS" };
//        var para = { IsType: "LoadKhoXuat", TypeExport: p.cbloainhapxuat_xuatexcel, Userid: userInfo.userid, Code: userInfo.code };
//        console.log(para);
//        ExecuteServiceSyns(config, para, false);

      
//    } catch (e) {
//        console.log(e);
//    }
//}


//function f_resultLoadKhoXuat_xuatexcel(config, para, lst) {
//    try {
//        dataToCob("cb_toikho_xuatexcel", lst.data, "code", "name", "-1", "--Chọn kho--");
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_resultLoadMaPhieu_xuatexcel(config, para, lst) {
//    try {
//        setValToTxt("txtMaphieu_xuatexcel", lst.data[0].voicecode);
//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_resultLoadTrangThai_xuatexcel(config, para, lst) {
//    try {
//        dataToCob("cbtrangthai_xuatexcel", lst.data, "code", "name", "-1", "--Chọn trạng thái--");
//    } catch (e) {
//        console.log(e);
//    }
//}


//// check giá trị null
//function checkkytunull_xuatexcel() {
//    try {
//        var p = getAllIdMod();        
//        if (p.cbloainhapxuat_xuatexcel == "-1") return "Loại xuất không được để trống.";
//        if (p.txtMaphieu_xuatexcel == "") return "Mã Phiếu không được để trống."; 
//        if (p.cb_toikho_xuatexcel == "-1") return "Bạn chưa chọn nhập kho";
//        if (p.cb_nguoiduyet_xuatexcel == "-1") return "Bạn chưa chọn người duyệt";
//        //if (p.cbvattu_xuatexcel == "-1") return "Bạn chưa chọn loại vật tư";
//       // if (p.cbloaithietbi_xuatexcel == "-1") return "Bạn chưa chọn loại thiết bị";
//        if (p.cbtrangthai_xuatexcel == "-1") return "Chưa chọn trạng thái";
//        return "";

//    } catch (e) {
//        console.log(e);
//    }
//}

//// clear nhập thành công
//function clearthanhcong_xuatexcel() {
//    try {
//        setValToTxt('cb_nguoiduyet_xuatexcel', '-1');
//        setValToTxt('txtmavandon_xuatexcel', '');
//        setValToTxt('txtlydo_xuatexcel', '');
//        //setValToTxt('cbloaithietbi_xuatexcel', '-1');
//        setValToTxt('txtserial_xuatexcel', '');
//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_thaydoitenlable_xuatexcel()
//{
//    var p = getAllIdMod();
//    if (p.cbloainhapxuat_xuatexcel == 5) {
//        $("#lbkho_xuatexcel").text("Thu hồi tại kho");

//    }
//    else {
//        $("#lbkho_xuatexcel").text("Xuất tới kho");

//    }
//}
////============================================================KET THUC LOAD CAC CONTROL==========================================================


