var countpage_gbc = 10;
$(document).ready(function () {
    try {

        loadConetent();
        loadInitDate();
        setValToTxt("txt_dateFrom_gbc", gettimenow());
        setValToTxt("txt_dateTo_gbc", gettimenow());

        $("#btnTimKiem_gbc").click(function () {
            f_loadDanhSach_gbc(1);
        });

    } catch (e) { console.log(e); }
});

function f_loadDanhSach_gbc(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_GROUP_GOBO_DANHSACH", callback: "f_result_loadDanhSach_gbc", connstr: "ConnectEMS" };
        var para = {
            TUNGAY: p.txt_dateFrom_gbc,
            DENNGAY: p.txt_dateTo_gbc,
            TIMKIEM: p.txttimkiem_gbc,
            v_page: page,
            v_pagecount: countpage_gbc
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadDanhSach_gbc(config, para, lst) {
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]" || lst.data[0].kq0.length==0) {
            messInfo("messinfo_gbc", "Không tìm thấy kết quả thỏa mãn", "error");
            return;
        }
        messInfo("messinfo_gbc", "", "error");
        var user = JSON.parse(localStorage.getItem("userinfo"));

        $("#grview_gbc tbody").empty();
        $.each(lst.data[0].kq0, function (key, val) {
            var tr = "<tr>";
            tr += "<td>" + val.rownum + "</td>";
            tr += "<td>" + val.seriesdivice1 + "</td>";
            tr += "<td>" + val.seriesdivice2 + "</td>";
            tr += "<td>" + val.thuockho + "</td>";
            tr += "<td>" + val.fullname + "</td>";
            tr += "<td>" + val.timeinput + "</td>";
            if(val.userid == user.userid)
                tr += "<td> <a class='gobo_gbc' value='" + val.id_auto + "'>Gỡ bỏ</a></td>";
            else
                tr += "<td>Không có quyền</td>"
            ;
            tr += "</tr>";
            $("#grview_gbc tbody").append(tr);
        });

        $("#txt_tongsobanghi_gbc").empty();
        $.each(lst.data[1].kq1, function (key, val) {
            var row1 = "Tổng" + val.allrow;
            $("#txt_tongsobanghi_gbc").append(row1);
        });
        loadphantrang_gbc(lst.data);

        $(".gobo_gbc").click(function()
        {
            var id = $(this).attr("value");
            f_confimYesNo("Bạn muốn gỡ bỏ thiết bị?", "Bỏ qua", "Đồng ý",
              function () { f_goBoThietBi_gbc(id) });
        });
    } catch (e) {
        console.log(e);
    }
}


function loadphantrang_gbc(data) {
    try {
        $("#pagecurent_gbc ul").empty();
        $("#pagecurent_gbc ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_gbc ul").append(row2);
        });
        $("#pagecurent_gbc ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_gbc").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_gbc ul li a").addClass("active");
            f_loadDanhSach_gbc(page);
        });
    } catch (e) {
        console.log(e);
    }
}

function f_goBoThietBi_gbc(id) {
    var config = { namesql: "TB_GROUP_GOBO_THUCHIENGOBO", callback: "f_result_goBoThietBi_gbc", connstr: "ConnectEMS" };
    var para = {
        ID_AUTO: id
    };
    ExecuteServiceSyns(config, para);
}
function f_result_goBoThietBi_gbc(config,para,lst)
{
    if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]" || lst.data.length == 0) {
        messInfo("messinfo_gbc", "Gỡ bỏ thiết bị lỗi", "error");
        return;
    }
    else
    {
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0)
            messInfo("messinfo_gbc", lst.data[0].result, "ok");
        else
            messInfo("messinfo_gbc", lst.data[0].result, "error");
    }
}