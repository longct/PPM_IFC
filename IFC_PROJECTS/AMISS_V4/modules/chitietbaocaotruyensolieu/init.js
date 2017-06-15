$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
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
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }
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
        get_BCTSL_CT();
        selectlang();
        $("#excel_bcdata").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
    }
});

function get_BCTSL_CT() {
    try {
        var tungay = localStorage.getItem("dateF");
        if (tungay == "") tungay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_TRUYEN_DULIEU.truyen_du_lieu_dcu_detail", callback: "result_BCTSL_CT" };
        var para = {
            v_Value: code,
            v_Date: tungay,
            v_pagenum: 0,
            v_numrecs: 10000
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        ////console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_BCTSL_CT(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#tbl_tsvh_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tr1 = "";
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            tr += '<tr>' +
                    '<td class="a_c">' + (i+1) + '</td>' +
                    '<td class="text-bold">' + val.dcu + '</td>' +
                    '<td class=" " style="max-width: 280px; width:280px;word-wrap:break-word" title="' + val.file_name + '">' + val.file_name + '</td>' +
                    '<td class=" a_c">' + val.date_meter + '</td>' +
                    '<td class=" a_c">' + val.date_dcu + ' </td>' +
                    '<td class=" a_c">' + val.import_date + '</td>' +
                    '<td class=" a_c">' + val.file_size + '</td>' +
                    '<td class=" a_c">' + val.status + ' </td>' +
                    '<td class=" a_c">' + val.dcu_meter + '</td>' +
                    '<td class=" a_c">' + val.dcu_sys + ' </td>' +
                '</tr>';
        });
        $("#tbl_baocaotruyensl_ct tbody").empty();
        $("#tbl_baocaotruyensl_ct tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();


    } catch (e) {
        console.log(e);
    }
}

function excel() {

    var tungay = localStorage.getItem("dateF");
    if (tungay == "") tungay = gettimenow();
    var v_isData = $("#cb_loaidulieu option:selected").val();
    var v_getTypeData = $("#cb_loctheo option:selected").val();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'BaoCaoTSL_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-") ;
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_TRUYEN_DULIEU.truyen_du_lieu_dcu_detail", namefile: namef_l };
    var para = {
        v_Value: code,
        v_Date: tungay,
        v_pagenum: 0,
        v_numrecs: 10000
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
        { field: "dcu", name: "DCU", type: "TextAndBoldCenter" },
        { field: "file_name", name: "Tên file", type: "TextAndBoldCenter" },
        { field: "date_meter", name: "Thời điểm công tơ", type: "Text" },
        { field: "date_dcu", name: "Thời điểm DCU", type: "Text" },
        { field: "import_date", name: "Thời điểm tới server", type: "Text" },
        { field: "file_size", name: "Lưu lượng", type: "Text" },
        { field: "status", name: "Trạng thái", type: "Text" },
        { field: "dcu_meter", name: "Công tơ - DCU (s)", type: "Text" },
        { field: "dcu_sys", name: "DCU - system (s)", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}