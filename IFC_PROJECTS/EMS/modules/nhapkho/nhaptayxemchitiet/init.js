var manggiatri = [];
var voicecodenhapxt = "";
function loadxemchitietmaphieu_nhapxct(voicecode,page) {
    try {
        voicecodenhapxt = voicecode;
        $("#myTableData_nhapxct").empty();
        var config = { namesql: "TB_Import_XemChiTietTheoMaPhieu", callback: "f_result_loadxemthem_nhapxct", connstr: "ConnectEMS" };
        var para = {
            VoiceCode: voicecode,
            v_page: page,
            v_pagecount:10
        };
       
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}


//============================================================ XY LY CAC CHUC NANG==========================================================
//cap nhap diuyet phieu 
function f_ConfirmCapNhatPhieu_nhapxct()
{
    var p = getAllIdMod();
    f_confimYesNo("Cập nhật mã phiếu " + p.txtMaphieu_nhapxct + " ?", "Bỏ qua", "Đồng ý", updateduyetphieu_nhapxct111);
}


function updateduyetphieu_nhapxct111() {
    try {

        $("#btnCapNhat_nhapxct").attr("disabled", "disabled");
        var p = getAllIdMod();
        var config = { namesql: "TB_Confirm_NhapXuat", callback: "f_result_loaddatabase_nhapxct111", connstr: "ConnectEMS" };
        var para = {
            Voicecode: p.txtMaphieu_nhapxct
        };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_nhapxct111(config, para, lst) {
    try {
     
        $("#messinfo_nhapxct").show();
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        if(data ==null || data==undefined || data=="[]") return;
        if (data[0].result.indexOf("thành công") >= 0) {

           // $(".close").click();
           // $("#btnThucHienDanhsach_nkdanhsach").click();
            messInfo("messinfo_nhapxct", data[0].result, "ok");
            $("#btnThucHienDanhsach_nkdanhsach").click();
            $("#btnCapNhat_nhapxct").hide();
            $("#btnXoaPhieu_nhapxct").hide();
            $("#btnCapNhat_nhapxct").removeAttr("disabled");
        }
        else 
            messInfo("messinfo_nhapxct", data[0].result, "error")

    } catch (e) {
        console.log(e);
    }
}

function f_DeleteConfirmDelete_nhapxct()
{
    var p = getAllIdMod();
    f_confimYesNo("Xóa phiếu chờ duyệt " + p.txtMaphieu_nhapxct + " ?", "Bỏ qua", "Đồng ý", deletePhieu_nhatxct);
}

//xoa phieu chờ duyệt
function deletePhieu_nhatxct() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_XoaPhieuChoDuyet", callback: "f_result_deletePhieu_nhatxct", connstr: "ConnectEMS" };
        var para = {
            Voicecode: p.txtMaphieu_nhapxct,
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
            $("#btnThucHienDanhsach_nkdanhsach").click();
            f_thongbaothanhcong_danhsachnhap(lst.data[0].result);
        }
        else
            messInfo("messinfo_nhapxct", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}




// load ra chi tiet thiet bi
function f_result_loadxemthem_nhapxct(config, para, lst) {
    try {
        $("#messinfo_nhapxct").html("");
        $("#messinfo_nhapxct").hide();
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];
      

        $("#txtMaphieuHead_nhapxct").html("Thông tin chi tiết mã phiếu " + data.voicecode);
        setValToTxt('txtMaphieu_nhapxct', data.voicecode);
        setValToTxt('cb_khonhap_nhapxct', data.kho);
        setValToTxt('cbnguoigui_nhapxct', data.nguoigui);
        setValToTxt('cbnguoiduyet_nhapxct', data.nguoinhan); 
        setValToTxt('cbchusohuu_nhapxct', data.nameowner);
        setValToTxt('txtmavandon_nhapxct', data.trackingnumber);
        setValToTxt('file_bienban_nhapxct', data.filecv);
        setValToTxt('txtlydonhap_nhapxct', data.note);

        $("#myTableData_nhapxct").empty();
        $.each(lst.data[1].kq1, function (key, val) {
            var seriesdivive = val.seriesmodem != null && val.seriessim != null ? '-' : val.seriesdivice
          
            var row = "";
            row += "<tr><td  class='c'>"
                + val.rownum + "</td><td>"
                + val.vattutb + "</td><td>"
                + SetValnull(val.loaithietbi) + "</td><td  class='c'>"
                + SetValnull(val.seriesmodem) + "</td><td  class='c'>"
                + SetValnull(val.seriessim) + "</td><td  class='c'>"
                + val.version + "</td><td  class='c'>"
                + val.countdivice + "</td><td  class='c'>"
                + val.bhtimestart + "</td><td  class='c'>"
                + val.bhtimeend + "</td><td>"
                + SetValnull(val.infoadd1) + "</td>"
            "</tr>";
            $("#myTableData_nhapxct").append(row);
        });

     

        //trinhnq 01/10/2016
        manggiatri = lst.data[1].kq1;
        // an hien btn
        var user = JSON.parse(localStorage.getItem("userinfo"));
      
        if (data.nguoinhan == user.fullname && data.approve.toLowerCase().indexOf("pending") >= 0) {
            $("#btnCapNhat_nhapxct").show();
        }
        else
            $("#btnCapNhat_nhapxct").hide();

        if (data.nguoigui == user.fullname  && data.approve.toLowerCase().indexOf("pending")>=0) {           
            $("#btnXoaPhieu_nhapxct").show();
        }
        else
            $("#btnXoaPhieu_nhapxct").hide();


        // tomausukien() ;
        $("#txt_tongsobanghi_chitietphieuxuat").empty();
        $.each(lst.data[2].kq2, function (key, val) {
            var row1 = val.allrow;
            $("#txt_tongsobanghi_chitietphieuxuat").append(row1);
        });
        loadphantrang_Danhsachchitiet(lst, para.VoiceCode);
    } catch (e) {
        console.log(e);
    }
}

function loadphantrang_Danhsachchitiet(lst,voicecode) {
    try {
        $("#pagecurent_chitietphieunhap ul").empty();
        $("#pagecurent_chitietphieunhap ul").append('<li><a  >Trang đầu</a></li>');
        $.each(lst.data[3].kq3, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_chitietphieunhap ul").append(row2);
        });
        $("#pagecurent_chitietphieunhap ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_chitietphieunhap").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_chitietphieunhap ul li a").addClass("active");
            console.log(page);
            var p = getAllIdMod();
            if (lst.data[1].kq1.length > 0) {
                loadxemchitietmaphieu_nhapxct(voicecode, page)
            }
        });
    } catch (e) {
        console.log(e);
    }
}

// xuat execl 
function f_XuatExecl_nhapxct() {
    try {
        
        xuatexecl_nhapxct();
    } catch (e) {
        console.log(e);
    }
}
function xuatexecl_nhapxct() {
    try {
       
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Import_XemChiTietTheoMaPhieu_Excel",
            namefile: "Chi_tiet_danh_nhap",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            VoiceCode: voicecodenhapxt
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
