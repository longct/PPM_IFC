
var paraTable_NhapExcel = [];
$(document).ready(function () {
    try {
       
        //loadConetent();
        //loadInitDate();
        //clearthanhcong_NhapExcel();

        //$("#cbkhonhan_NhapExcel").change(function () {
        //    loaduserkho_NhapExcel();
        //});

        //$("#cbvatuthietbi_NhapExcel").change(function () {
        //    loadgetlistthietbi_NhapExcel();
        //});

        //$("#btnCapNhat_NhapExcel").click(function () {
        //    f_confimYesNo("Cập nhật phiếu nhập?", "Bỏ qua", "Đồng ý", function () { f_ExcuteDatabase_NhapExcel("TB_Import_ImportWaitInHard", "f_resultCapNhatDatabase_NhapExcel") });

        //});

        //$("#btnMaVanDon_NhapExcel").click(function () {
        //    f_loadMaVanDon_NhapExcel();
        //});
        //$("#btnXuatExecl_NhapExcel").click(function () {
        //    try {
                
        //        xuatexecl_NhapExcel();
        //    }catch(e){
        //        console.log(e);
        //    }
        //});


    } catch (e) {
        console.log(e);
    }
});

// doc file excel
//function f_UploadFile_NhapExcel() {
//    try {
//        $("#grvnhapkho_NhapExcel").hide();
//        $("#grvnhapkhotrung_NhapExcel").hide();
//        $("#grvnhapkho_NhapExcel tbody").empty();
//        $("#grvnhapkhotrung_NhapExcel tbody").empty();

//        var p = getAllIdMod();
//        var fdata = new FormData();
//        var file = document.getElementById("file_chonexecl_NhapExcel").files[0];
//        //var file = p.btn_import_1pha_khachhang.files[0];
//        fdata.append("file", file);
//        fdata.append("select", "select *");
//        fdata.append("where", "");
//        if (file == null || file == 'undefined' || file.length == 0) {
//            messInfo("messinfo_NhapExcel", "Bạn chưa chọn file execl", "error");
//            return;
//        }
//        var config = { callback: "f_resultImportExcel_NhapExcel" };
//        f_importExcel(config, fdata);
//    } catch (e) { console.log(e); }
//}

//function f_resultImportExcel_NhapExcel(config, para, lst) {
//    try {
       
//        paraTable_NhapExcel = [];
//        var p = getAllIdMod();
//        $.each(lst.data, function (key, val) {
//            var temp = {
//                TypeDeviceId: p.cbvatuthietbi_NhapExcel,
//                VendorId: p.cbloaithietbi_NhapExcel,
//                SeriesDivice: val.series,
//                Version: p.txtversion_NhapExcel,
//                BHTimeStart: p.txt_datefrombh_NhapExcel,
//                BHTimeEnd: p.txt_datetobh_NhapExcel,
//                Sim_TimeActive: "",
//                Sim_Phone: "",
//                CountDivice: 1,
//                InfoAdd1: val.thongtinthem,
//                InfoAdd2: "",
//                StatusDivice: "1",
//                Stt: key
//            };
          
//            paraTable_NhapExcel.push(temp);
//        });
      
//        setTimeout(
//        f_ExcuteDatabase_NhapExcel("TB_Import_CheckSameInHard", "f_resultCheckTrungTB_NhapExcel"), 1000);
//    } catch (e) { console.log(e); }
//}

//// excute database

//function f_ExcuteDatabase_NhapExcel(namesql, calkBackTo) {
//    try {
//        if (paraTable_NhapExcel == null || paraTable_NhapExcel == undefined || paraTable_NhapExcel == "" || paraTable_NhapExcel == "[]" || paraTable_NhapExcel.length == 0) {
//            messInfo("messinfo_NhapExcel", "Không có dữ liệu, vui lòng kiểm tra", "error");
//        }

//        var check = checkkytunull_NhapExcel();
//        if (check != "") {
//            messInfo("messinfo_NhapExcel", check, "error");
//            return;
//        }
//        var user = JSON.parse(localStorage.getItem("userinfo"));
//        var p = getAllIdMod();

//        var dt = '{ "table": ' + JSON.stringify(paraTable_NhapExcel) + ' }';

//        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
//        var para = {
//            VoiceCode: p.txtMaphieu_NhapExcel
//          , TrackingNumber: p.txmavandon_NhapExcel
//          , ProjectId: -1
//          , UserIdFrom: user.userid
//          , UserIdTo: p.cbnguoiduyet_NhapExcel
//          , Note: p.txtlydonhap_NhapExcel
//          , FileCV: p.file_bienban_NhapExcel
//          , CodeStockFrom: user.code
//          , CodeStockTo: p.cbkhonhan_NhapExcel
//          , Onner: p.cbchusohuu_NhapExcel
//          , TypeInOut: "1"
//        };
//        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_resultCheckTrungTB_NhapExcel(config, para, lst) {
//    try {
        

//        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0] !=null&& lst.data[0].kq0.length > 0) {
//            // check trung loi vao day
//            localStorage.setItem("ketqua_NhapExcel", JSON.stringify(lst.data[1].kq1));
//            messInfo("messinfo_NhapExcel", lst.data[0].kq0[0].result, "error");
//            f_drowCheckTrung_NhapExcel(lst.data[1].kq1);
//            $("#grvnhapkhotrung_NhapExcel").show();
//            $("#btnCapNhat_NhapExcel").attr("disabled", "disabled");
//            $("#btnXuatExecl_NhapExcel").removeAttr("disabled");
//        }
//        else {
//            // check trung ok moi xuong day  
//            messInfo("messinfo_NhapExcel", "", "ok");
//            f_drawOk_NhapExcel(paraTable_NhapExcel);
//            $("#grvnhapkho_NhapExcel").show();
//            $("#btnCapNhat_NhapExcel").removeAttr("disabled");
//            $("#btnXuatExecl_NhapExcel").attr("disabled", "disabled");
//        }
//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_resultCapNhatDatabase_NhapExcel(config, para, lst) {
//    try {
      
//        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
//            messInfo("messinfo_NhapExcel", "Cập nhật thiết bị lỗi", "error");
//            return;
//        }
//        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
//            messInfo("messinfo_NhapExcel", lst.data[0].result, "ok");
//            paraTable_NhapExcel = [];
//            clearthanhcong_NhapExcel();
//            $("#myTableData_NhapExcel").empty();
//            f_uploadFileMaVanDon_NhapExcel();
//        }
//        else
//            messInfo("messinfo_NhapExcel", lst.data[0].result, "error");
//    } catch (e) { console.log(e); }
//}

//function f_drawOk_NhapExcel(data) {
//    try {
       
//        $("#grvnhapkho_NhapExcel tbody").empty();
//        $.each(data, function (key, val) {
//            var tr = "<tr>";
//            tr += "<td>" + (key + 1) + "</td>";
//            tr += "<td>" + val.SeriesDivice + "</td>";
//            tr += "<td>" + val.InfoAdd1 + "</td>";
//            tr += "</tr>";
//            $("#grvnhapkho_NhapExcel tbody").append(tr);
//        });
//    } catch (e) { console.log(e); }
//}

//function f_drowCheckTrung_NhapExcel(data) {
//    try {
//        $("#grvnhapkhotrung_NhapExcel tbody").empty();
//        $.each(data, function (key, val) {
//            var tr = "<tr>";
//            tr += "<td>" + (key + 1) + "</td>";
//            tr += "<td>" + val.seriesdivice + "</td>";
//            tr += "</tr>";
//            $("#grvnhapkhotrung_NhapExcel tbody").append(tr);
//        });
//    } catch (e) { console.log(e); }
//}


//function f_uploadFileMaVanDon_NhapExcel() {
//    try {
//        var fdata = new FormData();
//        var file = document.getElementById("file_bienban_nhaptay").files[0];
//        //var file = p.btn_import_1pha_khachhang.files[0];
//        fdata.append("file", file);
//        if (file == null || file == 'undefined' || file.length == 0) {
//            return;
//        }
//        var config = { callback: "f_resultuploadFileMaVanDon_NhapExcel" };
//        f_UploadFileAny(config, fdata);
//    } catch (e) { console.log(e); }
//}

//function f_resultuploadFileMaVanDon_NhapExcel(config, para, data) {
//    console.log(data);
//}


////============================================================ LOAD CAC CONTROL==========================================================
//// load ra list du lieu ban dau
//function loaddatabasebandaunhaptay_NhapExcel() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loaddulieunhaptay_NhapExcel", connstr: "ConnectEMS" };
//        var para = { Type: 'Basic', UserId: userInfo.userid };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loaddulieunhaptay_NhapExcel(config, para, lst) {
//    try {
//        var data = lst.data;
//        dataToCob("cbkhonhan_NhapExcel", data[1].kq1, "code", "name", "-1", "--Chọn kho nhập--");
//        dataToCob("cbchusohuu_NhapExcel", data[2].kq2, "code", "name", "-1", "--Chọn chủ sở hữu-");
//        f_loadMaPhieuNhap_NhapExcel();

//        loadLoaiThietBiSoLuongHayChiTiet_NhapExcel(0);

//    } catch (e) {
//        console.log(e);
//    }
//}
//// load ra loai thiet bi tuong ung khi chon chi tiet hay so luong
//function loadLoaiThietBiSoLuongHayChiTiet_NhapExcel(type) {
//    try {
//        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadLoaiThietBiSoLuongHayChiTiet_NhapExcel", connstr: "ConnectEMS" };
//        var para = { IsType: 'SoLuongChiTiet', Code: type };

//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadLoaiThietBiSoLuongHayChiTiet_NhapExcel(config, para, lst) {
//    try {
//        dataToCob("cbvatuthietbi_NhapExcel", lst.data, "code", "name", "-1", "--Chọn loại vật tư--");
//    } catch (e) {
//        console.log(e);
//    }
//}

//// load ra list thiet bi
//function loadgetlistthietbi_NhapExcel() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_NhapExcel", connstr: "ConnectEMS" };
//        var para = { IsType: 'LoaiThietBi', Code: p.cbvatuthietbi_NhapExcel };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadlistthietbi_NhapExcel(config, para, lst) {
//    try {
//        var data = lst.data;
//        dataToCob("cbloaithietbi_NhapExcel", data, "code", "name", "-1", "--Chọn loại thiết bị--");
//    } catch (e) {
//        console.log(e);
//    }
//}


//// load ra user kho
//function loaduserkho_NhapExcel() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistuserkho_NhapExcel", connstr: "ConnectEMS" };
//        var para = { IsType: 'User', Code: p.cbkhonhan_NhapExcel };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadlistuserkho_NhapExcel(config, para, lst) {
//    try {
//        var data = lst.data;
//        dataToCob("cbnguoiduyet_NhapExcel", data, "code", "name", "-1", "--Chọn người duyệt--");
//    } catch (e) {
//        console.log(e);
//    }
//}

//// load ra mã phiếu nhập
//function f_loadMaPhieuNhap_NhapExcel() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_resultLoadMaPhieuNhap_NhapExcel", connstr: "ConnectEMS" };
//        var para = { IsType: 'MaPhieuNhapMoi', Code: "" };
//        ExecuteServiceSyns(config, para, false);

//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_resultLoadMaPhieuNhap_NhapExcel(config, para, lst) {
//    try {
//        setValToTxt("txtMaphieu_NhapExcel", lst != null && lst != undefined && lst.data.length > 0 ? lst.data[0].voicecode : "");
//    } catch (e) {
//        console.log(e);
//    }
//}

//// load ra mã van don
//function f_loadMaVanDon_NhapExcel() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_resultLoadMaVanDon_NhapExcel", connstr: "ConnectEMS" };
//        var para = { IsType: 'MaVanDon', Code: "" };
//        ExecuteServiceSyns(config, para, false);

//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_resultLoadMaVanDon_NhapExcel(config, para, lst) {
//    try {
//        setValToTxt("txmavandon_NhapExcel", lst != null && lst != undefined && lst.data.length > 0 ? lst.data[0].mavandon : "");
//    } catch (e) {
//        console.log(e);
//    }
//}
//// check giá trị null
//function checkkytunull_NhapExcel() {
//    try {
//        var p = getAllIdMod();
//        if (p.txtMaphieu_NhapExcel == "") return "Mã Phiếu không được để trống.";
//        if (p.cbkhonhan_NhapExcel == "-1") return "Bạn chưa chọn nhập kho";
//        if (p.cbnguoiduyet_NhapExcel == "-1") return "Bạn chưa chọn người duyệt";
//        if (p.cbchusohuu_NhapExcel == "-1") return "Bạn chưa chọn nhà sở hữu";
//        if (p.txmavandon_NhapExcel == "") return "Mã vận đơn không được để trống";
//        if (p.cbvatuthietbi_NhapExcel == "-1") return "Bạn chưa chọn loại vật tư";
//        if (p.cbloaithietbi_NhapExcel == "-1") return "Bạn chưa chọn loại thiết bị";
//        //if (p.txtserial_NhapExcel == "") return "Số Serial không được để trống";
//        //if (p.txtversion_NhapExcel == "") return "Số  Version không được để trống";
//        //if (p.txtsoluong_NhapExcel == "") return "Số  lượng không được để trống";
//        //var compare = compareDates(timeyyyymmdd(p.txt_datefrombh_NhapExcel), timeyyyymmdd(p.txt_datetobh_NhapExcel));
//        //if (compare.days < 0) return "Ngày bắt đầu bảo hành phải nhỏ hơn ngày kết thúc bảo hành"
//        //if (p.txtthongtinthem_NhapExcel == "") return "Thông tin thêm không đươc để trống";
//        return "";

//    } catch (e) {
//        console.log(e);
//    }
//}

//// clear nhập thành công
//function clearthanhcong_NhapExcel() {
//    try {
//        loaddatabasebandaunhaptay_NhapExcel();
//        //setValToTxt('cb_khonhap_NhapExcel', '-1');
//        setValToTxt('cbnguoiduyet_NhapExcel', '-1');
//        // setValToTxt('cbchusohuu_NhapExcel', '-1');
//        setValToTxt('txmavandon_NhapExcel', '');
//        setValToTxt('btnMaVanDon_NhapExcel', '');
//        setValToTxt('txtlydonhap_NhapExcel', '');
//        // setValToTxt('cbvatuthietbi_NhapExcel', '-1');
//        setValToTxt('cbloaithietbi_NhapExcel', '-1');
//        setValToTxt('txtversion_NhapExcel', '');
//        setValToTxt('txt_datefrombh_NhapExcel', gettimenow());
//        setValToTxt('txt_datetobh_NhapExcel', gettimenow());
//        $("#grvnhapkho_NhapExcel").hide();
//        $("#grvnhapkhotrung_NhapExcel").hide();
//    } catch (e) {
//        console.log(e);
//    }
//}
//// xuất execl
//function xuatexecl_NhapExcel() {
//    try{
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = {
//            namesql: "TB_Import_CheckSameInHard",
//            namefile: "Loi_series_nhap_execl",
//            connstr: "ConnectEMS",
//            userid: userInfo.userid
//        };
//        var para = JSON.parse(localStorage.getItem("ketqua_NhapExcel"));
//        var dt = '{ "data": ' + JSON.stringify(para) + ' }';
//        var colum = {
//            kq: [
//               { field: "seriesdivice", name: "Series", type: "TextAndBoldCenter" },
//        ]};

//        excuteExcelHaveData(config, JSON.parse(dt), colum, true);

//    } catch (e) {
//        console.log(e);
//    }

//}

//============================================================KET THUC LOAD CAC CONTROL==========================================================


