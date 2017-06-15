$(document).ready(function () {
    $("#btnXuatExcel_bckt_chitiet").click(function () {
        XuatExcel_bckt_chitiet();
    });
});

function load_chitiet_baocaokhotong(vendorid, trangthai, khotong, khobophan, nhanvien, vattuthietbi, loaithietbi, tinhtrang,dateto,page) {
    try {
        $("#myTableData_nhapxct").empty();
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
            tinhtrang: tinhtrang,
            dateto: dateto,
            v_page: page,
            v_pagecount:5
        };
        localStorage.setItem("parakho",JSON.stringify(para))
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

// load ra chi tiet thiet bi
function f_result_load_chitiet_baocaokhotong(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined || lst == '[]') return;
        $("#messinfo_nhapxct").html("");
        $("#messinfo_nhapxct").hide();
       
        localStorage["data_bckhotong_chitiet"] = JSON.stringify(lst.data);
        $("#txtMaphieuHead_nhapxct").html("Thông tin chi tiết");

       
        $.each(lst.data[0].kq0, function (key, val) {
            var stt = key + 1;
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
        // tomausukien() ;
        $("#txt_tongsobanghi_chitietkho").empty();
      
        var row1 = lst.data[1].kq1[0].allrow;
        $("#txt_tongsobanghi_chitietkho").append(row1);
        loadphantrang_Danhsachchitietkho(lst, para);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_Danhsachchitietkho(lst, para) {
    try {
        $(".chitietkho").show();
        $("#pagecurent_chitietkho ul").empty();
        $("#pagecurent_chitietkho ul").append('<li><a  >Trang đầu</a></li>');
        console.log(lst.data[2].kq2);
        $.each(lst.data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a>' + val.pape + '</a></li>';
            $("#pagecurent_chitietkho ul").append(row2);
        });
        $("#pagecurent_chitietkho ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_chitietkho").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_chitietkho ul li a").addClass("active");

            var p = getAllIdMod();
            if (lst.data[0].kq0.length > 0) {
                load_chitiet_baocaokhotong(para.VendorId, para.Trangthai,para.khotong,para.khobophan,para.nhanvien,para.vattuthietbi,para.loaithietbi,para.tinhtrang,para.dateto, page)
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function XuatExcel_bckt_chitiet() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Baocao_Khotongchitiet",
            namefile: "BCKhotong_Chitiet",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var p11 =JSON.parse(localStorage.getItem("parakho"));
        console.log(p11);
        var para = {
            VendorId: p11.VendorId,
            Trangthai: p11.Trangthai,
            khotong: p11.khotong,
            khobophan: p11.khobophan,
            nhanvien: p11.nhanvien,
            vattuthietbi: p11.vattuthietbi,
            loaithietbi: p11.loaithietbi,
            tinhtrang: p11.tinhtrang,
            dateto: p11.dateto,
            v_page: 1,
            v_pagecount: 10000000
        };
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
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}