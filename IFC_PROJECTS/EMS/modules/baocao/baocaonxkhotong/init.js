
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datefrombh_baocaobp', gettimenow());
        setValToTxt('txt_datetobh_baocaobp', gettimenow());
        Loadcombox_baocaobp();
        Loadtrangthai_baocaobp('-1');
        $("#cbvattutbi_baocaobp").change(function () {
            var p = getAllIdMod();
            var value = p.cbvattutbi_baocaobp;
            Loadloaithietbi_baocaobp(value);
        });
       
        $("#btnCapNhat_baocaobp").click(function () {
            var check = checknull_baocaobp();
            if (check != "") {    
                messInfo("messinfo_baocaobp", check, "error");
                return;
            }
            LoadBCKHOBOPHAN(1);
        });
        $("#btnxuatexcel_baocaobp").click(function () {
            XuatExcelKHOBOPHAN();
        });
    } catch (e) {
        console.log(e);
    }
});
// load trang thai
function Loadtrangthai_baocaobp(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaobp", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaobp(config, para, lst) {
    try {
        dataToCob("cbtinhtrang_baocaobp", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadbandau
function Loadcombox_baocaobp() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_baocaobp", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_baocaobp(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutbi_baocaobp", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cbkho_baocaobp", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaobp(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_Loadloaithietbi_baocaobp", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadloaithietbi_baocaobp(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaobp", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function checknull_baocaobp() {
    try {
        var p = getAllIdMod();
       
        var compare = compareDates(timeyyyymmdd(p.txt_datefrombh_baocaobp), timeyyyymmdd(p.txt_datetobh_baocaobp));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function LoadBCKHOBOPHAN(page) {
    try {
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_KHOBOPHAN",
            callback: "f_result_bckhobophan",
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaobp,
            ToDateTo: p.txt_datetobh_baocaobp,
            Kho: p.cbkho_baocaobp,
            TypeDeviceId:parseInt( p.cbvattutbi_baocaobp),
            VendorId: parseInt(p.cbloaithietbi_baocaobp),
            TrangThai: parseInt(p.cbtinhtrang_baocaobp),
            pagenum: page,
            numrecs:20
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_bckhobophan(config, para, lst) {
    try {
        $("#myTableData_baocaobp").empty();
        
        if (lst == null || lst == undefined || lst =="[]") return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_baocaobp", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaobp", "", "error");

        var Count = 1;
      
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
                + val.tenvattu + "</td><td class='c'>"
                + val.donvitinh + "</td><td class='c'>"
                + SetNumbernull(val.tondkmt) + "</td><td class='c'>"
                + SetNumbernull(val.tondktht) + "</td><td class='c'>"
                + SetNumbernull(val.nhapktmt) + "</td><td class='c'>"
                + SetNumbernull(val.nhapkttht) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoikhotongmt) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoikhotongtht) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatkhoxulymt) + "</td><td class='c'>"
                + SetNumbernull(val.slxuatkhoxulytht) + "</td><td class='c'>"
                + SetNumbernull(val.tonckmt) + "</td><td class='c'>"
                + SetNumbernull(val.toncktht) + "</td></tr>";
            $("#myTableData_baocaobp").append(row);
           

        });
        LoadPhanTrang("pageLst_qlbp", "pageCurent_qlbp", data, function () {
            LoadBCKHOBOPHAN($("#pagenumber").val());
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
function XuatExcelKHOBOPHAN() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_KHOBOPHAN",
            namefile: "baocaonxtkhobophan",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaobp,
            ToDateTo: p.txt_datetobh_baocaobp,
            Kho: p.cbkho_baocaobp,
            TypeDeviceId: parseInt(p.cbvattutbi_baocaobp),
            VendorId: parseInt(p.cbloaithietbi_baocaobp),
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
               { field: "nhapktmt", name: "Nhập ĐCNB từ KT mới tốt", type: "TextAndBoldCenter" },
               { field: "nhapkttht", name: "Nhập ĐCNB từ KT thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoikhotongmt", name: "Xuất ĐCNB trả KT mới tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoikhotongtht", name: "Xuất ĐCNB trả KT thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slxuatkhoxulymt", name: "Xuất sang kho xử lý mới tốt", type: "TextAndBoldCenter" },
               { field: "slxuatkhoxulytht", name: "Xuất sang kho xử lý thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "tonckmt", name: "Tồn CK mới tốt", type: "TextAndBoldCenter" },
               { field: "toncktht", name: "Tồn CK thu hồi tốt", type: "TextAndBoldCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}