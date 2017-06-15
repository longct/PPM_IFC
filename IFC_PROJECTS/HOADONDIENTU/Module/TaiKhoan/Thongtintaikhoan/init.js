$(document).ready(function () {
    try {
        thongtintai_khmau();

    } catch (e) {
        console.log(e);
    }
});
function thongtintai_khmau() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.LSTTHONGTINTAIKHOAN", callback: "result_thongtintai_khmau" };
        var para = {v_ID: userinfo.userid };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_thongtintai_khmau(config, para, lst) {
    try{
        var data = lst.data;
        $("#txt_nv_tttk").html(data[0].ten);
        $("#txt_sdt_tttk").html(data[0].sodienthoai);
        $("#txt_email_tttk").html(data[0].mail);
        $("#txt_diachi_tttk").html(data[0].diachi);
        $("#txt_thuocdiluc_tttk").html(data[0].cty);
    } catch (e) {
        console.log(e);
    }
}