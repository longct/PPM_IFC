var itemCount = 0;
var paraTable_NhapTay = [];
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        // checkLoaiNhap();
        loaddatabasebandaunhaptay_NhapTay();
        checkLoaiNhap_NhapTay(0);
        $("#cb_khonhap_nhaptay").change(function () {
            loaduserkho_NhapTay();
        });

        $("#cbvattu_nhaptay").change(function () {
            loadgetlistthietbi_NhapTay();
        });

        $("#btn_them_nhaptay").click(function () {
            itemCount++;
            f_addThemTBChoValue_NhapTay();
        });
        $("#btnCapNhat_nhaptay").click(function () {          
            f_confimYesNo("Cập nhật phiếu nhập?", "Bỏ qua", "Đồng ý", function(){f_ExcuteDatabaseNhapTay_NhapTay("TB_Import_ImportWaitInHard", "f_resultCapNhatDatabase_NhapTay")});
         
        });

        $("#btnMaVanDon_nhaptay").click(function () {
            f_loadMaVanDon_NhapTay();
        });
        $("#qlsoluong_rad_nhaptay").change(function () {
            clearquanlysoluong_nhaptay();
            $("#messinfo_nhaptay").empty();
            $("#myTableData_nhaptay").empty();
        });
        $("#qlseries_rad_nhaptay").change(function () {
            $("#messinfo_nhaptay").empty();
            $("#myTableData_nhaptay").empty();
        });

    } catch (e) { console.log(e); }
});

//============================================================ XY LY CAC CHUC NANG==========================================================

function f_addThemThietBiChoGrid_NhapTay() {
    try {
        var pt = getAllIdModText();
        var html = "";
        
        html = "<tr id='tr" + itemCount + "'><td>" +
                            pt.cbvattu_nhaptay + "</td> <td>" +
                            pt.cbloaithietbi_nhaptay + " </td> <td>" +
                            pt.txtserial_nhaptay + " </td> <td>" +
                            pt.txtversion_nhaptay + " </td> <td>" +
                            pt.txtsoluong_nhaptay + " </td> <td>" +
                            pt.txt_datefrombh_nhaptay + " </td> <td>" +
                            pt.txt_datetobh_nhaptay + " </td> <td>" +
                            pt.txtthongtinthem_nhaptay + " </td><td><input type='button'  id='delete_NhapTay" + itemCount + "' value='Xóa'></td> </tr>";
        $("#myTableData_nhaptay").append(html);

        $("#delete_NhapTay" + itemCount).click(function () {
            var idremove = $(this).attr("id").replace("delete_NhapTay", "");
            var itemsFound = paraTable_NhapTay.filter(function (elem) {
                return elem.Stt == idremove;
            });

            var index = paraTable_NhapTay.indexOf(itemsFound);
            paraTable_NhapTay.splice(index, 1);
            $("#tr" + idremove).remove();
           
        });

    } catch (e) {
        console.log(e);
    }
}

function f_addThemTBChoValue_NhapTay() {
    try {

        var check = checkkytunull_NhapTay();
        if (check != "") {
            messInfo("messinfo_nhaptay", check, "error");
            return;
        }

        var p = getAllIdMod();            

        var temp = {
            TypeDeviceId: p.cbvattu_nhaptay,
            VendorId: p.cbloaithietbi_nhaptay,
            SeriesDivice: p.txtserial_nhaptay,
            Version: p.txtversion_nhaptay,
            BHTimeStart: p.txt_datefrombh_nhaptay,
            BHTimeEnd: p.txt_datetobh_nhaptay,
            Sim_TimeActive: "",
            Sim_Phone: "",
            CountDivice: p.txtsoluong_nhaptay,
            InfoAdd1: p.txtthongtinthem_nhaptay,
            InfoAdd2: "",
            StatusDivice: "1",
            Stt: itemCount
        };
        paraTable_NhapTay.push(temp);
        f_ExcuteDatabaseNhapTay_NhapTay("TB_Import_CheckSameInHard", "f_resultCheckTrungTBNhapTay_NhapTay");
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabaseNhapTay_NhapTay(namesql, calkBackTo) {
    try {
        var check = checkkytunull_NhapTay();
        if (check != "") {
            messInfo("messinfo_nhaptay", check, "error");
            return;
        }

        if (paraTable_NhapTay == null || paraTable_NhapTay == undefined || paraTable_NhapTay == "" || paraTable_NhapTay == "[]" || paraTable_NhapTay.length == 0) {
            messInfo("messinfo_nhaptay", "Không có dữ liệu cập nhật", "error");
            return;
        }
        
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_NhapTay) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            VoiceCode: p.txtMaphieu_nhaptay
          , TrackingNumber: p.txtmavandon_nhaptay
          , ProjectId: -1
          , UserIdFrom: user.userid
          , UserIdTo: p.cbnguoiduyet_nhaptay
          , Note: p.txtlydonhap_nhaptay
          , FileCV: p.file_bienban_nhaptay
          , CodeStockFrom: user.code
          , CodeStockTo: p.cb_khonhap_nhaptay
          , Onner: p.cbchusohuu_nhaptay
          , TypeInOut: "1"
        };
        console.log(para);
        console.log(JSON.parse(dt));
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}
function f_resultCheckTrungTBNhapTay_NhapTay(config, para, lst) {
    try {
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0] != null && lst.data[0].kq0.length > 0) {
            // check trung loi vao day
            messInfo("messinfo_nhaptay", lst.data[0].kq0[0].result, "error");
            paraTable_NhapTay.splice(paraTable_NhapTay.length - 1, 1);
        }
        else {
            // check trung ok moi xuong day   
          
            messInfo("messinfo_nhaptay", "", "ok");
            f_addThemThietBiChoGrid_NhapTay();
        }
    } catch (e) {
        console.log(e);
    }
}

function f_resultCapNhatDatabase_NhapTay(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_nhaptay", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_nhaptay", lst.data[0].result, "ok");
            paraTable_NhapTay = [];
            clearthanhcong_NhapTay();
            $("#myTableData_nhaptay").empty();
            f_uploadFileMaVanDon_nhaptay();
        }
        else
            messInfo("messinfo_nhaptay", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}

function f_uploadFileMaVanDon_nhaptay()
{
    try {
        var fdata = new FormData();
        var file = document.getElementById("file_bienban_nhaptay").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        if (file == null || file == 'undefined' || file.length == 0) {          
            return;
        }
        var config = { callback: "f_resultuploadFileMaVanDon_nhaptay" };
        f_UploadFileAny(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultuploadFileMaVanDon_nhaptay(config, para, data)
{
    console.log(data);
}


//============================================================KET THUC XY LY CAC CHUC NANG==========================================================



//============================================================ LOAD CAC CONTROL==========================================================
// load ra list du lieu ban dau
function loaddatabasebandaunhaptay_NhapTay() {
    try {
        setValToTxt('txt_datefrombh_nhaptay', gettimenow());
        setValToTxt('txt_datetobh_nhaptay', gettimenow());

        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loaddulieunhaptay_NhapTay", connstr: "ConnectEMS" };
        var para = { Type: 'Basic', UserId: userInfo.userid };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddulieunhaptay_NhapTay(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_khonhap_nhaptay", data[1].kq1, "code", "name", "-1", "--Chọn kho nhập--");
        dataToCob("cbchusohuu_nhaptay", data[2].kq2, "code", "name", "-1", "--Chọn chủ sở hữu-");
        f_loadMaPhieuNhap_NhapTay();

        loadLoaiThietBiSoLuongHayChiTiet_NhapTay(0);
        //
        $('input[name="quanly_nhaptay"]').on('change', function () {
            var type = $('input[name=quanly_nhaptay]').filter(':checked').val();
            loadLoaiThietBiSoLuongHayChiTiet_NhapTay(type);
            checkLoaiNhap_NhapTay(type);
        });


    } catch (e) {
        console.log(e);
    }
}
// load ra loai thiet bi tuong ung khi chon chi tiet hay so luong
function loadLoaiThietBiSoLuongHayChiTiet_NhapTay(type) {
    try {
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadLoaiThietBiSoLuongHayChiTiet_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'SoLuongChiTiet', Code: type };
      
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadLoaiThietBiSoLuongHayChiTiet_NhapTay(config, para, lst) {
    try {
       
        dataToCob("cbvattu_nhaptay", lst.data, "code", "name", "-1", "--Chọn loại vật tư--");        
    } catch (e) {
        console.log(e);
    }
}

// load ra list thiet bi
function loadgetlistthietbi_NhapTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvattu_nhaptay };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_NhapTay(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_nhaptay", data, "code", "name", "-1", "--Chọn loại thiết bị--");
    } catch (e) {
        console.log(e);
    }
}


// load ra user kho
function loaduserkho_NhapTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistuserkho_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'User', Code: p.cb_khonhap_nhaptay };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistuserkho_NhapTay(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbnguoiduyet_nhaptay", data, "code", "name", "-1", "--Chọn người duyệt--");
    } catch (e) {
        console.log(e);
    }
}

// load ra mã phiếu nhập
function f_loadMaPhieuNhap_NhapTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_resultLoadMaPhieuNhap_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'MaPhieuNhapMoi', Code: "" };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadMaPhieuNhap_NhapTay(config, para, lst) {
    try {
        setValToTxt("txtMaphieu_nhaptay", lst != null && lst != undefined && lst.data.length > 0 ? lst.data[0].voicecode : "");
    } catch (e) {
        console.log(e);
    }
}

// load ra mã van don
function f_loadMaVanDon_NhapTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_resultLoadMaVanDon_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'MaVanDon', Code: "" };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadMaVanDon_NhapTay(config, para, lst) {
    try {
        setValToTxt("txtmavandon_nhaptay", lst != null && lst != undefined && lst.data.length > 0 ? lst.data[0].mavandon : "");
    } catch (e) {
        console.log(e);
    }
}

function checkLoaiNhap_NhapTay(type) {
    try {
        if (type == "1") {
            $("#txtserial_nhaptay").attr('disabled', true);
            $("#txtversion_nhaptay").attr('disabled', true);
            $("#txtsoluong_nhaptay").attr('disabled', false);
            //$("#txt_datefrombh_nhaptay").attr('disabled', true);
            //$("#txt_datetobh_nhaptay").attr('disabled', true);
            $("#txtthongtinthem_nhaptay").attr('disabled', true);
            setValToTxt("txtsoluong_nhaptay", "");
        }
        else {
            $("#txtserial_nhaptay").attr('disabled', false);
            $("#txtversion_nhaptay").attr('disabled', false);
            $("#txtsoluong_nhaptay").attr('disabled', true);
            //$("#txt_datefrombh_nhaptay").attr('disabled', false);
            //$("#txt_datetobh_nhaptay").attr('disabled', false);
            $("#txtthongtinthem_nhaptay").attr('disabled', false);
            setValToTxt("txtsoluong_nhaptay", "1");
        }
    } catch (e) { console.log(e); }
}

// check giá trị null
function checkkytunull_NhapTay() {
    try {
        var p = getAllIdMod();
        if (p.txtMaphieu_nhaptay == "") return "Mã Phiếu không được để trống.";
        if (p.cb_khonhap_nhaptay == "-1") return "Bạn chưa chọn nhập kho";
        if (p.cbnguoiduyet_nhaptay == "-1") return "Bạn chưa chọn người duyệt";
        if (p.cbchusohuu_nhaptay == "-1") return "Bạn chưa chọn nhà sở hữu";
        if (p.txtmavandon_nhaptay == "") return "Mã vận đơn không được để trống";
        if (p.cbvattu_nhaptay == "-1") return "Bạn chưa chọn loại vật tư";
        if (p.cbloaithietbi_nhaptay == "-1") return "Bạn chưa chọn loại thiết bị";

        var type = $('input[name=quanly_nhaptay]').filter(':checked').val();
        if (type == 0) {
            if (p.txtserial_nhaptay == "") {
               return "Không được để trống serial";
            }
        }
     
        return "";

    } catch (e) {
        console.log(e);
    }
}

// clear nhập thành công
function clearthanhcong_NhapTay() {
    try {
        loaddatabasebandaunhaptay_NhapTay();
        //setValToTxt('cb_khonhap_nhaptay', '-1');
       setValToTxt('cbnguoiduyet_nhaptay', '-1');
        // setValToTxt('cbchusohuu_nhaptay', '-1');
        setValToTxt('txtmavandon_nhaptay', '');
        setValToTxt('btnMaVanDon_nhaptay', '');
        setValToTxt('txtlydonhap_nhaptay', '');
       // setValToTxt('cbvattu_nhaptay', '-1');
        setValToTxt('cbloaithietbi_nhaptay', '-1');
        setValToTxt('txtserial_nhaptay', '');
        setValToTxt('txtversion_nhaptay', '');
        setValToTxt('txt_datefrombh_nhaptay', gettimenow());
        setValToTxt('txt_datetobh_nhaptay', gettimenow());
        setValToTxt('txtthongtinthem_nhaptay', '');
    } catch (e) {
        console.log(e);
    }
}
function clearquanlysoluong_nhaptay() {
    try {
        
        setValToTxt('txtserial_nhaptay', '');
        setValToTxt('txtversion_nhaptay', '');
        setValToTxt('txt_datefrombh_nhaptay', gettimenow());
        setValToTxt('txt_datetobh_nhaptay', gettimenow());
        setValToTxt('txtthongtinthem_nhaptay', '');

    } catch (e) {
        console.log(e);
    }
}


//============================================================KET THUC LOAD CAC CONTROL==========================================================


