function f_DrawConfimYesNo()
{
    try
    {
        $("#confimYesNo").html(' <div class="modal fade in"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block;">' +
            '<div class="modal-content" style="width:50%;margin-top:25px; ">' +
                '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="mess_close"></button>' +
                    '<h4 class="modal-title" id="mess_yesno_header" ></h4>' +
                '</div>' +
                '<div class="modal-body" style="text-align:center">' +
                    '<button class="btn btn-default" type="button" id="btn_yesno_cance"><i class="fa fa-ban"></i></button>' +
                    '<button class="btn btn-danger" type="button" id="btn_yesno_confim"><i class="fa fa-plus"></i></button>' +
                '</div>' +
                '<div class="modal-footer">' +
                '</div>' +
            '</div>' +
        '</div>');
    }
    catch (e) { console.log(e);}
}
function f_confimYesNo(nameHeader, nameCance, nameConfim, func)
{
    try{

    f_DrawConfimYesNo();

    $("#mess_yesno_header").html(nameHeader);
    $("#btn_yesno_cance").html(nameCance);
    $("#btn_yesno_confim").html(nameConfim);
    $("#btn_yesno_confim").click(function () {
       func();
        $("#confimYesNo").empty();
        $(".modal-backdrop.in").css("display", "none");
    });
    $("#btn_yesno_cance").click(function () {
        $("#confimYesNo").empty();
        $(".modal-backdrop.in").css("display", "none");
    });
    }
    catch (e) { console.log(e); }
}
