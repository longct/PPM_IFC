var LstId_Dktptt = [];

$(document).ready(function () {
    try {
        loadchecklog_master();
        init_Dktptt();

        $('#btn_CapNhat_Dktptt').click(function () {

            var check = checkTxt_Dktptt();
            if (check != "") {
                messInfo("messinfo_Dktptt", check, "error");
                return;
            }
            messInfo("messinfo_Dktptt", "", "error");

            f_confimYesNo("Bạn chắc chắn muốn cập nhật chế độ ?", "Bỏ qua", "Xác nhận", function () {
                insertTempTable_Dktptt();
            });

        });

        $('#ToHour_Dktptt').on('input', function (e) {
            var slider_Dktptt = $("#TimeSl_Dktptt").data("ionRangeSlider");
            slider_Dktptt.update({
                from: $("#ToHour_Dktptt").val()
            });
        });
    } catch (e) { console.log(e); }

});


function f_loadInfoOne_Dktptt(lstId) {
    try {
        messInfo("messinfo_Dktptt", "", "error");
        $(".nameheader_Dktptt").html(lstId[0].ten);
        LstId_Dktptt = lstId;

        if (lstId[0].an == null || lstId[0].an == undefined || lstId[0].an == false) {
            $("#btn_CapNhat_Dktptt").show();
        }
        else {
            $("#btn_CapNhat_Dktptt").hide();
        }

        if (lstId != null && lstId != undefined && lstId.length == 1) {
            try {
                var config = {
                    connstr: "ConnectOracleStreetLight",
                    namesql: "PKG_THONGTINTU.THONGTINTU_PHA_TUCTHOI",
                    callback: "f_result_loadInfoOne_Dktptt"
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
            init_Dktptt();


    } catch (e) { console.log(e); }
}
function f_result_loadInfoOne_Dktptt(config, para, lst) {
    try {

 
        if (lst == null || lst == "" || lst == "[]" || lst.data.length == 0) {
            //init_Dktptt();
            return;
        }

        $("#ToHour_Dktptt").val(lst.data[0].thoidiemketthuc);

        var slider_Dktptt = $("#TimeSl_Dktptt").data("ionRangeSlider");
        slider_Dktptt.update({
            from: lst.data[0].thoidiemketthuc
        });

        //onOff_Dktptt();

        
        if (lst.data[0].lenh.charAt(0) == "0") {
            $("#Brightness0_Dktptt").attr("default", "0");
            $("#Brightness0_Dktptt").addClass("Off");
            $("#Brightness0_Dktptt").removeClass("On");
            $("#Brightness0_Dktptt input").attr("value", "0");

        }
        else {
            
            $("#Brightness0_Dktptt").attr("default", "1");
            $("#Brightness0_Dktptt").addClass("On");
            $("#Brightness0_Dktptt").removeClass("Off");
            $("#Brightness0_Dktptt input").attr("value", "1");

        }

        if (lst.data[0].lenh.charAt(1) == "0") {
            $("#Brightness1_Dktptt").attr("default", "0");
            $("#Brightness1_Dktptt").addClass("Off");
            $("#Brightness1_Dktptt").removeClass("On");
            $("#Brightness1_Dktptt input").attr("value", "0");

        }
        else {
          
            $("#Brightness1_Dktptt").attr("default", "1");
            $("#Brightness1_Dktptt").addClass("On");
            $("#Brightness1_Dktptt").removeClass("Off");
            $("#Brightness1_Dktptt input").attr("value", "1");

        }

        if (lst.data[0].lenh.charAt(2) == "0") {
            $("#Brightness2_Dktptt").attr("default", "0");
            $("#Brightness2_Dktptt").addClass("Off");
            $("#Brightness2_Dktptt").removeClass("On");
            $("#Brightness2_Dktptt input").attr("value", "0");

        }
        else {
         
            $("#Brightness2_Dktptt").attr("default", "1");
            $("#Brightness2_Dktptt").addClass("On");
            $("#Brightness2_Dktptt").removeClass("Off");
            $("#Brightness2_Dktptt input").attr("value", "1");

        }


    } catch (e) {
        console.log(e);
    }
}


function insertTempTable_Dktptt() {
    try {
        var lstData = getAllRow_Dktptt();

        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOT",
        }
        var table = {
            table: JSON.stringify(lstData)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null)
            f_update_Dktptt();
        else
            messInfo("messinfo_Dktptt", lst, "error");
    } catch (e) {
        console.log(e);
    }
}

function f_update_Dktptt() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_DIEUKHIEN.CAPNHATLENHDIEUKHIEN",
            callback: "f_result_update_Dktptt"
        }
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            V_USERID: userinfo.idnhanvien
        }
        var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_update_Dktptt(config, para, lst) {

    try {
        if (lst.data[0].ok.toLowerCase() == "ok") {
            messInfo("messinfo_Dktptt", "Cập nhật thành công", "ok");
            $('#DieuKhien_Pha_TucThoi').modal('hide');
            $('#process_modal').modal('show');
            localStorage.setItem("dangguimathietlap", lst.data[0].mathietlap);
            f_startTimerDtt_prcess();

        }
        else
            messInfo("messinfo_Dktptt", lst.data[0].ok, "error");
    }
    catch (e) { console.log(e); }
}

function checkTxt_Dktptt() {
    try {
        if ($("#ToHour_Dktptt").val() == "0")
            return "Chưa chọn thời gian";
        return "";
    } catch (e) { console.log(e); return e.message }
}

function onOff_Dktptt() {
    try {

        $("#Brightness0_Dktptt").kitOnOff();
        $("#Brightness1_Dktptt").kitOnOff();
        $("#Brightness2_Dktptt").kitOnOff();
    } catch (e) { console.log(e); }
}

function init_Dktptt() {
    try {
        messInfo("messinfo_Dktptt", "", "error");
        timeSlider_Dktptt();

        $("#ToHour_Dktptt").val(0);

        var slider_Dktptt = $("#TimeSl_Dktptt").data("ionRangeSlider");
        slider_Dktptt.update({
            from: 0
        });

        onOff_Dktptt();
        $("#Brightness0_Dktptt").attr("default", "0");
        $("#Brightness1_Dktptt").attr("default", "0");
        $("#Brightness2_Dktptt").attr("default", "0");

    } catch (e) {
        console.log(e);
    }
}


function timeSlider_Dktptt() {
    try {
        $("#TimeSl_Dktptt").ionRangeSlider({
            type: "single",
            grid: true,
            min: 0,
            max: 1440,
            from: 0,
            step: 1,
            keyboard: true,
            postfix: "",
            onUpdate: function (data) {
                $('#ToHour_Dktptt').val(data.from);
            },
            onFinish: function (data) {
                $('#ToHour_Dktptt').val(data.from);
            }
        });


    } catch (e) {
        console.log(e);
    }
}



function getAllRow_Dktptt() {
    try {
        //2	00:00	05:00	101	PHA	TU	25-JUL-16	TUDONG	1
        var infoo = JSON.parse(localStorage.getItem("infodk"));
        var lstObj = [];

        $.each(LstId_Dktptt, function (key, val) {
            // add vao lstObj
            var brigt0 = GetOnoff('Brightness0_Dktptt');
            var brigt1 = GetOnoff('Brightness1_Dktptt');
            var brigt2 = GetOnoff('Brightness2_Dktptt');
            var cot = {
                Cot1: val.id,
                Cot2: 0,
                Cot3: $('#ToHour_Dktptt').val(),
                Cot4: brigt0 + "" + brigt1 + "" + brigt2,
                Cot5: infoo.loaidk,
                Cot6: infoo.loaithietbi,
                Cot7: infoo.loaichedo,
                Cot8: 0,
                Cot9: "DIEUKHIEN"
            }
            lstObj.push(cot);

        });
        return lstObj;
    } catch (e) {
        console.log(e);
    }

}
