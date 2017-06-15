$(document).ready(function () {
    showhideTree();
    try {
        initformelement();
        $("#btn_thuchien_lscb").click(function () {
            get_LSCB(0);
        });
        if (localStorage.getItem("dateF") == "" && localStorage.getItem("dateT") == "") {
            $(".datepicker").val(gettimenow());
        } else {
            $("#ls_txttungay").val(localStorage.getItem("dateF"));
            $("#ls_txtdenngay").val(localStorage.getItem("dateT"));
        }
        $("#ls_txttungay").change(function () {
            localStorage.setItem("dateF", $("#ls_txttungay").val());
        });
        $("#ls_txtdenngay").change(function () {
            localStorage.setItem("dateT", $("#ls_txtdenngay").val());
        });
    }
    catch (e) {
        console.log(e.message);
    }

});
function get_LSCB(page) {
    try {
        //console.log("OK");
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var loaicb = $("#ls_cbloaicanhbao option:selected").val();
        var ploaicb = $("#ls_cbphanloaicanhbao option:selected").val();
        var loaikh = $("#ls_cbloaikhachhang option:selected").val();
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetHistoryWarningPage", callback: "drawTable_lscb" };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
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
            v_WARNINGTYPE: loaicb,
            v_CONDITION: ploaicb,
            v_TIME_FROM: tungay,
            v_TIME_TO: denngay,
            v_TypeKH: loaikh,
            v_pagenum: page,
            v_numrecs: 1000,
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);

        //  

    } catch (e) {
        console.log(e);
    }
}
function drawTable_lscb(config, para, lst) {
    var data = lst.data;
    ////console.log(data);
    var countKhachhang = 0;
    var tempMeterId;
    var trData = "";
    var tsbanghi = 0;
    $.each(data, function (key, val) {
        tsbanghi = val.rowscount;
        if (tempMeterId != val.meterid) {
            tempMeterId = val.meterid;
            countKhachhang++;
            trData += "<tr id='" + tempMeterId + "' class='tsvh_tendiemdo'>" +
                          "<td class='stt'>" + countKhachhang + "</td>" +
                          "<td colspan='8'>MĐĐ: " + val.madiemdo + " - " + val.tendiemdo +"</td></tr> ";
            trData += "<tr class='line1'><td></td>" +
                          "<td>" + val.time_warning + "</td>" +
                          "<td>" + val.time_fixed + "</td>" +
                          "<td>" + val.value_warning + "</td>" +
                          "<td>" + val.value_fixed + "</td>" +
                          "<td class='cl'>" + val.warning_name + "</td>" +
                          "<td class='cl'>" + val.format + "</td>" +
                          "<td class='a_c'>" + rep_day(val.countday) + val.counthour + " Giờ " + val.countminute + " Phút </td>" +
                          "<td class='a_c'></td>" +
                       "</tr>";

        } else {
            trData += "<tr class='line1'><td></td>" +
                          "<td>" + val.time_warning + "</td>" +
                          "<td>" + val.time_fixed + "</td>" +
                          "<td>" + val.value_warning + "</td>" +
                          "<td>" + val.value_fixed + "</td>" +
                          "<td class='cl'>" + val.warning_name + "</td>" +
                          "<td class='cl'>" + val.format + "</td>" +                           
                          "<td class='a_c'>" + rep_day(val.countday) + val.counthour + " Giờ " + val.countminute + " Phút </td>" +
                          "<td class='a_c'></td>" +
                      "</tr>";
        }
    })
    $("#tbl_lscb_data tbody").empty();
    $("#tbl_lscb_data tbody").append(trData);
    $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
    selectlang();
}
function rep_day(d) {
    if (d == "0" || d == "undefined") {
        return "";
    } else {
        return d + " Ngày ";
    }
}