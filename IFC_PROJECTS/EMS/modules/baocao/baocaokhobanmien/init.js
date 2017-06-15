var dataReport_khobm = "";
var dataXuatExcel_khobm = null;
$(document).ready(function () {
    try {

        loadConetent();
        loadInitDate();
        Loadcombox_baocaokbm();
        Loadcombox_banmien_baocaokbm();
        setValToTxt("txt_dateto_baocaobm", gettimenow());
        $("#btnCapNhat_baocaobm").click(function () {
            f_layDuLieu_baocao_kbm("TB_BAOCAO_KHOBANMIEN", "f_resultLayDuLieu_baocao_kbm");
        });
        Loadloaithietbi_baocaokbm("-1");
        $("#cbvattutb_baocaobm").change(function () {

            Loadloaithietbi_baocaokbm($("#cbvattutb_baocaobm").val());
        });
        $("#cbkho_baocaobm").change(function () {
            loadnhanvien_baocaokbm($("#cbkho_baocaobm").val());
        });
       
        $("#btnxuatexecl_baocaobm").click(function () {
            if (dataXuatExcel_khobm != null) {
                f_xuatexcel_baocao_kbm("TB_BAOCAO_KHOBANMIEN");
            } else {
                clear_thu_khobm();
                messInfo("messinfo_baocaokbm", "Vui lòng thực hiện trước khi xuất excel", "error");
            }
        });
        $("#btnxuatexecl_serial_baocaobm").click(function () {
            f_xuatexcel_serial_baocao_kbm();
        });
    } catch (e) {
        console.log(e);
    }
});

//load nhân viên
function loadnhanvien_baocaokbm(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_loadnhanvien_baocaokbm", connstr: "ConnectEMS" };
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
function f_result_loadnhanvien_baocaokbm(config, para, lst) {
    try {
        dataToCob("cbnhanvien_baocaobm", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaokbm(value) {
    try {
      
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_Loadloaithietbi_baocaokbm", connstr: "ConnectEMS" };
        var vttb = value;
        if (vttb != '-1') {
            var TypeDeviceIdbm = "";
            $.each(vttb, function (key, val) {
                TypeDeviceIdbm += val + ',';
            });
        } else
            TypeDeviceIdbm = value;
        var para = { IsType: 'LoaiThietBiSelect', Code: TypeDeviceIdbm };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadloaithietbi_baocaokbm(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        $("#cbloaithietbi_baocaobm").multiselect('destroy');
        dataToCob("cbloaithietbi_baocaobm", data, "code", "name", "", "");
        $('#cbloaithietbi_baocaobm').multiselect({
            includeSelectAllOption: true,
            enableFiltering: false,
            includeSelectAllOption: true,
            selectAllJustVisible: false,
            buttonWidth: '200px'
        });

    } catch (e) {
        console.log(e);
    }
}
function clear_thu_khobm() {
    dataReport_khobm = "";
    $("#myTableData_baocaokbm").empty();
    $("#messinfo_notdatakbm").hide();
    $("#messinfo_baocaokbm").hide();
    $("#titleReportkbm").hide();
}
function Loadcombox_baocaokbm() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaokbm", connstr: "ConnectEMS" };
        var para = {
            Type: 'VTTB',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);


    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaokbm(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbvattutb_baocaobm", data, "code", "name", "", "");
        $('#cbvattutb_baocaobm').multiselect({
            includeSelectAllOption: true,
            enableFiltering: false,
            includeSelectAllOption: true,
            selectAllJustVisible: false,
            buttonWidth: '200px'
        });
    } catch (e) {
        console.log(e);
    }
}
function Loadcombox_banmien_baocaokbm() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_banmien_kbm", connstr: "ConnectEMS" };
        var para = {
            Type: 'banmien',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_banmien_kbm(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkho_baocaobm", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// thuc hien
function f_layDuLieu_baocao_kbm(namesql, callback) {
    try {
        var p = getAllIdMod();
        if (p.cbkho_baocaobm == "-1") {
            messInfo("messinfo_baocaokbm", "Vui lòng chọn ban miền", "error");
            return;
        }
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
        var vttb = $("#cbvattutb_baocaobm").val();
        var TypeDeviceIdkbm = "";
        if (vttb != null && vttb != undefined) {
            $.each(vttb, function (key, val) {
                TypeDeviceIdkbm += val + ',';
            });
        } else TypeDeviceIdkbm = "-1";

        var ltb = $("#cbloaithietbi_baocaobm").val();
        var vendoridkbm = "";
        if (ltb != null && ltb != undefined) {
            $.each(ltb, function (key, val) {
                vendoridkbm += val + ',';
            });
        } else vendoridkbm = "-1";
       
        var para = {
            Denngay: p.txt_dateto_baocaobm,
            Kho: p.cbkho_baocaobm,
            TypeDeviceId: TypeDeviceIdkbm,
            VendorId: vendoridkbm,
            NhanVienId: parseInt(p.cbnhanvien_baocaobm)
        };
        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}

function f_resultLayDuLieu_baocao_kbm(config, para, lst) {
    try {
        clear_thu_khobm();
        if (lst == null || lst == undefined) {
            $("#messinfo_notdatakbm").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdatakbm").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdatakbm").show();
            return;
        }
        var p = getAllIdMod();
        dataXuatExcel_khobm = lst.data;
        f_veGrid_baocao_kbm(lst)
    } catch (e) { console.log(e); }
}
function f_veGrid_baocao_kbm(lst) {
    try {
        var p = getAllIdMod();
     
        if (lst.data != null && lst.data!= undefined && lst.data.length > 0) {
            dataXuatExcel_khobm = dataReport_khobm = lst.data;
            var data = lst.data;
            var rowth = "<tr>";
            for (var titile in data[0]) {
                if (titile.toUpperCase() == 'MAVATTU')
                    rowth += "<th>MÃ VẬT TƯ</th>";
                else if (titile.toUpperCase() == 'TENVATTU')
                    rowth += "<th>TÊN VẬT TƯ</th>";
                else if (titile.toUpperCase() == 'DONVITINH')
                    rowth += "<th>ĐVT</th>";
                else if (titile.toLowerCase() != 'vendorid')
                    rowth += "<th>" + titile.toUpperCase() + "</th>";
                   
                    
            }
            rowth += "<th>Xuất excel</th>";
            rowth += "</tr>";
            $("#tb_bckbm >thead").append(rowth);
            $.each(data, function (index, value) {
                var row = "<tr>";                  
                var data_vendoirid = value.vendorid;
                delete value['vendorid'];
                  
                $.each(value, function (key, val) {
                       
                    row += "<td class='c nw' >" + SetValnull(val) + "</td>";
                });
                row += "<td><a href='#' onclick='xuatexceltheovattuthietbi(" + data_vendoirid + ")'><i class='fa fa-download'></i></td>";
                row += "</tr>";
                $("#tb_bckbm >tbody").append(row);
            });
           
            $("#titleReportkbm").html("BÁO CÁO KHO BAN MIỀN");
            $("#titleReportkbm").show();

        } else {
            messInfo("messinfo_baocaokbm", "Không có dữ liệu hiển thị", "error");
        }
    } catch (e) { console.log(e); }
}
//xuất excel theo vật tư thiết bị
function xuatexceltheovattuthietbi(vendorid) {
    try{
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: 'TB_BAOCAO_KHOBANMIEN_VTTB',
            namefile: "baocaokhobanmien",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
       
        var para = {
            Denngay: p.txt_dateto_baocaobm,
            Kho: p.cbkho_baocaobm,
            VendorId: vendorid,
            TypeDeviceId: '-1',
            NhanVienId: parseInt(p.cbnhanvien_baocaobm)
        };
        var colum = {
            kq: [{ field: "stt", name: "stt", type: "TextCenter" },
             { field: "vattuthietbi", name: "Vật tư thiết bị", type: "Text" },
             { field: "tenvattu", name: "Loại thiết bị", type: "Text" },
             { field: "countdivice", name: "Số lượng", type: "TextCenter" },
             { field: "seriesdivice", name: "Series", type: "TextCenter" },
             { field: "nguoiquanly", name: "Người quản lý", type: "Text" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
//xuất excel serial
function f_xuatexcel_serial_baocao_kbm() {
    var p = getAllIdMod();
    var userInfo = JSON.parse(localStorage.getItem("userinfo"));
    var config = {
        namesql: 'TB_BAOCAO_KHOBANMIEN_XUATEXCEL_VTTB',
        namefile: "baocaokhobanmientheoserial",
        connstr: "ConnectEMS",
        userid: userInfo.userid
    };
    var vttb = $("#cbvattutb_baocaobm").val();
    var TypeDeviceIdkbm = "";
    if (vttb != null && vttb != undefined) {
        $.each(vttb, function (key, val) {
            TypeDeviceIdkbm += val + ',';
        });
    } else TypeDeviceIdkbm = "-1";

    var ltb = $("#cbloaithietbi_baocaobm").val();
    var vendoridkbm = "";
    if (ltb != null && ltb != undefined) {
        $.each(ltb, function (key, val) {
            vendoridkbm += val + ',';
        });
    } else vendoridkbm = "-1";

    var para = {
        Denngay: p.txt_dateto_baocaobm,
        Kho: p.cbkho_baocaobm,
        VendorId: vendoridkbm,
        TypeDeviceId: TypeDeviceIdkbm,
        NhanVienId: parseInt(p.cbnhanvien_baocaobm)
    };
    var colum = {
        kq: [{ field: "stt", name: "stt", type: "TextCenter" },
         { field: "vattuthietbi", name: "Vật tư thiết bị", type: "Text" },
         { field: "tenvattu", name: "Loại thiết bị", type: "Text" },
         { field: "countdivice", name: "Số lượng", type: "TextCenter" },
         { field: "seriesdivice", name: "Series", type: "TextCenter" },
         { field: "nguoiquanly", name: "Người quản lý", type: "Text" },
        ]
    };

    excuteExcel(config, para, colum, true);
}
//xuat excel
function f_xuatexcel_baocao_kbm(namesql) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: namesql,
            namefile: "baocaokhobanmien",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var vttb = $("#cbvattutb_baocaobm").val();
        var TypeDeviceIdkbm = "";
        if (vttb != null && vttb != undefined) {
            $.each(vttb, function (key, val) {
                TypeDeviceIdkbm += val + ',';
            });
        } else TypeDeviceIdkbm = "-1";

        var ltb = $("#cbloaithietbi_baocaobm").val();
        var vendoridkbm = "";
        if (ltb != null && ltb != undefined) {
            $.each(ltb, function (key, val) {
                vendoridkbm += val + ',';
            });
        } else vendoridkbm = "-1";

        var para = {
            Denngay: p.txt_dateto_baocaobm,
            Kho: p.cbkho_baocaobm,
            TypeDeviceId: TypeDeviceIdkbm,
            VendorId: vendoridkbm,
            NhanVienId: parseInt(p.cbnhanvien_baocaobm)
        };
        var kq = [];
        var data = dataXuatExcel_khobm;
        for (var titile in data[0]) {
            info = { field: titile.toLowerCase(), name: titile, type: "Text" };
            kq.push(info);
        }
        var colum = { kq: kq };
        excuteExcel(config, para, colum, true);
    } catch (e) { console.log(e); }
}
