
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        loaddatabase_nhasanxuat();
        $("#btnCapNhat_tienichnsx").click(function () {
            var check = validate_nhasax();
            if (check != "") {
                messInfo("messinfo_tienichnsx", check, "error");
                return;
            }
            f_confimYesNo("Cập nhật nhà sản xuất?", "Bỏ qua", "Đồng ý", function () { f_addThemNhasxhoValue_tienichnsx(); });
        });

    } catch (e) { console.log(e); }
});
function f_addThemNhasxhoValue_tienichnsx() {
    try {
        var p = getAllIdMod();
      
        var config = { namesql: "TB_Lis_InsertNhaSanXuat", callback: "f_result_InsertNhapnhasanxuat", connstr: "ConnectEMS" };
        var para = {
            TenNhaSanXuat: p.txtnhasanxuat_tienichnsx
        };
        ExecuteServiceSyns(config, para, false);
    
       
    } catch (e) { console.log(e); }
}
function f_result_InsertNhapnhasanxuat(config, para, lst) {
    try{
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_tienichnsx", "Cập nhật chi tiết loại thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("messinfo_tienichnsx", lst.data[0].result, "ok");
            clearthem_nhasanxuat();
            loaddatabase_nhasanxuat();
        }
        else
            messInfo("messinfo_tienichnsx", lst.data[0].result, "error");
       
    } catch (e) {
        console.log(e);
    }
}
function validate_nhasax() {
    try{
        var p = getAllIdMod();
        if (p.txtnhasanxuat_tienichnsx == "") return "Không được để trống  tên nhà sản xuất";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function clearthem_nhasanxuat() {
    try {
        setValToTxt('txtnhasanxuat_tienichnsx', '');
    } catch (e) {
        console.log(e);
    }
}
function loaddatabase_nhasanxuat() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_nhasanxuat", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_nhasanxuat(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_tienichnsx", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_tienichnsx", "", "error");

        $("#myTableData_tienichnsx").empty();
        $.each(data[3].kq3, function (key, val) {
            var row = "";
            row += "<tr><td>"
                  + (key + 1) + "</td><td>"
                  + val.name + "</td><td>"
                  + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_nhasaxuat' style='width: 65px;height: 30px;' id='btn_suasx" + val.code + "'>Sửa</a></div></form></td> </tr>";

            $("#myTableData_tienichnsx").append(row);
                

            $("#btn_suasx" + val.code).click(function () {
                messInfo("messinfo_sanxuat", '', "ok");
                loadsuanhasanxuat_sua(val.code);
            });
        });
    } catch (e) {
        console.log(e);
    }
}


