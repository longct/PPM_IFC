var coudtpage = 10000;
var manggiatri;
$(document).ready(function () {
    try {
        $('#bieudo_vanhanh').on('shown.bs.modal', function () {
            loadfrom_tsvh();
        })
   
        $("#txt_ngayfrom_btds").val(gettimenow());
        $("#txt_ngayto_btds").val(gettimenow());
        //loadlsttu();

        $("#btn_checkluu_btds").click(function () {
            var tu = JSON.parse(localStorage.getItem("quan"));
            if (tu == "[]" || tu == undefined || tu == null || tu.length == 0) {
                loadthongbtd_tu(1);
            } else {
                alert(123);
                return;
            }
        });
        $("#btn_execl_btds").click(function () {
            bieudothongsoexeck();
        });

        


    } catch (e) {
        console.log(e);
    }

});

function loadfrom_tsvh() {
    try {
        var tu = JSON.parse(localStorage.getItem("quan"));
        console.log(tu);
        if (tu == "[]" || tu == undefined || tu == null || tu.length == 0) {
            $("#higchart_bcbieudotsvh").show();
            messInfo("messinfo_tbdhds", "", "error");
            loadthongbtd_tu(1);
          
        } else {
            $("#higchart_bcbieudotsvh").hide();
            $("#txt_thong_tbpt").text("");
            messInfo("messinfo_tbdhds", "Vui lòng chọn tủ", "error");
            return;

        }

    } catch (e) {
        console.log(e);
    }
}

// một tủ
function loadthongbtd_tu(page) {
    try {
      
        $("#txt_thongtintu").empty();
        var tuthong = JSON.parse(localStorage.getItem("tu_ar"));
        $("#txt_thong_tbpt").text(tuthong[0].text);
        var tu = JSON.parse(localStorage.getItem("tuSelected"));
        var p = getAllIdMod();
        var config = { namesql: "THONGTSVH.THONGSOVANHANH", callback: "f_result_loadthongbtd_tu", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_CODE: tu[0],
            v_TUNGAY: p.txt_ngayfrom_btds,
            v_DENNGAY: p.txt_ngayto_btds,
            v_TYPE: '2',
            v_pagenum: page,
            v_numrecs: coudtpage,
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongbtd_tu(config, para, lst) {
    try {
        var data = lst.data;
        
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_tbdhds", "Không có dữ liệu hiển thị", "error");
            $("#higchart_bcbieudotsvh").hide();
            clearnull_btd();
            return;
        }
        $("#higchart_bcbieudotsvh").show();
        messInfo("messinfo_tbdhds", "", "ok");
        hienthi_bdtsvh_tu(data);
        draw_bdtsvh(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthi_bdtsvh_tu(data) {
    try {

        $("#table_bieungays").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class=='tc'>"
                + val.stt + "</td><td class='tr'>"
                + setnull(val.socongto) + "</td><td  class='tr'>"
                + setnull(val.pgiaotong) + "</td><td  class='tc'>"
                + setnull(val.timemeter) + "</td><td class='ca'>"
                + setnull(val.ua) + "</td><td class='cb'>"
                + setnull(val.ub) + "</td><td class='cc'>"
                + setnull(val.uc) + "</td><td class='ca'>"
                + setnull(val.ia) + "</td><td class='cb'>"
                + setnull(val.ib) + "</td><td class='cc'>"
                + setnull(val.ic) + "</td><td class='ca'>"
                + setnull(val.cosa) + "</td><td class='cb'>"
                + setnull(val.cosb) + "</td><td class='cc'>"
                + setnull(val.cosc) + "</td></tr>";
            $("#table_bieungays").append(row);
        });

        LoadPhanTrang("pageLst_btdvh", "pageCurent_btdvh", data, function () {
            var p = getAllIdMod();
            loadthongbtd_tu($("#pagenumber").val());
        });
        
     
    } catch (e) {
        console.log(e);
    }
}

function draw_bdtsvh(data) {
    try{
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
        var name = ["PA"];
        var donvi = "(KwH)";

        var tr = "";
        $.each(data, function (i, val) {
       
            data_bda.push(parseFloat(val.pgiaotong));

            ua.push(parseFloat(val.ua));
            ub.push(parseFloat(val.ub));
            uc.push(parseFloat(val.uc));

            ia.push(parseFloat(val.ia));
            ib.push(parseFloat(val.ib));
            ic.push(parseFloat(val.ic));

            cosa.push(parseFloat(val.cosa));
            cosb.push(parseFloat(val.cosb));
            cosc.push(parseFloat(val.cosc));
            cate.push(val.timemeter);
        });
 
        drawa_(cate, data_bda, data_bdb, data_bdc, name, donvi);
       
            if ($('#r_p').is(':checked')) {
                name = ["P"];
                donvi = "(KwH)";
                drawa_(cate, data_bda, data_bdb, data_bdc, name, donvi);
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

            $("input[name$='bdtsvh_r']").click(function () {
                if ($('#r_p').is(':checked')) {
                    name = ["P"];
                    donvi = "(KwH)";
                    drawa_(cate, data_bda, data_bdb, data_bdc, name, donvi);
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
            });
     
    } catch (e) {
        console.log(e);
    }
}
function draw_(cate, a, b, c, name, donvi) {
    $('#higchart_bcbieudotsvh').highcharts({
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
                text: 'Đơn vị ' + donvi
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

function drawa_(cate, a, b, c, name, donvi) {
    $('#higchart_bcbieudotsvh').highcharts({
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
                text: 'Đơn vị ' + donvi
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
        }]
    });
}

function clearnull_btd() {
    try {
        $("#table_bieungays").empty();
        $("#pageCurent_btdvh").empty();
        $("#pageLst_btdvh").empty();

    } catch (e) {
        console.log(e);
    }
}


function bieudothongsoexeck() {
    var tu = JSON.parse(localStorage.getItem("tuSelected"));
    var p = getAllIdMod();
    var namef_l = 'BĐTSVH_' + p.txt_ngayfrom_btds.replace("/", "-") + "_" + p.txt_ngayto_btds.replace("/", "-");
    var config = { connstr: "ConnectOracleStreetLight", namesql: "THONGTSVH.THONGSOVANHANH", namefile: namef_l };
    var para = {
        v_CODE: tu[0],
        v_TUNGAY: p.txt_ngayfrom_btds,
        v_DENNGAY: p.txt_ngayto_btds,
        v_TYPE: '2',
        v_pagenum: '1',
        v_numrecs: '10000000',
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "tenkhachhang", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "timemeter", name: "Thời gian", type: "TextAndBoldCenter" },
            { field: "ua", name: "UA(V)", type: "Text" },
            { field: "ub", name: "UB(V)", type: "Text" },
            { field: "uc", name: "UC(V)", type: "Text" },
            { field: "ia", name: "IA(A)", type: "Text" },
            { field: "ib", name: "IB(A)", type: "Text" },
            { field: "ic", name: "IC(A)", type: "Text" },
            { field: "cosa", name: "cosA", type: "Text" },
            { field: "cosb", name: "cosB", type: "Text" },
            { field: "cosc", name: "cosC", type: "Text" }, 
            { field: "pgiaotong", name: "P(Kwh)", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}



