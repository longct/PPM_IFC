var idchung = "";
var a = 0;
$(document).ready(function () {
    try {
        loadchecklog_master();

        $("#btnThem_sapgia").click(function () {
            a += 1;
            $("#addHtml_sapgia").append(addHtml_click(a));
            lstnhomkh_hdsua();
        });
        $("#btnRemove_sapgia").click(function () {
            $('#btnThem_sapgia').removeAttr('disabled');
            var row = ($('#addHtml_sapgia tr').length);
            if (row == 1) {
                $("#btnRemove_sapgia").attr('disabled', 'disabled');
            } else {
                $('#rowa' + a).remove();
                a--;
            }
        });

    } catch (e) {
        console.log(e);
    }
});

function loadthongtin_chungap(id) {
    try{
        var idchung = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_APGIAKH.LOADID", callback: "result_loadthongtin_chungap" };
        var para = {
              v_ID: id
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthongtin_chungap(config, para, lst) {
    try{
        var data = lst.data;
   
        $("#txt_ten_sapgia").val(data[0].tenapgia);
        $("#addHtml_sapgia").empty();
        $.each(data, function (key, val) {
            
            var row = '';
            row += addHtml_suap(val.id_auto,val.code_nhom, val.tyle, key)
            $("#addHtml_sapgia").append(row);
            //vẽ ra
            lstnhomkh_hdkhsua();

            setTimeout(function () {
                $('.cb_sgiatri_Ag_sua').each(function () {
                   
                    $(".sua" + $(this).attr("value") + "").val($(this).attr("value"));
                });
                $('.txt_tyle_Ag_sua').each(function () {
                  
                    $(".suatyle" + $(this).attr("value") + "").val($(this).attr("value"));
                });

            }, 600);

        });


    } catch (e) {
        console.log(e);
    }
}
function addHtml_suap(id,code,tyle,i) {
    try {
        var str = "<tr id='row" + i + "' style='overflow:auto;'>"
                  + "<td style='width: 28%' class='text-bold'>Chọn nghành nghề điện áp</td>"
                  + "<td style='width: 40%' class='inp_txt'>"
                  + "<select class='form-control input-sm m-bot15 cb_sgiatri_Ag_sua sua" + code + "' value='" + code + "' >" + "<td>"
                  + "<td  style='width:10%'> Tỷ lệ</td>"
                  + "<td  class='inp_txt'>"
                  + "<input type='text'   class='form-control txt_tyle_Ag_sua suatyle" + tyle + "'  value='" + tyle + "'  style='width: 60px;' />" + "</td>"
        "</tr>";

        return str;

    } catch (e) {
        console.log(e);
    }
}
function lstnhomkh_hdkhsua() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NHOMKH", callback: "result_lstnhomkh_hdkhsua" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstnhomkh_hdkhsua(config, para, lst) {
    try {
        
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCobClass("cb_sgiatri_Ag_sua", data, "id", "ten", "-1", "Chọn cấp điện áp");
        $('select.cb_sgiatri_Ag_sua' ).find('option').each(function () {
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


function addHtml_click(i) {
    try {
    
        var str = "<tr id='rowa" + a + "' style='overflow:auto;'>"
                  + "<td style='width: 28%' class='text-bold'>Chọn nghành nghề điện áp</td>"
                  + "<td style='width: 40%' class='inp_txt'>"
                  + "<select class='form-control input-sm m-bot15 ' id ='cb_gia_Ag_sua"+a+"' >" + "<td>"
                  + "<td  style='width:10%'> Tỷ lệ</td>"
                  + "<td  class='inp_txt'>"
                  + "<input type='text'   class='form-control'   id ='tyle_Ag_sua"+a+"' style='width: 60px;' />" + "</td>"
        "</tr>";

        return str;

    } catch (e) {
        console.log(e);
    }
}


function lstnhomkh_hdsua() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NHOMKH", callback: "result_lstnhomkh_hdsua" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstnhomkh_hdsua(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_gia_Ag_sua" + a, data, "id", "ten", "-1", "Chọn cấp điện áp");
        $('select#cb_gia_Ag_sua' + a).find('option').each(function () {
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
