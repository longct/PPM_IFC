
$(document).ready(function () {
    try{
        initformelement();
        loadConetent();
        f_loadDuLieu_test();

    } catch (e) {
        console.log(e);
    }
});


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