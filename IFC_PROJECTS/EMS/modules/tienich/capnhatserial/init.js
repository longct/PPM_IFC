var paraTable_cntttb = [];

$(document).ready(function () {
    try {
        loadConetent();
        $("#btnCapNhat_cns").click(function () {
           
            var lenght_nkhtcmis = $("#readExcel_cns").get(0).files.length;
            if (lenght_nkhtcmis > 0) {
                var fname = $("#readExcel_cns").get(0).files[0].name;
                var fileExt = fname.split('.').pop();
                if (fileExt != 'xlsx' && fileExt != 'xls') {
                    messInfo("messinfo_cns", 'Vui lòng chọn file excel', "error");
                    return;
                }
                f_confimYesNo("Bạn có chắc chắn muốn cập nhật?", "Bỏ qua", "Đồng ý", function () { f_capNhat_cns(); });

            } else {
                messInfo("messinfo_cns", 'Vui lòng chọn file trước khi thực hiện', "error");
            }
          
        });
        $("#readExcel_cns").click(function () {
            $("#readExcel_cns").val("");
            messInfo("messinfo_cns", '', "error");
            messInfo("messinfo_cns", '', "ok");
        });

    } catch (e) { console.log(e); }
});


function f_capNhat_cns() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("readExcel_cns").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");

        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_cntttb", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { namesql: "TB_CapNhatSerialThietBi", callback: "f_f_capNhat_cns", connstr: "ConnectEMS" };
        var para = {
            UserId: userInfo.userid
        };
        fdata.append("config", JSON.stringify(config));
        fdata.append("para", JSON.stringify(para));
        f_importExcelMaxLength(config, para, fdata);
    } catch (e) {
        console.log(e);
    }
}
function f_f_capNhat_cns(config, para, lst)
{
   
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_cns", "Cập nhật trạng thái thiết bị lỗi", "error");
            return;
        }
    
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_cns", lst.data[0].result, "ok");
            $("#readExcel_cntttb").val("");
         
        }
        else
            messInfo("messinfo_cns", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}

// doc file excel
function f_UploadFile_cns() {
    try {
        
        
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_cns(config, para, lst) {
    try {
        var data = lst.data;
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_cntttb", "Cập nhật trạng thái thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_cntttb", lst.data[0].result, "ok");
            paraTable_cntttb = [];
            $("#readExcel_cntttb").val("");
            $("#cbtrangthai_cntttb").val("-1");
            $("#grv_cntttb tbody").empty();
        }
        else
            messInfo("messinfo_cntttb", lst.data[0].result, "error");

    } catch (e) { console.log(e); }
}

