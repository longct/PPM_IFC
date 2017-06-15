var infoParaDtt = null;
$(document).ready(function () {

});


function f_resultGetInfoFromTree_dtt(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == '[]' || lst.data == ''
            || lst.data.length == 0 || lst.result == "ERROR") {
            console.log("Không có lệnh");
            return;
        }
        f_sendTcpConnect(lst.data[1].kq1[0]);

    } catch (e) {
        console.log(e);
    }
}


function f_sendTcpConnect(val) {
    try {
        if (val == null || val == undefined || val.imei == null || val.imei == undefined) {
            console.log("Không có lệnh ..");
            return;
        }
        var config = {
            resulttcp: "connect",
            callback: "f_result_sendTcpConnect",
            namefile: val.tenfile,
            thoidiem: val.thoidiem,
            lenh: val.lenh,
            keysocket: val.imei
        };
        var para = {
            ip: val.ip,
            port: val.port
        }
        infoParaDtt = { config: config, para: para };
        //api_ExecuteTcpByte_New(config, para);
        api_ExecuteTcpByte(config, para);

    } catch (e) { console.log(e); }
}

function f_result_sendTcpConnect(config, para, lst) {
    try {
        if (lst.result == "OK") {
            console.log("gửi lệnh thành công");
            f_GuiXong_Tcp_dtt(config,para,lst)
        }
    } catch (e) { console.log(e); }
}

function f_GuiXong_Tcp_dtt(config, para, lst) {
    var config1 = {
        connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.BAOLAIDCUNAODOCXONG"
        , callback: "f_LayThongTinIpPort_dtt"
    };

    var para1 = {
        V_TENFILE: infoParaDtt.config.namefile,
        V_IMEI: "",
        V_TYPE: "GUIXONG"
    }
    ExecuteServiceSyns(config1, para1);
}


function f_LayThongTinIpPort_dtt() {

    try {
        var config = { connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.LAYLENHTUONGUNG", callback: "f_resutl_LayThongTinIpPort_dtt" };

        var para = {
            V_THOIDIEMRALENH: infoParaDtt.config.thoidiem
            , V_LSTIMEI: ""
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}

function f_resutl_LayThongTinIpPort_dtt(config, para, lst) {
    try {
        f_sendTcpConnect(lst.data[0]);

    } catch (e) { console.log(e); }
}
