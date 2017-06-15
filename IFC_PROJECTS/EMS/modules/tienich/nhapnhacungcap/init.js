
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        loaddatabase_nhacc();
        $("#btnCapNhat_tienichncc").click(function () {
            var check = validate_nhacc();
            if (check != "") {
                messInfo("messinfo_tinhapltb", check, "error");
                return;
            }
            f_confimYesNo("Cập nhật nhà cung cấp?", "Bỏ qua", "Đồng ý", function () { f_addThemNCCChoValue_tienichncc(); });
          
        });

    } catch (e) { console.log(e); }
});

function clearthem_tienichncc() {
    try {
        setValToTxt('cb_nhasanxuat_tienichncc', '-1');
        setValToTxt('txtnhacungcap_tienichncc', '');
    } catch (e) {
        console.log(e);
    }
}

function f_addThemNCCChoValue_tienichncc() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_IDTHEMNhaCungCap", callback: "f_result_InsertNhaCungcap", connstr: "ConnectEMS" };
        var para = {
            ID:'',
            IDNSX:p.cb_nhasanxuat_tienichncc,
            TENCC: p.txtnhacungcap_tienichncc,
            ManCC: p.txtmacc_tienichncc
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) { console.log(e); }
}
function f_result_InsertNhaCungcap(config, para, lst) {
    try{
       
        var data = lst.data;
        var row = data[0].count;

        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tinhapltb", row, "ok");
            loaddatabase_nhacc();
            clearthem_tienichncc();
        } else {
            messInfo("messinfo_tinhapltb", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function validate_nhacc() {
    try {
        var p = getAllIdMod();
        if (p.cb_nhasanxuat_tienichncc == "-1") return "Bạn chưa chọn nhà sản xuất";
        if (p.txtmacc_tienichncc == "") return "Không được để trống mã nhà cung cấp";
        if (p.txtnhacungcap_tienichncc == "") return "Không được để trống  tên nhà cung cấp";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function loaddatabase_nhacc() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_nhacc", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_nhacc(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_nhasanxuat_tienichncc", data[3].kq3, "code", "name", "-1", "--Chọn nhà sản xuất-");
        loadtrang_nhacc(data);
    } catch (e) {
        console.log(e);
    }
}
function loadtrang_nhacc(data) {
    try {
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_tinhapltb", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_tinhapltb", "", "error");
      
        $("#myTableData_tienichncc").empty();
        $.each(data[4].kq4, function (key, val) {
            var row = "";
            row +="<tr><td style='width:20px'>"
                  + (key+1) + "</td><td>"
                  + SetValnull(val.manhacungcap) + "</td><td>"
                  + val.name + "</td><td style='width:80px'>"
                  + "<form class='form-inline' role=''form'><div class='form-group classquyen_sua'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_nhacc' style='width: 65px;height: 30px;' id='btn_suacc" + val.code + "'>Sửa</a></div></form></td> </tr>";

            $("#myTableData_tienichncc").append(row);
            $("#btn_suacc" + val.code).click(function () {
            
                messInfo("messinfo_suacc", '', "error");
                loadmanhsuaacc(val.code);
            });
        });
    } catch (e) {
        console.log(e)
    }

}
