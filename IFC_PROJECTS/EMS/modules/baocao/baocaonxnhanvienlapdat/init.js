
$(document).ready(function () {
    try {

        loadConetent();
        loadInitDate();
        setValToTxt('txt_datefrombh_baocaonvld', getfirsttime());
        setValToTxt('txt_datetobh_baocaonvld', gettimenow());
        Loadcombox_baocaonvld();
        Loadtrangthai_baocaonvld('-1');
        LoadKho_baocaonvld();
        $("#cbkho_baocaonvld").change(function () {
            LoadNhanVien_baocaonvld();
        });
        $("#cbvattutbi_baocaonvld").change(function () {
            var value =$("#cbvattutbi_baocaonvld").val();
            Loadloaithietbi_baocaonvld(value);
        });
        
        $("#btnCapNhat_baocaonvld").click(function () {
            var check = checknull_baocaonvld();
            if (check != "") {    
                messInfo("messinfo_baocaonvld", check, "error");
                return;
            }
            LoadBCNHANVIENLD(1);
        });
        $("#btnxuatexcel_baocaonvld").click(function () {
            XuatExcelNhanVienLD();
        });
    } catch (e) {
        console.log(e);
    }
});
// load trang thai
function Loadtrangthai_baocaonvld(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaonvld", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaonvld(config, para, lst) {
    try {
        dataToCob("cbtinhtrang_baocaonvld", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadbandau
function Loadcombox_baocaonvld() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_baocaonvld", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_baocaonvld(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutbi_baocaonvld", data[0].kq0, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load kho bam mien
function LoadKho_baocaonvld() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_BCLoadKhoBanMien", connstr: "ConnectEMS" };
        var para = {
           	IsType:'BCLoadKhoBanMien',
	        Code:'-1'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_BCLoadKhoBanMien(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbkho_baocaonvld", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load nhan viên
function LoadNhanVien_baocaonvld() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_manhanvien_baocaonvld", connstr: "ConnectEMS" };
        var para = {
            TypeExport: '-1',
            UserId: userInfo.userid,
            Code: $("#cbkho_baocaonvld").val(),
            IsType: 'LoadNhanVienLapDat'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_manhanvien_baocaonvld(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbnhanvien_baocaonvld", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

//loadloaithietbi
function Loadloaithietbi_baocaonvld(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_Loadloaithietbi_baocaonvld", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadloaithietbi_baocaonvld(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaonvld", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function checknull_baocaonvld() {
    try {
        var p = getAllIdMod();
       
        var compare = compareDates(timeyyyymmdd(p.txt_datefrombh_baocaonvld), timeyyyymmdd(p.txt_datetobh_baocaonvld));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function LoadBCNHANVIENLD(page) {
    try {
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_NHANVIENLAPDAT",
            callback: "f_result_bcnvlapdat",
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaonvld,
            ToDateTo: p.txt_datetobh_baocaonvld,
            Kho: p.cbkho_baocaonvld,
            TypeDeviceId:parseInt( p.cbvattutbi_baocaonvld),
            VendorId: parseInt(p.cbloaithietbi_baocaonvld),
            TrangThai: parseInt(p.cbtinhtrang_baocaonvld),
            NhanVienId:parseInt(p.cbnhanvien_baocaonvld),
            pagenum: page,
            numrecs:20
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_bcnvlapdat(config, para, lst) {
    try {
        $("#myTableData_baocaonvld").empty();
        if (lst == null || lst == undefined || lst =="[]") return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_baocaonvld", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaonvld", "", "error");

        var Count = 1;
       
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
                + val.tenvattu + "</td><td class='c'>"
                + val.donvitinh + "</td><td class='c'>"
                + SetNumbernull(val.tondkmt) + "</td><td class='c'>"
                + SetNumbernull(val.tondktht) + "</td><td class='c'>"
                + SetNumbernull(val.sldcnbkhobanmienxuatmt) + "</td><td class='c'>"
                + SetNumbernull(val.sldcnbkhobanmienxuattht) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoinvkbmmt) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoinvkbmtht) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatdienlucmt) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatdienluctht) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoinvdlkbmmt) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoinvdlkbmtht) + "</td><td class='c'>"
                + SetNumbernull(val.tonckmt) + "</td><td class='c'>"
                + SetNumbernull(val.toncktht) + "</td></tr>";
            $("#myTableData_baocaonvld").append(row);
           

        });
        LoadPhanTrang("pageLst_qlnvld", "pageCurent_qlnvld", data, function () {
            LoadBCNHANVIENLD($("#pagenumber").val());
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
function XuatExcelNhanVienLD() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_NHANVIENLAPDAT",
            namefile: "baocaonxtnhanvienlapdat",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaonvld,
            ToDateTo: p.txt_datetobh_baocaonvld,
            Kho: p.cbkho_baocaonvld,
            Khobp: p.cbdienluc_baocaonvld,
            TypeDeviceId: parseInt(p.cbvattutbi_baocaonvld),
            VendorId: parseInt(p.cbloaithietbi_baocaonvld),
            ProjectId: parseInt(p.cbloaithietbi_baocaonvld),
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
               { field: "sldcnbkhobanmienxuatmt", name: "ĐCNB từ KBM mới tốt", type: "TextAndBoldCenter" },
               { field: "sldcnbkhobanmienxuattht", name: "ĐCNB từ KBM thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoinvkbmmt", name: "ĐCNB trả KBM mới tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoinvkbmtht", name: "ĐCNB trả KBM thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slxuatdienlucmt", name: "Xuất xuống điện lực mới tốt", type: "TextAndBoldCenter" },
               { field: "slxuatdienluctht", name: "Xuất xuống điện lực thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "tonckmt", name: "Tồn CK mới tốt", type: "TextAndBoldCenter" },
               { field: "toncktht", name: "Tồn CK thu hồi tốt", type: "TextAndBoldCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}