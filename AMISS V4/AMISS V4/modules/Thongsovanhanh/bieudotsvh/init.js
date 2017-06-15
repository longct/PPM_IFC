﻿$(document).ready(function () {
    showhideTree();
    
    try {
        initformelement();
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto == "0") {
                $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho Sổ ghi hoặc Đơn vị");
                $("#bdtsvh_data").empty();
                $(".chart").empty();
                $("#toolbar").empty();
                $("#rad_").empty();
                $("#btn_thuchien").attr("disabled", "disabled");
                return;
            } else {
                $("#btn_thuchien").removeAttr("disabled");
                $(".sct").hide();
            }

        }
        $("#dtTuNgay").val(localStorage.getItem("dateF"));
        if ($("#dtTuNgay").val() == "") $("#dtTuNgay").val(gettimenow());
        $("#dtDenNgay").val(localStorage.getItem("dateT"));
        if ($("#dtDenNgay").val() == "") $("#dtDenNgay").val(gettimenow());

        get_BDTSVH_KH();
        $("#excel_tsvh").click(function () {
            excel();
        });

        $("#btnLocdulieu").click(function () {
            get_BDTSVH_KH();
        });

        var s_socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto.split(';');
        $.each(s_socongto, function (i, val) {
            $('#cb_socongto').append('<option>' + val + '</option>');
        });
        //$(".content-wrapper").scroll(function () {
        //    f_FixHeader("bdtsvh_data", "bdtsvh_data_fixheader");
        //});
    } catch (e) {
        console.log(e);
    }


});

function get_BDTSVH_KH() {
    try {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        ////console.log(gettimenow());
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THONGSOVANHANH.BieuDoTSVH_KHACHHANG",
            callback: "draw_bdtsvh"
        };
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
    }
}

var temp_name = [];
var temp_donvi = [];

function draw_bdtsvh(config, para, lst) {
    var data = lst.data;
    if (data.length == 0) {
        $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
        $("#bdtsvh_data tbody").empty();
        draw_([], [], [], [], temp_name, temp_donvi);
        selectlang();
        stopLoad();
        return;
    }
    ////console.log(data);
    var data_bda = [];
    var data_bdb = [];
    var data_bdc = [];
    var cate = [];
    var ua = [];
    var ub = [];
    var uc = [];
    var ia = [];
    var ib = [];
    var ic = [];
    var cosa = [];
    var cosb = [];
    var cosc = [];
    var qa = [];
    var qb = [];
    var qc = [];
    //var name = ["PA", "PB", "PC"];
    //var donvi = "(KwH)";
    var name = ["UA", "UB", "UC"];
    var donvi = "(V)";

    var tr = "";
    $.each(data, function (i, val) {
        tr += '<tr>' +
                    '<td class="td_stt" rowspan="3">' + (i + 1) + '</td>' +
                    '<td class=""></td>' +
                    '<td class="td_phaa a_c">A</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.ua) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.ia) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.cosa) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.pa) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.qa) + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phab">CT: ' + replace0_0(val.time) + '</td>' +
                    '<td class="td_phab a_c">B</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.ub) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.ib) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.cosb) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.pb) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.qb) + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phac">' +
                    '<td class="td_phac a_c">C</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.uc) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.ic) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.cosc) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.pc) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.qc) + '</td>' +
                '</tr>';
        data_bda.push(parseFloat(val.pa));
        data_bdb.push(parseFloat(val.pb));
        data_bdc.push(parseFloat(val.pc));

        ua.push(parseFloat(val.ua));
        ub.push(parseFloat(val.ub));
        uc.push(parseFloat(val.uc));

        ia.push(parseFloat(val.ia));
        ib.push(parseFloat(val.ib));
        ic.push(parseFloat(val.ic));

        cosa.push(parseFloat(val.cosa));
        cosb.push(parseFloat(val.cosb));
        cosc.push(parseFloat(val.cosc));

        qa.push(parseFloat(val.qa));
        qb.push(parseFloat(val.qb));
        qc.push(parseFloat(val.qc));
        cate.push(val.time);
    });
    $("#bdtsvh_data tbody").empty();
    $("#bdtsvh_data tbody").append(tr);
    $(".sobanghi").html("<span tkey='co'></span>" + data.length + "<span tkey='banghi'></span>");
    selectlang();
    stopLoad();
    //draw_(cate, data_bda, data_bdb, data_bdc, name, donvi);
    draw_(cate, ua, ub, uc, name, donvi);
    $("input[name$='bdtsvh_r']").click(function () {
        if ($('.td_stt').length == 0) {
            data_bda = [];
            data_bdb = [];
            data_bdc = [];
            cate = [];
            ua = [];
            ub = [];
            uc = [];
            ia = [];
            ib = [];
            ic = [];
            cosa = [];
            cosb = [];
            cosc = [];
            qa = [];
            qb = [];
            qc = [];
        }
        if ($('#r_p').is(':checked')) {
            name = ["PA", "PB", "PC"];
            donvi = "(KwH)";
            draw_(cate, data_bda, data_bdb, data_bdc, name, donvi);
        }
        else if ($('#r_u').is(':checked')) {
            name = ["UA", "UB", "UC"];
            donvi = "(V)";
            draw_(cate, ua, ub, uc, name, donvi);
        }
        else if ($('#r_i').is(':checked')) {
            name = ["IA", "IB", "IC"];
            donvi = "(A)";
            draw_(cate, ia, ib, ic, name, donvi);
        }
        else if ($('#r_cos').is(':checked')) {
            name = ["Cos A", "Cos B", "Cos C"];
            donvi = " ";
            draw_(cate, cosa, cosb, cosc, name, donvi);
        }
        else if ($('#r_q').is(':checked')) {
            name = ["QA", "QB", "QC"];
            donvi = " ";
            draw_(cate, qa, qb, qc, name, donvi);
        }
        temp_name = name;
        temp_donvi = donvi;
    });

}
function draw_(cate, a, b, c, name, donvi) {
    $('#linechar_tsvh').highcharts({
        title: {
            text: 'Biểu đồ thông số vận hành',
            x: -20 //center
        },
        credits: {
            enabled: false,
            text: "Infras.com.vn"
        },
        xAxis: {
            categories: cate
        },
        yAxis: {
            title: {
                text: 'Đơn vị '+donvi
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: donvi
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: name[0],
            color: '#FFC107',
            data: a
        }, {
            name: name[1],
            color: '#00a65a',
            data: b
        }, {
            name: name[2],
            color: '#F44336',
            data: c
        }]
    });
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
    var namef_l = 'BĐTSVH_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-") +"_"+ denngay.replace("/", "-");
    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.BieuDoTSVH_KHACHHANG", namefile: namef_l };
    var para = {
        v_MeterId: meterid,
        v_Socongto: sct,
        v_From: tungay,
        v_To: denngay
    };
    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "time", name: "Thời gian", type: "TextAndBoldCenter" },
        { field: "ua", name: "UA(V)", type: "Text" },
        { field: "ub", name: "UB(V)", type: "Text" },
        { field: "uc", name: "UC(V)", type: "Text" },
        { field: "ia", name: "IA(A)", type: "Text" },
        { field: "ib", name: "IB(A)", type: "Text" },
        { field: "ic", name: "IC(A)", type: "Text" },
        { field: "cosa", name: "cosA", type: "Text" },
        { field: "cosb", name: "cosB", type: "Text" },
        { field: "cosc", name: "cosC", type: "Text" },
        { field: "pa", name: "PA (KW)", type: "Text" },
        { field: "pb", name: "PB (KW)", type: "Text" },
        { field: "pc", name: "PC (KW)", type: "Text" },
        { field: "qa", name: "QA (KVARh)", type: "Text" },
        { field: "qb", name: "QB (KVARh)", type: "Text" },
        { field: "qc", name: "QC(KVARh)", type: "Text" },
        { field: "pgiaotong", name: "Chỉ số điện năng (KW)", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}