$(document).ready(function () {
    try{
        initformelement();
        $('#tlncb_btnSendXacThuc').click(function () {
            try {
                if ($("#email_ncb").val() == "" || $("#email_ncb").val().indexOf("@") == -1) {
                    console.log($("#email_ncb").val());
                    $("#thongbao_tle").removeAttr("class");
                    $("#thongbao_tle").addClass("err");
                    $("#thongbao_tle").html("Email không đúng định dạng");
                } else {
                    var maXacThuc;
                    //$("#thongbao_tle").hide();
                    // send email
                    var toEmail = $('#email_ncb').val().trim();
                    $("#thongbao_tle").removeAttr("class");
                    $("#thongbao_tle").html("Email xác thực được gửi đến địa chỉ: " + toEmail).fadeOut(5000);
                    $("#thongbao_tle").addClass("success_");
                    $('#tlncb_btnSendXacThuc').attr('disabled', 'disabled');
                    $('#maxacthuc').removeAttr('disabled');
                    $('#btn_xacthucemail').removeAttr('disabled');
                    var chuDe = "Xác nhận email";
                    for (var i = 0; i <= 9; i++) {
                        maXacThuc += randomNumber(0, 9);
                    }
                    var noiDung = "Bạn điền mã code " + maXacThuc + " vào ô (nhập mã xác thực)";
                    var tenThayThe = "Xác thực";
                    //sendMail(chuDe, noiDung, toEmail, tenThayThe);
                    //CommonFunction.DisplayNotification(MessageType.SUCCESS, AMISSLanguages.EMAILSENDED + $('#tlncb_txtEmail').val(), 'mess_XacThuc');
                    //$('#xacThuc_Note').css('display', 'block');
                }
            } catch (e) {
                console.log(e);
            }
        });

    } catch (e) {
        console.log(e);
    }


});

