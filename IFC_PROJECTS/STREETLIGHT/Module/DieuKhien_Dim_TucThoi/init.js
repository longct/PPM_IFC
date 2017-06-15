var LstId_Dkdtt = [];

$(document).ready(function () {
    try {
        loadchecklog_master();
        init_Dkdtt();
        
        $('#btn_CapNhat_Dkdtt').click(function () {

            var check = checkTxt_Dkdtt();
            if (check != "") {
                messInfo("messinfo_Dkdtt", check, "error");
                return;
            }
            messInfo("messinfo_Dkdtt", "", "error");

            f_confimYesNo("Bạn chắc chắn muốn cập nhật chế độ ?", "Bỏ qua", "Xác nhận", function () {
                insertTempTable_Dkdtt();
            });

        });

        $('#ToHour_Dkdtt').on('input',function(e){
            var slider_Dkdtt = $("#TimeSl_Dkdtt").data("ionRangeSlider");
            slider_Dkdtt.update({
                from: $("#ToHour_Dkdtt").val()
            });
        });
    } catch (e) { console.log(e); }

});


function f_loadInfoOne_Dkdtt(lstId) {
    try {
        messInfo("messinfo_Dkdtt", "", "error");
        $(".nameheader_Dkdtt").html(lstId[0].ten);
        LstId_Dkdtt = lstId;
        init_Dkdtt();
        
       
        if (lstId != null && lstId != undefined && lstId.length == 1) {
            try {
                var config = {
                    connstr: "ConnectOracleStreetLight",
                    namesql: "PKG_THONGTINTU.THONGTINTU_DIM_TUCTHOI",
                    callback: "f_result_loadInfoOneTu_Dkdtt"
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
            init_Dkdtt();

    } catch (e) { console.log(e); }
}


function f_result_loadInfoOneTu_Dkdtt(config, para, lst) {
    try {
      
        if (lst == null || lst == "" || lst == "[]" || lst.data.length == 0) {
            init_Dkdtt();
            return;
        }
       
        var slider_Dkdtt = $("#TimeSl_Dkdtt").data("ionRangeSlider");
        slider_Dkdtt.update({
            from: lst.data[0].thoidiemketthuc
        });
        $("#ToHour_Dkdtt").val(lst.data[0].thoidiemketthuc);
        $("#Brightness_Dkdtt").val(lst.data[0].lenh);

    } catch (e) {
        console.log(e);
    }

}


function insertTempTable_Dkdtt() {
    try {
        var lstData = getAllRow_Dkdtt();
        
        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOT",
        }
        var table = {
            table: JSON.stringify(lstData)
        };
        
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null)
            f_update_Dkdtt();
        else
            messInfo("messinfo_Dkdtt", lst, "error");
    } catch (e) {
        console.log(e);
    }
}

function f_update_Dkdtt() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_DIEUKHIEN.CAPNHATLENHDIEUKHIEN",
            callback: "f_result_update_Dkdtt"
        }
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            V_USERID: userinfo.idnhanvien
        }
        var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_update_Dkdtt(config, para, lst) {
    try {
        if (lst.data[0].ok.toLowerCase() == "ok")
        {
            messInfo("messinfo_Dkdtt", "Cập nhật thành công", "ok");
            $('#DieuKhien_Dim_TucThoi').modal('hide');
            $('#process_modal').modal('show');
            localStorage.setItem("dangguimathietlap", lst.data[0].mathietlap);
            f_startTimerDtt_prcess();
        }
        else
            messInfo("messinfo_Dkdtt", lst.data[0].ok, "error");
    }
    catch (e) { console.log(e); }
}

function checkTxt_Dkdtt() {
    try {
        if ($("#ToHour_Dkdtt").val() == "0")
            return "Chưa chọn thời gian";
        return "";
    } catch (e) { console.log(e); return e.message }
}


function init_Dkdtt() {
    try {
        messInfo("messinfo_Dkdtt", "", "error");
        timeSlider_Dkdtt();
    } catch (e) {
        console.log(e);
    }
}


function timeSlider_Dkdtt() {
    try {
        $("#TimeSl_Dkdtt").ionRangeSlider({
            type: "single",
            grid: true,
            min: 0,
            max: 1440,
            from: 0,
            step: 1,
            keyboard: true,
            postfix: "",
            onUpdate: function (data) {
                $('#ToHour_Dkdtt').val(data.from);
            },
            onFinish: function (data) {
                $('#ToHour_Dkdtt').val(data.from);
            }
        });


    } catch (e) {
        console.log(e);
    }
}



function getAllRow_Dkdtt() {
    try {
        //2	00:00	05:00	101	PHA	TU	25-JUL-16	TUDONG	1
        var infoo = JSON.parse(localStorage.getItem("infodk"));
        var lstObj = [];
       
        $.each(LstId_Dkdtt , function(key,val){
                // add vao lstObj
            var brigt0 = $("#Brightness_Dkdtt option:selected").val();
                var cot = {
                    Cot1: val.id,
                    Cot2: 0,
                    Cot3: $('#ToHour_Dkdtt').val(),
                    Cot4: brigt0 ,
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
