var itemCount = 0;
var paraTable_XuatTay = [];
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        loaddatabasebandau_XuatTay();
        f_anHien2Series();
        
        $("#cb_toikho_XuatTay").change(function () {            
            loaduserkho_XuatTay();
            loadduan_XuatTay();
        });

        $("#cbvattu_XuatTay").change(function () {
            paraTable_XuatTay = [];
            $("#myTableData_XuatTay").empty();           
            loadgetlistthietbi_XuatTay();
        });

        $("#btn_them_XuatTay").click(function () {
            itemCount++;
            f_addThemTBChoValue_XuatTay();
        });
        $("#btnCapNhat_XuatTay").click(function () {
            if ($("#myTableData_XuatTay tr").length == 0) {
                messInfo("messinfo_XuatTay", "Không có dữ liệu cập nhật", "error");
                return;
            }

            f_confimYesNo("Cập nhật phiếu xuất?", "Bỏ qua", "Đồng ý",
                function () { f_ExcuteDatabase_XuatTay("TB_Export_WaitInHard", "f_resultTB_Export_WaitInHard_XuatTay") });
        });

        $("#cbloainhapxuat_XuatTay").change(function () {
            messInfo("messinfo_XuatTay", "", "ok");
            clearthanhcong_XuatTay();
            f_thaydoitenlable_XuatTay();
            var p = getAllIdMod();
            if (p.cbloainhapxuat_XuatTay != "-1")
            f_loadMaPhieu_XuatTay();
        });

    } catch (e) { console.log(e); }
});

//============================================================ XY LY CAC CHUC NANG==========================================================

function f_addThemThietBiChoGrid_XuatTay() {
    try {
        var pt = getAllIdModText();

        var html = "";

        html = "<tr id='tr" + itemCount + "'><td>" +
                            pt.cbvattu_XuatTay + "</td> <td>" +
                           (pt.cbloaithietbi_XuatTay.toLowerCase().indexOf("chọn loại thiết bị") >= 0 ? "-" : pt.cbloaithietbi_XuatTay) + " </td> <td>" +
                            pt.cbtrangthai_XuatTay + " </td> <td>" +
                            pt.txtserial1_XuatTay + " </td>"+ 
                            "<td class='hidseries'>" + pt.txtserial2_XuatTay + " </td>" +
                           "<td>" + pt.txtsoluong_XuatTay + " </td>" +
                            "<td><input type='button'  id='delete_XuatTay" + itemCount + "' value='Xóa'></td> </tr>";
        $("#myTableData_XuatTay").append(html);

        $("#delete_XuatTay" + itemCount).click(function () {
            var idremove = $(this).attr("id").replace("delete_XuatTay", "");
            var itemsFound = paraTable_XuatTay.filter(function (elem) {
                return elem.Stt == idremove;
            });

            var index = paraTable_XuatTay.indexOf(itemsFound);
            paraTable_XuatTay.splice(index, 1);
            $("#tr" + idremove).remove();
        });

        f_anHien2Series();
        $("#txtserial1_XuatTay").val("");
        $("#txtserial2_XuatTay").val("");
    } catch (e) {
        console.log(e);
    }
}

function f_addThemTBChoValue_XuatTay() {
    try {

        var p = getAllIdMod();
        var check = checkkytunull_XuatTay();
        if (check != "") {
            messInfo("messinfo_XuatTay", check, "error");
            return;
        }

        var temp = {
            TypeDeviceId: p.cbvattu_XuatTay,
            VendorId: p.cbloaithietbi_XuatTay,
            SeriesDivice1: p.txtserial1_XuatTay,
            SeriesDivice2: p.txtserial2_XuatTay,
            CountDivice: p.txtsoluong_XuatTay,
            StatusDivice: p.cbtrangthai_XuatTay,
            Stt: itemCount
        };

        var exists = $.grep(paraTable_XuatTay, function (item) {
            return item.SeriesDivice1 == p.txtserial1_XuatTay
            && item.TypeDeviceId == p.cbvattu_XuatTay
            && item.VendorId == p.cbloaithietbi_XuatTay
            && item.CountDivice == p.txtsoluong_XuatTay
            ;
        }).length; /* use length of array as truth test */

        if (exists <= 0) {
            paraTable_XuatTay.push(temp);
            f_ExcuteDatabase_XuatTay("TB_Export_CheckSameInHard", "f_resultCheckTrungTB_XuatTay");
        }
        else {
            messInfo("messinfo_XuatTay", "Thiết bị đã tồn tại", "error");
        }
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabase_XuatTay(namesql, calkBackTo) {
    try {        
        if (paraTable_XuatTay == null || paraTable_XuatTay == undefined || paraTable_XuatTay == "" || paraTable_XuatTay == "[]" || paraTable_XuatTay.length == 0) {
            messInfo("messinfo_XuatTay", "Không có dữ liệu cập nhật", "error");
            return;
        }

        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_XuatTay) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            TypeExport: p.cbloainhapxuat_XuatTay
            , VoiceCode: p.txtMaphieu_XuatTay
          , ProjectId: p.cb_project_XuatTay
          , UserIdFrom: user.userid
          , UserIdTo: p.cb_nguoiduyet_XuatTay
          , FileCV: p.file_bienban_XuatTay
          , Note: p.txtlydo_XuatTay
          , CodeStockFrom: user.code
          , CodeStockTo: p.cb_toikho_XuatTay
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}
function f_resultCheckTrungTB_XuatTay(config, para, lst) {
    try {
        console.log(lst);
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0] != null && lst.data[0].kq0.length > 0) {
            // check trung loi vao day
            messInfo("messinfo_XuatTay", lst.data[0].kq0[0].result, "error");
            paraTable_XuatTay.splice(paraTable_XuatTay.length - 1, 1);
        }
        else {
            // check trung ok moi xuong day   

            messInfo("messinfo_XuatTay", "", "ok");
            f_addThemThietBiChoGrid_XuatTay();
           
        }
    } catch (e) {
        console.log(e);
    }
}

function f_resultTB_Export_WaitInHard_XuatTay(config, para, lst) {
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_XuatTay", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_XuatTay", lst.data[0].result, "ok");
            clearthanhcong_XuatTay();
            f_uploadFileMaVanDon_XuatTay();
        }
        else
            messInfo("messinfo_XuatTay", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}

function f_uploadFileMaVanDon_XuatTay() {
    try {
        var fdata = new FormData();
        var file = document.getElementById("file_bienban_XuatTay").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        if (file == null || file == 'undefined' || file.length == 0) {
            return;
        }
        var config = { callback: "f_resultuploadFileMaVanDon_XuatTay" };
        f_UploadFileAny(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultuploadFileMaVanDon_XuatTay(config, para, data) {
    console.log(data);
}


//============================================================KET THUC XY LY CAC CHUC NANG==========================================================



//============================================================ LOAD CAC CONTROL==========================================================
// load ra list du lieu ban dau
function loaddatabasebandau_XuatTay() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "f_result_loaddulieu_XuatTay", connstr: "ConnectEMS" };
        var para = { Type: 'Basic', UserId: userInfo.userid };
       
        ExecuteServiceSyns(config, para, false);


    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddulieu_XuatTay(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattu_XuatTay", lst.data[0].kq0, "code", "name", "-1", "--Chọn loại vật tư--");
        dataToCob("cbloainhapxuat_XuatTay", data[5].kq5, "code", "name", "-1", "--Chọn loại xuất--");

    } catch (e) {
        console.log(e);
    }
}

function f_resultLoadKhoXuat_XuatTay(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst==""||lst=="[]"|| lst.length == 0 ) {
            messInfo("messinfo_XuatTay", "Bạn không có quyền", "error");
            clearthanhcong_XuatTay();
            return;
        }
        dataToCob("cb_toikho_XuatTay", lst.data, "code", "name", "-1", "--Chọn kho--");
    } catch (e) {
        console.log(e);
    }
}


// load ra list thiet bi
function loadgetlistthietbi_XuatTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadlistthietbi_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvattu_XuatTay };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_XuatTay(config, para, lst) {
    try
    {
        if (lst == null || lst == undefined || lst==""||lst=="[]"|| lst.length == 0)
            return;
        var data = lst.data;
        dataToCob("cbloaithietbi_XuatTay", data, "code", "name", "-1", "--Chọn loại thiết bị--");
        
        checkLoaiNhap_NhapTay(lst.data[0].typedetailorcount)

        f_anHien2Series();
    } catch (e) {
        console.log(e);
    }
}

function f_anHien2Series()
{
    var pt = getAllIdModText();
    if (pt.cbvattu_XuatTay.toLowerCase().indexOf("chọn loại vật tư") >=0)
    {
        $(".lb_series1_xuattay").html("Series");
        $(".hidseries").addClass("hidseries22");
        return;
    }

    var str = pt.cbvattu_XuatTay;

    var sp = str.split('+');
    $(".lb_series1_xuattay").html("Series " + sp[0]);
    $(".lb_series2_xuattay").html("Series " + (sp.length > 1 ? sp[1] : ""));
    if (sp.length > 1) {
        $(".hidseries").removeClass("hidseries22");
    }
    else {
        $(".hidseries").addClass("hidseries22");
    }
}

// load du an user kho

function loaduserkho_XuatTay() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_loadlistuserkho_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadUserXuat', Code: p.cb_toikho_XuatTay, Userid: userInfo.userid, TypeExport: p.cbloainhapxuat_XuatTay };
      
        ExecuteServiceSyns(config, para, false);
        
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistuserkho_XuatTay(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst==""||lst=="[]"|| lst.length == 0)
            return;
        dataToCob("cb_nguoiduyet_XuatTay", lst.data, "code", "name", "-1", "--Chọn người duyệt--");
    } catch (e) {
        console.log(e);
    }
}
// load du an
function loadduan_XuatTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: p.cb_toikho_XuatTay };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_XuatTay(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0)
            return;
        dataToCob("cb_project_XuatTay", lst.data, "code", "name", "-1", "--Chọn dự án--");
    } catch (e) {
        console.log(e);
    }
}

// load ra mã phiếu nhập
function f_loadMaPhieu_XuatTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadMaPhieu_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: "LoaiNhapXuat", Code: p.cbloainhapxuat_XuatTay };
        ExecuteServiceSyns(config, para, false);
        // load trang thai thiet bi
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: p.cbloainhapxuat_XuatTay };
        ExecuteServiceSyns(config, para, false);

        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        // load KHO TUONG UNG
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_resultLoadKhoXuat_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: "LoadKhoXuat", TypeExport: p.cbloainhapxuat_XuatTay, Userid: userInfo.userid, Code: userInfo.code };
        
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadMaPhieu_XuatTay(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0)
            return;
        setValToTxt("txtMaphieu_XuatTay", lst.data[0].voicecode);
    } catch (e) {
        console.log(e);
    }
}

function f_resultLoadTrangThai_XuatTay(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0)
            return;
       dataToCob("cbtrangthai_XuatTay", lst.data, "code", "name", "-1", "--Chọn trạng thái--");
    } catch (e) {
        console.log(e);
    }
}



// check giá trị null
function checkkytunull_XuatTay() {
    try {
        var p = getAllIdMod();
        
        if (p.cbloainhapxuat_XuatTay == "-1") return "Chưa chọn loại xuất";
        if (p.txtMaphieu_XuatTay == "") return "Mã Phiếu không được để trống.";
        if (p.cb_toikho_XuatTay == "-1") return "Chưa chọn nhập kho";
        if (p.cb_nguoiduyet_XuatTay == "-1") return "Chưa chọn người duyệt";
        if (p.cbchusohuu_XuatTay == "-1") return "Chưa chọn nhà sở hữu";
        if (p.txtmavandon_XuatTay == "") return "Mã vận đơn không được để trống";       
        if (p.cbvattu_XuatTay == "-1") return "Chưa chọn loại vật tư";
        
        if (p.cbtrangthai_XuatTay == "-1") return "Chưa chọn trạng thái";

        if ($("#txtserial1_XuatTay")[0].disabled) {
            if (p.txtsoluong_XuatTay == "") {
                return "Số lượng không được để trống";               
            }
            if (p.cbloaithietbi_XuatTay == "-1")
                return "Chưa chọn loại thiết bị";
        }
        if (!$("#txtserial1_XuatTay")[0].disabled) {
            if (p.txtserial1_XuatTay == "") {
                return "messinfo_XuatTay", $(".lb_series1_xuattay").html()+" không được để trống";
            }
        }

        if (!$(".hidseries").hasClass("hidseries22")) {
            if (p.txtserial2_XuatTay == "") {
                return "messinfo_XuatTay", $(".lb_series2_xuattay").html() + " không được để trống";
            }
        }
        return "";

    } catch (e) {
        console.log(e);
      
    }
}

// clear nhập thành công
function clearthanhcong_XuatTay() {
    try {
        setValToTxt('cb_nguoiduyet_XuatTay', '-1');
        setValToTxt('txtlydo_XuatTay', '');
        setValToTxt('cbloaithietbi_XuatTay', '-1');
        setValToTxt('txtserial1_XuatTay', '');
        paraTable_XuatTay = [];
        $("#myTableData_XuatTay").empty();
    } catch (e) {
        console.log(e);
    }
}

function checkLoaiNhap_NhapTay(typedetailorcount) {
    try {
        if (typedetailorcount == "0") {
            $("#txtserial1_XuatTay").attr('disabled', false);
            $("#txtsoluong_XuatTay").attr('disabled', true);
            $("#cbloaithietbi_XuatTay").attr('disabled', true);
            setValToTxt("cbloaithietbi_XuatTay", "-1");
            setValToTxt("txtsoluong_XuatTay", "1");
            setValToTxt("txtserial1_XuatTay", "");            
        }
        else {
            
            $("#txtserial1_XuatTay").attr('disabled', true);
            $("#txtsoluong_XuatTay").attr('disabled', false);
            $("#cbloaithietbi_XuatTay").attr('disabled', false);
            setValToTxt("cbloaithietbi_XuatTay", "-1");
            setValToTxt("txtsoluong_XuatTay", "");
            setValToTxt("txtserial1_XuatTay", "");
        }
    } catch (e) { console.log(e); }
}

function f_thaydoitenlable_XuatTay()
{
    var p = getAllIdMod();
    if (p.cbloainhapxuat_XuatTay == 5)
        $("#lbkho_XuatTay").text("Thu hồi tại kho");
    else
        $("#lbkho_XuatTay").text("Xuất tới kho");
}

//============================================================KET THUC LOAD CAC CONTROL==========================================================


