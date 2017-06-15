var dthongtindinhmuc = 0;
var paraTable_CP = [];
var itemCount = 0;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
       
        $("#txt_thoigiankhaibao_kbdmcp").val(gettimenow());
        loadBanMienCP();
        $("#cbvattu_kbdmcp").change(function () {
            loadTenThietBiCP($(this).val());
            paraTable_CP = [];
            $("#myTableData_cp").empty();
        });
        $("#cb_tenvt_kbdmcp").change(function () {
            paraTable_CP = [];
            $("#myTableData_cp").empty();
        });
        $("#btn_checkluu_themkbdmcp").click(function () {
           
            var check = validatechitietcp();
            if (check != "") {
                messInfo("messinfo_themkbdmcp", check, "error");
                return;
            }
            LoadCheckCPS();
           
            addThem_KBDMCP();
        });
        $("#btn_them_cp").click(function () {
           
            itemCount++;
            addRow_KBDMCP();
        });
        $("#btn_thoat_kbdmcp").click(function () {
            paraTable_CP = [];
            $("#myTableData_cp").empty();
            clear_chitietcp();
            messInfo("messinfo_themkbdmcp", "", "error");
            messInfo("messinfo_themkbdmcp", "", "ok");
            $("#them_kbcapphatsinh").modal("hide");
        });
    } catch (e) {
        console.log(e);
    }

});
function LoadCheckCPS() {
    try {
        var p = getAllIdMod();
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_KH_DinhMuc_CheckKBCPS", callback: "fn_tb_dinhmuc_checkb", connstr: "ConnectEMS" };
        var para = {
            StockCode: p.cb_banmien_kbdmcp,
            VendorId: p.cb_tenvt_kbdmcp,
            ThoiDiemCB: p.txt_thoigiankhaibao_kbdmcp
        };
 
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

function fn_tb_dinhmuc_checkb(config, para,lst) {
    try {

        messInfo("messinfo_themkbdmcp", "", "error");
        $("#btn_checkluu_themkbdmcp").removeAttr("disabled");
        if (lst == null || lst == undefined || lst == "[]") {
            f_addThemThietBiChoGrid_CP();
        } else {
            messInfo("messinfo_themkbdmcp", lst.data[0].result, "error");
            $("#btn_checkluu_themkbdmcp").attr("disabled", true);
            return;
        }
    } catch (e) {
        console.log(e);
    }
}
//add row
function addRow_KBDMCP() {
    try {
        messInfo("messinfo_themkbdmcp", "", "error");
        var check = validatechitietcp();
        if (check != "") {
            messInfo("messinfo_themkbdmcp", check, "error");
            return;
        }
        if (itemCount > 6) {
            messInfo("messinfo_themkbdmcp", "Tối đa 6 lần xin cấp phát sinh", "error");
            return;
        }
        LoadCheckCPS();
        var p = getAllIdMod();
        var temp = {
            SLCP: p.txt_slvttbcapphat_kbdm,
            ThoiDiemKB: p.txt_thoigiankhaibao_kbdmcp,
            LyDo:p.txt_lydo_kbdm,
            Stt: itemCount
        };

        paraTable_CP.push(temp);
      

    } catch (e) { console.log(e); }
}
// add table
function f_addThemThietBiChoGrid_CP() {
    try {
        var pt = getAllIdModText();
        var html = "";
        html = "<tr id='tr" + itemCount + "'><td>" +
                            itemCount + "</td> <td>" +
                            pt.txt_slvttbcapphat_kbdm + "</td> <td>" +
                            pt.txt_thoigiankhaibao_kbdmcp + "</td> <td>" +
                            pt.txt_lydo_kbdm + " </td> <td>" +
                            "<input type='button'  id='delete_cp" + itemCount + "' value='Xóa' style='cursor: pointer;'></td> </tr>";
        $("#myTableData_cp").append(html);

        $("#delete_cp" + itemCount).click(function () {
            var idremove = $(this).attr("id").replace("delete_cp", "");
            for (var i = 0; i < paraTable_CP.length; i++) {
                if (paraTable_CP[i].Stt == idremove) {
                    paraTable_CP.splice(i, 1);
                    break;
                }
            }
            $("#tr" + idremove).remove();
        });

    } catch (e) {
        console.log(e);
    }
}
//save
function addThem_KBDMCP() {
    try {
        var p = getAllIdMod();
        var user = JSON.parse(localStorage.getItem("userinfo"));

        var dt = '{ "table": ' + JSON.stringify(paraTable_CP) + ' }';

        var config = { namesql: "TB_Lis_ADD_KBDM_CP", callback: "result_add_kbdmcp", connstr: "ConnectEMS" };
        var para = {
            UserId:user.userid,
            StockCode: p.cb_banmien_kbdmcp,
            VendorId: p.cb_tenvt_kbdmcp,
            
        };

        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function result_add_kbdmcp(config, para, lst) {
    try {

        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_themkbdmcp", "lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            paraTable_CP = [];
            clear_chitietcp();
            loadtable_chitiet();
            $("#myTableData_cp").empty();
            messInfo("messinfo_themkbdmcp", lst.data[0].result, "ok");
        }
        else
            messInfo("messinfo_themkbdmcp", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function validatechitietcp() {
    try {
        var p = getAllIdMod();
        if (p.cb_banmien_kbdmcp == '-1') return "Vui lòng chọn ban miền";
        if (p.cbvattu_kbdmcp == '-1') return "Vui lòng chọn vật tư thiết bị";
        if (p.cb_tenvt_kbdmcp == '-1') return "Vui lòng chưa chọn loại thiết bị";
        if (p.txt_slvttbcapphat_kbdm == '') return "Vui lòng nhập SL VTTB cấp phát sinh";
        if (p.txt_thoigiankhaibao_kbdmcp == '') return "Vui lòng nhập thời gian";
        if (p.txt_lydo_kbdm == '') return "Vui lòng nhập lý do";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function clear_chitietcp() {
    try {
        dthongtindinhmuc = 0;
        setValToTxt('cb_banmien_kbdmcp', '-1');
        setValToTxt('cbvattu_kbdmcp', '-1');
        setValToTxt('cb_tenvt_kbdmcp', '-1');
        setValToTxt('txt_slvttbcapphat_kbdm', '');
        setValToTxt('txt_thoigiankhaibao_kbdmcp', gettimenow());
        setValToTxt('txt_lydo_kbdm', '');

    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------

$("#btn_thoat_kbdm").click(function () {
    messInfo("messinfo_themkbdm", "", "error");
    messInfo("messinfo_themkbdm", "", "ok");
    clear_chitiet();
    $("#them_kbdm").modal("hide");
});
//------------------------------------------------------
function loadBanMienCP() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "result_loadbanmiencp", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadbanmiencp(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbvattu_kbdmcp", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cb_banmien_kbdmcp", data[1].kq1, "code", "name", "-1", "--Tất cả--");
     
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------

function loadTenThietBiCP(id) {
    try {
        try {
            var p = getAllIdMod();
            var config = { namesql: "TB_Import_LstLoadByCode", callback: "result_loadtenthietbicp", connstr: "ConnectEMS" };
            var para = { IsType: 'LoaiThietBi', Code: parseInt(id) };
            ExecuteServiceSyns(config, para, false);
        } catch (e) {
            console.log(e);
        }
       
    } catch (e) {
        console.log(e);
    }
}
function result_loadtenthietbicp(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cb_tenvt_kbdmcp", data, "code", "name", "-1", "--Chọn loại thiết bị--");
       
    } catch (e) {
        console.log(e);
    }
}

