
function loadthongtinchitiet_kbda(id) {
    try {
        var config = { namesql: "TB_KH_LoadKhaiBaoDuAn_XemChiTiet", callback: "f_TB_KH_LoadKhaiBaoDuAn_XemChiTiet", connstr: "ConnectEMS" };
        var para = { id: parseInt(id) };
      
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

// load ra chi tiet thiet bi
function f_TB_KH_LoadKhaiBaoDuAn_XemChiTiet(config, para, lst) {
    try {
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];
      

        $("#txtMaduanHead_nhapxct").html("Thông tin chi tiết dự án " + data.projectname);
        setValToTxt('cb_banmien_ct_da', data.banmien);
        setValToTxt('txtmaduan_ct_da', data.maduan);
        setValToTxt('txttenduan_ct_da', data.projectname);
        setValToTxt('txtthoigian_ct_da', data.thoigiangh);
        setValToTxt('txtghichu_ct_da', data.ghichu);
      
        $("#myTableData_nhapdact").empty();
        $.each(lst.data[1].kq1, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.dienluc + "</td><td>"
                + val.typedevicename + "</td><td>"
                + val.tenvattu + "</td><td>"
                + val.countdivice + "</td><td>"
                + val.ghichu + "</td>"
            "</tr>";
            $("#myTableData_nhapdact").append(row);
        });

       
    } catch (e) {
        console.log(e);
    }
}
