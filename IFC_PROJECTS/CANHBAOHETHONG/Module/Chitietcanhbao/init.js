$(document).ready(function () {
    try {

        loadConetent();
    

    } catch (e) {
        console.log(e);
    }
});
function loadchitietcanhbao(ad, donvi) {
    try{
        var config = { namesql: "PKG_CB_EMAIL_SMS.CANHBAO_CHITIET", callback: "f_result_loadchitietcanhbao", connstr: donvi };
                var para = { V_LOAICANHBAO: ad };
                ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadchitietcanhbao(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_ctcba", "Không có dữ liệu hiển thị", 'error');
            $("#grvView_chitiet").empty();
            return;
        }
        messInfo("messinfo_ctcba", "", 'error');
        $("#grvView_chitiet").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + (key + 1) + "</td><td>"
                + val.donvi + "</td><td>"
                + val.chude + "</td><td>"
                + val.noidung + "</td><td>"
                + val.thoidiem + "</td><td>"
                + val.trangthaigui + "</td></tr>";

            $("#grvView_chitiet").append(row);

        });

    } catch (e) {
        console.log(e);
    }
}