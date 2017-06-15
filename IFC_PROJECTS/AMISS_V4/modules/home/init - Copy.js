$(document).ready(function () {
    selectlang();
    initformelement();

    f_GetData_ComboDL();

    $('#ckInday').on('ifChanged', function (event) {
        var inday = 0;
        if ($('#ckInday').is(":checked")) {
            inday = 1;
        }
        var item = $('#jqxDropDL_home').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        f_getDt_ttkh(id, inday);
    });

    $('#Cb_thongke').change(function () {
        var item = $('#jqxDropDL_home').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        var inday = 0;
        if ($('#ckInday').is(":checked")) {
            inday = 1;
        }
        if ($("#Cb_thongke").val() == 1) {
            f_getDt_ttkh(id, inday);
            $('#summary_table').show();
            $('#Chart_content').show();
            $('#legend_sum').show();
            $('#legend_vh').hide();
            $('#event_table').hide();
            $('#vanhanh_table').hide();
            $('#inday').show();
        }
        if ($("#Cb_thongke").val() == 2) {
            f_GetData_cbVanhanh(id);
            $('#summary_table').hide();
            $('#Chart_content').show();
            $('#event_table').hide();
            $('#legend_sum').hide();
            $('#legend_vh').show();
            $('#vanhanh_table').show();
            $('#inday').hide();
        }
        if ($("#Cb_thongke").val() == 3) {
            f_GetData_cbSukien(id);
            $('#summary_table').hide();
            $('#Chart_content').hide();
            $('#event_table').show();
            $('#vanhanh_table').hide();
            $('#legend_sum').hide();
            $('#legend_vh').hide();
            $('#inday').hide();
        }
    });
});

function f_GetData_ComboDL() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetParentNodeAllTree", callback: "f_result_GetParentNodeAllTree" };
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
function f_result_GetParentNodeAllTree(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        //console.log(data);
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '100px'
            });
            $('#jqxDropDL_home').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxDropDL_home').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
                $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
                $('#dropDownButton').jqxDropDownButton('close');
                var inday = 0;
                if ($('#ckInday').is(":checked")) {
                    inday = 1;
                }
                f_getDt_ttkh(item.value, inday);
                f_getDt_ttkh2(item.value, inday);
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.code,
                    "parentid": value.parentcode,
                    "text": value.name,
                    "value": value.code
                }
                console.log(item);
                dt.push(item);

            });
            console.log(dt);
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

function f_getDt_ttkh(v_code, inday) {
    try {
        var p = getAllIdMod();
        var v_Type = '1';
        var v_Value = v_code;
        var v_From = '';
        var v_To = '';
        var v_SoGhi = '';
        var v_ChungLoai = '';
        var v_LoaiCongTo = '0';
        var v_TrangThai = '0';
        var v_ChuKiChot = '0';
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Permission = '1';
        var v_InDay = inday

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_LOIDIEMDO.THONGKELOI4", callback: "f_result_ttkh2" };
        var para = {
            v_Type: v_Type,
            v_Value: v_Value,
            v_From: v_From,
            v_To: v_To,
            v_SoGhi: v_SoGhi,
            v_ChungLoai: v_ChungLoai,
            v_LoaiCongTo: v_LoaiCongTo,
            v_TrangThai: v_TrangThai,
            v_ChuKiChot: v_ChuKiChot,
            v_UserId: v_UserId,
            v_Permission: v_Permission,
            v_InDay: v_InDay
        };

        //console.clear();
        //console.log(para)
        callLoad();
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e.message);
    }

}


function f_getDt_ttkh2(v_code, inday) {
    try {
        var p = getAllIdMod();
        var v_Type = '1';
        var v_Value = v_code;
        var v_From = '';
        var v_To = '';
        var v_SoGhi = '';
        var v_ChungLoai = '';
        var v_LoaiCongTo = '0';
        var v_TrangThai = '0';
        var v_ChuKiChot = '0';
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Permission = '1';
        var v_InDay = inday

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_LOIDIEMDO.THONGKELOI3", callback: "f_result_ttkh" };
        var para = {
            v_Type: v_Type,
            v_Value: v_Value,
            v_From: v_From,
            v_To: v_To,
            v_SoGhi: v_SoGhi,
            v_ChungLoai: v_ChungLoai,
            v_LoaiCongTo: v_LoaiCongTo,
            v_TrangThai: v_TrangThai,
            v_ChuKiChot: v_ChuKiChot,
            v_UserId: v_UserId,
            v_Permission: v_Permission,
            v_InDay: v_InDay
        };

        //console.clear();
        //console.log(para)
        //callLoad();
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_GetData_cbSukien(v_code) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOCONGTO.EVENT_ThongKe", callback: "f_result_EVENT_ThongKe" };
        var para = {
            v_Type: 1,
            v_Value: v_code,
            v_UserId: JSON.parse(localStorage.getItem("userinfo")).userid,
            v_DateNow: gettimenow(),
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_GetData_cbVanhanh(v_code) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.ThongKeCanhBao", callback: "f_result_ThongKeCanhBao" };
        var para = {
            v_Type: 1,
            v_Value: v_code,
            v_From: '',
            v_To: '',
            v_SoGhi: '',
            v_ChungLoai: '',
            v_LoaiCongTo: 0,
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: JSON.parse(localStorage.getItem("userinfo")).userid,
            v_Permission: 1,
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}


function f_result_ThongKeCanhBao(config, para, lst) {
    $('#vanhanh_table tbody').html('');
    $.each(lst.data, function (idx, item) {
        //console.clear();
        //console.log(lst.data);
        if (idx != lst.data.length - 1) {
            var tr = "<tr>"
              + "<td class='a_c'>" + (idx + 1) + "</td>"
              + "<td>" + item.name + "</td>"
              + "<td class='a_c'>" + item.count_u + "</td>"
              + "<td class='a_c'>" + item.count_i + "</td>"
              + "<td class='a_c'>" + item.count_cos + "</td>"
              + "<td class='a_c'>" + item.count_time + "</td>"
              + "<td class='a_c'>" + item.count_p + "</td>" // reversepower ???
              + "<td class='a_c'>" + item.count_sl + "</td>"
              + "</tr>";
            $('#vanhanh_table tbody').append(tr);
        }
        else {
            var tr = "<tr>"
              + "<td colspan='2'></td>"
              + "<td class='a_c'>" + item.count_u + "</td>"
              + "<td class='a_c'>" + item.count_i + "</td>"
              + "<td class='a_c'>" + item.count_cos + "</td>"
              + "<td class='a_c'>" + item.count_time + "</td>"
              + "<td class='a_c'>" + item.count_p + "</td>" // reversepower ???
              + "<td class='a_c'>" + item.count_sl + "</td>"
              + "</tr>";
            $('#vanhanh_table tbody').append(tr);

            var canhbaodienap = parseInt(item.count_u);
            var canhbaodongdien = parseInt(item.count_i);
            var canhbaocos = parseInt(item.count_cos);
            var canhbaolechthoigian = parseInt(item.count_time);
            var canhbaocongsuat = parseInt(item.count_p);
            var canhbaosanluong = parseInt(item.count_sl);

            var sum = canhbaodienap + canhbaodongdien + canhbaocos + canhbaolechthoigian + canhbaocongsuat + canhbaosanluong;

            $('#canhbaodienap_per').html(' (' + (canhbaodienap / sum * 100).toFixed(2) + ')');
            $('#canhbaodongdien_per').html(' (' + (canhbaodongdien / sum * 100).toFixed(2) + ')');
            $('#canhbaocos_per').html(' (' + (canhbaocos / sum * 100).toFixed(2) + ')');
            $('#canhbaolechthoigian_per').html(' (' + (canhbaolechthoigian / sum * 100).toFixed(2) + ')');
            $('#canhbaocongsuat_per').html(' (' + (canhbaocongsuat / sum * 100).toFixed(2) + ')');
            $('#canhbaosanluong_per').html(' (' + (canhbaosanluong / sum * 100).toFixed(2) + ')');

            var labels = [
                "Cảnh báo điện áp",
                "Cảnh báo dòng điện",
                "Cảnh báo cosφ ",
                "Cảnh báo lệch thời gian",
                "Cảnh báo công suất",
                "Cảnh báo sản lượng"
            ];
            var datasets = [
                {
                    data: [
                        canhbaodienap,
                        canhbaodongdien,
                        canhbaocos,
                        canhbaolechthoigian,
                        canhbaocongsuat,
                        canhbaosanluong,
                    ],
                    backgroundColor: [
                        "#00a65a",
                        "#dd4b39",
                        "#3c8dbc",
                        "#3c3dbc",
                        "#5ea987",
                        "#de6ddc"
                    ],
                    hoverBackgroundColor: [
                        "#00a65a",
                        "#dd4b39",
                        "#3c8dbc",
                        "#3c3dbc",
                        "#5ea987",
                        "#de6ddc"
                    ]
                }]
            f_draw_chart(labels, datasets);
        }
    });


}


function f_result_EVENT_ThongKe(config, para, lst) {
    $('#event_table tbody').html('');
    $.each(lst.data, function (idx, item) {
        //console.clear();
        console.log(lst.data);
        var tr = "<tr>"
          + "<td class='a_c'>" + (idx + 1) + "</td>"
          + "<td>" + item.name + "</td>"
          + "<td class='a_c'>" + item.proglog + "</td>"
          + "<td class='a_c'>" + item.currentimbalance + "</td>"
          + "<td class='a_c'>" + item.lostcurrent + "</td>"
          + "<td class='a_c'>" + item.overcurrent + "</td>"
          + "<td class='a_c'>" + item.reverserun + "</td>" // reversepower ???
          + "<td class='a_c'>" + item.overload + "</td>"
          + "<td class='a_c'>" + item.passchange + "</td>"
          + "<td class='a_c'>" + item.timechange + "</td>"
          + "<td class='a_c'>" + item.powerfail + "</td>"
          + "<td class='a_c'>" + item.undervoltage + "</td>"
          + "<td class='a_c'>" + item.overvoltage + "</td>"
          + "<td class='a_c'>" + item.phasefail + "</td>"
          + "<td class='a_c'>" + item.reversevoltage + "</td>"
          + "<td class='a_c'>" + item.reversecurrent + "</td>"
          + "<td class='a_c'>" + item.voltageimbalance + "</td>"
          + "</tr>";
        $('#event_table tbody').append(tr);
    });
}

function f_result_ttkh2(config, para, lst) {
    try {
        var data = lst.data;
        f_drawtable(data);
        console.log('0-----------------');
        console.log(lst);
        var docthanhcong = 0, thanhly = 0, loionlinenotdata = 0;
        $.each(data, function (i, val) {
            if (i == 0) {
                $.each(data, function (idx, item) {
                    if (idx == data.length - 1) {
                        docthanhcong = docthanhcong + parseInt(item.docthanhcong);
                        //loimatdien = loimatdien + parseInt(val.loimatdien);
                        thanhly = thanhly + parseInt(item.thanhly);
                        loionlinenotdata = loionlinenotdata + parseInt(item.loionlinenotdata);
                    }
                });
                var sum = docthanhcong + thanhly + loionlinenotdata;
                $('#docthanhcong_per').html(' (' + (docthanhcong / sum * 100).toFixed(2) + '%)');
                $('#chuacodulieu_per').html(' (' + (loionlinenotdata / sum * 100).toFixed(2) + '%)');
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
                    loionlinenotdata,
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
    }
    catch (e) {
        console.log(e.message);
    }
}

function f_result_ttkh(config, para, lst) {
    try {
        var data = lst.data;
        f_drawtable(data);
        var docthanhcong = 0, thanhly = 0, loionlinenotdata = 0;
        $.each(data, function (i, val) {
            if (i == 0) {
                $.each(val.kq0, function (idx, item) {
                    if (idx == val.kq0.length - 1) {
                        docthanhcong = docthanhcong + parseInt(item.docthanhcong);
                        //loimatdien = loimatdien + parseInt(val.loimatdien);
                        thanhly = thanhly + parseInt(item.thanhly);
                        loionlinenotdata = loionlinenotdata + parseInt(item.loionlinenotdata);
                    }
                });
                var sum = docthanhcong + thanhly + loionlinenotdata;
                $('#docthanhcong_per').html(' (' + (docthanhcong / sum * 100).toFixed(2) + '%)');
                $('#chuacodulieu_per').html(' (' + (loionlinenotdata / sum * 100).toFixed(2) + '%)');
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
                    loionlinenotdata,
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
        //f_draw_chart(labels, datasets);
    }
    catch (e) {
        console.log(e.message);
    }
}

function f_drawtable(data) {
    try {
        //console.log(data);
        $('#summary_table tbody').html('');
        $.each(data, function (i, val) {
            if (i == 0) {
                $.each(val.kq0, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq0.length - 1 || val.kq0.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class='td_tong'></td>"
                       + "<td class='a_c td_tong'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                    }
                    $('#summary_table tbody').append(tr);
                });

            }
            if (i == 1) {
                if (val.kq1.length > 0) {
                    var tr = "<tr><td colspan=7>Mất điện</td></tr>";
                    $('#summary_table tbody').append(tr);
                }
                $.each(val.kq1, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq1.length - 1 || val.kq1.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class=' td_tong'></td>"
                       + "<td class='a_c td_tong'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                    }
                    $('#summary_table tbody').append(tr);
                });
            }
            if (i == 2) {
                if (val.kq2.length > 0) {
                    var tr = "<tr><td colspan=7 class=' text-bold'>Chưa lắp DCU và chờ cấu hình RF</td></tr>";
                    $('#summary_table tbody').append(tr);
                }
                $.each(val.kq2, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq2.length - 1 || val.kq2.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class=' td_tong'></td>"
                       + "<td class='a_c td_tong'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                    }
                    $('#summary_table tbody').append(tr);
                });

            }
            if (i == 3) {
                if (val.kq3.length > 0) {
                    var tr = "<tr><td colspan=6 class='text-bold'>Các điểm đo chờ khai báo thông tin</td></tr>";
                    $('#summary_table tbody').append(tr);
                }

                $.each(val.kq3, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq3.length - 1 || val.kq3.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=7 class=' td_tong'></td>"
                       + "<td class='a_c td_tong'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                    }
                    $('#summary_table tbody').append(tr);
                });
            }
        });
    }
    catch (e) {
        console.log(e.message)
    }
}
function f_draw_chart(labels, datasets) {
    try {
        $('#pieChart').remove(); // this is my <canvas> element
        $('.chart-responsive').append('<canvas id="pieChart"><canvas>');
        console.log('f');
        //console.log(datasets);
        var ctx = $("#pieChart").get(0).getContext("2d");
        ctx.canvas.height = 320;
        var data = {
            labels: labels,
            datasets: datasets
        };
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {

                maintainAspectRatio: true,
                responsive: true,
                legend: {
                    display: false,
                    position: 'bottom',
                },
                borderWidth: 0

            }
        });
        stopLoad();
    }
    catch (e) {
        console.log(e.message)
    }
}


