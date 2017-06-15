$(document).ready(function () {
    try{
        showhideTree();
        initformelement();
        selectlang();
        $("#txttungay_qlbc").val(gettimenow());
        $("#txtdengay_qlbc").val(gettimenow());
        $("#btnSearch_qlbc").click(function () {
            loadthongbaocao();

        });


    } catch (e) {
        console.log(e);
    }
});

function loadthongbaocao() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var ngayfrom = p.txttungay_qlbc.split("/");
        var ngay = ngayfrom[2] + "/" + ngayfrom[1] + "/" + ngayfrom[0];
        var ngayfrom1 = p.txtdengay_qlbc.split("/");
        var ngay1 = ngayfrom1[2] + "/" + ngayfrom1[1] + "/" + ngayfrom1[0];
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO_NPC.GETLISTCREATED", callback: "result_loadthongbaocao" };
        var para = {
            v_type:1,
            // v_value:code[0].id,
            v_value: '0101',
            v_datefrom: ngay,
            v_dateto: ngay1,
            v_userid: userinfo.userid,
            v_typeinword: p.cb_phanloai,
            v_keyword: p.txttimkiem_qlbc,
        };

        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthongbaocao(config, para, lst) {
    try{
        var data = lst.data;
        console.log(data);
        if (data.length == 0) {
            showToast("Không có dữ liệu hiển thị", "error");
            $("#tbl_qlbc").empty();
            return;
        }
        $("#tbl_qlbc").empty();
        $.each(data, function (key,val) {
            var row = "";
            row += "<tr  ><td>"
                + val.stt + "</td><td>"
                + val.module_name + "</td><td>"
                + val.report_type + "</td><td>"
                + val.ten + "</td><td>"
                + val.createddate + "</td><td>"
                + val.stt + "</td><td>"
                + "<form><a class='btn btn-success xoaqlbaocao' data-idql='" + val.id_auto + "' >Xóa</a></form> </td></tr>"
            $("#tbl_qlbc").append(row);
        });

        $(".xoaqlbaocao").click(function () {
        var id =  $(this).data("idql");
        f_confimYesNo("Bạn chắc chắn muốn xóa ", "Bỏ qua", "Xác nhận", function () {
            xoabaocao(id);
        });
     
        });

    } catch (e) {
        console.log(e);
    }
}
function xoabaocao(id) {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO_NPC.DELETEREPORTBYID", callback: "result_xoabaocao" };
        var para = {
            v_id_auto: id
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_xoabaocao(config, para, lst) {
    try {
        var data = lst.data;
        var row =data[0].result;
  
        if (row == "1") {
            showToast("Xóa thành công", "success");
            loadthongbaocao();
        } else {
            showToast("Không có dữ liệu để xóa", "error");
        }
       // loadthongbaocao();
    } catch (e) {
        console.log(e);
    }
}