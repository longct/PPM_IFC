$(document).ready(function () {
    try{
        var wrapper_w = $(".wrapper").width();
        var wrapper_h = $(".wrapper").height();
        $("#close_ht").click(function () {
            if ($(this).hasClass("display")) {
                $(this).removeClass("display");
                $(".logtitle_body").hide();
            } else {
                $(this).addClass("display");
                getLog();
                $(".logtitle_body").show();
            }
        });
        window.setInterval(getLastLog, 2000);
        loadchecklog_master();
    } catch (e) {
        console.log(e);
    }

});

function getLastLog() {
    try {

        var config = { namesql: "PKG_LOG.LAYDULIEUTONGQUAN", callback: "f_getLastLog", connstr: "ConnectOracleStreetLight" };
        var para =[];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_getLastLog(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst.length == 0 || lst == '[]' || lst.result == "ERROR"|| lst.data.length==0)
        {
            return;
        }
        var data = lst.data;

        $(".last_log marquee").text(data[0].thongtin);
        getLog();
    } catch (e) {
        console.log(e);
    }
}

function getLog() {
    try {

        var config = { namesql: "PKG_LOG.LAYDULIEUCHITIET", callback: "f_getLog", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_getLog(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst.length == 0 || lst == '[]' || lst.result == "ERROR" || lst.data.length == 0) {
            return;
        }
        var log = lst.data;
        var info = "";
        for (var i = 0; i < log.length; i++) {
            info += "<p class='titleLog'>" + log[i].thongtin +"</p>";
        }
        $(".logtitle_body").empty();
        $(".logtitle_body").append(info);
        $(".logtitle_body").scrollTop($(".logtitle_body").prop('scrollHeight'));

    } catch (e) {
        console.log(e);
    }
}
