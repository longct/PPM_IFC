var countpage = 10;
$(document).ready(function () {
    try {
       
        var p = getAllIdMod();
        loadConetent();
        loadInitDate();
        setValToTxt("txt_datefrom_baocaotbdan", gettimenow());
        setValToTxt("txt_dateto_baocaotbdan", gettimenow());
        loaddatabase_baocaotbdan(p, 1);
        $("#btnThucHienDanhsach_baocaotbdan").click(function () {
            var p = getAllIdMod();
            var check = validate_baocaotbdan();
            if (check != "") {
                messInfo("messinfo_baocaotbdan", check, "error");
                clead_baocaotbdan();
                return;
            }
            loaddatabase_baocaotbdan(p, 1);

        });

    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
function loaddatabase_baocaotbdan(p, page) {
    try {

        var config = { namesql: "TB_BAOCAO_VTTBPhuOrHangHoa", callback: "f_result_loaddatabase_baocaotbdan", connstr: "ConnectEMS" };
        var para = {
            FromDate: p.txt_datefrom_baocaotbdan,
            ToDate: p.txt_dateto_baocaotbdan,
            HangHoaOrTBPhu: 1,
            v_page: page,
            v_pagecount: countpage
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_baocaotbdan(config, para, lst) {
    try {
        var data = lst.data;
        var p = getAllIdMod();
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_baocaotbdan", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_baocaotbdan + " đến " + p.txt_dateto_baocaotbdan, "error");
                clead_baocaotbdan();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaotbdan", "", "error");
        loaddulieu_baocaotbdan(data);

    } catch (e) {
        console.log(e);
    }
}
function loaddulieu_baocaotbdan(data) {
    try {
        $("#tblbaocao_baocaotbdan").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.rownum + "</td><td class='c'>"
                + val.tenvattu + "</td><td class='c'>"
                + val.donvitinh + "</td><td class='c'>"
                + val.sltondauky + "</td><td class='c'>"
                + val.slnhap + "</td><td class='c'>"
                + val.tongtondauky + "</td><td class='c'>"
                + val.xuatsanxuat + "</td><td class='c'>"
                + val.xuatthunghiem + "</td><td class='c'>"
                + val.tongxuat + "</td></tr>";

            $("#tblbaocao_baocaotbdan").append(row);
        });
        $("#txt_tongsobanghi_baocaotbdan").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng" + val.allrow;
            $("#txt_tongsobanghi_baocaotbdan").append(row1);
        });
        loadphantrang_baocaotbdan(data);

    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_baocaotbdan(data) {
    try {
        $("#pagecurent_baocaotbdan ul").empty();
        $("#pagecurent_baocaotbdan ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_baocaotbdan ul").append(row2);
        });
        $("#pagecurent_baocaotbdan ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_baocaotbdan").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_baocaotbdan ul li a").addClass("active");
            var p = getAllIdMod();
            loaddatabase_baocaotbdan(p, page);
        });
    } catch (e) {
        console.log(e);
    }
}


//============================================================KET THUC XY LY CAC CHUC NANG==========================================================
function clead_baocaotbdan() {
    try {
        $("#tblbaocao_baocaotbdan").empty();
        $("#txt_tongsobanghi_baocaotbdan").empty();
        $("#pagecurent_baocaotbdan ul").empty();
    } catch (e) {
        console.log(e);
    }
}
function validate_baocaotbdan() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaotbdan), timeyyyymmdd(p.txt_dateto_baocaotbdan));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}