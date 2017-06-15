$(document).ready(function () {
    showhideTree();
    try {
        initformelement();
        $("#dtTuNgay").val(localStorage.getItem("dateF"));
        if ($("#dtTuNgay").val() == "") $("#dtTuNgay").val(gettimenow());
        $("#dtDenNgay").val(localStorage.getItem("dateT"));
        if ($("#dtDenNgay").val() == "") $("#dtDenNgay").val(gettimenow());

        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto == "0" || istype == "1") {
                $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho điểm đo 1 pha và 3 pha 1 biểu, Sổ ghi hoặc Đơn vị");
                $("#bdpt_data").empty();
                $(".chart").empty();
                $(".tool-bar").empty();
                $("#btn_thuchien").attr("disabled", "disabled");
                return;
            } else {
                $("#btn_thuchien").removeAttr("disabled");
                $(".sct").hide();
            }
        }

        var s_socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto.split(';');
        $.each(s_socongto, function (i, val) {
            $('#cb_socongto').append('<option>' + val + '</option>');
        });


        $("#excel_bdpt").click(function () {
            excel();
        });
        get_BDPT_KH();
        styleTable();

        $("#btnLocdulieu").click(function () {
            get_BDPT_KH();
            styleTable();
        });
        //$(".content-wrapper").scroll(function () {
        //    f_FixHeader("bdpt_data", "bdpt_data_fix_header");
        //});

    } catch (e) {
        console.log(e);
    }


});
function get_BDPT_KH() {
    try {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.BieuDoPhuTai_KHACHHANG", callback: "draw_bdpt" };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_From: tungay,
            v_To: denngay
        };

        //////console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

function draw_bdpt(config, para, lst) {
    var data = lst.data;
    if (data.length == 0) {
        $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
        selectlang();
        stopLoad();
        return;
    }
    var data_bd = [];
    ////console.log(data);
    var tr = "";
    $.each(data, function (i, val) {
        tr += '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + val.timestart + '</td>' +
                    '<td>' + val.timeend + '</td>' +
                    '<td class="a_r">' + replace0_0(val.pgiao) + '</td>' +
                    '<td class="a_r">' + replace0_0(val.pnhan) + '</td>' +
                    '<td class="a_r">' + replace0_0(val.qgiao) + '</td>' +
                    '<td class="a_r">' + replace0_0(val.qnhan) + '</td>' +
                '</tr>';
        data_bd.push(val.pgiao);
    });

    $("#bdpt_data tbody").empty();
    $("#bdpt_data tbody").append(tr);
    $(".sobanghi").html("<span tkey='co'></span>" + data.length + "<span tkey='banghi'></span>");
    selectlang();

    var barChartData = {
        labels: ["0:00", "0:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30",
                 "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30",
                 "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                 "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
                 "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
        datasets: [
          {
              label: "P Giao tổng (KW)",
              //backgroundColor: ["#8BC34A", "#FF9800", "#F44336"],
              backgroundColor: [
                '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#FF9800', '#FF9800',
                '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#F44336',
                '#F44336', '#F44336', '#F44336', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800',
                '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#F44336', '#F44336', '#F44336', '#F44336', '#F44336', '#F44336',
                '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A'
              ],
              borderColor: [
                '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A', '#FF9800', '#FF9800',
                '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#F44336',
                '#F44336', '#F44336', '#F44336', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#FF9800',
                '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#F44336', '#F44336', '#F44336', '#F44336', '#F44336', '#F44336',
                '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A'
              ],
              borderWidth: 1,
              data: data_bd
          }
        ]
    };

    var ctx = $("#barChart_bdpt").get(0).getContext("2d");
    ctx.canvas.height = 300;
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            elements: {
                rectangle: {
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    barPercentage: 0.85
                }],
                yAxes: [{
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                }]
            },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: 'Biểu đồ phụ tải 30 phút'
            }
        }
    });

    stopLoad();
};
function styleTable() {
    var thapdiem = [0, 1, 2, 3, 4, 5, 6, 7, 44, 45, 46, 47]
    var binhthuong = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 40, 41, 42, 43]
    var caodiem = [19, 20, 21, 22, 34, 35, 36, 37, 38, 39]
    var i = 0;
    $('#bdpt_data > tbody  > tr').each(function () {
        if (jQuery.inArray(i, thapdiem) != -1) {
            $(this).addClass("thapdiem");
            i++;
        }
        else if (jQuery.inArray(i, binhthuong) != -1) {
            $(this).addClass("binhthuong");
            i++;
        }
        else {
            $(this).addClass("caodiem");
            i++;
        };
    });
}
function set_fixheader() {
    $(".scroll_header").css("width", $("#bdpt_data").width() + 3);
    $("#fix_header thead tr th.th_stt").css("width", $("#bdpt_data thead tr th.th_stt").width() + 16);
    $("#fix_header thead tr th.th_tdbd").css("width", $("#bdpt_data thead tr th.th_tdbd").width() + 16);
    $("#fix_header thead tr th.th_tdkt").css("width", $("#bdpt_data thead tr th.th_tdkt").width() + 16);
    $("#fix_header thead tr th.th_pg").css("width", $("#bdpt_data thead tr th.th_pg").width() + 16);
    $("#fix_header thead tr th.th_pn").css("width", $("#bdpt_data thead tr th.th_pn").width() + 16);
    $("#fix_header thead tr th.th_qg").css("width", $("#bdpt_data thead tr th.th_qg").width() + 16);
    $("#fix_header thead tr th.th_qn").css("width", $("#bdpt_data thead tr th.th_qn").width() + 16);
    $(".scroll_header").slideDown();
}
function remove_fixheader() {
    $(".scroll_header").slideUp();
}

function excel() {

    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
    var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
    var tungay = localStorage.getItem("dateF");
    var denngay = localStorage.getItem("dateT");
    if (tungay == "") tungay = gettimenow();
    if (denngay == "") denngay = gettimenow();
    var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
    var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'BĐPT_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.BieuDoPhuTai_KHACHHANG", namefile: namef_l };
    var para = {
        v_MeterId: meterid,
        v_Socongto: sct,
        v_From: tungay,
        v_To: denngay
    };
    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "timestart", name: "Thời điểm bắt đầu", type: "TextAndBoldCenter" },
        { field: "timeend", name: "Thời điểm kết thúc", type: "TextAndBoldCenter" },
        { field: "pgiao", name: "P Giao (KWh)", type: "TextAndBoldCenter" },
        { field: "pnhan", name: "P Nhận (KWh)", type: "Text" },
        { field: "qtonggiao", name: "Q Giao (KVARh)", type: "Text" },
        { field: "qtongnhan", name: "Q Nhận (KVARh)", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}
