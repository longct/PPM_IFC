var dataXuatExcel_bct = [];
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_tungay_baocaokhoth', getfirsttime());
        setValToTxt('txt_datetobh_baocaokhoth', gettimenow());
        Loadcombox_baocaokhoth();
       
        Loadtrangthai_baocaokhoth('-1');
        $("#cbvattutbi_baocaokhoth").change(function () {
           
            var p = getAllIdMod();
            var value = p.cbvattutbi_baocaokhoth;
           
            Loadloaithietbi_baocaokhoth(value);
        });
     

        $("#btnCapNhat_baocaokhoth").click(function () {
            messInfo("messinfo_baocaokhoth", "", "error");
            if ($("#cbkho_baocaokhoth").val() == "-1") {
                messInfo("messinfo_baocaokhoth", "Vui lòng chọn kho", "error");
                return;
            }
            f_loc_du_lieu_tongquan_bckhotongth();
        });

        $("#btninbaocao_baocaokhoth").click(function () {
            PrintElem("div_print");
        });
        $("#btnxuatexcel_baocaokhoth").click(function () {
            Xuatexcelkho();
        });
       
    } catch (e) {
        console.log(e);
    }
});
///ngay dau thang
function getfirsttime() {
    try {
        var t = new Date();
        var d = "01";
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt = d + "/" + m + "/" + y;
        return tt;
    } catch (e) {
        ////console.log(e);
        return "";
    }

}
//----
//loadbandau
function Loadcombox_baocaokhoth() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaokhoth", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaokhoth(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbvattutbi_baocaokhoth", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        $('#cbvattutbi_baocaokhoth').multiselect('rebuild');
        dataToCob("cbkho_baocaokhoth", data[1].kq1, "code", "name");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaokhoth(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaokhoth", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaokhoth(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaokhoth", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

// load trang thai
function Loadtrangthai_baocaokhoth(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaokhoth", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaokhoth(config, para, lst) {
    try {
        dataToCob("cbtrangthai_baocaokhoth", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}


function f_loc_du_lieu_tongquan_bckhotongth() {
    var p = getAllIdMod();
    var config = {
        namesql: "TB_BAOCAO_KHOTONGHOP",
        callback: "f_result_loc_du_lieu_tongquan_bckhotongth",
        connstr: "ConnectEMS"
    };
    var vttb = $("#cbvattutbi_baocaokhoth").val();
    var TypeDeviceId11 = "";
     $.each(vttb, function (key, val) {
        TypeDeviceId11 += val + ',';
    });
    var para = {
        ToDateTo:p.txt_datetobh_baocaokhoth,
        Kho: p.cbkho_baocaokhoth,
        TypeDeviceId: TypeDeviceId11,
        VendorId: parseInt(p.cbloaithietbi_baocaokhoth),
        StatusId: parseInt(p.cbtrangthai_baocaokhoth)
    };
    ExecuteServiceSyns(config, para, false);
}
function f_result_loc_du_lieu_tongquan_bckhotongth(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data[0].kq0;
        var data1 = lst.data[1].kq1;
        var colspanbp = data1.length + 1;
        $("#myTableDatathead_baocaokhoth").empty();
        $("#myTableData_baocaokhoth").empty();
        if (!data || data === '[]') {
            return;
        }
        var TypeDeviceId;
        dataXuatExcel_bct = data[0];
        var tr = "<tr>"
        tr += "<th  class='middle' rowspan='2'>STT</th>";
        tr += "<th class='middle' rowspan='2' style='width:200px;white-space: nowrap;'>TÊN VẬT TƯ</th>";
        tr += "<th class='middle' rowspan='2'>ĐƠN VỊ TÍNH</th>";
        tr += "<th class='middle' rowspan='2'>SL TỔNG</th>";
        tr += "<th colspan='7' class='middle th-chitietton-ktmb'>CHI TIẾT TỒN KTMB</th>";
        tr += "<th colspan='" + colspanbp + "' class='middle'>CHI TIẾT TỒN KHO BỘ PHẬN</th>";
        tr += " <th colspan='3' class='middle th-chitietton-kbmb'>CHI TIẾT TỒN KBMB</th>";
        tr += "</tr>";
        $("#myTableDatathead_baocaokhoth").append(tr);
        var tr = "<tr>";
        
        var arr_header = Object.keys(data[0]);
        for (var i = 0; i < arr_header.length; i++) {
            var th_class;
            if (3 < i && i <= 10)
            {
                th_class = 'th-chitietton-ktmb';
            }
            else if (i <= 10 + colspanbp)
            {
                th_class = 'th-chitietton-bophan';
            }
            else if (i > 10 + colspanbp)
            {
                th_class = 'th-chitietton-kbmb';
            }
            if (arr_header[i].toLocaleLowerCase() != 'tenvattu'
                && arr_header[i].toLocaleLowerCase() != 'stt'
                && arr_header[i].toLocaleLowerCase() != 'sltong'
                && arr_header[i].toLocaleLowerCase() != 'donvitinh') {
                tr += "<th class='" + th_class + "'>" + arr_header[i].toUpperCase() + "</th>";
            }
        }
        
        tr += "</tr>";
        $("#myTableDatathead_baocaokhoth").append(tr);
        $.each(data, function (key, value) {
            TypeDeviceId = value.typedeviceid;
            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
            });
            tr+='</tr>';
            $("#myTableData_baocaokhoth").append(tr);
        });
    } catch (e) {
        console.log(e.message);
    }
}

function PrintElem(elem) {
    var mywindow = window.open('', 'PRINT', 'height=600px,width=900px');


    mywindow.document.write('<html><head><title>' + document.title + '</title>');

    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

}
function Xuatexcelkho() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_KHOTONGHOP",
            namefile: "baocaokhotong",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var vttb = $("#cbvattutbi_baocaokhoth").val();
        var TypeDeviceIdx = "";
        $.each(vttb, function (key, val) {
            TypeDeviceIdx += val + ',';
        });       
        if (TypeDeviceIdx == "")
            TypeDeviceIdx = "-1";
        var para = {
            ToDateTo: p.txt_datetobh_baocaokhoth,
            Kho: p.cbkho_baocaokhoth,
            TypeDeviceId: TypeDeviceIdx,
            VendorId: parseInt(p.cbloaithietbi_baocaokhoth),
            StatusId: parseInt(p.cbtrangthai_baocaokhoth)
        };
        var kq = [];

        var data = dataXuatExcel_bct;
       
        for (var titile in data[0]) {
            console.log("titile.toLowerCase(): " + titile.toLowerCase());
            console.log("titile: " + titile);
            info = { field: titile.toLowerCase(), name: titile, type: "TextAndBoldCenter" };
            kq.push(info);
        }
        var colum = { kq: kq };
        console.log("colum");
        console.log(colum);
        excuteExcel(config, para, colum, true);
       
    } catch (e) {
        console.log(e);
    }
}

