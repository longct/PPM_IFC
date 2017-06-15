$(document).ready(function () {
    var wrapper_w = $(".wrapper").width();
    var wrapper_h = $(".wrapper").height();

    $(".l1").click(function () {
        if ($(".l2").hasClass("display-l2")) {
            $(".l2").removeClass("display-l2");
            //$(".logtitle_body").hide();
        } else {
            $(".l2").addClass("display-l2");
            //$(".logtitle_body").show();
        }
    });
    //if (location.hash.substr(1) == "Module/tongquantu") {
    //    $("ul#summary li").hide();
    //}

});

