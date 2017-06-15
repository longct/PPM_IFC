$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (istype != "0" && istype != "4" && socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + "- <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            get_CBSK();
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }
        selectlang();
    } catch (e) {
        console.log(e.message);
    }
});
function get_CBSK() {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOCONGTO.EVENT_ThongKe", callback: "drawTable_thongkecbsk" };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_UserId: 1,
            v_DateNow: "",
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);

        //  

    } catch (e) {
        console.log(e);
    }
}
function drawTable_thongkecbsk(config, para, lst) {
    var data = lst.data;
    var prolog = 0;
    var currentimbalance = 0;
    var lostcurrent = 0;
    var overcurrent = 0;
    var reverserun = 0;
    var overload = 0;
    var passchange = 0;
    var timechange = 0;
    var powerfail = 0;
    var undervoltage = 0;
    var phasefail = 0;
    var overvoltage = 0;
    var reversevoltage = 0;
    var reversecurrent = 0;
    var voltageimbalance = 0;
    ////console.log(data);
    var tr = "";
    $.each(data, function (key, val) {
        tr += '<tr>' +
              '<td class="td_stt1pha">' + (key + 1) + '</td>' +
              '<td id="' + val.code + '"class="td_donvi">' + val.name + '</td>' +
              '<td class="a_c">' + val.proglog + '</td>' +
              '<td class="a_c">' + val.currentimbalance + '</td>' +
              '<td class="a_c">' + val.lostcurrent + '</td>' +
              '<td class="a_c">' + val.overcurrent + '</td>' +
              '<td class="a_c">' + val.reverserun + '</td>' +
              '<td class="a_c">' + val.overload + '</td>' +
              '<td class="a_c">' + val.passchange + '</td>' +
              '<td class="a_c">' + val.timechange + '</td>' +
              '<td class="a_c">' + val.powerfail + '</td>' +
              '<td class="a_c">' + val.undervoltage + '</td>' +
              '<td class="a_c">' + val.overvoltage + '</td>' +
              '<td class="a_c">' + val.phasefail + '</td>' +
              '<td class="a_c">' + val.reversevoltage + '</td>' +
              '<td class="a_c">' + val.reversecurrent + '</td>' +
              '<td class="a_c">' + val.voltageimbalance + '</td>' +
              '</tr>';
        prolog += parseInt(val.proglog);
        currentimbalance += parseInt(val.currentimbalance);
        lostcurrent += parseInt(val.lostcurrent);
        overcurrent += parseInt(val.overcurrent);
        reverserun += parseInt(val.reverserun);
        overload += parseInt(val.overload);
        passchange += parseInt(val.passchange);
        timechange += parseInt(val.timechange);
        powerfail += parseInt(val.powerfail);
        undervoltage += parseInt(val.undervoltage);
        phasefail += parseInt(val.phasefail);
        overvoltage += parseInt(val.overvoltage);
        reversevoltage += parseInt(val.reversevoltage);
        reversecurrent += parseInt(val.reversecurrent);
        voltageimbalance += parseInt(val.voltageimbalance);

    });

    tr += '<tr>' +
             '<td colspan ="2" class="a_c text-bold">' + data[0].nametong + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'PROGLOG\')">' + prolog + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'CURRENTIMBALANCE\')">' + currentimbalance + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'LOSTCURRENT\')">' + lostcurrent + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'OVERCURRENT\')">' + overcurrent + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'REVERSEPOWER\')">' + reverserun + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'OVERLOAD\')">' + overload + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'PASSCHANGE\')">' + passchange + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'TIMECHANGE\')">' + timechange + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'POWERFAIL\')">' + powerfail + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'UNDERVOLTAGE\')">' + undervoltage + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'OVERVOLTAGE\')">' + overvoltage + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'PHASEFAIL\')">' + phasefail + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'REVERSEVOLTAGE\')">' + reversevoltage + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'REVERSECURRENT\')">' + reversecurrent + '</a></td>' +
             '<td class="a_c"><a href="#"  class= "text-bold"  onClick="menuClickTab(\'chitietsukien_cbsk\',\'VOLTAGEIMBALANCE\')">' + voltageimbalance + '</a></td>' +
             '</tr>';

    $("#thongke_cbsk_details").empty();
    $("#thongke_cbsk_details").append(tr);
}