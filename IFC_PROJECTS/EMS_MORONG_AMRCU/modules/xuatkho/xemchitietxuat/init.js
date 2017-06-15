var mangxuatkho = [];

function loadxemchitietmaphieu_xuatxct(voicecode) {
    try {
        var config = { namesql: "TB_Import_XemChiTietTheoMaPhieu", callback: "f_result_loadxemthem_xuatxct", connstr: "ConnectEMS" };
        var para = { VoiceCode: voicecode };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}


//============================================================ XY LY CAC CHUC NANG==========================================================
//cap nhap diuyet phieu 
function f_ConfirmCapNhatPhieu_xuatxct()
{
    var p = getAllIdMod();
    f_confimYesNo("Cập nhật mã phiếu " + p.txtMaphieu_xuatxct + " ?", "Bỏ qua", "Đồng ý", updateduyetphieu_xuatxct);
}

function updateduyetphieu_xuatxct() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Confirm_NhapXuat", callback: "f_result_loaddatabase_xuatxct", connstr: "ConnectEMS" };
        var para = {
            Voicecode: p.txtMaphieu_xuatxct,
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_xuatxct(config, para, lst) {
    try {
        if (lst.data[0].result.indexOf("thành công") >= 0) {

            $(".close").click();
            $("#btnThucHienDanhsach_danhsachxuat").click();
            f_thongbaothanhcong_danhsachxuat(lst.data[0].result);
        }
        else
            messInfo("messinfo_xuatxct", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}

function f_DeleteConfirmDelete_xuatxct() {
    var p = getAllIdMod();
    f_confimYesNo("Xóa phiếu chờ duyệt " + p.txtMaphieu_xuatxct + " ?", "Bỏ qua", "Đồng ý", deletePhieu_nhatxct);
}

//xoa phieu chờ duyệt
function deletePhieu_nhatxct() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_XoaPhieuChoDuyet", callback: "f_result_deletePhieu_nhatxct", connstr: "ConnectEMS" };
        var para = {
            Voicecode: p.txtMaphieu_xuatxct,
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_deletePhieu_nhatxct(config, para, lst) {
    try {
        if (lst.data[0].result.indexOf("thành công") >= 0) {

            $(".close").click();
            $("#btnThucHienDanhsach_danhsachxuat").click();
            setTimeout(
            f_thongbaothanhcong_danhsachxuat(lst.data[0].result), 1000);
        }
        else
            messInfo("messinfo_xuatxct", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}




// load ra chi tiet thiet bi
function f_result_loadxemthem_xuatxct(config, para, lst) {
    try {
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];

        $("#txtMaphieuHead_xuatxct").html("Thông tin chi tiết mã phiếu " + data.voicecode);
        setValToTxt('cbloainhapxuat_xuatxct', data.typeexport);
        setValToTxt('txtMaphieu_xuatxct', data.voicecode);
        setValToTxt('cb_khonhap_xuatxct', data.kho);
        setValToTxt('cbnguoigui_xuatxct', data.nguoigui);
        setValToTxt('cbnguoiduyet_xuatxct', data.nguoinhan);
        setValToTxt('file_bienban_xuatxct', data.filecv);
        setValToTxt('txtlydonhap_xuatxct', data.note);
        setValToTxt('cb_project_xuatxct', data.projectname);

        $("#myTableData_xuatxct").empty();
        $.each(lst.data[1].kq1, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.vattutb + "</td><td>"
                + SetValnull(val.loaithietbi) + "</td><td>"
                + val.seriesdivice + "</td><td>"
                + val.version + "</td><td>"
                + val.countdivice + "</td><td>"
                + val.bhtimestart + "</td><td>"
                + val.bhtimeend + "</td><td>"
                + val.infoadd1 + "</td>"
            "</tr>";
            $("#myTableData_xuatxct").append(row);
        });
       // localStorage.setItem("xuatxct_xemchitiet", JSON.stringify(lst.data[1].kq1));
        mangxuatkho = lst.data[1].kq1;
        // an hien btn

        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (data.nguoinhan == user.fullname && data.approve.toLowerCase().indexOf("pending") >= 0) {
            $("#btnCapNhat_xuatxct").show();
        }
        else
            $("#btnCapNhat_xuatxct").hide();
                
        if (data.nguoigui == user.fullname && data.approve.toLowerCase().indexOf("pending") >= 0) {
            $("#btnXoaPhieu_xuatxct").show();
        }
        else {
            $("#btnXoaPhieu_xuatxct").hide();
        }

    } catch (e) {
        console.log(e);
    }
}
function f_ConfirmExecl_xuatxct() {
    try{
        xuatexecl_xuatxct();
    } catch (e) {
        console.log(e);
    }
}

function xuatexecl_xuatxct() {
    try {

        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Import_XemChiTietTheoMaPhieu",
            namefile: "Chi_tiet_danh_xuat",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
      
        var dt = '{ "data": ' + JSON.stringify(mangxuatkho) + ' }';
        var colum = {
            kq: [
               { field: "vattutb", name: "Vật tư thiết bị", type: "TextAndBoldCenter" },
               { field: "loaithietbi", name: "Loại thiết bị", type: "TextAndBoldCenter" },
               { field: "seriesdivice", name: "Series", type: "TextAndBoldCenter" },
               { field: "version", name: "Version", type: "TextAndBoldCenter" },
               { field: "countdivice", name: "Số lượng", type: "TextAndBoldCenter" },
               { field: "bhtimestart", name: "Bắt đầu bảo hành", type: "TextAndBoldCenter" },
               { field: "bhtimeend", name: "Kết thúc bảo hành", type: "TextAndBoldCenter" },
               { field: "infoadd1", name: "Thông tin thêm", type: "TextAndBoldCenter" }]
        };

        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    } catch (e) {
        console.log(e);
    }

}
//============================================================ XY LY CAC CHUC NANG==========================================================
