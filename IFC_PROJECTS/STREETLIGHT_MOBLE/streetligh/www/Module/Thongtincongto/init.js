var Countpage =10
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();
        loadthongtincongto(1);
        $("#btn_timkiem").click(function () {
            var p = getAllIdMod();
            loadtimkiemcongto(p, 1);
        });
    } catch (e) {
        console.log(e);
    }
});

function loadthongtincongto(page) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_CAPNHAPDCU.LOADDANHSACHTHONGTIN", callback: "f_result_loadthongtincongto", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Code: userinfo.madonvi,
            v_pagenum: page,
            v_numrecs: Countpage
        };
        ExecuteServiceSyns(config, para, false);


    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtincongto(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttct", "Không có dữ liệu hiển thị", "error");
            clearnull_ttct();
            return;
        }
        messInfo("messinfo_ttct", "", "ok");
        hienthithongtin(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthithongtin(data) {
    try {
        $("#table_thontinct").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.socongto + "</td><td>"
                + val.imei + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.code + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_ttcongto' value='" + val.id + "' id='btn_suathongcongto" + val.id + "'>Sửa</a></div> </form></td></tr>";

            $("#table_thontinct").append(row);
            $("#btn_suathongcongto" + val.id).click(function () {
               
                messInfo("messinfo_sua_tc", "", "ok");

                thongtincongto_ct(val.id);
            });

        });

        LoadPhanTrang("pageLst_thct", "pageCurent_thct", data, function () {
            loadthongtincongto($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}
function clearnull_ttct() {
    try{
        $("#table_thontinct").empty();
        $("#pageCurent_thct").empty();
        $("#pageLst_thct").empty();

    } catch (e) {
        console.log(e);
    }
}


function loadtimkiemcongto(p, page) {
    try{
        var config = { namesql: "PKG_CAPNHAPDCU.TIMKIEM", callback: "f_result_timkiem_loadtk", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Timkiem: p.txt_timkiemcongto,
            v_pagenum: page,
            v_numrecs: Countpage
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_timkiem_loadtk(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttct", "Không có dữ liệu hiển thị", "error");
            clearnull_ttct();
            return;
        }
        messInfo("messinfo_ttct", "", "ok");
        timkiemhienthithongtin(data);
    } catch (e) {
        console.log(e);
    }
}
function timkiemhienthithongtin(data) {
    try {
        $("#table_thontinct").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.socongto + "</td><td>"
                + val.imei + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.code + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_ttcongto' value='" + val.id + "' id='btn_suathongcongto" + val.id + "'>Sửa</a></div>  </form></td></tr>";

            $("#table_thontinct").append(row);
            $("#btn_suathongcongto" + val.id).click(function () {
              
                messInfo("messinfo_sua_tc", "", "ok");
                thongtincongto_ct(val.id);
            });
        });

        LoadPhanTrang("pageLst_thct", "pageCurent_thct", data, function () {
            var p = getAllIdMod();
            loadtimkiemcongto(p,$("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}