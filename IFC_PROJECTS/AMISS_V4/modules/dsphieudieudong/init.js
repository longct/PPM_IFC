$(document).ready(function () {
    initformelement();
    LoadListBallot(0);
    $("#back_btn").click(function () {
        $("#panel_meter").slideUp();
    })

});
function LoadListBallot(page) {
    try {
        console.log("OK");
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO_CBVH.LOADLIST_BALLOT_pro", callback: "result_LoadBallot" };
        var para = {
            v_BallotId: 0,
            v_CodeDL: code,
            v_FromDate: "",
            v_ToDate: "",
            v_KeyWord: "",
            v_StatusKp: 0,
            v_pagenum: page,
            v_numrecs: 20,
            v_UserId: 1,
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
    } catch (e) {
        console.log(e);
    }
}
function result_LoadBallot(config, para, lst) {
    var data = lst.data;
    //console.log(data);
    var tr = ""
    $.each(data, function (key, val) {
        var ttkp;
        if (val.status == "1")
            ttkp = "TẠO PHIẾU VÀ THEO DÕI";
        else if (val.status == "2")
            ttkp = "ĐIỀU ĐỘNG NHÂN VIÊN";
        else if (val.status == "3")
            ttkp = "ĐÃ DUYỆT VÀ TRUY THU";
        else ttpk = "TẠO PHIẾU VÀ THEO DÕI";

        tr += '<tr>' +
                    '<td class="a_c">' + val.rnum + '</td>' +
                    '<td>' + val.ballotname + '</td>' +
                    '<td class="a_c">' + val.usercreate + '</td>' +
                    '<td class="a_c">' + replace0_0(val.userupdate) + '</td>' +
                    '<td class="a_c">' + replace0_0(val.updatedate) + '</td>' +
                    '<td class="a_c "><label  data-value="' + val.ballotid + '" class="filter_tsvh countMeter" style="cursor:pointer">' + val.countmeter + '</label></td>' +
                    '<td class="a_c">' + ttkp + '</td>' +
                    '<td class="a_c">' + val.nhanvien + '</td>' +
                    '<td>' + setnull(val.note) + '</td>' +
                    '<td><i class="fa fa-edit edit_ballot text-green" style="font-size:25px !important;cursor:pointer" id="sua_' + val.ballotid + '"/> <i  style="font-size:28px !important;cursor:pointer" class="text-red fa fa-trash del_ballot" id="xoa_' + val.ballotid + '"/></td>' +
                '</tr>';
    })
    $("#ballot_data tbody").empty();
    $("#ballot_data tbody").append(tr);
    stopLoad();

    $(".countMeter").click(function () {
        var bid = $(this).data("value");
        //alert(bid);
        LoadMeterByBID(bid, 0)
    })
}
function LoadMeterByBID(ballotid, page) {
    try {
        console.log("OK");
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO_CBVH.LOADKH_BYBALLOTID_pro", callback: "result_LoadMeter" };
        var para = {
            v_BallotId: ballotid,
            v_pagenum: page,
            v_numrecs: 20,
            v_UserId: 1,
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
    } catch (e) {
        console.log(e);
    }
}
function result_LoadMeter(config, para, lst) {
    var data = lst.data;
    //console.log(data);
    var tr = "";

    $.each(data, function (key, val) {
        var select = '<select id="cb' + val.id_auto + '" class="form-control select_tt">' +
                            '<option value="0">MỚI CẢNH BÁO</option>' +
                            '<option value="1">ĐANG KIỂM TRA HIỆN TRƯỜNG</option>' +
                            '<option value="2">ĐÃ ĐI XỬ LÝ HIỆN TRƯỜNG</option>' +
                            '<option value="3">XỬ LÝ KHÔNG THÀNH CÔNG</option>' +
                            '<option value="4">ĐÃ XỬ LÝ VÀ TRUY THU</option>' +
                        '</select>';
        tr += '<tr id="tr_' + val.id_auto + '" data-value="'+val.id_auto+'">' +
                    '<td class="a_c">' + val.rnum + '</td>' +
                    '<td>' + val.madiemdo + '</td>' +
                    '<td>' + val.socongto + '</td>' +
                    '<td>' + val.tendiemdo + '</td>' +
                    '<td class="a_c">' + select + '</td>' +
                    '<td><textarea class="form-control" id="tx"'+val.id_auto+'">' + replace0_0(val.note) + '</textarea></td>' +
                    '<td class="a_c"><button class="btn btn-warning update" data-id="' + val.id_auto + '" data-value="' + val.meterid + '"' + val.save + '>Cập nhật</button></td>' +
                    '<td class="a_c"><i class="fa fa-trash text-red" style="font-size:28px !important;cursor:pointer"></i></td>' +
                '</tr>';
        if (val.khacphuc != null) {
            $("#cb" + val.id_auto + " option[value=" + val.khacphuc + "]").attr("selected", "selected");
        } else {
            $("#cb" + val.id_auto + " option[value='0']").attr("selected", "selected");
        }

    })
    $("#meter_data tbody").empty();
    $("#meter_data tbody").append(tr);
    $(".select_tt").change(function () {
        var trM = $(this).parent().parent().data("value");
        if ($(this).val() != "0") {
            $("#tr_" + trM + " button").removeAttr("disabled");
        }
        else {
            $("#tr_" + trM + " button").attr("disabled", "disabled");
        }
    })
    $("#panel_meter").slideDown();
    stopLoad();
}