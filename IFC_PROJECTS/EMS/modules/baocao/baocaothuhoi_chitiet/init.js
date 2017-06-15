$(document).ready(function () {
    $("#btnXuatExcel_bckt_chitiet").click(function () {
        XuatExcel_bckt_chitiet();
    });
});

function load_chitiet_baocaokhotong(vendorid, trangthai, khotong, khobophan, nhanvien, vattuthietbi, loaithietbi, tinhtrang) {
    try {
        console.log(vendorid, trangthai);
        var config = {
            namesql: "TB_Baocao_Khotongchitiet",
            callback: "f_result_load_chitiet_baocaokhotong",
            connstr: "ConnectEMS"
        };
        var para = {
            VendorId: vendorid,
            Trangthai: trangthai,
            khotong: khotong,
            khobophan: khobophan,
            nhanvien: nhanvien,
            vattuthietbi: vattuthietbi,
            loaithietbi: loaithietbi,
            tinhtrang:tinhtrang
        };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

// load ra chi tiet thiet bi
function f_result_load_chitiet_baocaokhotong(config, para, lst) {
    try {
        $("#messinfo_nhapxct").html("");
        $("#messinfo_nhapxct").hide();
        console.log(lst);
        localStorage["data_bckhotong_chitiet"] = JSON.stringify(lst.data);
        $("#txtMaphieuHead_nhapxct").html("Thông tin chi tiết");

        $("#myTableData_nhapxct").empty();
        $.each(lst.data, function (key, val) {
            var seriesdivive = val.seriesmodem != null && val.seriessim != null ? '-' : val.seriesdivice;
            val.seriesdivice = val.seriesmodem != null && val.seriessim != null ? '-' : val.seriesdivice;
            var stt = key + 1;
            var row = "";
            row += "<tr><td  class='c'>"
                + stt + "</td><td>"
                + val.vattutb + "</td><td>"
                + SetValnull(val.loaithietbi) + "</td><td  class='c'>"
                + seriesdivive + "</td><td  class='c'>"
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

    } catch (e) {
        console.log(e);
    }
}

function XuatExcel_bckt_chitiet() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namefile: "BCKhotong_Chitiet",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = JSON.parse(localStorage.getItem("data_bckhotong_chitiet"));
        var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "vattutb", name: "Vật tư thiết bị", type: "Text" },
               { field: "loaithietbi", name: "Loại thiết bị", type: "Text" },
               { field: "seriesdivice", name: "Series", type: "Text" },
               { field: "seriesmodem", name: "IMEI ghép nối", type: "Text" },
                { field: "seriessim", name: "Series sim ghép nối", type: "Text" },
                { field: "version", name: "Version", type: "Text" },
               { field: "countdivice", name: "Số lượng", type: "Text" },
               { field: "bhtimestart", name: "Bắt đầu bảo hành", type: "Text" },
               { field: "bhtimeend", name: "Kết thúc bảo hành", type: "Text" },
               { field: "infoadd1", name: "Thông tin thêm", type: "Text" }

            ]
        };
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    } catch (e) {
        console.log(e);
    }
}