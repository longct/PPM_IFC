
var hasTimer = false;
var resendError = 0;

$(document).ready(function () {
    
    showhideTree();
    loadContent();
    selectlang();
   
    $('#btnReadDtt').on('click', function () {


        try {
            if (hasTimer) {
                f_stopTimerDtt();
                return;
            }
        }
        catch (ex) { console.log(ex); }
        try {
            resendError = 0;
            var objFilter = localStorage.getItem("tree_node");
            if (objFilter == null || objFilter == "") {
                showToast("Vui lòng chọn một điểm đo", "error");
                return;
            }

            f_GetInfoFromTree();

        } catch (e) { }
    });
    //if (objFilterTemp.value != "") {
    //    f_drawHtmlDocTucThoi(false);
    //    f_checkResultDtt();

    //}
});


function f_GetInfoFromTree() {
    try {
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_DOCTUCTHOI.GetInfoMeterFromTree", callback: "f_resultGetInfoFromTree" }
        var para = {
            v_Type: "1",
            v_Value: objFilter[0].code,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: "",
            v_TrangThai: "0",
            v_ChuKiChot: "0",
            v_UserId: objuser.userid,
            v_Permission: "1",
            v_TypeValue: "1",
            v_HeThong: "1",
            V_READTYPE: $("select#cbbLoaiReadDtt option:selected").val()
        }
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
  
    }
}

function f_resultGetInfoFromTree(config, para, lst) {
    try {

        if (lst.data.length == 0) {
      
            showToast("Không có dữ liệu hiển thị", "error");
            f_stopTimerDtt();
            return;
        }

        var timestartt = (lst.data.kq2 == null || lst.data.kq2 == undefined || lst.data.kq2.length == 0 || lst.data.kq2[0].timecmd == undefined) ? getfulltimenow() : lst.data.kq2[0].timecmd;

        var info = { timestart: timestartt, timenext: getfulltimenow(), timeoklast: getfulltimenow(), repeat: "2", timerepeat: "2" };
        localStorage.setItem("infoParaDtt", JSON.stringify(info));

        localStorage.setItem("lstIdDtt", JSON.stringify(lst.data));
        //console.log(lst.data[1].kq1);
        $.each(lst.data[1].kq1, function (key, val) {

            try {
                if (hasTimer == false) {
                    f_UpdateDataDocTucThoi1PhaNew();
                }

            } catch (ex) { console.log(ex); }
        });

        f_drawHtmlDocTucThoi(true);
        if (!hasTimer)
            f_startTimerDtt();

       
    } catch (e) {
        console.log(e);
      
    }
}

function f_UpdateDataDocTucThoi1PhaNew(objFilterTemp, infoMeter) {

    try {
        var configDocTucThoi = [{
            "REPEAT": "3",
            "TIMEREPEAT": "5"
        }];
        //  luu thong tin doc lai
        var info = JSON.parse(localStorage.getItem("infoParaDtt"));
        info.repeat = configDocTucThoi[0].REPEAT;
        info.timerepeat = configDocTucThoi[0].TIMEREPEAT;
        localStorage.setItem("infoParaDtt", JSON.stringify(info));
    } catch (e) { console.log(e); }
}

// thêm check file sau đó check database
function f_checkResultDtt() {
    try {
        var iddtt = localStorage.getItem("lstIdDtt");
        var paradtt = localStorage.getItem("infoParaDtt");
        if (iddtt == null || iddtt == undefined || iddtt == "[]" || iddtt == ""
            || paradtt == null || paradtt == undefined || paradtt == "[]" || paradtt == "") {
         
            return;
        }

        var lstIdDtt = JSON.parse(iddtt);
        var info = JSON.parse(paradtt);

        var comparTime = compareDates(formartDateTime(info.timeoklast), formartDateTime(info.timenext));

        // sau may phut khong doc duoc thi gui lai nhung con loi
        if (comparTime.minutes > parseInt(info.timerepeat)) {
            f_resendAllError();
            return;
        }


        var lstId = "";
        $.each(lstIdDtt.kq1, function (key, val) {
            try {
                lstId += val.id + ",";
                if ($("#trangthai" + val.id).attr("class").indexOf("readok") < 0) {
                    if (val.istype != 3) {
                        try {
                            var result = $.grep(lstIdDtt.kq2, function (e) { return e.imei == val.imei; });


                            if (result != null && result != undefined && result.length > 0 && result[0].namefile != null && result[0].namefile != undefined) {
                                var config = {
                                    callback: "f_result_CheckFileMeter"
                                };
                                var para = {
                                    namefile: result[0].namefile,
                                    socongto: val.socongto,
                                    id: val.id,
                                    imei: val.imei
                                };
                                ExecuteServiceGetResultDocTucThoi(config, para);
                            }
                        } catch (ex) { console.log(ex);  }
                    }
                    //else {
                    //    f_checkDatabase(val.id);
                    //}
                }
            } catch (e) { console.log(e); }

            f_checkstopall();

        });
        setTimeout(f_checkDatabase(lstId), 1000);

    } catch (exx) { console.log(exx); }
}

//   // check vao trong oracle xem co du lieu ve chua

function f_result_CheckFileMeter(config, para, data) {
    try {
        var time = JSON.parse(localStorage.getItem("infoParaDtt"));

        var comparTime = compareDates(formartDateTime(time.timeoklast), formartDateTime(time.timenext));
        var comparTimeReading = compareDates(formartDateTime(time.timenext), formartDateTime(time.timestart));

        if (data != null && data != "[]" && data != "" && (
            data.result.toLowerCase().indexOf("stopall") >= 0
            || data.result.toLowerCase().indexOf("readfail") >= 0
          
            )) {

            if (data.result.toLowerCase().indexOf("stopall") >= 0) {
                try {
                    $("." + para.imei).removeClass("readwait").addClass("readresend");

                    // luu lai thoi gian cuoi cung ok
                    var info = JSON.parse(localStorage.getItem("infoParaDtt"));
                    info.timeoklast = getfulltimenow();
                    localStorage.setItem("infoParaDtt", JSON.stringify(info));
                } catch (ev) { }
                $(".thongtin" + para.imei).html(data.data);
            }
            if (data.result.toLowerCase().indexOf("readfail") >= 0) {
                try {
                    $("td#trangthai" + para.id).removeClass("readwait").addClass("readresend");

                    // luu lai thoi gian cuoi cung ok
                    var info = JSON.parse(localStorage.getItem("infoParaDtt"));
                    info.timeoklast = getfulltimenow();
                    localStorage.setItem("infoParaDtt", JSON.stringify(info));
                } catch (ev) { }
            }
            f_checkstopall();
        }

    } catch (e) { console.log(e); }
}

function f_checkstopall() {
    try {

        var sumok = $('.readerror').length + $('.readok').length + $('.readresend').length;
        var row = $("#tblDataTsvhDocTucThoi tbody tr").length;
        if (sumok >= row) {
            if ($('.readok').length >= row)
                f_stopTimerDtt();
            else
                f_resendAllError();
        }
    } catch (e) { console.log(e); }
}


function f_checkDatabase(id) {
    try {

        var paradtt = localStorage.getItem("infoParaDtt")
        if (paradtt == null || paradtt == undefined) return;

        var info = JSON.parse(paradtt);
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_DOCTUCTHOI.CheckResultImmediately", callback: "f_resultCheckResultDtt" }
      
        var para = {
            v_Id: id,
            v_TypeCmd: $("select#cbbLoaiReadDtt option:selected").val(),
            v_DateCheck: info.timestart
        }
        ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}
function f_drawHtmlDocTucThoi(defalt) {
    try {
        var lst = localStorage.getItem("lstIdDtt");
        if (lst == null || lst == undefined || lst == "[]" || lst == "") return;

        var lstIdDtt = JSON.parse(lst);
        $("#tblDataTsvhDocTucThoi tbody").empty();

        if (lstIdDtt == null || lst == undefined) {
            showToast("Không có dữ liệu hiển thị", "error");
            return;
        }

        var i = 1;
        $.each(lstIdDtt[0].kq0, function (key, val) {
            try {
                var tr = "";
                tr += "<tr id='tr" + val.id + "'>";
                tr += "<td class='cc'>" + i + "</td>";
                tr += "<td class='cc'>" + val.tendiemdo + "</td>";
                tr += "<td class='cc'>" + val.socongto + "</td>";
                tr += "<td class='cc uHide' id='u" + val.id + "'>-</td>";
                tr += "<td class='cc iHide' id='i" + val.id + "'>-</td>";
                tr += "<td class='cc cosHide' id='cos" + val.id + "'>-</td>";
                tr += "<td class='cc TtenHide' id='p" + val.id + "'>-</td>";
                tr += "<td class='cc EventHide' id='event" + val.id + "'>-</td>";
                tr += "<td class='cc' id='time" + val.id + "'>-</td>";

                tr += "<td class='thongtin" + val.imei + "'  id='thongtin" + val.id + "'  style='width:15%'></td>";
                tr += "<td class='cc " + (defalt ? "readwait" : "") + " " + val.imei + "' id='trangthai" + val.id + "' ></td>";
                tr += "<td class='cc' ><a id='view" + val.id + "' href='#menuTsvh' style='display:none'>Xem </a></td>";
                //  tr += "<td class='cc' ><a id='view" + val.id + "' href='#menuTsvh' >Xem </a></td>";
                i++;
                tr += "</tr>";
                $("#tblDataTsvhDocTucThoi tbody").append(tr);
                f_eventWhenClickViewToTsvh(val);
            } catch (ex) { console.log(ex); }
        });
        f_anHienGrid_dtt();
    }
    catch (e) {
        console.log(e);
    }
}

function f_eventWhenClickViewToTsvh(val) {
    try {
        $("#view" + val.id).click(function () {
            var para = { timeerror: gettimenow(), id: val.id }
            localStorage.setItem("timeerror_ctcb", JSON.stringify(para));
            var objFilter = JSON.parse(localStorage.getItem("tree_node"));
            objFilter[0].hethong = val.istype;
            objFilter[0].typevalue = 1;
            objFilter[0].nameDl = val.tendiemdo;
            objFilter[0].value = val.id;
            localStorage.setItem('SsFilterFromTree', JSON.stringify(objFilter));
            $("#tblTsvh1pha tbody").empty();
            $("#tblTsvh1pha tblTsvh").empty();
            $("#tblTsvh3pha1b tblTsvh").empty();
            //setTimeout(
            // LoadPageByMenuId("menuTsvh", "contentPage"), 500);

        });
    } catch (e) { console.log(e); }
}
function f_resultCheckResultDtt(config, para, data) {
    if (data.length <= 0) return;
    $.each(data, function (key, val) {
        try {
            var trangthai = $("td#trangthai" + val.id).attr("class");
            if (val.soluong > 0 && trangthai.toLowerCase().indexOf("readok") < 0) {
                try {
                    $("td#trangthai" + val.id).removeClass("readwait").addClass("readok");
                } catch (ee) { }
                try {
                    $("td#trangthai" + val.id).removeClass("readresend").addClass("readok");
                } catch (ee) { }

                $("a#view" + val.id).show();

                $("td#u" + val.id).html(val.ua);
                $("td#i" + val.id).html(val.ia);
                $("td#cos" + val.id).html(val.cosa);
                $("td#p" + val.id).html(val.pgiaotong);
                $("td#event" + val.id).html(val.event);

                // luu lai thoi gian cuoi cung ok
                var info = JSON.parse(localStorage.getItem("infoParaDtt"));
                info.timeoklast = getfulltimenow();
                localStorage.setItem("infoParaDtt", JSON.stringify(info));

                $("td#time" + val.id).html(val.timeread);
            }

        } catch (e) {
            console.log(e);
        }
        statusProsessBar();
    });



}


function f_resultDrawDataToHtml(config, para, list) {
    try {
        if (list != null && list != "" && list != "[]") {
            var lstTsvhDocTucthoi = list.split("&&")[0];
            var lstCsttdDocTucthoi = list.split("&&")[1];
            BindingTsvhDocTucThoi(lstTsvhDocTucthoi, 40, JSON.parse(lstTsvhDocTucthoi).length);
            BindingCsttdDocTucThoi(lstCsttdDocTucthoi, 40, JSON.parse(lstCsttdDocTucthoi).length);

        } else {
            $('#information').html("Không có dữ liệu hiển thị");
        }
    } catch (e) { console.log(e); }
}


function f_result_UpdateDocTucThoiLoaiMoi(config, para, data) {

}


function f_startTimerDtt() {
    try {
        try {
            $("#delayClock").removeClass("clock1").addClass("clock");
        } catch (ev) { }
        $("#btnReadDtt").html("Dừng đọc");
        $(".load").css('width', '0%');
        $(".loadtext").text("");
        statusProsessBar();
        hasTimer = true;
        $('.timer').timer({
            editable: true,
            duration: '10s',
            repeat: true,
            callback: function () {
                try {
                    f_checkResultDtt();

                    var info = JSON.parse(localStorage.getItem("infoParaDtt"));
                    info.timenext = getfulltimenow();
                    localStorage.setItem("infoParaDtt", JSON.stringify(info));
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }

}


function f_stopTimerDtt() {
    try {
        hasTimer = false;
        try {
            $("#delayClock").removeClass("clock").addClass("clock1");
        } catch (ev) { }
        $("#btnReadDtt").html("Đọc tức thời");
        $('.timer').timer('remove');
        $('.timer').html("0:00");
        f_chuyendoisangdung();

    } catch (e) { console.log(e); }
}

function f_chuyendoisangdung() {
    try {
        $(".readwait").each(function () {
            try {
                $(this).removeClass("readwait").addClass("readerror");
            } catch (ex) { console.log(e); }
        });
        $(".readresend").each(function () {
            try {
                $(this).removeClass("readresend").addClass("readerror");
            } catch (ex) { console.log(e); }
        });
        statusProsessBar();
    } catch (e) { console.log(e); }
}

function statusProsessBar() {
    try {
        var next = $('.readok').length;
        var sum = $("#tblDataTsvhDocTucThoi tbody tr").length;//$('.readerror').length + $('.readok').length + $('.readwait').length + $('.readresend').length;

        var phantram = Math.round((next * 100) / sum, 1);
        $(".load").css('width', phantram + '%');
        $(".loadtext").text(next + ' / ' + sum);
    } catch (e) { console.log(e); }
}

// =============================================DUNG GUI LAI KHI CO LOI=====================================
function f_resendAllError() {
    try {

        // gui lai sau may lan
        var info = JSON.parse(localStorage.getItem("infoParaDtt"));

        if (resendError < (parseInt(info.repeat) - 1)) {
            // set lai thoi gian 

            info.timeoklast = getfulltimenow();
            info.timenext = getfulltimenow();
            localStorage.setItem("infoParaDtt", JSON.stringify(info));


            resendError++;
            var lstId = "";
            $(".readresend").each(function () {
                try {
                    var id = $(this).attr("id").replace("trangthai", "");
                    var haveInfo = $("#thongtin" + id).html();

                    if (haveInfo == "") {
                        lstId += id + ",";
                        try {
                            $("#trangthai" + id).removeClass("readresend").addClass("readwait");
                        } catch (ec) { }
                    }
                } catch (ex) { console.log(ex); }
            });
            $(".readwait").each(function () {
                try {
                    var id = $(this).attr("id").replace("trangthai", "");
                    lstId += id + ",";
                } catch (ex) { console.log(ex); }

            });
            if (lstId != "")
                f_LoadResendInfoError(lstId);
            else {
                f_stopTimerDtt();
            }
        }
        else {
            f_stopTimerDtt();
        }
    } catch (e) { console.log(e); }

}

function f_LoadResendInfoError(lstId) {
    try {
        if (lstId == null || lstId == undefined || lstId == "") {
            f_stopTimerDtt();
            return;
        }
        console.log("Gui lai lan " + resendError);
        console.log(lstId);
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_DOCTUCTHOI.GetInfoMeterResend", callback: "f_resultGetInfoFromTreeResend" }
       
        var para = {
            v_Value: lstId,
            V_READTYPE: $("select#cbbLoaiReadDtt option:selected").val()
        }

        ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}
function f_resultGetInfoFromTreeResend(config, para, data) {
    try {
        if (data == null || data == undefined || data == "[]" || data == "") {
            f_stopTimerDtt();
            return;
        }

        var lstOld = JSON.parse(localStorage.getItem("lstIdDtt"));
        lstOld.kq2 = data;
        localStorage.setItem("lstIdDtt", JSON.stringify(lstOld));

        var objFilter = GetParamterFilterFromTree();
        var objFilterTemp = JSON.parse(objFilter).SsFilter[0];

        $.each(data, function (key, val) {
            try {
                f_UpdateDataDocTucThoi1PhaNew(objFilterTemp, val);
            } catch (ex) { console.log(ex); }
        });
    } catch (e) { console.log(e); }
}

function f_anHienGrid_dtt() {

    try {
        var type = $("select#cbbLoaiReadDtt option:selected").val();

        var hide;
        var show;
        if (type == "Tten") {
            show = ["TtenHide"];
            hide = ["uHide", "iHide", "cosHide", "EventHide"];
            f_loadAnHienTuongUng(hide, show);
        }
        if (type == "TtenUi") {
            show = ["uHide", "iHide", "cosHide"];
            hide = ["TtenHide", "EventHide"];
            f_loadAnHienTuongUng(hide, show);
        }
        if (type == "Tsvh") {
            show = ["uHide", "iHide", "cosHide", "TtenHide"];
            hide = ["EventHide"];
            f_loadAnHienTuongUng(hide, show);
        }
        if (type == "Event") {
            show = ["EventHide"];
            hide = ["uHide", "iHide", "cosHide", "TtenHide"];
            f_loadAnHienTuongUng(hide, show);
        }
    }
    catch (e) { console.log(e); }

}

function f_loadAnHienTuongUng(hide, show) {
    try {
        $.each(hide, function (key, val) {
            $("." + val).hide();
        });
        $.each(show, function (key, val) {
            $("." + val).show();
        });
    } catch (e) { console.log(e); }
}
// =============================================KET THUC DUNG GUI LAI KHI CO LOI=====================================