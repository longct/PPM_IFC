function f_DrawConfimYesNo() {
    $("#confimYesNo").html(' <div class="modal fade in"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: block;">' +
        '<div class="modal-content">' +
            '<div class="modal-header bg-primary">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="mess_close"></button>' +
                '<h4 class="modal-title" id="mess_yesno_header" ></h4>' +
            '</div>' +
            '<div class="modal-body" style="text-align:center">' +
                '<button class="btn btn-danger" type="button" data-dismiss="modal" id="btn_yesno_cance"></button>' +
                '<button class="btn btn-success" type="button" id="btn_yesno_confim"></button>' +
            '</div>' +
            '<div class="modal-footer">' +
            '</div>' +
        '</div>' +
    '</div>');

}
function f_confimYesNo(nameHeader, nameCance, nameConfim, func) {
    f_DrawConfimYesNo();

    $("#mess_yesno_header").html(nameHeader);
    $("#btn_yesno_cance").html('<i class="fa fa-ban"></i> '+nameCance);
    $("#btn_yesno_confim").html('<i class="fa fa-save"></i> '+nameConfim);
    $("#btn_yesno_confim").click(function () {
        func();
        $("#confimYesNo").empty();
    });
    $("#btn_yesno_cance").click(function () {
        $("#confimYesNo").empty();
        $(".modal-backdrop").hide();
    });

}
