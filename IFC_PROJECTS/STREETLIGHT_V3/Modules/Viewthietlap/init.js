var countpage = 10;
$(document).ready(function () {
    try {

        //loadInitDate();
        //loadConetent();
        //loadchecklog_master();
        var p = getAllIdMod();
        $("#txt_ngayfrom_viewtl").val(gettimenow());
        $("#txt_ngayto_viewtl").val(gettimenow());

        //loaddanhsach_viewtl(1);
        $("#btn_checkluu_viewtl").click(function () {
            loaddanhsach_viewtl(1);
        });



    } catch (e) {
        console.log(e);
    }

});
function loaddanhsach_viewtl(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_THIETLAPCANHBAO.HIENTHIVIEWTHIETLAP", callback: "f_result_loaddanhsach_viewtl", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_datefrom: p.txt_ngayfrom_viewtl,
            v_dateto: p.txt_ngayto_viewtl,
            v_pagenum: page,
            v_numrecs: countpage,
        };
        //console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_viewtl(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_viewtl", "Không có dữ liệu hiển thị", "error");
            clearnull_viewtl();
            return;
        }
        messInfo("messinfo_viewtl", "", "ok");
        hienthi_viewtl(data);




    } catch (e) {
        console.log(e);
    }
}
function hienthi_viewtl(data) {
    try {
        $("#table_viewtl").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.imei) + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.chude) + "</td><td>"
                + setnull(val.noidung) + "</td><td>"
                + setnull(val.loaicanhbao) + "</td><td>"
                + setnull(val.thoidiem) + "</td></tr>";
            $("#table_viewtl").append(row);
        });

        LoadPhanTrang("pageLst_viewtl", "pageCurent_viewtl", data, function () {
            var p = getAllIdMod();
            loaddanhsach_viewtl($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }

}

function clearnull_viewtl() {
    try {
        $("#table_viewtl").empty();
        $("#pageCurent_viewtl").empty();
        $("#pageLst_viewtl").empty();

    } catch (e) {
        console.log(e);
    }
}