var countpage=10;
$(document).ready(function () {
    try {

        loadInitDate();
        //loadConetent();
        loadchecklog_master();
        var p = getAllIdMod();
        $("#txt_ngayfrom_bcaond").val(gettimenow());
        $("#txt_ngayto_bcaond").val(gettimenow());

       // loaddanhsach_bcaond(1);
        $("#btn_checkluu_bcaond").click(function () {
            loaddanhsach_bcaond(1);
        });



    } catch (e) {
        console.log(e);
    }

});
function loaddanhsach_bcaond(page) {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_BAOCAO.BAOCAOSUKIENNGUOIDUNG", callback: "f_result_loaddanhsach_bcaond", connstr: "ConnectOracleStreetLight" };
        var para = {
          v_timkiem:'',
          v_datefrom:p.txt_ngayfrom_bcaond,
          v_dateto:p.txt_ngayto_bcaond,
          v_pagenum:page,
          v_numrecs: countpage,
        };
        ////console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_bcaond(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_bcaond", "Không có dữ liệu hiển thị", "error");
            clearnull_bcaond();
            return;
        }
        messInfo("messinfo_bcaond", "", "ok");
        hienthi_bcaond(data);




    } catch (e) {
        console.log(e);
    }
}
function hienthi_bcaond(data) {
    try {
        $("#table_bcaond").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.thongtin) + "</td><td>"
                + setnull(val.thoidiem) + "</td><td>"
                + setnull(val.tennguoidung) + "</td></tr>";
            $("#table_bcaond").append(row);
        });

        LoadPhanTrang("pageLst_bcaond", "pageCurent_bcaond", data, function () {
            var p = getAllIdMod();
            loaddanhsach_bcaond($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }

}

function clearnull_bcaond() {
    try {
        $("#table_bcaond").empty();
        $("#pageCurent_bcaond").empty();
        $("#pageLst_bcaond").empty();

    } catch (e) {
        console.log(e);
    }
}