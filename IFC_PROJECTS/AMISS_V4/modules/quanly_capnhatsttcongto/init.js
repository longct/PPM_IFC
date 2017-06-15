var CNSTTCT = { dataExcel: "" };
$(document).ready(function () {
    showhideTree();
    try {
        selectlang();
        $("#file_input").change(function () {
            CNSTTCT.f_upload_excel();
        });

        $("#bnThuchien_cnsttct").click(function () {
            CNSTTCT.f_thuc_hien();
        });

    } catch (e) {
        console.log(e.message);
    }
});

CNSTTCT.f_upload_excel = function () {
    try {
        var fdata = new FormData();
        var file = $("#file_input").get(0).files;
        //var key = new Date().getFromFormat("yyyymmddhhmmss");
        //fdata.append("insertto", "AM_TEMP_CAPNHATSTTCONGTO");
        //fdata.append("key", key);
        fdata.append("file", file[0]);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            showToast("Vui lòng chọn file excel trước khi thực hiện", "error");
            return;
        }
        var config = { callback: "CNSTTCT.f_resultImportExcel" };
        console.log(fdata);
        f_importExcel(config, fdata);
    } catch (e) {
        console.log(e.message);
    }
}

CNSTTCT.f_resultImportExcel =  function(config, para, lst) {
    try {
        var data = lst.data;
        $("#tbl_thaysttct").show();
        $("#tbl_cnsttct").show();
        $("#tbl_cnsttct tbody").empty();
        if (data == null || data == undefined || data.length == 0 || data == "") {
            CNSTTCT.dataExcel = "";
            return;
        }
        $(".sobanghi").html("Tổng số " + data.length + "<span tkey='banghi'></span>");
        CNSTTCT.dataExcel = data;
        var row = "";
        $.each(data, function (key, val) {
            row += "<tr><td class='text-center'>"
                + val.madiemdo + "</td><td class='text-center'>"
                + val.imei + "</td><td class='text-center'>"
                + val.socongto + "</td><td class='text-center'>"
                + val.sort + "</td></tr>";
        });
        $("#tbl_cnsttct tbody").append(row);
        selectlang();
    } catch (e) {
        console.log(e);
    }
}

CNSTTCT.f_thuc_hien = function () {
    try {
        var file = $("#file_input").get(0).files;
        if (file == null || file == 'undefined' || file.length == 0) {
            showToast("Vui lòng chọn file excel trước khi thực hiện", "error");
            return;
        }
        var lstRecord = [];
        data = CNSTTCT.dataExcel;
        CNSTTCT.key = new Date().getFromFormat("yyyymmddhhmmss");
        for (var i = 0; i < data.length; i++) {
            if (data[i].socongto) {
                var record = {
                    madiemdo: data[i].madiemdo,
                    imei: data[i].imei,
                    socongto: data[i].socongto,
                    sort: data[i].sort,
                    key: CNSTTCT.key
                };
                lstRecord.push(record);
            } else {
                showToast("File chưa đúng (Số công tơ không đúng định dạng)", "error");
                return;
            }
        }
        var config = {
            connstr: "ConnectOracle233",
            insertto: "AM_TEMP_CAPNHATSTTCONGTO",
        }
        var table = {
            table: JSON.stringify(lstRecord)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst && lst.result !== "ERROR") {
            CNSTTCT.f_cap_nhat_stt_cong_to();
        }
        else {
            showToast("File chưa đúng định dạng", "error");
        }
    } catch (e) {
        console.log(e);
    }
}

CNSTTCT.f_cap_nhat_stt_cong_to = function () {
    try {
        var config = {
            connstr: "ConnectOracle233",
            namesql: "ADMISS_UPDATESTTCONGTO.update_meter_sort",
            callback: "CNSTTCT.f_callback_cap_nhat_stt_cong_to"
        };
        var para = {
            v_key: CNSTTCT.key
        };
       console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    } 
}

CNSTTCT.f_callback_cap_nhat_stt_cong_to = function (config, para, result) {
    try {
        var data = result.data;

        var row = data[0].count;
        $("#total_resultsttct").show("slow").delay(4000).hide("slow");
        if (row == 0) {         
            $("#total_resultsttct").html("Cập nhật không thành công");
            return;
        }
        else
            $("#total_resultsttct").html("Cập nhật thành công " + row + " điểm đo");
    } catch (e) {
        console.log(e);
    }
}