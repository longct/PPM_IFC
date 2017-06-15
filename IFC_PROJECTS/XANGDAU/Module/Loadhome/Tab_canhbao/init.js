$(document).ready(function () {
    try
    {
            loadConetent();
    }catch(e){console.log(e);}
});

function f_loadInfo_tabcanhbao(mavoi) {
    var config = { namesql: "PKG_TKVOIBOM.THONGTINVOIBOM", callback: "f_result_loadInfo_tabcanhbao", connstr: "ConnOracleXangDau" };
    var para = {
        v_Mavoi: mavoi
    };
    console.log(para);
    ExecuteServiceSyns(config, para);
}

function f_result_loadInfo_tabcanhbao(config, para, ls) {
    try {
        if (ls == null || ls == undefined || ls == "" || ls == "[]" || ls.data == null || ls.data.lenght == 0)
            return;
        $("#tenvoi_tabcanhbao").html(ls.data[0].tenvoibom);
        $("#tongsolit_tabcanhbao").html("TỔNG SỐ LÍT: " + ls.data[0].tonglit);
    } catch (e) { console.log(e); }
}