var dthongtinvattu = 0;
$(document).ready(function () {
    try {
      
        loaddatabase_chitiet();
        $("#btn_checkluu_suavatt").click(function () {
            var ckeck = validatechitiet();
            if (ckeck != "") {
                messInfo("messinfo_tenvattu", ckeck, "error");
                return;
            }

             f_addThemTBChoValue_tienichctltb();

        });
    } catch (e) {
        console.log(e);
    }

});
function f_addThemTBChoValue_tienichctltb() {
    try {
        
        var p = getAllIdMod();
        var config = { namesql: "TB_Lis_InsertVendor", callback: "result_chitietvalue", connstr: "ConnectEMS" };
        var para = {
            MaVatTu: p.txtmavattu_tienichctlb,
            TenVatTu: p.txttenvatu_tienichctlb,
            HangVatTu: p.txthangvattu_tienichctlb,
            DonViTinh: p.txtdonvitinh_tienichctlb,
            TypeDeviceId: p.cb_loaitb_tienichctlb,
            IdNhaCungCap: p.cb_nhacungcap_tienichctlb,
            HangHoaOrTBPhu: p.cbhanghoavttbphu_tienichctlb,
            VendorId: dthongtinvattu
        }

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function result_chitietvalue(config, para, lst) {
    try {

        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_tenvattu", "Cập nhật chi tiết loại thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            if (dthongtinvattu==0) {
                clear_chitiet();
            }
            messInfo("messinfo_tenvattu", lst.data[0].result, "ok");
            loadtable_chitiet();
        }
        else
            messInfo("messinfo_tenvattu", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}
function validatechitiet() {
    try {
        var p = getAllIdMod();
        if (p.cb_loaitb_tienichctlb == '-1') return "Bạn chưa chọn loại thiết bị";
        if (p.cb_nhacungcap_tienichctlb == '-1') return "Ban chưa chọn nhà cung cấp";
        if (p.txtmavattu_tienichctlb == '') return "Vui lòng nhập mã vật tư";
        if (p.txttenvatu_tienichctlb == '') return "Vui lòng nhập tên vật tư";
        if (p.txtdonvitinh_tienichctlb == '') return "Vui lòng chọn đơn vị tính";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function clear_chitiet() {
    try {
        setValToTxt('cb_nhacungcap_tienichctlb', '-1');
        setValToTxt('cb_loaitb_tienichctlb', '-1');
        setValToTxt('txtmavattu_tienichctlb', '');
        setValToTxt('txttenvatu_tienichctlb', '');
        setValToTxt('txthangvattu_tienichctlb', '');
        setValToTxt('txtdonvitinh_tienichctlb', '');
        setValToTxt('cbhanghoavttbphu_tienichctlb', '-1');
        $("#txtmavattu_tienichctlb").removeAttr("disabled");
        dthongtinvattu = 0;
    } catch (e) {
        console.log(e);
    }
}
function loaddatabase_chitiet() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_chitiet", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_chitiet(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_loaitb_tienichctlb", data[0].kq0, "code", "name", "-1", "--Chọn loại thiết bị-");
        dataToCob("cb_nhacungcap_tienichctlb", data[4].kq4, "code", "name", "-1", "--Chọn nhà cung cấp-");
    } catch (e) {
        console.log(e);
    }
}

function  loadthongtinvatu(val) {
    try {
        $(".modal-title").html("Cập nhật loại thiết bị");
        dthongtinvattu =parseInt(val);
        var config = { namesql: "TB_vattuthietbi", callback: "f_result_loadthongtinvatu", connstr: "ConnectEMS" };
        var para = {
            ID : val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtinvatu(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data.length == 0 || data == undefined) return;
        $("#cb_loaitb_tienichctlb").val(data[0].typedeviceid);
        $("#cb_nhacungcap_tienichctlb").val(data[0].idnhacungcap);
        $("#txtmavattu_tienichctlb").val(data[0].mavattu);
        $("#txttenvatu_tienichctlb").val(data[0].tenvattu);
        $("#txthangvattu_tienichctlb").val(data[0].hangvattu);
        $("#txtdonvitinh_tienichctlb").val(data[0].donvitinh);
        $("#cbhanghoavttbphu_tienichctlb").val(data[0].hanghoaortbphu);
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        console.log("userInfo.code.length"+userInfo.code.length)
        if (userInfo.code.length == 4) {
            $("#txtmavattu_tienichctlb").removeAttr("disabled");
        } else
            $("#txtmavattu_tienichctlb").attr("disabled", "disabled");
           
    } catch (e) {
        console.log(e);
    }
}
$("#btn_thoatvttb").click(function () {
    messInfo("messinfo_tenvattu", "", "error");
    messInfo("messinfo_tenvattu", "", "ok");
    clear_chitiet();
    $("#sua_ttvattu").modal("hide");
});



