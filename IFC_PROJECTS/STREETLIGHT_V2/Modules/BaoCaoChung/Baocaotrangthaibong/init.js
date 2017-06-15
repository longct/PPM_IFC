var countpage = 10;
$(document).ready(function () {
    try {
      
        loadInitDate();
        //loadConetent();
        //loadchecklog_master();
        loadtu_bcttbong();
       // loaddanhsach_bcttbong(1);
        $("#btn_tu_bcttbong").click(function () {
            loaddanhsach_bcttbong(1);
        });

    } catch (e) {
        console.log(e);
    }

});
function loaddanhsach_bcttbong(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_BAOCAO.BAOCAOTINHTRANGBONG", callback: "f_result_loaddanhsach_bcttbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_tu: p.cb_atu_bcttbong,
            v_trangthai:'',
            v_pagenum: page,
            v_numrecs: countpage,
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_bcttbong(config, para, lst) {
    try {
        var data = lst.data;
        if (data[0].kq0 == null || data[0].kq0 == '[]' || data[0].kq0 == undefined || data[0].kq0.length == 0) {
            messInfo("messinfo_bcttbong", "Không có dữ liệu hiển thị", "error");
            $("#tong_thai").hide();
            clearnull_bcttbong();
            return;
        }
        $("#tong_thai").show();
        messInfo("messinfo_bcttbong", "", "ok");
        hienthi_bcttbong(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthi_bcttbong(data) {
    try {

        $("#table_bcttbong").empty();
   
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenbong) + "</td><td>"
                + setnull(val.idrfbong) + "</td><td>"
                + setnull(val.thoidiemlap) + "</td><td>"
                + setnull(val.thoidiemday) + "</td><td>"
                + setnull(val.tentu) + "</td><td class='trang" + val.trangthai + "'>"
                + setnull(val.hienthitrangthai) + "</td></tr>";
            $("#table_bcttbong").append(row);
        });

        LoadPhanTrang("pageLst_bcttbong", "pageCurent_bcttbong", data[0].kq0, function () {
            var p = getAllIdMod();
            loaddanhsach_bcttbong($("#pagenumber").val());
        });

        $("#txt_tong_thai").text(data[1].kq1[0].tong);
        $("#txt_bonghong_thai").text(data[1].kq1[0].bonghong);
        $("#txt_bongtot_thai").text(data[1].kq1[0].bongtot);
        $("#txt_bong_mkn_thai").text(data[1].kq1[0].bongmkn);
        $("#txt_chuado_thai").text(data[1].kq1[0].bonga);


    } catch (e) {
        console.log(e);
    }

}

function clearnull_bcttbong() {
    try {
        $("#table_bcttbong").empty();
        $("#pageCurent_bcttbong").empty();
        $("#pageLst_bcttbong").empty();
      
        $("#txt_tong_thai").empty();
        $("#txt_bonghong_thai").empty();
        $("#txt_bongtot_thai").empty();
        $("#txt_bong_mkn_thai").empty();
        $("#txt_chuado_thai").empty();

    } catch (e) {
        console.log(e);
    }
}


function loadtu_bcttbong() {
    try {
        var config = { namesql: "PKG_QUANLYBONG.DANHSACHTU", callback: "f_result_loadtu_bcttbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Code: '0119'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtu_bcttbong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cb_atu_bcttbong", data, "id", "tenkhachhang", "-1", "Tất cả tủ");
    } catch (e) {
        console.log(e);
    }
}