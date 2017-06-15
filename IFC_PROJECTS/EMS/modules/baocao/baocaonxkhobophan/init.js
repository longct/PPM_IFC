
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datefrombh_baocaobp', gettimenow());
        setValToTxt('txt_datetobh_baocaobp', gettimenow());
        Loadcombox_baocaobp();
        Loadtrangthai_baocaobp('-1');
        
        $("#cbvattutbi_baocaobp").change(function () {
            var p = getAllIdMod();
            var value = p.cbvattutbi_baocaobp;
            Loadloaithietbi_baocaobp(value);
        });
       
        $("#btnCapNhat_baocaobp").click(function () {
            messInfo("messinfo_baocaobp", "", "error");
            var check = checknull_baocaobp();
            if (check != "") {    
                messInfo("messinfo_baocaobp", check, "error");
                return;
            }
            LoadBCKHOBOPHAN(1);
        });
        $("#btnxuatexcel_baocaobp").click(function () {
            XuatExcelKHOBOPHAN();
        });
        $("#cbkho_baocaobp").change(function () {
            LoadKhoBoPhan();
        });


    } catch (e) {
        console.log(e);
    }
});
// load trang thai
function Loadtrangthai_baocaobp(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaobp", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaobp(config, para, lst) {
    try {
        dataToCob("cbtinhtrang_baocaobp", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadbandau
function Loadcombox_baocaobp() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_baocaobp", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_baocaobp(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutbi_baocaobp", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cbkho_baocaobp", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load kho bo phan
function LoadKhoBoPhan() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "fn_TB_Export_LstLoadByCode_khobophan", connstr: "ConnectEMS" };
        var para = {
            IsType: 'BCLoadKhoBoPhan',
            Code: $("#cbkho_baocaobp").val()
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function fn_TB_Export_LstLoadByCode_khobophan(config, para, lst) {
    if (lst == null || lst == undefined || lst == "[]") return;
    var data = lst.data;
    dataToCob("cbkhobophan_baocaobp", data, "code", "name", "-1", "--Tất cả--");
}
//loadloaithietbi
function Loadloaithietbi_baocaobp(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_Loadloaithietbi_baocaobp", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadloaithietbi_baocaobp(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaobp", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function checknull_baocaobp() {
    try {
        var p = getAllIdMod();
       
        var compare = compareDates(timeyyyymmdd(p.txt_datefrombh_baocaobp), timeyyyymmdd(p.txt_datetobh_baocaobp));
        if (compare.days < 0) return "Từ ngày phải nhỏ hơn ngày đến";

        if (p.cbkhobophan_baocaobp=="-1") return "Vui lòng chọn kho tổng và kho bộ phận"
        return "";
    } catch (e) {
        console.log(e);
    }
}

function LoadBCKHOBOPHAN(page) {
    try {
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_KHOBOPHAN",
            callback: "f_result_bckhobophan",
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaobp,
            ToDateTo: p.txt_datetobh_baocaobp,
            Kho: p.cbkhobophan_baocaobp,
            TypeDeviceId:parseInt( p.cbvattutbi_baocaobp),
            VendorId: parseInt(p.cbloaithietbi_baocaobp),
            pagenum: page,
            numrecs:20
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_bckhobophan(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined || lst =="[]") return;
        var data = lst.data[0].kq0;
        if (data == null || data == undefined || data.length == 0) return;
        messInfo("messinfo_baocaobp", "", "error");
        $("#tbl_bckho_header thead").empty();
        var lengthstatus = data.length;
        var row1 = "";
        var row2 = "";
        var row3 = "";
        $.each(data, function (key, val) {

            row1 += "<th rowspan='2' class='middle'>" + val.name + "</th>";
            row3 += "<th rowspan='2' class='middle bgcolor'>" + val.name + "</th>";
            row2 += "<th  class='middle bgcolorx'>" + val.name + "</th>";
        });
        var row = "";
         row  += "<tr>";
         row += "<th rowspan='3' class='middle'>STT</th>";
         row += "<th rowspan='3' class='middle'>Tên VTTB</th>";
         row += "<th rowspan='3' class='middle'>ĐVT</th>";
         row += "<th colspan='" + lengthstatus + "' class='middle'>Tồn ĐK</th>";
         row += "<th colspan='" + lengthstatus + "' class='middle bgcolor'>Nhập ĐCNB từ KT</th>";
         row += "<th colspan='" + lengthstatus * 2 + "' class='middle bgcolorx'>Xuất TK</th>";
         row += "<th colspan='" + lengthstatus + "' class='middle'>Tồn CK</th>";
         row += "</tr>";
         row += "<tr>";
         row += row1; // tồn dk
         row += row3; // nhập dcnb từ kt
         row += "<th class='middle bgcolorx' colspan='" + lengthstatus + "'>Xuất ĐCNB trả KT</th>";
         row += "<th class='middle bgcolorx' colspan='" + lengthstatus + "'>Xuất sang kho xử lý</th>";
         row += row1; // tồn dk
         row += "</tr>";
         row += "<tr>";
         row += row2; //Xuất ĐCNB trả KT
         row += row2; // Xuất sang kho xử lý
         row += "</tr>";
        $("#tbl_bckho_header thead").append(row);
        $("#myTableData_baocaobp").empty();
       
        var data1 = lst.data[1].kq1;
        if (data1 == null || data1 == "[]" || data1 == "" || data1.length == 0) {
            try {
                messInfo("messinfo_baocaobp", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaobp", "", "error");

        var Count = 1;
  
        $.each(data1, function (index, value) {

            var row = "<tr>";
            if (value.tenvattu != null) {
                $.each(value, function (key, val) {
                    row += "<td class='c'>" + SetNumbernull(val) + "</td>";
                });
                row += "</tr>";
                $("#myTableData_baocaobp").append(row);
            } 
        });
     
    } catch (e) {
        console.log(e);
    }
}
//set null number
function SetNumbernull(val) {
    try {
        if (val == null || val == 'null') {
            return '0';
        } else {
            return val;
        }
    } catch (e) {
        console.log(e);
    }
}
function XuatExcelKHOBOPHAN() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_NHAPXUAT_KHOBOPHAN",
            namefile: "baocaonxtkhobophan",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            ToDateFrom: p.txt_datefrombh_baocaobp,
            ToDateTo: p.txt_datetobh_baocaobp,
            Kho: p.cbkho_baocaobp,
            TypeDeviceId: parseInt(p.cbvattutbi_baocaobp),
            VendorId: parseInt(p.cbloaithietbi_baocaobp),
            pagenum: 1,
            numrecs: 200000
        };
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextCenter" },
               { field: "tenvattu", name: "Tên VTTB", type: "TextCenter" },
               { field: "donvitinh", name: "ĐVT", type: "TextCenter" },
               { field: "tondkmt", name: "Tồn ĐK mới tốt", type: "TextAndBoldCenter" },
               { field: "tondktht", name: "Tồn ĐK thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "nhapktmt", name: "Nhập ĐCNB từ KT mới tốt", type: "TextAndBoldCenter" },
               { field: "nhapkttht", name: "Nhập ĐCNB từ KT thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoikhotongmt", name: "Xuất ĐCNB trả KT mới tốt", type: "TextAndBoldCenter" },
               { field: "slthuhoikhotongtht", name: "Xuất ĐCNB trả KT thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "slxuatkhoxulymt", name: "Xuất sang kho xử lý mới tốt", type: "TextAndBoldCenter" },
               { field: "slxuatkhoxulytht", name: "Xuất sang kho xử lý thu hồi tốt", type: "TextAndBoldCenter" },
               { field: "tonckmt", name: "Tồn CK mới tốt", type: "TextAndBoldCenter" },
               { field: "toncktht", name: "Tồn CK thu hồi tốt", type: "TextAndBoldCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}