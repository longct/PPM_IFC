
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        loaddatabase_nhasanxuat(1);
       
        $("#btn_search_nsx").click(function () {
            loaddatabase_nhasanxuat(1);
        });
    } catch (e) { console.log(e); }
});

function loaddatabase_nhasanxuat(page) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_LIS_NHASANXUAT_DS", callback: "f_result_loadbandau_nhasanxuat", connstr: "ConnectEMS" };
        var para = {
           TEN:$("#txt_tennsx_search").val(),
           pagenum: page,
	       numrecs:15
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_nhasanxuat(config, para, lst) {
    try {
 
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_tienichnsx", "Không có dữ liệu hiển thị ", "error");
            return;
        }
        var data = lst.data;
       
        messInfo("messinfo_tienichnsx", "", "error");

        $("#myTableData_tienichnsx").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td style='width:20px'>"
                  + val.stt + "</td><td>"
                  + val.tennhasanxuat + "</td><td style='width:155px'>"
                  + "<form class='form-inline' role=''form'><div class='form-group classquyen_sua'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_nhasaxuat' style='width: 65px;height: 30px;' id='btn_suasx" + val.idnhasanxuat + "'>Sửa</a></div><div class='form-group classquyen_xoa'><a href='#' class='btn btn-success btn-action'  style='width: 65px;height: 30px;' onclick='Xoansx(" + val.idnhasanxuat + ")'>Xóa</a></div></form></td> </tr>";

            $("#myTableData_tienichnsx").append(row);
                

            $("#btn_suasx" + val.idnhasanxuat).click(function () {
                messInfo("messinfo_sanxuat", '', "ok");
                loadsuanhasanxuat_sua(val.idnhasanxuat);
            });
        });
        LoadPhanTrang("pageLst_nsx", "pageCurent_nsx", data, function () {
            loaddatabase_nhasanxuat($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function Xoansx(id) {
    try{
        f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () { f_xoa_nsx(id); });
    } catch (e) {
        console.log(e);
    }
}

function f_xoa_nsx(id) {
    try {
        var config = { namesql: "TB_Lis_Xoa_NSX", callback: "resutl_fn_xoa", connstr: "ConnectEMS" };
        var para = {

            ID:id
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function resutl_fn_xoa(config, para, lst) {
    try {

        if (lst == null || lst == undefined) return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
          
            messInfo("messinfo_tienichnsx", lst.data[0].result, "ok");
            setTimeout(function () {
                messInfo("messinfo_tienichnsx", '', 'ok');
            }, 2000);
            loaddatabase_nhasanxuat(1);
        }
        else
            messInfo("messinfo_tienichnsx", lst.data[0].result, "error");
    } catch (e) {
        console.log(e);
    }
}