var dataReportXuat = "";
var tungay_rb_th = "";
var dengay_rb_th = "";
var dataXuatExcel_bctht = null;
var dataXuatHeader_bctht = null;
var dataXuatHeader_bcthbm = null;
var dataXuatHeader_bcthnv = null;
$(document).ready(function () {
    try {

        loadInitDate();
        setValToTxt('txt_datefrom_baocaoth', gettimenow());
        setValToTxt('txt_dateto_baocaoth', gettimenow());
        LoadComBox_KhoTong_bcxth();
        f_comboboxdisableth();
        Loadtrangthai_baocaoth('-1');
        $("#cbkhotong_baocaoth").change(function () {
            
            LoadComBox_BanMien_Baocaoth();
            Loadmanhanvien_baocaoth($("#cbkhotong_baocaoth").val());
            loadduan_baocaoth($("#cbkhotong_baocaoth").val());
        });
        $("#cbbamien_baocaoth").change(function () {
            Loadmanhanvien_baocaoth($("#cbbamien_baocaoth").val());
        });
        $("#cbvattutb_baocaoth").change(function () {
            var value = $("#cbvattutb_baocaoth").val();
            Loadloaithietbi_baocaoth(value);
        });
        $("#btnCapNhat_baocaoth").click(function () {
            messInfo("messinfo_baocaoth", "", "error");
            var check = checknull_baocaoth();
            if (check != "") {
                clear_th();
                messInfo("messinfo_baocaoth", check, "error");
                return;
            }

            if ($("#tongquan_baocaoth").prop('checked')) {
                if ($("#cbbamien_baocaoth").val() != "-1") {
                    f_layDuLieu_baocaoth("TB_BAOCAO_THUHOI_TONGQUANTHEOBANMIEN", "f_resultLayDuLieu_baocaoth");
                } else {
                    f_layDuLieu_baocaoth("TB_BAOCAO_THUHOI_TONGQUAN", "f_resultLayDuLieu_baocaoth");
                }

            }
            else if ($("#banmien_baocaoth").prop('checked')) {

                if ($("#cbbamien_baocaoth").val() != "-1" && $("#cbnhanvien_baocaoth").val() == "-1") {
                    f_layDuLieu_dienluc_baocaoth("TB_BAOCAO_THUHOI_KHOBANMIEN", "f_resultLayDuLieu_baocaoth_banmien");
                }
                if ($("#cbbamien_baocaoth").val() != "-1" && $("#cbnhanvien_baocaoth").val() != "-1" ) {
                    f_layDuLieu_dienluc_baocaoth("TB_BAOCAO_THUHOI_NHANVIENVEMIEN", "f_resultLayDuLieu_baocaoth_banmien");
                }
               
            }
            else if ($("#lapdat_baocaoth").prop('checked')) {
                f_layDuLieu_baocaoth("TB_BAOCAO_THUHOI_DIENLUCVENHANVIEN", "f_resultLayDuLieu_baocaoth_lapdat");
            }

        });
      
        $("#btnxuatexecl_baocaoth").click(function () {
            messInfo("messinfo_baocaoth", "", "error");
            var check = checknull_baocaoth();
            if (check != "") {
                clear_th();
                messInfo("messinfo_baocaoth", check, "error");
                return;
            }
            if ($("#tongquan_baocaoth").prop('checked')) {
                f_xuatexcel_baocaoth();

            }
            else if ($("#banmien_baocaoth").prop('checked')) {
               
                if ($("#cbbamien_baocaoth").val() != "-1" && $("#cbnhanvien_baocaoth").val() == "-1") {
                    f_xuatexcel_banmien_baocaoth("TB_BAOCAO_THUHOIEXCEL_KHOBANMIEN", "fn_tb_baocao_thuhoiexcel_nhanvienvemien")
                }
                if ($("#cbbamien_baocaoth").val() != "-1" && $("#cbnhanvien_baocaoth").val() != "-1") {
                    f_xuatexcel_banmien_baocaoth("TB_BAOCAO_THUHOIEXCEL_NHANVIENVEMIEN", "fn_tb_baocao_thuhoiexcel_nhanvienvemien")
                }
            }
            else if ($("#lapdat_baocaoth").prop('checked')) {
                f_xuatexcel_lapdat_baocaoth();
            }
        });
     
    } catch (e) {
        console.log(e);
    }
});

function LoadComBox_KhoTong_bcxth() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_LoadComBox_KhoTong_bcth", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_LoadComBox_KhoTong_bcth(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutb_baocaoth", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cbkhotong_baocaoth", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

function Loadloaithietbi_baocaoth(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaoth", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaoth(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbloaivttb_baocaoth", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}
//load dự án
function loadduan_baocaoth(value) {
    var p = getAllIdMod();
    var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaoth", connstr: "ConnectEMS" };
    var para = { IsType: 'LoadDuAn', Code: value };
    ExecuteServiceSyns(config, para, false);
}
function f_result_loadduan_baocaoth(config, para, lst) {
    try {
        dataToCob("cbduan_baocaoth", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// trạng thái
// load trang thai
function Loadtrangthai_baocaoth(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadtrangthai_baocaoth", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadtrangthai_baocaoth(config, para, lst) {
    try {
        dataToCob("cbtinhtrang_baocaoth", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function clear_th() {
    dataReportth = "";
    tungay_rb_th = "";
    dengay_rb_th = "";
    $("#grvheader_baocaoth").empty();
    $("#grvbody_baocaoth").empty();
    $("#messinfo_notdata").hide();
    $("#messinfo_baocaoth").hide();
    $("#titleReport").hide();
}
function f_comboboxdisableth() {
    try {
        if ($("#tongquan_baocaoth").prop('checked')) {
            $("#cbnhanvien_baocaoth").attr("disabled", "true");
            $("#cbduan_baocaoth").attr("disabled", "true");
            $(".loaithuhoi").hide();
        }

        $("#tongquan_baocaoth").on("change", function () {
            $("#cbnhanvien_baocaoth").attr("disabled", "true");
            $("#cbduan_baocaoth").attr("disabled", "true");
            $(".loaithuhoi").hide();
            $("#cbnhanvien_baocaoth").val("-1");
            $("#cbduan_baocaoth").val("-1");

        });
        $("#banmien_baocaoth").on("change", function () {

            $("#cbnhanvien_baocaoth").removeAttr("disabled");
            $("#cbduan_baocaoth").removeAttr("disabled");
            $(".loaithuhoi").show();
            $("#slloaithuhoi").val("-1");
        });
        $("#lapdat_baocaoth").on("change", function () {
            $("#cbnhanvien_baocaoth").removeAttr("disabled");
            $("#cbduan_baocaoth").removeAttr("disabled");
            $(".loaithuhoi").hide();
        });
    } catch (e) {
        console.log(e);
    }
}
// thực hiện báo cáo kho tổng
function f_layDuLieu_baocaoth(namesql, callback) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoth,
            ToDateTo: p.txt_dateto_baocaoth,
            KHOTONG: p.cbkhotong_baocaoth,
            Kho: p.cbbamien_baocaoth,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoth),
            VendorId: parseInt(p.cbloaivttb_baocaoth),
            USERID: parseInt(p.cbnhanvien_baocaoth),
            ProjectId: parseInt(p.cbduan_baocaoth),
            TrangThai:  parseInt(p.cbtinhtrang_baocaoth)
        };

        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}
function f_resultLayDuLieu_baocaoth(config, para, lst) {
    try {

        clear_th();
        if (lst == null || lst == undefined || lst == "[]") {

            messInfo("messinfo_baocaoth", "Chưa có dữ liệu hiển thị", "error");
            return;
        }
        var p = getAllIdMod();
        f_veGrid_baocaoth(lst)
    } catch (e) { console.log(e); }
}

function f_veGrid_baocaoth(lst) {
    try {
      
      
        var data = lst.data;
        if (data.length == 0 || data[0].column1 == "[]") {
            messInfo("messinfo_baocaoth", "Chưa có dữ liệu hiển thị", "error"); return;
        }

        var tr = "<tr>";
        for (var titile in data[0]) {
            if (titile == "tenvattu") {
                tr += "<th>TÊN VẬT TƯ</th>";
            }
            else if (titile == "donvitinh") {
                tr += "<th>ĐƠN VỊ TÍNH</th>";
            }
            else {
                tr += "<th>" + titile.toUpperCase() + "</th>";
            }
        };
        tr += "</tr>";
        $("#grvheader_baocaoth").append(tr);
        $.each(data, function (key, value) {
            TypeDeviceId = value.typedeviceid;
            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
            });
            tr += '</tr>';
            $("#grvbody_baocaoth").append(tr);
        });
       

    } catch (e) { console.log(e); }
}
// thu hồi về kho ban miền

//nhân viên về ban miền
function f_resultLayDuLieu_baocaoth_banmien(config, para, lst) {
    try {
       // console.log(lst);
        clear_th();
        if (lst == null || lst == undefined || lst == "[]") { messInfo("messinfo_baocaoth", "Chưa có dữ liệu hiển thị", "error"); return; }
        var p = getAllIdMod();
        var data = lst.data;
        if (data.length == 0 || data[0].column1 =="[]") {
            messInfo("messinfo_baocaoth", "Chưa có dữ liệu hiển thị", "error"); return;
        }
      
        var tr = "<tr>";
        for (var titile in data[0]) {
            if (titile == "tenvattu") {
                tr += "<th>TÊN VẬT TƯ</th>";
            }
            else if (titile == "donvitinh") {
                tr += "<th>ĐƠN VỊ TÍNH</th>";
            }
            else {
                tr += "<th>" + titile.toUpperCase() + "</th>";
            }

        };
        //tr +="<th></th>"
        tr += "</tr>";
        $("#grvheader_baocaoth").append(tr);
        $.each(data, function (key, value) {
            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
               
            });
            //tr += '<td>Xuất excel</td>'
            tr += '</tr>';
            $("#grvbody_baocaoth").append(tr);
        });
      
    } catch (e) { console.log(e); }
}

// điện lực về ban miền
function f_layDuLieu_dienluc_baocaoth(namesql, callback) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoth,
            ToDateTo: p.txt_dateto_baocaoth,
            KHOTONG: p.cbkhotong_baocaoth,
            Kho: p.cbbamien_baocaoth,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoth),
            VendorId: parseInt(p.cbloaivttb_baocaoth),
            USERID: parseInt(p.cbnhanvien_baocaoth),
            ProjectId: parseInt(p.cbduan_baocaoth),
            TrangThai: parseInt(p.cbtinhtrang_baocaoth)
        };
        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}

// điện lực về nhân viên lắp đặt
function f_resultLayDuLieu_baocaoth_lapdat(config, para, lst) {
    try {
        clear_th();
        var p = getAllIdMod();
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_baocaoth", "Chưa có dữ liệu hiển thị", "error"); return;
        }
  
        var data = lst.data;
        if (data.length == 0 || data[0].column1 == "[]") {
            messInfo("messinfo_baocaoth", "Chưa có dữ liệu hiển thị", "error"); return;
        }
        var tr = "<tr>";
        for (var titile in data[0]) {

            if (titile == "tenvattu") {
                tr += "<th>TÊN VẬT TƯ</th>";
            }
            else if (titile == "donvitinh") {
                tr += "<th>ĐƠN VỊ TÍNH</th>";
            }
            else {
                tr += "<th>" + titile.toUpperCase() + "</th>";
            }

        };
        tr += "</tr>";
        $("#grvheader_baocaoth").append(tr);
        $.each(data, function (key, value) {
            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
            });
            tr += '</tr>';
            $("#grvbody_baocaoth").append(tr);
        });

    } catch (e) { console.log(e); }
}
// xuất excel báo cáo thu hồi kho tống
function f_xuatexcel_baocaoth() {
    try {

        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_THUHOIEXCEL_TONGQUAN",
            callback: 'fn_tb_baocao_thuhoiexcel_tongquan',
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoth,
            ToDateTo: p.txt_dateto_baocaoth,
            KHOTONG: p.cbkhotong_baocaoth,
            Kho: p.cbbamien_baocaoth,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoth),
            VendorId: parseInt(p.cbloaivttb_baocaoth),
            USERID: parseInt(p.cbnhanvien_baocaoth),
            ProjectId: parseInt(p.cbduan_baocaoth),
            TrangThai: parseInt(p.cbtinhtrang_baocaoth)
        };
     
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function fn_tb_baocao_thuhoiexcel_tongquan(config1, para, lst) {
 
    if (lst == null || lst == undefined || lst == "[]") {
        messInfo("messinfo_baocaoth", "Chưa có dữ liệu để xuất excel", "error"); return;
    }
    var kq = [];
    var userInfo = JSON.parse(localStorage.getItem("userinfo"));
    var config = {
        namesql: "TB_BAOCAO_THUHOIEXCEL_TONGQUAN",
        namefile: "baocaothkhotong",
        connstr: "ConnectEMS",
        userid: userInfo.userid
    };
    var data = lst.data[0].kq0[0];
    dataXuatHeader_bctht = lst.data[1].kq1;

    for (var titile in data) {
        if (titile == "stt") {
            var info = { field: titile, name: "STT", type: "TextAndBoldCenter" };
            kq.push(info);
        } else if (titile == "tenvattu") {
            var info = { field: titile, name: "Tên vật tư", type: "TextAndBoldCenter" };
            kq.push(info);
        }
        else if (titile == "donvitinh") {
            var info = { field: titile, name: "Đơn vị tính", type: "TextAndBoldCenter" };
            kq.push(info);
        }
        else {
            var name = f_get_name_tht(titile);
            var info = { field: titile, name: name, type: "TextAndBoldCenter" };
            kq.push(info);
        }

    };

    var colum = { kq: kq };
    excuteExcel(config, para, colum, true);
}

function f_get_name_tht(field) {
    var data = dataXuatHeader_bctht;
    for (var i = 0; i < data.length; i++) {
        if (data[i].code == field) return data[i].header;
    }
}
//xuất excel báo cáo thu hồi kho nhân viên ban miền
function f_xuatexcel_banmien_baocaoth(namesql, callback) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql:namesql,
            callback: callback,
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoth,
            ToDateTo: p.txt_dateto_baocaoth,
            KHOTONG: p.cbkhotong_baocaoth,
            Kho: p.cbbamien_baocaoth,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoth),
            VendorId: parseInt(p.cbloaivttb_baocaoth),
            USERID: parseInt(p.cbnhanvien_baocaoth),
            ProjectId: parseInt(p.cbduan_baocaoth),
            TrangThai:parseInt(p.cbtinhtrang_baocaoth)
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function fn_tb_baocao_thuhoiexcel_nhanvienvemien(config1, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu để xuất", "error"); return;
        }
        var kq = [];
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: config1.namesql,
            namefile: "baocaoxuatkhobanmien",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var data = lst.data[0].kq0[0];
        dataXuatHeader_bcthbm = lst.data[1].kq1;
        for (var titile in data) {
            if (titile == "stt") {
                var info = { field: titile, name: "STT", type: "TextAndBoldCenter" };
                kq.splice(0, 0, info);
            }
            else if (titile == "mavattu") {
                var info = { field: titile, name: "Mã Vật Tư", type: "TextAndBoldCenter" };
                kq.splice(1, 0, info);
            }
            else if (titile == "tenvattu") {
                var info = { field: titile, name: "Tên vật tư", type: "TextAndBoldCenter" };
                kq.splice(2, 0, info);
            }
            else if (titile == "donvitinh") {
                var info = { field: titile, name: "Đơn vị tính", type: "TextAndBoldCenter" };
                kq.splice(3, 0, info);
            }
            else if (titile == "tong") {
                var info = { field: titile, name: "Tổng", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else {
                var name = f_get_name_banmien_th(titile);
                var info = { field: titile, name: name, type: "TextAndBoldCenter" };
                kq.push(info);
            }

        };

        var colum = { kq: kq };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
function f_get_name_banmien_th(field) {
    var data = dataXuatHeader_bcthbm;
    for (var i = 0; i < data.length; i++) {
        if (data[i].code == field) return data[i].header;
    }
}

//xuất excel báo cáo xuát kho nhân viên
function f_xuatexcel_lapdat_baocaoth() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_THUHOIEXCEL_DIENLUCVENHANVIEN",
            callback: 'fn_tb_baocao_thuhoiexcel_dienlucvenhanvien',
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoth,
            ToDateTo: p.txt_dateto_baocaoth,
            KHOTONG: p.cbkhotong_baocaoth,
            Kho: p.cbbamien_baocaoth,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoth),
            VendorId: parseInt(p.cbloaivttb_baocaoth),
            USERID: parseInt(p.cbnhanvien_baocaoth),
            ProjectId: parseInt(p.cbduan_baocaoth),
            TrangThai: parseInt(p.cbtinhtrang_baocaoth)
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function fn_tb_baocao_thuhoiexcel_dienlucvenhanvien(config, para, lst) {
    try {
       
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_baocaoth", "Chưa có dữ liệu để xuất excel", "error"); return;
        }
        if (lst.data[0].kq0.length == 0) {
            messInfo("messinfo_baocaoth", "Chưa có dữ liệu để xuất excel", "error"); return;
        }
        var kq = [];
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_THUHOIEXCEL_DIENLUCVENHANVIEN",
            namefile: "baocaothuhoikhonhanvien",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var data = lst.data[0].kq0[0];
        dataXuatHeader_bcnvth = lst.data[1].kq1;
        for (var titile in data) {
            if (titile == "stt") {
                var info = { field: titile, name: "STT", type: "TextAndBoldCenter" };
                kq.splice(0, 0, info);
            }
            else if (titile == "tenvattu") {
                var info = { field: titile, name: "Tên vật tư", type: "TextAndBoldCenter" };
                kq.splice(1, 0, info);
            }
            else if (titile == "donvitinh") {
                var info = { field: titile, name: "Đơn vị tính", type: "TextAndBoldCenter" };
                kq.splice(2, 0, info);
            }
            else if (titile == "thvttblh") {
                var info = { field: titile, name: "TH VTTB LỖI HỎNG", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else if (titile == "thvttblh") {
                var info = { field: titile, name: "TH VTTB LỖI HỎNG", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else {
                var name = f_get_name_bcnvth(titile);
                var info = { field: titile, name: name, type: "TextAndBoldCenter" };
                kq.push(info);
            }

        };

        var colum = { kq: kq };
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
function f_get_name_bcnvth(field) {
    var data = dataXuatHeader_bcnvth;
    if (data == null) return;
    for (var i = 0; i < data.length; i++) {
        if (data[i].code == field) return data[i].header;
    }
}
// FillData combobox ban mien
function LoadComBox_BanMien_Baocaoth() {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_combobox_banmien_baocaoth", connstr: "ConnectEMS" };
        var para = {
            IsType: 'LoadDienluc',
            Code: $("#cbkhotong_baocaoth").val()
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_combobox_banmien_baocaoth(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data.length == 0) {
            return;
        }
        var data = lst.data;
        dataToCob("cbbamien_baocaoth", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function Loadmanhanvien_baocaoth(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_Loadmanhanvien_baocaoth", connstr: "ConnectEMS" };
        var para = {
            TypeExport: '2',
            UserId: userInfo.userid,
            Code: value,
            IsType: 'LoadUserXuatFull'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadmanhanvien_baocaoth(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbnhanvien_baocaoth", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function checknull_baocaoth() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaoth), timeyyyymmdd(p.txt_dateto_baocaoth));
        if (compare.days < 0) return "Từ ngày phải nhỏ hơn ngày đến";
        if (p.cbkhotong_baocaoth == "-1") return "Vui lòng chọn kho tổng";
        if ($("#banmien_baocaoth").prop("checked") == true) {
            if (p.cbbamien_baocaoth == "-1") return "Vui lòng chọn ban miền"
        }
        if ($("#lapdat_baocaoth").prop("checked") == true) {
            if (p.cbbamien_baocaoth == "-1") return "Vui lòng chọn ban miền"
            if (p.cbnhanvien_baocaoth == "-1") return "Vui lòng chọn nhân viên"
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}
