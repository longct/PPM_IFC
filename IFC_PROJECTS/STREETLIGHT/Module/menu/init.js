$(document).ready(function () {
    try{
        loadchecklog_master();
        var wrapper_w = $(".wrapper").width();
        var wrapper_h = $(".wrapper").height();
        $(".tu_panel").css("width", wrapper_w / 5.2);
        $(".tu_panel").css("height", wrapper_w / 4.5);
        $(".panel").css("max-height", wrapper_h - 50);

        $(".tu_panel").click(function () {
            $(".action_bar").slideDown();
        });
    } catch (e) {
        console.log(e);
    }

});

