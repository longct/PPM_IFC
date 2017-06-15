$(document).ready(function () {
    showhideTree();
    selectlang();
    initformelement();
    loadContent();
    f_GetData_ComboDL_BanDo();


    //$('#ckInday').on('ifChanged', function (event) {
    //    var inday = 0;
    //    if ($('#ckInday').is(":checked")) {
    //        inday = 1;
    //    }
    //    var item = $('#jqxDropDL_home').jqxTree('getSelectedItem');
    //    var id = $(item).attr('id')
    //    f_getDt_ttkh(id, inday);
    //});
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
            //f_cbo_DL_select();
            $('#Cb_thongke').val('1').trigger('change');
            $('.typeview1').hide();
            $('.typeview2').show();
            $('#event_table').hide();
            $('#vanhanh_table').hide();

        }
    });

    $('#btn_thuchien').click(function () {
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

    $('#Cb_thongke').change(function () {
        var item = $('#jqxDropDL_home').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        var inday = 0;
        //if ($('#ckInday').is(":checked")) {
        //    inday = 1;
        //}

        if ($('#ckInday').is(":checked")) {
            inday = 1;
        }
        if ($("#Cb_thongke").val() == 1) {
            f_getDt_ttkh(id, inday);
            $('#summary_table').show();
            //$('#Chart_content').show();
            $('#legend_sum').show();
            $('#legend_vh').hide();
            $('#event_table').hide();
            $('#vanhanh_table').hide();
            $('#Inday').show();
        }
        if ($("#Cb_thongke").val() == 2) {
            f_GetData_cbVanhanh(id);
            $('#summary_table').hide();
            //$('#Chart_content').show();
            $('#event_table').hide();
            $('#legend_sum').hide();
            $('#legend_vh').show();
            $('#vanhanh_table').show();
            $('#Inday').hide();
        }
        if ($("#Cb_thongke").val() == 3) {
            f_GetData_cbSukien(id);
            $('#summary_table').hide();
            //$('#Chart_content').hide();
            $('#event_table').show();
            $('#vanhanh_table').hide();
            $('#legend_sum').hide();
            $('#legend_vh').hide();
            $('#Inday').hide();
        }
    });

    $('#f5_sumhome').click(function () {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_LOIDIEMDO.refreshsumhome", callback: "" };
        var para = {

        };

        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        setTimeout(function () {
            location.reload();
        }, 3000);
    });
    // $(".colslape_tree").click();
});

function f_GetData_ComboDL_BanDo() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetParentNodeAllTree", callback: "f_result_GetParentNodeAllTree_BanDo" };
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
function f_result_GetParentNodeAllTree_BanDo(config, para, lst) {
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
        if ($("#Cb_thongke").val() == 1) {
            f_getDt_ttkh(item.value, inday)
        }
        if ($("#Cb_thongke").val() == 2) {
            f_GetData_cbVanhanh(item.value)
        }
        if ($("#Cb_thongke").val() == 3) {
            f_GetData_cbSukien(item.value)
        }
    }
}

function f_get_chisodinhky(v_code) {
    try {
        callLoad();
        var p = getAllIdMod();
        var v_kychot = p.cbo_kychot;
        var v_thangchot = "01/" + p.date_thang;
        var v_option = p.cbo_option;

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_HOME.SumHome_chisodinhky", callback: "f_result_chisodinhky" };
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
        callLoad();
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

    var proglog = 0;
    var currentimbalance = 0;
    var lostcurrent = 0;
    var overcurrent = 0;
    var reverserun = 0;
    var overload = 0;
    var passchange = 0;
    var timechange = 0;
    var powerfail = 0;
    var undervoltage = 0;
    var overvoltage = 0;
    var phasefail = 0;
    var reversevoltage = 0;
    var reversecurrent = 0;
    var voltageimbalance = 0;

    $.each(lst.data, function (idx, item) {
        //console.clear();
        //console.log(lst.data);
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
        proglog = proglog + item.proglog;
        currentimbalance = currentimbalance + item.currentimbalance;
        lostcurrent = lostcurrent + item.lostcurrent;
        overcurrent = overcurrent + item.overcurrent;
        reverserun = reverserun + item.reverserun;
        overload = overload + item.overload;
        passchange = passchange + item.passchange;
        timechange = timechange + item.timechange;
        powerfail = powerfail + item.powerfail;
        undervoltage = undervoltage + item.undervoltage;
        overvoltage = overvoltage + item.overvoltage;
        phasefail = phasefail + item.phasefail;
        reversevoltage = reversevoltage + item.reversevoltage;
        reversecurrent = reversecurrent + item.reversecurrent;
        voltageimbalance = voltageimbalance + item.voltageimbalance;

    });

    var sum = proglog + currentimbalance + lostcurrent +
        overcurrent + reverserun + overload + passchange +
        timechange + powerfail + undervoltage + overvoltage + phasefail + reversevoltage + reversecurrent + voltageimbalance;

    var labels = [
        "Lập trình công tơ",
        "Mất cân bằng dòng",
        "Mất dòng",
        "Quá dòng",
        "Ngược công suất",
        "Quá tải",
        "Đổi mật khẩu",
        "Thay đổi thời gian",
        "Mất nguồn",
        "Thấp áp",
        "Quá áp",
        "Mất điện áp pha",
        "Ngược chiều điện áp",
        "Ngược chiều dòng điện",
        "Mất cân bằng áp"
    ];
    var datasets = [
        {
            data: [
               proglog,
               currentimbalance,
               lostcurrent,
               overcurrent,
               reverserun,
               overload,
               passchange,
               timechange,
               powerfail,
               undervoltage,
               overvoltage,
               phasefail,
               reversevoltage,
               reversecurrent,
               voltageimbalance
            ],
            backgroundColor: [
                "#00a65a",
                "#dd4b39",
                "#3c8dbc",
                "#3c3dbc",
                "#5ea987",
                "#de6ddc",
                "#00665a",
                "#dd6b39",
                "#3c1dbc",
                "#3c3dbc",
                "#5e1987",
                "#defddc",
                "#3cadbc",
                "#5eb987",
                "#de8ddc"
            ],
            hoverBackgroundColor: [
                 "#00a65a",
                "#dd4b39",
                "#3c8dbc",
                "#3c3dbc",
                "#5ea987",
                "#de6ddc",
                "#00665a",
                "#dd6b39",
                "#3c1dbc",
                "#3c3dbc",
                "#5e1987",
                "#defddc",
                "#3cadbc",
                "#5eb987",
                "#de8ddc"
            ]
        }]
    f_draw_chart(labels, datasets);
}

function f_result_ttkh(config, para, lst) {
    try {
        var data = lst.data;

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
        $.each(data, function (i, val) {
            if (i == 0) {
                $.each(val.kq0, function (idx, item) {
                    var tr = "";
                    if (idx != val.kq0.length - 1 || val.kq0.length == 1) {
                        tr = "<tr>"
                       + "<td class='a_c'>" + (idx + 1) + "</td>"
                       + "<td>" + item.name + "</td>"
                       + "<td class='a_c' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c' ><a class='showdetail_1' style='color:#dd4b39' data-toggle='modal' href='#modal_chitiet_home' id='viewdetail_" + item.code + "'>" + item.loionlinenotdata + "</a></td>"
                       + "<td class='a_c' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class='td_tong'></td>"
                       + "<td class='a_c td_tong' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong' style='color:#dd4b39'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
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
                       + "<td class='a_c' ><a class='showdetail_2' style='color:#dd4b39' data-toggle='modal' href='#modal_chitiet_home' id='viewdetail_" + item.code + "'>" + item.loionlinenotdata + "</a></td>"
                       + "<td class='a_c' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class=' td_tong'></td>"
                       + "<td class='a_c td_tong' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong' style='color:#dd4b39'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
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
                       + "<td class='a_c' ><a class='showdetail_3' style='color:#dd4b39' data-toggle='modal' href='#modal_chitiet_home' id='viewdetail_" + item.code + "'>" + item.loionlinenotdata + "</a></td>"
                       + "<td class='a_c' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=2 class=' td_tong'></td>"
                       + "<td class='a_c td_tong' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong' style='color:#dd4b39'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong' style='color:#f39c12'>" + item.thanhly + "</td>"
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
                       + "<td class='a_c' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c' ><a class='showdetail_4' style='color:#dd4b39' data-toggle='modal' href='#modal_chitiet_home' id='viewdetail_" + item.code + "'>" + item.loionlinenotdata + "</a></td>"
                       + "<td class='a_c' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c'>" + item.tong + "</td>"
                       + "<td class='a_c'>" + item.tyle + "%</td>"
                       + "</tr>";
                    } else {
                        tr = "<tr>"
                       + "<td colspan=7 class=' td_tong'></td>"
                       + "<td class='a_c td_tong' style='color:#00a65a'>" + item.docthanhcong + "</td>"
                       + "<td class='a_c td_tong' style='color:#dd4b39'>" + item.loionlinenotdata + "</td>"
                       + "<td class='a_c td_tong' style='color:#f39c12'>" + item.thanhly + "</td>"
                       + "<td class='a_c td_tong'>" + item.tong + "</td>"
                       + "<td class='a_c td_tong'>" + item.tyle + "%</td>"
                       + "</tr>";
                    }
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