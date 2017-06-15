var countpage = 10;
$(document).ready(function () {
    try {

        //loadauto();
        $("#btn_timkiem_ttddxl").click(function () {

            timkiem(1);

        });
        //$("#cb_donvi_home").change(function () {
        //    loadauto();
        //});

    } catch (e) {
        console.log(e);
    }
});
//function loadauto() {
//    try{
//        var p = getAllIdMod();
//        var config = { connstr: f_getConnStrDonVi(), namesql: "AMOSI_THONGKETTDDLOI.LSTDIEMDO", callback: "result_loadauto_ttdxl" };
//        var para = {
//            v_Madonvi: p.cb_donvi_home
//        };
//        if (config.connstr == '' || config.connstr == null || config.connstr == undefined) return;
//        ExecuteServiceSyns(config, para);

//    } catch (e) {
//        console.log(e);
//    }
//}
function result_loadauto_ttdxl(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) return;
        var i = 0;
        var nameArr = [];
        nameArr.length = 0;
        $.each(data, function (key, val) {
            nameArr.push({
                label: val.tenkhachhang + ' - ' + val.makhachhang + ' - ' + val.socongto,
                value: val.makhachhang
            });
           
        });
        var availableTutorials = nameArr;
        $("#txt_timkiem_ttddxl").autocomplete({
            minLength: 1,
            delay: 200,
            source: availableTutorials
        });

    } catch (e) {
        console.log(e);
    }
}
//function timkiem(page) {
//    try {
//        var p = getAllIdMod();
//        var timkiem = p.txt_timkiem_ttddxl.split('-');
//        var config = { connstr: f_getConnStrDonVi(), namesql: "AMOSI_THONGKETTDDLOI.TTDIEMTIMKIEMDOXL", callback: "result_timkiem_tl" };
//        var para = {
//            v_Madonvi: p.cb_donvi_home,
//            v_Imei:timkiem[2],
//            v_Madiemdo:timkiem[3],
//            v_Socongto:timkiem[1],
//            v_Tenkhachhang:timkiem[0],
//            v_pagenum:page,
//            v_numrecs:countpage
//        };
//        if (config.connstr == '' || config.connstr == null || config.connstr == undefined) return;
//        ExecuteServiceSyns(config, para);
//    } catch (e) {
//        console.log(e);
//    }
//}
function result_timkiem_tl(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttddxl", "Không có dữ liệu hiển thị", "error");
            clearnull_ttddxl();
            return;
        }
       
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.imei + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.socongto + "</td><td>"
                + val.ngayxuly + "</td><td>"
                + val.tinhtrangtruocxyly + "</td><td>"
                + val.cachxuly + "</td><td>"
                + val.ketquaxuly + "</td><td>"
                + val.idloi + "</td><td>"
                + val.imeimoi + "</td></tr>";

            $("#table_ttddxl").append(row);
        });
        LoadPhanTrang("pageLst_ttddxl", "pageCurent_ttddxl", data, function () { 
            timkiem($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }

}
function clearnull_ttddxl() {
    try {
        $("#table_ttddxl").empty();
        $("#pageCurent_ttddxl").empty();
        $("#pageLst_ttddxl").empty();
    } catch (e) {
        console.log(e);
    }
}