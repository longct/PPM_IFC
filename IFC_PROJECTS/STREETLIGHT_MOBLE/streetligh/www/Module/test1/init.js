$(document).ready(function () {
    
    var wrapper_w = $(".wrapper").width();
    var wrapper_h = $(".wrapper").height();
    $(".tu_panel").css("width", wrapper_w / 5.5);
    $(".tu_panel").css("height", wrapper_h / 4 + 120);
    $(".tu_panel").css("font-size", wrapper_w /5.5 / 18);
    $(".panel").css("max-height", wrapper_h - 7);
    $(".tu_act img").css("width", wrapper_w / 5.45 / 7);
    
    $(".tu_panel").hover(handlerIn, handlerOut);
    function handlerIn() {
        var select = $(this).context.firstElementChild.id;
        $("#" + select).css("opacity", 1);
    }
    function handlerOut() {
        var select = $(this).context.firstElementChild.id;
        if (!$("input#" + select + ":checked").size() > 0) {
            $("#" + select).css("opacity", 0);
        }
    }
    $('#sl1').change(function () {
        if ($(this).is(":checked")) {
            $(this).parent().addClass("tuseselect");
        } else {

            $(this).parent().removeClass("tuseselect");
        }
        countcheck();
    });
    $('#sl2').change(function () {
        if ($(this).is(":checked")) {
            $(this).parent().addClass("tuseselect");
        } else {

            $(this).parent().removeClass("tuseselect");
        }
        countcheck();
    });
});

function countcheck()
{
    var count = $("[type='checkbox']:checked").length;
    $(".soluong").text(count);
    if (count > 0) {
        $(".action_bar").slideDown();
    } else {
        $(".action_bar").hide();
    }
}