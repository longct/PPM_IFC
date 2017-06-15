
/* Đạt bổ xung kit Onoff 27/08/2015 */
$.fn.kitOnOff = function () {
    return this.each(function (index, ele) {
        var item = $(this);
        item.attr('index', index);

        var name = item.attr('name');
        if (name == null) name = '';

        var def = item.attr('default');
        if (def == '1' || def == 1) {
            item.addClass('On');
            item.removeClass('Off');
            item.html('<input name="' + name + '" value="1" type="hidden" />');
        } else {
            item.addClass('Off');
            item.removeClass('On');
            item.html('<input name="' + name + '" value="0" type="hidden" />');

        }

        item.on("click", function () {
            var val = 0;
            if (item.hasClass('On')) {
                val = 0;
                item.removeAttr("class");
                //item.removeClass('On');
                item.addClass('kitOnOff Off');
               
            } else {
                val = 1;
                item.removeAttr("class");
                item.addClass('kitOnOff On');
             
            }

            item.html('<input name="' + name + '" value="' + val + '" type="hidden" />');

            var fun_name = $(this).attr('event');
            if (fun_name != null && fun_name != '')
                apiFunction(fun_name, val);
        });
    });
};


function SetOnoff(id, value) {
    if (value == '1') {
        $('#' + id).switchClass("On", "Off", 'fast');
        $('#' + id).attr('value', value);
    } else {
        $('#' + id).switchClass("Off", "On", 'fast');
        $('#' + id).attr('value', value);
    }
};

function GetOnoff(id) {
    if ($('#' + id).hasClass('On')) {
        return 1;
    } return 0;
};