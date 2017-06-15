var mangxuatkho = [];
var voicecodeexcel = "";
function loadxemchitietmaphieu_xuatxct(voicecode, page) {
    try {
        voicecodeexcel = voicecode;
        var config = { namesql: "TB_Import_XemChiTietTheoMaPhieu", callback: "f_result_loadxemthem_xuatxct", connstr: "ConnectEMS" };
        var para = {
            VoiceCode: voicecode,
            v_page: page,
            v_pagecount: 10
        };
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
    f_confimYesNo("Cập nhật mã phiếu " + p.txtMaphieu_xuatxct + " ?", "Bỏ qua", "Đồng ý",  updateduyetphieu_xuatxct);
}

function updateduyetphieu_xuatxct() {
    try {
        $("#btnCapNhat_xuatxct").attr("disabled", "disabled");
        var p = getAllIdMod();
        var config = { namesql: "TB_Confirm_NhapXuat", callback: "f_result_loaddatabase_xuatxct", connstr: "ConnectEMS" };
        var para = {
            Voicecode: p.txtMaphieu_xuatxct
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_xuatxct(config, para, lst) {
    try {

        if (lst.data[0].result.indexOf("thành công") >= 0) {
            $("#btnCapNhat_xuatxct").removeAttr("disabled");
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

        if (lst == null || lst == undefined || lst == "[]") return;
        if (lst.data[0].result.indexOf("thành công") >= 0) {

            $(".close").click();
            $("#btnThucHienDanhsach_danhsachxuat").click();
            setTimeout(
            f_thongbaothanhcong_danhsachxuat(lst.data[0].result), 5000);
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
        console.log(lst);
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
            var seriesdivive = val.seriesmodem != null && val.seriessim != null ? '-' : val.seriesdivice
           
            var row = "";
            row += "<tr><td class='c'>"
                 + val.rownum + "</td><td>"
                + val.vattutb + "</td><td>"
                + SetValnull(val.loaithietbi) + "</td><td class='c'>"
                + SetValnull(val.seriesmodem) + "</td><td class='c'>"
                + SetValnull(val.seriessim) + "</td><td class='c'>"
                + val.version + "</td><td class='c'>"
                + val.countdivice + "</td><td class='c'>"
                + val.bhtimestart + "</td><td class='c'>"
                + val.bhtimeend + "</td><td>"
                + SetValnull(val.infoadd1) + "</td>"
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
        // tomausukien() ;
        $("#txt_tongsobanghi_chitietphieunhap").empty();
        $.each(lst.data[2].kq2, function (key, val) {
            var row1 = val.allrow;
            $("#txt_tongsobanghi_chitietphieunhap").append(row1);
        });
        loadphantrang_Danhsachchitietphieuxuat(lst, para.VoiceCode);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_Danhsachchitietphieuxuat(lst, voicecode) {
    try {
       
        $("#pagecurent_chitietphieuxuat ul").empty();
        $("#pagecurent_chitietphieuxuat ul").append('<li><a  >Trang đầu</a></li>');
        $.each(lst.data[3].kq3, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_chitietphieuxuat ul").append(row2);
        });
        $("#pagecurent_chitietphieuxuat ul li a").click(function () {
            var cuoi = $("#pagecurent_chitietphieuxuat").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_chitietphieuxuat ul li a").addClass("active");
            console.log(page);
            var p = getAllIdMod();
            if (lst.data[1].kq1.length > 0) {
                loadxemchitietmaphieu_xuatxct(voicecode, page)
            }
        });
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
            namesql: "TB_Import_XemChiTietTheoMaPhieu_Excel",
            namefile: "Chi_tiet_danh_nhap",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
      
        var para = {
            VoiceCode: voicecodeexcel
        };
        var colum = {
            kq: [
                { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "vattutb", name: "Vật tư thiết bị", type: "TextAndBoldCenter" },
               { field: "loaithietbi", name: "Loại thiết bị", type: "TextAndBoldCenter" },
               { field: "seriesmodem", name: "IMEI", type: "TextAndBoldCenter" },
               { field: "seriessim", name: "Series Sim", type: "TextAndBoldCenter" },
               { field: "version", name: "Version", type: "TextAndBoldCenter" },
               { field: "countdivice", name: "Số lượng", type: "TextAndBoldCenter" },
               { field: "bhtimestart", name: "Bắt đầu bảo hành", type: "TextAndBoldCenter" },
               { field: "bhtimeend", name: "Kết thúc bảo hành", type: "TextAndBoldCenter" },
               { field: "infoadd1", name: "Thông tin thêm", type: "TextAndBoldCenter" }]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }

}
//============================================================ XY LY CAC CHUC NANG==========================================================
