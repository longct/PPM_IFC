
function loadthongtin_kbhd(id) {
    try {
        var config = { namesql: "TB_Import_LoadChiTietKBHD", callback: "f_TB_Import_LoadChiTietKBHD", connstr: "ConnectEMS" };
        var para = { id: parseInt(id) };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

// load ra chi tiet thiet bi
var sltongctkbhd = 0;
function f_TB_Import_LoadChiTietKBHD(config, para, lst) {
    try {
        sltongctkbhd = 0;
        $("#myTableData_nhapdact").empty();
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];
      

        $("#txtMahopdongHead_nhapxct").html("Thông tin chi tiết hợp đồng " + data.tenhd);
        setValToTxt('txtmahd_ct_hd', data.mahd);
        setValToTxt('txttenhd_ct_hd', data.tenhd);
        setValToTxt('txtghichu_ct_hd', data.ghichu);
        var sl = data.soluonghd != "" && data.soluonghd != 0 ? SetValnullNumber(data.soluonghd) : 0
        $("#txtsoluongtong_ct_hd").val(sl);
     
        $.each(lst.data[1].kq1, function (key, val) {
            sltongctkbhd = sltongctkbhd + val.soluong;
            var row = "";
            row += "<tr><td class='c'>"
                + val.stockcode + "</td><td class='c'>"
                + val.mavt + "</td><td>"
                + val.tenvt + "</td><td class='c'>"
                + val.soluong + "</td><td class='c'>"
                + SetValnull(val.tgbdbh) + "</td><td class='c'>"
                + SetValnull(val.tgktbh) + "</td><td class='c'>"
                + SetValnull(val.thoigiangh) + "</td><td style='width: 250px;'>"
              + val.ghichu + "</td>"
            "</tr>";
            $("#myTableData_nhapdact").append(row);
        });
        if (sl == 0)
            $("#txtsoluongtong_ct_hd").val(sltongctkbhd);
       
    } catch (e) {
        console.log(e);
    }
}
