$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            selectlang();
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0") {
                $("#tendiemdo_span").html(tendiemdo);
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
        if (socongto == "0") get_LSTT(0);
        else get_LSTT_KH();
        $("#btn_thuchien_bcvh").click(function () {
            if (socongto == "0") get_LSTT(0);
            else get_LSTT_KH();
        })
        $("#excel_lstreothao").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
    }
});

function get_LSTT(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.LichSuTreoThao", callback: "result_LSTT" };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1,
            v_TypeValue: 2,//-- 2: Code di?n l?c, 1 là MeterId ma diem do
            v_HeThong: 0,
            v_Socongto: "",
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: page,
            v_numrecs: 0,
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        //console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_LSTT(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#lstt_data tbody").empty();
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
            }
        });
        $("#lstt_data tbody").empty();
        $("#lstt_data tbody").append(tr);
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
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef = 'BaoCaoTreoThao_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-");
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.LichSuTreoThao", namefile: namef };
    var para = {
        v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
        v_Value: code,
        v_From: "",
        v_To: "",
        v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
        v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
        v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
        v_TrangThai: 0,
        v_ChuKiChot: 0,
        v_UserId: 1,
        v_Permission: 1,
        v_TypeValue: 2,//-- 2: Code di?n l?c, 1 là MeterId ma diem do
        v_HeThong: 0,
        v_Socongto: "",
        v_dFrom: tungay,
        v_dTo: denngay,
        v_pagenum: 0,
        v_numrecs: 0,
    };
    var colum = {
        kq: [
        { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã Điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "loaicongto", name: "Loại công tơ", type: "Text" },
        { field: "ngaytreo", name: "Ngày treo", type: "Text" },
        { field: "ngaythao", name: "Ngày thao", type: "Text" },
        { field: "heso_tu", name: "TU", type: "Text" },
        { field: "heso_ti", name: "TI", type: "Text" },
        { field: "heso_nhan", name: "Hệ số nhân", type: "Text" },
        { field: "isthao", name: "Trạng thái treo", type: "Text" }
        ]
    };
    //console.log(para);
    ExecuteExportExcelOracle(config, para, colum);
}

function get_LSTT_KH() {
    try {
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var meter_id = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.LICHSUTREOTHAOKH_PAGE", callback: "result_LSTT_KH" };
        var para = {
            v_Id: meter_id,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: 0,
            v_numrecs: 20
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        //console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_LSTT_KH(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#lstt_data tbody").empty();
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
                        '<td class=" a_c">' + replace0_0(val.heso_tu) + '</td>' +
                        '<td class=" a_c">' + replace0_0(val.heso_ti) + '</td>' +
                        '<td class=" a_c">' + replace0_0(val.heso_nhan) + '</td>' +
                        '<td class=" a_c">' + val.isthao + '</td>' +
                    '</tr>';
            } else {
                tr += '<tr>' +
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
            }
        });
        $("#lstt_data tbody").empty();
        $("#lstt_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");

        selectlang();
        stopLoad();

    } catch (e) {
        console.log(e);
    }
}
