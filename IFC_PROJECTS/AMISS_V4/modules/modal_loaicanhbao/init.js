$(document).ready(function () {
    try {
        initformelement();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var lang = localStorage.getItem("lang");
        if (lang == "VI" || lang == "vi") lang = "true";
        else lang = "false";
        console.log("OK");
        LoadDataTypeCanhBao("0", lang);

        $("#cbox_loaicb_cbvh").change(function () {
            var vWarnType = $("#cbox_loaicb_cbvh option:selected").val();
            var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetListWarningByUserId_pro", callback: "result_get_cbvh" };
            var para = {
                v_GroupId: code,
                v_WarnType: vWarnType,
                v_Langues: lang,
                v_UserId: 1,
            };

            //////console.log(para);
            ExecuteServiceSyns(config, para);
        })
        $("#btn_choncbvh").click(function () {
            var array = $('#danhsach_cbvh tbody tr td input:checked');
            var ids = new Array();
            $.each(array, function (idx, obj) {
                var tr_id = $(obj).parent().parent().parent().attr('id');
                var td_lcb1 = $("#" + tr_id + " td.td_lcb1").html();
                var td_lcb2 = $("#" + tr_id + " td.td_lcb2").html();
                var td_name = $("#" + tr_id + " td.td_name").html();
                ids.push({ lcb1: td_lcb1, lcb2: td_lcb2, cbname: td_name, cb_id: $(obj).attr('value') });
            });
            //console.log(ids);
            drawDSCB(ids)
        })
    } catch (e) {
        console.log(e);
    }


});
function drawDSCB(ids) {
    var tr = "";
    $.each(ids, function (key, val) {
        tr += '<tr id="dscb_' + val.cb_id + '">'+
                '<td>' + val.lcb1 + '</td>'+
                '<td>' + val.lcb2 + '</td>'+
                '<td>' + val.cbname + '</td>' +
                '<td class="a_c"><input type="checkbox" id="cbox_'+val.cb_id+'" checked class="flat-red"/></td>'
               '</tr>';
    })
    $("#danhsach_cbvh_data tbody").empty();
    $("#danhsach_cbvh_data tbody").append(tr);
    initformelement();
}
function LoadDataTypeCanhBao(value, isall) {
    try {//-- true: Vn; false: eng
        //console.log("OK");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetWarningByType_pro", callback: "result_get_loaicbvh" };
        var para = {
            v_WarningType: value,
            v_Langues: isall
        };

        //////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}


function result_get_loaicbvh(config, para, lst) {
    console.log(lst.data);
    var data = lst.data;
    $("#cbox_loaicb_cbvh").empty();
    $('#cbox_loaicb_cbvh').append($('<option>', {
        value: '-1',
        text: '-- TẤT CẢ  --'
    }));
    $.each(data, function (key, val) {
        $('#cbox_loaicb_cbvh').append($('<option>', {
            value: val.id,
            text: val.text
        }));
    })

    $("#cbox_loaicb_cbvh").change();
}
function result_get_cbvh(config, para, lst) {
    //console.log(lst);
    var data = lst.data;
    var tr = "";
    $.each(data, function (key, val) {
        tr += '<tr id="tr_' + val.id + '">' +
                '<td>' + (key + 1) + '</td>' +
                '<td class="td_lcb1">' + val.group_name1 + '</td>' +
                '<td class="td_lcb2">' + val.group_name2 + '</td>' +
                '<td class="td_name">' + val.name + '</td>' +
                '<td class="a_c">';
        //console.log(val.check_box);
        if (val.check_box == 0) {
            tr += '<input type="checkbox" class="cbch_check flat-red"  value="' + val.id + '"/>';
        } else {
            tr += '<input type="checkbox" class="cbch_check flat-red" checked value="' + val.id + '"/>';
        }
        tr += '</td>' +
              '</tr>';
    })
    $("#danhsach_cbvh tbody").empty();
    $("#danhsach_cbvh tbody").append(tr);
    initformelement();
}