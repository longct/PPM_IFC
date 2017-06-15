
var DTTDCU = {
    firstWait: randomIntFromInterval(10000, 15000),
    isFirstTime: true,
    isCallDatabase: false,
    hasTimerDcu: false,
    resendErrorDcu: 0,
    dataExcel: [],
    totalTime: ''
};
$(document).ready(function () {
    try {
        showhideTree();
        selectlang();
        initformelement();
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow());
        f_load_combo();
        $("#btnDoc").click(function () {
            try {
                var today = new Date();
                var txtdate = $("#txtDateDoctucthoiDcu").val();
                var dat_choose = new Date(txtdate.split('/')[2], txtdate.split('/')[1] - 1, txtdate.split('/')[0]);
                var distance = days_between(today, dat_choose);
                if (distance > 30) {
                    CommonFunction.DisplayNotification(MessageType.ERROR, "Hãy chọn trong khoảng 30 ngày gần nhất", 'info_DttDcu');
                    return;
                }
            } catch (e) {
                console.log(e.message);
            }

            var item = $('#jqxDropDL_docttdcu').jqxTree('getSelectedItem');
            var code = item.id;
            var loaithumuc = item.value;
            if (code.length < 6 || loaithumuc != "5") {
                showToast("Hãy chọn trạm cấp biến áp để đọc", 'error');
                return;
            }

            DTTDCU.dataExcel = [];
            DTTDCU.isFirstTime = true;
            DTTDCU.isCallDatabase = false;
            console.log(DTTDCU);
            try {
                if (DTTDCU.hasTimerDcu) {
                    f_stopTimerDttDcu();
                    return;
                }
                else {
                    //window.setTimeout(function () {
                    //    f_startTimerDttDcu();
                    //}, DTTDCU.firstWait);
                    f_startTimerDttDcu();
                }
            }
            catch (ex) { console.log(ex); }
            try {
                DTTDCU.resendErrorDcu = 0;
                $("#csdk_data tbody").empty();
                f_get_kh_by_imei(code);
            } catch (e) { }
        });

        $("#btnXuatExcel").click(function () {
            XuatExcel();
        });
    } catch (e) {
        console.log(e);
    }

});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addDays(dat, day) {
    dat.setDate(dat.getDate() + day);
    var dd = dat.getDate();
    var mm = dat.getMonth() + 1;
    var y = dat.getFullYear();
    var newdate = dd + '/' + mm + '/' + y;
    return dat;
}

function days_between(date1, date2) {
    try {
        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime()
        var date2_ms = date2.getTime()

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms)

        // Convert back to days and return
        return Math.round(difference_ms / ONE_DAY)
    } catch (e) {
        console.log(e.message);
        return null;
    }

}

function f_get_kh_by_imei(code) {
    try {
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_DOCDULIEUDCU.GetKhachhangByImei",
            callback: "f_result_f_get_kh_by_imei"
        };
        var para = {
            v_imei: code
        }
        ExecuteServiceSyns(config, para);
    } catch (e) {

    }
}

function f_result_f_get_kh_by_imei(config, para, data) {
    try {
        DTTDCU.data = data.data;
        $("#csdk_data tbody").empty();
        if (!data || data == '[]' || data.data[0].id == undefined) {
            showToast("Không có khách hàng nào tương ứng, kiểm tra lại imei","error");
            return;
        }
        f_drawHtmlDocTucThoi(data.data, true);
    } catch (e) {
        console.log(e.message);
    }

}

function f_checkstopall() {
    try {

        var sumok = $('.readerror').length + $('.readok').length + $('.readresend').length;
        var row = $("#tblDataTsvhDocTucThoi tbody tr").length;
        if (sumok >= row) {
            if ($('.readok').length >= row) {
                alert(111);
                f_stopTimerDttDcu();
            }

            else
                f_resendAllError();
        }
    } catch (e) { console.log(e); }
}

function f_drawHtmlDocTucThoi(data, isWait) {
    try {
        var lstIdDttDcu = data;
        if (!data || data == "[]") return;


        $("#csdk_data tbody").empty();

        var i = 1;
        $.each(lstIdDttDcu, function (key, val) {
            try {
                var tr = "";
                tr += "<tr id='tr" + val.id + "'>";
                tr += "<td class='text-center'>" + i + "</td>";
                tr += "<td>" + val.tendiemdo + "</td>";
                tr += "<td class='text-center'>" + val.socongto + "</td>";
                //tr += "<td class='cc uHide' id='u" + val.id + "'>-</td>";
                //tr += "<td class='cc iHide' id='i" + val.id + "'>-</td>";
                //tr += "<td class='cc cosHide' id='cos" + val.id + "'>-</td>";
                tr += "<td class='text-center TtenHide' id='p" + val.id + "'>-</td>";
                tr += "<td class='text-center' id='time" + val.id + "'>-</td>";
                tr += "<td class='text-center " + (isWait ? "readwait" : "") + " " + val.imei + "' id='trangthai" + val.id + "' ></td>";
                i++;
                tr += "</tr>";
                $("#csdk_data tbody").append(tr);

            } catch (ex) { console.log(ex); }
        });

        statusProsessBar();
    }
    catch (e) {
        console.log(e);
    }
}


function f_checkResultDttDcu() {
    try {
        var readwait = $("td.readwait");

        if (readwait != null && readwait.length > 0) {
            var meterid = readwait[0].id.toString().replace("trangthai", "");
            DTTDCU.isFirstTime = false;
            var config = {
                connstr: "ConnectOracle_Amiss4",
                namesql: "PKG_DOCDULIEUDCU.GetThongsoDocDCU",
                callback: "f_result_checkResultDttDcu"
            };
            var para = {
                v_meterid: meterid,
                v_date: $("#txtDateDoctucthoiDcu").val(),
            }
            ExecuteServiceSyns(config, para);
        } else {
            //if (!DTTDCU.isFirstTime) {
            //    f_stopTimerDttDcu();
            //}
            f_stopTimerDttDcu();
        }

    } catch (e) {
        console.log(e.message);
    }
}

function f_result_checkResultDttDcu(config, para, result) {
    try {
        var data = result.data;
        if (!data || data == '[]' || data.length == 0 || data[0].meterid == undefined) {
            $("td#trangthai" + para.v_meterid).removeClass("readwait").addClass("readerror");
            return;
        }
        DTTDCU.dataExcel.push(data[0]);
        $("#u" + para.v_meterid).text(data[0].ua == null ? '-' : data[0].ua);
        $("#i" + para.v_meterid).text(data[0].ia == null ? '-' : data[0].ia);
        $("#cos" + para.v_meterid).text(data[0].cosa == null ? '-' : data[0].cosa);
        $("#p" + para.v_meterid).text(data[0].pgiaotong == null ? '-' : data[0].pgiaotong);
        $("#time" + para.v_meterid).text(data[0].time);
        $("td#trangthai" + para.v_meterid).removeClass("readwait").addClass("readok");
        statusProsessBar();
    } catch (e) {
        console.log(e.message);
    }
}

function f_startTimerDttDcu() {
    try {
        try {
            $("#delayClock").removeClass("clock1").addClass("clock");
        } catch (ev) { }
        $("#btnDoc").html("Dừng đọc");
        $(".load").css('width', '0%');
        $(".loadtext").text("");
        statusProsessBar();
        DTTDCU.hasTimerDcu = true;


        $('.timer').timer({
            editable: true,
            duration: '1s',
            repeat: true,
            callback: function () {
                try {
                    DTTDCU.totalTime = $('.timer').text();
                    if (!DTTDCU.isFirstTime) {
                        f_checkResultDttDcu();

                    } else {
                        if (!DTTDCU.isCallDatabase) {
                            DTTDCU.isCallDatabase = true;
                            window.setTimeout(function () {
                                f_checkResultDttDcu();
                            }, DTTDCU.firstWait);
                        }
                    }


                } catch (ex) { console.log(ex); }
            },
        });



    } catch (e) { console.log(e); }

}


function f_stopTimerDttDcu() {
    try {
        DTTDCU.hasTimerDcu = false;
        try {
            $("#delayClock").removeClass("clock").addClass("clock1");
        } catch (ev) { }
        $("#btnDoc").html("Đọc tức thời");
        $('.timer').timer('pause');
        $('.timer').timer('remove');

        $('.timer').html(DTTDCU.totalTime);
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
        var sum = $("#csdk_data tbody tr").length;//$('.readerror').length + $('.readok').length + $('.readwait').length + $('.readresend').length;

        var phantram = Math.round((next * 100) / sum, 1);
        $(".load").css('width', phantram + '%');
        $(".loadtext").text(next + ' / ' + sum);
    } catch (e) { console.log(e); }
}


function f_load_combo() {
    try {
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_TREE.GET_ALL_FOLDER",
            callback: "f_result_load_combo"
        };
        var para = {
            v_Code: "01"
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_load_combo(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '30px'
            });
            $('#jqxDropDL_docttdcu').on('select', function (event) {
                f_cbo_DL_select(event);
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.code,
                    "parentid": value.parentcode,
                    "text": value.name,
                    "value": value.loaithumuc
                }
                //console.log(item);
                dt.push(item);

            });
            
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id' },
                    { name: 'parentid' },
                    { name: 'text' },
                    { name: 'value' },
                    { name: 'loaithumuc' }
                ],
                id: 'id',
                loaithumuc : 'loaithumuc',
                localdata: dt
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
            $('#jqxDropDL_docttdcu').jqxTree({ source: records, width: '305px', height: '200px', });
            
            $('#jqxDropDL_docttdcu').jqxTree('selectItem', $("#jqxDropDL_docttdcu").find("#01")[0]);
        }
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_cbo_DL_select() {
    var item = $('#jqxDropDL_docttdcu').jqxTree('getSelectedItem');
    var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
    $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
    $('#dropDownButton').jqxDropDownButton('close');
}

function XuatExcel() {
    try {
        var config = {
            namesql: "___",
            namefile: "DanhSachDocDuLieuDCU",
            connstr: "ConnectOracle_Amiss4"
        };
        var para = {
            v_page: -1,
            v_pagecount: 100000
        };
        console.log(DTTDCU.dataExcel);
        var dt = '{ "table": ' + JSON.stringify(DTTDCU.dataExcel) + ' }';
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "tendiemdo", name: "Tên điểm đo", type: "Text" },
               { field: "madiemdo", name: "Mã điểm đo", type: "Text" },
               { field: "makhachhang", name: "Mã khách hàng", type: "Text" },
               { field: "socongto", name: "Số công tơ", type: "Text" },
                { field: "imei", name: "Imei", type: "Text" },
                { field: "ma_tram", name: "Mã trạm", type: "Text" },
                { field: "soghi", name: "Sổ ghi", type: "Text" },
                { field: "macot", name: "Mã cột", type: "Text" },
                { field: "pgiaotong", name: "Chỉ số (Kwh)", type: "Text" },
                { field: "time", name: "Thời gian đọc", type: "Text" },
            ]
        };
        api_excuteExcel_New(config, para, JSON.parse(dt), colum);
    } catch (e) {
        console.log(e);
    }
}


	
