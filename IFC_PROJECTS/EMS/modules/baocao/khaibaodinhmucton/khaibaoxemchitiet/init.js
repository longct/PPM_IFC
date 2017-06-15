
$(document).ready(function () {
    try {
        $("#btn_thoat_kbdmct").click(function () {
            $("#xemchitiet_kbdm").modal("hide");
        });
    } catch (e) {
        console.log(e);
    }

});

function LoadThongTinChiTietKBDMCP(id) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_KH_DinhMuc_LoadXemChiTiet", callback: "fn_tb_dinhmuc_loadxemchitiet", connstr: "ConnectEMS" };
        var para = {
           id:id
        };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function fn_tb_dinhmuc_loadxemchitiet(config, para, lst) {
    try {
        $("#myTableData_ct").empty();
        var p = getAllIdMod();
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data[0].kq0;
        if(data.length > 0)
        {
            $("#cb_banmien_kbdmct").val(data[0].banmien);
            $("#txt_slvttbduphong_kbdmct").val(data[0].sldp);
            $("#txt_slngay_kbdmct").val(data[0].thoidiemkb);
            $("#cbvattu_kbdmct").val(data[0].typedevicename);
            $("#cb_tenvt_kbdmct").val(data[0].tenvattu);
            $("#txt_ghichu_kbdmct").val(data[0].ghichu);
            $("#txt_dmttt_kbdmct").val(data[0].dinhmucttt);
            $("#txt_dmttd_kbdmct").val(data[0].dinhmucttd);
        }
        var data1 = lst.data[1].kq1;
        if (data1.length > 0) {
            
            $.each(data1, function (key, val) {
                var row = "<tr><td>" +
                           val.stt + "</td> <td>" +
                           val.slcp + "</td> <td>" +
                           val.thoidiemkb + "</td> <td>" +
                           val.lydo + " </td></tr>";
                $("#myTableData_ct").append(row);
            });
        }
    } catch (e) {
        console.log(e);
    }
}
