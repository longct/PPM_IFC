var dataExcel = '';
$(document).ready(function () {
    try {
        $("#txt_file").change(function () {
            var fname = $("#txt_file").get(0).files[0].name;
            var fileExt = fname.split('.').pop();

            if (fileExt.indexOf("xlsx") == -1 || fileExt.indexOf("xls") == -1) {
                showToast('Vui lòng chọn file excel', "error");
                $("#txt_file_thayct").val("");
                return;
            }
            f_UploadFile_ttxuatexcel();
        });

        $("#btnthanhlydd").click(function () {
            var lenght_nkhtcmis = $("#txt_file").get(0).files.length;
            if (lenght_nkhtcmis > 0) {
                Capnhat_thanhly();
            } else {
                showToast('Vui lòng chọn file trước khi thực hiện', "error");
            }
           
        });
            
    } catch (e) {
        console.log(e);
    }
});
function f_UploadFile_ttxuatexcel() {
    try {
        var p = getAllIdMod();
        var fdata = new FormData();
        var file = $("#txt_file").get(0).files;

        fdata.append("file", file[0]);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
                showToast("Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_ttxuatexcel" };

        f_importExcel(config, fdata);
    } catch (e) { messInfo("messinfo_xuatexcel", "File không hợp lệ, hãy sửa file và load lại", "error"); console.log(e); }
}
function f_resultImportExcel_ttxuatexcel(config, para, lst) {
    try {
        var data = lst.data;
        $(".sobanghi").html("Tổng số " + data.length + " bản ghi");
        if (data == null || data == undefined || data.length == 0 || data == "") {
            dataExcel = "";
            $("#classbang_thanhly").hide();
            return;
        }
        $("#classbang_thanhly").show();
        dataExcel = data;
        $("#table_thanhly").empty();
        $.each(data, function (key,val) {
            var row = "";
            row += "<tr><td class='c'>"
                + (key+1) + "</td><td class='l'>"
                + val.ma_ddo + "</td><td class='l'>"
                + val.so_cto + "</td><td class='c'>"
                + val.ngay_bdong + "</td><td class='r'>"
                + val.chiso_moi + "</td><td >"
                + val.loai_chiso + "</td></tr>";
            $("#table_thanhly").append(row);
        });
     
    } catch (e) {
        messInfo("messinfo_xuatexcel", "File không hợp lệ, hãy sửa file và load lại", "error")
        console.log(e);
    }
}
function Capnhat_thanhly() {
    try {
        var lstId = [];
        data = dataExcel;
        for (var i = 0; i < data.length; i++) {
            if (data[i].ma_ddo != null & data[i].so_cto != null) {
                var ID = {
                    cot1: data[i].ma_ddo,
                    cot2: data[i].so_cto,
                    cot3: data[i].ngay_bdong,
                    cot4: data[i].chiso_moi,
                    cot5: data[i].loai_chiso,
                    cot6: '1',
                    cot7: 'THANHLY'
                };
                lstId.push(ID);
            } else {
                showToast("File chưa đúng (mã điểm đo và số công tơ không được bỏ trống)", "error");
                return;
            }
        }
        var config = {
            connstr: "ConnectOracle233",
            insertto: "AM_TEMP_DB",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
           
            capnhatthanhlydiemdo();
        }
        else {
            showToast("File chưa đúng", "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function capnhatthanhlydiemdo() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THANHLY.UPDATETHANHLY", callback: "result_capnhatthanhlydiemdo" };
        var para = {
            v_USERID: userinfo.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatthanhlydiemdo(config, para, lst) {
    try {
        var data = lst.data;
 
        var row = data[0].count;
        $("#total_resutl").show("slow").delay(4000).hide("slow");
        $("#total_resutl").html(row);
    } catch (e) {
        console.log(e);
    }
}


