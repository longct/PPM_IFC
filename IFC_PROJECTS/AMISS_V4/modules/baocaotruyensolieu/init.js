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
        get_BCTSL();
        selectlang();
    } catch (e) {
        //console.log(e.message);
    }
});

function get_BCTSL() {
    try {
        var tungay = localStorage.getItem("dateF");
        if (tungay == "") tungay = gettimenow();
        var v_isData = $("#cb_loaidulieu option:selected").val();
        var v_getTypeData = $("#cb_loctheo option:selected").val();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_TRUYEN_DULIEU.truyen_du_lieu_dcu2", callback: "result_BCTSL" };
        var para = {
            v_Type: 2,
            v_Value: code,
            v_Date: tungay,
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        ////console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_BCTSL(config, para, lst) {
    try {
        var data = lst.data;
        ////console.log(data);
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
            //sct = val.socongto;
            //if (sct != val.socongto) {
            //}
            tr += '<tr>' +
                    '<td class="a_c">' + val.stt + '</td>' +
                    '<td class="text-bold">' + val.name + '</td>' +
                    '<td class=" a_c">' + val.tongsolantruyen + '</td>' +
                    '<td class=" a_c">' + val.solanthanhcong + '</td>' +
                    '<td class=" a_c">' + val.solanthatbai + ' </td>' +
                    '<td class=" a_c">' + val.tongdungluong + '</td>' +
                    '<td class=" a_c">' + replace0_0(val.tile_tc) + '</td>' +
                    '<td class=" a_c">' + replace0_0(val.tile_tb) + ' </td>' +
                '</tr>';
        });
        $("#tbl_baocaotruyensl tbody").empty();
        $("#tbl_baocaotruyensl tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();


    } catch (e) {
        console.log(e);
    }
}
