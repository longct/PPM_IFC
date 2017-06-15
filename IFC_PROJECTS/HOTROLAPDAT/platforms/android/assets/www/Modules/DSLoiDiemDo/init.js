$(document).ready(function () {
    try {
        $(".btn_back").click(function () {

        })
        var sheight = $(window).height();
        var swidth = $(window).width();
        $(".ds-bd").css("height", sheight - 80);
        $(".ds-bd").css("max-height", sheight - 150);
        $(".ds-bd").css("overflow", "auto");
        $("#btn_chonloidd").click(function () {
            var arr = [];
            $('input.ck_loidd:checkbox:checked').each(function () {
                arr.push($(this).val());
            });
            $(".loidiemdo_ds td").html(arr.toString());
            $('#ds_loidiemdo').modal('hide');
            console.log(arr.toString());
        })
    } catch (e) {
        console.log(e);

    }
});

