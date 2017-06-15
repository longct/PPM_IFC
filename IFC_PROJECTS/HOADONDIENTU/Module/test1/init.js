$(document).ready(function () {
    console.log("vvvvvvv");
    $("#btn_Test").click(function () {
        f_checkValidateAll();

        //var config = { connstr: "ConnectSql", namesql: "HD_MAYMOC.THEMMOIMAYIN", callback: "result_capnhat_khmin" };
        //var para = {
        //    usercode: "PP05000515424",
        //};
        //ExecuteServiceSyns_Test(config, para);


    });

    $("#btn_Test1").click(function () {
        f_removeValidateAll();
    });

});


function ExecuteServiceSyns_Test(config, para) {
    try {

        if (config == null || config == undefined) {
            //console.log("kiem tra lai config");
            return "[]";
        }
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        var syns = false;
        //  console.log(jsonpara);
        if (config.callback != null && config.callback != '')
            syns = true;

        $.ajax({
            url: "http://localhost:22660/api/sqlsysdnpc",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                 console.log(data);
               
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(JSON.stringify(jqXHR));
                ////console.log(jqXHR);
                ////console.log(textStatus);
                ////console.log(errorThrown);
            }
        });


    } catch (e) {
        ////console.log(e);

        return null;
    }
}
