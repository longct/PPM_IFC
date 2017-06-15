//var dataReport_th = "";
//var tungay_rb_th = "";
//var denngay_rb_th = "";
//var dataXuatExcel_bct_th = null;
//$(document).ready(function () {
//    try {
        
//        loadInitDate();
//        setValToTxt('txt_datefrom_baocaoth', gettimenow());
//        setValToTxt('txt_dateto_baocaoth', gettimenow());
//        Loadcombox_vattu_th();
//        LoadComBox_BanMien_th();
//        f_comboboxdisable_th();
//        $("#btnCapNhat_baocaoth").click(function () {
//            var check = checknull_baocao_th();
//            if (check != "") {
//                clear_thu();
//                messInfo("messinfo_baocaoth", check, "error");
//                return;
//            }
              
//            if ($("#tongquan_baocaoth").prop('checked')) {
//                f_layDuLieu_baocaoth("TB_BAOCAO_THUHOI_TONGQUAN", "f_resultLayDuLieu_baocaoth");
//            }
//            else if ($("#banmien_baocaoth").prop('checked')) {
//                f_layDuLieu_baocaoth("TB_BAOCAO_THUHOI_MIENVETONG", "f_resultLayDuLieu_baocaoth_banmien");
//            }
//            else if ($("#lapdat_baocaoth").prop('checked')) {
//                f_layDuLieu_baocaoth("TB_BAOCAO_THUHOI_NHANVIENVEMIEN", "f_resultLayDuLieu_baocaoth_lapdat");
//            }
//        });
//        $("#btninbaocao_baocaoth").click(function () {

//            if ($("#tongquan_baocaoth").prop('checked')) {

//                if (dataReport_th != "") {
//                    if (dataReport_th.data[0].kq0.length > 0) {
//                        localStorage.setItem("datareportxuat_Id", 4);
//                        location.href = "master.html#modules/baocao/printreport";
//                    } else {
//                        clear_thu();
//                        messInfo("messinfo_baocaoth", "Chưa có dữ liệu", "error");
//                    }
                   
//                } else {
//                    clear_thu();
//                    messInfo("messinfo_baocaoth", "Chưa có dữ liệu", "error");
//                }
              
//            }
//            else if ($("#banmien_baocaoth").prop('checked')) {
//                if (dataReport_th != "") {
//                    if (dataReport_th.data.length> 0) {
//                        localStorage.setItem("datareportxuat_Id", 5);
//                        location.href = "master.html#modules/baocao/printreport";
//                    } else {
//                        clear_thu();
//                        messInfo("messinfo_baocaoth", "Chưa có dữ liệu", "error");
//                    }
//                } else {
//                    clear_thu();
//                    messInfo("messinfo_baocaoth", "Chưa có dữ liệu", "error");
//                }
//            }
//            else if ($("#lapdat_baocaoth").prop('checked')) {
//                if (dataReport_th != "") {
//                    if (dataReport_th.data.length > 0) {
//                        localStorage.setItem("datareportxuat_Id", 6);
//                        location.href = "master.html#modules/baocao/printreport";
//                    } else {
//                        clear_thu();
//                        messInfo("messinfo_baocaoth", "Chưa có dữ liệu", "error");
//                    }
//                } else {
//                    clear_thu();
//                    messInfo("messinfo_baocaoth", "Chưa có dữ liệu", "error");
//                }
//            }
//        });
//        $("#btnxuatexecl_baocaoth").click(function () {
          
//            if ($("#tongquan_baocaoth").prop('checked')) {
//                if (dataXuatExcel_bct_th != null) {
//                    f_xuatexcel_baocaoth();
//                } else {
//                    clear_thu();
//                    messInfo("messinfo_baocaoth", "Vui lòng thực hiện trước khi xuất excel", "error");
//                }
//            } 
//            else if ($("#banmien_baocaoth").prop('checked')) {
//                f_xuatexcel_banmien_baocaoth();
//            }
//            else if ($("#lapdat_baocaoth").prop('checked')) {
//                f_xuatexcel_lapdat_baocaoth();
//            }
           
//        });
//    } catch (e) {
//        console.log(e);
//    }
//});
//function clear_thu() {
//    dataReport_th = "";
//    tungay_rb_th = "";
//    dengay_rb_th = "";
//    $("#grv_baocaoth thead").empty();
//    $("#grv_baocaoth tbody").empty();
//    $("#messinfo_notdatath").hide();
//    $("#messinfo_baocaoth").hide();
//    $("#titleReportth").hide();
//}
//function f_comboboxdisable_th() {
//    try{
//        if ($("#tongquan_baocaoth").prop('checked')) {
//            $("#cbkhoxuat_baocaoth").attr("disabled", "true");
       
//        }

//        $("#tongquan_baocaoth").on("change", function () {
//            clear_thu();
//            $("#cbkhoxuat_baocaoth").attr("disabled", "true");
//            $("#grv_baocaoth thead").empty();
//            $("#grv_baocaoth tbody").empty();
//            $("#messinfo_notdatath").hide();
//            $("#titleReportth").hide();
//        });
//        $("#banmien_baocaoth").on("change", function () {
//            clear_thu();
//            $("#cbkhoxuat_baocaoth").removeAttr("disabled");
//            $("#grv_baocaoth thead").empty();
//            $("#grv_baocaoth tbody").empty();
//            $("#messinfo_notdatath").hide();
//            $("#titleReportth").hide();
//        });
//        $("#lapdat_baocaoth").on("change", function () {
//            clear_thu();
//            $("#cbkhoxuat_baocaoth").removeAttr("disabled");
//            $("#grv_baocaoth thead").empty();
//            $("#grv_baocaoth tbody").empty();
//            $("#messinfo_notdatath").hide();
//            $("#titleReportth").hide();

//        });
//    }catch(e){
//        console.log(e);
//    }
//}
//function f_layDuLieu_baocaoth(namesql, callback)
//{
//    try{
//        var p = getAllIdMod();
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
//        var para = {
//            TUNGAY: p.txt_datefrom_baocaoth,
//            DENNGAY: p.txt_dateto_baocaoth,
//            KHO: p.cbkhoxuat_baocaoth,
//            LOAITHIETBI: p.tongquan_baocaoth,
//            USERID: userInfo.userid,
//        };
//        console.log(para);
//        ExecuteServiceSyns(config, para);


//    } catch (e) { console.log(e);}
//}
//function f_resultLayDuLieu_baocaoth(config,para,lst)
//{
//    try
//    {
//        clear_thu();
//        if (lst == null || lst == undefined) {
//            $("#messinfo_notdatath").html("Chưa có dữ liệu hiển thị");
//            $("#messinfo_notdatath").attr("class", "alert alert-block alert-danger");
//            $("#messinfo_notdatath").show();
//            return;
//        }
//        dataXuatExcel_bct_th = lst.data[1].kq1;
//        var p = getAllIdMod();
//        messInfo("messinfo_baocaoxuat", "", "error");
//        f_veGrid_baocaoth(lst)
//    }catch(e){console.log(e);}
//}

//function f_veGrid_baocaoth(lst)
//{
//    try
//    {
//        tungay_rb_th = $("#txt_datefrom_baocaoth").val();
//        denngay_rb_th = $("#txt_dateto_baocaoth").val();
//        // thead
//        var str_head = "";
//        var str_subhead = "";
//        var header_code = new Array();
       
//        str_head += "<th rowspan='2' class='v_m'>STT</th>";
//        str_head += "<th rowspan='2' class='v_m'>MÃ VTTB</th>";
//        var i = 0;

//        dataReport_th = lst;
//        $.each(lst.data[1].kq1, function (key, val) {
//            if (header_code.indexOf(val.code) == -1) {
//                i++;
//                str_head += "<th class='headerx' data_id="+i+">" + val.banmien + "</th>";
//            }
           
//            header_code.push(val.code);
//            str_subhead += "<th data_idd=" + i + " class='v_m c_m'>" + val.maduan + "</th>";
//        });
//        str_head += "<th rowspan='2'  class='v_m'>TỔNG CỘNG</th>";

//        var tr1 = $("<tr/>").append(str_head);
//        var tr2 = $("<tr/>").append(str_subhead);
//        $("#grv_baocaoth thead").append(tr1).append(tr2);
//        // thiết lập colspan
//        var lengthx = $(".headerx").length;
//        for (var i = 0; i < lengthx; i++) {
//            var ii = $("th[data_idd=" + i + "]").length;
//            $("th[data_id=" + i + "]").attr("colspan", ii);
//        }
//        // tbody
//        var tbody = "";
//        var stt = 0;
//        if (lst.data[0].kq0.length > 0) {
//            $.each(lst.data[0].kq0, function (key, val) {
//                stt++;
//                tbody += "<tr><td>";
//                tbody += stt + "</td><td>";
//                tbody += val.mavattu + "</td><td>";
//                tbody += SetValnull(val.evnhanoi) + "</td><td>";
//                tbody += SetValnull(val.evnquangninh) + "</td><td>";
//                tbody += SetValnull(val.npc128k) + "</td><td>";
//                tbody += SetValnull(val.rf_baichay_qn) + "</td><td>";
//                tbody += SetValnull(val.npc70k) + "</td><td>";
//                tbody += SetValnull(val.dnpcmr) + "</td><td>";
//                tbody += SetValnull(val.dnpc2000) + "</td><td>";
//                tbody += SetValnull(val.amrcpc2000) + "</td><td>";
//                tbody += SetValnull(val.amrcpc5000mr) + "</td><td>";
//                tbody += SetValnull(val.amrcpc5000_2) + "</td><td>";
//                tbody += SetValnull(val.evnkhanhhoa) + "</td><td>";
//                tbody += SetValnull(val.evnspc) + "</td><td>";
//                tbody += SetValnull(val.evnspc_gd2) + "</td><td>";
//                tbody += SetValnull(val.evnhcm) + "</td><td>";
//                tbody += SetValnull(val.evndongnai) + "</td><td>";
//                tbody += SetValnull(val.amrnmtd) + "</td><td>";
//                tbody += SetValnull(val.tong) + "</td>";
//                tbody += "</tr>";
//            });
//            $("#grv_baocaoth tbody").append(tbody);
           
//        } else {
//            $("#messinfo_notdatath").html("Chưa có dữ liệu hiển thị");
//            $("#messinfo_notdatath").attr("class", "alert alert-block alert-danger");
//            $("#messinfo_notdatath").show();
//        }
//        $("#titleReportth").html("BẢNG TỔNG HỢP BÁO CÁO THU HỒI VTTB TỪ NGÀY " + tungay_rb_th + " Đến ngày " + denngay_rb_th);
//        $("#titleReportth").show();
     
//    } catch (e) { console.log(e); }
//}
//// kho tổng về kho ban miền
//function f_resultLayDuLieu_baocaoth_banmien(config, para, lst) {
//    try {
//        clear_thu();
//        if (lst == null || lst == undefined) {
//            $("#messinfo_notdatath").html("Chưa có dữ liệu hiển thị");
//            $("#messinfo_notdatath").attr("class", "alert alert-block alert-danger");
//            $("#messinfo_notdatath").show();
//            return;
//        }
//        var p = getAllIdMod();      
//        tungay_rb_th = $("#txt_datefrom_baocaoth").val();
//        denngay_rb_th = $("#txt_dateto_baocaoth").val();
//        dataReport_th = lst;
//        // thead
//        var str_head = "";
//        str_head += "<th class='v_m'>STT</th>";
//        str_head += "<th class='v_m'>MÃ VTTB</th>";
//        str_head += "<th class='v_m'>NHÀ CUNG CẤP</th>";
//        str_head += "<th class='v_m'>BAN TKDA MIỀN BẮC</th>";
//        str_head += "<th class='v_m'>BAN TKDA MIỀN TRUNG</th>";
//        str_head += "<th class='v_m'>BAN TKDA MIỀN NAM</th>";
//        str_head += "<th class='v_m'>TỔNG</th>";
//        var tr = $("<tr/>").append(str_head);
       
//        $("#grv_baocaoth thead").append(tr);
      
//        // tbody
//        var tbody = "";
//        var stt = 0;
//        if (lst.data.length > 0) {
//            $.each(lst.data, function (key, val) {

//                stt++;
//                tbody += "<tr><td>";
//                tbody += stt + "</td><td>";
//                tbody += val.mavattu + "</td><td>";
//                tbody += SetValnull(val.nhacungcap) + "</td><td>";
//                tbody += SetValnull(val.mienbac) + "</td><td>";
//                tbody += SetValnull(val.mientrung) + "</td><td>";
//                tbody += SetValnull(val.miennam) + "</td><td>";
//                tbody += SetValnull(val.tongcong) + "</td>";
//                tbody += "</tr>";
//            });
//            $("#grv_baocaoth tbody").append(tbody);
//        } else {
//            $("#messinfo_notdatath").html("Chưa có dữ liệu hiển thị");
//            $("#messinfo_notdatath").attr("class", "alert alert-block alert-danger");
//            $("#messinfo_notdatath").show();
//        }
//        $("#titleReportth").html("BÁO CÁO XUẤT VTTB KHO TỔNG THU HỒI TỪ CÁC KHO BAN MIỀN TỪ NGÀY " + tungay_rb_th + " Đến ngày " + denngay_rb_th);
//        $("#titleReportth").show();

//    } catch (e) { console.log(e); }
//}
//// kho miền nhân viên lắp đặt
//function f_resultLayDuLieu_baocaoth_lapdat(config, para, lst) {
//    try {
//        clear_thu();
//        if (lst == null || lst == undefined) {
//            $("#messinfo_notdatath").html("Chưa có dữ liệu hiển thị");
//            $("#messinfo_notdatath").attr("class", "alert alert-block alert-danger");
//            $("#messinfo_notdatath").show();
//            return;
//        }
       
//        var p = getAllIdMod();
      
//        tungay_rb_th = $("#txt_datefrom_baocaoth").val();
//        denngay_rb_th = $("#txt_dateto_baocaoth").val();
//        dataReport_th = lst;
//        // thead
//        var str_head = "";
//        str_head += "<th class='v_m'>STT</th>";
//        str_head += "<th class='v_m'>MÃ VTTB</th>";
//        str_head += "<th class='v_m'>NHÀ CUNG CẤP</th>";
//        str_head += "<th class='v_m'>BAN TKDA MIỀN BẮC</th>";
//        str_head += "<th class='v_m'>BAN TKDA MIỀN TRUNG</th>";
//        str_head += "<th class='v_m'>BAN TKDA MIỀN NAM</th>";
//        str_head += "<th class='v_m'>TỔNG</th>";
//        var tr = $("<tr/>").append(str_head);

//        $("#grv_baocaoth thead").append(tr);

//        // tbody
//        var tbody = "";
//        var stt = 0;
//        if (lst.data.length > 0) {
//            $.each(lst.data, function (key, val) {

//                stt++;
//                tbody += "<tr><td>";
//                tbody += stt + "</td><td>";
//                tbody += val.mavattu + "</td><td>";
//                tbody += SetValnull(val.nhacungcap) + "</td><td>";
//                tbody += SetValnull(val.mienbac) + "</td><td>";
//                tbody += SetValnull(val.mientrung) + "</td><td>";
//                tbody += SetValnull(val.miennam) + "</td><td>";
//                tbody += SetValnull(val.tongcong) + "</td>";
//                tbody += "</tr>";
//            });
//            $("#grv_baocaoth tbody").append(tbody);
//        } else {
//            $("#messinfo_notdatath").html("Chưa có dữ liệu hiển thị");
//            $("#messinfo_notdatath").attr("class", "alert alert-block alert-danger");
//            $("#messinfo_notdatath").show();
//        }
//        $("#titleReportth").html("BÁO CÁO XUẤT VTTB CÁC KHO MIỀN THU HỒI TỪ NVLĐ TỪ NGÀY " + tungay_rb_th + " Đến ngày " + denngay_rb_th);
//        $("#titleReportth").show();

//    } catch (e) { console.log(e); }
//}
//// xuất excel
//function f_xuatexcel_baocaoth() {
//    try{
//        var p = getAllIdMod();
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = {
//            namesql: "TB_BAOCAO_THUHOI_TONGQUAN",
//            namefile: "baocaothu",
//            connstr: "ConnectEMS",
//            userid: userInfo.userid
//        };
//        var para = {
//            TUNGAY: p.txt_datefrom_baocaoth,
//            DENNGAY: p.txt_dateto_baocaoth,
//            KHO: p.cbkhoxuat_baocaoth,
//            LOAITHIETBI: p.tongquan_baocaoth,
//            USERID: userInfo.userid
//        };
//        var kq = [];
//        var info = { field: "rownum", name: "STT", type: "TextAndBoldCenter" };
//        kq.push(info);
//        info = { field: "mavattu", name: "MÃ VTTB", type: "Text" };
//        kq.push(info);
//        $.each(dataXuatExcel_bct_th, function (key, val) {
//            info = { field: val.maduan.toLowerCase(), name: val.maduan, type: "Text" };
//            kq.push(info);
//        });
//        info = { field: "tong", name: "TỔNG", type: "Text" };
//        kq.push(info);
//        var colum = { kq: kq };
   
//        excuteExcel(config, para, colum, true);
//    } catch (e) { console.log(e);}
//}
//function f_xuatexcel_banmien_baocaoth() {
//    try{
//        var p = getAllIdMod();
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = {
//            namesql: "TB_BAOCAO_THUHOI_MIENVETONG",
//            namefile: "baocaothu",
//            connstr: "ConnectEMS",
//            userid: userInfo.userid
//        };
//        var para = {
//            TUNGAY: p.txt_datefrom_baocaoth,
//            DENNGAY: p.txt_dateto_baocaoth,
//            KHO: p.cbkhoxuat_baocaoth,
//            LOAITHIETBI: p.tongquan_baocaoth,
//            USERID: userInfo.userid
//        };
//        var colum = {


//            kq: [
//               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
//               { field: "mavattu", name: "MÃ VTTB", type: "Text" },
//               { field: "nhacungcap", name: "NHÀ CUNG CẤP", type: "Text" },
//               { field: "mienbac", name: "BAN TKDA MIỀN BẮC", type: "Text" },
//               { field: "mientrung", name: "BAN TKDA MIỀN TRUNG", type: "Text" },
//               { field: "miennam", name: "BAN TKDA MIỀN NAM", type: "Text" },
//               { field: "tongcong", name: "TỔNG", type: "Text" }
        
//            ]
//        };
//        excuteExcel(config, para, colum, true);
//    } catch (e) { console.log(e);}
//}

//function f_xuatexcel_lapdat_baocaoth() {
//    try{
//        var p = getAllIdMod();
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = {
//            namesql: "TB_BAOCAO_THUHOI_NHANVIENVEMIEN",
//            namefile: "baocaothu",
//            connstr: "ConnectEMS",
//            userid: userInfo.userid
//        };
//        var para = {
//            TUNGAY: p.txt_datefrom_baocaoth,
//            DENNGAY: p.txt_dateto_baocaoth,
//            KHO: p.cbkhoxuat_baocaoth,
//            LOAITHIETBI: p.tongquan_baocaoth,
//            USERID: userInfo.userid
//        };
//        var colum = {


//            kq: [
//               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
//               { field: "mavattu", name: "MÃ VTTB", type: "Text" },
//               { field: "nhacungcap", name: "NHÀ CUNG CẤP", type: "Text" },
//               { field: "mienbac", name: "BAN TKDA MIỀN BẮC", type: "Text" },
//               { field: "mientrung", name: "BAN TKDA MIỀN TRUNG", type: "Text" },
//               { field: "miennam", name: "BAN TKDA MIỀN NAM", type: "Text" },
//               { field: "tongcong", name: "TỔNG", type: "Text" }

//            ]
//        };
//        excuteExcel(config, para, colum, true);
//    } catch (e) { console.log(e);}
//}

////filldata combobox vat tu thiet bi 
//function Loadcombox_vattu_th() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_combobox_vattu_th", connstr: "ConnectEMS" };
//        var para = {
//            Type: 'Basic',
//            UserId: userInfo.userid
//        };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_combobox_vattu_th(config, para, lst) {
//    try {
//        if (lst == null || lst == undefined || lst.data.length == 0) {
//            return;
//        }
//        var data = lst.data;
//        dataToCob("cbvattutb_baocaoth", data[0].kq0, "code", "name", "-1", "--Tất cả--");

//    } catch (e) {
//        console.log(e);
//    }
//}
//// FillData combobox ban mien
//function LoadComBox_BanMien_th() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_combobox_banmien_th", connstr: "ConnectEMS" };
//        var para = {
//            IsType: 'LoadDienluc',
//            Code: userInfo.code
//        };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_combobox_banmien_th(config, para, lst) {
//    try {
//        if (lst == null || lst == undefined || lst.data.length == 0) {
//            return;
//        }
//        var data = lst.data;
//        dataToCob("cbkhoxuat_baocaoth", data, "code", "name", "-1", "--Tất cả--");

//    } catch (e) {
//        console.log(e);
//    }
//}

//function checknull_baocao_th() {
//    try {
//        var p = getAllIdMod();
//        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaoth), timeyyyymmdd(p.txt_dateto_baocaoth));
//        console.log(compare.days);
//        if (compare.days < 0) return "Từ ngày phải nhỏ hơn ngày đến";
//        return "";
//    } catch (e) {
//        console.log(e);
//    }
//}
