
$(document).ready(function () {
    try {

        var date = new Date();
        var m = (date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        $('#txt_dateto_thsldp').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            viewMode: "months",
            minViewMode: 'months'
        });

        $('#txt_dateto_thsldp').val(m + "/" + date.getFullYear())
        LoadComBox_vattuthietbi_bcthsldp();
        $("#cbvattutb_baocaothsldp").change(function () {
            var value = $("#cbvattutb_baocaothsldp").val();
            Loadloaithietbi_baocaothsldp(value);
        });

        $("#btnCapNhat_baocaothsldp").click(function () {
           
            f_layDuLieu_baocaothsldp(1);
        });
        $("#btnxuatexcel_baocaothsldp").click(function () {
            f_xuatexcel_baocaothsldp();
        });
    } catch (e) {
        console.log(e);
    }
});
//load kho tổng
function LoadComBox_vattuthietbi_bcthsldp() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_LoadComBox_vattuthietbi_bcthsldp", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_LoadComBox_vattuthietbi_bcthsldp(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutb_baocaothsldp", data[0].kq0, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

//load thiết bị
function Loadloaithietbi_baocaothsldp(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaothsldp", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaothsldp(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaothsldp", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function clear_thsldp() {
    $("#myTableDatabody_bacaothsldp").empty();
    messInfo("messinfo_baocaothsldp", "", "error");
    messInfo("messinfo_baocaothsldp", "", "ok");
}

// thực hiện báo cáo kho tổng
function f_layDuLieu_baocaothsldp(page) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BAOCAO_TONGHOPSOLIEUDUPHONG", callback: 'fn_tb_baocao_tonghopsolieuduphong', connstr: "ConnectEMS" };
        var para = {
            ToDateTo: "01/" + p.txt_dateto_thsldp,
            TypeDeviceId: parseInt(p.cbvattutb_baocaothsldp),
            VendorId: parseInt(p.cbloaithietbi_baocaothsldp),
            pagenum: 1,
            numrecs:20
        };

        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}
function fn_tb_baocao_tonghopsolieuduphong(config, para, lst) {
    try {

        clear_thsldp();
        if (lst == null || lst == undefined || lst == "[]") {

            messInfo("messinfo_baocaothsldp", "Chưa có dữ liệu hiển thị", "error");
            return;
        }
        var data = lst.data;
        if (data.length == 0 ) {
            messInfo("messinfo_baocaothsldp", "Chưa có dữ liệu hiển thị", "error"); return;
        }

        var tr = "";
        $.each(data, function (key, val) {
            tr += "<tr>";
            tr += "<td >" + val.stt + "</td>";
            tr += "<td >" + val.mavattu + "</td>";
            tr += "<td >" + val.tenvattu + "</td>";
            tr += "<td >" + val.slcanmua + "</td>";
            tr += "<td >" + val.slktmb + "</td>";
            tr += "<td >" + val.slktmt + "</td>";
            tr += "<td >" + val.slktmn + "</td>";
            tr += "<td >" + val.slkbmb + "</td>";
            tr += "<td >" + val.slkbmt + "</td>";
            tr += "<td >" + val.slkbmn + "</td>";
            tr += "<td >" + val.slcdpmb + "</td>";
            tr += "<td >" + val.slcdpmt + "</td>";
            tr += "<td >" + val.slcdpmn + "</td>";
            tr += "<td >" + val.slcpsmb + "</td>";
            tr += "<td >" + val.slcpsmt + "</td>";
            tr += "<td >" + val.slcpsmn + "</td>";
            tr += "<td >" + val.slkttpmb + "</td>";
            tr += "<td >" + val.slkttpmt + "</td>";
            tr += "<td >" + val.slkttpmn + "</td>";
            tr += "</tr>";
        });

        $("#myTableDatabody_bacaothsldp").append(tr);
        LoadPhanTrang("pageLst_thsldp", "pageCurent_thsldp", data, function () {
            f_layDuLieu_baocaothsldp($("#pagenumber").val());
        });

    } catch (e) { console.log(e); }
}

function f_xuatexcel_baocaothsldp() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_TONGHOPSOLIEUDUPHONG",
            namefile: "baocaotonghopsolieuduphong",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            ToDateTo: "01/" + p.txt_dateto_thsldp,
            TypeDeviceId: parseInt(p.cbvattutb_baocaothsldp),
            VendorId: parseInt(p.cbloaithietbi_baocaothsldp),
            pagenum: 1,
            numrecs: 2000000000
        };
        var colum = {
            kq: [{ field: "STT", name: "stt", type: "TextCenter" },
             { field: "mavattu", name: "Mã VTTB", type: "TextCenter" },
             { field: "tenvattu", name: "Tên VTTB", type: "TextCenter" },
             { field: "slcanmua", name: "Tổng SL cần mua (SX mới)", type: "TextCenter" },
             { field: "slktmb", name: "SL tồn kho các KTBM cuối kỳ trước MB", type: "TextCenter" },
             { field: "slktmt", name: "SL tồn kho các KTBM cuối kỳ trước MT", type: "TextCenter" },
             { field: "slktmn", name: "SL tồn kho các KTBM cuối kỳ trước MN", type: "TextCenter" },
             { field: "slkbmb", name: "SL tồn kho các KBM cuối kỳ trước MB", type: "TextCenter" },
             { field: "slkbmt", name: "SL tồn kho các KBM cuối kỳ trước MT", type: "TextCenter" },
             { field: "slkbmn", name: "SL tồn kho các KBM cuối kỳ trước MN", type: "TextCenter" },
             { field: "slcdpmb", name: "SL xin cấp dự phòng các BM theo tháng MB", type: "TextCenter" },
             { field: "slcdpmt", name: "SL xin cấp dự phòng các BM theo tháng MT", type: "TextCenter" },
             { field: "slcdpmn", name: "SL xin cấp dự phòng các BM theo tháng MN", type: "TextCenter" },
             { field: "slcpsmb", name: "SL xin cấp phát sinh đột xuất trong tháng MB", type: "TextCenter" },
             { field: "slcpsmt", name: "SL xin cấp phát sinh đột xuất trong tháng MT", type: "TextCenter" },
             { field: "slcpsmn", name: "SL xin cấp phát sinh đột xuất trong tháng MN", type: "TextCenter" },
             { field: "slkttpmb", name: "SL đã sản xuất thành phẩm (hoặc mua) trong tháng MB", type: "TextCenter" },
             { field: "slkttpmt", name: "SL đã sản xuất thành phẩm (hoặc mua) trong tháng MT", type: "TextCenter" },
             { field: "slkttpmn", name: "SL đã sản xuất thành phẩm (hoặc mua) trong tháng MN", type: "TextCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);

    } catch (e) { console.log(e); }
}
