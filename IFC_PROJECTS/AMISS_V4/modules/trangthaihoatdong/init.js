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
        get_TTHD(0);
        selectlang();
        //console.log($("#tendiemdo_span").text());
        $("#btn_thuchien_bcvh").click(function () {
            get_TTHD(0);
        })
        $("#excel_baocaotrangthai").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
    }
});

function get_TTHD(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var v_isData = $("#cb_loaidulieu option:selected").val();
        var v_getTypeData = $("#cb_loctheo option:selected").val();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO_NPC.BAOCAOTRANGTHAISUKIEN", callback: "result_TTHD" };
        var para = {
            v_type: 1,//-- 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
            v_value: code,
            v_datefrom: tungay, //--yyyy/MM/dd
            v_dateto: denngay,//--yyyy/MM/dd
            v_userid: 1,
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        //console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_TTHD(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#tthd_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var countKhachhang = 0;
        var tempMKH;
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            if (tempMKH != val.makhachhang) {
                tempMKH = val.makhachhang;
                tr += '<tr>' +
                    '<td class="a_c">' + (i + 1) + '</td>' +
                    '<td class="text-bold">' + val.madiemdo + '</td>' +
                    '<td class=" a_c">' + val.tendiemdo + '</td>' +
                    '<td class=" a_c">' + val.socongto + '</td>';
                if (val.trang_thai == "OFFLINE")
                    tr += '<td class="mkn a_c">' + val.trang_thai + '</td>';
                else
                    tr += '<td class="kn a_c">' + val.trang_thai + '</td>';
                if (val.issync == "Không có dữ liệu")
                    tr += '<td class="mkn a_c">' + val.issync + '</td>';
                else
                    tr += '<td class="kn a_c">' + val.issync + '</td>';
                if (val.iswarning == "Không có cảnh báo")
                    tr += '<td class="kn a_c">' + val.iswarning + '</td>';
                else
                    tr += '<td class="mkn a_c">' + val.iswarning + '</td>';
                if (val.status == "Không có sự kiện")
                    tr += '<td class="kn a_c">' + val.status + '</td>';
                else
                    tr += '<td class="mkn a_c">' + val.status + '</td>';
                tr += '</tr>';
            }
            else {
                tr += '<tr>' +
                    '<td class="a_c"></td>' +
                    '<td class="text-bold"></td>' +
                    '<td class=" a_c"></td>' +
                    '<td class=" a_c"></td>'+
                    '<td class=" a_c"></td>'+
                    '<td class=" a_c"></td>'+
                    '<td class=" a_c">' + replace0_0(val.iswarning) + '</td>' +
                    '<td class=" a_c">' + replace0_0(val.status) + '</td>';
                tr += '</tr>';
            }
            
        });
        $("#tthd_data tbody").empty();
        $("#tthd_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");

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
    var v_isData = $("#cb_loaidulieu option:selected").val();
    var v_getTypeData = $("#cb_loctheo option:selected").val();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'BaoCaoTTHoatDong_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO_NPC.BAOCAOTRANGTHAISUKIEN", namefile: namef_l };
    var para = {
        v_type: 1,//-- 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
        v_value: code,
        v_datefrom: tungay, //--yyyy/MM/dd
        v_dateto: denngay,//--yyyy/MM/dd
        v_userid: 1,
    };
    var colum = {
        kq: [
        { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "trang_thai", name: "Tình trạng", type: "Text" },
        { field: "issync", name: "Trạng thái dữ liệu", type: "Text" },
        { field: "iswarning", name: "Cảnh báo vận hành", type: "Text" },
        { field: "status", name: "Sự kiện công tơ", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}