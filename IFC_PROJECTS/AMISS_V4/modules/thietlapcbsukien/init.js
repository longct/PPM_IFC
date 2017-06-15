$(document).ready(function () {
    showhideTree();
    initformelement();
    loadContent();
    loaddatasukiencanhbao();
    $('#btn_thietlapcbsk').on('click', function () {
        var selected = $("#selectLoaiCB").find("option:selected");
        var arrSelected = [];
        selected.each(function () {
            arrSelected.push($(this).text());
        });
        var event = arrSelected.toString();
        if (event == "") { showToast("Chưa chọn cảnh báo !", "error"); return; }
        set_TLCBSK(event);
    });
});

function set_TLCBSK(event) {
    try {
        //console.log("OK");
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var email = $("#emailnhancb").val();
        var phone = $("#sdtnhancb").val();
        if (email == "") { showToast("Chưa điền Email !", "error"); return; }
        if (email.indexOf("@") == -1) { showToast("Email sai định dạng !", "error"); return; }
        //if ((/^[0-9]+$/.test(phone)) || (phone.length <10) ) { showToast("Số điện thoại chưa đúng định dạng !", "error"); return; }
        if (phone == "") { showToast("Chưa điền Số điện thoại !", "error"); return; }
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOMATDIEN.CANHBAOCOMPORT", callback: "result_TLCBSK" };
        var para = {
            v_USERID: 1,
            v_VALUE: code,
            v_SETUP: event,
            v_EMAIL: email,
            v_PHONE: phone,
            v_TYPE: 'EVENT',
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);  

    } catch (e) {
        console.log(e);
    }
}
function result_TLCBSK(config, para, lst) {
    var data = lst.data;
    ////console.log(data);
    if (data[0].count == '1') {
        showToast("Thiết lập thành công", "success");
        loaddatasukiencanhbao();
        //clearthemsukien();
    }
    else {
        showToast("Thiết lập thất bại", "error");
    }
}

function loaddatasukiencanhbao() {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOMATDIEN.BANGCANHBAOCOMPORT", callback: "f_reusltsukien" };
        var para = {
            v_TYPE: 'EVENT',
            v_VALUE: code
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_reusltsukien(config,para,lst) {
    try {
        var data = lst.data;
        //console.log(data);
        var tr = "";
        $.each(data, function (key, val) {
            tr += '<tr>'+
                    '<td>' + replace0_0(val.vlaue) + '</td>' +
                    '<td>' + val.setup + '</td>' +
                    '<td>' + val.email + '</td>' +
                    '<td>' + val.phone + '</td>' +
                    '<td class="a_c"><i title="Xóa thiết lập" class="glyphicon glyphicon-remove-sign remove" value = "' + val.id + '"></i></td>' +
                '</tr>';
        })
        $("#tbl_tlcksk_data tbody").empty();
        $("#tbl_tlcksk_data tbody").append(tr);
        $(".remove").click(function () {
            var tl_id = $(this).attr("value");
            //$("#confimYesNo").modal("show");
            f_confimYesNo("Bạn muốn xóa thiết lập này ?", "Bỏ qua", "Xác nhận", function () {
                xoa_tlcbsk(tl_id);
            });
        })
    } catch (e) {
        console.log(e);
    }
}
function xoa_tlcbsk(id) {
    try {
        var tl_id = id;
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOMATDIEN.THONGTINCANHBAOCOMPORT", callback: "res_xoatl" };
        var para = {
            v_USERID: 1,
            v_ID: tl_id,
            v_VALUE: '',
            v_SETUP: '',
            v_EMAIL: '',
            v_PHONE: '',
            v_TYPES: 'EVENT',
            v_TYPE: 'DELTE'
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function res_xoatl(config,para,lst) {
    var data = lst.data;
    if (data[0].count == '1') {
        showToast("Xóa thiết lập thành công", "success");
        loaddatasukiencanhbao();
        //clearthemsukien();
    }
    else {
        showToast("Xóa thiết lập thất bại", "error");
    }
}