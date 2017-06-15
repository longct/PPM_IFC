var manggiatri = [];
function loadtracunhanh_xuatxct(voicecode) {
    try {
      
        var config = { namesql: "TB_Import_TraCuuNhanhTheoMaPhieu", callback: "f_result_tracuunhanh_xuatxct", connstr: "ConnectEMS" };
        var para = { VoiceCode: voicecode };
      
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}


//============================================================ XY LY CAC CHUC NANG==========================================================


// load ra chi tiet thiet bi
function f_result_tracuunhanh_xuatxct(config, para, lst) {
    try {
        $("#messinfo_tcn_nhapxct").html("");
        $("#messinfo_tcn_nhapxct").hide();
        var p = getAllIdMod();
        var data = lst.data;
      

        $("#txtMaphieuHeadtracuunhanh_xuatxct").html("Thông tin chi tiết mã phiếu " + para.VoiceCode);
      
        $("#myTableDataTCN_xuatxct").empty();
        $.each(data, function (key, val) {
            var stt = key + 1;
            var row = "";
            row += "<tr><td  class='c'>"
                + stt + "</td><td>"
                + val.vattutb + "</td><td>"
                + SetValnull(val.loaithietbi) + "</td><td  class='c'>"
                + val.countdivice + "</td></td>"
            "</tr>";
            $("#myTableDataTCN_xuatxct").append(row);
        });

       
    } catch (e) {
        console.log(e);
    }
}
