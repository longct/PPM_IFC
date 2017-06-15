var tungay = localStorage.getItem("dateF");
var denngay = localStorage.getItem("dateT");
if (tungay == "") { tungay = gettimenow(); $("#date_tungay_cbsk").val(tungay); }
else { $("#date_tungay_cbsk").val(tungay); }
if (denngay == "") { denngay = gettimenow(); $("#date_denngay_cbsk").val(denngay); }
else { $("#date_denngay_cbsk").val(tungay); }

$(document).ready(function () {
    showhideTree();
    try {
        initformelement();

        if (localStorage.getItem("para")) {
            var para = localStorage.getItem("para");
            getPara(para);
            get_ChitietSK();
        } else {
        }
        $("#btn_thuchien_cbsk").click(function () {
            get_ChitietSK();
        })
        $("#excel_cbsk").click(function () {
            excel();
        })
        
    } catch (e) {
        console.log(e.message);
    }
});
function getPara(p) {
    try {
        if ($("#cb_sk_loaicb option[value='" + p + "']").val() === undefined) {
            $("#cb_sk_loaicb").val("-1").change();
        } else {
            $("#cb_sk_loaicb").val(p).change();
        }
    } catch (e) {
    }
}
function get_ChitietSK() {
    try {
        //console.log("OK");
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var loaicb = $("#cb_sk_loaicb option:selected").val();
        var madd = $("#madiemdo_cbsk").val();
        var type = "2";
        var from = $("#date_tungay_cbsk").val();
        var to = $("#date_denngay_cbsk").val();
        //if (madd != "") type = "1";
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOCONGTO.EVENT_ThongKeChiTiet", callback: "drawTable_ctsk" };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_UserId: 1,
            v_DateFrom: from,
            v_DateTo: to,
            v_MaDiemDo: madd,
            v_LoaiCanhBao: loaicb,
            v_TypeValue: type,  //-- 2: Code di?n l?c, 1 là MeterId ma diem do
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}
function drawTable_ctsk(config, para, lst) {
    var data = lst.data;
    //console.log(data);
    var countKhachhang = 0;
    var tempMeterId;
    var trData = "";
    var tsbanghi = 0;
    $.each(data, function (key, val) {
        tsbanghi = data.length;
        if (tempMeterId != val.id) {
            tempMeterId = val.id;
            countKhachhang++;
            trData += "<tr id='" + tempMeterId + "' class='tsvh_tendiemdo'>" +
                          "<td class='td_stt'>" + countKhachhang + "</td>" +
                          "<td colspan='5'style='vertical-align: middle;'>MĐĐ: " + val.madiemdo + " - " + val.tendiemdo + " (Số công tơ : " + val.socongto + ")</td>";

            trData += "<tr class='line1'><td></td>" +
                          "<td>" + val.event + "</td>" +
                          "<td class='cl'>" + val.phase + "</td>" +
                          "<td class='cl'>" + val.timestart + "</td>" +
                          "<td class='a_c'>" + val.timeend + "</td>" +
                          "<td class='a_c'>" + val.sophut + "</td>" +
                       "</tr>";

        } else {
            trData += "<tr class='line1'><td></td>" +
                          "<td>" + val.event + "</td>" +
                          "<td class='cl'>" + val.phase + "</td>" +
                          "<td class='cl'>" + val.timestart + "</td>" +
                          "<td class='a_c'>" + val.timeend + "</td>" +
                          "<td class='a_c'>" + val.sophut + "</td>" +
                       "</tr>";
        }
    })
    $("#tbl_chitiet_cbsk tbody").empty();
    $("#tbl_chitiet_cbsk tbody").append(trData);
    $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
    selectlang();
    initformelement();
    $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>(" + countKhachhang + " Khách hàng)");
    tomausukien();
    stopLoad();
}
function rep_day(d) {
    if (d == "0" || d == "undefined") {
        return "";
    } else {
        return d + " Ngày ";
    }
}

function tomausukien() {
    /*LỌC SỰ KIỆN*/

    var i = 0;
    $('#tbl_chitiet_cbsk  tbody tr.line1').each(function () {
        i++;

        //console.log($(this).context.childNodes[1].innerText);

        switch ($(this).context.childNodes[1].innerText) {
            case "Lập trình công tơ":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien2");
                break;
            case "Thay đổi thời gian":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien3");
                break;
            case "Mất nguồn":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien4");
                break;
            case "Thấp áp":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien4");
                break;
            case "Quá áp":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien5");
                break;
            case "Mất điện áp pha":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien6");
                break;
            case "Ngược chiều điện áp":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien7");
                break;
            case "Ngược chiều dòng điện":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien8");
                break;
            case "Mất cân bằng áp":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien9");
                break;
            case "Mất cân bằng dòng":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien10");
                break;
            case "Mất dòng":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien11");
                break;
            case "Quá dòng":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien12");
                break;
            case "Ngược công suất":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien13");
                break;
            case "Quá tải":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien14");
                break;
            case "Đổi mật khẩu":
                $(this).removeAttr('class').attr('class', '');
                $(this).addClass("sukien15");
                break;
            default: $('#tblDataTkskctct > tbody  > tr > td').addClass("sukien");
        }
    });
}
function excel() {
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
    var loaicb = $("#cb_sk_loaicb option:selected").val();
    var madd = $("#madiemdo_cbsk").val();
    var type = "2";
    var from = $("#date_tungay_cbsk").val();
    var to = $("#date_denngay_cbsk").val();

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'ChiTietSuKien_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOCONGTO.EVENT_ThongKeChiTiet", namefile: namef_l };
    var para = {
        v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
        v_Value: code,
        v_UserId: 1,
        v_DateFrom: from,
        v_DateTo: to,
        v_MaDiemDo: madd,
        v_LoaiCanhBao: loaicb,
        v_TypeValue: type,  //-- 2: Code di?n l?c, 1 là MeterId ma diem do
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "event", name: "Loại cảnh báo", type: "Text" },
        { field: "phase", name: "Phase", type: "Text" },
        { field: "timestart", name: "Thời điểm cảnh báo", type: "Text" },
        { field: "dienluc", name: "Đơn vị điện lực", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);
}
//STT	Mã điểm đo	Tên khách hàng	Số công tơ	Loại cảnh báo	Phase	Thời điểm cảnh báo	Đơn vị điện lực
