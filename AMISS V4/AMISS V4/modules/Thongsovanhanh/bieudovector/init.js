var pageLoad = 0;
var dataModified = 0;
var VH_GET_DATA_FOR_VECTORS = "PKG_THONGSOVANHANH.BieuDoVector_KHACHHANG";
var stop_timming = 0;
var start_drawing_chart = 0;
var drawing_chart_OnRow = 1;
var chart = null;
var loopItemCount = 5;
var roundInOdd = 1;  // mai bui comment để lấy giá trị thực vẽ lên biểu đồ var roundInOdd =  1000;//1kv
var startLoadDataCount = 0;
var hasLoadDataForMeter = 0;//1: loaded
//Two array must be same index
var arrDisplayBlock = ['rdbAll', 'rdbPQA', 'rdbPQB', 'rdbPQC', 'rdbPQT', 'rdbUI'];
var arrDisplayChartBlock = ['1', '1', '1', '1', '1', '1'];

function InitPage() {
    showhideTree();
    initformelement();
    //Load Slide bar
    LoadInitValues();

    SetReadOnlyInforOnDisplay();
};

jQuery(window).load(function () {
    pageLoad = 1;
});

function SetReadOnlyInforOnDisplay(objectInfor) {
    var jsonTextArr = ['txtUA', 'txtUB', 'txtUC', 'txtIA', 'txtIB', 'txtIC', 'txtPA', 'txtPB', 'txtPC',
        'txtQA', 'txtQB', 'txtQC', 'txtUIAngleA', 'txtUIAngleB', 'txtUIAngleC'];
    $.each(jsonTextArr, function (idx, name) {
        $('#' + name).prop('readonly', true);
    });
    //$('#btnStopDrawingChart').prop("disabled", true);
}

function addOneDay(valddMmYyyy) {
    var dmy = valddMmYyyy.split("/");
    var joindate = new Date(
        parseInt(dmy[2], 10),
        parseInt(dmy[1], 10) - 1,
        parseInt(dmy[0], 10)
    );
    joindate.setDate(joindate.getDate() + 1);
    var newDate = ("0" + joindate.getDate()).slice(-2) + "/" + ("0" + (joindate.getMonth() + 1)).slice(-2) + "/" + joindate.getFullYear();
    return newDate;
}

function addOneMonth(valddMmYyyy) {
    var dmy = valddMmYyyy.split("/");
    var joindate = new Date(
        parseInt(dmy[2], 10),
        parseInt(dmy[1], 10) - 1,
        parseInt(dmy[0], 10)
    );
    joindate.setMonth(joindate.getMonth() + 1);
    var newDate = ("0" + joindate.getDate()).slice(-2) + "/" + ("0" + (joindate.getMonth() + 1)).slice(-2) + "/" + joindate.getFullYear();
    return newDate;
}

function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
}

function LoadInitValues() {
    var fromDate = $('#dtNgay').val();
    if (fromDate == null) return;
    var x = new Date();
    x.setMonth(x.getMonth());
    $('#dtNgay').val(getFormattedDate(x));
}

function LoadModemSerialNoList() {
    var objSource = sessionStorage.getItem("ListSocongto");
    if (objSource != null && objSource != "" && objSource.length > 0) {
        BindingDataToComboboxSocongto("cboSocongtobdvt", "", "", "socongto", " Tất cả", "socongto", objSource, true, false);
    }
}

function setSliderTicks() {
    var $slider = $('#slider');
    var max = $slider.slider("option", "max");
    var spacing = 100 / (max - 1);

    $slider.find('.ui-slider-tick-mark').remove();
    for (var i = 0; i < max ; i++) {
        $('<span class="ui-slider-tick-mark"></span>').css('left', (spacing * i) + '%').appendTo($slider);
    }
}


$(document).ready(function () {
    debugger
    $("#dtNgay").val(gettimenow());
    //InitPage();
    var s_socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto.split(';');
    $.each(s_socongto, function (i, val) {
        $('#cb_socongto').append('<option>' + val + '</option>');
    });
    //load Elster Modem Code
    LoadModemSerialNoList();
    $(".fullscreen-tsvh").click(function () {
        $('#content_1310').toggleClass("fullscreen", 300);
        var my_div = $(".tab-content");
        var div_top = my_div.offset().top;

        $(document).scroll(function () {
            if (div_top <= $(document).scrollTop()) {
                $(".sticky-thead").css("width", "100%");
            }
        });
    });

    $(".print-bdvt").click(function () {
        var dv_id = $(this).parents(".print_div").attr('id');

        //Print ele4 with custom options
        $('#content-vector').print({
            //Use Global styles
            globalStyles: false,
            //Add link with attrbute media=print
            mediaPrint: false,
            //Custom stylesheet
            stylesheet: "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
            //Print in a hidden iframe
            iframe: true,
            //Don't print this
            noPrintSelector: ".avoid-this"
        });
    });

    $("input[name='radio']").change(function () {
        var name = $(this).name;
        var index = arrDisplayBlock.indexOf(name);
        if (index == 0) displayVector();
        $.each(arrDisplayBlock, function (idx, radioname) {
            arrDisplayChartBlock[idx] = '0';
        });
        arrDisplayChartBlock[index] = '1';
    });

    var sliderChange = 0;
    $("#slider").on("slidechange", function (event, ui) {
        var value = $("#slider").slider("option", "value");
        if (stop_timming == 0) return;
        if (value > loopItemCount) { return; }
        drawing_chart_OnRow = value - 1;
        if (drawing_chart_OnRow < 0) drawing_chart_OnRow = loopItemCount;
        if (stop_timming == 1 && sliderChange == 0) {
            sliderChange = 1;
            displayVector();
            sliderChange = 0;
        }
    });


    $("#dtNgay").change(function () {
        try {
            getDataForVectors(true);
        } catch (e) {
            //console.log('Lỗi dtNgay/change');
            console.log(e);
        }

    });

    dataModified = 0;
    //click thuc hien
    $("#btnStopDrawingChart").click(function () {
        switch (stop_timming) {
            case 0:
                stop_timming = 1;
                $("#btnStopDrawingChart").text("Tiếp tục");
                break;
            case 1:
                stop_timming = 0;
                $("#btnStopDrawingChart").text("Tạm dừng");
                break;
        }
    });

    //ui func
    $("#rdbAll").click(function () {
        $("#bdleft").show();
        $("#bdright").show();
        $("#container_PQPhaseA").show();
        $("#container_PQPhaseB").show();
        $("#container_PQPhaseC").show();
        $("#container_PQTong").show();
        $("#container_UICOSAngle").show();
        $("#container_PQPhaseA").removeClass("singleDisplay1");
        $("#container_PQPhaseB").removeClass("singleDisplay1");
        $("#container_PQPhaseC").removeClass("singleDisplay1");
        $("#container_PQTong").removeClass("singleDisplay1");
        $("#container_UICOSAngle").removeClass("singleDisplay1");
        $("#bdleft").removeClass("singleWidth1");
        $("#bdright").removeClass("singleWidth1");
        if (stop_timming == 1) {
            displayVector();
        }
    });

    $("#rdbPQA").click(function () {
        $("#container_PQPhaseA").show();
        $("#container_PQPhaseA").addClass("singleDisplay1");

        $("#bdright").hide();
        $("#bdleft").addClass("singleWidth1");
        $("#container_PQPhaseB").hide();
        $("#container_PQPhaseC").hide();

        $("#bdleft").show();
        $("#bdright").hide();
    });

    $("#rdbPQB").click(function () {
        $("#container_PQPhaseB").show();
        $("#container_PQPhaseB").addClass("singleDisplay1");

        $("#bdright").hide();
        $("#bdleft").addClass("singleWidth1");
        $("#container_PQPhaseA").hide();
        $("#container_PQPhaseC").hide();

        $("#bdleft").show();
        $("#bdright").hide();
    });

    $("#rdbPQC").click(function () {
        $("#container_PQPhaseC").show();
        $("#container_PQPhaseC").addClass("singleDisplay1");

        $("#bdright").hide();
        $("#bdleft").addClass("singleWidth1");
        $("#container_PQPhaseA").hide();
        $("#container_PQPhaseB").hide();

        $("#bdleft").show();
        $("#bdright").hide();
    });

    $("#rdbPQT").click(function () {
        $("#container_PQTong").show();
        $("#container_PQTong").addClass("singleDisplay1");

        $("#bdleft").hide();
        $("#bdright").show();
        $("#bdleft").addClass("singleWidth1");
        $("#container_UICOSAngle").hide();
    });

    $("#rdbUI").click(function () {
        $("#container_UICOSAngle").show();
        $("#container_UICOSAngle").addClass("singleDisplay1");

        $("#bdleft").hide();
        $("#bdright").show();
        $("#bdleft").addClass("singleWidth1");
        $("#container_PQTong").hide();
    });
    //end ui-func

    pageLoad = 1;
    LoadCharts();
});

function fillRowInforOnDisplay(objectInfor, updateProgress) {
    var jsonTextArr = ['txtUA', 'txtUB', 'txtUC', 'txtIA', 'txtIB', 'txtIC', 'txtPA', 'txtPB', 'txtPC', 'txtQA', 'txtQB', 'txtQC',
        'txtUIAngleA', 'txtUIAngleB', 'txtUIAngleC', 'txtPQAngleA', 'txtPQAngleB', 'txtPQAngleC'];
    var jsonTextVal = ['ua', 'ub', 'uc', 'ia', 'ib', 'ic', 'pa_dr', 'pb_dr', 'pc_dr', 'qa_dr', 'qb_dr', 'qc_dr',
        'anglea', 'angleb', 'anglec', 'goca', 'gocb', 'gocc'];
    $.each(jsonTextArr, function (idx, name) {
        var value = objectInfor[jsonTextVal[idx]];
        if ($.isEmptyObject(value)) value = '-';
        $('#' + name).val(value);
    });

    try {
        var dateValue = $('#dtNgay').val();
        var displayInfor = 'Có ' + loopItemCount + ' thời điểm có dữ liệu trong ngày ' + dateValue + '. [Đang ở vị trí ' + drawing_chart_OnRow + '. Thời điểm ' + objectInfor['metertime'] + ']';
        $('#sliderInforMation').text(displayInfor);
        if (updateProgress == '1') $("#slider").slider("option", "value", drawing_chart_OnRow);
    } catch (e) {
        $('#sliderInforMation').text('Chưa có dữ liệu.');
        console.log(e);
    }
}

function LoadCharts() {
    debugger
    var objFilterTemp = JSON.parse(localStorage.getItem("tree_node"))[0];
    //var objFilter = GetParamterFilterFromTree();
    //var objFilterTemp = JSON.parse(objFilter).SsFilter[0];
    var code = objFilterTemp.code;
    dataModified = 0;
    //kiem tra chon 1 diem do
    //var hethong = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].hethong + '';
    var hethong = '0';

    if (hethong == '1' || hethong == '') {

        CommonFunction.DisplayNotification(MessageType.ERROR, AMISSLanguages.PLEASE_CHOOSE_AN_ITEM_3PHASE, 'infor_bdvt');
        $('#infor_bdvt').css('display', 'block');
        $('#main_filterBdvt').css('display', 'none');
        $('#contents').css('display', 'none');
        return;
    }

    //if (code == null || !(code.indexOf('@') == -1) || code.substr(0, 2) == "01") {
    //    CommonFunction.DisplayNotification(MessageType.ERROR, AMISSLanguages.PLEASE_CHOOSE_ONE_MEASURE_POINT, 'infor_bdvt');
    //    $('#infor_bdvt').css('display', 'block');
    //    $('#main_filterBdvt').css('display', 'none');
    //    $('#contents').css('display', 'none');
    //    return;
    //}

    //if (objFilterTemp.code == null || objFilterTemp.code == "" || objFilterTemp.code.substr(0, 2) == "01") {
    //    CommonFunction.DisplayNotification(MessageType.ERROR, AMISSLanguages.PLEASE_CHOOSE_ONE_MEASURE_POINT, 'infor_bdvt');
    //    $('#infor_bdvt').css('display', 'block');
    //    $('#main_filterBdvt').css('display', 'none');
    //    $('#contents').css('display', 'none');
    //    return;
    //}

    localStorage.removeItem('DatachartviewdayBdvt');

    startLoadDataCount = 0;
    $("#slider").slider();

    var lineSeries = Highcharts.seriesTypes.line;
    var lineDrawGraph = lineSeries.prototype.drawGraph;
    lineSeries.prototype.drawGraph = function () {
        var arrowLength = 10,
            arrowWidth = 2,
            series = this,
            segments = series.linedata || series.segments,
            lastSeg = segments[segments.length - 1],
            lastPoint = lastSeg[lastSeg.length - 1],
            nextLastPoint = lastSeg[lastSeg.length - 2],
            angle = Math.atan((lastPoint.plotX - nextLastPoint.plotX) /
            (lastPoint.plotY - nextLastPoint.plotY)),
            path = [];

        angle = Math.PI + angle;
        lineDrawGraph.apply(series, arguments);
        path.push('M', lastPoint.plotX, lastPoint.plotY);
        if (lastPoint.plotX <= nextLastPoint.plotX && lastPoint.plotY <= nextLastPoint.plotY && (nextLastPoint.plotX >= 0) && (nextLastPoint.plotY >= 0)) {
            //path.push(
            //    'L',
            //    lastPoint.plotX + arrowWidth * Math.cos(angle),
            //    lastPoint.plotY - arrowWidth * Math.sin(angle)
            //);
            //path.push(
            //    lastPoint.plotX + arrowLength * Math.sin(angle),
            //    lastPoint.plotY + arrowLength * Math.cos(angle)
            //);
            //path.push(
            //    lastPoint.plotX - arrowWidth * Math.cos(angle),
            //    lastPoint.plotY + arrowWidth * Math.sin(angle),
            //    'Z'
            //);
        }
        else {
            path.push(
                'L',
                lastPoint.plotX - arrowWidth * Math.cos(angle),
                lastPoint.plotY + arrowWidth * Math.sin(angle)
            );
            path.push(
                lastPoint.plotX - arrowLength * Math.sin(angle),
                lastPoint.plotY - arrowLength * Math.cos(angle)
            );
            path.push(
                lastPoint.plotX + arrowWidth * Math.cos(angle),
                lastPoint.plotY - arrowWidth * Math.sin(angle),
                'Z'
            );
        }
        series.chart.renderer.path(path).attr({ fill: series.color }).add(series.group);
    };

    stop_timming = 0;
    start_drawing_chart = 1;
    draw3Chart("container_PQPhaseA", "P, Q Pha A", 0, 360, 45, 0, 360, null);
    shortlyGet = false;
    stop_timming = 0;
    startPing();
}

function getAngle3Series(object, itemCol, angleInteval) {
    switch (itemCol) {
        case "Pa": return 0; break;
        case "Pb": return 0; break;
        case "Pc": return 0; break;
        case "Pt": return 0; break;
        case "Qa": return 90; break;
        case "Qb": return 90; break;
        case "Qc": return 90; break;
        case "Qt": return 90; break;
        case "Sa": return Math.round(Math.abs(angleInteval)); break;
        case "Sb": return Math.round(Math.abs(angleInteval)); break;
        case "Sc": return Math.round(Math.abs(angleInteval)); break;
        case "St": return Math.round(Math.abs(angleInteval)); break;
    }
    return 0;
}

function getAngle6Series(object, itemCol, angleInteval, phaseindex) {
    angleInteval = checkNANAngleValue(angleInteval, phaseindex);
    var value = 0;
    switch (itemCol) {
        case "Ia":
            value = Math.round(-90 - Math.abs(angleInteval)); break;
        case "Ib":
            value = Math.round(30 - Math.abs(angleInteval)); break;
        case "Ic":
            value = Math.round(150 - Math.abs(angleInteval)); break;
        case "Ua":
            value = (-90); break;
        case "Ub":
            value = (30); break;
        case "Uc":
            value = (150); break;
        case "IaUa":
            value = Math.round(-90 + 0.65 * angleInteval); break;
        case "IbUb":
            value = Math.round(30 + 0.85 * angleInteval); break;
        case "IcUc":
            value = Math.round(150 + 1.1 * angleInteval); break;
    }
    return value;
}

function getSeries3Unit(jsonDataRow, jsonName, angleName, cosName) {
    var gocAbc = 0;
    var seri = new Object();
    seri.name1 = jsonName[0];
    seri.name2 = jsonName[1];
    seri.name3 = jsonName[2];
    var inOdd = 1;
    gocAbc = jsonDataRow[angleName];
    var angleInteval = parseFloat(gocAbc);
    seri.data1 = [0];
    var dataRound = parseFloat(jsonDataRow[jsonName[0].toLowerCase()]) * roundInOdd;
    dataRound = checkNANValue(dataRound, 1);
    seri.data1.push(Math.round(Math.abs(dataRound)));
    seri.data2 = [0];
    dataRound = parseFloat(jsonDataRow[jsonName[1].toLowerCase()]);
    dataRound = checkNANValue(dataRound, 1);
    if (inOdd == 1) dataRound = Math.round(dataRound * roundInOdd);
    dataRound = checkNANValue(dataRound, 1);
    seri.data2.push(Math.round(Math.abs(dataRound)));
    seri.data3 = [0];
    var divideOperator = jsonDataRow[cosName];
    if (parseFloat(divideOperator) == '0') { divideOperator = '1'; };
    dataRound = parseFloat(jsonDataRow[jsonName[0].toLowerCase()]) / parseFloat(divideOperator);
    dataRound = checkNANValue(dataRound, 1);
    if (inOdd == 1) dataRound = Math.round(dataRound * roundInOdd);
    seri.data3.push(Math.round(Math.abs(dataRound)));
    seri.pointInterval1 = getAngle3Series(seri, seri.name1, angleInteval);
    seri.pointInterval1 = checkNANAngleValue(seri.pointInterval1, '1');
    seri.pointInterval2 = getAngle3Series(seri, seri.name2, angleInteval);
    seri.pointInterval2 = checkNANAngleValue(seri.pointInterval2, '2');
    seri.pointInterval3 = getAngle3Series(seri, seri.name3, angleInteval);
    seri.pointInterval3 = checkNANAngleValue(seri.pointInterval3, '3');

    return seri;
}

function checkNANValue(value, valueinstead) {
    if (Number.isNaN(value) == true) return valueinstead;
    if (value == 0) return valueinstead;
    return value;
}

function checkNANAngleValue(value, phase) {
    switch (phase) {
        case '1':
            if (Number.isNaN(value) == true) return 30;
            break;
        case '2':
            if (Number.isNaN(value) == true) return 90;
            break;
        case '3':
            if (Number.isNaN(value) == true) return 120;
            break;
    }

    return value;
}


function draw3Chart(container, nameChart, angleFrom, angleTo, interval, minInterVal, maxInterval, seriesObject) {
    if (seriesObject == null || seriesObject == "") return;

    var jsonSeri3 = [{ pointStart: 0, pointInterval: seriesObject.pointInterval1, type: 'line', name: seriesObject.name1, data: seriesObject.data1, marker: { enabled: false }, color: '#4572A7' },
                        { pointStart: 0, pointInterval: seriesObject.pointInterval2, type: 'line', name: seriesObject.name2, data: seriesObject.data2, marker: { enabled: false }, color: '#AA4643' },
                        { pointStart: 0, pointInterval: seriesObject.pointInterval3, type: 'line', name: seriesObject.name3, data: seriesObject.data3, marker: { enabled: false }, color: '#89A54E' }];
    chart = new Highcharts.Chart({
        chart: { renderTo: container, type: 'polar', plotShadow: false, polar: true },
        title: { text: '' },
        subtitle: {
            text: nameChart, style: {
                color: "#FF00FF"
            }
        },
        pane: { startAngle: 0, endAngle: 360 },
        xAxis: { tickInterval: 90, min: -90, max: 270, labels: { enabled: false }, },
        exporting: { enabled: false },
        yAxis: {
            min: 0
        },
        plotOptions: {
            series: { animation: false, pointStart: 0, pointInterval: 360 * 60, lineWidth: 2, showInLegend: false },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },

        animation: false,
        series: jsonSeri3

    });



    chart.redraw();
}

function draw6Chart(container, nameChart, angleFrom, angleTo, interval, minInterVal, maxInterval, seriesObject) {
    if (seriesObject == null || seriesObject == "") return;
    var json6Seri = [{ pointStart: 0, pointInterval: seriesObject.pointInterval1, type: 'line', name: seriesObject.name1, data: seriesObject.data1, marker: { enabled: false }, color: '#FF00FF' },
                        { pointStart: 0, pointInterval: seriesObject.pointInterval2, type: 'line', name: seriesObject.name2, data: seriesObject.data2, marker: { enabled: false }, color: '#0066FF' },
                        { pointStart: 0, pointInterval: seriesObject.pointInterval3, type: 'line', name: seriesObject.name3, data: seriesObject.data3, marker: { enabled: false }, color: '#00FF00' },
                        { pointStart: 0, pointInterval: seriesObject.pointInterval4, type: 'line', name: seriesObject.name4, data: seriesObject.datamax, marker: { enabled: false }, color: '#FF00FF' },
                        { pointStart: 0, pointInterval: seriesObject.pointInterval5, type: 'line', name: seriesObject.name5, data: seriesObject.datamax, marker: { enabled: false }, color: '#0066FF' },
                        { pointStart: 0, pointInterval: seriesObject.pointInterval6, type: 'line', name: seriesObject.name6, data: seriesObject.datamax, marker: { enabled: false }, color: '#00FF00' }];
    chart = new Highcharts.Chart({
        chart: { renderTo: container, type: 'polar', plotShadow: false, polar: true },
        title: { text: '' },
        subtitle: {
            text: nameChart, style: {
                color: "#acacac"
            }
        },
        pane: { startAngle: 0, endAngle: 360 },
        xAxis: {
            tickInterval: 90,
            min: -90,
            max: 270,
            labels: {
                enabled: false
            },
        },
        exporting: { enabled: false },
        yAxis: {
            min: 0,
            labels: {
                enabled: false
            }
        },
        plotOptions: {
            series: { animation: false, pointStart: 0, pointInterval: 60, showInLegend: false },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },
        series: json6Seri
    });
    chart.redraw();
}

//Ua,Ub,Uc, Ia,Ib,Ic
function getSeries6Unit(jsonDataRow, jsonName, angleName) {
    var gocA = 0;
    var gocB = 0;
    var gocC = 0;
    var seri = new Object();
    seri.name1 = jsonName[0];
    seri.name2 = jsonName[1];
    seri.name3 = jsonName[2];
    seri.name4 = jsonName[3];
    seri.name5 = jsonName[4];
    seri.name6 = jsonName[5];

    gocA = jsonDataRow[angleName[0]];
    gocB = jsonDataRow[angleName[1]];
    gocC = jsonDataRow[angleName[2]];

    var angleIntevalA = parseFloat(gocA);
    var angleIntevalB = parseFloat(gocB);
    var angleIntevalC = parseFloat(gocC);
    var arrVals = [1];

    var inOdd = 0;
    seri.data1 = [0];
    var dataRound = Math.round(parseFloat(jsonDataRow[jsonName[0]]));
    if (dataRound <= 5) {
        inOdd = 1; dataRound = Math.round(parseFloat(jsonDataRow[jsonName[0]]) * roundInOdd);
        arrVals.push(dataRound);
    }
    seri.data1.push(dataRound);
    seri.data2 = [0];
    dataRound = Math.round(parseFloat(jsonDataRow[jsonName[1]]));
    if (Number.isNaN(dataRound) == true) dataRound = 0;
    if (inOdd == 1) { dataRound = Math.round(jsonDataRow[jsonName[1]] * roundInOdd); }
    dataRound = checkNANValue(dataRound, 1);
    seri.data2.push(dataRound);
    arrVals.push(dataRound);
    seri.data3 = [0];
    dataRound = Math.round(parseFloat(jsonDataRow[jsonName[2]]));
    dataRound = checkNANValue(dataRound, 1);
    if (inOdd == 1) { dataRound = Math.round(jsonDataRow[jsonName[2]] * roundInOdd); }
    //if (dataRound == 0) { dataRound = 1; };
    seri.data3.push(dataRound);
    arrVals.push(dataRound);
    seri.data4 = [0];
    dataRound = Math.round(parseFloat(jsonDataRow[jsonName[3]]));
    dataRound = checkNANValue(dataRound, 1);
    //if (dataRound == 0) { dataRound = 1; };
    seri.data4.push(dataRound);
    seri.data5 = [0];
    dataRound = Math.round(parseFloat(jsonDataRow[jsonName[4]]));
    dataRound = checkNANValue(dataRound, 1);
    //if (dataRound == 0) { dataRound = 1; };
    seri.data5.push(dataRound);
    seri.data6 = [0];
    dataRound = Math.round(parseFloat(jsonDataRow[jsonName[5]]));

    dataRound = checkNANValue(dataRound, 1);
    seri.data6.push(dataRound);
    seri.max = Math.max.apply(Math, arrVals) + 5;
    seri.datamax = [0];
    seri.datamax.push(seri.max);

    seri.pointInterval1 = getAngle6Series(seri, seri.name1, angleIntevalA, '1');
    seri.pointInterval2 = getAngle6Series(seri, seri.name2, angleIntevalB, '2');
    seri.pointInterval3 = getAngle6Series(seri, seri.name3, angleIntevalC, '3');
    seri.pointInterval4 = getAngle6Series(seri, seri.name4, angleIntevalA, '1');
    seri.pointInterval5 = getAngle6Series(seri, seri.name5, angleIntevalB, '2');
    seri.pointInterval6 = getAngle6Series(seri, seri.name6, angleIntevalC, '3');

    seri.angleiauastart = getAngle6Series(seri, seri.name1 + seri.name4, angleIntevalA, '1');
    seri.angleibubstart = getAngle6Series(seri, seri.name2 + seri.name5, angleIntevalB, '2');
    seri.angleicucstart = getAngle6Series(seri, seri.name3 + seri.name6, angleIntevalC, '3');

    seri.angleiauaend = Math.round(parseFloat(seri.angleiauastart) + Math.abs(angleIntevalA));
    seri.angleiauaend = checkNANAngleValue(seri.angleiauaend, '1');
    seri.angleibubend = Math.round(parseFloat(seri.angleibubstart) + Math.abs(angleIntevalB));
    seri.angleibubend = checkNANAngleValue(seri.angleibubend, '2');
    seri.angleicucend = Math.round(parseFloat(seri.angleicucstart) + Math.abs(angleIntevalC));
    seri.angleicucend = checkNANAngleValue(seri.angleicucend, '3');
    return seri;
}



var shortlyGet = false;

function startPing() {
    if (stop_timming == 1) return;
    if (shortlyGet == true) {
        shortlyGet = true;
        getDataForVectors(shortlyGet);
    }
    setInterval(function () {
        if (stop_timming == 1) return;
        getDataForVectors(false);
    }, 3000);
}

function getDataForVectors(willForceReadData) {
    startLoadDataCount += 1;
    try {
        debugger
        var objFilterTemp = JSON.parse(localStorage.getItem("tree_node"))[0];
        var meterId = objFilterTemp.meterid;
        var inputValues = collectInputValues(meterId);
        var params = inputValues;

        var userId = objFilterTemp.userid;
        debugger
        //$.xhrPool.abortAll();
        //   run_Loading('container_BieuDoVector', AMISSLanguages.LOADING_LABLE);
        var config = {
            connstr: "ConnectOracle_Amiss4",
            nameSql: VH_GET_DATA_FOR_VECTORS,//URL_GETDATA_FOR_VECTORS,
            userid: userId, callback: "f_resultdataBieuDoVector"
        }
        var lstData = localStorage.getItem("DatachartviewdayBdvt");
        var list;
        if (lstData != null && lstData.length > 2) {
            list = JSON.parse(lstData);
            if (willForceReadData == true) {
                if (startLoadDataCount > 1) { stop_Loading('container_BieuDoVector'); }
                list = ExecuteServiceSyns(config, params);
            }

            try {
                f_resultdataBieuDoVector(null, null, list);
            } catch (e) {
                console.log(e);
            }

        } else {
            if (startLoadDataCount > 1) { stop_Loading('container_BieuDoVector'); return; }
            list = ExecuteServiceSyns(config, params);
        }
    } catch (e) {
        stop_timming = 1;
        console.log(e);
    }
}

function displayVector() {
    var lstData = localStorage.getItem("DatachartviewdayBdvt");
    var list;
    if (lstData != null && lstData.length > 2) {
        list = JSON.parse(lstData);
        f_resultdataBieuDoVector(null, null, list);
        if (list == null || list === "" || list === "[]") return;
        var seriesA = [];
        var seriesB = [];
        var seriesC = [];
        var seriesT = [];
        var seriesUi = [];
        var exitEach = 0;
        $.each(list, function (i, result) {
            var index = parseFloat(drawing_chart_OnRow) + 1;
            if ((i == index || index == loopItemCount) && exitEach == 0) {
                exitEach = 1;
                fillRowInforOnDisplay(result, '');
                seriesA = getSeries3Unit(result, ['Pa', 'Qa', 'Sa'], ['goca'], ['cosa']);
                seriesB = getSeries3Unit(result, ['Pb', 'Qb', 'Sb'], ['gocb'], ['cosb']);
                seriesC = getSeries3Unit(result, ['Pc', 'Qc', 'Sc'], ['gocc'], ['cosc']);
                seriesT = getSeries3Unit(result, ['Pt', 'Qt', 'St'], ['goct'], ['cost']);
                seriesUi = getSeries6Unit(result, ['Ia', 'Ib', 'Ic', 'Ua', 'Ub', 'Uc'], ['anglea', 'angleb', 'anglec']);

                if (stop_timming == 1) {
                    draw3Chart("container_PQPhaseA", "P, Q Pha A", 0, 360, 45, 0, 360, seriesA);
                    draw3Chart("container_PQPhaseB", "P, Q Pha B", 0, 360, 45, 0, 360, seriesB);
                    draw3Chart("container_PQPhaseC", "P, Q Pha C", 0, 360, 45, 0, 360, seriesC);

                    draw3Chart("container_PQTong", "P, Q Tổng", 0, 360, 45, 0, 360, seriesT);
                    draw6Chart("container_UICOSAngle", "Thông số U, I, Cos, Góc lệch", 0, 360, 45, 0, 360, seriesUi);
                }
            }
        });
    }
}

function f_resultdataBieuDoVector(config, para, list) {
    debugger
    stop_Loading('container_BieuDoVector');

    if (list != null && list !== "" && list !== "[]") {
        $("#gridShowTime").removeClass("invisible");
        //$("#btnStopChart").removeAttr("disabled");
        if (para != null) localStorage.setItem("DatachartviewdayBdvt", JSON.stringify(list));
        var results = list;
        var seriesA = [];
        var seriesB = [];
        var seriesC = [];
        var seriesT = [];
        var seriesUi = [];
        var exitEach = 0;
        loopItemCount = Object.keys(list).length;
        $("#slider").slider("option", "max", loopItemCount);
        setSliderTicks();
        $.each(results, function (i, result) {
            var index = parseFloat(drawing_chart_OnRow) + 1;
            if ((i == index || index == loopItemCount) && exitEach == 0) {
                exitEach = 1;
                tickOnRow();

                seriesA = getSeries3Unit(result, ['Pa', 'Qa', 'Sa'], ['goca'], ['cosa']);
                seriesB = getSeries3Unit(result, ['Pb', 'Qb', 'Sb'], ['gocb'], ['cosb']);
                seriesC = getSeries3Unit(result, ['Pc', 'Qc', 'Sc'], ['gocc'], ['cosc']);
                seriesT = getSeries3Unit(result, ['Pt', 'Qt', 'St'], ['goct'], ['cost']);
                seriesUi = getSeries6Unit(result, ['Ia', 'Ib', 'Ic', 'Ua', 'Ub', 'Uc'], ['anglea', 'angleb', 'anglec']);

                if (stop_timming == 0) {
                    fillRowInforOnDisplay(result, '1');
                    draw3Chart("container_PQPhaseA", "P, Q Pha A", 0, 360, 45, 0, 360, seriesA);
                    draw3Chart("container_PQPhaseB", "P, Q Pha B", 0, 360, 45, 0, 360, seriesB);
                    draw3Chart("container_PQPhaseC", "P, Q Pha C", 0, 360, 45, 0, 360, seriesC);

                    draw3Chart("container_PQTong", "P, Q Tổng", 0, 360, 45, 0, 360, seriesT);
                    draw6Chart("container_UICOSAngle", "Thông số U, I, Cos, Góc lệch", 0, 360, 45, 0, 360, seriesUi);
                }
            }
        });
    } else {
        $("#gridShowTime").addClass("invisible");
        //$("#btnStopChart").attr("disabled", true);
        $("#slider").slider("option", "max", 0);
    }

    try {
        //$('#btnStopDrawingChart').prop("disabled", false);
    } catch (e) { console.log(e); }
}

function tickOnRow() {
    drawing_chart_OnRow = drawing_chart_OnRow + 1;
    if (drawing_chart_OnRow > loopItemCount - 1) drawing_chart_OnRow = 0;
    $("#slider").slider("option", "value", drawing_chart_OnRow);
}

///Get input values from form's elements.
function collectInputValues(meterId) {
    debugger
    var values = new Object();
    values.v_MeterId = meterId;
    values.v_Socongto = $("#cboSocongtobdvt option:selected").text();
    if (values.v_Socongto.trim() == 'Tất cả') {
        values.v_Socongto = '-1';
    };
    values.v_From = $('#dtNgay').val();
    var toDateValue = $('#dtNgay').val();
    var toDate = timeaddday1(toDateValue, 1);
    values.v_To = toDate;

    return values;
}

$.xhrPool = [];

$.xhrPool.abortAll = function () {

    if ($.xhrPool.length > 0) {
        for (var i = 0; i < $.xhrPool.length; i++) {
            $.xhrPool[i].abort();
        }
        $.xhrPool.length = 0;
    }
};

$.ajaxSetup({
    cache: false,
    beforeSend: function (jqXhr) {
        $.xhrPool.push(jqXhr);
    }
});
