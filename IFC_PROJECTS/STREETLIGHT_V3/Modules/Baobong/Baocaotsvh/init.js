var countpage = 10;
$(document).ready(function () {
    try {
        
        $('#baocao_tsvhbong').on('shown.bs.modal', function () {
        });
        loadInitDate();
        loadContent();
        loadchecklog_master();

        $("#txt_ngayfrom_tsvhbong").val(gettimenow());
        $("#txt_ngayto_tsvhbong").val(gettimenow());

        $("#btn_checkluu_tsvh").click(function () {
            load_tsvhbong(1);
        });

    } catch (e) {
        console.log(e);
    }

});
function load_tsvhbong(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_TSVHBONG.TSVH_BONG", callback: "f_result_load_tsvhbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_code: '',
            v_idtu: '',
            v_idbong: idbongda,
            v_datefrom: p.txt_ngayfrom_tsvhbong,
            v_dateto: p.txt_ngayto_tsvhbong,
            v_pagenum: page,
            v_numrecs: countpage,
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_load_tsvhbong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_tsvhbong", "Không có dữ liệu hiển thị", "error");
            clearnull_tsvhbong();
            return;
        }
        messInfo("messinfo_tsvhbong", "", "ok");
        hienthi_bong(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthi_bong(data) {
    try {
        $("#table_bc_bong").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.tenbong) + "</td><td>"
                + setnull(val.dong) + "</td><td>"
                + setnull(val.dienap) + "</td><td>"
                + setnull(val.congsuat) + "</td><td'>"
                + setnull(val.hienthitrangthai) + "</td></tr>";
            $("#table_bc_bong").append(row);
        });

        LoadPhanTrang("pageLst_tsvhbong", "pageCurent_tsvhbong", data, function () {
            var p = getAllIdMod();
            load_tsvhbong($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }

}

function clearnull_tsvhbong() {
    try {
        $("#table_bc_bong").empty();
        $("#pageCurent_tsvhbong").empty();
        $("#pageLst_tsvhbong").empty();

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