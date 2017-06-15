$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        loaddatabase_chitiet();
        loadtable_chitiet();
        $("#btnCapNhat_tienichctlb").click(function () {
            var ckeck = validatechitiet();
            if (ckeck != "") {
                messInfo("messinfo_tienichctlb", ckeck, "error");
                return;
            }

            f_confimYesNo("Cập nhật chi tiết loại thiết bị?", "Bỏ qua", "Đồng ý", function () { f_addThemTBChoValue_tienichctltb(); });

        });

    } catch (e) { console.log(e); }
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
            HangHoaOrTBPhu: p.cbhanghoavttbphu_tienichctlb
        }
        console.log('hihihii');
        console.log(para);
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function result_chitietvalue(config, para, lst) {
    try{
        console.log(lst);
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_tienichctlb", "Cập nhật chi tiết loại thiết bị lỗi", "error");
            return;
        }
        console.log(lst.data[0].result);
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("messinfo_tienichctlb", lst.data[0].result, "ok");
            clear_chitiet();
        }
        else
            messInfo("messinfo_nhaptay", lst.data[0].result, "error");
       // (lst.data[0].result.toLowerCase().indexOf("thành công") > 0)

    } catch (e) {
        console.log(e);
    }
}
function validatechitiet() {
    try {
        var p = getAllIdMod();
        if (p.cb_nhacungcap_tienichctlb == '-1') return "Ban chưa chọn nhà cung cấp";
        if (p.cb_loaitb_tienichctlb == '-1') return "Bạn chưa chọn loại thiết bị";
        if (p.txtmavattu_tienichctlb == '') return "Không được  để mã vật tư trống";
        if (p.txttenvatu_tienichctlb == '') return "Không được để tên mã vật tư trống";
        if (p.txthangvattu_tienichctlb == '') return "Không được để hãng vật tư trống";
        if (p.txtdonvitinh_tienichctlb == '') return "Không được để đơn vị tính tư trống";
        if (p.cbchitietsoluong_tienichctlb == '-1') return "Bạn chưa chọn mã vật tư";
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
        setValToTxt('cbchitietsoluong_tienichctlb', '-1');
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
        dataToCob("cb_nhacungcap_tienichctlb", data[3].kq3, "code", "name", "-1", "--Chọn nhà cung cấp-");
    } catch (e) {
        console.log(e);
    }
}

function loadtable_chitiet() {
    try {
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadByCode_chitiet", connstr: "ConnectEMS" };
        var para = {
            IsType: 'ChiTietThietBi',
            Code: 0
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadByCode_chitiet(config, para, lst) {
    try {
        var data = lst.data;

        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_tienichctlb", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_tienichctlb", "", "error");

        var Count =1;
        $("#myTableData_nhapchitiettb").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + Count++ + "</td><td>"
                + val.typedevicename + "</td><td>"
                + SetValnull(val.typedevicename1) + "</td><td>"
                + SetValnull(val.mavattu) + "</td><td>"
                + SetValnull(val.tenvattu) + "</td><td>"
                + SetValnull(val.hangvattu) + "</td><td>"
                + SetValnull(val.donvitinh) + "</td><td>"
                + SetValnull(val.typedetailorcount) + "</td><td>"
                + SetValnull(val.inserteddate) + "</td></tr>";
            $("#myTableData_nhapchitiettb").append(row);
        });
        
    } catch (e) {
        console.log(e);
    }
}


