var dataca;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        setValToTxt("datefrom_tc", gettimenow());
        loadthoigian();
        $("#btn_tc").click(function () {
            var check = validate();
            if (check != "") {
                showToast(check, 'error');
                return;
            }
            capnhattaoca();
        });

        loaddanhsach();

   

    } catch (e) {
        console.log(e);
    }

});
function loadthoigian() {
    try{
        var config = { namesql: "CAR_LSTBOX.LST_GIO", callback: "f_result_loadthoigian", connstr: "Oracle_HDDT" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthoigian(config, para, lst) {
    try{
        var data = lst.data
        if (data == null || data == '[]' || data == undefined || data.length == 0) { return; }
        dataToCob("cbthoigiankt_tc", data, "time", "time");
        dataToCob("cbthoigianbd_tc", data, "time", "time");

    } catch (e) {
        console.log(e);
    }
}
function capnhattaoca() {
    try{
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var p = getAllIdMod();
        var config = { namesql: "CAR_PHANCA.TAOCA", callback: "f_result_capnhattaoca", connstr: "Oracle_HDDT" };
        var para = {
            v_TENCA:p.cbca_catruc,
            v_TBATDAU:p.cbthoigianbd_tc,
            v_KETTHUC:p.cbthoigiankt_tc,
            v_USERID: userinfo.userid,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhattaoca(config,para,lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf('thành công') > 0) {
            showToast(row, 'success');
            setTimeout(function () {
                $("#cbca_catruc").val('');
                loaddanhsach();
            }, 300);
        } else {
            showToast(row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}

function validate() {
    try{
        var p = getAllIdMod();
        var thoigianbd = p.cbthoigianbd_tc;
        var thoigiankt = p.cbthoigiankt_tc;
        var datasetbd = thoigianbd.replace(/\:/g, "");
        var datasetkt = thoigiankt.replace(/\:/g, "");
        if (p.cbca_catruc == "") return "Tên Ca không được để trống";
        if (datasetbd == datasetkt) return "Thời gian bắt đầu không được bằng thời gian kết thúc";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function loaddanhsach() {
    try{
        var config = { namesql: "CAR_PHANCA.DANHSACHCA", callback: "f_result_loaddanhsach", connstr: "Oracle_HDDT" };
        var para =[];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach(config, para, lst) {
    try{
        var data = lst.data;
        dataca = data;
        if (data == undefined || data == [] || data.length == 0) {
            messInfo("messinfo_taoca", "Không có dữ liệu hiển thị", "error");
            $("#table_khaibao_taoca").empty();
            return;
        }
        $("#messinfo_taoca").hide();
        $("#table_khaibao_taoca").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tenca + "</td><td>"
                + val.thoigian + "</td></tr>";
                $("#table_khaibao_taoca").append(row);
        });

    } catch (e) {
        console.log(e);
    }
}
