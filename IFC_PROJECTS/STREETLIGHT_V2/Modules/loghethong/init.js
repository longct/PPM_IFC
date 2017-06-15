$(document).ready(function () {
    try {
        getLog();
        $("#lognguoidung .panel-refresh").on("click", function () {
            var panel = $(this).parents(".panel");
            panel_refresh(panel, "shown", reloadLog);

            setTimeout(function () {
                panel_refresh(panel);
            }, 2000);

            $(this).parents(".dropdown").removeClass("open");
            return false;
        });
        $("#lognguoidung .panel-list-ls").on("click", function () {
            $("#Baocao_sukienngdung").modal("show");
            return false;
        });


    } catch (e) {
        console.log(e);
    }

});

function getLog() {
    var config = { namesql: "PKG_LOG.LAYDULIEUCHITIET", callback: "f_result_getLog", connstr: "ConnectOracleStreetLight" };
    var para = {

    };
    ExecuteServiceSyns(config, para, false);
}
function f_result_getLog(config, para, lst) {
    //<span class="text-info"><i class="glyphicon glyphicon-transfer"></i> LongCT: Gửi lệnh Dim tức thời 50% Tủ Hiệp Phước 14</span><span class="text-primary"> (15:20:00 29/11/2016)</span><br />
    //console.log(lst);
    var data = lst.data;
    var row = "";
    $("#number_log").html(data.length);
    if (data.length > 0) {
        $.each(data,function(key,val){
            row += '<span class="text-info"><i class="glyphicon glyphicon-transfer"></i>' + val.thongtin + '</span><br />'
        })

        $("#lognguoidung .loguser").empty();
        $("#lognguoidung .loguser").append(row);
    }
}
function reloadLog() {
    getLog();
}