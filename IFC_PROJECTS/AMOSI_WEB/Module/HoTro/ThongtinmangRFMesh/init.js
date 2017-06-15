var countpage = 1000;
$(document).ready(function () {
    try {
        setTitle("Thông tin mạng RFMESH");
        loadDoiSoat(1);
        $("#btn_timkiem").click(function () {
            timkiem(1);
        });

    } catch (e) {
        console.log(e);
    }
});
function loadDoiSoat(page) {
    try{
        var p = getAllIdMod();
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DOISOAT.XEMDOISOAT", callback: "result_loaddoisoat" };
        var para = {
            //v_search: p.txt_timkiem
            v_pagenum: page,
            v_numrecs: countpage,
        };
        if (config.connstr == '' || config.connstr == null || config.connstr == undefined) return;
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loaddoisoat(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) return;
        var i = 0;
        var nameArr = [];
        nameArr.length = 0;
        $.each(data, function (key, val) {
            nameArr.push({
                label: val.tenkhachhang + ' - ' + val.madiemdo + ' - ' + val.socongto + ' - ' + val.imei,
                value: val.madiemdo + ' - ' + val.socongto + ' - ' + val.imei,
            });
           
        });
        var availableTutorials = nameArr;
        $("#txt_timkiem").autocomplete({
            minLength: 1,
            delay: 200,
            source: availableTutorials
        });

        //result_timkiem(config, para, lst);

    } catch (e) {
        console.log(e);
    }
}
function timkiem(page) {
    try {
        var p = getAllIdMod();
        var timkiem = p.txt_timkiem.split('-');
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DOISOAT.TIMKIEMDOISOAT", callback: "result_timkiem" };
        var para = {
            v_Imei:timkiem[2],
            v_Madiemdo:timkiem[0],
            v_Socongto:timkiem[1],
            //v_Tenkhachhang:timkiem[0],
            //v_pagenum:page,
            //v_numrecs:countpage
        };
        if (config.connstr == '' || config.connstr == null || config.connstr == undefined) return;
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_timkiem(config, para, lst) {
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
                + val.madiemdo + "</td><td>"
                + val.socongto + "</td><td>"
                + val.imei + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.dienluc + "</td><td>"
                + val.congtydienluc + "</td><td>"
                + val.trangthai + "</td></tr>";

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