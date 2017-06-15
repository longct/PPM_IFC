var ws = null;
$(document).ready(function () {
    try{
        //initformelement();
        //loadConetent();
        //f_loadDuLieu_test();

      //console.log(hex_to_ascii("67670D0A68680D0A"));
        $("#hellothu").click(function () {
            var config = { keysocket: "123456", typecommand: "connect" };
            var para = { ip: "127.0.0.1", port: 1122 };
            api_ExecuteTcpByte_New(config, para);
        });

        $("#guithu").click(function () {
            var config = { keysocket: "123456", typecommand: "sendbyte" };
            var para = { lenh: "504153533132333410"};
            api_ExecuteTcpByte_New(config, para);
        });
        $("#nhanthu").click(function () {
            var config = { keysocket: "123456", typecommand: "receivebyte",callback:"nhanok" };
            var para = {};
            api_ExecuteTcpByte_New(config, para);
        });
        $("#dongketnoi").click(function () {
            var config = { keysocket: "123456", typecommand: "disconnect"};
            var para = {};
            api_ExecuteTcpByte_New(config, para);
        });
        
    } catch (e) {
        console.log(e);
    }
});

function nhanok(config,para,lst)
{
    console.log(lst);
    console.log(hex_to_ascii(lst));
}
function hex_to_ascii(str2) {
    var str1 = str2.replace("-", "");
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))+"-";
    }
    return str;
}
function api_ExecuteTcpByte_New(config, para) {
    try {

        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        console.log(jsonpara);
        var syns = false;

        $.ajax({
            url:  "http://localhost:22660/api/TCP_SendReceiveByte",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                try {
                    console.log(data);
                    //var lst = f_convertHexToByte(data)
                    if (config.callback != null) {
                        funExeItem(config.callback, config, para,data);
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });


    } catch (e) {
        ////console.log(e);

        return null;
    }
}

function f_forartHex(str) {
    var strNew = "";
    for (var i = 0; i < str.length;) {
        strNew += str.charAt(i) + str.charAt(i + 1) + "-";
        i = i + 2;
    }
    return strNew.substring(0, strNew.length - 1);
}
function f_loadDuLieuLogin_test() {
    try {
        var config = { namesql: "PKG_CB_EMAIL_SMS.CANHBAO_TONGQUAN", callback: "f_resultloadDuLieuLogin_test", connstr: "ConnectOracle_NgheAn" };
        var para = {};
        //  $.cookie('Cookie', 'value3452');

        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_resultloadDuLieuLogin_test(config,para,lst)
{
    console.log(lst);
    $.cookie('Cookie', 'value3452');
    f_loadDuLieu_test();
}

function f_loadDuLieu_test() {
    try
    {
        var config = { namesql: "PKG_CB_EMAIL_SMS.CANHBAO_TONGQUAN", callback: "f_result_loadDuLieu_test", connstr: "ConnectOracle_NgheAn" };
                var para = {};
                ExecuteServiceSyns(config, para);
        
    } catch (e) {
        console.log(e);
    }
}

function f_result_loadDuLieu_test(config,para,lst)
{
    console.log(lst);
}