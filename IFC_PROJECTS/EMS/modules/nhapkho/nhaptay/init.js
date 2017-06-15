var itemCount = 0;
var paraTable_NhapTay = [];
var maphieu123 = "";
var oknhap = false;
$(document).ready(function () {
    try {
        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (user.code.length > 4) {
            $(".classnhaptay").html("Không có quyền xem trang này");
            return;
        } else {
            loadConetent();
            loadInitDate();
            loaddatabasebandaunhaptay_NhapTay();
            checkLoaiNhap_NhapTay(0);
           
            loaddatabasebandaukhotong_NhapTay();
            $("#cb_khonhap_nhaptay").change(function () {
                loaduserkho_NhapTay();
            });

            $("#cbvattu_nhaptay").change(function () {
                loadgetlistthietbi_NhapTay();
            });

            $("#btn_them_nhaptay").click(function () {
                itemCount++;
                f_addThemTBChoValue_NhapTay();
                oknhap = false;
            });
            $("#btnCapNhat_nhaptay").click(function () {
                f_confimYesNo("Cập nhật phiếu nhập?", "Bỏ qua", "Đồng ý", function () { oknhap = true; $("#btnCapNhat_nhaptay").attr("disabled", "disabled"); f_ExcuteDatabaseNhapTay_NhapTay("TB_Import_CheckSameInHard", "f_resultCheckTrungTBNhapTay_NhapTay");});

            });

            $("#qlsoluong_rad_nhaptay").change(function () {
                paraTable_NhapTay = [];
                clearquanlysoluong_nhaptay();
                setValToTxt('cbloaithietbi_nhaptay', '-1');
                $("#messinfo_nhaptay").empty();
                $("#myTableData_nhaptay").empty();

            });
            $("#qlseries_rad_nhaptay").change(function () {
                paraTable_NhapTay = [];
                $("#messinfo_nhaptay").html("");
                $("#messinfo_nhaptay").empty();
                $("#myTableData_nhaptay").empty();

            });
            $("#cbchuloainhap_nhaptay").change(function () {
                if ($("#cbchuloainhap_nhaptay").val() == "1") {
                    $("#txtMaphieu_nhaptay").val(maphieu123.replace("PNTP", "PNM"));
                    $("#txtmavandon_nhaptay").removeAttr("disabled");
                }
                else {
                    $("#txtMaphieu_nhaptay").val(maphieu123.replace("PNM", "PNTP"));
                    $("#txtmavandon_nhaptay").attr("disabled", true);
                    $("#txtmavandon_nhaptay").val("-1");
                }
            });

            $("#txtmavandon_nhaptay").change(function () {
                var val = $(this).val();
                $('#txtmavandon_nhaptay option[selected=selected]').removeAttr('selected');
                $('#txtmavandon_nhaptay option[value="' + val + '"]').attr('selected', 'selected');
            });
        }
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
            for (var i = 0; i < paraTable_NhapTay.length; i++) {
                if (paraTable_NhapTay[i].Stt == idremove) {
                    paraTable_NhapTay.splice(i, 1);
                    break;
                }
            }

            $("#tr" + idremove).remove();
        });
    } catch (e) {
        console.log(e);
    }
}

function f_addThemTBChoValue_NhapTay() {
    try {
        messInfo("messinfo_nhaptay", "", "error");
        messInfo("messinfo_nhaptay", "", "ok");

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
        var typesl = $("#qlsoluong_rad_nhaptay").prop("checked");
        var typeserial = $("#qlseries_rad_nhaptay").prop("checked");
        var exists = [];
        if (typeserial == true) {
            exists = $.grep(paraTable_NhapTay, function (item) {

                return (item.SeriesDivice == p.txtserial_nhaptay
                    && item.TypeDeviceId == p.cbvattu_nhaptay
                    && item.VendorId == p.cbloaithietbi_nhaptay
                )
                ;
            }); /* use length of array as truth test */
        } else {
            exists = $.grep(paraTable_NhapTay, function (item) {

                return (item.SeriesDivice == p.txtserial_nhaptay
                    && item.TypeDeviceId == p.cbvattu_nhaptay
                    && item.VendorId == p.cbloaithietbi_nhaptay
                )
                ;
            });
        }
        if (exists.length <= 0) {
            paraTable_NhapTay.push(temp);
            f_ExcuteDatabaseNhapTay_NhapTay("TB_Import_CheckSameInHard", "f_resultCheckTrungTBNhapTay_NhapTay");
        }
        else {
            messInfo("messinfo_nhaptay", "Thiết bị " + $("#cbloaithietbi_nhaptay option:checked").text() + " đã tồn tại", "error");
        }
       
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabaseNhapTay_NhapTay(namesql, calkBackTo) {
    try {
        if (paraTable_NhapTay == null || paraTable_NhapTay == undefined || paraTable_NhapTay == "" || paraTable_NhapTay == "[]" || paraTable_NhapTay.length == 0) {
            messInfo("messinfo_nhaptay", "Không có dữ liệu cập nhật", "error");
            return;
        }
        
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_NhapTay) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
           TrackingNumber: p.txtmavandon_nhaptay
          , ProjectId: -1
          , UserIdFrom: user.userid
          , UserIdTo: p.cbnguoiduyet_nhaptay
          , Note: p.txtlydonhap_nhaptay
          , FileCV: p.file_bienban_nhaptay
          , CodeStockFrom: user.code
          , CodeStockTo: p.cb_khonhap_nhaptay
          , Onner: p.cbchusohuu_nhaptay
          , TypeInOut: "1"
          , LoaiNhap:parseInt(p.cbchuloainhap_nhaptay)
        };
        console.log(para);
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}
function f_resultCheckTrungTBNhapTay_NhapTay(config, para, lst) {
    try {
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0] != null && lst.data[0].kq0.length > 0) {
            // check trung loi vao day
            if (lst.data[0].kq0[0].result.toLowerCase().indexOf("mã phiếu đã có tồn tại") < 0) {
                messInfo("messinfo_nhaptay", lst.data[0].kq0[0].result, "error");
                paraTable_NhapTay.splice(paraTable_NhapTay.length - 1, 1);
            } else {
               // f_loadMaPhieuNhap_NhapTay();
                f_addThemThietBiChoGrid_NhapTay();
            }
            oknhap = false;
        }
        else {
            // check trung ok moi xuong day   
            $("#btnCapNhat_nhaptay").removeAttr("disabled");
            if (oknhap == false) {
                messInfo("messinfo_nhaptay", "", "ok");
                f_addThemThietBiChoGrid_NhapTay();
            } else {
                f_ExcuteDatabaseNhapTay_NhapTay("TB_Import_ImportWaitInHard", "f_resultCapNhatDatabase_NhapTay");
            }
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
        $("#btnCapNhat_nhaptay").removeAttr("disabled");
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_nhaptay", lst.data[0].result, "ok");
            paraTable_NhapTay = [];
            clearthanhcong_NhapTay();
            $("#myTableData_nhaptay").empty();
            f_uploadFileMaVanDon_nhaptay();
            f_loadMaVanDon_NhapTay();
            $("#qlseries_rad_nhaptay").prop("checked", true);
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
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loaddulieunhaptay_Chusohuu_NhapTay", connstr: "ConnectEMS" };
        var para = { Type: 'SoHuu', UserId: userInfo.userid };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddulieunhaptay_Chusohuu_NhapTay(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbchusohuu_nhaptay", data, "code", "name", "-1", "--Chọn chủ sở hữu-");
       // f_loadMaPhieuNhap_NhapTay();

        loadLoaiThietBiSoLuongHayChiTiet_NhapTay(0);
        //
        $('input[name="quanly_nhaptay"]').on('change', function () {
            var type = $('input[name=quanly_nhaptay]').filter(':checked').val();
            loadLoaiThietBiSoLuongHayChiTiet_NhapTay(type);
            checkLoaiNhap_NhapTay(type);
            paraTable_NhapTay = [];
        });


    } catch (e) {
        console.log(e);
    }
}
function loaddatabasebandaukhotong_NhapTay() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loaddulieukhotong_NhapTay", connstr: "ConnectEMS" };
        var para = { Type: 'khotongtheouser', UserId: userInfo.userid };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddulieukhotong_NhapTay(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_khonhap_nhaptay", data, "code", "name");
        loaduserkho_NhapTay();
        f_loadMaVanDon_NhapTay();
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
        if (lst == null || lst == undefined || lst == '[]') return;
        maphieu123 = lst.data[0].voicecode
        if ($("#cbchuloainhap_nhaptay").val() == "1") {
            $("#txtMaphieu_nhaptay").val(maphieu123.replace("PNTP", "PNM"));
        }
        else {
            $("#txtMaphieu_nhaptay").val(maphieu123.replace("PNM", "PNTP"));
        }
    } catch (e) {
        console.log(e);
    }
}

// load ra mã van don
function f_loadMaVanDon_NhapTay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_resultLoadMaVanDon_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'MaHD', Code: p.cb_khonhap_nhaptay };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

var LIST_HOP_DONG;
function f_resultLoadMaVanDon_NhapTay(config, para, lst) {
    try {

        if (lst == null || lst == undefined || lst == "[]") return;
       
        var data = lst.data;
        LIST_HOP_DONG = lst.data;
        dataToCob("txtmavandon_nhaptay", data, "mahd", "mahd", "-1", "--Chọn mã hợp đồng--");

        $("#txtmavandon_nhaptay").hover(function () {
            $("#txtmavandon_nhaptay").popover("destroy");
            var mahd = $("#txtmavandon_nhaptay option:selected").val();
            console.log(mahd);
            if (mahd == "-1") return;
            
            var hdObj = $.grep(LIST_HOP_DONG,function (val, index) {
                            return val.mahd == mahd;
            })[0];
            $("#txtmavandon_nhaptay").popover({
                placement: 'bottom',
                html: true,
                trigger: 'manual',
                content: '<div><span style="margin-right:5px;font-size:13px">Mã hợp đồng:</span><b style="font-size:13px">' + hdObj.mahd + '</b><br/>'
                    + '<span style="margin-right:5px;font-size:13px">Tên hợp đồng:</span><b  style="font-size:13px">' + hdObj.tenhd + '</b><br/>'
                    + '<span style="margin-right:5px;font-size:13px">Số lượng:</span><b  style="font-size:13px">' + hdObj.soluonghd + '</b><br/>'
                    + '<span style="margin-right:5px;font-size:13px">Ghi chú:</span><b  style="font-size:13px">' + hdObj.ghichu + '</b><br/>'
                    + '</div>'
            });
            $("#txtmavandon_nhaptay").popover('show');
        });

        $("#txtmavandon_nhaptay").mouseleave(function () {
            $("#txtmavandon_nhaptay").popover("destroy");
        });
        
        
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
            $("#txtthongtinthem_nhaptay").attr('disabled', true);
            setValToTxt("txtsoluong_nhaptay", "");
        }
        else {
            $("#txtserial_nhaptay").attr('disabled', false);
            $("#txtversion_nhaptay").attr('disabled', false);
            $("#txtsoluong_nhaptay").attr('disabled', true);
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
        if (p.cb_khonhap_nhaptay == "-1") return "Vui lòng chọn Kho nhập";
        if (p.cbnguoiduyet_nhaptay == "-1") return "Vui lòng chọn người duyệt";
        if (p.cbchusohuu_nhaptay == "-1") return "Vui lòng chọn chủ sở hữu";
        if (p.txtmavandon_nhaptay == "-1" && $("#cbchuloainhap_nhaptay").val()=="1") return "Vui lòng chọn mã hợp đồng";
        if (p.txtlydonhap_nhaptay == "") return "Vui lòng nhập lý do"
        if (p.cbvattu_nhaptay == "-1") return "Vui lòng chọn loại vật tư";
        if (p.cbloaithietbi_nhaptay == "-1") return "Vui lòng chọn loại thiết bị";
        if (p.txtsoluong_nhaptay == "") return "Vui lòng nhập số lượng";
        if (p.txt_datefrombh_nhaptay == "") return "Vui lòng nhập thời gian bắt đầu bảo hành";
        if (p.txt_datetobh_nhaptay == "") return "Vui lòng nhập thời gian kết thúc bảo hành";
        var type = $('input[name=quanly_nhaptay]').filter(':checked').val();
        if (type == 0) {
            if (p.txtserial_nhaptay == "") {
               return "Vui lòng nhập số serial";
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
        setValToTxt('cbnguoiduyet_nhaptay', '-1');
        setValToTxt('txtmavandon_nhaptay', '-1');
        setValToTxt('btnMaVanDon_nhaptay', '');
        setValToTxt('txtlydonhap_nhaptay', '');
        setValToTxt('cbloaithietbi_nhaptay', '-1');
        setValToTxt('txtserial_nhaptay', '');
        setValToTxt('txtversion_nhaptay', '');
        setValToTxt('txt_datefrombh_nhaptay', gettimenow());
        setValToTxt('txt_datetobh_nhaptay', gettimenow());
        setValToTxt('txtthongtinthem_nhaptay', '');
        setValToTxt("txtsoluong_nhaptay", "1");
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
        setValToTxt("txtsoluong_nhaptay", "1");
    } catch (e) {
        console.log(e);
    }
}


//============================================================KET THUC LOAD CAC CONTROL==========================================================


