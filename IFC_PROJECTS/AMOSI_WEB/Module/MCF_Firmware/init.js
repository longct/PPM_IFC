var dataExcel = '';
$(document).ready(function () {

    setTitle("Upload Firmware");
    get_list_firm();

    $('#btn_upload').click(function () {
        f_UploadFile();
    });
});


function f_UploadFile() {
    try {
        var fdata = new FormData();
        var file = $("#upload_firm").get(0).files;
        fdata.append("file", file[0]);
        var config = { callback: "f_result_upload", namefile: file.name };
        api_uploadFirm_ware(config, fdata);
    } catch (e) { console.log(e); }
}

function f_result_upload(config, para, data) {
    try {
        console.log(data);
        if (data != null && data.result == "OK") {
            var config = { namesql: "PKG_MCF.INSERT_FIRM", connstr: "ConnectOracleAmosi233" };
            var para = {
                v_filename: data.data,
            };
            console.log(para);
            var lst = ExecuteServiceSyns(config, para);

            messInfo("messinfo_upload_firmware", 'Upload thành công', "ok");
        }
        else
            messInfo("messinfo_upload_firmware", 'Upload không thành công', "ok");
    }
    catch (ex) {
        console.log(ex.message);
    }
}


function get_list_firm() {
    try {
        var lstData = null;
        $.ajax({
            type: 'POST',
            url: urli + '/Home/MCF_Getlist_Firmware',
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                console.log('ffffffffff');
                console.log(data);
            }
        });
    } catch (e) { console.log(e); }
}