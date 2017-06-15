var countPage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
       
        loaddanhsachtram_khaibao(1);
    } catch (e) {
        console.log(e);
    }
});

function f_loadChangeTree() {
    loaddanhsachtram_khaibao(1);
}


function loaddanhsachtram_khaibao(page) {
    try{
        var config = { namesql: "THONGTINTRAM.THONGTINDIEMODOTRAM", callback: "f_result_listsachtram_khaibao", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_userid: '',
            v_pagenum:page,
            v_numrecs:countPage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_listsachtram_khaibao(config,para,lst){
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                var p = getAllIdMod();
                messInfo("messinfo_khaibao", "Không có dữ liệu hiển thị ", "error");
                $("#table_ttkhachhang_khaibao").empty();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_khaibao", "", "error");
       datakhachhang_khaibao(data);

    }catch(e){
        console.log(e);
    }
}
function datakhachhang_khaibao(data) {
    try {
        $("#table_ttkhachhang_khaibao").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.imei + "</td><td>"
                + setnull(val.macot) + "</td><td>"
                + val.thoidiemkhaibao + "</td><td>"
                + val.tentram + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#suakh_khaibao' value='" + val.id + "' id='btn_suathongtinkh_khaibao" + val.id + "'>Sửa</a></div></form></td> </tr>";

            $("#table_ttkhachhang_khaibao").append(row);
            $("#btn_suathongtinkh_khaibao" + val.id).click(function () {
                messInfo("messinfo_suakhaibao", "", "ok");
                loadkhachhang_khaibaoid(val.id);
            });
        });

    } catch (e) {
        console.log(e);
    }
}