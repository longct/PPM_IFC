var itemCount = 0;
var paraTable_XuatTay = [];
var VoiceCodeFirst = "";
var VoiceCodeSecond = "";
var VoiceCodeThrid = "";
var okxuat = false;
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        setValToTxt('txt_ngayxuat_XuatTay', gettimenow());
        loaddatabasebandau_XuatTay();
        loadvattuthietbi_XuatTay();
        f_anHien2Series();
        
        $("#cb_toikho_XuatTay").change(function () {
            if ($("#cb_toikho_XuatTay").val().length == 8) {
                $("#cb_project_XuatTay").removeAttr("disabled");
            } else {
                $("#cb_project_XuatTay").attr("disabled", true);
            }
            loaduserkho_XuatTay();
            loadduan_XuatTay();
            loadtrangthai_xuattay();
            
        });

        $("#cbvattu_XuatTay").change(function () {
            messInfo("messinfo_XuatTay", "", "error");
            messInfo("messinfo_XuatTay", "", "ok");
            loadgetlistthietbi_XuatTay();
        });

        $("#btn_them_XuatTay").click(function () {
            itemCount++;
            f_addThemTBChoValue_XuatTay();
            okxuat = false;
        });
        $("#btnCapNhat_XuatTay").click(function () {
            var user = JSON.parse(localStorage.getItem("userinfo"));
           
            if ($("#cb_toikho_XuatTay").val().length == 8 ) {
                if ($("#cb_project_XuatTay").val() == "-1") {
                    messInfo("messinfo_XuatTay", "Vui lòng chọn dự án", "error");
                    return;
                }
            }
            if ($("#myTableData_XuatTay tr").length == 0) {
                messInfo("messinfo_XuatTay", "Không có dữ liệu cập nhật", "error");
                return;
            }
            
            f_confimYesNo("Cập nhật phiếu xuất?", "Bỏ qua", "Đồng ý",
                function () { okxuat = true; $("#btnCapNhat_XuatTay").attr("disabled", "disabled"); f_ExcuteDatabase_XuatTay("TB_Export_CheckSameInHard", "f_resultCheckTrungTB_XuatTay");  });
        });

        $("#cbloainhapxuat_XuatTay").change(function () {
            messInfo("messinfo_XuatTay", "", "ok");
            clearthanhcong_XuatTay();
            f_thaydoitenlable_XuatTay();
            var p = getAllIdMod();
            if (p.cbloainhapxuat_XuatTay != "-1") {
                f_loaikho_XuatTay();
            }
            if (p.cbloainhapxuat_XuatTay == "8") {
                $(".datehide").show();
            } else {
                $(".datehide").hide();
            }
           
            setValToTxt('txt_ngayxuat_XuatTay', gettimenow());
        });
      
        
    } catch (e) { console.log(e); }
});
function changeDate() {
    alert(2);
}
//============================================================ XY LY CAC CHUC NANG==========================================================

function f_addThemThietBiChoGrid_XuatTay() {
    try {
       
        //lay thiet bi va loai thiet bi doi ve serial
        var typeofout = $("#cbvattu_XuatTay option:checked").attr("data-type");
        if (typeofout == 0) {
            var userInfo = JSON.parse(localStorage.getItem("userinfo"));
            var config = { namesql: "TB_Export_GetThietBiTrangThai", callback: "f_result_getthietbitrangthai", connstr: "ConnectEMS" };
            var para = { SeriesDivice: $("#txtserial1_XuatTay").val() };
            ExecuteServiceSyns(config, para, false);
        } else {
            var pt = getAllIdModText();
            f_addThemThietBiChoGridSucess_XuatTay(pt.cbloaithietbi_XuatTay, pt.cbtrangthai_XuatTay);
        }
     
    } catch (e) {
        console.log(e);
    }
}
function f_result_getthietbitrangthai(config,para,lst) {
    var thietbi="-";
    var trangthai = "-";
    if (lst != null || lst != undefined || lst != "[]") {
        thietbi = lst.data[0].tenvattu;
        trangthai = lst.data[0].trangthai;
    }
    f_addThemThietBiChoGridSucess_XuatTay(thietbi, trangthai);
   
}
function f_addThemThietBiChoGridSucess_XuatTay(thietbi, trangthai) {
    var pt = getAllIdModText();

    var html = "";

    html = "<tr id='tr" + itemCount + "'><td class='c'>" +
                        pt.cbvattu_XuatTay + "</td> <td class='c'>" +
                        thietbi + " </td> <td class='c'>" +
                        trangthai + " </td> <td class='c'>" +
                        pt.txtserial1_XuatTay + " </td>" +
                        "<td class='hidseries c'>" + pt.txtserial2_XuatTay + " </td>" +
                       "<td class='c'>" + pt.txtsoluong_XuatTay + " </td>" +
                        "<td class='c'><input type='button'  id='delete_XuatTay" + itemCount + "' value='Xóa'></td> </tr>";
    $("#myTableData_XuatTay").append(html);

    $("#delete_XuatTay" + itemCount).click(function () {
        var idremove = $(this).attr("id").replace("delete_XuatTay", "");

        for (var i = 0; i < paraTable_XuatTay.length; i++) {
            if (paraTable_XuatTay[i].Stt == idremove) {
                paraTable_XuatTay.splice(i, 1);
                break;
            }
        }

        $("#tr" + idremove).remove();

    });

    f_anHien2Series();
    $("#txtserial1_XuatTay").val("");
    $("#txtserial2_XuatTay").val("");
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
        var type = $("#cbvattu_XuatTay option:checked").attr("data-type");
        var exists = [];
        if (type == "1") {
            exists = $.grep(paraTable_XuatTay, function (item) {

                return (item.SeriesDivice1 == p.txtserial1_XuatTay
                    && item.TypeDeviceId == p.cbvattu_XuatTay
                    && item.VendorId == p.cbloaithietbi_XuatTay
                    && item.StatusDivice == p.cbtrangthai_XuatTay
                )
                ;
            }); /* use length of array as truth test */
        } else {
            exists = $.grep(paraTable_XuatTay, function (item) {

                return (
                    item.SeriesDivice1 == p.txtserial1_XuatTay
                    && item.SeriesDivice2 == p.txtserial2_XuatTay
                )
                ;
            }); 
        }
        console.log(exists);
        if (exists.length <= 0) {
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
        var CodeStockFrom = "";
        var CodeStockTo = "";
        var UserIdFrom = "";
        var UserIdTo = "";
        if (p.cbloainhapxuat_XuatTay == "5" && user.code.length == 4) {

            CodeStockFrom = p.cb_toikho_XuatTay
            CodeStockTo = user.code
            UserIdFrom = parseInt(p.cb_nguoiduyet_XuatTay)
            UserIdTo=parseInt(user.userid)
        }
        else if (p.cbloainhapxuat_XuatTay == "5" &&  p.cb_toikho_XuatTay.length == 8) {
            CodeStockFrom = p.cb_toikho_XuatTay
            CodeStockTo = user.code
            UserIdFrom = parseInt(user.userid)
            UserIdTo = parseInt(p.cb_nguoiduyet_XuatTay)
        }
        else {
            CodeStockFrom = user.code
            CodeStockTo = p.cb_toikho_XuatTay
            UserIdFrom =parseInt(user.userid)
            UserIdTo = parseInt(p.cb_nguoiduyet_XuatTay)
        }
        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            TypeExport: p.cbloainhapxuat_XuatTay
          , ProjectId:parseInt(p.cb_project_XuatTay)
          , UserIdFrom: UserIdFrom
          , UserIdTo: UserIdTo
          , FileCV: p.file_bienban_XuatTay
          , Note: p.txtlydo_XuatTay
          , CodeStockFrom: CodeStockFrom
          , CodeStockTo: CodeStockTo
          , VendorId:parseInt(p.cbloaithietbi_XuatTay)
          , TrangThai:parseInt(p.cbtrangthai_XuatTay)
          , CountDivice: parseInt(p.txtsoluong_XuatTay)
          , TypeDetailOrCount: parseInt($("#cbvattu_XuatTay").find("option:checked").attr("data-type"))
          , SeriesDivice: p.txtserial1_XuatTay
          , NgayXuatThuHoi: p.txt_ngayxuat_XuatTay
        };
        console.log(para);
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}
function f_resultCheckTrungTB_XuatTay(config, para, lst) {
    try {
        console.log(lst);
        if (lst != null && lst != undefined && lst.data != '[]') {
            // check trung loi vao day
            if (lst.data[0].result.toLowerCase().indexOf("mã phiếu đã có tồn tại") < 0) {
                messInfo("messinfo_XuatTay", lst.data[0].result, "error");
                paraTable_XuatTay.splice(paraTable_XuatTay.length - 1, 1);
            } else {
                f_addThemThietBiChoGrid_XuatTay();
            }
            okxuat = false;
        }
        else {
            // check trung ok moi xuong day   
            $("#btnCapNhat_XuatTay").removeAttr("disabled");
            messInfo("messinfo_XuatTay", "", "ok");
            if (okxuat == false) {
                f_addThemThietBiChoGrid_XuatTay();
            } else {
                f_ExcuteDatabase_XuatTay("TB_Export_WaitInHard", "f_resultTB_Export_WaitInHard_XuatTay");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function f_resultTB_Export_WaitInHard_XuatTay(config, para, lst) {
    try {
        $("#btnCapNhat_XuatTay").removeAttr("disabled");
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_XuatTay", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_XuatTay", lst.data[0].result, "ok");
            clearthanhcong_XuatTay();
            f_uploadFileMaVanDon_XuatTay();
            okxuat = false;
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
// load ra loại nhập xuất
function loaddatabasebandau_XuatTay() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "f_result_loadduloainhapxuat_XuatTay", connstr: "ConnectEMS" };
        var para = { Type: 'loainhapxuat', UserId: userInfo.userid };
       
        ExecuteServiceSyns(config, para, false);


    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduloainhapxuat_XuatTay(config, para, lst) {
    try {
        if (lst == undefined || lst == null || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbloainhapxuat_XuatTay", data, "code", "name", "-1", "--Chọn loại xuất--");
      
    } catch (e) {
        console.log(e);
    }
}
function loadvattuthietbi_XuatTay() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "f_result_loadvattuthietbi_XuatTay", connstr: "ConnectEMS" };
        var para = { Type: 'VTTB', UserId: userInfo.userid };
        console.log(para);
        ExecuteServiceSyns(config, para, false);


    } catch (e) {
        console.log(e);
    }
}

function f_result_loadvattuthietbi_XuatTay(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        $("#cbvattu_XuatTay").append("<option value='ms' data-type='0'>Modem + Sim </option>")
        $.each(data, function (key, val) {
            $("#cbvattu_XuatTay").append("<option value=" + val.code + " data-type=" + val.typedetailorcount + ">" + val.name + "</option>")
        });


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
        if ($("#cbvattu_XuatTay option:checked").val() == 'ms') {
            var typeofout = $("#cbvattu_XuatTay option:checked").attr("data-type");
            checkLoaiNhap_NhapTay(typeofout)
        } else {
            checkLoaiNhap_NhapTay(lst.data[0].typedetailorcount)
        }
       

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
//Load Trang thai
function loadtrangthai_xuattay() {
    try{
        // load trang thai thiet bi
        var p = getAllIdMod();
        var code = "";
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_XuatTay", connstr: "ConnectEMS" };
        if (p.cbloainhapxuat_XuatTay == "4") {
            code = userInfo.code;
        } else
            code = p.cb_toikho_XuatTay;
        var para = { IsType: "LoadTrangThaiXuat", Code: code };
        ExecuteServiceSyns(config, para, false);

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

// load du an
function loadduan_XuatTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_XuatTay", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: p.cb_toikho_XuatTay };
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


function f_loaikho_XuatTay() {
    var userInfo = JSON.parse(localStorage.getItem("userinfo"));
    // load KHO TUONG UNG
    var p = getAllIdMod();
    var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_resultLoadKhoXuat_XuatTay", connstr: "ConnectEMS" };
    var para = { IsType: "LoadKhoXuat", TypeExport: p.cbloainhapxuat_XuatTay, Userid: userInfo.userid, Code: userInfo.code };
    ExecuteServiceSyns(config, para, false);
}


function f_resultLoadKhoXuat_XuatTay(config, para, lst) {
    try {

        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.length == 0) {
            messInfo("messinfo_XuatTay", "Bạn không có quyền", "error");
            clearthanhcong_XuatTay();
            return;
        }
        dataToCob("cb_toikho_XuatTay", lst.data, "code", "name", "-1", "--Chọn kho--");

        var user = localStorage.getItem("userinfo");

    } catch (e) {
        console.log(e);
    }
}


// check giá trị null
function checkkytunull_XuatTay() {
    try {
        var p = getAllIdMod();
        
        if (p.cbloainhapxuat_XuatTay == "-1") return "Vui lòng chọn loại xuất";
        if (p.cb_toikho_XuatTay == "-1") return "Vui lòng chọn kho nhập";
        if (p.cb_nguoiduyet_XuatTay == "-1") return "Chưa chọn người duyệt";
        if (p.cbchusohuu_XuatTay == "-1") return "Vui lòng chọn nhà sở hữu";
        if (p.txtmavandon_XuatTay == "") return "Vui lòng nhập mã đơn vận";
        if (p.txtlydo_XuatTay == "") return "Vui lòng chọn lý do";
        if (p.cbvattu_XuatTay == "-1") return "Vui lòng chọn loại vật tư";
        if (!$("#cbtrangthai_XuatTay")[0].disabled) {
            if (p.cbtrangthai_XuatTay == "-1") return "Vui lòng chọn trạng thái";
        }

        if ($("#txtserial1_XuatTay")[0].disabled) {
            if (p.txtsoluong_XuatTay == "") {
                return "Vui lòng chọn số lượng";               
            }
            if (p.cbloaithietbi_XuatTay == "-1")
                return "Vui lòng chọn loại thiết bị";
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
        setValToTxt('txtserial2_XuatTay', '1');
        setValToTxt('txtsoluong_XuatTay', '1');
        $("#file_bienban_XuatTay").val("");
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
            $("#cbtrangthai_XuatTay").attr('disabled', true);
            setValToTxt("cbloaithietbi_XuatTay", "-1");
            setValToTxt("txtsoluong_XuatTay", "1");
            setValToTxt("txtserial1_XuatTay", "");
            setValToTxt("txtserial2_XuatTay", "");
        }
        else { 
            $("#txtserial1_XuatTay").attr('disabled', true);
            $("#txtsoluong_XuatTay").attr('disabled', false);
            $("#cbloaithietbi_XuatTay").attr('disabled', false);
            $("#cbtrangthai_XuatTay").attr('disabled', false);
            setValToTxt("cbloaithietbi_XuatTay", "-1");
            setValToTxt("txtsoluong_XuatTay", "1");
            setValToTxt("txtserial1_XuatTay", "");
            setValToTxt("txtserial2_XuatTay", "");
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


