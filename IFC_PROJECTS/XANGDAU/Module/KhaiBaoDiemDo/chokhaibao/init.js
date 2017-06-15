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
        var config = { namesql: "PKG_KHAIBAOVOI.LOADVOI", callback: "f_result_listsachtram_khaibao", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_Code: infotree.code,
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
        console.log(data);
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenvoibom) + "</td><td>"
                + setnull(val.imei) + "</td><td>"
                + setnull(val.sothutu) + "</td><td>"
                + setnull(val.tencot) + "</td><td>"
                + setnull(val.ngaytao) + "</td><td>"
                + setnull(val.tenbon) + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#suakh_khaibao' value='" + val.id_mavoi + "' id='btn_suathongtinkh_khaibao" + val.id_mavoi + "'>Sửa</a></div></form></td> </tr>";

            $("#table_ttkhachhang_khaibao").append(row);
            $("#btn_suathongtinkh_khaibao" + val.id_mavoi).click(function () {
                messInfo("messinfo_suakhaibao", "", "ok");
                loadkhachhang_khaibaoid(val.id_mavoi);
            });
        });
        LoadPhanTrang("pageLst_voi", "pageCurent_voi", data, function () {
            loaddanhsachtram_khaibao($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }
}