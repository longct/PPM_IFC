$(document).ready(function () {
    showhideTree();
    selectlang();
    callAjax('longct', '123456');
});

function callAjax(u, p) {
    var config = {
        connstr: G_connect,
        namesql: G_LOG,
        callback: "result_dangnhap",
    };
    var para = {
        v_TENDANGNHAP: u,
        v_MATKHAU: p
    };
    ExecuteServiceSyns(config, para);
}

function result_dangnhap(config, para, lst) {
    try {
        var data = lst.data;
        var js = JSON.stringify(data[0]);
        console.log(js);
        $("#line1").html("CODE: " + data[0].code);
        $("#line2").html("TEN: " + data[0].ten);
        $("#line3").html("USERCODE: " + data[0].usercode);
        $("#line4").html("USERID: " + data[0].userid);

        var temp = '<tr>' +
                            '<td class="a_c"><%this.userid%> </td>' +
                            '<td class="a_c"><%this.usercode%> </td>' +
                            '<td class="a_c"><%this.ten%> </td>' +
                            '<td class="a_c"><%this.code%> </td>' +
                          '</tr>';
        genTable("table-wrapper", temp, data);
    } catch (e) {
        console.log(e);
    }
}

