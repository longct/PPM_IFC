
var hasTimer = false;
var resendError = 0;
$(document).ready(function () {
    try {
        showhideTree();
        loadContent();
        selectlang();
        initformelement();
      
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
                f_eventWhenClickViewToTsvh("205737");
            } catch (e) { }
        });
      
    } catch (e) {
        console.log(e);
    }
   
});

function f_GetInfoFromTree() {
    try {
        callLoad();
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_DOCTUCTHOI.GetInfoMeterFromTree", callback: "f_resultGetInfoFromTree" }
        var para = {
            v_Type: objFilter[0].type,
            v_Value: objFilter[0].meterid,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: "",
            v_TrangThai: "0",
            v_ChuKiChot: "0",
            v_UserId: "1",
            v_Permission: "1",
            v_TypeValue: "1",
            v_HeThong: "1",
            V_READTYPE: $("select#cbbLoaiReadDtt option:selected").val()
        }
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

function f_resultGetInfoFromTree(config, para, lst) {
    try {
 
        if (lst.data.length == 0) {
            showToast("Không có dữ liệu hiển thị", "error");
            stopLoad();
            return;
        }

        var timestartt = (lst.data.kq2 == null || lst.data.kq2 == undefined || lst.data.kq2.length == 0 || lst.data.kq2[0].timecmd == undefined) ? getfulltimenow() : lst.data.kq2[0].timecmd;

        var info = { timestart: timestartt, timenext: getfulltimenow(), timeoklast: getfulltimenow(), repeat: "2", timerepeat: "2" };
        localStorage.setItem("infoParaDtt", JSON.stringify(info));

        localStorage.setItem("lstIdDtt", JSON.stringify(lst.data));
     
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

        stopLoad();
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}
function f_UpdateDataDocTucThoi1PhaNew() {
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
function f_drawHtmlDocTucThoi(defalt) {
    try {
        var lst = localStorage.getItem("lstIdDtt");
        if (lst == null || lst == undefined || lst == "[]" || lst == "") return;
      
        var lstIdDtt = JSON.parse(lst);
        $("#tblDataTsvhDocTucThoi tbody").empty();
        //console.log(lstIdDtt);
        if (lstIdDtt == null || lstIdDtt.length == 0) {
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
                   // f_checkResultDtt();

                    //var info = JSON.parse(localStorage.getItem("infoParaDtt"));
                    //info.timenext = getfulltimenow();
                    //localStorage.setItem("infoParaDtt", JSON.stringify(info));
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
        stop_Loading('info_dtt');

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