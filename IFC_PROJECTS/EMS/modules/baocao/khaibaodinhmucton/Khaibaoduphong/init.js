var dthongtindinhmuc = 0;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
       
        $("#txt_thoigiankhaibao_kbdm").val(gettimenow());
        loadBanMien();
        $("#cbvattu_kbdm").change(function () {
            loadTenThietBi($(this).val());
        });
        $("#cb_tenvt_kbdm").change(function () {
            LoadCheck();
        });
        $("#btn_checkluu_themkbdm").click(function () {
            LoadCheck();
            var check = validatechitiet();
            if (check != "") {
                messInfo("messinfo_themkbdm", check, "error");
                return;
            }
          
            addThem_KBDM();
        });
    } catch (e) {
        console.log(e);
    }

});
function LoadCheck() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_KH_DinhMuc_CheckKB", callback: "fn_tb_dinhmuc_checkb", connstr: "ConnectEMS" };
        var para = {
            StockCode: p.cb_banmien_kbdm,
            VendorId: p.cb_tenvt_kbdm
        };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

function fn_tb_dinhmuc_checkb(config, para,lst) {
    try {
        messInfo("messinfo_themkbdm", "", "error");
        $("#btn_checkluu_themkbdm").removeAttr("disabled");
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        if (lst.data[0].result.length > 0) {
            messInfo("messinfo_themkbdm", lst.data[0].result, "error");
            $("#btn_checkluu_themkbdm").attr("disabled", true);
            return;
        }
    } catch (e) {
        console.log(e);
    }
}
function addThem_KBDM() {
    try {
        var p = getAllIdMod();
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Lis_ADD_KBDM", callback: "result_add_kbdm", connstr: "ConnectEMS" };
        var para = {
            UserId:user.userid,
            StockCode: p.cb_banmien_kbdm,
            VendorId: p.cb_tenvt_kbdm,
            DinhMucToiDa: parseInt(p.txt_dmttd_kbdm),
            DinhMucToiThieu: parseInt(p.txt_dmttt_kbdm),
            SLDuPhong: parseInt(p.txt_slvttbduphong_kbdm),
            GhiChu: p.txt_ghichu_kbdm,
            ID: dthongtindinhmuc
        };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function result_add_kbdm(config, para, lst) {
    try {

        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_themkbdm", "lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            if (dthongtindinhmuc == 0) {
                clear_chitiet();
            }
            messInfo("messinfo_themkbdm", lst.data[0].result, "ok");
            loadtable_chitiet();
        }
        else
            messInfo("messinfo_themkbdm", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function validatechitiet() {
    try {
        var p = getAllIdMod();
        if (p.cb_banmien_kbdm == '-1') return "Vui lòng chọn ban miền";
        if (p.cbvattu_kbdm == '-1') return "Vui lòng chọn vật tư thiết bị";
        if (p.cb_tenvt_kbdm == '-1') return "Vui lòng chưa chọn loại thiết bị";
        if (p.txt_dmtth_kbdm == '') return "Vui lòng nhập định mức tối thiểu";
        if (p.txt_dmttd_kbdm == '') return "Vui lòng nhập định mức tối đa";
        if (p.txt_slvttbduphong_kbdm == '') return "Vui lòng nhập SL VTTB dự phòng/tháng";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function clear_chitiet() {
    try {
        dthongtindinhmuc = 0;
        setValToTxt('cb_banmien_kbdm', '-1');
        setValToTxt('cbvattu_kbdm', '-1');
        setValToTxt('cb_tenvt_kbdm', '-1');
        setValToTxt('txt_dmttt_kbdm', '');
        setValToTxt('txt_dmttd_kbdm', '');
        setValToTxt('txt_slvttbduphong_kbdm', '');
        setValToTxt('txt_ghichu_kbdm', '');
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function loadthongtin_kbdm(val) {
    try {
        dthongtindinhmuc = parseInt(val);
        var config = { namesql: "TB_khaibao_dinhmuc", callback: "result_loadthongtin_kbdm", connstr: "ConnectEMS" };
        var para = {
            ID: val
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthongtin_kbdm(config, para, lst) {
    try {
       
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data.length == 0 || data == undefined) return;
        loadTenThietBi(data[0].typedeviceid);
        $("#cb_banmien_kbdm").val(data[0].stockcode);
        $("#cbvattu_kbdm").attr("data_id", data[0].typedeviceid);
        $("#cbvattu_kbdm").val(data[0].typedeviceid);
        $("#cb_tenvt_kbdm").attr("data_id", data[0].vendorid);
        $("#txt_dmttt_kbdm").val(data[0].dinhmucttt);
        $("#txt_dmttd_kbdm").val(data[0].dinhmucttd);
        $("#txt_slvttbduphong_kbdm").val(data[0].sldp);
        $("#txt_ghichu_kbdm").val(data[0].ghichu);
        
    } catch (e) {
        console.log(e);
    }
}
$("#btn_thoat_kbdm").click(function () {
    messInfo("messinfo_themkbdm", "", "error");
    messInfo("messinfo_themkbdm", "", "ok");
    clear_chitiet();
    $("#them_kbdm").modal("hide");
});
//------------------------------------------------------
function loadBanMien() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "result_loadbanmien", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadbanmien(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbvattu_kbdm", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cb_banmien_kbdm", data[1].kq1, "code", "name", "-1", "--Tất cả--");
     
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------

function loadTenThietBi(id) {
    try {
        try {
            var p = getAllIdMod();
            var config = { namesql: "TB_Import_LstLoadByCode", callback: "result_loadtenthietbi", connstr: "ConnectEMS" };
            var para = { IsType: 'LoaiThietBi', Code: parseInt(id) };
            ExecuteServiceSyns(config, para, false);
        } catch (e) {
            console.log(e);
        }
       
    } catch (e) {
        console.log(e);
    }
}
function result_loadtenthietbi(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cb_tenvt_kbdm", data, "code", "name", "-1", "--Chọn loại thiết bị--");
        if( $("#cb_tenvt_kbdm").attr("data_id") !=undefined)
            $("#cb_tenvt_kbdm").val( $("#cb_tenvt_kbdm").attr("data_id"));
    } catch (e) {
        console.log(e);
    }
}

