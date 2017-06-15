$(document).ready(function () {
    var h = $(window).height();
    var w = $(window).width();
    $(".right-bottom").css("height", h / 2.3 + 15);
    $("table.table-bong").css("height", h /2.3);
    $("table.table-bong tbody").css("height", h /2.3 - 40);
    $("table.table-bong tbody").css("max-height", h / 2.3 - 60);
    
    //console.log(JSON.parse(localStorage.getItem("chitiettu")));
    //$("table#league_tbl").css("font-size", w / 28);
    var id = JSON.parse(localStorage.getItem("chitiettu")).id;
    f_loadTongQuanTu(id)

    $("#btnSuaTu_tqtctt").click(function () {
        var id = JSON.parse(localStorage.getItem("chitiettu")).id;
        thongtincongto_cta(id);
    });

});

function f_loadTongQuanTu(id)
{
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_THONGTINTU.TONGQUANTU",
            callback: "f_result_loadTongQuanTu"
        }
        var para = {
            V_ID: id
        }
         ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}
function f_result_loadTongQuanTu(config,para,lst)
{
    try
        {
        
        if (lst == null && lst == undefined && lst == "" && lst == "[]" && lst.data.length == 0)
            return;

        var val = lst.data[0];
      
            $(".tennhom_tqtctt").html(val.tendonvi);
            $(".tentu_tqtctt").html(val.tenkhachhang);
            $(".quanly_tqtctt").html(val.nameusermanage);
            $(".diachi_tqtctt").html(val.diachikhachhang);
            $(".imei_tqtctt").html(val.imei);
            $(".socongto_tqtctt").html(val.socongto);
            $(".sosim_tqtctt").html(val.phonegprs);
            $(".vido_tqtctt").html(val.vido);
            $(".kinhdo_tqtctt").html(val.kinhdo);
            $(".ghichu_tqtctt").html(val.ghichu);
            $(".tongsobong_tqtctt").html("Tổng số bóng: " + val.tongbong);
            $(".sobongtot").html("Số bóng tốt: " + val.bongtot);
            $(".sobonghong_tqtctt").html("Số bóng hỏng: " + val.bonghong);
            $(".sobongmatketnoi_tqtctt").html("Số bóng chưa kết nối: " + val.bongmatketnoi);
            $(".sobonchuado_tqtctt").html("Số bóng chưa xác định:  " + val.bonga);
            $(".chedo_tqtctt").html("Chế độ: " + setnull(val.chedo));
            if (val.trangthai3pha == null || val.trangthai3pha == undefined) {
                $(".chedo_tqtctta").html(setnull(val.trangthai3pha));
                return;
            }
            var trangthaitu = "";
            trangthaitu += '<div id="phaA" class="' + (val.trangthai3pha == null || val.trangthai3pha.charAt(0) == "0" ? "phaOff" : "phaOn") + '" />';
            trangthaitu += '<div id="phaB" class="' + (val.trangthai3pha == null || val.trangthai3pha.charAt(1) == "0" ? "phaOff" : "phaOn") + '" />';
            trangthaitu += '<div id="phaC" class="' + (val.trangthai3pha == null || val.trangthai3pha.charAt(2) == "0" ? "phaOff" : "phaOn") + '" />';
            $(".chedo_tqtctta").html(setnull(trangthaitu));

    } catch (e) { console.log(e);}
}