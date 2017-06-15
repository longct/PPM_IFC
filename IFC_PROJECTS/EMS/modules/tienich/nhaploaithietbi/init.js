
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        loaddatabase_tinhapltb();
        $("#btnCapNhat_tinhapltb").click(function () {
            var check = checkkytunull_tinhapltb();
            if (check != "") {
                messInfo("messinfo_tinhapltb", check, "error");
                return;
            }
            f_confimYesNo("Cập nhật loại thiết bị?", "Bỏ qua", "Đồng ý", function () { f_addThemTBChoValue_tinhapltb(); });


        });

    } catch (e) { console.log(e); }
});


function f_addThemThietBiChoGrid_tinhapltb() {
    try {
        var check = checkkytunull_tinhapltb();
        if (check != "") {
            messInfo("messinfo_tinhapltb", check, "error");
            return;
        }
        $("#messinfo_tinhapltb").empty();
        itemCount++;
        var p = getAllIdMod();
        var html = "";
        
        html = "<tr id='tr" + itemCount + "'><td>" +
                            itemCount + "</td> <td>" +
                            p.txtloaithietbi_tinhapltb + " </td><td><input type='button'  id='delete_tinhapltb" + itemCount + "' value='Xóa'></td> </tr>";
        $("#myTableData_tinhapltb").append(html);

        $("#delete_tinhapltb" + itemCount).click(function () {
            $("#tr" + $(this).attr("id").replace("delete_tinhapltb", "")).remove();

            var idremove = $(this).attr("id").replace("delete_tinhapltb", "");
            var itemsFound = paraTable_tinhapltb.filter(function (elem) {
                return elem.Stt == idremove;
            });
            paraTable_tinhapltb.splice(itemsFound, 1);
        });
    } catch (e) {
        console.log(e);
    }
}
function f_addThemTBChoValue_tinhapltb() {
    try {
        var p = getAllIdMod();
        
        var config = { namesql: "TB_Lis_InsertTypeDevice", callback: "result_loaithietbi_tinhapltb", connstr: "ConnectEMS" };
        var para = {
            TypeDeviceName: p.txtloaithietbi_tinhapltb,
            TypeDetailOrCount: p.cbchitietsoluong_tinhapltb
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) { console.log(e); }
}
function result_loaithietbi_tinhapltb(config, para, lst) {
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_tinhapltb", "Cập nhật thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("messinfo_tinhapltb", lst.data[0].result, "ok");
            clead_tinhapltb();
            loaddatabase_tinhapltb();
        }
        else
            messInfo("messinfo_tinhapltb", lst.data[0].result, "error");
        

    } catch (e) {
        console.log(e);
    }

}
function checkkytunull_tinhapltb() {
    try{
        var p = getAllIdMod();
        if (p.txtloaithietbi_tinhapltb == '') return "Vui lòng nhập loại thiết bị";
        if (p.cbchitietsoluong_tinhapltb == '-1') return "Vui lòng chọn chi tiết/ Số lượng";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function clead_tinhapltb() {
    try{
        setValToTxt('txtloaithietbi_tinhapltb', '');
    } catch (e) {
        console.log(e);
    }
}
function loaddatabase_tinhapltb() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_tinhapltb", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_tinhapltb(config, para, lst) {
    try {
        var data = lst.data;

        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_tinhapltb", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_tinhapltb", "", "error");

        $("#myTableData_tinhapltb").empty();
        console.log(data[0].kq0);
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td style='width:20px'>"
                  + (key+1)+ "</td><td>"
                  + val.name + "</td><td style='width:80px'>"
                  + "<form class='form-inline' role=''form'><div class='form-group classquyen_sua'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_nhaploaittbi' style='width: 65px;height: 30px;' id='btn_nhaploaittb" + val.code + "'>Sửa</a></div></form></td> </tr>";

            $("#myTableData_tinhapltb").append(row);

            $("#btn_nhaploaittb" + val.code).click(function () {
                messInfo("messinfo_suastbi",'', "ok");
                loadsuanhaloaitbi_sua(val.code);
            });
        });
    } catch (e) {
        console.log(e);
    }
}
