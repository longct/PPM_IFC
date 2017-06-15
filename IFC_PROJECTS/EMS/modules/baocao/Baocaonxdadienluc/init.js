
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datefrombh_baocaodadl', gettimenow());
        setValToTxt('txt_datetobh_baocaodadl', gettimenow());
        Loadcombox_baocaokhonxdadl();
        Loadcomboxbckho_baocaonxdadl();
        Loadtrangthai_baocaonxdadl('-1');
        $("#cbvattutbi_baocaonxdl").change(function () {
            var p = getAllIdMod();
            var value = p.cbvattutbi_baocaonxdl;
            Loadloaithietbi_baocaonxdl(value);
        });
        $("#cbkho_baocaonxdl").change(function () {
            var p = getAllIdMod();
            var value = p.cbkho_baocaonxdl;
            loadduan_baocaonxdadl(value);
          
            loaddienluc_baocaonxda(value);
            Loadtrangthai_baocaonxdadl(value);
        });
        $("#btnCapNhat_baocaonxdadl").click(function () {
            var check = checknull_baocaonxdadl();
            if (check != "") {    
                messInfo("messinfo_baocaonxdadl", check, "error");
                return;
            }
            LoadBCNXTDUNANDL(1);
        });
        $("#btnxuatexcel_baocaodadl").click(function () {
            XuatExcelDADL();
        });
    } catch (e) {
        console.log(e);
    }
});
// load trang thai
function Loadtrangthai_baocaonxdadl(value) {
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
        dataToCob("cbtinhtrang_baocaonxda", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadbandau
function Loadcombox_baocaokhonxdadl() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_baocaokhonxdadl", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_baocaokhonxdadl(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutbi_baocaonxdl", data[0].kq0, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaonxdl(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_Loadloaithietbi_baocaonxdadl", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadloaithietbi_baocaonxdadl(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaonxtb", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}
//load banmien

function Loadcomboxbckho_baocaonxdadl() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_banmien_nxda", connstr: "ConnectEMS" };
        var para = {
            Type: 'banmien',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_banmien_nxda(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkho_baocaonxdl", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load điện lực
function loaddienluc_baocaonxda(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_baocaonxda", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDienluc', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_baocaonxda(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == '[]') return;
        var data = lst.data;
        $("#cbdienluc_baocaonxdl").empty();
        $("#cbdienluc_baocaonxdl").append("<option value='-1' data-code='-1'>--Tất cả---</option");
        $.each(data, function (index, val) {
            var option = "<option value='" + val.code + "' data-code='" + val.codevirtual + "'>"
                        + val.name
                        + "</option>";
            $("#cbdienluc_baocaonxdl").append(option);
        });
    } catch (e) {
        console.log(e);
    }
}
//load du an
function loadduan_baocaonxdadl(value) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_baocaokho(config, para, lst) {
    try {
        dataToCob("cbduan_baocaonxda", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}


function checknull_baocaonxdadl() {
    try {
        var p = getAllIdMod();
       
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaokho), timeyyyymmdd(p.txt_dateto_baocaokho));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function LoadBCNXTDUNANDL(page) {
    try {
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_DUANDIENLUC",
            callback: "f_result_bcnxdadienluc",
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaodadl,
            ToDateTo: p.txt_datetobh_baocaodadl,
            Kho: p.cbkho_baocaonxdl,
            Khobp: p.cbdienluc_baocaonxdl,
            TypeDeviceId:parseInt( p.cbvattutbi_baocaonxdl),
            VendorId: parseInt(p.cbloaithietbi_baocaonxtb),
            ProjectId: parseInt(p.cbduan_baocaonxda),
            TrangThai: parseInt(p.cbtinhtrang_baocaonxda),
            pagenum: page,
            numrecs:20
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_bcnxdadienluc(config, para, lst) {
    try {
        $("#myTableData_baocaonxdadl").empty();
        if (lst == null || lst == undefined || lst =="[]") return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_baocaonxdadl", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaonxdadl", "", "error");

        var Count = 1;
       
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
                + val.tenvattu + "</td><td class='c'>"
                + val.donvitinh + "</td><td class='c'>"
                + SetNumbernull(val.tondkmt) + "</td><td class='c'>"
                + SetNumbernull(val.tondktht) + "</td><td class='c'>"
                + SetNumbernull(val.slnhapkbmmt) + "</td><td class='c'>"
                + SetNumbernull(val.slnhapkbmtht) + "</td><td class='c'>"
                + SetNumbernull(val.slnhapnhanvienmt) + "</td><td class='c'>"
                + SetNumbernull(val.slnhapnhanvientht) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoikbmmt) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoikbmtht) + "</td><td class='c'>"
               + SetNumbernull(val.slthuhoinhanvienmt) + "</td><td class='c'>"
                + SetNumbernull(val.slthuhoinhanvientht) + "</td><td class='c'>"
                + SetNumbernull(val.tonckmt) + "</td><td class='c'>"
                + SetNumbernull(val.toncktht) + "</td></tr>";
            $("#myTableData_baocaonxdadl").append(row);
           

        });
        LoadPhanTrang("pageLst_qldadl", "pageCurent_qldadl", data, function () {
            LoadBCNXTDUNANDL($("#pagenumber").val());
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
function XuatExcelDADL() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_DUANDIENLUC",
            namefile: "baocaonxtkhodienluc",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaodadl,
            ToDateTo: p.txt_datetobh_baocaodadl,
            Kho: p.cbkho_baocaonxdl,
            Khobp: p.cbdienluc_baocaonxdl,
            TypeDeviceId: parseInt(p.cbvattutbi_baocaonxdl),
            VendorId: parseInt(p.cbloaithietbi_baocaonxtb),
            ProjectId: parseInt(p.cbduan_baocaonxda),
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
               { field: "slnhapkbmmt", name: "Nhập từ KBM mới tốt", type: "TextAndBoldCenter" },
               { field: "slnhapkbmtht", name: "Nhập từ KBM thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slnhapnhanvienmt", name: "Nhập từ NVLĐ mới tốt", type: "TextAndBoldCenter" },
               { field: "slnhapnhanvientht", name: "Nhập từ NVLĐ thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoikbmmt", name: "KBM thu hồi trực tiếp ĐL mới tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoikbmtht", name: "KBM thu hồi trực tiếp ĐL thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoinhanvienmt", name: "NVLĐ thu hồi từ ĐL trả về KBM mới tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoinhanvientht", name: "NVLĐ thu hồi từ ĐL trả về KBM thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "tonckmt", name: "Tồn CK mới tốt", type: "TextAndBoldCenter" },
               { field: "toncktht", name: "Tồn CK thu hồi tốt", type: "TextAndBoldCenter" },
              
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}