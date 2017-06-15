$(document).ready(function () {

    $(".option_home").click(function () {
        if ($('.menu_option_home').hasClass("hide")) {
            $('.menu_option_home').removeClass("hide");
            $('.menu_option_home').addClass("show");
        } else {
            $('.menu_option_home').removeClass("show");
            $('.menu_option_home').addClass("hide");
        }
    })

    $(".color_change").click(function () {
        if ($('.color_option_home').hasClass("hide")) {
            loadColor();
            $('.color_option_home').removeClass("hide");
            $('.color_option_home').addClass("show");
        } else {
            $('.color_option_home').removeClass("show");
            $('.color_option_home').addClass("hide");
        }
    })

    $(".color_change_p").click(function () {
        console.log($(this).data("value"));
    })

    $(".content").click(function () {
        if ($('.menu_option_home').hasClass("show")) {
            $('.menu_option_home').removeClass("show");
            $('.menu_option_home').addClass("hide");
        }
    })

});

function loadColor() {
    $('.color_change_p').each(function (k, v) {
        $(v).css("background", $(v).data("value"));
    })

}

function search_main(str) {
    alert(str);
}
