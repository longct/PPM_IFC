var dataReportXuat = "";
var tungay_rb = "";
var dengay_rb = "";
var dataXuatExcel_bct = null;
$(document).ready(function () {
    try {
        
        loadInitDate();
        setValToTxt('txt_datefrom_baocaoxuat', gettimenow());
        setValToTxt('txt_dateto_baocaoxuat', gettimenow());
        Loadcombox_vattu();
        LoadComBox_BanMien();
        f_comboboxdisable();
        $("#btnCapNhat_baocaoxuat").click(function () {
          
            var check = checknull_baocaoxuat();
            if (check != "") {
                clear_xuat();
                messInfo("messinfo_baocaoxuat", check, "error");
                return;
            }
              
            if ($("#tongquan_baocaoxuat").prop('checked')) {
                f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_TONGQUAN", "f_resultLayDuLieu_baocaoxuat");
            }
            else if ($("#banmien_baocaoxuat").prop('checked')) {
                f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_KHOTONGVEMIEN", "f_resultLayDuLieu_baocaoxuat_banmien");
            }
            else if ($("#lapdat_baocaoxuat").prop('checked')) {
                f_layDuLieu_baocaoxuat("TB_BAOCAO_XUAT_MIENVENHANVIEN", "f_resultLayDuLieu_baocaoxuat_lapdat");
            }
        });
        $("#btninbaocao_baocaoxuat").click(function () {
            if ($("#tongquan_baocaoxuat").prop('checked')) {

                if (dataReportXuat != "") {
                    if (dataReportXuat.data[0].kq0.length > 0) {
                        localStorage.setItem("datareportxuat_Id", 1);
                        location.href = "master.html#modules/baocao/printreport";
                    } else {
                        clear_xuat();
                        messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                    }
                   
                } else {
                    clear_xuat();
                    messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                }
              
            }
            else if ($("#banmien_baocaoxuat").prop('checked')) {
                if (dataReportXuat != "") {
                    if (dataReportXuat.data.length> 0) {
                        localStorage.setItem("datareportxuat_Id", 2);
                        location.href = "master.html#modules/baocao/printreport";
                    } else {
                        clear_xuat();
                        messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                    }
                } else {
                    clear_xuat();
                    messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                }
            }
            else if ($("#lapdat_baocaoxuat").prop('checked')) {
                if (dataReportXuat != "") {
                    if (dataReportXuat.data.length > 0) {
                        localStorage.setItem("datareportxuat_Id", 3);
                        location.href = "master.html#modules/baocao/printreport";
                    } else {
                        clear_xuat();
                        $("#messinfo_baocaoxuat").show();
                        messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                    }
                } else {
                    clear_xuat();
                    $("#messinfo_baocaoxuat").show();
                    messInfo("messinfo_baocaoxuat", "Chưa có dữ liệu", "error");
                }
            }
        });
        $("#btnxuatexecl_baocaoxuat").click(function () {
            if ($("#tongquan_baocaoxuat").prop('checked')) {
                if (dataXuatExcel_bct != null) {
                    f_xuatexcel_baocaoxuat();
                    } else {
                    clear_xuat;
                    messInfo("messinfo_baocaoxuat", "Vui lòng thực hiện trước khi xuất excel", "error");
                }
               
            }
            else if ($("#banmien_baocaoxuat").prop('checked')) {
                f_xuatexcel_banmien_baocaoxuat();
            }
            else if ($("#lapdat_baocaoxuat").prop('checked')) {
                f_xuatexcel_lapdat_baocaoxuat();
            }
        });
    } catch (e) {
        console.log(e);
    }
});
function clear_xuat() {
    dataReportXuat = "";
    tungay_rb = "";
    dengay_rb = "";
    $("#grv_baocaoxuat thead").empty();
    $("#grv_baocaoxuat tbody").empty();
    $("#messinfo_notdata").hide();
    $("#messinfo_baocaoxuat").hide();
    $("#titleReport").hide();
}
function f_comboboxdisable() {
    try{
        if ($("#tongquan_baocaoxuat").prop('checked')) {
            $("#cbkhoxuat_baocaoxuat").attr("disabled", "true");
       
        }

        $("#tongquan_baocaoxuat").on("change", function () {
            $("#cbkhoxuat_baocaoxuat").attr("disabled", "true");
            $("#grv_baocaoxuat thead").empty();
            $("#grv_baocaoxuat tbody").empty();
            $("#messinfo_notdata").hide();
            $("#titleReport").hide();
        });
        $("#banmien_baocaoxuat").on("change", function () {
            $("#cbkhoxuat_baocaoxuat").removeAttr("disabled");
            $("#grv_baocaoxuat thead").empty();
            $("#grv_baocaoxuat tbody").empty();
            $("#messinfo_notdata").hide();
            $("#titleReport").hide();
        });
        $("#lapdat_baocaoxuat").on("change", function () {
            $("#cbkhoxuat_baocaoxuat").removeAttr("disabled");
            $("#grv_baocaoxuat thead").empty();
            $("#grv_baocaoxuat tbody").empty();
            $("#messinfo_notdata").hide();
            $("#titleReport").hide();

        });
    }catch(e){
        console.log(e);
    }
}
function f_layDuLieu_baocaoxuat(namesql, callback)
{
    try{
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
        var para = {
            TUNGAY: p.txt_datefrom_baocaoxuat,
            DENNGAY: p.txt_dateto_baocaoxuat,
            KHO: p.cbkhoxuat_baocaoxuat,
            LOAITHIETBI: p.tongquan_baocaoxuat,
            USERID: userInfo.userid,
        };
        console.log(para);
        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e);}
}
function f_resultLayDuLieu_baocaoxuat(config,para,lst)
{
    try
    {
     
        clear_xuat();
        if (lst == null || lst == undefined) {
            $("#messinfo_notdata").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdata").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdata").show();
            return;
        }
        dataXuatExcel_bct = lst.data[1].kq1;
        var p = getAllIdMod();
        messInfo("messinfo_baocaoxuat", "", "error");
        f_veGrid_baocaoxuat(lst)
    }catch(e){console.log(e);}
}

function f_veGrid_baocaoxuat(lst)
{
    try
    {
        tungay_rb = $("#txt_datefrom_baocaoxuat").val();
        dengay_rb = $("#txt_dateto_baocaoxuat").val();
        var data = lst.data[0].kq0;
        var data1 = lst.data[1].kq1;
        console.log(data);
        console.log(data1);
        // thead
        var str_head = "";
        var str_subhead = "";
        var header_code = new Array();
       
        str_head += "<th rowspan='2' class='v_m'>STT</th>";
        str_head += "<th rowspan='2' class='v_m'>MÃ VTTB</th>";
        var i = 0;

        dataReportXuat = lst;
        $.each(data1, function (key, val) {
            if (header_code.indexOf(val.code) == -1) {
                i++;
                str_head += "<th class='headerx' data_id="+i+">" + val.banmien + "</th>";
            }
           
            header_code.push(val.code);
            str_subhead += "<th data_idd=" + i + " class='v_m c_m'>" + val.maduan + "</th>";
        });
        str_head += "<th rowspan='2'  class='v_m'>TỔNG CỘNG</th>";

        var tr1 = $("<tr/>").append(str_head);
        var tr2 = $("<tr/>").append(str_subhead);
        $("#grv_baocaoxuat thead").append(tr1).append(tr2);
        // thiết lập colspan
        var lengthx = $(".headerx").length;
        for (var i = 0; i < lengthx; i++) {
            var ii = $("th[data_idd=" + i + "]").length;
            $("th[data_id=" + i + "]").attr("colspan", ii);
        }
        // tbody
        var tbody = "";
        var stt = 0;
        if (data.length > 0) {
            $.each(data, function (key, val) {
                stt++;
                tbody += "<tr><td>";
                tbody += stt + "</td><td>";
                tbody += val.mavattu + "</td><td>";
                tbody += SetValnull(val.evnhanoi) + "</td><td>";
                tbody += SetValnull(val.evnquangninh) + "</td><td>";
                tbody += SetValnull(val.npc128k) + "</td><td>";
                tbody += SetValnull(val.rf_baichay_qn) + "</td><td>";
                tbody += SetValnull(val.npc70k) + "</td><td>";
                tbody += SetValnull(val.dnpcmr) + "</td><td>";
                tbody += SetValnull(val.dnpc2000) + "</td><td>";
                tbody += SetValnull(val.amrcpc2000) + "</td><td>";
                tbody += SetValnull(val.amrcpc5000mr) + "</td><td>";
                tbody += SetValnull(val.amrcpc5000_2) + "</td><td>";
                tbody += SetValnull(val.evnkhanhhoa) + "</td><td>";
                tbody += SetValnull(val.evnspc) + "</td><td>";
                tbody += SetValnull(val.evnspc_gd2) + "</td><td>";
                tbody += SetValnull(val.evnhcm) + "</td><td>";
                tbody += SetValnull(val.evndongnai) + "</td><td>";
                tbody += SetValnull(val.amrnmtd) + "</td><td>";
                tbody += SetValnull(val.tong) + "</td>";
                tbody += "</tr>";
            });
            $("#grv_baocaoxuat tbody").append(tbody);
           
        } else {
            $("#messinfo_notdata").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdata").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdata").show();
        }
        $("#titleReport").html("BẢNG TỔNG HỢP BÁO CÁO XUẤT VTTB TỪ NGÀY " + tungay_rb + " Đến ngày " + dengay_rb);
        $("#titleReport").show();
     
    } catch (e) { console.log(e); }
}
// kho tổng về kho ban miền
function f_resultLayDuLieu_baocaoxuat_banmien(config, para, lst) {
    try {
        var p = getAllIdMod();
        clear_xuat();
        if (lst == null || lst == undefined) {
            $("#messinfo_notdata").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdata").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdata").show();
            return;
        }
      
        tungay_rb = $("#txt_datefrom_baocaoxuat").val();
        dengay_rb = $("#txt_dateto_baocaoxuat").val();
        dataReportXuat = lst;
     
        // thead
        var str_head = "";
        str_head += "<th class='v_m'>STT</th>";
        str_head += "<th class='v_m'>MÃ VTTB</th>";
        str_head += "<th class='v_m'>NHÀ CUNG CẤP</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN BẮC</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN TRUNG</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN NAM</th>";
        str_head += "<th class='v_m'>TỔNG</th>";
        var tr = $("<tr/>").append(str_head);
       
        $("#grv_baocaoxuat thead").append(tr);
      
        // tbody
        var tbody = "";
        var stt = 0;
        if (lst.data.length > 0) {
            $.each(lst.data, function (key, val) {

                stt++;
                tbody += "<tr><td>";
                tbody += stt + "</td><td>";
                tbody += val.mavattu + "</td><td>";
                tbody += SetValnull(val.nhacungcap) + "</td><td>";
                tbody += SetValnull(val.mienbac) + "</td><td>";
                tbody += SetValnull(val.mientrung) + "</td><td>";
                tbody += SetValnull(val.miennam) + "</td><td>";
                tbody += SetValnull(val.tongcong) + "</td>";
                tbody += "</tr>";
            });
            $("#grv_baocaoxuat tbody").append(tbody);
        } else {
            $("#messinfo_notdata").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdata").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdata").show();
        }
        $("#titleReport").html("BÁO CÁO XUẤT VTTB TỪ KHO TỔNG XUỐNG CÁC KHO BAN MIỀN TỪ NGÀY " + tungay_rb + " Đến ngày " + dengay_rb);
        $("#titleReport").show();

    } catch (e) { console.log(e); }
}
// kho miền nhân viên lắp đặt
function f_resultLayDuLieu_baocaoxuat_lapdat(config, para, lst) {
    try {
        $("#messinfo_notdata").hide();
        var p = getAllIdMod();
        clear_xuat();
        if (lst == null || lst == undefined) {
            $("#messinfo_notdata").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdata").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdata").show();
            return;
        }
      
        dataReportXuat = lst;
        tungay_rb = $("#txt_datefrom_baocaoxuat").val();
        dengay_rb = $("#txt_dateto_baocaoxuat").val();
      
        // thead
        var str_head = "";
        str_head += "<th class='v_m'>STT</th>";
        str_head += "<th class='v_m'>MÃ VTTB</th>";
        str_head += "<th class='v_m'>NHÀ CUNG CẤP</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN BẮC</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN TRUNG</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN NAM</th>";
        str_head += "<th class='v_m'>TỔNG</th>";
        var tr = $("<tr/>").append(str_head);

        $("#grv_baocaoxuat thead").append(tr);

        // tbody
        var tbody = "";
        var stt = 0;
        if (lst.data.length > 0) {
            $.each(lst.data, function (key, val) {

                stt++;
                tbody += "<tr><td>";
                tbody += stt + "</td><td>";
                tbody += val.mavattu + "</td><td>";
                tbody += SetValnull(val.nhacungcap) + "</td><td>";
                tbody += SetValnull(val.mienbac) + "</td><td>";
                tbody += SetValnull(val.mientrung) + "</td><td>";
                tbody += SetValnull(val.miennam) + "</td><td>";
                tbody += SetValnull(val.tongcong) + "</td>";
                tbody += "</tr>";
            });
            $("#grv_baocaoxuat tbody").append(tbody);
        } else {
            $("#messinfo_notdata").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdata").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdata").show();
        }
        $("#titleReport").html("BÁO CÁO XUẤT VTTB CÁC KHO MIỀN CẤP CHO NVLĐ TỪ NGÀY " + $("#txt_datefrom_baocaoxuat").val() + " Đến ngày " + $("#txt_dateto_baocaoxuat").val());
        $("#titleReport").show();

    } catch (e) { console.log(e); }
}
// xuất excel
function f_xuatexcel_baocaoxuat() {
    try{
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUAT_TONGQUAN",
            namefile: "baocaoxuat",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            TUNGAY: p.txt_datefrom_baocaoxuat,
            DENNGAY: p.txt_dateto_baocaoxuat,
            KHO: p.cbkhoxuat_baocaoxuat,
            LOAITHIETBI: p.tongquan_baocaoxuat,
            USERID: userInfo.userid,
        };
        var kq = [];
        var info = { field: "rownum", name: "STT", type: "TextAndBoldCenter" };
        kq.push(info);
        info = { field: "mavattu", name: "MÃ VTTB", type: "Text" };
        kq.push(info);
        $.each(dataXuatExcel_bct, function (key, val) {
            info = { field: val.maduan.toLowerCase(), name: val.maduan, type: "Text" };
            kq.push(info);
        });
        info = { field: "tong", name: "TỔNG", type: "Text" };
        kq.push(info);
        var colum = { kq: kq };
   
        excuteExcel(config, para, colum, true);
    } catch (e) { console.log(e);}
}
function f_xuatexcel_banmien_baocaoxuat() {
    try{
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUAT_KHOTONGVEMIEN",
            namefile: "baocaoxuat",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            TUNGAY: p.txt_datefrom_baocaoxuat,
            DENNGAY: p.txt_dateto_baocaoxuat,
            KHO: p.cbkhoxuat_baocaoxuat,
            LOAITHIETBI: p.cbvattutb_baocaoxuat
        };
        var colum = {


            kq: [
               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "mavattu", name: "MÃ VTTB", type: "Text" },
               { field: "nhacungcap", name: "NHÀ CUNG CẤP", type: "Text" },
               { field: "mienbac", name: "BAN TKDA MIỀN BẮC", type: "Text" },
               { field: "mientrung", name: "BAN TKDA MIỀN TRUNG", type: "Text" },
               { field: "miennam", name: "BAN TKDA MIỀN NAM", type: "Text" },
               { field: "tongcong", name: "TỔNG", type: "Text" }
        
            ]
        };
        excuteExcel(config, para, colum, true);
    } catch (e) { console.log(e);}
}

function f_xuatexcel_lapdat_baocaoxuat() {
    try{
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUAT_MIENVENHANVIEN",
            namefile: "baocaoxuat",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            TUNGAY: p.txt_datefrom_baocaoxuat,
            DENNGAY: p.txt_dateto_baocaoxuat,
            KHO: p.cbkhoxuat_baocaoxuat,
            LOAITHIETBI: p.cbvattutb_baocaoxuat
        };
        var colum = {


            kq: [
               { field: "rownum", name: "STT", type: "TextAndBoldCenter" },
               { field: "mavattu", name: "MÃ VTTB", type: "Text" },
               { field: "nhacungcap", name: "NHÀ CUNG CẤP", type: "Text" },
               { field: "mienbac", name: "BAN TKDA MIỀN BẮC", type: "Text" },
               { field: "mientrung", name: "BAN TKDA MIỀN TRUNG", type: "Text" },
               { field: "miennam", name: "BAN TKDA MIỀN NAM", type: "Text" },
               { field: "tongcong", name: "TỔNG", type: "Text" }

            ]
        };
        excuteExcel(config, para, colum, true);
    } catch (e) { console.log(e);}
}

//filldata combobox vat tu thiet bi 
function Loadcombox_vattu() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_combobox_vattu", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_combobox_vattu(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data.length == 0) {
            return;
        }
        var data = lst.data;
        dataToCob("cbvattutb_baocaoxuat", data[0].kq0, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}
// FillData combobox ban mien
function LoadComBox_BanMien() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_combobox_banmien", connstr: "ConnectEMS" };
        var para = {
            IsType: 'LoadDienluc',
            Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_combobox_banmien(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data.length == 0) {
            return;
        }
        var data = lst.data;
        dataToCob("cbkhoxuat_baocaoxuat", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function checknull_baocaoxuat() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaoxuat), timeyyyymmdd(p.txt_dateto_baocaoxuat));
        console.log(compare.days);
        if (compare.days < 0) return "Từ ngày phải nhỏ hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}
