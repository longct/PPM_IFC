
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        chungloaicongto();
        loadchecklog_master();
    } catch (e) {
        console.log(e);
    }

});
// đổ ra combox thông tin công tơ
function chungloaicongto() {
    try {
        var config = { namesql: "PKG_CAPNHAPDCU.LST_LOAICONGTO", callback: "f_result_loadloaicongto", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadloaicongto(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbloaicongto_thc", data, "id_cl", "name_cl", "-1", "Chọn chủng loại");

    } catch (e) {
        console.log(e);
    }
}
// hiển thị lịch sử thay công tơ
function loadlichsuthaycongto(val) {
    try{
        var config = { namesql: "PKG_CAPNHAPDCU.LICHSUCONGTO", callback: "f_result_loadlichsuthaycongto", connstr: "ConnectOracleStreetLight" };
        var para = { v_ID :val};
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlichsuthaycongto(config, para, lst) {
    try{
        var data = lst.data;
        $("#table_tthaycongto_thc").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr id='bt_treothao" + val.idct + "'><td>"
                + val.stt + "</td><td>"
                + val.socongto + "</td><td>"
                + val.loaicongto + "</td><td>"
                + setnull(val.ngaytreo) + "</td><td>"
                + setnull(val.ngaythao) + "</td><td>"
                + setnull(val.ishesos) + "</td><td>"
                + val.trangisthao + "</td></tr>";

            $("#table_tthaycongto_thc").append(row);

            $("#bt_treothao" + val.idct).click(function () {
                loadthongtintable_cthay(val.idct);
            });
        });
    } catch (e) {
        console.log(e);
    }
}
// click thay sẽ hiển thị công tơ lên
function loadthongtinthay_ctthay(val) {
    try{
        var config = { namesql: "PKG_CAPNHAPDCU.IDTREOTHAO", callback: "f_result_loadidthaocongto", connstr: "ConnectOracleStreetLight" };
        var para = { v_ID: val };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadidthaocongto(config, para, lst) {
    try{
        var data = lst.data;
        setValToTxt("txt_socongtocu_thc", data[0].socongto);
        setValToTxt("cbloaicongto_thc", data[0].loaicongto);
        setValToTxt("txt_ngaytreo_thc", data[0].ngaytreo);
        setValToTxt("txt_tu_thc", data[0].tu);
        setValToTxt("txt_ti_thc", data[0].ti);
        setValToTxt("txt_hsn_thc", data[0].hsn);
        if (data[0].isheso == "0") {
            $("#txt_checkhsn").prop("checked", true);
        } else {
            $("#txt_checkhsn").prop("checked", false);
        }
    } catch (e) {
        console.log(e);
    }
}
// click theo table 
function loadthongtintable_cthay(val) {
    try {
        var config = { namesql: "PKG_CAPNHAPDCU.IDTABLETREOTHAO", callback: "f_result_loadthongtintable_cthay", connstr: "ConnectOracleStreetLight" };
        var para = { v_ID: val };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtintable_cthay(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_socongtocu_thc", data[0].socongto);
        setValToTxt("cbloaicongto_thc", data[0].loaicongto);
        setValToTxt("txt_ngaytreo_thc", data[0].ngaytreo);
        setValToTxt("txt_tu_thc", data[0].tu);
        setValToTxt("txt_ti_thc", data[0].ti);
        setValToTxt("txt_hsn_thc", data[0].hsn);
        if (data[0].isheso == "0") {
            $("#txt_checkhsn").prop("checked", true);
        } else {
            $("#txt_checkhsn").prop("checked", false);
        }
    } catch (e) {
        console.log(e);
    }
}
// chỉnh sửa thay công tơ