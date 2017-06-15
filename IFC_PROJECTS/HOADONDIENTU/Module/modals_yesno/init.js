function f_DrawConfimYesNo()
{    
    $("#confimYesNo").html(' <div class="modal fade in"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: block;">' +
        '<div class="modal-content" style="width:30% !important;margin:10% auto !important;">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="mess_close"></button>' +
                '<h4 class="modal-title" id="mess_yesno_header" ></h4>' +
            '</div>' +
            '<div class="modal-body" style="text-align:center">' +
                '<button class="btn btn-default" type="button" data-dismiss="modal" id="btn_yesno_cance"><i class="fa fa-ban"></i></button>' +
                '<button class="btn btn-success" type="button" id="btn_yesno_confim"><i class="fa fa-plus"></i></button>' +
            '</div>' +
            '<div class="modal-footer">' +
            '</div>' +
        '</div>' +
    '</div>');

}
function f_confimYesNo(nameHeader, nameCance, nameConfim, func)
{
    f_DrawConfimYesNo();

    $("#mess_yesno_header").html(nameHeader);
    $("#btn_yesno_cance").html(nameCance);
    $("#btn_yesno_confim").html(nameConfim);
    $("#btn_yesno_confim").click(function () {
        func();
        $("#confimYesNo").empty();
    });
    $("#btn_yesno_cance").click(function () {
        $("#confimYesNo").empty();
        $(".modal-backdrop").hide();
    });
    
}
