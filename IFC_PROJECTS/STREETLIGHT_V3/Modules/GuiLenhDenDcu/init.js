var infoParaDtt = null;
$(document).ready(function () {
   
});

function f_CheckKetQuaDtt_gldd() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.GUILENHDENMULTYDCU"
            , callback: "f_resultGetInfoFromTree_dtt"
        };

        var para = { V_THOIDIEMRALENH: "" };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

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

        console.log(config);
        console.log(para);
        
        infoParaDtt = { config: config, para: para };
        api_ExecuteTcpByte_New(config, para);

    } catch (e) { console.log(e); }
}

function f_result_sendTcpConnect(config, para, lst) {
    try {
        if (lst.data[0].status == "OK") {
            console.log("kết nối thành công");
            var config1 = { resulttcp: "sendbyte", callback: "f_GuiXong_Tcp_dtt", keysocket: config.keysocket };
            var para1 = {
                lenh: config.lenh               
            }
            api_ExecuteTcpByte_New(config1, para1);


            // thu gui lai lan 2
            var config2 = { resulttcp: "disconnect", callback: "f_GuiXong_Tcp_dtt", keysocket: config.keysocket };
           
            api_ExecuteTcpByte_New(config2, []);
        }
    } catch (e) { console.log(e); }
}

function f_GuiXong_Tcp_dtt(config, para, lst) {
    console.log("gui xong lenh " + para.lenh);
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
