var itemCount = 0;
var paraTable_xuatexcel = [];
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        setValToTxt('dtTungay', gettimenow());
        setValToTxt('dtDenngay', gettimenow());

        $("input[name=rdKieuLoc]").change(function () {
            var kieuloc = $(this).val();
            if (kieuloc == 'ngaythang') {
                $("#dtTungay").removeAttr('disabled');
                $("#dtDenngay").removeAttr('disabled');
                $("#txtSeries").attr('disabled', 'disabled');
            } else {
                $("#dtTungay").attr('disabled', 'disabled');
                $("#dtDenngay").attr('disabled', 'disabled');
                $("#txtSeries").removeAttr('disabled');
            }
        });

        $("#btnSearch").click(function () {
            f_loc_danh_sach_lsgc(1);
        });
        
    } catch (e) { console.log(e); }
});

//============================================================ XY LY CAC CHUC NANG==========================================================


function f_loc_danh_sach_lsgc(page) {
    var config = {
        namesql: "TB_BAOCAO_LICHSUGHEPCAP",
        callback: "f_result_loc_danh_sach_lsgc",
        connstr: "ConnectEMS"
    };
    var para = {
        Kieuloc: $("input[name=rdKieuLoc]:checked").val(),
        Tungay: $("#dtTungay").val(),
        Denngay: $("#dtDenngay").val(),
        Series: $("#txtSeries").val(),
        v_page:page,
	    v_pagecount:20
    };
    ExecuteServiceSyns(config, para, false);
}

function f_result_loc_danh_sach_lsgc(config, para, lst) {
    clear_lstgcpt();
    $("#tbDanhsach tbody").empty();
    messInfo("messinfo_lsgc", "", "error");
    if (!lst || lst.data.length == 0 || lst.data == '[]') {
        messInfo("messinfo_lsgc", "Không có dữ liệu phù hợp", "error");
        return;
    }

    $.each(lst.data[0].kq0, function (i, val) {
        var tr = '<tr>'
        + '<td>' + val.stt + '</td>'
        + '<td>' + SetValnull(val.tenvattu1) + '</td>'
        + '<td>' + val.seriesdivice1 + '</td>'
        + '<td>' + SetValnull(val.tenvattu2) + '</td>'
        + '<td>' + val.seriesdivice2 + '</td>'
        + '<td>' + SetValnull(val.timeinput) + '</td>'
        + '</tr>';
        $("#tbDanhsach tbody").append(tr);
    });

    $.each(lst.data[1].kq1, function (key, val) {
        var row1 = "Tổng Số Bản Ghi " + val.allrow;
        $("#txt_tongsobanghi_lstgc").append(row1);
    });
    loadphantrang_lsgc(lst);
}
function loadphantrang_lsgc(lst) {
    try {
        $("#pagecurent_lstgc ul").empty();
        $("#pagecurent_lstgc ul").append('<li><a  >Trang đầu</a></li>');
        $.each(lst.data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_lstgc ul").append(row2);
        });
        $("#pagecurent_lstgc ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_lstgc").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_lstgc ul li a").addClass("active");
            var p = getAllIdMod();
            f_ExcuteDatabase_bctke("TB_BAOCAO_LICHSUGHEPCAP", "f_result_loc_danh_sach_lsgc", page);

        });
    } catch (e) {
        console.log(e);
    }
}
function clear_lstgcpt() {
    try {
        $("#txt_tongsobanghi_imeitke").empty();
        $("#grview_imeitke tbody").empty();
    } catch (e) {
        console.log(e);
    }
}