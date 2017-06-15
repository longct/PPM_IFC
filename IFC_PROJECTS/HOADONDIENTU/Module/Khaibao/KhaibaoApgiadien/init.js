$(document).ready(function () {
    try {
        loadchecklog_master();
        loadthong_apgiadien();
    } catch (e) {
        console.log(e);
    }
});

function loadthong_apgiadien() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_HIENTHITHONGTINGIA.THONGTINAPGIA", callback: "result_loadthong_apgiadien" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthong_apgiadien(confg, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            return;
        }
     

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + key + "</td><td>"
                + setnull(val.tenmayin) + "</td><td>"
                + setnull(val.hang) + "</td><td>"
                + setnull(val.ngay) + "</td><td>"
                + setnull(val.ghichu) + "</td></tr>"
            $("#table_hienthigia").append(row);
        });

    } catch (e) {
        console.log(e);
    }
}