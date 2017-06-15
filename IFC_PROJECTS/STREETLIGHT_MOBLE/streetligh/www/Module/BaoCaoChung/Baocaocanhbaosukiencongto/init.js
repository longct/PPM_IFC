var countpage = 10;
$(document).ready(function () {
    try {
        loadInitDate();
        loadConetent();
        loadchecklog_master();
        //loadsukien_bcskct();
       
        $("#txt_ngayfrom_bcskct").val(gettimenow());
        $("#txt_ngayto_bcskct").val(gettimenow());
        loaddanhsach_bcskct(1);
        $("#btn_checkluu_bcskct").click(function () {
            loaddanhsach_bcskct(1);
        });
        
    } catch (e) {
        console.log(e);
    }

});
function loaddanhsach_bcskct(page) {
    try {
        var p = getAllIdMod();

        var config = { namesql: "PKG_BAOCAO.BAOCAOSUKIEN", callback: "f_result_loaddanhsach_bcskct", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_sukien:'',
            v_datefrom: p.txt_ngayfrom_bcskct,
            v_dateto: p.txt_ngayto_bcskct,
            v_pagenum: page,
            v_numrecs: countpage,
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_bcskct(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_bcskct", "Không có dữ liệu hiển thị", "error");
            clearnull_bcskct();
            return;
        }
        messInfo("messinfo_bcskct", "", "ok");
        hienthi_bcskct(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthi_bcskct(data) {
    try {
        $("#table_bcskct").empty();
 
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.imei) + "</td><td>"
                + setnull(val.idrfbong) + "</td><td>"
                + setnull(val.tenbong) + "</td><td>"
                + setnull(val.timestart) + "</td><td>"
                + setnull(val.timeend) + "</td><td>"
                + setnull(val.event) + "</td><td class='bong" + val.trangthai + "'>"
                + setnull(val.hienthitrangthai) + "</td></tr>";
            $("#table_bcskct").append(row);
        });

        LoadPhanTrang("pageLst_bcskct", "pageCurent_bcskct", data, function () {
            var p = getAllIdMod();
            loaddanhsach_bcskct($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }

}

function clearnull_bcskct() {
    try {
        $("#table_bcskct").empty();
        $("#pageCurent_bcskct").empty();
        $("#pageLst_bcskct").empty();

    } catch (e) {
        console.log(e);
    }
}


//function loadsukien_bcskct() {
//    try {
//        var config = { namesql: "PKG_BAOCAO.LST_SUKIEN", callback: "f_result_loadsukien_bcskct", connstr: "ConnectOracleStreetLight" };
//        var para = [];
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadsukien_bcskct(config, para, lst) {
//    try {
//        var data = lst.data;

//        dataToCob("cb_sukienct_bcskct", data, "id_name", "name_sukien", "-1", "Tất Cả");
//    } catch (e) {
//        console.log(e);
//    }
//}