$(document).ready(function () {
    if (localStorage.getItem("cb") == "disable") {
        $("#auto_refresh_cb").attr("checked", false);
    } else {
        $("#auto_refresh_cb").attr("checked", true);
    }
    if (localStorage.getItem("log") == "disable") {
        $("#auto_refresh_log").attr("checked", false);
    } else {
        $("#auto_refresh_log").attr("checked", true);
    }
    if (localStorage.getItem("map") == "disable") {
        $("#auto_refresh_map").attr("checked", false);
    } else {
        $("#auto_refresh_map").attr("checked", true);
    }
    $("#auto_refresh_cb").change(function () {
        if ($("#auto_refresh_cb").is(':checked')) {
            localStorage.setItem("cb", "auto");
            checkAutoRefresh();
        }
        else {
            localStorage.setItem("cb", "disable");
            checkAutoRefresh();
        }
    })

    $("#auto_refresh_log").change(function () {
        if ($("#auto_refresh_log").is(':checked')) {
            localStorage.setItem("log", "auto");
            checkAutoRefresh();
        }
        else {
            localStorage.setItem("log", "disable");
            checkAutoRefresh();
        }
    })

    $("#auto_refresh_map").change(function () {
        if ($("#auto_refresh_map").is(':checked')) {
            localStorage.setItem("map", "auto");
            checkAutoRefresh();
        }
        else {
            localStorage.setItem("map", "disable");
            checkAutoRefresh();
        }
    })
});


