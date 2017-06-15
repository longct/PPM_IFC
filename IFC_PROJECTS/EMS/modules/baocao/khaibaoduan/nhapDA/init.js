var itemCount = 0;
var paraTable_DA = [];
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        loadBanMien_da();
        $("#cb_banmien_da").change(function () {
            LoadDienLuc_da();
            LoadDuAn_da();
        });
      
        $("#cbvattu_da").change(function () {
            loadgetlistthietbi_DA();
        });

        $("#btn_them_da").click(function () {
            itemCount++;
            f_addThemTBChoValue_DA();
        });
        $("#btnCapNhat_da").click(function () {
            messInfo("messinfo_DA", "", "error");
           
            f_ExcuteDatabaseNhapTay_DA("TB_KH_DUAN_INSERT", "f_resultCapNhatDatabase_DA")
         
        });
    } catch (e) { console.log(e); }
});
// load ban miền
function loadBanMien_da() {
    try{
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadBanMien_da", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanMien_da(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst=="[]") return;
        var data = lst.data;
        dataToCob("cbvattu_da", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cb_banmien_da", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function LoadDienLuc_da() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_da", connstr: "ConnectEMS" };
        var para = {
            IsType: 'KBDUAN',
            Code: $("#cb_banmien_da").val()
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_da(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbdienluc_da", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// load ra list thiet bi
function loadgetlistthietbi_DA() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvattu_da };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_NhapTay(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_da", data, "code", "name", "-1", "--Chọn loại thiết bị--");
    } catch (e) {
        console.log(e);
    }
}

function LoadDuAn_da() {
    try { 
        var config = { namesql: "TB_LoadDuAn_KBDA", callback: "f_result_loadduan_da", connstr: "ConnectEMS" };
        var para = {
            Code: $("#cb_banmien_da").val()
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_da(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_da_da", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

//============================================================ XY LY CAC CHUC NANG==========================================================

function f_addThemThietBiChoGrid_DA() {
    try {
        var pt = getAllIdModText();
        var html = "";
        
        html = "<tr id='tr" + itemCount + "'><td>" +
                            pt.cbdienluc_da + "</td> <td>" +
                            pt.cbvattu_da + "</td> <td>" +
                            pt.cbloaithietbi_da + " </td> <td>" +
                            pt.txtsoluong_da + " </td> <td>" +
                            pt.txtthongtinthem_da + " </td> <td>" +
                            "<input type='button'  id='delete_da" + itemCount + "' value='Xóa'></td> </tr>";
        $("#myTableData_da").append(html);

        $("#delete_da" + itemCount).click(function () {
            var idremove = $(this).attr("id").replace("delete_da", "");
            for (var i = 0; i < paraTable_DA.length; i++) {
                if (paraTable_DA[i].Stt == idremove) {
                    paraTable_DA.splice(i, 1);
                    break;
                }
            }
            $("#tr" + idremove).remove();
        });

    } catch (e) {
        console.log(e);
    }
}

function f_addThemTBChoValue_DA() {
    try {

        var check = checkkytunull_DA();
        if (check != "") {
            messInfo("messinfo_da", check, "error");
            return;
        }
        messInfo("messinfo_da", "", "error");
        var p = getAllIdMod();            

        var temp = {
            StockCode: p.cbdienluc_da,
            TypeDeviceId: p.cbvattu_da,
            VendorId: p.cbloaithietbi_da,
            CountDivice: p.txtsoluong_da,
            Note: p.txtthongtinthem_da,
            Stt: itemCount
        };
      
        var exists = [];
        exists = $.grep(paraTable_DA, function (item) {

            return (item.StockCode == p.cbdienluc_da
                && item.TypeDeviceId == p.cbvattu_da
                && item.VendorId == p.cbloaithietbi_da
            )
            ;
        }); /* use length of array as truth test */
        if (exists.length <= 0) {
            paraTable_DA.push(temp);
            f_addThemThietBiChoGrid_DA();
        }
        else {
            messInfo("messinfo_da", "Thiết bị đã tồn tại", "error");
        }
      
    } catch (e) { console.log(e); }
}

function f_ExcuteDatabaseNhapTay_DA(namesql, calkBackTo) {
    try {
        var check = checkkytunull_DA();
        if (check != "") {
            messInfo("messinfo_da", check, "error");
            return;
        }

        if (paraTable_DA == null || paraTable_DA == undefined || paraTable_DA == "" || paraTable_DA == "[]" || paraTable_DA.length == 0) {
            messInfo("messinfo_da", "Không có dữ liệu cập nhật", "error");
            return;
        }
        
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_DA) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
            StockCode: p.cb_banmien_da
          , UserId: user.userid
          , ProjectId: parseInt(p.cb_da_da)
          , ThoiGianGH: p.txtthoigian_da
          , ThoiGianDK: p.txtthoigian_da
          , GhiChu: p.txtghichu_da
        };

        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));


    } catch (e) {
        console.log(e);
    }
}

function f_resultCapNhatDatabase_DA(config, para, lst) {
    try {
     
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_da", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_da", lst.data[0].result, "ok");
            paraTable_DA = [];
            clearthanhcong_DA();
            $("#myTableData_da").empty();        
            $("#txtsoluong_da").val("");
        }
        else
            messInfo("messinfo_nhaptay", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}


//============================================================ LOAD CAC CONTROL==========================================================


// check giá trị null
function checkkytunull_DA() {
    try {
        var p = getAllIdMod();
        if (p.cb_banmien_da == "-1") return "Vui lòng chọn ban miền.";
        if (p.cb_da_da == "-1") return "Vui lòng chọn dự án";
        if (p.txtthoigian_da == "") return "Vui lòng nhập thời gian giao hàng";
        if (p.cbdienluc_da == "-1") return "Vui lòng chọn điện lực";
        if (p.cbvattu_da == "-1") return "Vui lòng chọn vật tư thiết bị";
        if (p.cbloaithietbi_da == "-1") return "Vui lòng chọn loại thiết bị";
        if (p.txtsoluong_da == "") return "Vui lòng nhập số lượng";
       
        return "";

    } catch (e) {
        console.log(e);
    }
}

// clear nhập thành công
function clearthanhcong_DA() {
    try {
     
        setValToTxt('cb_banmien_da', '-1');
        setValToTxt('cb_da_da', '-1');
        setValToTxt('txtthoigian_da','');
        setValToTxt('cbdienluc_da', '-1');
        setValToTxt('cbvattu_da', '-1');
        setValToTxt('cbloaithietbi_da', '-1');
        setValToTxt('txtsoluong_da','1');
        setValToTxt('txtghichu_da', '');
        setValToTxt('txtthongtinthem_da', '');
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


