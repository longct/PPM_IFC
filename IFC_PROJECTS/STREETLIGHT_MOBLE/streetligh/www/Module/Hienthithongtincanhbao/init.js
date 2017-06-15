var countpage = 10;
$(document).ready(function () {
    try {

        loadInitDate();
        loadConetent();
        loadchecklog_master();
        var p = getAllIdMod();
        $("#txt_ngayfrom_htcb").val(gettimenow());
        $("#txt_ngayto_htcb").val(gettimenow());

        loaddanhsach_htcb(1);
        $("#btn_checkluu_htcb").click(function () {
            loaddanhsach_htcb(1);
        });



    } catch (e) {
        console.log(e);
    }

});
function loaddanhsach_htcb(page) {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_CANHBAOWAR.LOITHIETLAPVIEW", callback: "f_result_loaddanhsach_htcb", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_datefrom: p.txt_ngayfrom_htcb,
            v_dateto: p.txt_ngayto_htcb,
            v_pagenum: page,
            v_numrecs: countpage,
        };
       
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_htcb(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_htcb", "Không có dữ liệu hiển thị", "error");
            clearnull_htcb();
            return;
        }
        messInfo("messinfo_htcb", "", "ok");
        hienthi_htcb(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthi_htcb(data) {
    try {
        $("#table_htcb").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.meterid + "</td><td>"
                + val.chude + "</td><td>"
                + val.noidung + "</td><td>"
                + val.thoidiema + "</td><td>"
                + setnull(val.trangthai) + "</td></tr>";
            $("#table_htcb").append(row);
        });

        LoadPhanTrang("pageLst_htcb", "pageCurent_htcb", data, function () {
            var p = getAllIdMod();
            loaddanhsach_htcb($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }

}

function clearnull_htcb() {
    try {
        $("#table_htcb").empty();
        $("#pageCurent_htcb").empty();
        $("#pageLst_htcb").empty();

    } catch (e) {
        console.log(e);
    }
}