var countpage = 20;
var arrayThietLapNVBVH = new Array();
$(document).ready(function () {

    showhideTree();
    try {

        initformelement();
        loadContent();
        selectlang();
        var objFilter = localStorage.getItem("tree_node");
        if (objFilter != null) {
            objFilter = JSON.parse(localStorage.getItem("tree_node"));
            var istype = objFilter[0].type;
            var socongto = objFilter[0].socongto;
            var tendiemdo = objFilter[0].tendiemdo;
            if (socongto != "0") {
                HideThietLap();
            } else {
                if (istype != "0" && istype != "4" && socongto != "0")
                    $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + " - <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
                else if (istype == "4")
                    $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
                else if (socongto == "0" && istype != "4")
                    $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
                else if (istype >= "6")
                    $("#tendiemdo_span").html("Trạm: " + tendiemdo);
                $(".panel-tlcbvh").show();
                getDataThietLap();
            }

        }
        else {
            HideThietLap();
        }
        $("#btn_choncanhbao_tlncbvh").on("click", function () {
            $("#choncanhbao_tlncbvh").modal("show");
            LoadDataTypeCanhBao();
        });
        $("#btn_tlemail_tlncbvh").on("click", function () {
            $("#thietlapemail_tlncbvh").modal("show");
        });
        $("#btn_thietlap_tlncbvh").on("click", function () {
            var thietlap_count = $("#tbl_cbmd tbody").find("tr").length;
            if (thietlap_count > 0) {
                f_confimYesNo("Xác nhận thay đổi", "Bỏ qua", "Xác nhận", function () {
                    funUpdateThietLap();
                });
            } else {
                showToast("Vui lòng chọn cảnh báo", "error");
            }
        });
    } catch (e) {
        console.log(e.message);
    }
});
function getDataThietLap() {
    try {

        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle233", namesql: "ADMISS_CANHBAOVANHANH_THIETLAP.GETWARNINGSETTINGNOTI", callback: "result_GetThietLap" };
        var para = {
            v_CODE: objFilter[0].meterid,
            v_USERId: objuser.userid
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_GetThietLap(config, para, lst) {
    var data = lst.data;

    $('#tbl_cbmd tbody').empty();
    $.each(data[0].kq0, function (key, val) {
        var tr = "";
        var checkemail = val.mail == 1 ? "checked" : ""
        tr += '<tr id=' + val.warningid + '>' +
                    '<td>' + val.group_name1 + '</td>' +
                    '<td>' + val.group_name2 + '</td>' +
                    '<td>' + val.name + '</td>' +
                    '<td class="a_c"><input type="checkbox" ' + checkemail + '></td>'
        tr += "</tr>";
        $("#tbl_cbmd tbody").append(tr);
    });
    if (data[1].kq1.length > 0) {
        $("#txt_lstemail_tlncbvh").val(data[1].kq1[0].listmail);
    }
}
function HideThietLap() {
    $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
    $('#tbl_cbmd tbody').empty();
    $(".panel-tlcbvh").hide();
}
function funUpdateThietLap() {
    try {
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));

        $("#tbl_cbmd tbody").find("tr").each(function () {
            var id = $(this).attr("id");
            var email = $(this).children("td").find('input[type="checkbox"]').prop("checked") == true ? 1 : 0;
            arrayThietLapNVBVH.push({
                cot1: objFilter[0].meterid,//CODEDL
                cot2: id,//WanningId
                cot3: objuser.userid,//UserId
                cot4: email,//MAIL
                cot5: 0,//SMS
                cot6: 0, //NOTI
                cot7: 'THIEPLAPNHANCANHBAOVANHANH'
            });
        });
        var config = {
            connstr: "ConnectOracle233",
            insertto: "AMISS_TEAMNHIEU",
        }
        var table = {
            table: JSON.stringify(arrayThietLapNVBVH)
        };
        var lst = ExecuteBulkCopyOracle(config, table);

        if (lst != null) {
            capnhata();
        }
        else {
            showToast("Lỗi cập nhật", "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function capnhata() {
    try {

        var config = { connstr: "ConnectOracle233", namesql: "ADMISS_CANHBAOVANHANH_THIETLAP.UpdateSettingsReceivedWarning", callback: "result_saveThietLap" };
        var para = '[]';
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_saveThietLap(config, para, lst) {

    var data = lst.data;
    var row = data[0].count;
    if (row.indexOf("success") > -1) {
        showToast("Cập nhật thành công", "success");
    } else {
        showToast("Cập nhật lỗi", "error");
    }
}