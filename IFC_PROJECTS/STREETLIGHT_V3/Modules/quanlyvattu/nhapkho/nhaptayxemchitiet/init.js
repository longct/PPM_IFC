//var manggiatri = [];
//function loadxemchitietmaphieu_nhapxct(voicecode) {
//    try {
//        var config = { namesql: "TB_Import_XemChiTietTheoMaPhieu", callback: "f_result_loadxemthem_nhapxct", connstr: "ConnectEMS" };
//        var para = { VoiceCode: voicecode };
      
//        ExecuteServiceSyns(config, para, false);

//    } catch (e) {
//        console.log(e);
//    }
//}


////============================================================ XY LY CAC CHUC NANG==========================================================
////cap nhap diuyet phieu 
//function f_ConfirmCapNhatPhieu_nhapxct()
//{
//    var p = getAllIdMod();
//    f_confimYesNo("Cập nhật mã phiếu " + p.txtMaphieu_nhapxct + " ?", "Bỏ qua", "Đồng ý", updateduyetphieu_nhapxct);
//}


//function updateduyetphieu_nhapxct() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Confirm_NhapXuat", callback: "f_result_loaddatabase_nhapxct", connstr: "ConnectEMS" };
//        var para = {
//            Voicecode: p.txtMaphieu_nhapxct,
//        };
//        ExecuteServiceSyns(config, para, false);

//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loaddatabase_nhapxct(config, para, lst) {
//    try {
//        if (lst.data[0].result.indexOf("thành công") >= 0) {

//            $(".close").click();
//            $("#btnThucHienDanhsach_nkdanhsach").click();
//            setTimeout(
//            f_thongbaothanhcong_danhsachnhap(lst.data[0].result),1000);
//        }
//        else
//            messInfo("messinfo_nhapxct", lst.data[0].result, "error");

//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_DeleteConfirmDelete_nhapxct()
//{
//    var p = getAllIdMod();
//    f_confimYesNo("Xóa phiếu chờ duyệt " + p.txtMaphieu_nhapxct + " ?", "Bỏ qua", "Đồng ý", deletePhieu_nhatxct);
//}

////xoa phieu chờ duyệt
//function deletePhieu_nhatxct() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "TB_Import_XoaPhieuChoDuyet", callback: "f_result_deletePhieu_nhatxct", connstr: "ConnectEMS" };
//        var para = {
//            Voicecode: p.txtMaphieu_nhapxct,
//        };
//        ExecuteServiceSyns(config, para, false);

//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_deletePhieu_nhatxct(config, para, lst) {
//    try {
//        if (lst.data[0].result.indexOf("thành công") >= 0) {

//            $(".close").click();
//            $("#btnThucHienDanhsach_nkdanhsach").click();
//            f_thongbaothanhcong_danhsachnhap(lst.data[0].result);
//        }
//        else
//            messInfo("messinfo_nhapxct", lst.data[0].result, "error");

//    } catch (e) {
//        console.log(e);
//    }
//}




//// load ra chi tiet thiet bi
//function f_result_loadxemthem_nhapxct(config, para, lst) {
//    try {
//        var p = getAllIdMod();
//        var data = lst.data[0].kq0[0];
      

//        $("#txtMaphieuHead_nhapxct").html("Thông tin chi tiết mã phiếu " + data.voicecode);
//        setValToTxt('txtMaphieu_nhapxct', data.voicecode);
//        setValToTxt('cb_khonhap_nhapxct', data.kho);
//        setValToTxt('cbnguoigui_nhapxct', data.nguoigui);
//        setValToTxt('cbnguoiduyet_nhapxct', data.nguoinhan); 
//        setValToTxt('cbchusohuu_nhapxct', data.nameowner);
//        setValToTxt('txtmavandon_nhapxct', data.trackingnumber);
//        setValToTxt('file_bienban_nhapxct', data.filecv);
//        setValToTxt('txtlydonhap_nhapxct', data.note);

//        $("#myTableData_nhapxct").empty();
//        $.each(lst.data[1].kq1, function (key, val) {
//            var row = "";
//            row += "<tr><td>"
//                + val.vattutb + "</td><td>"
//                + SetValnull(val.loaithietbi) + "</td><td>"
//                + val.seriesdivice + "</td><td>"
//                + val.version + "</td><td>"
//                + val.countdivice + "</td><td>"
//                + val.bhtimestart + "</td><td>"
//                + val.bhtimeend + "</td><td>"
//                + val.infoadd1 + "</td>"
//            "</tr>";
//            $("#myTableData_nhapxct").append(row);
//        });

//        //trinhnq 01/10/2016
//        manggiatri = lst.data[1].kq1;
//        // an hien btn
//        var user = JSON.parse(localStorage.getItem("userinfo"));
      
//        if (data.nguoinhan == user.fullname && data.approve.toLowerCase().indexOf("pending") >= 0) {
//            $("#btnCapNhat_nhapxct").show();
//        }
//        else
//            $("#btnCapNhat_nhapxct").hide();

//        if (data.nguoigui == user.fullname  && data.approve.toLowerCase().indexOf("pending")>=0) {           
//            $("#btnXoaPhieu_nhapxct").show();
//        }
//        else
//            $("#btnXoaPhieu_nhapxct").hide();
//    } catch (e) {
//        console.log(e);
//    }
//}
//// xuat execl 
//function f_XuatExecl_nhapxct() {
//    try {
        
//        xuatexecl_nhapxct();
//    } catch (e) {
//        console.log(e);
//    }
//}
//function xuatexecl_nhapxct() {
//    try {
       
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = {
//            namesql: "TB_Import_XemChiTietTheoMaPhieu",
//            namefile: "Chi_tiet_danh_nhap",
//            connstr: "ConnectEMS",
//            userid: userInfo.userid
//        };
      
//        var dt = '{ "data": ' + JSON.stringify(manggiatri) + ' }';
//        var colum = {
//            kq: [
//               { field: "vattutb", name: "Vật tư thiết bị", type: "TextAndBoldCenter" },
//               { field: "loaithietbi", name: "Loại thiết bị", type: "TextAndBoldCenter" },
//               { field: "seriesdivice", name: "Series", type: "TextAndBoldCenter" },
//               { field: "version", name: "Version", type: "TextAndBoldCenter" },
//               { field: "countdivice", name: "Số lượng", type: "TextAndBoldCenter" },
//               { field: "bhtimestart", name: "Bắt đầu bảo hành", type: "TextAndBoldCenter" },
//               { field: "bhtimeend", name: "Kết thúc bảo hành", type: "TextAndBoldCenter" },
//               { field: "infoadd1", name: "Thông tin thêm", type: "TextAndBoldCenter" }]
//        };
       
//        excuteExcelHaveData(config,JSON.parse(dt), colum, true);
//    } catch (e) {
//        console.log(e);
//    }

//}



////============================================================ XY LY CAC CHUC NANG==========================================================
