
$(document).ready(function () {
    try{
        initformelement();
        loadConetent();
        //setValToTxt("txt_datefrom_cbif", gettimenow());
        //setValToTxt("txt_dateto_cbif", gettimenow());
      
        //$("#btnThucHien_cbif").click(function () {
        //    messInfo("messinfo_cbif", "", 'error');
        //    $("#grvView_cbif").empty();
        //    $("#grvView_chitiet").empty();
        //    f_loadDuLieu_cbif();
        //});
        f_loadDuLieu_cbif();
        loaddonvi();
        $("#cbdonvi_tat").change(function () {
            f_loadDuLieu_cbif();
        });

    } catch (e) {
        console.log(e);
    }
});
function loaddonvi() {
    try {
        var data = api_arrServer;
        dataToCob("cbdonvi_tat", data, "code", "name", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}


function f_loadDuLieu_cbif() {
    try
    {
        $("#grvView_cbif").empty();
        var p= getAllIdMod();
        var gia = p.cbdonvi_tat;
        if (gia == '-1') {
            $.each(api_arrServer, function (key, val) {
                var config = { namesql: "PKG_CB_EMAIL_SMS.CANHBAO_TONGQUAN", callback: "f_result_loadDuLieu_cbif", connstr: val.code };
                var para = {};
                ExecuteServiceSyns(config, para);
            });
        } else {
            var config = { namesql: "PKG_CB_EMAIL_SMS.CANHBAO_TONGQUAN", callback: "f_result_loadDuLieu_cbif", connstr: gia };
            var para = {};
            ExecuteServiceSyns(config, para);
        }

     
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadDuLieu_cbif(config, para, lst) {
    try{
        var data = lst.data
      
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_cbif", "Không có dữ liệu hiển thị", 'error');
            $("#grvView_cbif").empty();
           
            return;
        }
        messInfo("messinfo_cbif", "", 'error');
       // $("#grvView_cbif").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr class='chitiettu_home_1tu' data-toggle='modal' href='#chitiet_canhbao' data-tuid='" + val.loaicanhbao + "' data-donvi='" + config.connstr + "'><td>"
                + (key + 1) + "</td><td>"
                + val.donvi + "</td><td>"
                + val.chude + "</td><td>"
                + val.noidung + "</td><td class='" + val.trangthailoi1 + "'>"
                + val.trangthailoi + "</td><td>"
                + val.thoidiem + "</td><td>"
                + val.trangthaigui + "</td></tr>";

            $("#grvView_cbif").append(row);

        });
        $(".chitiettu_home_1tu").click(function () {
            var ad = $(this).data("tuid");
            var donvi = $(this).data("donvi");
            loadchitietcanhbao(ad, donvi);
        });

    } catch (e) {
        console.log(e);
    }
}