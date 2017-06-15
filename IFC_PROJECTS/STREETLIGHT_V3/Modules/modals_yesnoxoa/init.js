function f_DrawConfimYesNoXoa()
{    
    $("#confimYesNoXoa").html(' <div class="modal fade in"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block;">' +
        '<div class="modal-content" style=" width: 600px; height: 150px;margin: auto;">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="mess_close"></button>' +
                '<h4 class="modal-title" id="mess_yesno_header" ></h4>' +
            '</div>' +
            '<div class="modal-body" style="text-align:center">' +
                '<button class="btn btn-default" data-dismiss="modal" type="button" id="btn_yesno_cance"><i class="fa fa-ban"></i></button>' +
                '<button class="btn btn-danger" type="button" id="btn_yesno_confim"><i class="fa fa-plus"></i></button>' +
            '</div>' +
            '<div class="modal-footer">' +
            '</div>' +
        '</div>' +
    '</div>');

}
function f_confimYesNoXoa(nameHeader, nameCance, nameConfim, func)
{
    f_DrawConfimYesNoXoa();

    $("#mess_yesno_header").html(nameHeader);
    $("#btn_yesno_cance").html(nameCance);
    $("#btn_yesno_confim").html(nameConfim);
    $("#btn_yesno_confim").click(function () {
        func();
        $("#confimYesNoXoa").empty();
    });
    $("#btn_yesno_cance").click(function () {
        $("#confimYesNoXoa").empty();
    });
    
}
