$(document).ready(function () {
    showhideTree();
    initformelement();
    loadContent();
    $("#btn_chonloaicanhbao").click(function () {
        $('#md_loaicanhbao').modal('show');
    })
    $("#btn_thietlapemail").click(function () {
        $('#md_tlemail').modal('show');
    })
    var lang = localStorage.getItem("lang");
    if (lang == "VI" || lang == "vi") lang = "true";
    else lang = "false";
    get_DSTLCBVH(lang);

    $("#btn_updatecbvh").click(function () {
        var lstUpdate = [];
        $.each($("#danhsach_cbvh_data tbody tr"), function (key, item) {
            var objUpdate = new Object();
            objUpdate.id = item.id.replace("dscb_", "");
            objUpdate.mail = $('#danhsach_cbvh_data tbody #cbox_' + item.id.replace("dscb_", "")).prop('checked') ? "1" : "0";
            objUpdate.sms = $('#danhsach_cbvh_data tbody #cbox_' + item.id.replace("dscb_", "")).prop('checked') ? "1" : "0";
            objUpdate.noti = $('#danhsach_cbvh_data tbody #cbox_' + item.id.replace("dscb_", "")).prop('checked') ? "1" : "0";
            lstUpdate.push(objUpdate);
        });
        console.log(lstUpdate);
        update_DSTLCBVH(JSON.stringify(lstUpdate));
    })

});

function get_DSTLCBVH(lang) {
    try {
        //console.log("OK");
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetSettingsReceivedWarning_pro", callback: "result_DS_TLCBVH" };
        var para = {
            v_GroupId: code,
            v_Langues: lang,
            v_USERID: 1
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_DS_TLCBVH(config, para, lst) {
    var data = lst.data;
    ////console.log(data);
    var tr = "";
    $.each(data, function (key, val) {
        tr += '<tr id="dscb_' + val.id + '">' +
                    '<td class="">' + val.name_group1 + '</td>' +
                    '<td class="">' + val.name_group2 + '</td>' +
                    '<td class="">' + val.name + '</td>' +
                    '<td class="a_c">';
        if (val.mail == 1) {
            tr += '<input type="checkbox" id="cbox_' + val.id + '" checked class="flat-red"/>';
        } else {
            tr += '<input type="checkbox" id="cbox_' + val.id + '" class="flat-red"/>';
        }
        tr += '</td>' +
              '</tr>';
    });
    $("#danhsach_cbvh_data tbody").empty();
    $("#danhsach_cbvh_data tbody").append(tr);
    //if (data[0].count == '1') {
    //    showToast("Thiết lập thành công", "success");
    //    loaddatasukiencanhbao();
    //    //clearthemsukien();
    //}
    //else {
    //    showToast("Thiết lập thất bại", "error");
    //}
}
function update_DSTLCBVH(value) {
    try {
        //console.log("OK");
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.U_SettingsReceivedWarning_pro", callback: "result_Update_DS_TLCBVH" };
        var para = {
            v_ValueSetting: value,
            v_GroupId: code,
            v_USERID: 1
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_Update_DS_TLCBVH(config, para, lst) {
    var data = lst.data;
    ////console.log(data);
    if (data[0].value_ == '1') {
        showToast("Thiết lập thành công", "success");

        get_DSTLCBVH(lang);
        //clearthemsukien();
    }
    else {
        showToast("Thiết lập thất bại", "error");
    }
}