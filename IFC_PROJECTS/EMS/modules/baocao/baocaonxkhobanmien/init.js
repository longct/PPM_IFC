
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datefrombh_baocaokbm', gettimenow());
        setValToTxt('txt_datetobh_baocaokbm', gettimenow());
        Loadcombox_baocaokbm();
        Loadtrangthai_baocaokbm('-1');
        Loadcombox_banmien();
        Loadloaithietbi_baocaokbm("-1");
        $("#cbvattutbi_baocaokbm").change(function () {
           
            var p = getAllIdMod();
            var value = $("#cbvattutbi_baocaokbm").val();
            Loadloaithietbi_baocaokbm(value);
        });
       
        $("#btnCapNhat_baocaokbm").click(function () {
            var check = checknull_baocaokbm();
            if (check != "") {    
                messInfo("messinfo_baocaokbm", check, "error");
                return;
            }
            LoadBCKHOBM(1);
        });
        $("#btnxuatexcel_baocaokbm").click(function () {
            XuatExcelKHOBM();
        });
    } catch (e) {
        console.log(e);
    }
});
// load trang thai
function Loadtrangthai_baocaokbm(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaokbm", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaokbm(config, para, lst) {
    try {
        dataToCob("cbtinhtrang_baocaokbm", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadbandau
function Loadcombox_baocaokbm() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_baocaokbm", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_baocaokbm(config, para, lst) {
    try {
        var data = lst.data;
        $("#cbvattutbi_baocaokbm").multiselect('destroy');
        dataToCob("cbvattutbi_baocaokbm", data[0].kq0, "code", "name", "", "");
        $('#cbvattutbi_baocaokbm').multiselect({
            includeSelectAllOption: true,
            enableFiltering: false,
            includeSelectAllOption: true,
            selectAllJustVisible: false,
            buttonWidth: '200px'
        });
       
    } catch (e) {
        console.log(e);
    }
}
function Loadcombox_banmien() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_banmien", connstr: "ConnectEMS" };
        var para = {
            Type: 'banmien',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_banmien(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkho_baocaokbm", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaokbm(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_Loadloaithietbi_baocaokbm", connstr: "ConnectEMS" };
        var vttb = value;
        if (vttb != '-1') {
            var TypeDeviceIdtb = "";
            $.each(vttb, function (key, val) {
                TypeDeviceIdtb += val + ',';
            });
        } else
            TypeDeviceIdtb = value;
        var para = { IsType: 'LoaiThietBiSelect', Code: TypeDeviceIdtb };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadloaithietbi_baocaokbm(config, para, lst) {
    try {
        var data = lst.data;
        $("#cbloaithietbi_baocaokbm").multiselect('destroy');
        dataToCob("cbloaithietbi_baocaokbm", data, "code", "name", "", "");
        $('#cbloaithietbi_baocaokbm').multiselect({
            includeSelectAllOption: true,
            enableFiltering: false,
            includeSelectAllOption: true,
            selectAllJustVisible: false,
            buttonWidth: '200px',
            maxHeight: 300,
        });

       

    } catch (e) {
        console.log(e);
    }
}

function checknull_baocaokbm() {
    try {
        var p = getAllIdMod();
       
        var compare = compareDates(timeyyyymmdd(p.txt_datefrombh_baocaokbm), timeyyyymmdd(p.txt_datetobh_baocaokbm));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function LoadBCKHOBM(page) {
    try {
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_KHOBANMIEN",
            callback: "f_result_bckhobanmien",
            connstr: "ConnectEMS"
        };
        var vttb = $("#cbvattutbi_baocaokbm").val();
        var TypeDeviceIdkmb = "";
        if (vttb != null && vttb !=undefined) {
            $.each(vttb, function (key, val) {
                TypeDeviceIdkmb += val + ',';
            });
        } else TypeDeviceIdkmb = "-1";

        var ltb = $("#cbloaithietbi_baocaokbm").val();
        var vendoridkmb = "";
        if (ltb != null && ltb != undefined) {
            $.each(ltb, function (key, val) {
                vendoridkmb += val + ',';
            });
        } else vendoridkmb = "-1";
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaokbm,
            ToDateTo: p.txt_datetobh_baocaokbm,
            Kho: p.cbkho_baocaokbm,
            TypeDeviceId: TypeDeviceIdkmb,
            VendorId: vendoridkmb,
            TrangThai: parseInt(p.cbtinhtrang_baocaokbm),
            pagenum: page,
            numrecs:20
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_bckhobanmien(config, para, lst) {
    try {
        $("#myTableData_baocaokbm").empty();
        if (lst == null || lst == undefined || lst =="[]") return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_baocaokbm", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaokbm", "", "error");

        var Count = 1;
       
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
                + val.tenvattu + "</td><td class='c'>"
                + val.donvitinh + "</td><td class='c'>"
                + SetNumbernull(val.tondkmt) + "</td><td class='c'>"
                + SetNumbernull(val.tondktht) + "</td><td class='c'>"
                + SetNumbernull(val.slnhapthnvmt) + "</td><td class='c'>"
                + SetNumbernull(val.slnhapthnvtht) + "</td><td class='c'>"
                + SetNumbernull(val.slthdienlucmt) + "</td><td class='c'>"
                + SetNumbernull(val.slthdienluctht) + "</td><td class='c'>"
                + SetNumbernull(val.nhapktmt) + "</td><td class='c'>"
                + SetNumbernull(val.nhapkttht) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatdienlucmt) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatdienluctht) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatnhanvienmt) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatnhanvientht) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatkhotongmt) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatkhotongtht) + "</td><td class='c'>"
                + SetNumbernull(val.tonckmt) + "</td><td class='c'>"
                + SetNumbernull(val.toncktht) + "</td></tr>";
            $("#myTableData_baocaokbm").append(row);
           

        });
        LoadPhanTrang("pageLst_qlkbm", "pageCurent_qlkbm", data, function () {
            LoadBCKHOBM($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
//set null number
function SetNumbernull(val) {
    try {
        if (val == null || val == 'null') {
            return '0';
        } else {
            return val;
        }
    } catch (e) {
        console.log(e);
    }
}
function XuatExcelKHOBM() {
    try {

        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_KHOBANMIEN",
            namefile: "baocaonxtkhobanmien",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var vttb = $("#cbvattutbi_baocaokbm").val();
        var TypeDeviceIdkmb = "";
        if (vttb != null && vttb != undefined) {
            $.each(vttb, function (key, val) {
                TypeDeviceIdkmb += val + ',';
            });
        } else TypeDeviceIdkmb = "-1";

        var ltb = $("#cbloaithietbi_baocaokbm").val();
        var vendoridkmb = "";
        if (ltb != null && ltb != undefined) {
            $.each(ltb, function (key, val) {
                vendoridkmb += val + ',';
            });
        } else vendoridkmb = "-1";
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaokbm,
            ToDateTo: p.txt_datetobh_baocaokbm,
            Kho: p.cbkho_baocaokbm,
            TypeDeviceId: TypeDeviceIdkmb,
            VendorId: vendoridkmb,
            pagenum: 1,
            numrecs: 200000
        };
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextCenter" },
               { field: "tenvattu", name: "Tên VTTB", type: "TextCenter" },
               { field: "donvitinh", name: "ĐVT", type: "TextCenter" },
               { field: "tondkmt", name: "Tồn ĐK mới tốt", type: "TextAndBoldCenter" },
               { field: "tondktht", name: "Tồn ĐK thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slnhapthnvmt", name: "TH từ NVLĐ mới tốt", type: "TextAndBoldCenter" },
               { field: "slnhapthnvtht", name: "TH từ NVLĐ thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slthdienlucmt", name: "TH từ ĐL mới tốt", type: "TextAndBoldCenter" },
               { field: "slthdienluctht", name: "TH từ ĐL thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "nhapktmt", name: "ĐCNB từ kho tổng mới tốt", type: "TextAndBoldCenter" },
               { field: "nhapkttht", name: "ĐCNB từ kho tổng thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slxuatdienlucmt", name: "Xuất thẳng ĐL mới tốt", type: "TextAndBoldCenter" },
               { field: "slxuatdienluctht", name: "Xuất thẳng ĐL thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slxuatnhanvienmt", name: "Xuất cho NV xử lý mới tốt", type: "TextAndBoldCenter" },
               { field: "slxuatnhanvientht", name: "Xuất cho NV xử lý thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slxuatkhotongmt", name: "Xuất ĐCNB trả KT mới tốt", type: "TextAndBoldCenter" },
               { field: "tonckmt", name: "Tồn CK mới tốt", type: "TextAndBoldCenter" },
               { field: "toncktht", name: "Tồn CK thu hồi tốt", type: "TextAndBoldCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}