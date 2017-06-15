
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datetobh_baocaokho', gettimenow());
        Loadcombox_baocaokho();
        Loadcomboxbckho_baocaokho();
        $("#cbvattutbi_baocaokho").change(function () {
            var p = getAllIdMod();
            var value = p.cbvattutbi_baocaokho;
            Loadloaithietbi_baocaokho(value);
        });
        $("#cbkho_baocaokho").change(function () {
            var p = getAllIdMod();
            var value = p.cbkho_baocaokho;
            loadduan_baocaokho(value);
            Loadtrangthai_baocaokho(value);
        });

    } catch (e) {
        console.log(e);
    }
});
//loadbandau
function Loadcombox_baocaokho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaokho", connstr: "ConnectEMS" };
        var para = {
            Type: 'VTTB',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaokho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutbi_baocaokho", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaokho(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaokho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaokho", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}
//load banmien
function Loadcomboxbckho_baocaokho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));

        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadcomboxkho_baocaokho", connstr: "ConnectEMS" };
        var para = {
            IsType: 'BCLoadKhoXuat',
            Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcomboxkho_baocaokho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkho_baocaokho", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load du an
function loadduan_baocaokho(value) {
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
        dataToCob("cbduan_baocaokho", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// load trang thai
function Loadtrangthai_baocaokho(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaokho(config, para, lst) {
    try {
        dataToCob("cbtrangthai_baocaokho", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

//loadnhanvien
function Loadmanhanvien_baocaokho(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_manhanvien_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_manhanvien_baocaokho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbnhanvien_baocaokho", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function checknull_baocaokho() {
    try {
        var p = getAllIdMod();
        if (p.cbvattutb_baocaokho == '-1') return "Bạn chưa chọn vật tư thiết bị";
        if (p.cbkhoxuat_baocaokho == '-1') return "Bạn chưa chọn kho ";
        if (p.cbnhaccap_baocaokho == '-1') return "Bạn chưa chọn nhà cung cấp";
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaokho), timeyyyymmdd(p.txt_dateto_baocaokho));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}
