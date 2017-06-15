var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        Loadcomboxbanmien_qlbcode();
        Loadnhacungcap_qlbcode();
        setValToTxt('txt_datetobh_qlbcode', gettimenow());
        setValToTxt('txt_datefrom_qlbcode', gettimenow());
        $("#btninbaocao_qlbcode").click(function () {
            loaddanhsachbarcode_qlbcode(1);
        });
        $("#btexecl_qlbcode").click(function () {
            Xuatexecl_qlbcode();
        })

    } catch (e) { console.log(e); }
});
function checknull_qlbcode() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_qlbcode), timeyyyymmdd(p.txt_datetobh_qlbcode));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày"
        var ovderday2 = compareDates(new Date(), timeyyyymmdd(p.txt_datefrom_qlbcode));
        if (ovderday2.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.txt_datetobh_qlbcode));
        if (ovderday.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function Loadcomboxbanmien_qlbcode() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_Loadcomboxbanmien_qlbcode", connstr: "ConnectEMS" };
        var para = {
            IsType: 'LoadDienluc',
            Code: '01'
            //Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcomboxbanmien_qlbcode(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkhobanmien_qlbcode", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function Loadnhacungcap_qlbcode() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadnhacungcap_qlbcode", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadnhacungcap_qlbcode(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_qlbcode", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cbnhacungcap_qlbcode", data[4].kq4, "code", "name", "-1", "--Tất cả--");
        dataToCob("cbchusohuu_qlbcode", data[2].kq2, "code", "name", "-1", "--Chọn chủ sở hữu-");
    } catch (e) {
        console.log(e);
    }
}

function loaddanhsachbarcode_qlbcode(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_BARCODE_DANHSACH", callback: "f_result_loaddanhsachbarcode_qlbcode", connstr: "ConnectEMS" };
        var para = {
              TUNGAY:p.txt_datefrom_qlbcode,
              DENNGAY:p.txt_datetobh_qlbcode,
              CHUSOHUU: p.cbchusohuu_qlbcode,
              KHOBANMIEN:p.cbkhobanmien_qlbcode,
              NHACUNGCAP:p.cbnhacungcap_qlbcode,
              LOAITHIETBI: p.cbloaithietbi_qlbcode,
              v_page: page,
              v_pagecount: countpage,
        }; 
        ExecuteServiceSyns(config, para, false);

    } catch (e) { console.log(e); }
}
function f_result_loaddanhsachbarcode_qlbcode(config, para, lst) {
    try{
        var p = getAllIdMod();
        var data = lst.data;
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_qlbcode", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_qlbcode + " đến " + p.txt_datetobh_qlbcode, "error");
                clear_qlbcode();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_qlbcode", "", "error");
        $("#grview_qlbcode").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + SetValnull(val.rownum) + "</td><td>"
                + SetValnull(val.mabarcode) + "</td><td>"
                + SetValnull(val.detailbarcode) + "</td><td>"
                + SetValnull(val.tennhacungcap) + "</td><td>"
                + SetValnull(val.tenvattu) + "</td><td>"
                + SetValnull(val.timeinput) + "</td></tr>";
            $("#grview_qlbcode").append(row);
        });


        $("#txt_tongsobanghi_qlbcode").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_qlbcode").append(row1);
        });
        loadphantrang_qlbcode(data);
    } catch (e) { console.log(e); }
}

function loadphantrang_qlbcode(data) {
    try {
        $("#pagecurent_qlbcode ul").empty();
        $("#pagecurent_qlbcode ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_qlbcode ul").append(row2);
        });
        $("#pagecurent_qlbcode ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_qlbcode").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_qlbcode ul li a").addClass("active");
            loaddanhsachbarcode_qlbcode(page);
        });
    } catch (e) {
        console.log(e);
    }
}

function clear_qlbcode() {
    try {
        $("#grview_qlbcode").empty();
        $("#txt_tongsobanghi_qlbcode").empty();
        $("#pagecurent_qlbcode ul").empty();
    } catch (e) {
        console.log(e);
    }
}

function Xuatexecl_qlbcode() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BARCODE_DANHSACH",
            namefile: "Quanlydanhsachbarcode",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
       var para = {
            TUNGAY: p.txt_datefrom_qlbcode,
            DENNGAY: p.txt_datetobh_qlbcode,
            CHUSOHUU: p.cbchusohuu_qlbcode,
            KHOBANMIEN: p.cbkhobanmien_qlbcode,
            NHACUNGCAP: p.cbnhacungcap_qlbcode,
            LOAITHIETBI: p.cbloaithietbi_qlbcode,
            v_page: -1,
            v_pagecount: countpage,
        };
       var colum = {

           kq: [{ field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "mabarcode", name: "Mã barcode", type: "TextAndBoldCenter" },
              { field: "detailbarcode", name: "Chi tiết barcode", type: "Text" },
              { field: "tennhacungcap", name: "Nhà cung cấp", type: "Text" },
              { field: "tenvattu", name: "Loại thiết bị", type: "Text" },
              { field: "timeinput", name: "Thời điểm", type: "Text" }]
       };
       excuteExcel(config, para, colum, true);

    } catch (e) { console.log(e); }
}





