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
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị để xem dữ liệu");
            $("#tab_content").empty();
        }
        selectlang();
        initformelement();
        if (localStorage.getItem("dateT") == "") {
            $("#date_denngay").val(gettimenow());
        } else {
            $("#date_denngay").val(localStorage.getItem("dateT"));
        }
        $("#date_denngay").change(function () {
            localStorage.setItem("dateT", $("#date_denngay").val());
        });
        //loadContent();
        get_BCNgay();
        $("#btn_thuchien_bcvh").click(function () {
            get_BCNgay();
        })
    } catch (e) {
        //console.log(e.message);
    }
});

function get_BCNgay() {
    try {
        var denngay = localStorage.getItem("dateT");
        if (denngay == "") denngay = gettimenow();
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO.BAOCAONGAY_SOCTRANG", callback: "result_BCNGay" };
        var para = {
            v_Date: denngay
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        ////console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_BCNGay(config, para, lst) {
    try {
        var data = lst.data;
        ////console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#bcngay_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var countKhachhang = 0;
        var tempMeterId;
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            if (tempMeterId != val.tendiemdo) {
                tempMeterId = val.tendiemdo;
                countKhachhang++;
                tr += '<tr>' +
                    '<td colspan ="9" class="tsvh_tendiemdo">' + val.madiemdo + ' - ' + val.tendiemdo + '</td>' +
                    '<tr>' +
                        '<td class="a_c">' + val.rnum + '</td>' +
                        '<td class="text-bold">' + val.socongto + '</td>' +
                        '<td class=" a_c">' + val.loaicongto + '</td>' +
                        '<td class=" a_c">' + val.ngaytreo + '</td>' +
                        '<td class=" a_c">' + replace0_0(val.ngaythao) + '</td>' +
                        '<td class=" a_c">' + replace0_0(val.tu) + '</td>' +
                        '<td class=" a_c">' + replace0_0(val.ti) + '</td>' +
                        '<td class=" a_c">' + replace0_0(val.heso_nhan) + '</td>' +
                        '<td class=" a_c">' + val.isthao + '</td>' +
                    '</tr>';
            } else {
                tr += '<tr>' +
                        '<td class="a_c">' + val.stt + '</td>' +
                        '<td class="text-bold">' + val.name + '</td>' +
                        '<td class=" a_c">' + val.sodiemdocolandulieu + '</td>' +
                        '<td class=" a_c">' + val.sodiemdodalapdat + '</td>' +
                        '<td class=" a_c">' + val.tyle + ' %</td>' +
                    '</tr>';
            }
        });
        $("#bcngay_data tbody").empty();
        $("#bcngay_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");

        selectlang();
        stopLoad();

    } catch (e) {
        console.log(e);
    }
}
