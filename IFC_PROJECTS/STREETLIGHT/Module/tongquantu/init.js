$(document).ready(function () {
    try{
        var h = $(window).height();
        var w = $(window).width();
        $(".right-bottom").css("height", h / 2.3 + 15);
        $("table.table-bong").css("height", h /2.3);
        loadchecklog_master();
        f_loadtrangthaibong_tqb();
        f_loadmuccongxuat_tqb();
    } catch (e) {
        console.log(e);
    }
});

function f_loadtrangthaibong_tqb()
{
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_HOME.LST_TRANGTHAIBONG",
            callback: "f_result_loadtrangthaibong_tqb"
        }
        ExecuteServiceSyns(config, "");
    } catch (e) { console.log(e); }
}

function f_result_loadtrangthaibong_tqb(config,para,lst)
{
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }

        dataToCob("trangthaibong_tqb", lst.data, "value", "name", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}


function f_loadmuccongxuat_tqb() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_HOME.LST_MUCCONGSUAT",
            callback: "f_result_loadmuccongxuat_tqb"
        }
        ExecuteServiceSyns(config, "");
    } catch (e) { console.log(e); }
}

function f_result_loadmuccongxuat_tqb(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("muccongsuat_tqb", data, "value", "name", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
