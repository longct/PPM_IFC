var itemCountda = 0;
var paraTable_sua_DA = [];
var idsuada = 0;
var stockcodeda = "";
var idprojectda = 0;
$(document).ready(function () {
    try {
        setValToTxt("txtthoigiangh_sua_da", gettimenow());
       
      
        $("#cbvattu_sua_da").change(function () {
            loadgetlistthietbi_sua_DA();
        });

        $("#btn_sua_da").click(function () {
            itemCountda++;
            f_addThemTBChoValue_sua_DA();
        });
        $("#btnCapNhat_sua_da").click(function () {
            messInfo("messinfo_sua_da", "", "error");

            f_ExcuteDatabaseNhapTay_sua_DA("TB_KH_DUAN_EDIT", "f_resultCapNhatDatabase_sua_DA")

        });
        $("#btnclose_sua_kbda").click(function () {
            messInfo("messinfo_sua_da", "", "error");
            messInfo("messinfo_sua_da", "", "ok");
        });
    } catch (e) { console.log(e); }
});

// load ban miền
function loadBanMien_sua_da() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadBanMien_sua_da", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanMien_sua_da(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbvattu_sua_da", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cb_banmien_sua_da", data[1].kq1, "code", "name", "-1", "--Tất cả--");
     
        $("#cb_banmien_sua_da").val(stockcodeda);
    } catch (e) {
        console.log(e);
    }
}
function LoadDienLuc_sua_da(stockcode) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_sua_da", connstr: "ConnectEMS" };
        var para = {
            IsType: 'KBDUAN',
            Code: stockcode
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_sua_da(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbdienluc_sua_da", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// load ra list thiet bi
function loadgetlistthietbi_sua_DA() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_suada", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvattu_sua_da };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_suada(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_sua_da", data, "code", "name", "-1", "--Chọn loại thiết bị--");
    } catch (e) {
        console.log(e);
    }
}

function LoadDuAn_sua_da(stockcode) {
    try {
        var config = { namesql: "TB_LoadDuAn_KBDA", callback: "f_result_loadduan_suada", connstr: "ConnectEMS" };
        var para = {
            Code: stockcode
        };
      
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_suada(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_da_suada", data, "code", "name", "-1", "--Tất cả--");
        $("#cb_da_suada").val(idprojectda);
    } catch (e) {
        console.log(e);
    }
}

// load ra chi tiet thiet bi
function loadthongtinchitiet_edit_kbda(id) {
    try {
        idsuada = id;
        var config = { namesql: "TB_KH_LoadKhaiBaoDuAn_XemChiTiet", callback: "f_TB_KH_LoadKhaiBaoDuAn_edit", connstr: "ConnectEMS" };
        var para = { id: parseInt(id) };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_TB_KH_LoadKhaiBaoDuAn_edit(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];
        console.log(data);
        stockcodeda = data.stockcode;
        idprojectda = data.projectid;

        loadBanMien_sua_da();
        LoadDuAn_sua_da(data.stockcode);
        LoadDienLuc_sua_da(data.stockcode);

        $("#txtMaduanHead_nhapsuada").html("Thông tin chi tiết dự án " + data.projectname);
        setValToTxt('txtthoigian_sua_da', data.thoigiangh);
        setValToTxt('txtghichu_sua_da', data.ghichu);
      
        $("#myTableData_sua_nhapdact").empty();
        $.each(lst.data[1].kq1, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.dienluc + "</td><td>"
                + val.typedevicename + "</td><td>"
                + val.tenvattu + "</td><td>"
                + val.countdivice + "</td><td>"
                + val.ghichu + "</td><td>"
                + "<input type='button'  onclick='xoa_vttb_kbda(" + val.id + ")'  value='Xóa'></td>";
            "</tr>";
            $("#myTableData_sua_nhapdact").append(row);
        });
        
    } catch (e) {
        console.log(e);
    }
}
//==============================================
function xoa_vttb_kbda(id) {
    try{
        f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý",
              function () { excute_xoa_sua_kbda(id); });

    } catch (e) {
        console.log(e);
    }
}
function excute_xoa_sua_kbda(id) {
    try{
        var config = { namesql: "TB_Lis_XoaVTTB_KHDA", callback: "f_TB_xoa_sua_vttb_KBDA", connstr: "ConnectEMS" };
        var para = { v_id: parseInt(id) };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_TB_xoa_sua_vttb_KBDA(config, para, lst) {
    try {

        if (lst == null || lst == undefined || lst == "[]") return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("messinfo_sua_da", lst.data[0].result, "ok");
            loadthongtinchitiet_edit_kbda(idsuada);
            loadtable_chitiet(1);
        }
        else
            messInfo("messinfo_sua_da", lst.data[0].result, "error");
    } catch (e) {
        console.log(e);
    }
}
///=========================
function f_addThemThietBiChoGrid_sua_DA() {
    try {
        var pt = getAllIdModText();
        var html = "";

        html = "<tr id='tr" + itemCountda + "'><td>" +
                            pt.cbdienluc_sua_da + "</td> <td>" +
                            pt.cbvattu_sua_da + "</td> <td>" +
                            pt.cbloaithietbi_sua_da + " </td> <td>" +
                            pt.txtsoluong_sua_da + " </td> <td>" +
                            pt.txtthongtinthem_sua_da + " </td> <td>" +
                            "<input type='button'  id='delete_sua_da" + itemCountda + "' value='Xóa'></td> </tr>";
        $("#myTableData_sua_nhapdact").append(html);

        $("#delete_sua_da" + itemCountda).click(function () {
            var idremove = $(this).attr("id").replace("delete_sua_da", "");
            for (var i = 0; i < paraTable_sua_DA.length; i++) {
                if (paraTable_sua_DA[i].Stt == idremove) {
                    paraTable_sua_DA.splice(i, 1);
                    break;
                }
            }
            $("#tr" + idremove).remove();
        });

    } catch (e) {
        console.log(e);
    }
}

function f_addThemTBChoValue_sua_DA() {
    try {
        var check = checknull_sua_DA();
        if (check != "") {
            messInfo("messinfo_sua_da", check, "error");
            return;
        }
        messInfo("messinfo_sua_da", "", "error");
        var p = getAllIdMod();

        var temp = {
            StockCode: p.cbdienluc_sua_da,
            TypeDeviceId: p.cbvattu_sua_da,
            VendorId: p.cbloaithietbi_sua_da,
            CountDivice: p.txtsoluong_sua_da,
            Note: p.txtthongtinthem_sua_da,
            Stt: itemCountda
        };
        paraTable_sua_DA.push(temp);
        f_addThemThietBiChoGrid_sua_DA();
        
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabaseNhapTay_sua_DA(namesql, calkBackTo) {
    try {
        var check = checkkytunull_sua_DA();
        if (check != "") {
            messInfo("messinfo_sua_da", check, "error");
            return;
        }

        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_sua_DA) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            StockCode: p.cb_banmien_sua_da
          , UserId: user.userid
          , ProjectId: parseInt(p.cb_da_suada)
          , ThoiGianGH: p.txtthoigiangh_sua_da
          , ThoiGianDK: p.txtthoigiangh_sua_da
          , GhiChu: p.txtghichu_sua_da
          , DuAnId: idsuada
        };
        console.log(para);
        if (paraTable_sua_DA.length == 0) {
            ExecuteServiceSyns(config, para, false);
        } else {
            ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
        }
    } catch (e) {
        console.log(e);
    }
}

function f_resultCapNhatDatabase_sua_DA(config, para, lst) {
    try {

        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_sua_da", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_sua_da", lst.data[0].result, "ok");
            paraTable_sua_DA = [];
            clearthanhcong_sua_DA();
            loadthongtinchitiet_edit_kbda(idsuada);
            loadtable_chitiet(1);
        }
        else
            messInfo("messinfo_sua_da", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}


//============================================================ LOAD CAC CONTROL==========================================================

function checknull_sua_DA() {
    try {
        var p = getAllIdMod();
        if (p.cb_banmien_sua_da == "-1") return "Vui lòng chọn ban miền.";
        if (p.cb_da_suada == "-1") return "Vui lòng chọn dự án";
        if (p.txtthoigian_sua_da == "") return "Vui lòng nhập thời gian giao hàng";
        if (p.cbdienluc_sua_da == "-1") return "Vui lòng chọn điện lực";
        if (p.cbvattu_sua_da == "-1") return "Vui lòng chọn vật tư thiết bị";
        if (p.cbloaithietbi_sua_da == "-1") return "Vui lòng chọn loại thiết bị";
        if (p.txtsoluong_sua_da == "") return "Vui lòng nhập số lượng";

        return "";

    } catch (e) {
        console.log(e);
    }
}
// check giá trị null
function checkkytunull_sua_DA() {
    try {
        var p = getAllIdMod();
        if (p.cb_banmien_sua_da == "-1") return "Vui lòng chọn ban miền.";
        if (p.cb_da_suada == "-1") return "Vui lòng chọn dự án";
        if (p.txtthoigian_sua_da == "") return "Vui lòng nhập thời gian giao hàng";
        return "";

    } catch (e) {
        console.log(e);
    }
}

// clear nhập thành công
function clearthanhcong_sua_DA() {
    try {

      
        setValToTxt('cbdienluc_sua_da', '-1');
        setValToTxt('cbvattu_sua_da', '-1');
        setValToTxt('cbloaithietbi_sua_da', '-1');
        setValToTxt('txtsoluong_sua_da', '1');
        setValToTxt('txtghichu_sua_da', '');
        setValToTxt('txtthongtinthem_sua_da', '');
    } catch (e) {
        console.log(e);
    }
}
