$(document).ready(function () {
    showhideTree();
    selectlang();
    initformelement();
    loadContent();
    f_load_combo();

    var d = new Date;
    if ($("#date_thang").val() == "") {
        $("#date_thang").val(thanglui());
    }
    $('input[type=radio][name=rad_typeview]').change(function () {
        if (this.value == 1) {
            $('.typeview2').hide();
            $('.typeview1').show();
        }
        else if (this.value == 2) {

            $('.typeview1').hide();
            $('.typeview2').show();

            var item = $('#jqxDropDL_home').jqxTree('getSelectedItem');
            var id = $(item).attr('id')
            var inday = 0;
            //if ($('#ckInday').is(":checked")) {
            //    inday = 1;
            //}

            if ($('#ckInday').is(":checked")) {
                inday = 1;
            }
            f_getDt_ttkh(id, inday);
            $('#summary_table').show();
            $('#legend_sum').show();
            $('#legend_vh').hide();
            $('#Inday').show();
        }
    });

    $('#btn_thuchien').click(function () {
        $('#img_loading_home').show();
        f_cbo_DL_select();
    });

    $("#ckInday").change(function () {
        var inday = 0;
        if (this.checked) {
            inday = 1;
        }
        var item = $('#jqxDropDL_home').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        f_getDt_ttkh(id, inday);
    });

});

function f_load_combo() {
    try {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TREE.GET_ALL_FOLDER", callback: "f_result_load_combo" };
        var para = {
            v_Code: "01",
            v_TypeTree: "01"
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
        //console.log(data);
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '30px'
            });
            $('#jqxDropDL_home').on('select', function (event) {
                f_cbo_DL_select(event);
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.code,
                    "parentid": value.parentcode,
                    "text": value.name,
                    "value": value.code
                }
                //console.log(item);
                dt.push(item);

            });
            //console.log(dt);
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id' },
                    { name: 'parentid' },
                    { name: 'text' },
                    { name: 'value' }
                ],
                id: 'id',
                localdata: dt
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
            $('#jqxDropDL_home').jqxTree({ source: records, width: '305px', height: '200px', });
            $('#jqxDropDL_home').jqxTree('selectItem', $("#01")[0]);
        }
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_cbo_DL_select() {
    //var args = event.args;
    var item = $('#jqxDropDL_home').jqxTree('getSelectedItem');
    //var item = $('#jqxDropDL_home').jqxTree('getItem', args.element);
    var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
    $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
    $('#dropDownButton').jqxDropDownButton('close');

    var type_view = $('input[name=rad_typeview]:checked').val()
    if (type_view == 1) {
        f_get_chisodinhky(item.value);
    }
    else {
        var inday = 0;
        //if ($('#ckInday').is(":checked")) {
        //    inday = 1;
        //}
        if ($('#ckInday').is(":checked")) {
            inday = 1;
        }
        callLoad();
        f_getDt_ttkh(item.value, inday)
    }
}

function f_get_chisodinhky(v_code) {
    try {
        callLoad();
        var p = getAllIdMod();
        var v_kychot = p.cbo_kychot;
        var v_thangchot = "01/" + p.date_thang;
        var v_option = p.cbo_option;

        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_HOME.SumHome_chisodinhky", callback: "f_result_chisodinhky" };
        var para = {
            v_Code: v_code,
            v_kychot: v_kychot,
            v_thangchot: v_thangchot,
            v_option: v_option,
        };

        //console.clear();
        //console.log(para)
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e.message);
    }

}


function f_getDt_ttkh(v_code, inday) {
    try {
        var p = getAllIdMod();
        var v_Value = v_code;
        var v_InDay = inday

        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_HOME.THONGKELOI", callback: "f_result_ttkh" };
        var para = {
            v_Value: v_Value,
            v_InDay: v_InDay
        };

        //console.clear();
        console.log(para)
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_result_ttkh(config, para, lst) {
    try {
        var data = lst.data;

        var docthanhcong = 0, thanhly = 0, docthatbai = 0;
        $.each(data, function (i, val) {
            if (i == 0) {
                $.each(val.kq0, function (idx, item) {
                    if (idx == val.kq0.length - 1) {
                        docthanhcong = docthanhcong + parseInt(item.docthanhcong);
                        //loimatdien = loimatdien + parseInt(val.loimatdien);
                        thanhly = thanhly + parseInt(item.thanhly);
                        docthatbai = docthatbai + parseInt(item.docthatbai);
                    }
                });
                var sum = docthanhcong + thanhly + docthatbai;
                $('#docthanhcong_per').html(' (' + (docthanhcong / sum * 100).toFixed(2) + '%)');
                $('#chuacodulieu_per').html(' (' + (docthatbai / sum * 100).toFixed(2) + '%)');
                $('#thanhly_per').html(' (' + (thanhly / sum * 100).toFixed(2) + '%)');
            }
        });

        var labels = [
            "Đọc thành công",
            "Chưa có dữ liệu",
            "Thanh lý"
        ];
        var datasets = [
            {
                data: [
                    docthanhcong,
                    docthatbai,
                    thanhly,
                ],
                backgroundColor: [
                    "#00a65a",
                    "#dd4b39",
                    //"#3c8dbc",
                    "#f39c12"
                ],
                hoverBackgroundColor: [
                    "#00a65a",
                    "#dd4b39",
                    //"#3c8dbc",
                    "#f39c12"
                ]
            }]
        f_draw_chart(labels, datasets);
        f_drawtable(data);
    }
    catch (e) {
        console.log(e.message);
    }
}


function f_result_chisodinhky(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        $('#thongke_chisodinhky thead').html('');
        $('#thongke_chisodinhky tbody').html('');
        $('#thongke_chisodinhky thead').html(
            '<tr>'
           + '<th>Đơn vị</th>'
           + '<th>Số điểm đo</th>'
           + '<th>Ngày chốt</th>'
           + '<th>Tỷ lệ</th>'
           + '<th>Yêu cầu</th>'
           + '</tr>')
        var tr1, tr2 = "";
        var khongcodulieu = 0, codulieu = 0;
        $.each(data, function (idx, item) {
            var opt = $('#cbo_option').val();
            if (item.codulieu != -9999 && item.name != '-9999') {
                var color = "";
                if ((item.tyle.slice(0, -1) < 80 && opt == 0)
                    ||
                    (item.tyle.slice(0, -1) > 80 && opt == 1)
                    ) {
                    color = 'red';
                }
                tr1 += '<tr>'
                + '<td>' + item.name + '</td>'
                + '<td class="a_c">' + (opt == 0 ? item.codulieu : item.khongcodulieu) + '/' + item.tong + '</td>'
                + '<td class="a_c">' + item.ngaychot + '</td>'
                + '<td class="a_c" style="font-weight:bold;color:' + color + '">' + item.tyle + '</td>'
                + '<td class="a_c" style="color:' + color + '"><a style="cursor: pointer;" onclick="return f_gotoDBCMIS();">Đồng bộ CMIS</a></td>'
                + '</tr>';

            }
            else {
                if (item.name != '-9999') {
                    var color = "";
                    if (item.tyle.slice(0, -1) > 80) {
                        color = 'red';
                    }
                    tr2 += '<tr>'
                    + '<td>' + item.name + '</td>'
                    + '<td class="a_c">' + item.khongcodulieu + '/' + item.tong + '</td>'
                    + '<td class="a_c">-</td>'
                    + '<td class="a_c" style="font-weight:bold;color:' + color + '">' + item.tyle + '</td>'
                    + '<td class="a_c" style="color:' + color + '"><a style="cursor: pointer;" value="' + item.code + '" onclick="return f_gotoDBCMIS(this);">Thiết lập ngày chốt</a></td>'
                    + '</tr>';
                }
                else {
                    codulieu = parseInt(item.codulieu);
                    khongcodilieu = parseInt(item.khongcodulieu)
                }
            }
        });
        $('#thongke_chisodinhky tbody').append(tr1);
        $('#thongke_chisodinhky tbody').append('<tr style="background: #02B1F4;color:#fff">'
            + '<td class="a_c">Điểm đo chưa được thiết lập ngày chốt</td>'
            + '<td class="a_c">Số điểm đo chưa thiết lập</td>'
            + '<td class="a_c">Ngày chốt</td>'
            + '<td class="a_c">Tỷ lệ chưa thiết lập</td>'
            + '<td class="a_c">Yêu cầu</td></tr>');
        $('#thongke_chisodinhky tbody').append(tr2);


        var labels = [
            "Có dữ liệu",
            "Chưa có dữ liệu",
        ];

        var datasets = [
            {
                data: [
                    codulieu,
                    khongcodilieu,
                ],
                backgroundColor: [
                    "#00a65a",
                    "#dd4b39",
                    //"#3c8dbc",
                    "#f39c12"
                ],
                hoverBackgroundColor: [
                    "#00a65a",
                    "#dd4b39",
                    //"#3c8dbc",
                    "#f39c12"
                ]
            }]

        f_draw_chart(labels, datasets);
    }
    catch (e) {
        console.log(e.message);
    }
}

function f_gotoDBCMIS() {
    menuClick('cmis_dongbocmissdinhky', 11111)
}

function f_drawtable(data) {
    try {
        //console.log(data);
        $('#summary_table tbody').html('');
        var tong_thanhcong = 0;
        var tong_chuacodulieu = 0;
        var tong_thanhly = 0;
        var tong_tongdiemdo = 0;
        $.each(data, function (i, val) {
            if (i == 0) {
                $.each(val.kq0, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq0.length - 1 || val.kq0.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c' ><a class='showdetail_1' style='color:#dd4b39' data-toggle='modal' href='#modal_chitiet_home' id='viewdetail_" + item.code + "'>" + item.docthatbai + "</a></td>"
                       + "<td class='a_c' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class='td_tong'></td>"
                       + "<td class='a_c td_tong' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong' style='color:#dd4b39'>" + item.docthatbai + "</td>"
                       + "<td class='a_c td_tong' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                        tong_thanhcong = tong_thanhcong + item.docthanhcong;
                        tong_chuacodulieu = tong_chuacodulieu + item.docthatbai;
                        tong_thanhly = tong_thanhly + item.thanhly;
                        tong_tongdiemdo = tong_tongdiemdo + item.tong;
                    }
                    $('#summary_table tbody').append(tr);
                });

            }
            if (i == 1) {
                if (val.kq1.length > 0) {
                    var tr = "<tr><td colspan=7>Lỗi khách quan (mất điện, sim hết tiền, sự cố nhà mạng ...)</td></tr>";
                    $('#summary_table tbody').append(tr);
                }
                $.each(val.kq1, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq1.length - 1 || val.kq1.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c' style='color:#00a65a'> " + item.docthanhcong + "</td>"
                       + "<td class='a_c' ><a class='showdetail_2' style='color:#dd4b39' data-toggle='modal' href='#modal_chitiet_home' id='viewdetail_" + item.code + "'>" + item.docthatbai + "</a></td>"
                       + "<td class='a_c' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class=' td_tong'></td>"
                       + "<td class='a_c td_tong' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong' style='color:#dd4b39'>" + item.docthatbai + "</td>"
                       + "<td class='a_c td_tong' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                        tong_thanhcong = tong_thanhcong + item.docthanhcong;
                        tong_chuacodulieu = tong_chuacodulieu + item.docthatbai;
                        tong_thanhly = tong_thanhly + item.thanhly;
                        tong_tongdiemdo = tong_tongdiemdo + item.tong;
                    }
                    $('#summary_table tbody').append(tr);
                });
            }
            if (i == 2) {
                if (val.kq2.length > 0) {
                    var tr = "<tr><td colspan=7 class=' text-bold'>Chờ cấu hình RF (Có thể đọc bằng HHU hoặc Bluetooth)</td></tr>";
                    $('#summary_table tbody').append(tr);
                }
                $.each(val.kq2, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq2.length - 1 || val.kq2.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c' ><a class='showdetail_3' style='color:#dd4b39' data-toggle='modal' href='#modal_chitiet_home' id='viewdetail_" + item.code + "'>" + item.docthatbai + "</a></td>"
                       + "<td class='a_c' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class=' td_tong'></td>"
                       + "<td class='a_c td_tong' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong' style='color:#dd4b39'>" + item.docthatbai + "</td>"
                       + "<td class='a_c td_tong' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                        tong_thanhcong = tong_thanhcong + item.docthanhcong;
                        tong_chuacodulieu = tong_chuacodulieu + item.docthatbai;
                        tong_thanhly = tong_thanhly + item.thanhly;
                        tong_tongdiemdo = tong_tongdiemdo + item.tong;
                    }
                    $('#summary_table tbody').append(tr);
                });

            }
            if (i == 3) {
                if (val.kq3.length > 0) {
                    var tr = "<tr><td colspan=7 class=' text-bold'>Tổng</td></tr>";
                    $('#summary_table tbody').append(tr);
                }
                $.each(val.kq3, function (idx, item) {

                    tr = "<tr>"
                        + "<td></td>"
                    + "<td>" + item.name + "</td>"
                   + "<td class='a_c' style='color:#00a65a'>" + tong_thanhcong + "</td>"
                   + "<td class='a_c' style='color:#dd4b39'>" + tong_chuacodulieu + "</td>"
                   + "<td class='a_c' style='color:#f39c12'>" + tong_thanhly + "</td>"
                   + "<td class='a_c'>" + tong_tongdiemdo + "</td>"
                   + "<td class='a_c'>" + ((tong_thanhcong / tong_tongdiemdo) * 100).toFixed(2); + "%</td>"
                   + "</tr>";

                    $('#summary_table tbody').append(tr);
                });


            }
        });

        $('.showdetail_1').click(function () {
            var inday = 0;
            //if ($('#ckInday').is(":checked")) {
            //    inday = 1;
            //}
            if ($('#ckInday').is(":checked")) {
                inday = 1;
            }
            f_loadListdiemdoloi(inday, 1, $(this).attr('id'))
        });
        $('.showdetail_2').click(function () {
            var inday = 0;
            //if ($('#ckInday').is(":checked")) {
            //    inday = 1;
            //}
            if ($('#ckInday').is(":checked")) {
                inday = 1;
            }
            f_loadListdiemdoloi(inday, 2, $(this).attr('id'))
        })
        $('.showdetail_3').click(function () {
            var inday = 0;
            //if ($('#ckInday').is(":checked")) {
            //    inday = 1;
            //}
            if ($('#ckInday').is(":checked")) {
                inday = 1;
            }
            f_loadListdiemdoloi(inday, 3, $(this).attr('id'))
        })
        $('.showdetail_4').click(function () {
            var inday = 0;
            //if ($('#ckInday').is(":checked")) {
            //    inday = 1;
            //}
            if ($('#ckInday').is(":checked")) {
                inday = 1;
            }
            f_loadListdiemdoloi(inday, 4, $(this).attr('id'))
        })
    }
    catch (e) {
        console.log(e.message)
    }
}
function f_draw_chart(labels, datasets) {
    try {
        callLoad();
        //console.log(labels);
        //console.log(datasets)
        $('#pieChart').remove(); // this is my <canvas> element
        $('.chart-responsive').append('<canvas id="pieChart"><canvas>');
        //console.log(datasets);
        var ctx = $("#pieChart").get(0).getContext("2d");
        var data = {
            labels: labels,
            datasets: datasets
        };
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,

            options: {
                legend: {
                    display: false
                },
                legendCallback: function (chart) {
                    //console.log(chart);
                    var legendHtml = [];
                    legendHtml.push('<table>');
                    var total = data.datasets[0].data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                        var precentage = Math.floor(((chart.data.datasets[0].data[i] / total) * 100) + 0.5);
                        legendHtml.push('<tr>');
                        legendHtml.push('<td><div class="chart-legend" style="width:20px;margin-right:10px; height:10px;background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></div></td>');
                        if (chart.data.labels[i]) {
                            legendHtml.push('<td class="chart-legend-label-text" >' + chart.data.labels[i] + ' ' + (precentage.toString() == 'NaN' ? '-' : precentage + '%') + '</td>');
                        }
                        legendHtml.push('</tr>');
                    }

                    legendHtml.push('</table>');
                    return legendHtml.join("");
                },
            }
        });
        document.getElementById('legend_js').innerHTML = myPieChart.generateLegend();
        stopLoad();
        $('#img_loading_home').hide();
    }
    catch (e) {
        console.log(e.message)
    }
}

function thanglui() {
    try {
        var dateDefault = new Date();
        dateDefault.setMonth(dateDefault.getMonth() - 1);
        var dat = (dateDefault.getMonth() + 1) + "/" + dateDefault.getFullYear();
        return dat;
    } catch (e) {
        //console.log(e);
        return "";
    }

}