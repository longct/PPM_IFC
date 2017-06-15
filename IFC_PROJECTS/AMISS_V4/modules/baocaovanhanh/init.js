$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            selectlang();
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0") {
                $("#tendiemdo_span").html("Vui lòng chọn Sổ ghi hoặc đơn vị để xem dữ liệu");
                return;
            }
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            $("#btn_thuchien").removeAttr("disabled");
        }
        else {
            selectlang();
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }
        selectlang();
        initformelement();
        if (localStorage.getItem("dateF") == "" && localStorage.getItem("dateT") == "") {
            $("#date_tungay").val(gettimenow());
            //$(".datepicker").val(gettimenow());
            $("#date_denngay").val(gettimenow());
        } else {
            $("#date_tungay").val(localStorage.getItem("dateF"));
            $("#date_denngay").val(localStorage.getItem("dateT"));
        }
        $("#date_tungay").change(function () {
            localStorage.setItem("dateF", $("#date_tungay").val());
        });
        $("#date_denngay").change(function () {
            localStorage.setItem("dateT", $("#date_denngay").val());
        });
        //loadContent();
        get_BCVH();
        $("#btn_thuchien_bcvh").click(function () {
            get_BCVH();
        })
        $("#excel_bcvh").click(function () {
            excel();
        })
    } catch (e) {
        //console.log(e.message);
    }
});

function get_BCVH() {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var v_getTypeData = $("#cb_loaidulieu option:selected").val();
        var v_isData = $("#cb_loctheo option:selected").val();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO.LayDulieuBaoCaoVanHanh", callback: "result_BCVH" };
        var para = {
            v_comport: "",
            v_codeDl: code,
            v_isData: v_isData,// -- ÐI?M ÐO CÓ D? LI?U V? =1 , không có d? li?u v? =0
            v_getTypeData: v_getTypeData,// -- THÔNG S? V?N HÀNH =0 HAY LOAD PROFILE =1
            v_countDownbound: "1",
            v_countUpbound: "1000",
            v_dateFromValue: tungay,
            v_dateToValue: denngay,
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        //console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_BCVH(config, para, lst) {
    try {
        var data0 = lst.data[0];
        var data1 = lst.data[1];
        //console.log(lst);
        if (data0.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#tbl_tsvh_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tr1 = "";
        $.each(data0.kq0, function (i, val) {
            tsbanghi = val.rowscount;
            //sct = val.socongto;
            //if (sct != val.socongto) {
            opt = '<option value="' + val.socongto + '">' + val.socongto + '</option>';
            //}
            tr += '<tr>' +
                    '<td class="a_c">' + val.stt + '</td>' +
                    '<td class="text-bold">' + val.name + '</td>' +
                    '<td class=" a_c">' + val.sodiemdocolandulieu + '</td>' +
                    '<td class=" a_c">' + val.sodiemdodalapdat + '</td>' +
                    '<td class=" a_c">' + val.tyle + ' %</td>' +
                '</tr>';
        });
        $("#tbl_top1 tbody").empty();
        $("#tbl_top1 tbody").append(tr);
        $(".sobanghi_top1").html("<span tkey='hienthi'></span>" + data0.kq0.length + "<span tkey='banghi'></span>");

        var donvi = "";
        $.each(data1.kq1, function (i, val) {
            if (val.dienluc != donvi) {
                donvi = val.dienluc;
                tr1 += '<tr>' +
                            '<td colspan = "6" class="tsvh_tendiemdo text-bold">' + val.dienluc
                '</td>' +
           '</tr>';
                tr1 += '<tr>' +
                        '<td class="a_c">' + val.stt + '</td>' +
                        '<td class="text-bold">' + val.ifcmadiemdo + '</td>' +
                        '<td class=" ">' + val.madiemdo + '</td>' +
                        '<td class=" ">' + val.tendiemdo + '</td>' +
                        '<td class=" ">' + val.imei + '</td>' +
                        '<td class=" ">' + val.socongto + '</td>' +
                        //'<td class=" a_c">' + val.countdata + '</td>' +
                    '</tr>';
            } else {
                tr1 += '<tr>' +
                        '<td class="a_c">' + val.stt + '</td>' +
                        '<td class="text-bold">' + val.ifcmadiemdo + '</td>' +
                        '<td class=" ">' + val.madiemdo + '</td>' +
                        '<td class=" ">' + val.tendiemdo + '</td>' +
                        '<td class=" ">' + val.imei + '</td>' +
                        '<td class=" ">' + val.socongto + '</td>' +
                        //'<td class=" a_c">' + val.countdata + '</td>' +
                    '</tr>';
            }
        });
        $("#tbl_top2 tbody").empty();
        $("#tbl_top2 tbody").append(tr1);
        $(".sobanghi_top2").html("<span tkey='hienthi'></span>" + data1.kq1.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();

    } catch (e) {
        console.log(e);
    }
}
function excel() {

    var tungay = localStorage.getItem("dateF");
    var denngay = localStorage.getItem("dateT");
    if (tungay == "") tungay = gettimenow();
    if (denngay == "") denngay = gettimenow();
    var v_isData =  $("#cb_loctheo option:selected").val();
    var v_getTypeData = $("#cb_loaidulieu option:selected").val();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var t_data; var t_type;
    if (v_isData == 0) t_data = "KhongCoDuLieu";
    else t_data = "CoDuLieu";

    if (v_getTypeData == 0) t_type = "ThongSoVanHanh";
    else t_type = "LoadProfile";
    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'BaoCaoVanHanh_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-") + "_" + t_data + "_" + t_type;
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO.LayDulieuBaoCaoVanHanh", namefile: namef_l ,exporttable:1};
    var para = {
        v_comport: "",
        v_codeDl: code,
        v_isData: v_isData,// -- ÐI?M ÐO CÓ D? LI?U V? =1 , không có d? li?u v? =0
        v_getTypeData: v_getTypeData,// -- THÔNG S? V?N HÀNH =0 HAY LOAD PROFILE =1
        v_countDownbound: "1",
        v_countUpbound: "1000",
        v_dateFromValue: tungay,
        v_dateToValue: denngay,
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
        { field: "ifcmadiemdo", name: "Mã IFC", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã Điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên Khách hàng", type: "Text" },
        { field: "imei", name: "IMEI", type: "Text" },
        { field: "socongto", name: "Số công tơ", type: "Text" },
        { field: "countdata", name: "Số lần đọc", type: "Text" },
        { field: "dienluc", name: "Chi nhánh Điện lực", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}