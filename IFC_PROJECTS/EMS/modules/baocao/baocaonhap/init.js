var countpage = 15;
$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datefrom_baocaonhap', gettimenow());
        setValToTxt('txt_dateto_baocaonhap', gettimenow());
        Loadcombox_VTTBbaocaonhap();
        Loadcombox_khobaocaonhap();
        Loadnhacungcap_baocaonhap('-1');
        $("#cbvattutb_baocaonhap").change(function () {
            var p = getAllIdMod();
            var value = p.cbvattutb_baocaonhap;
            Loadnhacungcap_baocaonhap(value);
            Loadloaithietbi_bcnhap(value);
        });
        
        $("#btnCapNhat_baocaonhap").click(function () {
            f_loc_du_lieu_tongquan_bcnhap(1);
        });

    } catch (e) {
        console.log(e);
    }
});

function f_loc_du_lieu_tongquan_bcnhap(page) {
    try{
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BAOCAO_NHAPTONGQUAN",
            callback: "f_result_loc_du_lieu_tongquan_bcnhap",
            connstr: "ConnectEMS"
        };
        var para = {
            FromDate: p.txt_datefrom_baocaonhap,
            ToDate: p.txt_dateto_baocaonhap,
            Khonhap: p.cbkho_baocaonhap,
            Mavandon: p.txtmavandon_baocaonhap,
            TypeDeviceId:parseInt(p.cbvattutb_baocaonhap),
            NhacungcapId:parseInt(p.cbnhacungcap_baocaonhap),
            LoaiNhapMua: parseInt(p.cbloainhapmua),
            Vendorid: parseInt(p.cbloaithietbi_bcnmua),
            pagenum: page,
            numrecs: countpage
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loc_du_lieu_tongquan_bcnhap(config, para, result) {
    try {
        messInfo("messinfo_baocaonhaptbl", '', "error")
        $("#myTableData_baocaonhap").empty();
        if (result == null || result == undefined || result == '[]'){ messInfo("messinfo_baocaonhaptbl", 'Không có dữ liệu hiển thị', "error"); return };
        var data = result.data;
        if (data.length == 0) { messInfo("messinfo_baocaonhaptbl", 'Không có dữ liệu hiển thị', "error"); return };
       
        var TypeDeviceId;
        $(data).each(function (i, item) {
            var col_tongchung = '';
            if (item.typedeviceid !== TypeDeviceId) {
                col_tongchung = '<td class="text-center vertical-middle" rowspan=' + item.rowspan + '>' + item.tongchung + '</td>';
            }
            TypeDeviceId = item.typedeviceid;
            var tr = '<tr>'
            + '<td class="text-center">' + item.stt + '</td>'
            + '<td>' + item.mavattu + '</td>'
            + '<td>' + item.tenvattu + '</td>'
            + '<td class="text-center">' + item.soluong + '</td>'
            + '<td class="text-center">' + item.solannhap + '</td>'
             + '<td class="text-center"><a href="#" data-vendorid="' + item.vendorid + '" data-typedeviceid="' + item.typedeviceid + '">Chi tiết</a></td>'
            + '</tr>';
            $("#myTableData_baocaonhap").append(tr);
        });
       
        $("#myTableData_baocaonhap a").click(function () {
            var p = getAllIdMod();
            var idvendor = $(this).data('vendorid');
            var typedeviceid = $(this).data('typedeviceid');
            f_load_baocaonhap_chitiet(idvendor
                , p.txt_datefrom_baocaonhap
                , p.txt_dateto_baocaonhap
                , p.cbkho_baocaonhap
                , 1
                , typedeviceid
                , parseInt(p.cbloainhapmua)
                );
            $("#bcnhap_chitiet").modal("show");
        });
        LoadPhanTrang("pageLst_bcnhap", "pageCurent_bcnhap", data, function () {
            f_loc_du_lieu_tongquan_bcnhap($("#pagenumber").val());
        });
 
    } catch (e) {
        console.log(e.message);
    }
}
function Loadcombox_khobaocaonhap() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_Loadcombox_khobaocaonhap", connstr: "ConnectEMS" };
        var para = {
            Type: 'khotong',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_Loadcombox_khobaocaonhap(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbkho_baocaonhap", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function Loadcombox_VTTBbaocaonhap() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaonhap", connstr: "ConnectEMS" };
        var para = {
            Type: 'VTTB',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaonhap(config, para, lst) {
    try {
      
        var data = lst.data;
       
        dataToCob("cbvattutb_baocaonhap", data, "code", "name", "-1", "--Tất cả--");
      

    } catch (e) {
        console.log(e);
    }
}
function Loadnhacungcap_baocaonhap(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadnhacungcap_baocaonhap", connstr: "ConnectEMS" };
        var para = {
            Type: 'nhacungcap',
            UserId: value
        };
        ExecuteServiceSyns(config, para, false);
       
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnhacungcap_baocaonhap(config, para, lst) {
    try {
      
        var data = lst.data;
        dataToCob("cbnhacungcap_baocaonhap", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

//loadloaithietbi
function Loadloaithietbi_bcnhap(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaokho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_bcnmua", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function checknull_baocaonhap() {
    try {
        var p = getAllIdMod();
        if (p.cbvattutb_baocaonhap == '-1') return "Bạn chưa chọn vật tư thiết bị";
        if (p.cbkhoxuat_baocaonhap == '-1') return "Bạn chưa chọn kho ";
        if (p.cbnhaccap_baocaonhap == '-1') return "Bạn chưa chọn nhà cung cấp";
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaonhap), timeyyyymmdd(p.txt_dateto_baocaonhap));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}
