
var valTimeSl_Dktdtd = [];

var lstId_Dktdtd = [];
$(document).ready(function () {
    try
    {
        valTimeSl_Dktdtd = f_getNextTime();

        loadchecklog_master();
        init_Dktdtd();

        $('#btnThem_Dktdtd').click(function () {
            var check = checkTxtLenh_Dktdtd();
            if (check != "") {
                messInfo("messinfo_Dktdtd", check, "error");
                return;
            }
            messInfo("messinfo_Dktdtd", "", "error");

            var slider_Dktdtd = $("#TimeSl_Dktdtd").data("ionRangeSlider");

            if (slider_Dktdtd.result.to < valTimeSl_Dktdtd.length-1) {

                slider_Dktdtd.update({
                    from: slider_Dktdtd.result.to,
                    to: (slider_Dktdtd.result.to + 24),
                    disable: false
                });

                var row = ($('#addHtml_Dktdtd tr').length) - 1;
                $('#addHtml_Dktdtd').append(addHtml_Dktdtd(slider_Dktdtd.result.from_value, slider_Dktdtd.result.to_value, row));
                $('#FromHour_Dktdtd' + row).attr('readonly', 'readonly');
                $('#ToHour_Dktdtd' + row).attr('readonly', 'readonly');
            }
            else
            {
                var slider_Dktdtd = $("#TimeSl_Dktdtd").data("ionRangeSlider");
                slider_Dktdtd.update({
                    disable: true
                });
                $('#btnThem_Dktdtd').attr('disabled', 'disabled');
            }
        });


        $('#btnRemove_Dktdtd').click(function () {
      
            $('#btnThem_Dktdtd').removeAttr('disabled');
            var row = ($('#addHtml_Dktdtd tr').length) - 3;       
            var f = CheckIndex_Dktdtd($('#FromHour_Dktdtd' + row).val());
            var t = CheckIndex_Dktdtd($('#ToHour_Dktdtd' + row).val());
            if (row >= 0) {
                var slider_Dktdtd = $("#TimeSl_Dktdtd").data("ionRangeSlider");

                slider_Dktdtd.update({
                    from: f,
                    to: t,
                    disable: false
                });
                $('#addHtml_Dktdtd tr:last').remove();
            }
            var slider_Dktdtd = $("#TimeSl_Dktdtd").data("ionRangeSlider");
            slider_Dktdtd.update({
                disable: false
            });
        });

        $('#btn_CapNhat_Dktdtd').click(function () {
            var check = checkTxt_Dktdtd();
            if (check != "") {
                messInfo("messinfo_Dktdtd", check, "error");
                return;
            }
            messInfo("messinfo_Dktdtd", "", "error");

            f_confimYesNo("Bạn chắc chắn muốn cập nhật chế độ ?", "Bỏ qua", "Xác nhận", function () {
                insertTempTable_Dktdtd();
            });
        });

    } catch (e) { console.log(e);}  

});


function f_loadInfoOne_Dktdtd(lstId)
{
    try
    {
       
        messInfo("messinfo_Dktdtd", "", "error");
        lstId_Dktdtd = lstId;
        $(".nameheader_dkdtd").html(lstId[0].ten);
        messInfo("messinfo_Dktdtd", "", "error");
        if (lstId != null && lstId != undefined &&  lstId.length == 1) {
            try {
                var config = {
                    connstr: "ConnectOracleStreetLight",
                    namesql: "PKG_THONGTINTU.THONGTINTU_DIM_TUDONG",
                    callback: "f_result_loadInfoOneTu_Dktdtd"
                }
                var para = {
                    v_id: lstId[0].id,
                    V_MATHIETLAP: lstId[0].mathietlap == null || lstId[0].mathietlap == undefined ? "-1" : lstId[0].mathietlap,
                    V_LOAITHIETBI: lstId[0].loaithietbi == null || lstId[0].loaithietbi == undefined ? "-1" : lstId[0].loaithietbi,
                    V_TCGANNHAT: lstId[0].tcgannhat == null || lstId[0].tcgannhat == undefined ? "ACCEPT" : lstId[0].tcgannhat
                }
                
              
                var ls = ExecuteServiceSyns(config, para);
            } catch (e) { console.log(e); }

        }
        else
            init_Dktdtd();
    } catch (e) { console.log(e);}
}

function f_result_loadInfoOneTu_Dktdtd(config,para,lst)
{
    try{
        if (lst == null || lst == "" || lst == "[]" || lst.data.length == 0)
        {
            init_Dktdtd();
            return;
        }
        $('#addHtml_Dktdtd').empty();
        $('#addHtml_Dktdtd').append(addHtmlHeader_Dktdtd());
        $.each(lst.data, function (key, val) {
            var html=  addHtml_Dktdtd(val.thoidiembatdau, val.thoidiemketthuc, key);
            $('#addHtml_Dktdtd').append(html);
            $("#Brightness_Dktdtd" + key).val(val.lenh);
        
            $('#FromHour_Dktdtd'+key).attr('readonly', 'readonly');
            $('#ToHour_Dktdtd'+key).attr('readonly', 'readonly');

            $('#btnThem_Dktdtd').attr('disabled', 'disabled');
       
        });
        var slider_Dktdtd = $("#TimeSl_Dktdtd").data("ionRangeSlider");
        slider_Dktdtd.update({
            from: 0,
            to: valTimeSl_Dktdtd.length-1,
            disable: true
        });
     } catch (e) {
        console.log(e);
    }

}


function insertTempTable_Dktdtd()
{
    try
    {
        var lstData = getAllRow_Dktdtd();
        console.log(lstData);
        console.log(lstData.length);
        if (lstData.length > 8)
        {
            messInfo("messinfo_Dktdtd", "Giới hạn thiết lập 8 khoảng", "error");
            return;
        }
        //console.log(lstData);
        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOT",
        }
        var table = {
            table: JSON.stringify(lstData)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if(lst != null )
            f_update_Dktdtd();
        else
            messInfo("messinfo_Dktdtd", lst, "error");
    } catch (e) {
        console.log(e);
    }
}

function f_update_Dktdtd()
{
    try
    {
      var config = {
          connstr: "ConnectOracleStreetLight",
          namesql: "PKG_DIEUKHIEN.CAPNHATLENHDIEUKHIEN",
          callback: "f_result_update_Dktdtd"
      }
     var userinfo = JSON.parse(localStorage.getItem("userinfo"));
      var para = {
          V_USERID: userinfo.idnhanvien
      }
      var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_update_Dktdtd(config,para,lst)
{
    try{
        if (lst.data[0].ok.toLowerCase() == "ok")
        {
            messInfo("messinfo_Dktdtd", "Cập nhật thành công", "ok");
            $('#process_modal').modal('show');
            localStorage.setItem("dangguimathietlap", lst.data[0].mathietlap);
            f_startTimerDtt_prcess();
            $('#DieuKhien_Dim_TuDong').modal('hide');
        }
        else
            messInfo("messinfo_Dktdtd", lst.data[0].ok, "error");
    }
    catch (e) { console.log(e);}
}

function checkTxt_Dktdtd() {
    try{
    var row = ($('#addHtml_Dktdtd tr').length) - 2;  
    if ($('#ToHour_Dktdtd' + row).val() != "24:00" || $('#btnThem_Dktdtd').attr('disabled') != "disabled")
        return "Chưa đủ 24 giờ";
    return "";
    } catch (e) { console.log(e); return e.message}
}


function checkTxtLenh_Dktdtd() {
    try {
        var row = ($('#addHtml_Dktdtd tr').length) - 2;
        if ($('#Brightness_Dktdtd' + row).val() == "-1" )
            return "Chế độ chưa chọn";
        return "";
    } catch (e) { console.log(e); return e.message }
}


function CheckIndex_Dktdtd(item)
{
    var id = jQuery.inArray(item, valTimeSl_Dktdtd);
    return id;
}

function init_Dktdtd()
{
    try
    {
        messInfo("messinfo_Dktdtd", "", "ok");
        $('#addHtml_Dktdtd').empty();
        $('#TimeSl_Dktdtd').empty();
        var para0 = {
            from: 0,
            to: 24,
            disable: false
        };
        timeSlider_Dktdtd(para0);
       var slider_Dktdtd = $("#TimeSl_Dktdtd").data("ionRangeSlider");
        slider_Dktdtd.update({
        from: 0,
        to: 24,
        disable: false
    });
        $('#addHtml_Dktdtd').append(addHtmlHeader_Dktdtd());
        $('#addHtml_Dktdtd').append(addHtml_Dktdtd("00:00", "02:00", 0));

        $('#btnThem_Dktdtd').removeAttr('disabled');
        $('#btnRemove_Dktdtd').removeAttr('disabled');
        $('#btnLuuLai_Dktdtd').removeAttr('disabled');
    } catch (e) {
        console.log(e);
    } 
}


function timeSlider_Dktdtd(para) {
    try
    {
        
        var timeSl_Dktdtd ;
        var config = {
            min: 0,
            max: valTimeSl_Dktdtd.length-1,
            type: 'double',
           // grid: true,
            grid_num: valTimeSl_Dktdtd.length-1,
            force_edges: true,
            from_fixed: true,
            onChange: function (data) {
                var row = ($('#addHtml_Dktdtd tr').length) - 2;
                $('#ToHour_Dktdtd' + row ).val(data.to_value);
            },
            onUpdate: function (data) {  
            },
            values: valTimeSl_Dktdtd,
            onStart: function (data) {
            },
            onFinish: function (data) {
            },
        };

        var jsonpara = $.extend({}, config, para);
        $("#TimeSl_Dktdtd").ionRangeSlider(jsonpara);
    } catch (e) {
        console.log(e);
    }
}


function addHtmlHeader_Dktdtd()
{
    try{
        return "<tr style='line-height: 18px;'> <td style='padding-left:21px;' class='hideFrom'>Từ</td>  <td style='padding-left:18px;'>Đến</td>   <td style='text-align:left;'><div class='phatxt'><span>Chế độ</span></div></td>  </tr> ";

     } catch (e) {
        console.log(e);
    }
}
function addHtml_Dktdtd(time1, time2,i) {
    try
    {
        var str = "<tr id='row" + i + "' style='overflow:auto;'>" +
        "<td style='width: 20%' class='inp_txt hideFrom'>" +
        "<input type='text'' id='FromHour_Dktdtd" + i + "' value='" + time1 + "' style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 20%' class='inp_txt'>" +
        "<input type='text'  id='ToHour_Dktdtd" + i + "'  value='" + time2 + "'  style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 60%;    vertical-align: middle;'>" +
        "<div style='padding: 0 15px;    margin-top: 15px'>" +
        
        "<select class='form-control input-sm m-bot15' id='Brightness_Dktdtd"+i+"' >" +
        "<option value='-1'>Chọn độ sáng</option>"+
        "<option value='40'>40%</option>"+
        "<option value='50'>50%</option>"+
        "<option value='60'>60%</option>"+
        "<option value='70'>70%</option>"+
        "<option value='80'>80%</option>"+
        "<option value='90'>90%</option>"+
        "<option value='100'>100%</option>"+
        "</select>"+
       "<div></td></tr>";

        return str;
    } catch (e) {
        console.log(e);
        return e.toString();
    }
    
}


function getAllRow_Dktdtd()
{
    try
    {
        //console.log(lstId_Dktdtd);
        var infoo= JSON.parse(localStorage.getItem("infodk"));
        var lstObj = [];
        var row = ($('#addHtml_Dktdtd tr').length) - 2;
        $.each(lstId_Dktdtd, function (key, val) {
            for (var i = 0; i <= row ; i++) {
                //console.log(val);
                var brigt0 = $('#Brightness_Dktdtd' + i + " option:selected").val();
                var cot = {
                    Cot1: val.id,
                    Cot2: $('#FromHour_Dktdtd' + (i)).val(),
                    Cot3: $('#ToHour_Dktdtd' + (i)).val(),
                    Cot4: brigt0,
                    Cot5: infoo.loaidk,
                    Cot6: infoo.loaithietbi,
                    Cot7: infoo.loaichedo,
                    Cot8: (i + 1),
                    Cot9: "DIEUKHIEN"
                }
                lstObj.push(cot);
            }
        });
        //console.log(lstObj);
        return lstObj;
    } catch (e) {
        console.log(e);
    }
    
}
