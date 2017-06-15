
//$(document).ready(function () {
//    try {
        
//        loadConetent();
//        loadInitDate();
//        setValToTxt('txt_datefrom_baocaonhap', gettimenow());
//        setValToTxt('txt_dateto_baocaonhap', gettimenow());
//        Loadcombox_baocaonhap();
//        Loadnhacungcap_baocaonhap('-1');
//        $("#cbvattutb_baocaonhap").change(function () {
//            var p = getAllIdMod();
//            var value = p.cbvattutb_baocaonhap;
//            Loadnhacungcap_baocaonhap(value);
//        });

//        $("#btnCapNhat_baocaonhap").click(function () {
//            f_loc_du_lieu_tongquan_bcnhap();
//        });

//    } catch (e) {
//        console.log(e);
//    }
//});

//function f_loc_du_lieu_tongquan_bcnhap() {
//    var p = getAllIdMod();
//    var config = {
//        namesql: "TB_BAOCAO_NHAPTONGQUAN",
//        callback: "f_result_loc_du_lieu_tongquan_bcnhap",
//        connstr: "ConnectEMS"
//    };
//    var para = {
//        FromDate: p.txt_datefrom_baocaonhap,
//        ToDate: p.txt_dateto_baocaonhap,
//        Khonhap: p.cbkho_baocaonhap,
//        Mavandon: p.txtmavandon_baocaonhap,
//        TypeDeviceId: p.cbvattutb_baocaonhap,
//        NhacungcapId: p.cbnhacungcap_baocaonhap
//    };
//    ExecuteServiceSyns(config, para, false);
//}
//function f_result_loc_du_lieu_tongquan_bcnhap(config, para, result) {
//    try {
//        var data = result.data;
//        $("#myTableData_baocaonhap").empty();
        
//        if (!data || data === '[]') {
//            return;
//        }
//        var TypeDeviceId;
//        $(data).each(function (i, item) {
//            var col_tongchung = '';
//            if (item.typedeviceid !== TypeDeviceId) {
//                col_tongchung = '<td class="text-center vertical-middle" rowspan=' + item.rowspan + '>' + item.tongchung + '</td>';
//            }
//            TypeDeviceId = item.typedeviceid;
//            var tr = '<tr>'
//            + '<td class="text-center">' + item.stt + '</td>'
//            + '<td>' + item.mavattu + '</td>'
//            + '<td>' + item.tenvattu + '</td>'
//            + '<td class="text-center">' + item.soluong + '</td>'
//            + '<td class="text-center"><a data-vendorid="' + item.vendorid + '" data-typedeviceid="' + item.typedeviceid + '">' + item.solannhap + '</a></td>'
//            + '</tr>';
//            $("#myTableData_baocaonhap").append(tr);
//        });

//        $("#myTableData_baocaonhap a").click(function () {
//            var p = getAllIdMod();
//            var idvendor = $(this).data('vendorid');
//            var typedeviceid = $(this).data('typedeviceid');
//            f_load_baocaonhap_chitiet(idvendor
//                , p.txt_datefrom_baocaonhap
//                , p.txt_dateto_baocaonhap
//                , p.cbkho_baocaonhap
//                , 1
//                , typedeviceid);
//            $("#bcnhap_chitiet").modal("show");
//        });

//    } catch (e) {
//        console.log(e.message);
//    }
//}


//function Loadcombox_baocaonhap() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaonhap", connstr: "ConnectEMS" };
//        var para = {
//            Type: 'Basic',
//            UserId: userInfo.userid
//        };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadbandau_baocaonhap(config, para, lst) {
//    try {
      
//        var data = lst.data;
       
//        dataToCob("cbvattutb_baocaonhap", data[0].kq0, "code", "name", "-1", "--Tất cả--");
//        dataToCob("cbkho_baocaonhap", data[1].kq1, "code", "name", "-1", "--Tất cả--");

//    } catch (e) {
//        console.log(e);
//    }
//}
//function Loadnhacungcap_baocaonhap(value) {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadnhacungcap_baocaonhap", connstr: "ConnectEMS" };
//        var para = {
//            Type: 'Basic',
//            UserId: userInfo.userid
//        };
//        ExecuteServiceSyns(config, para, false);
       
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadnhacungcap_baocaonhap(config, para, lst) {
//    try {
      
//        var data = lst.data;
//        dataToCob("cbnhaccap_baocaonhap", data[0].kq0, "code", "name", "-1", "--Tất cả--");

//    } catch (e) {
//        console.log(e);
//    }
//}



//function checknull_baocaonhap() {
//    try {
//        var p = getAllIdMod();
//        if (p.cbvattutb_baocaonhap == '-1') return "Bạn chưa chọn vật tư thiết bị";
//        if (p.cbkhoxuat_baocaonhap == '-1') return "Bạn chưa chọn kho ";
//        if (p.cbnhaccap_baocaonhap == '-1') return "Bạn chưa chọn nhà cung cấp";
//        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaonhap), timeyyyymmdd(p.txt_dateto_baocaonhap));
//        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
//        return "";
//    } catch (e) {
//        console.log(e);
//    }
//}
