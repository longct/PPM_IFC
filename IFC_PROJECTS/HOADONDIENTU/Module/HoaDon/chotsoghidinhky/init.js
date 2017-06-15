
var v_pagenum = 20;
$(document).ready(function () {
    try {
        loadConetent();
        $('#txt_thang_csgdk').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        });
        $('#txt_thang_csgdk').datepicker('setDate', new Date());
      

        $("#btn_timkiem_csgdk").click(function () {
            if ($('#txt_thang_csgdk').val() != "") {
                GetChiSoChot_data(1);
            } else {
                showToast("Vui lòng nhập tháng", 'error');
            }
        });

    } catch (e) {
        console.log(e);
    }
});
function GetChiSoChot_data(v_page) {
    try {
        var v_ky=$("#cb_kychot_csgdk").val();
        var v_thang='01' + "/" + $("#txt_thang_csgdk").val();
        var config = { namesql: "HD_CHISOCHOT_PKG.GETDATACHISOCHOT", callback: "f_result_getchisochot_data", connstr: "Oracle_HDDT" };
        var para = {
            v_ky: v_ky,
            v_thang: v_thang,
            v_pagenum: v_page,
            v_numrecs: v_pagenum
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_getchisochot_data(config, para, lst) {
    try {
        var data = lst.data;
        messInfo("messinfo_cscdk", "", 'error');
        console.log(data);
        $("#table_chotsoghidinhky").empty();
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_cscdk", "Không có dữ liệu hiển thị", 'error');
            return;
        }

   
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.madiemdo) + "</td><td class='l'>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.socongto) + "</td><td>"
                + setnull(val.pgiaotong) + "</td><td>"
                + setnull(val.pgiao1) + "</td><td>"
                + setnull(val.pgiao2) + "</td><td>"
                + setnull(val.pgiao3) + "</td></tr>";
            $("#table_chotsoghidinhky").append(row);

        });
        LoadPhanTrang("pageLst_csgdk", "pageCurent_csgdk", data, function () {
            GetChiSoChot_data($("#pagenumber").val());
        });
       
    } catch (e) {
        console.log(e);
    }
}



