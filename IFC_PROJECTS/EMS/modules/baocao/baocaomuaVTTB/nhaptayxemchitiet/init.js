

function loadthongtin_bcmuavttb_hd(HD_ID) {
    try {
        console.log("HD_ID");
        console.log(HD_ID);
        var p = getAllIdMod();
        var config = { namesql: "CHITIET_BCMUAVTTB_HD", callback: "f_ChiTietBCVTTB_HD", connstr: "ConnectEMS" };
        var para = {
            id:parseInt(HD_ID)
        };
      
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

// load ra chi tiet thiet bi
function f_ChiTietBCVTTB_HD(config, para, lst) {
    try {
        console.log(lst);
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];
        $("#txtMahopdongHead_nhapxct").html("Thông tin chi tiết hợp đồng " + data.tenhd);
        setValToTxt('txtmahd_ct_bcvttb_hd', data.mahd);
        setValToTxt('txttenhd_ct_bcvttb_hd', data.tenhd);
        setValToTxt('txtsoluongtong_ct_bcvttb_hd', data.soluonghd);
        setValToTxt('txtsoluongnhan_ct_bcvttb_hd', data.soluongnhan);
        setValToTxt('txtsoluongcon_ct_bcvttb_hd', data.soluongcon);
        setValToTxt('txtghichu_ct_bcvttb_hd', data.ghichu);
      
        $("#myTableData_vttbhdct").empty();
        $.each(lst.data[1].kq1, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stockcode + "</td><td>"
                + val.mavt + "</td><td>"
                + val.tenvt + "</td><td>"
                + val.soluong + "</td><td>"
                + val.tggiao + "</td>"
            "</tr>";
            $("#myTableData_vttbhdct").append(row);
        });

       
    } catch (e) {
        console.log(e);
    }
}
