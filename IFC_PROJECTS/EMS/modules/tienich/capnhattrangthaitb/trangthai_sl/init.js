var paraTable_cntttb = [];

$(document).ready(function () {
    try {
        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (user.code.length > 4) {
            $(".classtrangthai_sl").html("Không có quyền xem trang này");
            return;
        } else {
            loadConetent();
            f_loadKho_cnttsl();
            f_loadBanDau_cnttsl();
            f_loadtrangthai_cnttsl();
            $("#cb_vttb_ttsl").change(function () {

                loadgetlistthietbi_cnttsl();
            });

            $("#btnCapNhat_ttsl").click(function () {
                var check = check_validate_cnsl();
                if (check != "") {
                    messInfo("messinfo_cnttsl", check, "error");
                    return;
                }
                f_confimYesNo("Cập nhật trạng thái thiết bị?", "Bỏ qua", "Đồng ý", function () { f_capNhat_ttsl(); });


            });
        }
    } catch (e) { console.log(e); }
});

// load ra list thiet bi
function loadgetlistthietbi_cnttsl() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadlistthietbi_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cb_vttb_ttsl };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_XuatTay(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0)
            return;
        var data = lst.data;
        dataToCob("cb_loaivttb_ttsl", data, "code", "name", "0", "--Chọn loại thiết bị--");

    } catch (e) {
        console.log(e);
    }
}
function f_capNhat_ttsl() {
    try {
        var check = check_validate_cnsl();
        if (check != "") {
            messInfo("messinfo_cnttsl", check, "error");
            return;
        }
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { namesql: "TB_CapNhatTrangThaiThietBiTheoSoLuong", callback: "f_resultCapNhat_cnttsl", connstr: "ConnectEMS" };
        var para = {
            UserId:parseInt(userInfo.userid),
            CodeStock: p.cb_thuockho_ttsl,
            CountDivice:parseInt(p.txtsl_ttsl),
            VendorId:parseInt(p.cb_loaivttb_ttsl),
            StatusDivice_c: parseInt(p.cb_trangthaicu_ttsl),
            StatusDivice_M:parseInt(p.cb_trangthai_ttsl)
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultCapNhat_cnttsl(config, para, lst)
{
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_cnttsl", "Cập nhật trạng thái thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_cnttsl", lst.data[0].result, "ok");
            paraTable_cntttb = [];
            clearttsl();
            $("#messinfo_cnttsl").fadeOut(9000);

        }
        else
            messInfo("messinfo_cnttsl", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}
function check_validate_cnsl() {
    try{
        if ($("#cb_thuockho_ttsl").val() == "0") return "Vui lòng chọn kho";
        else if ($("#cb_vttb_ttsl").val() == "0") return "Vui lòng chọn vật tư thiết bị";
        else if ($("#cb_loaivttb_ttsl").val() == "0") return "Vui lòng chọn loại thiết bị";
        else if ($("#txtsl_ttsl").val() == "") return "Vui lòng nhập số lượng";
        else if ($("#cb_trangthaicu_ttsl").val() == "-1") return "Vui lòng chọn trạng thái cũ";
        else if ($("#cb_trangthai_ttsl").val() == "-1") return "Vui lòng chọn trạng thái cập nhật";
        else if ($("#cb_trangthaicu_ttsl").val() == $("#cb_trangthai_ttsl").val()) return "Trạng thái cũ phải khác trạng thái mới"
        return "";
    }catch(e){
        console.log(e);
    }
}
function clearttsl() {
    $("#cb_thuockho_ttsl").val("0");
    $("#cb_vttb_ttsl").val("0");
    $("#cb_loaivttb_ttsl").val("0");
    $("#txtsl_ttsl").val("");
    $("#cb_trangthaicu_ttsl").val("-1");
    $("#cb_trangthai_ttsl").val("-1");
}
function f_loadBanDau_cnttsl() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "f_result_loadBanDau_cntttb", connstr: "ConnectEMS" };
        var para = { Type: "Basic", Userid: userInfo.userid };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanDau_cntttb(config, para, lst) {
    try {
        dataToCob("cb_vttb_ttsl", lst.data[8].kq8, "code", "name", "0", "--Chọn loại vật tư--");
    } catch (e) {
        console.log(e);
    }
}
function f_loadKho_cnttsl() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadkho_cntttb", connstr: "ConnectEMS" };
        var para = { Type: "Basic", Userid: userInfo.userid };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadkho_cntttb(config, para, lst) {
    try {
        if (lst == null && lst == undefined) return;
        var data = lst.data;
        dataToCob("cb_thuockho_ttsl", data[1].kq1, "code", "name", "0", "--Chọn kho--");
    } catch (e) {
        console.log(e);
    }
}
function f_loadtrangthai_cnttsl() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadtrangthai_cntttb", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtrangthai_cntttb(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0)
            return;
        dataToCob("cb_trangthai_ttsl", lst.data, "code", "name", "-1", "--Chọn trạng thái--");
        dataToCob("cb_trangthaicu_ttsl", lst.data, "code", "name", "-1", "--Chọn trạng thái--");
        
    } catch (e) {
        console.log(e);
    }
}
