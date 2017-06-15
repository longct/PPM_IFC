$(document).ready(function () {
    console.log("vvvvvvv");
    

});

function f_inportFileXmlToOracle(thiss) {
    try {
        var fdata = new FormData();
        var file = thiss.files[0];
        fdata.append("file", file);
        fdata.append("connstr", "Oracle_HDDT");
        fdata.append("insertto", "AM_TEMP_IMPORTFILE");
        fdata.append("ma_khang", "");
        fdata.append("ma_ddo", "");
        fdata.append("ma_tram", "");

        var config = { callback: "f_result_inportFileXmlToOracle", namefile: file.name };

        api_uploadFileXmlToOracle(config, fdata);

    } catch (e) {
        console.log(e);
    }
}

function f_result_inportFileXmlToOracle(config, para, lst) {
    console.log(lst);
}