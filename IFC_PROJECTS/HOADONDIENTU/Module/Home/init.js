$(document).ready(function () {
    $(".round-home").hover(function () {
        $(".ul_ro").hide();
        $("#ul_" + $(this).attr("value")).show();
        //  setTimeout($(".ul_ro").hide(), 5000);
    });
    f_loadThongTin_home();
});

function f_loadThongTin_home()
{
    var config = { namesql: "HD_HOME.THONGTINTONGQUAN", callback: "f_result_loadThongTin_home", connstr: "Oracle_HDDT" };

    var user = localStorage.getItem("userinfo");
    var userid = "";
    if (user == null || user == undefined)
        userid = "-1";
    else
        userid = JSON.parse(user).userid;

    var para = {
        V_USERID: userid
    };

    ExecuteServiceSyns(config, para);
}
function f_result_loadThongTin_home(config,para,lst)
{
    if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
        return;
    }
    var val = lst.data[0];
    $("#tongkhachhang_home").html(val.tongkhachhang);
    $("#tonghopdong_home").html(val.tonghopdong);
    $("#hoadonbatthuong_home").html(val.hoadonbatthuong);
    $("#hoadonchuaky_home").html(val.chuakyhoadon);
}