$(document).ready(function () {
    try
    {
        loadConetent();
       
        $(".lichsutab_home").click(function () {
            $(".lichsutab_home").each(function () {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            var value = $(this).attr("value");
            clickTab_home = value.toLowerCase();
            $(".delete_tab_his_home").empty();
            $(".delete_tab_his_home").append('<div data-include="' + value + '"></div>');
            loadConetent();

        });
    }catch(e){console.log(e);}
});

function f_loadInfo_lhct(mavoi) {
    var config = { namesql: "PKG_TKVOIBOM.THONGTINVOIBOM", callback: "f_result_loadInfo_lhct", connstr: "ConnOracleXangDau" };
    var para = {
        v_Mavoi: mavoi
    };
    console.log(para);
    ExecuteServiceSyns(config, para);
}

function f_result_loadInfo_lhct(config,para,ls)
{
    try
    {
        if (ls == null || ls == undefined || ls == "" || ls == "[]" || ls.data == null || ls.data.lenght == 0)
            return;
        $("#tenvoi_hometab").html(ls.data[0].tenvoibom);
        $("#tongsolit_hometab").html("TỔNG SỐ LÍT: "+ls.data[0].tonglit);
    } catch (e) { console.log(e);}
}