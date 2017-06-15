
var valTimeSl_cstl = [];
var lstId_cstl = [];
$(document).ready(function () {
    try {
        valTimeSl_cstl = f_getNextTime();

        loadchecklog_master();
        init_cstl();
   
        $('#btnThem_cstl').click(function () {

            var rowCount = $('#addHtml_cstl >tbody >tr').length;
            var lstData = getAllRow_cstl();
            if (rowCount > 6) {
                messInfo("messinfo_cstl", "Giới hạn thiết lập 5 khoảng", "error");
                return;
            }

            var check = checkTxtLenh_cstl();
            if (check != "") {
                messInfo("messinfo_cstl", check, "error");
                return;
            }
            messInfo("messinfo_cstl", "", "error");

            var slider_cstl = $("#TimeSl_cstl").data("ionRangeSlider");

            if (slider_cstl.result.to < valTimeSl_cstl.length - 1) {

                slider_cstl.update({
                    from: slider_cstl.result.to,
                    to: (slider_cstl.result.to + (parseInt($("#khoang_cstl").val()) > 0 ? parseInt($("#khoang_cstl").val()) : 120)),
                    disable: false
                });

                var row = ($('#addHtml_cstl tr').length) - 1;
                $('#addHtml_cstl').append(addHtml_cstl(slider_cstl.result.from_value, slider_cstl.result.to_value, row));
                $('#FromHour_cstl' + row).attr('readonly', 'readonly');
                $('#ToHour_cstl' + row).attr('readonly', 'readonly');
            }
            else {
                var slider_cstl = $("#TimeSl_cstl").data("ionRangeSlider");
                slider_cstl.update({
                    disable: true
                });
                $('#btnThem_cstl').attr('disabled', 'disabled');
            }
        });


        $('#btnRemove_cstl').click(function () {

            $('#btnThem_cstl').removeAttr('disabled');
            var row = ($('#addHtml_cstl tr').length) - 3;
            var f = CheckIndex_cstl($('#FromHour_cstl' + row).val());
            var t = CheckIndex_cstl($('#ToHour_cstl' + row).val());
            if (row >= 0) {
                var slider_cstl = $("#TimeSl_cstl").data("ionRangeSlider");

                slider_cstl.update({
                    from: f,
                    to: t,
                    disable: false
                });
                $('#addHtml_cstl tr:last').remove();
            }
            var slider_cstl = $("#TimeSl_cstl").data("ionRangeSlider");
            slider_cstl.update({
                disable: false
            });
        });

        $('#btn_CapNhat_cstl').click(function () {
            var check = checkTxt_cstl();
            if (check != "") {
                messInfo("messinfo_cstl", check, "error");
                return;
            }
            messInfo("messinfo_cstl", "", "error");

            f_confimYesNo("Bạn chắc chắn muốn cập nhật chế độ ?", "Bỏ qua", "Xác nhận", function () {
                insertTempTable_cstl();
            });
        });

        $('#khoang_cstl').on('input', function (e) {
            try {
                if ($("#khoang_cstl").val() != null && $("#khoang_cstl").val() != undefined && parseInt($("#khoang_cstl").val()) >= 0) {
                    var slider_cstl = $("#TimeSl_cstl").data("ionRangeSlider");
                    slider_cstl.update({
                        to: (slider_cstl.result.to + parseInt($("#khoang_cstl").val()))
                    });
                }
            } catch (e) { console.log(e); }
        });

    } catch (e) { console.log(e); }

});



function insertTempTable_cstl() {
    try {
        var rowCount = $('#addHtml_cstl >tbody >tr').length;
        var lstData = getAllRow_cstl();
        if (rowCount > 6) {
            messInfo("messinfo_cstl", "Giới hạn thiết lập 5 khoảng", "error");
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

        if (lst != null) {
            f_update_cstl();
        }
        else
            messInfo("messinfo_cstl", lst, "error");
    } catch (e) {
        console.log(e);
    }
}

function f_update_cstl() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_CSTHIEPLAP.TAOLENHDIEUKHIEN", callback: "f_result_updatea_cstl", connstr: "ConnectOracleStreetLight" };

        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            v_TEN: p.ten_tenthietlap,
            v_USERID: userinfo.idnhanvien
        }
        ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_updatea_cstl(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_cstl", row, "ok");
            setTimeout(function () {
                init_cstl();
                loadcauhinhdim(1);
                messInfo("messinfo_cstl", '', "ok");
            }, 2000);
        } else {
            messInfo("messinfo_cstl", row, "error");
        }
    }
    catch (e) { console.log(e); }
}

function checkTxt_cstl() {
    try {
        var p = getAllIdMod();
        var row = ($('#addHtml_cstl tr').length) - 2;
        if ($('#ToHour_cstl' + row).val() != "24:00" || $('#btnThem_cstl').attr('disabled') != "disabled")
            return "Chưa đủ 24 giờ";
        return "";
    } catch (e) { console.log(e); return e.message }
}


function checkTxtLenh_cstl() {
    try {
        var p = getAllIdMod();
        if (p.khoang_cstl.length > 0) {
            if ($.isNumeric(p.khoang_cstl) == false) return "Số phút nhập không được bỏ trống";
            if (p.khoang_cstl >1440) return "Số phút nhập lớn hơn 1440 phút";
        }
        if (p.ten_tenthietlap == "") return "Không được để tên profile trống";
        var row = ($('#addHtml_cstl tr').length) - 2;
        if ($('#Brightness_cstl' + row).val() == "-1")
            return "Chế độ chưa chọn";
        return "";
    } catch (e) { console.log(e); return e.message }
}


function CheckIndex_cstl(item) {
    var id = jQuery.inArray(item, valTimeSl_cstl);
    return id;
}


function init_cstl() {
    try {
        $("#ten_tenthietlap").val("");
        messInfo("messinfo_cstl", "", "ok");
        $('#addHtml_cstl').empty();
        $('#TimeSl_cstl').empty();
        var para0 = {
            from: 0,
            to: 120,
            disable: false
        };
        timeSlider_cstl(para0);
        var slider_cstl = $("#TimeSl_cstl").data("ionRangeSlider");
        slider_cstl.update({
            from: 0,
            to: 120,
            disable: false
        });
        $('#addHtml_cstl').append(addHtmlHeader_cstl());
        $('#addHtml_cstl').append(addHtml_cstl("00:00", "02:00", 0));

        $('#btnThem_cstl').removeAttr('disabled');
        $('#btnRemove_cstl').removeAttr('disabled');
        $('#btnLuuLai_cstl').removeAttr('disabled');
    } catch (e) {
        console.log(e);
    }
}

function timeSlider_cstl(para) {
    try {

        var timeSl_cstl;
        var config = {
            min: 0,
            max: valTimeSl_cstl.length - 1,
            type: 'double',
            // grid: true,
            grid_num: valTimeSl_cstl.length - 1,
            force_edges: true,
            from_fixed: true,
            onChange: function (data) {
                var row = ($('#addHtml_cstl tr').length) - 2;
                $('#ToHour_cstl' + row).val(data.to_value);
            },
            onUpdate: function (data) {
            },
            values: valTimeSl_cstl,
            onStart: function (data) {
            },
            onFinish: function (data) {
            },
        };

        var jsonpara = $.extend({}, config, para);
        $("#TimeSl_cstl").ionRangeSlider(jsonpara);
    } catch (e) {
        console.log(e);
    }
}


function addHtmlHeader_cstl() {
    try {
        return "<tr style='line-height: 18px;'> <td style='padding-left:21px;'>Từ</td>  <td style='padding-left:18px;'>Đến</td>   <td style='text-align:left;'><div class='phatxt'><span>Chế độ</span></div></td>  </tr> ";

    } catch (e) {
        console.log(e);
    }
}
function addHtml_cstl(time1, time2, i) {
    try {
        var str = "<tr id='row" + i + "' style='overflow:auto;'>" +
        "<td style='width: 20%' class='inp_txt'>" +
        "<input type='text'' id='FromHour_cstl" + i + "' value='" + time1 + "' style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 20%' class='inp_txt'>" +
        "<input type='text'  id='ToHour_cstl" + i + "'  value='" + time2 + "'  style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 60%;    vertical-align: middle;'>" +
        "<div style='padding: 0 15px;    margin-top: 0px'>" +

        "<select class='form-control input-sm m-bot15' id='Brightness_cstl" + i + "' >" +
        "<option value='-1'>Chọn độ sáng</option>" +
        "<option value='0'>Off</option>" +
        "<option value='30'>30%</option>" +
        "<option value='40'>40%</option>" +
        "<option value='50'>50%</option>" +
        "<option value='60'>60%</option>" +
        "<option value='70'>70%</option>" +
        "<option value='80'>80%</option>" +
        "<option value='90'>90%</option>" +
        "<option value='100'>100%</option>" +
        "</select>" +
       "<div></td></tr>";

        return str;
    } catch (e) {
        console.log(e);
        return e.toString();
    }

}


function getAllRow_cstl() {
    try {
        //console.log(lstId_Dktdtd);
        //var infoo = JSON.parse(localStorage.getItem("infodk"));
        var lstObj = [];
        var row = ($('#addHtml_cstl tr').length) - 2;
        for (var i = 0; i <= row ; i++) {
            //console.log(val);
            var brigt0 = $('#Brightness_cstl' + i + " option:selected").val();
            var cot = {
                Cot1: (i + 1),
                Cot2: $('#FromHour_cstl' + (i)).val(),
                Cot3: $('#ToHour_cstl' + (i)).val(),
                Cot4: brigt0,
                Cot5: 'DIM',
                Cot6: 'BONG',
                Cot7: 'TUDONG',
                Cot8: "CSTHIEPLAP",

            }
            lstObj.push(cot);
        }

        return lstObj;
    } catch (e) {
        console.log(e);
    }

}

function f_loadInfoOne_cstl(lstId) {
    try {

        messInfo("messinfo_cstl", "", "error");
     var config = {
                    connstr: "ConnectOracleStreetLight",
                    namesql: "PKG_CSTHIEPLAP.LOADTHONGTIN",
                    callback: "f_result_loadInfoOneTu_cstl"
                }
                var para = { v_ID: lstId }
                ExecuteServiceSyns(config, para);
      

    } catch (e) { console.log(e); }
}

function f_result_loadInfoOneTu_cstl(config, para, lst) {
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data.length == 0) {
            init_cstl();
            return;
        }
        var data = lst.data;
        $("#ten_tenthietlap").val(data[0].tenthietlap);
        $('#addHtml_cstl').empty();
        $('#addHtml_cstl').append(addHtmlHeader_cstl());
        $.each(data, function (key, val) {
            var html = addHtml_cstl(val.thoidiembatdau, val.thoidiemketthuc, key);
            $('#addHtml_cstl').append(html);
            $("#Brightness_cstl" + key).val(val.lenh);

            $('#FromHour_cstl' + key).attr('readonly', 'readonly');
            $('#ToHour_cstl' + key).attr('readonly', 'readonly');

            $('#btnThem_cstl').attr('disabled', 'disabled');
            $('#btn_CapNhat_cstl').attr('disabled', 'disabled');
        });
        var slider_cstl = $("#TimeSl_cstl").data("ionRangeSlider");
        slider_cstl.update({
            from: 0,
            to: valTimeSl_cstl.length - 1,
            disable: true
        });
    } catch (e) {
        console.log(e);
    }

}