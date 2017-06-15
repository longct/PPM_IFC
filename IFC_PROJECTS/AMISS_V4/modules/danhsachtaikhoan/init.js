$(document).ready(function () {
    try {
        showhideTree();
        loaddanhdanhtaikhoan();
    } catch (e) {
        console.log(e);
    }
});
function loaddanhdanhtaikhoan() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "ConnectOracle233", namesql: "PKG_DANHSACHTAIKHOAN.DANHSACHTAIKHOAN", callback: "result_danhsachtaikhoan" };
        var para = {
            v_CODE: userinfo.code
        };
        ExecuteServiceSyns(config, para);
        
    } catch (e) {
        console.log(e);

    }
}

function result_danhsachtaikhoan(para, config, lst) {
    try{
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        $('#dstaikhoan').dynatable({
            dataset: {
                records: data
            }
        });

    } catch (e) {
        console.log(e);
    }
}

