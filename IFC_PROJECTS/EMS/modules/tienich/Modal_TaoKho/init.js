var datasualtbsx = "";
var paraTable_Kho = [];
var id_kho = "";
$(document).ready(function () {
    try {
        LoadTrangThaiKho();
        $("#btn_luu_tk").click(function () {
            save_kho();
        });
        $("#btn_thoat_tk").click(function () {
            clear_taikho();
            $("#modal_taokho").modal("hide");
        });
    } catch (e) {
        console.log(e);
    }

});

function LoadTrangThaiKho() {
    try{
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_tk", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: "" };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_tk(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0)
            return;
        dataToCob("cb_trang_tk", lst.data, "code", "name", "", "");
        $('#cb_trang_tk').multiselect('rebuild');
      
    } catch (e) {
        console.log(e);
    }
}
function getDataEdit_tk(id) {
    try {
        id_kho = id;
        var p = getAllIdMod();
        var config = { namesql: "TR_GETKHO", callback: "f_tr_getkho_tk", connstr: "ConnectEMS" };
        var para = {Code: id };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_tr_getkho_tk(config, para, lst) {
    try{
        if (lst == null || lst == undefined || lst == "" || lst == "[]") return;
        var data = lst.data;
        var array_tt = [];
        $.each(data, function (key, val) {
            array_tt.push(val.trangthai_id+"");
        });

        $('#cb_trang_tk').multiselect('select', array_tt);

        if (localStorage.getItem("tree_node_qldm")) {
            var tree = JSON.parse(localStorage.getItem("tree_node_qldm"));
            $("#txt_thuockho_tk").val(tree[0].nameparent);
            $("#txt_tenkho_tk").val(tree[0].name);
            $("#txt_khomacdinh_taokho").prop("checked", tree[0].iskhotong)
        }
    } catch (e) {
        console.log(e);
    }
}
function LoadKho_tk() {
    try{
        if (localStorage.getItem("tree_node_qldm")) {
            var tree = JSON.parse(localStorage.getItem("tree_node_qldm"));
            $("#txt_thuockho_tk").val(tree[0].name);
        }
    } catch (e) {
        console.log(e);
    }
}
function save_kho() {
    try {
     
        messInfo("messinfo11_tkho", "", "error");
        if ($("#txt_tenkho_tk").val() == "") {
            messInfo("messinfo11_tkho", "Vui lòng nhập tên kho cần tạo", "error");
            return;
        }
        var tt = $("#cb_trang_tk").val();
        if (tt == null || tt.length==0) {
            messInfo("messinfo11_tkho", "Vui lòng chọn trạng thái", "error");
            return;
        }
        var p = getAllIdMod();
        var userid = JSON.parse(localStorage.getItem("userinfo"));
        var tree = JSON.parse(localStorage.getItem("tree_node_qldm"));
       
        $.each(tt, function (key,val) {
            paraTable_Kho.push({ "code": tree[0].id, "trangthai_id": val });
        });
        var dt = '{ "table": ' + JSON.stringify(paraTable_Kho) + ' }';
 
        var config = { namesql: "TR_TAOKHO", callback: "f_result_them_taomoi", connstr: "ConnectEMS" };
       
        var para = {
            code: tree[0].id,
            name: p.txt_tenkho_tk,
            userid: userid.userid,
            codereal: tree[0].codereal,
            IsKhoTong: $("#txt_khomacdinh_taokho").prop("checked"),
            id: id_kho
        }

        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
    } catch (e) {
        console.log(e);
    }
}
function f_result_them_taomoi(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
           
          
            if (id_kho == "") {
                messInfo("messinfo11_tkho", row, 'ok');
                clear_taikho();
                setTimeout(function () {
                    messInfo("messinfo11_tkho", '', 'ok');
                }, 2000);
            } else {
                clear_taikho();
                $("#modal_taokho").modal("hide");
                messInfo("messinfo_tkho", row, 'ok');
                setTimeout(function () {
                    messInfo("messinfo_tkho", '', 'ok');
                }, 2000);
               
            }
        } else {
            messInfo("messinfo11_tkho", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clear_taikho() {
    try {
        paraTable_Kho = [];
        $("#txt_tenkho_tk").val('');
        id_kho = "";
        $("#txt_khomacdinh_taokho").prop("checked", false);
        $("#cb_trang_tk").multiselect('destroy');
        LoadTrangThaiKho();
        $('#tree_left_qldmdl').jstree("destroy");
        GetTreeAll_qldmdl();
    } catch (e) {
        console.log(e);
    }
}