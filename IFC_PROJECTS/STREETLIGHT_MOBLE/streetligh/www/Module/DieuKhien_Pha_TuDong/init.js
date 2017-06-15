
var valTimeSl_Dkttd = [];

var lstId_Dkttd = [];
$(document).ready(function () {
    try
    {
        valTimeSl_Dkttd = f_getNextTime();
        loadchecklog_master();
        init_Dkttd();
        $('#btnThem_Dkttd').click(function() {
            $('#close_div_warning_msg').click();
            var slider_Dkttd = $("#TimeSl_Dkttd").data("ionRangeSlider");

            if (slider_Dkttd.result.to < valTimeSl_Dkttd.length-1) {

                slider_Dkttd.update({
                    from: slider_Dkttd.result.to,
                    to: (slider_Dkttd.result.to + 24),
                    disable: false
                });

                var row = ($('#addHtml_Dkttd tr').length) - 1;
                $('#addHtml_Dkttd').append(addHtml_Dkttd(slider_Dkttd.result.from_value, slider_Dkttd.result.to_value, "0", "0", "0", row));
                $('#FromHour_Dkttd' + row).attr('readonly', 'readonly');
                $('#ToHour_Dkttd' + row).attr('readonly', 'readonly');
                onOff_Dkttd(row);
            }
            else
            {
                var slider_Dkttd = $("#TimeSl_Dkttd").data("ionRangeSlider");
                slider_Dkttd.update({
                    disable: true
                });
                $('#btnThem_Dkttd').attr('disabled', 'disabled');
            }
        });


        $('#btnRemove_Dkttd').click(function () {
      
            $('#btnThem_Dkttd').removeAttr('disabled');
            var row = ($('#addHtml_Dkttd tr').length) - 3;       
            var f = CheckIndex_Dkttd($('#FromHour_Dkttd' + row).val());
            var t = CheckIndex_Dkttd($('#ToHour_Dkttd' + row).val());
            if (row >= 0) {
                var slider_Dkttd = $("#TimeSl_Dkttd").data("ionRangeSlider");

                slider_Dkttd.update({
                    from: f,
                    to: t,
                    disable: false
                });
                $('#addHtml_Dkttd tr:last').remove();
            }
            var slider_Dkttd = $("#TimeSl_Dkttd").data("ionRangeSlider");
            slider_Dkttd.update({
                disable: false
            });
        });


        $('#btn_CapNhat_Dkttd').click(function() {
        
            var check = checkTxt_Dkttd();
            if (check!="") {
                messInfo("messinfo_Dkttd", check, "error");
                return;
            }
            messInfo("messinfo_Dkttd", "", "error");
        
            f_confimYesNo("Bạn chắc chắn muốn cập nhật chế độ ?", "Bỏ qua", "Xác nhận", function () {
                insertTempTable_Dkttd();
            });

        });
        

       
    } catch (e) { console.log(e);}  

});


function f_loadInfoOne_Dkttd(lstId)
{
    try
    {
        console.log(lstId);
        localStorage.setItem('loaithietbi', lstId);
        messInfo("messinfo_Dkttd", "", "error");
        lstId_Dkttd = lstId;
        if (lstId[0].an == null || lstId[0].an == undefined || lstId[0].an == false) {
            $("#btn_CapNhat_Dkttd").show();
        }
        else {
            $("#btn_CapNhat_Dkttd").hide();
            }
        $(".nameheader_Dkttd").html(lstId[0].ten);
        if (lstId != null && lstId != undefined && lstId.length == 1) {
            try {
                var config = {
                    connstr: "ConnectOracleStreetLight",
                    namesql: "PKG_THONGTINTU.THONGTINTU_PHA_TUDONG",
                    callback: "f_result_loadInfoOneTu_Dkttd"
                }
                var para = {
                    v_id: lstId[0].id,
                    V_MATHIETLAP: lstId[0].mathietlap == null || lstId[0].mathietlap == undefined ? "-1" : lstId[0].mathietlap,
                    V_LOAITHIETBI: lstId[0].loaithietbi == null || lstId[0].loaithietbi == undefined ? "-1" : lstId[0].loaithietbi,
                    V_TCGANNHAT: lstId[0].tcgannhat == null || lstId[0].tcgannhat == undefined ? "ACCEPT" : lstId[0].tcgannhat
                };
               
                var ls = ExecuteServiceSyns(config, para);
            } catch (e) { console.log(e); }

        }
        else
            init_Dkttd();
    } catch (e) { console.log(e);}
}

function f_result_loadInfoOneTu_Dkttd(config,para,lst)
{
 
    if (lst == null || lst == "" || lst == "[]" || lst.data.length == 0)
    {
        init_Dkttd();
        return;
    }
    $('#addHtml_Dkttd').empty();
    $('#addHtml_Dkttd').append(addHtmlHeader_Dkttd());
    $.each(lst.data, function (key, val) {
      
        var html=  addHtml_Dkttd(val.thoidiembatdau, val.thoidiemketthuc,val.lenh.charAt(0),val.lenh.charAt(1),val.lenh.charAt(2), key);
        $('#addHtml_Dkttd').append(html);
        $('#FromHour_Dkttd'+key).attr('readonly', 'readonly');
        $('#ToHour_Dkttd'+key).attr('readonly', 'readonly');

        $('#btnThem_Dkttd').attr('disabled', 'disabled');
        onOff_Dkttd(key);
       
    });
    var slider_Dkttd = $("#TimeSl_Dkttd").data("ionRangeSlider");
    slider_Dkttd.update({
        from: 0,
        to: valTimeSl_Dkttd.length-1,
        disable: true
    });

}


function insertTempTable_Dkttd()
{
    try
    {
        var lstData = getAllRow_Dkttd();

        if (lstData.length > 15) {
            messInfo("messinfo_Dkttd", "Giới hạn thiết lập 15 khoảng", "error");
            return;
        }


        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOT",
        }
        var table = {
            table: JSON.stringify(lstData)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if(lst != null )
            f_update_Dkttd();
        else
            messInfo("messinfo_Dkttd", lst, "error");
    } catch (e) {
        console.log(e);
    }
}

function f_update_Dkttd()
{
    try
    {
      var config = {
          connstr: "ConnectOracleStreetLight",
          namesql: "PKG_DIEUKHIEN.CAPNHATLENHDIEUKHIEN",
          callback: "f_result_update_Dkttd"
      }
      var userinfo = JSON.parse(localStorage.getItem("userinfo"));
      var para = {
          V_USERID: userinfo.idnhanvien
      }
      var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_update_Dkttd(config,para,lst)
{
    //console.log(lst);
    try{
        if (lst.data[0].ok.toLowerCase() == "ok") {
            messInfo("messinfo_Dkttd", "Cập nhật thành công", "ok");
            $('#process_modal').modal('show');
            localStorage.setItem("dangguimathietlap", lst.data[0].mathietlap);
            f_startTimerDtt_prcess();
            $('#DieuKhien_Pha_TuDong').modal('hide');
        }
        else
            messInfo("messinfo_Dkttd", lst.data[0].ok, "error");
    }
    catch (e) { console.log(e);}
}

function checkTxt_Dkttd() {
    try{
    var row = ($('#addHtml_Dkttd tr').length) - 2;  
    if ($('#ToHour_Dkttd' + row).val() != "24:00" || $('#btnThem_Dkttd').attr('disabled') != "disabled")
        return "Chưa đủ 24 giờ";
    return "";
    } catch (e) { console.log(e); return e.message}
}

function onOff_Dkttd(i)
{
    try{
    $("#Brightness0_Dkttd" + i).kitOnOff();
    $("#Brightness1_Dkttd" + i).kitOnOff();
    $("#Brightness2_Dkttd" + i).kitOnOff();
    } catch (e) { console.log(e); }
}

function CheckIndex_Dkttd(item)
{
    try{
        var id = jQuery.inArray(item, valTimeSl_Dkttd);
        return id;
    } catch (e) {
        console.log(e);
    }
}

function init_Dkttd()
{
    try
    {
        messInfo("messinfo_Dkttd", "", "error");
        $('#addHtml_Dkttd').empty();
        $('#TimeSl_Dkttd').empty();
        var para0 = {
            from: 0,
            to: 24,
            disable: false
        };
        timeSlider_Dkttd(para0);
       var slider_Dkttd = $("#TimeSl_Dkttd").data("ionRangeSlider");
        slider_Dkttd.update({
        from: 0,
        to: 24,
        disable: false
    });
        $('#addHtml_Dkttd').append(addHtmlHeader_Dkttd());
        $('#addHtml_Dkttd').append(addHtml_Dkttd("00:00", "02:00","0","0","0", 0));

        $('#btnThem_Dkttd').removeAttr('disabled');
        $('#btnRemove_Dkttd').removeAttr('disabled');
        $('#btnLuuLai_Dkttd').removeAttr('disabled');
        onOff_Dkttd(0);
    } catch (e) {
        console.log(e);
    } 
}


function timeSlider_Dkttd(para) {
    try
    {
        
        var timeSl_Dkttd ;
        var config = {
            min: 0,
            max: valTimeSl_Dkttd.length-1,
            type: 'double',
           // grid: true,
            grid_num: valTimeSl_Dkttd.length-1,
            force_edges: true,
            from_fixed: true,
            onChange: function (data) {
                var row = ($('#addHtml_Dkttd tr').length) - 2;
                $('#ToHour_Dkttd' + row ).val(data.to_value);
            },
            onUpdate: function (data) {  
            },
            values: valTimeSl_Dkttd,
            onStart: function (data) {
            },
            onFinish: function (data) {
            },
        };

        var jsonpara = $.extend({}, config, para);
        $("#TimeSl_Dkttd").ionRangeSlider(jsonpara);
    } catch (e) {
        console.log(e);
    }
}



function addHtmlHeader_Dkttd()
{
    try {
        var lstId_Dkttd = [];
        var id = { loaithietbi: 'tu' }
        lstId_Dkttd.push(id);
     
        
        return "<tr style='line-height: 18px;'> <td style='padding-left:21px;' class='hideFrom'>Từ</td>  <td style='padding-left:18px;'>Đến</td>   <td style='text-align:left;'><div class='phatxt'><span>Pha A</span><span class='" + (lstId_Dkttd[0].loaithietbi == null || lstId_Dkttd[0].loaithietbi == undefined || lstId_Dkttd[0].loaithietbi == "tu" ? "" : "chuyenloai") + "'>Pha B</span><span  class='" + (lstId_Dkttd[0].loaithietbi == "tu" ? "" : "chuyenloai") + "'>Pha C</span></div></td>  </tr> ";
    } catch (e) {
        console.log(e);
    }
}
    

function addHtml_Dkttd(time1, time2, valBrn0, valBrn1, valBrn2, i) {
    try
    {
        var lstId_Dkttd = [];
        var id = { loaithietbi: 'tu' }
        lstId_Dkttd.push(id);
        var str = "<tr id='row" + i + "' style='overflow:auto;max-height:300px;'>" +
        "<td style='width: 20%' class='inp_txt hideFrom'>" +
        "<input type='text'' id='FromHour_Dkttd" + i + "' value='" + time1 + "' style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 20%' class='inp_txt'>" +
        "<input type='text'  id='ToHour_Dkttd" + i + "'  value='" + time2 + "' style='width: 60px;' />" +
        "</td>" +
        "<td style='width: 60%;    vertical-align: middle;'>" +
        "<div style='padding: 0 15px;'>";
        
        if (valBrn0 == "0")
            str += "<div class='kitOnOff' default='0' id='Brightness0_Dkttd" + i + "'></div>";
        else
            str += "<div class='kitOnOff' default='1' id='Brightness0_Dkttd" + i + "'></div>";

        if (valBrn1 == "0") 
            str += "<div class='kitOnOff " + (lstId_Dkttd[0].loaithietbi ==null || lstId_Dkttd[0].loaithietbi== undefined || lstId_Dkttd[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='0' id='Brightness1_Dkttd" + i + "'></div>";
        else
            str += "<div class='kitOnOff " + (lstId_Dkttd[0].loaithietbi == null || lstId_Dkttd[0].loaithietbi == undefined ||  lstId_Dkttd[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='1' id='Brightness1_Dkttd" + i + "'></div>";

        if (valBrn2 == "0")
            str += "<div class='kitOnOff " + (lstId_Dkttd[0].loaithietbi == null || lstId_Dkttd[0].loaithietbi == undefined || lstId_Dkttd[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='0' id='Brightness2_Dkttd" + i + "'></div>";
        else
            str += "<div class='kitOnOff " + (lstId_Dkttd[0].loaithietbi == null || lstId_Dkttd[0].loaithietbi == undefined || lstId_Dkttd[0].loaithietbi == "tu" ? "" : "chuyenloai") + "' default='1' id='Brightness2_Dkttd" + i + "'></div>";
        str+="<div></td></tr>";

        return str;
    } catch (e) {
        console.log(e);
        return e.toString();
    }
    
}


function getAllRow_Dkttd()
{
    try
    {
        var infoo = JSON.parse(localStorage.getItem("infodk"));
        //2	00:00	05:00	101	PHA	TU	25-JUL-16	TUDONG	1
        var row = ($('#addHtml_Dkttd tr').length) - 2;
        
        var lstObj = [];
        $.each(lstId_Dkttd,function(key,val){       
            for (var i = 0; i <= row; i++) {
                // add vao lstObj
                var brigt0 = GetOnoff('Brightness0_Dkttd' + i);
                var brigt1 = GetOnoff('Brightness1_Dkttd' + i);
                var brigt2 = GetOnoff('Brightness2_Dkttd' + i);
                var cot = {
                    Cot1: val.id,
                    Cot2: $('#FromHour_Dkttd' + (i)).val(),
                    Cot3: $('#ToHour_Dkttd' + (i)).val(),
                    Cot4: brigt0 + "" + brigt1 + "" + brigt2,
                    Cot5: infoo.loaidk,
                    Cot6: infoo.loaithietbi,
                    Cot7: infoo.loaichedo,
                    Cot8: (i + 1),
                    Cot9: "DIEUKHIEN"
                }
                lstObj.push(cot);
            }
        });

 

        return lstObj;
    } catch (e) {
        console.log(e);
    }
  
}
