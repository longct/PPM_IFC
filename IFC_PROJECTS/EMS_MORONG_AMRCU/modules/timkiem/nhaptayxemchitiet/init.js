




function loadxemchitietmaphieu_timkiemkytu(voicecode) {
    try {
        var config = { namesql: "TB_Import_XemChiTietTheoMaPhieu", callback: "f_result_loadxemthem_timkiemkytu", connstr: "ConnectEMS" };
        var para = { VoiceCode: voicecode };
      
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
//============================================================ XY LY CAC CHUC NANG==========================================================

// load ra chi tiet thiet bi
function f_result_loadxemthem_timkiemkytu(config, para, lst) {
    try {
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];

        $("#txtMaphieuHead_timkiem").html("Thông tin chi tiết mã phiếu " + data.voicecode);
        setValToTxt('txtMaphieu_timkiem', data.voicecode);
        setValToTxt('cb_khonhap_timkiem', data.kho);
        setValToTxt('cbnguoigui_timkiem', data.nguoigui);
        setValToTxt('cbnguoiduyet_timkiem', data.nguoinhan);
        setValToTxt('cbchusohuu_timkiem', data.nameowner);
        setValToTxt('txtmavandon_timkiem', data.trackingnumber);
        setValToTxt('file_bienban_timkiem', data.filecv);
        setValToTxt('txtlydonhap_timkiem', data.note);

        $("#myTableDatasau_timkiem").empty();
        $.each(lst.data[1].kq1, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.vattutb + "</td><td>"
                + val.loaithietbi + "</td><td>"
                + val.seriesdivice + "</td><td>"
                + val.version + "</td><td>"
                + val.countdivice + "</td><td>"
                + val.bhtimestart + "</td><td>"
                + val.bhtimeend + "</td><td>"
                + val.infoadd1 + "</td>"
            "</tr>";
            $("#myTableDatasau_timkiem").append(row);
        });

        localStorage.setItem("para_xemchitiet_timkiem", JSON.stringify(lst.data[1].kq1));
        // an hien btn
    } catch (e) {
        console.log(e);
    }
}
// xuat execl 
function f_XuatExecl_timkiem() {
    try {
        console.log('xuatexecl');
        xuatexecl_timkiem();
    } catch (e) {
        console.log(e);
    }
}
function xuatexecl_timkiem() {
    try {
       
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Import_XemChiTietTheoMaPhieu",
            namefile: "Chi_tiet_timkiem",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = JSON.parse(localStorage.getItem("para_xemchitiet_timkiem"));
        var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var colum = {
            kq: [
               { field: "vattutb", name: "Vật tư thiết bị", type: "Text" },
               { field: "loaithietbi", name: "Loại thiết bị", type: "Text" },
               { field: "seriesdivice", name: "Series", type: "Text" },
               { field: "version", name: "Version", type: "Text" },
               { field: "countdivice", name: "Số lượng", type: "Text" },
               { field: "bhtimestart", name: "Bắt đầu bảo hành", type: "Text" },
               { field: "bhtimeend", name: "Kết thúc bảo hành", type: "Text" },
               { field: "infoadd1", name: "Thông tin thêm", type: "Text" }]
        };
       
        excuteExcelHaveData(config,JSON.parse(dt), colum, true);
    } catch (e) {
        console.log(e);
    }

}



//============================================================ XY LY CAC CHUC NANG==========================================================
