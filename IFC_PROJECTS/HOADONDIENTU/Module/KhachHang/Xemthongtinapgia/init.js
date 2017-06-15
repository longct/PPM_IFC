
$(document).ready(function () {
    try {
        loadchecklog_master();

    } catch (e) {
        console.log(e);
    }
});

function loadthongtin_chungxem(id) {
    try{
     
        var config = { connstr: "Oracle_HDDT", namesql: "HD_APGIAKH.LOADID", callback: "result_loadthongtin_xem" };
        var para = {
              v_ID: id
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthongtin_xem(config, para, lst) {
    try{
        var data = lst.data;
   
        $("#txt_ten_sapgia_xem").val(data[0].tenapgia);
        $("#addHtml_apgia_xem").empty();
        $.each(data, function (key, val) {
            
            var row = '';
            row += addHtml_suap_xem(val.id_auto, val.code_nhom, val.tyle, key)
            $("#addHtml_apgia_xem").append(row);
            //vẽ ra
            lstnhomkh_hd_xem();

            setTimeout(function () {
                $('.cb_giatri_xem').each(function () {
                   
                    $(".sxem" + $(this).attr("value") + "").val($(this).attr("value"));
                });
                $('.txt_tyle_Ag_sua').each(function () {
                  
                    $(".stylexem" + $(this).attr("value") + "").val($(this).attr("value"));
                });

            }, 600);

        });


    } catch (e) {
        console.log(e);
    }
}
function addHtml_suap_xem(id, code, tyle, i) {
    try {
        var str = "<tr id='row" + i + "' style='overflow:auto;'>"
                  + "<td style='width: 28%' class='text-bold'>Chọn nghành nghề điện áp</td>"
                  + "<td style='width: 40%' class='inp_txt'>"
                  + "<select class='form-control input-sm m-bot15 cb_giatri_xem sxem" + code + "' value='" + code + "' >" + "<td>"
                  + "<td  style='width:10%'> Tỷ lệ</td>"
                  + "<td  class='inp_txt'>"
                  + "<input type='text'   class='form-control txt_tyle_Ag_sua stylexem" + tyle + "'  value='" + tyle + "'  style='width: 60px;' />" + "</td>"
        "</tr>";

        return str;

    } catch (e) {
        console.log(e);
    }
}
function lstnhomkh_hd_xem() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NHOMKH", callback: "result_lstnhomkh_hd_xem" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstnhomkh_hd_xem(config, para, lst) {
    try {
        
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCobClass("cb_giatri_xem", data, "id", "ten", "-1", "Chọn cấp điện áp");
        $('select.cb_giatri_xem').find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

