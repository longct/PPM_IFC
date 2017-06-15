var dataXuatHeader_vttbda = [];
$(document).ready(function () {
    try {

        loadInitDate();
        setValToTxt('txt_dateto_baocaovttbda', gettimenow());
        LoadComBox_KhoTong_bcvttbda();
       
        $("#cbkho_baocaoktvttbda").change(function () {
            var value = $("#cbkho_baocaoktvttbda").val();
            loadduan_baocaovttbda(value);
            loaddienluc_baocaovttbda(value);
        });
       
        $("#cbvattutb_baocaoktvttbda").change(function () {
            var value = $("#cbvattutb_baocaoktvttbda").val();
            Loadloaithietbi_baocaovttbda(value);
        });
        
        $("#btnCapNhat_baocaovttbda").click(function () {
            messInfo("messinfo_baocaovttbda", "", "error");
            var check = checknull_baocaovttbda();
            if (check != "") {
                clear_vttbda();
                messInfo("messinfo_baocaovttbda", check, "error");
                return;
            }
            f_layDuLieu_baocaovttbda();
        });
        $("#btnxuatexcel_baocaovttbda").click(function () {
            f_xuatexcel_baovttbda();
        });
    } catch (e) {
        console.log(e);
    }
});
//load kho tổng
function LoadComBox_KhoTong_bcvttbda() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_LoadComBox_KhoTong_bcvttbda", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_LoadComBox_KhoTong_bcvttbda(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutb_baocaoktvttbda", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cbkho_baocaoktvttbda", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load dự án
function loadduan_baocaovttbda(value) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaovttbda", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_baocaovttbda(config, para, lst) {
    try {
        dataToCob("cbduan_baocaovttbda", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load điện lực
function loaddienluc_baocaovttbda(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_baocaovttbda", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDienlucDuAn', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_baocaovttbda(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == '[]') return;
        var data = lst.data;
        $("#cb_baocaodienlucvttbda").empty();
        $("#cb_baocaodienlucvttbda").append("<option value='-1' data-code='-1'>--Tất cả---</option");
        $.each(data, function (index, val) {
            var option = "<option value='" + val.code + "' data-code='" + val.codevirtual + "'>"
                        + val.name
                        + "</option>";
            $("#cb_baocaodienlucvttbda").append(option);
        });
    } catch (e) {
        console.log(e);
    }
}

//load thiết bị
function Loadloaithietbi_baocaovttbda(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaovttbda", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaovttbda(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbloaithietbi_vttbda", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}

function clear_vttbda() {
    $("#myTableDataheader_bacaoxuatvttb").empty();
    $("#myTableDatabody_bacaoxuatvttb").empty();
    $("#messinfo_baocaovttbda").hide();
    messInfo("messinfo_baocaovttb", "", "error");
    messInfo("messinfo_baocaovttb", "", "ok");
}

// thực hiện báo cáo kho tổng
function f_layDuLieu_baocaovttbda() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BAOCAO_TINHTRANGXUATVTTB", callback: 'fn_tb_baocao_ttvttbda', connstr: "ConnectEMS" };
        var para = {
            ToDateTo: p.txt_dateto_baocaovttbda,
            kho: p.cbkho_baocaoktvttbda,
            dienluc:p.cb_baocaodienlucvttbda,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoktvttbda),
            VendorId: parseInt(p.cbloaithietbi_vttbda),
            tukhoa: p.txttukhoavttbda
        };

        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}
function fn_tb_baocao_ttvttbda(config, para, lst) {
    try {

        clear_vttbda();
        if (lst == null || lst == undefined || lst == "[]") {

            messInfo("messinfo_baocaovttbda", "Chưa có dữ liệu hiển thị", "error");
            return;
        }
        var data = lst.data;
        if (data.length == 0 || data[0].column1 == "[]") {
            messInfo("messinfo_baocaovttbda", "Chưa có dữ liệu hiển thị", "error"); return;
        }
       
        var p = getAllIdMod();
       
        f_veGrid_baocaoxuat(lst)
    } catch (e) { console.log(e); }
}

function f_veGrid_baocaoxuat(lst) {
    try {
        var data = lst.data[0].kq0;
        if (data.length == 0) {
            messInfo("messinfo_baocaovttbda", "Chưa có dữ liệu hiển thị", "error"); return;
        }
        var data1 = lst.data[1].kq1;
        if (data1.length == 0) {
            messInfo("messinfo_baocaovttbda", "Chưa có dữ liệu hiển thị", "error"); return;
        }
        var rowspanct = data.length * 3;
     
        var tr = "<tr>";
        tr += "<th rowspan='3'>STT</th>";
        tr += "<th rowspan='3'>BAN/MIỀN</th>";
        tr += "<th rowspan='3'>MÃ DỰ ÁN</th>";
        tr += "<th rowspan='3'>TÊN DỰ ÁN</th>";
        tr += "<th rowspan='3'>Mã VTTB</th>";
        tr += "<th rowspan='3'>Tên VTTB</th>";
        tr += "<th rowspan='3'>ĐVT</th>";
        tr += "<th colspan='" + rowspanct + "'>THÔNG TIN CHI TIẾT VỀ TÌNH TRẠNG SỐ LIỆU XUẤT XUỐNG DỰ ÁN</th>";
       
        tr += "<th rowspan='3'>TỔNG SL THEO KẾ HOẠCH</th>";
        tr += "<th rowspan='3'>TỔNG SL ĐÃ XUẤT</th>";
        tr += "<th rowspan='3'>TỔNG SL CÒN PHẢI XUẤT</th>";
        tr += "</tr>";
        tr += "<tr>";
        $.each(data, function (key, val) {
            tr += "<th colspan='3'>" + val.header + "</th>";
        });
        tr += "</tr>";
        tr += "<tr>";
        for (var i = 0; i < data.length; i++) {
            //tổng sl theo kế hoạch
            tr += "<th>SL kh</th>";
            tr += "<th>SL đã xuất</th>";
            tr += "<th>SL còn phải xuất</th>";
        }
        tr += "</tr>";
        $("#myTableDataheader_bacaoxuatvttb").append(tr);

      
       
        $.each(data1, function (key, value) {
         
            var tr = '<tr>'
            $.each(value, function (item, val) {
                tr += '<td class="text-center">' + SetValnullNumber(val) + '</td>'
            });
            tr += '</tr>';
            $("#myTableDatabody_bacaoxuatvttb").append(tr);
        });


    } catch (e) { console.log(e); }
}


function checknull_baocaovttbda() {
    try {
        var p = getAllIdMod();
        if (p.cbkho_baocaoktvttbda == "-1") return "Vui lòng chọn kho";
        
        return "";
    } catch (e) {
        console.log(e);
    }
}
function f_xuatexcel_baovttbda() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_TINHTRANGXUATVTTB_EXCEL",
            callback: 'fn_tb_baocao_tinhtrangxuatvttb_excel',
            connstr: "ConnectEMS"
        };
        var para = {
            ToDateTo: p.txt_dateto_baocaovttbda,
            kho: p.cbkho_baocaoktvttbda,
            dienluc: p.cb_baocaodienlucvttbda,
            TypeDeviceId: parseInt(p.cbvattutb_baocaoktvttbda),
            VendorId: parseInt(p.cbloaithietbi_vttbda),
            tukhoa: p.txttukhoavttbda
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function fn_tb_baocao_tinhtrangxuatvttb_excel(config1,para,lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_baocaovttbda", "Chưa có dữ liệu để xuất", "error"); return;
        }
        var kq = [];
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_TINHTRANGXUATVTTB_EXCEL",
            namefile: "baocaotheodoitinhtrangxuatvttbxuongda",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var data = lst.data[0].kq0[0];
        dataXuatHeader_vttbda = lst.data[1].kq1;
        console.log(data);
        for (var titile in data) {
            if (titile == "stt") {
                var info = { field: titile, name: "STT", type: "TextAndBoldCenter" };
                kq.splice(0, 0, info);
            }
            else if (titile == "banmien") {
                var info = { field: titile, name: "BAN/MIỀN", type: "TextAndBoldCenter" };
                kq.splice(1, 0, info);
            }
            else if (titile == "maduan") {
                var info = { field: titile, name: "MÃ DỰ ÁN", type: "TextAndBoldCenter" };
                kq.splice(2, 0, info);
            }
            else if (titile == "tenduan") {
                var info = { field: titile, name: "TÊN DỰ ÁN", type: "TextAndBoldCenter" };
                kq.splice(3, 0, info);

            }
            else if (titile == "mavattu") {
                var info = { field: titile, name: "Mã VTTB", type: "TextAndBoldCenter" };
                kq.splice(4, 0, info);
               
            }
            else if (titile == "tenvattu") {
                var info = { field: titile, name: "Tên VTTB", type: "TextAndBoldCenter" };
                kq.splice(5, 0, info);
               
            }
            else if (titile == "donvitinh") {
                var info = { field: titile, name: "ĐVT", type: "TextAndBoldCenter" };
                kq.splice(6, 0, info);
               
            }
            else if (titile == "tongslkh") {
                var info = { field: titile, name: "TỔNG SL THEO KẾ HOẠCH", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else if (titile == "tongsldx") {
                var info = { field: titile, name: "TỔNG SL ĐÃ XUẤT", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else if (titile == "tongslcpx") {
                var info = { field: titile, name: "TỔNG SL CÒN PHẢI XUẤT", type: "TextAndBoldCenter" };
                kq.push(info);
            }
            else {
                var name = f_get_name_vttbda(titile);
                var info = { field: titile, name: name, type: "TextAndBoldCenter" };
                kq.push(info);
            }

        };

        var colum = { kq: kq };
        console.log(colum);
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
function f_get_name_vttbda(field) {
    var data = dataXuatHeader_vttbda;
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        if (data[i].code.toLowerCase() == field) return data[i].header;
    }
}