var valTimeSl_tlpha = [];
var lstId_tlpha = [];
$(document).ready(function () {
    try {
        valTimeSl_tlpha = f_getNextTime();
        loadchecklog_master();
        init_tlpha();
        //$('#DieuKhien_pha').on('shown.bs.modal', function () {
        //    init_tlpha();
        //})
        $('#btnThem_tlpha').click(function () {
            $('#close_div_warning_msg').click();

            var check = checkTxtLenh_tlpha();
            if (check != "") {
                messInfo("messinfo_tlpha", check, "error");
                return;
            }
            messInfo("messinfo_tlpha", "", "error");

            var slider_tlpha = $("#TimeSl_tlpha").data("ionRangeSlider");

            if (slider_tlpha.result.to < valTimeSl_tlpha.length - 1) {

                slider_tlpha.update({
                    from: slider_tlpha.result.to,
                    to: (slider_tlpha.result.to + (parseInt($("#khoang_tlpha").val()) > 0 ? parseInt($("#khoang_tlpha").val()) : 120)),
                    disable: false
                });

                var row = ($('#addHtml_tlpha tr').length) - 1;
                $('#addHtml_tlpha').append(addHtml_tlpha(slider_tlpha.result.from_value, slider_tlpha.result.to_value, "0", "0", "0", row));
                $('#FromHour_tlpha' + row).attr('readonly', 'readonly');
                $('#ToHour_tlpha' + row).attr('readonly', 'readonly');
                onOff_tlpha(row);
            }
            else {
                var slider_tlpha = $("#TimeSl_tlpha").data("ionRangeSlider");
                slider_tlpha.update({
                    disable: true
                });
                $('#btnThem_tlpha').attr('disabled', 'disabled');
            }
        });


        $('#btnRemove_tlpha').click(function () {

            $('#btnThem_tlpha').removeAttr('disabled');
            var row = ($('#addHtml_tlpha tr').length) - 3;
            var f = CheckIndex_tlpha($('#FromHour_tlpha' + row).val());
            var t = CheckIndex_tlpha($('#ToHour_tlpha' + row).val());
            if (row >= 0) {
                var slider_tlpha = $("#TimeSl_tlpha").data("ionRangeSlider");

                slider_tlpha.update({
                    from: f,
                    to: t,
                    disable: false
                });
                $('#addHtml_tlpha tr:last').remove();
            }
            var slider_tlpha = $("#TimeSl_tlpha").data("ionRangeSlider");
            slider_tlpha.update({
                disable: false
            });
        });


        $('#btn_CapNhat_tlpha').click(function () {

            var check = checkTxt_tlpha();
            if (check != "") {
                messInfo("messinfo_tlpha", check, "error");
                return;
            }
            messInfo("messinfo_tlpha", "", "error");

            f_confimYesNo("Bạn chắc chắn muốn cập nhật chế độ ?", "Bỏ qua", "Xác nhận", function () {
                insertTempTable_tlpha();
            });

        });
    } catch (e) { console.log(e); }

});

function checkTxtLenh_tlpha() {
    try {
        var p = getAllIdMod();
        if (p.khoang_tlpha.length > 0) {
            if ($.isNumeric(p.khoang_tlpha) == false) return "Số phút nhập không được bỏ trống";
            if (p.khoang_tlpha > 1440) return "Số phút nhập lớn hơn 1440 phút";
        }

        return "";
    } catch (e) { console.log(e); return e.message }
}



function insertTempTable_tlpha() {
    try {
        var rowCount = $('#addHtml_tlpha >tbody >tr').length;
        var lstData = getAllRow_tlpha();
        if (rowCount > 16) {
            messInfo("messinfo_tlpha", "Giới hạn thiết lập 15 khoảng", "error");
            return;
        }
        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOTA",
        }
        var table = {
            table: JSON.stringify(lstData)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null)
            f_update_tlpha();
        else
            messInfo("messinfo_tlpha", lst, "error");
    } catch (e) {
        console.log(e);
    }
}

function f_update_tlpha() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_CSTHIEPLAP.TAOPHADIEUKHIEN",
            callback: "f_result_update_tlpha"
        }
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            v_TEN: p.ten_thietlapha,
            v_USERID: userinfo.idnhanvien
        }
       ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_update_tlpha(config, para, lst) {

    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tlpha", row, "ok");
            setTimeout(function () {
                init_tlpha();
                loadcauhinhdim(1);
                messInfo("messinfo_tlpha", '', "ok");
            }, 2000);
        } else {
            messInfo("messinfo_tlpha", row, "error");
        }
    }
    catch (e) { console.log(e); }
}

function checkTxt_tlpha() {
    try {
        var p = getAllIdMod();
        if (p.ten_thietlapha == "") return "Không được để tên profile trống";

        var row = ($('#addHtml_tlpha tr').length) - 2;
        if ($('#ToHour_tlpha' + row).val() != "24:00" || $('#btnThem_tlpha').attr('disabled') != "disabled")
            return "Chưa đủ 24 giờ";
        return "";
    } catch (e) { console.log(e); return e.message }
}

function onOff_tlpha(i) {
    try {
        $("#Brightness0_tlpha" + i).kitOnOff();
        $("#Brightness1_tlpha" + i).kitOnOff();
        $("#Brightness2_tlpha" + i).kitOnOff();
    } catch (e) { console.log(e); }
}

function CheckIndex_tlpha(item) {
    try {
        var id = jQuery.inArray(item, valTimeSl_tlpha);
        return id;
    } catch (e) {
        console.log(e);
    }
}

function init_tlpha() {
    try {
        $('#ten_thietlapha').val();
        messInfo("messinfo_tlpha", "", "error");
        $('#addHtml_tlpha').empty();
        $('#TimeSl_tlpha').empty();
        var para0 = {
            from: 0,
            to: 120,
            disable: false
        };
        timeSlider_tlpha(para0);
        var slider_tlpha = $("#TimeSl_tlpha").data("ionRangeSlider");
        slider_tlpha.update({
            from: 0,
            to: 120,
            disable: false
        });
        $('#addHtml_tlpha').append(addHtmlHeader_tlpha());
        $('#addHtml_tlpha').append(addHtml_tlpha("00:00", "02:00", "0", "0", "0", 0));

        $('#btnThem_tlpha').removeAttr('disabled');
        $('#btnRemove_tlpha').removeAttr('disabled');
        $('#btnLuuLai_tlpha').removeAttr('disabled');
        onOff_tlpha(0);
    } catch (e) {
        console.log(e);
    }
}


function timeSlider_tlpha(para) {
    try {

        var timeSl_tlpha;
        var config = {
            min: 0,
            max: valTimeSl_tlpha.length - 1,
            type: 'double',
            // grid: true,
            grid_num: valTimeSl_tlpha.length - 1,
            force_edges: true,
            from_fixed: true,
            onChange: function (data) {
                var row = ($('#addHtml_tlpha tr').length) - 2;
                $('#ToHour_tlpha' + row).val(data.to_value);
            },
            onUpdate: function (data) {
            },
            values: valTimeSl_tlpha,
            onStart: function (data) {
            },
            onFinish: function (data) {
            },
        };

        var jsonpara = $.extend({}, config, para);
        $("#TimeSl_tlpha").ionRangeSlider(jsonpara);
    } catch (e) {
        console.log(e);
    }
}



function addHtmlHeader_tlpha() {
    try {
        var lstId_tlpha = [];
        var id = { loaithietbi: 'tu' }
        lstId_tlpha.push(id);


        return "<tr style='line-height: 18px;'> <td style='padding-left:21px;'>Từ</td>  <td style='padding-left:18px;'>Đến</td>   <td style='text-align:left;'><div class='phatxt'><span>Nhánh 1</span><span class='" + (lstId_tlpha[0].loaithietbi == null || lstId_tlpha[0].loaithietbi == undefined || lstId_tlpha[0].loaithietbi == "tu" ? "" : "chuyenloai") + "'>Nhánh 2</span><span  class='" + (lstId_tlpha[0].loaithietbi == "tu" ? "" : "chuyenloai") + "'>Nhánh 3</span></div></td>  </tr> ";
    } catch (e) {
        console.log(e);
    }
}


function addHtml_tlpha(time1, time2, valBrn0, valBrn1, valBrn2, i) {
    try {
        var lstId_tlpha = [];
        var id = { loaithietbi: 'tu' }
        lstId_tlpha.push(id);
        var str = "<tr id='row" + i + "' style='overflow:auto;max-height:300px;'>" +
        "<td style='width: 20%' class='inp_txt'>" +
        "<input type='text'' id='FromHour_tlpha" + i + "' value='" + time1 + "' style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 20%' class='inp_txt'>" +
        "<input type='text'  id='ToHour_tlpha" + i + "'  value='" + time2 + "' style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 60%;    vertical-align: middle;'>" +
        "<div style='padding: 0 15px;'>";

        if (valBrn0 == "0")
            str += "<div class='kitOnOff' default='0' id='Brightness0_tlpha" + i + "'></div>";
        else
            str += "<div class='kitOnOff' default='1' id='Brightness0_tlpha" + i + "'></div>";

        if (valBrn1 == "0")
            str += "<div class='kitOnOff " + (lstId_tlpha[0].loaithietbi == null || lstId_tlpha[0].loaithietbi == undefined || lstId_tlpha[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='0' id='Brightness1_tlpha" + i + "'></div>";
        else
            str += "<div class='kitOnOff " + (lstId_tlpha[0].loaithietbi == null || lstId_tlpha[0].loaithietbi == undefined || lstId_tlpha[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='1' id='Brightness1_tlpha" + i + "'></div>";

        if (valBrn2 == "0")
            str += "<div class='kitOnOff " + (lstId_tlpha[0].loaithietbi == null || lstId_tlpha[0].loaithietbi == undefined || lstId_tlpha[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='0' id='Brightness2_tlpha" + i + "'></div>";
        else
            str += "<div class='kitOnOff " + (lstId_tlpha[0].loaithietbi == null || lstId_tlpha[0].loaithietbi == undefined || lstId_tlpha[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='1' id='Brightness2_tlpha" + i + "'></div>";
        str += "<div></td></tr>";

        return str;
    } catch (e) {
        console.log(e);
        return e.toString();
    }

}


function getAllRow_tlpha() {
    try {
      //  var infoo = JSON.parse(localStorage.getItem("infodk"));
        //2	00:00	05:00	101	PHA	TU	25-JUL-16	TUDONG	1
        var row = ($('#addHtml_tlpha tr').length) - 2;

        var lstObj = [];
     //   $.each(lstId_tlpha, function (key, val) {
            for (var i = 0; i <= row; i++) {
                // add vao lstObj
                var brigt0 = GetOnoff('Brightness0_tlpha' + i);
                var brigt1 = GetOnoff('Brightness1_tlpha' + i);
                var brigt2 = GetOnoff('Brightness2_tlpha' + i);
                var cot = {
                    Cot1: (i + 1),
                    Cot2: $('#FromHour_tlpha' + (i)).val(),
                    Cot3: $('#ToHour_tlpha' + (i)).val(),
                    Cot4: brigt0 + "" + brigt1 + "" + brigt2,
                    Cot5: 'PHA',
                    Cot6: 'TU',
                    Cot7: 'TUDONG',
                    Cot8: "PHATUDONG"
                }
                lstObj.push(cot);
            }
      //  });



        return lstObj;
    } catch (e) {
        console.log(e);
    }

}


function f_loadInfoOne_tlpha(lstId) {
    try {
        messInfo("messinfo_tlpha", "", "error");
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_CSTHIEPLAP.LOADTHONGTIN",
            callback: "f_result_loadInfoOneTu_tlpha"
        }
        var para = { v_ID: lstId }
        ExecuteServiceSyns(config, para);

  
       
    } catch (e) { console.log(e); }
}

function f_result_loadInfoOneTu_tlpha(config, para, lst) {
    if (lst == null || lst == "" || lst == "[]" || lst.data.length == 0) {
        init_tlpha();
        return;
    }
    var data = lst.data;
 
    $("#ten_thietlapha").val(data[0].tenthietlap);
    $('#addHtml_tlpha').empty();
    $('#addHtml_tlpha').append(addHtmlHeader_tlpha());
    $.each(data, function (key, val) {

        var html = addHtml_tlpha(val.thoidiembatdau, val.thoidiemketthuc, val.lenh.charAt(0), val.lenh.charAt(1), val.lenh.charAt(2), key);
        $('#addHtml_tlpha').append(html);
        $('#FromHour_tlpha' + key).attr('readonly', 'readonly');
        $('#ToHour_tlpha' + key).attr('readonly', 'readonly');

        $('#btnThem_tlpha').attr('disabled', 'disabled');
        $('#btn_CapNhat_tlpha').attr('disabled', 'disabled');
        onOff_tlpha(key);

    });
    var slider_tlpha = $("#TimeSl_tlpha").data("ionRangeSlider");
    slider_tlpha.update({
        from: 0,
        to: valTimeSl_tlpha.length - 1,
        disable: true
    });

}

