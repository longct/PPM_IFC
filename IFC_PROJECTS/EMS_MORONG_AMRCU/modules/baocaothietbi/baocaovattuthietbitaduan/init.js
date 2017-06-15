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

        var config = { namesql: "TB_BAOCAO_THEODUAN", callback: "f_result_loaddatabase_baocaotbdan", connstr: "ConnectEMS" };
        var para = {
            FromDate: p.txt_datefrom_baocaotbdan,
            ToDate: p.txt_dateto_baocaotbdan,
            v_page: page,
            v_pagecount: countpage
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_baocaotbdan(config, para, lst) {
    try {
        var data = lst.data;
       
        var p = getAllIdMod();
        if (data == null || data == "[]" || data == "" || data.length == 0) {
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

        // ve ra bang theo cach auto
        // var data1 = data[0].kq0;
        $("#tblbaocao_baocaotbdan").empty();
        $.makeTable = function (data) {
            var table = $('<table class="table table-striped table-bordered table-hover table-condensed cmiss_table">');
            var rowth = "<thead><tr>";
            for (var titile in data[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
            rowth += "</tr></thead>";
            $(rowth).appendTo(table);
            $.each(data, function (index, value) {
                var row = "<tr>";
                $.each(value, function (key, val) {
                    row += "<td>" + valnulltochar(val) + "</td>";
                });
                row += "</tr>";
                $(table).append(row);
            });
            return ($(table));
        };
        var table = $.makeTable(data);
        $(table).appendTo("#tblbaocao_baocaotbdan");

    } catch (e) {
        console.log(e);
    }
}
function valnulltochar(val) {
    if (val == null || val == undefined)
        return '-';
    else
        return val;
}


//function loaddulieu_baocaotbdan(data) {
//    try {

//        // ve ra bang theo cach auto
//        var data1 = data[0].kq0;
//        $("#tblbaocao_baocaotbdan").empty();
//        $.makeTable = function (data1) {
//            var table = $('<table class="table table-striped table-bordered table-hover table-condensed cmiss_table">');
//            var rowth = "<thead><tr>";
//            for (var titile in data1[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
//            rowth += "</tr></thead>";
//            $(rowth).appendTo(table);
//            $.each(data1, function (index, value) {
//                var row = "<tr>";
//                $.each(value, function (key, val) {
//                    row += "<td>" + val + "</td>";
//                });
//                row += "</tr>";
//                $(table).append(row);
//            });
//            return ($(table));
//        };
//        var table = $.makeTable(data1);
//        $(table).appendTo("#tblbaocao_baocaotbdan");
//        //phan trang
//        $("#txt_tongsobanghi_baocaotbdan").empty();
//        $.each(data[1].kq1, function (key, val) {
//            var row1 = "Tổng" + val.allrow;
//            $("#txt_tongsobanghi_baocaotbdan").append(row1);
//        });
//        loadphantrang_baocaotbdan(data);

//    } catch (e) {
//        console.log(e);
//    }
//}

//function loadphantrang_baocaotbdan(data) {
//    try {
//        $("#pagecurent_baocaotbdan ul").empty();
//        $("#pagecurent_baocaotbdan ul").append('<li><a  >Trang đầu</a></li>');
//        $.each(data[2].kq2, function (key, val) {
//            var row2 = "";
//            row2 += '<li><a  >' + val.pape + '</a></li>';
//            $("#pagecurent_baocaotbdan ul").append(row2);
//        });
//        $("#pagecurent_baocaotbdan ul li a").click(function () {
//            var cuoi = $("#txt_tongsobanghi_baocaotbdan").html().split('/')[1].trim();
//            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
//            $("#pagecurent_baocaotbdan ul li a").addClass("active");
//            var p = getAllIdMod();
//            loaddatabase_baocaotbdan(p, page);
//        });
//    } catch (e) {
//        console.log(e);
//    }
//}


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