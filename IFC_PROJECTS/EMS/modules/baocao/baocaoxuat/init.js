var dataReportXuat = "";
var tungay_rb = "";
var dengay_rb = "";
var dataXuatExcel_bct = null;
var dataXuatHeader_bct = null;
var dataXuatHeader_bcbm = null;
var dataXuatHeader_bcnv = null;
$(document).ready(function () {
    try {

        loadInitDate();
        setValToTxt('txt_datefrom_baocaoxuat', gettimenow());
        setValToTxt('txt_dateto_baocaoxuat', gettimenow());
        LoadComBox_KhoTong_bcxuat();
        f_comboboxdisable();
        $("#cbkhotong_baocaoxuat").change(function () {
            LoadComBox_BanMien_Baocaoxuat();
            Loadmanhanvien_baocaoxuat($("#cbkhotong_baocaoxuat").val());
            loadduan_baocaoxuat($("#cbkhotong_baocaoxuat").val());
        });
        $("#cbbamien_baocaoxuat").change(function () {
            Loadmanhanvien_baocaoxuat($("#cbbamien_baocaoxuat").val());
        });
        $("#cbvattutb_baocaoxuat").change(function () {
            var value = $("#cbvattutb_baocaoxuat").val();
            Loadloaithietbi_baocaoxuat(value);
        });
        $("#btnCapNhat_baocaoxuat").click(function () {
            messInfo("messinfo_baocaoxuat", "", "error");
            var check = checknull_baocaoxuat();
            if (check != "") {
                clear_xuat();
                messInfo("messinfo_baocaoxuat", check, "error");
                return;
            }

            if ($("#tongquan_baocaoxuat").prop('checked')) {
                if ($("#cbbamien_baocaoxuat").val() != "-1") {
                    f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_TONGQUANTHEOBANMIEN", "f_resultLayDuLieu_baocaoxuat");
                } else {
                    f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_TONGQUAN", "f_resultLayDuLieu_baocaoxuat");
                }

            }
            else if ($("#banmien_baocaoxuat").prop('checked')) {
                if ($("#cbnhanvien_baocaoxuat").val() != "-1") {
                    f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_KHOTONGVEMIENTHEOBANMIEN", "f_resultLayDuLieu_baocaoxuat_banmien");

                } else {
                    f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_KHOTONGVEMIEN", "f_resultLayDuLieu_baocaoxuat_banmien");
                }
            }
            else if ($("#lapdat_baocaoxuat").prop('checked')) {
                f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_MIENVENHANVIEN", "f_resultLayDuLieu_baocaoxuat_lapdat");
            }

        });
        $("#btninbaocao_baocaoxuat").click(function () {
            if ($("#tongquan_baocaoxuat").prop('checked')) {

                if (dataReportXuat != "") {
                    if (dataReportXuat.data[0].kq0.length > 0) {
                        localStorage.setItem("datareportxuat_Id", 1);
                        location.href = "master.html#modules/baocao/printreport";
                    } else {
                        clear_xuat();
                        messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                    }

                } else {
                    clear_xuat();
                    messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                }

            }
            else if ($("#banmien_baocaoxuat").prop('checked')) {
                if (dataReportXuat != "") {
                    if (dataReportXuat.data.length > 0) {
                        localStorage.setItem("datareportxuat_Id", 2);
                        location.href = "master.html#modules/baocao/printreport";
                    } else {
                        clear_xuat();
                        messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                    }
                } else {
                    clear_xuat();
                    messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                }
            }
            else if ($("#lapdat_baocaoxuat").prop('checked')) {
                if (dataReportXuat != "") {
                    if (dataReportXuat.data.length > 0) {
                        localStorage.setItem("datareportxuat_Id", 3);
                        location.href = "master.html#modules/baocao/printreport";
                    } else {
                        clear_xuat();
                        $("#messinfo_baocaoxuat").show();
                        messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                    }
                } else {
                    clear_xuat();
                    $("#messinfo_baocaoxuat").show();
                    messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                }
            }
        });
        $("#btnxuatexecl_baocaoxuat").click(function () {
            messInfo("messinfo_baocaoxuat", "", "error");
            var check = checknull_baocaoxuat();
            if (check != "") {
                clear_xuat();
                messInfo("messinfo_baocaoxuat", check, "error");
                return;
            }
            if ($("#tongquan_baocaoxuat").prop('checked')) {
                f_xuatexcel_baocaoxuat();

            }
            else if ($("#banmien_baocaoxuat").prop('checked')) {
                f_xuatexcel_banmien_baocaoxuat();
            }
            else if ($("#lapdat_baocaoxuat").prop('checked')) {
                f_xuatexcel_lapdat_baocaoxuat();
            }

          
        });
    } catch (e) {
        console.log(e);
    }
});

function LoadComBox_KhoTong_bcxuat() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_LoadComBox_KhoTong_bcxuat", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_LoadComBox_KhoTong_bcxuat(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutb_baocaoxuat", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cbkhotong_baocaoxuat", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

function Loadloaithietbi_baocaoxuat(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaoxuat", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaoxuat(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbloaivttb_baocaoxuat", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}
//load dự án
function loadduan_baocaoxuat(value) {
    var p = getAllIdMod();
    var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaoxuat", connstr: "ConnectEMS" };
    var para = { IsType: 'LoadDuAn', Code: value };
    ExecuteServiceSyns(config, para, false);
}
function f_result_loadduan_baocaoxuat(config, para, lst) {
    try {
        dataToCob("cbduan_baocaoxuat", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}


function clear_xuat() {
    dataReportXuat = "";
    tungay_rb = "";
    dengay_rb = "";
    $("#grvheader_baocaoxuat").empty();
    $("#grvbody_baocaoxuat").empty();
    $("#messinfo_notdata").hide();
    $("#messinfo_baocaoxuat").hide();
    $("#titleReport").hide();
}
function f_comboboxdisable() {
    try {
        if ($("#tongquan_baocaoxuat").prop('checked')) {
            $("#cbnhanvien_baocaoxuat").attr("disabled", "true");
            $("#cbduan_baocaoxuat").attr("disabled", "true");
            $("#cbnhanvien_baocaoxuat").val("-1");
            $("#cbduan_baocaoxuat").val("-1");
        }

        $("#tongquan_baocaoxuat").on("change", function () {
            $("#cbnhanvien_baocaoxuat").attr("disabled", "true");
            $("#cbduan_baocaoxuat").attr("disabled", "true");
            $("#cbnhanvien_baocaoxuat").val("-1");
            $("#cbduan_baocaoxuat").val("-1");
        });
        $("#banmien_baocaoxuat").on("change", function () {

            $("#cbnhanvien_baocaoxuat").removeAttr("disabled");
            $("#cbduan_baocaoxuat").removeAttr("disabled");
        });
        $("#lapdat_baocaoxuat").on("change", function () {
            $("#cbnhanvien_baocaoxuat").removeAttr("disabled");
            $("#cbduan_baocaoxuat").removeAttr("disabled");
        });
    } catch (e) {
        console.log(e);
    }
}
// thực hiện báo cáo kho tổng
function f_layDuLieu_baocaoxuat(namesql, callback) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoxuat,
            ToDateTo: p.txt_dateto_baocaoxuat,
            KHOTONG: p.cbkhotong_baocaoxuat,
            Kho: p.cbbamien_baocaoxuat,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoxuat),
            VendorId: parseInt(p.cbloaivttb_baocaoxuat),
            USERID: parseInt(p.cbnhanvien_baocaoxuat),
            ProjectId: parseInt(p.cbduan_baocaoxuat)
        };

        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}
function f_resultLayDuLieu_baocaoxuat(config, para, lst) {
    try {

        clear_xuat();
        if (lst == null || lst == undefined || lst == "[]") {

            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error");
            return;
        }
        var p = getAllIdMod();
        messInfo("messinfo_baocaoxuat", "", "error");
        f_veGrid_baocaoxuat(lst)
    } catch (e) { console.log(e); }
}

function f_veGrid_baocaoxuat(lst) {
    try {
       
        var data = lst.data;
        if (data.length == 0) {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error"); return;
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
        $("#grvheader_baocaoxuat").append(tr);
        $.each(data, function (key, value) {
            TypeDeviceId = value.typedeviceid;
            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
            });
            tr += '</tr>';
            $("#grvbody_baocaoxuat").append(tr);
        });
       

    } catch (e) { console.log(e); }
}
// kho tổng về kho ban miền
function f_resultLayDuLieu_baocaoxuat_banmien(config, para, lst) {
    try {
        clear_xuat();
        if (lst == null || lst == undefined || lst == "[]") { messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error"); return; }
        var p = getAllIdMod();
        var data = lst.data;
        if (data.length == 0) {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error"); return;
        }
     
        var tungay_nv_rb = $("#txt_datefrom_baocaoxuat").val();
        var dengay_nv_rb = $("#txt_dateto_baocaoxuat").val();


        if (lst == null || lst == undefined) {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error");
            return;
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
        $("#grvheader_baocaoxuat").append(tr);
        $.each(data, function (key, value) {

            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
            });
            tr += '</tr>';
            $("#grvbody_baocaoxuat").append(tr);
        });

    } catch (e) { console.log(e); }
}
// kho miền nhân viên lắp đặt
function f_resultLayDuLieu_baocaoxuat_lapdat(config, para, lst) {
    try {
        clear_xuat();

        var p = getAllIdMod();
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error"); return;
        }
       

        var data = lst.data;
        if (data.length == 0) {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error"); return;
        }


        if (lst == null || lst == undefined) {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu hiển thị", "error");
            return;
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
        $("#grvheader_baocaoxuat").append(tr);
        $.each(data, function (key, value) {

            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
            });
            tr += '</tr>';
            $("#grvbody_baocaoxuat").append(tr);
        });

       
    } catch (e) { console.log(e); }
}
// xuất excel báo cáo xuất kho tống
function f_xuatexcel_baocaoxuat() {
    try {

        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUATEXCEL_TONGQUAN",
            callback: 'fn_tb_baocao_xuatexcel_tongquan',
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoxuat,
            ToDateTo: p.txt_dateto_baocaoxuat,
            KHOTONG: p.cbkhotong_baocaoxuat,
            Kho: p.cbbamien_baocaoxuat,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoxuat),
            VendorId: parseInt(p.cbloaivttb_baocaoxuat),
            USERID: parseInt(p.cbnhanvien_baocaoxuat),
            ProjectId: parseInt(p.cbduan_baocaoxuat)
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function fn_tb_baocao_xuatexcel_tongquan(config1, para, lst) {
    if (lst == null || lst == undefined || lst == "[]") {
        messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu để xuất", "error"); return;
    }
    var kq = [];
    var userInfo = JSON.parse(localStorage.getItem("userinfo"));
    var config = {
        namesql: "TB_BAOCAO_XUATEXCEL_TONGQUAN",
        namefile: "baocaoxuatkhotong",
        connstr: "ConnectEMS",
        userid: userInfo.userid
    };
    var data = lst.data[0].kq0[0];
    dataXuatHeader_bct = lst.data[1].kq1;

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
            var name = f_get_name(titile);
            var info = { field: titile, name: name, type: "TextAndBoldCenter" };
            kq.push(info);
        }

    };

    var colum = { kq: kq };
    excuteExcel(config, para, colum, true);
}

function f_get_name(field) {
    var data = dataXuatHeader_bct;
    for (var i = 0; i < data.length; i++) {
        if (data[i].code == field) return data[i].header;
    }
}
//xuất excel báo cáo xuất kho ban miền
function f_xuatexcel_banmien_baocaoxuat() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUATEXCEL_KHOTONGVEMIEN",
            callback: 'fn_tb_baocao_xuatexcel_khotongvemien',
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoxuat,
            ToDateTo: p.txt_dateto_baocaoxuat,
            KHOTONG: p.cbkhotong_baocaoxuat,
            Kho: p.cbbamien_baocaoxuat,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoxuat),
            VendorId: parseInt(p.cbloaivttb_baocaoxuat),
            USERID: parseInt(p.cbnhanvien_baocaoxuat),
            ProjectId: parseInt(p.cbduan_baocaoxuat)
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function fn_tb_baocao_xuatexcel_khotongvemien(config1, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu để xuất", "error"); return;
        }
        var kq = [];
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUATEXCEL_KHOTONGVEMIEN",
            namefile: "baocaoxuatkhobanmien",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var data = lst.data[0].kq0[0];
        dataXuatHeader_bcbm = lst.data[1].kq1;
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
            else if (titile == "KTMN") {
                var info = { field: titile, name: "ĐCNB TRẢ KTMN", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else if (titile == "KTMT") {
                var info = { field: titile, name: "ĐCNB TRẢ KTMT", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else if (titile == "KTMB") {
                var info = { field: titile, name: "ĐCNB TRẢ KTMB", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else {
                var name = f_get_name_banmien(titile);
                var info = { field: titile, name: name, type: "TextAndBoldCenter" };
                kq.push(info);
            }

        };

        var colum = { kq: kq };
        console.log(kq);
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
function f_get_name_banmien(field) {
    var data = dataXuatHeader_bcbm;
    for (var i = 0; i < data.length; i++) {
        if (data[i].code == field) return data[i].header;
    }
}
//xuất excel báo cáo xuát kho nhân viên
function f_xuatexcel_lapdat_baocaoxuat() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUATEXCEL_MIENVENHANVIEN",
            callback: 'fn_tb_baocao_xuatexcel_nhanvien',
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrom_baocaoxuat,
            ToDateTo: p.txt_dateto_baocaoxuat,
            KHOTONG: p.cbkhotong_baocaoxuat,
            Kho: p.cbbamien_baocaoxuat,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoxuat),
            VendorId: parseInt(p.cbloaivttb_baocaoxuat),
            USERID: parseInt(p.cbnhanvien_baocaoxuat),
            ProjectId: parseInt(p.cbduan_baocaoxuat)
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function fn_tb_baocao_xuatexcel_nhanvien(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu để xuất", "error"); return;
        }
        if (lst.data[0].kq0.length == 0) {
            messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu để xuất", "error"); return;
        }
        var kq = [];
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUATEXCEL_MIENVENHANVIEN",
            namefile: "baocaoxuatkhonhanvien",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var data = lst.data[0].kq0[0];
        dataXuatHeader_bcnv = lst.data[1].kq1;
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
            else if (titile == "KBMN") {
                var info = { field: titile, name: "ĐCNB TRẢ KBMN", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else if (titile == "KBMT") {
                var info = { field: titile, name: "ĐCNB TRẢ KBMT", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else if (titile == "KBMB") {
                var info = { field: titile, name: "ĐCNB TRẢ KBMB", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else {
                var name = f_get_name_bcnv(titile);
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
function f_get_name_bcnv(field) {
    var data = dataXuatHeader_bcnv;
    if (data == null) return;
    for (var i = 0; i < data.length; i++) {
        if (data[i].code == field) return data[i].header;
    }
}
// FillData combobox ban mien
function LoadComBox_BanMien_Baocaoxuat() {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_combobox_banmien_baocaoxuat", connstr: "ConnectEMS" };
        var para = {
            IsType: 'LoadDienluc',
            Code: $("#cbkhotong_baocaoxuat").val()
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_combobox_banmien_baocaoxuat(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data.length == 0) {
            return;
        }
        var data = lst.data;
        dataToCob("cbbamien_baocaoxuat", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function Loadmanhanvien_baocaoxuat(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_Loadmanhanvien_baocaoxuat", connstr: "ConnectEMS" };
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
function f_result_Loadmanhanvien_baocaoxuat(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbnhanvien_baocaoxuat", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function checknull_baocaoxuat() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaoxuat), timeyyyymmdd(p.txt_dateto_baocaoxuat));
        if (compare.days < 0) return "Từ ngày phải nhỏ hơn ngày đến";
        if (p.cbkhotong_baocaoxuat == "-1") return "Vui lòng chọn kho tổng";
        if ($("#banmien_baocaoxuat").prop("checked") == true) {
            if (p.cbbamien_baocaoxuat == "-1") return "Vui lòng chọn ban miền"
        }
        if ($("#lapdat_baocaoxuat").prop("checked") == true) {
            if (p.cbbamien_baocaoxuat == "-1") return "Vui lòng chọn ban miền"
            if (p.cbnhanvien_baocaoxuat == "-1") return "Vui lòng chọn nhân viên"
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}
