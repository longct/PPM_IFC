$(document).ready(function () {
    $("#curentPage").html("Tạo hóa đơn");
    initformelement();

    $("input[type=radio][name=rdKieuLoc]").on("change",function () {
        alert($(this).val());
        if ($(this).val() == '0') {
            $("#txtSoGCS").removeAttr('disabled');
            $("#txtKH").attr('disabled','disabled');
        } else {    
            $("#txtKH").removeAttr('disabled');
            $("#txtSoGCS").attr('disabled', 'disabled');
        }
        
    });
    console.log($("input[type=radio][name=rdKieuLoc]"));
})