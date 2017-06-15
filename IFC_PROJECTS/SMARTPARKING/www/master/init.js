var countpage = 10;
var setTogglesId = 0;
var booleanToggles = true;
$(document).ready(function () {
    try {
        loadContent();
        getCacheKhachHang();
        thietLapLangDefault();
        stopLoad();
        setToggles();
        $(".mnhienthitatca").change(function () {
            CheckThietLap();
            //setToggles();
        });
    } catch (e) {
        console.log(e);
    }
});

function getCacheKhachHang() {
    localStorage.removeItem("userinfo");
    try {
        var p = getAllIdMod();
        var app_id = deviceInfo != undefined ? deviceInfo.uuid : "";
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_GETKHACHHANG.GETKHACHHANG" };
        var para = {
            v_AppID: app_id
        };
        var lst = ExecuteServiceSyns(config, para);
        if (lst.data != null && lst.data != undefined && lst.data != "") {
            var row = lst.data;
            localStorage.setItem("userinfo", JSON.stringify(row[0]));
        }

    } catch (e) {
        console.log(e);
    }
}
function thietLapLangDefault() {
    var tl = localStorage.getItem("thietlap");
    if (tl == null) {
        var hethong = { lang: "VI", donvi: "KM" }
        localStorage.setItem("thietlap", JSON.stringify(hethong));
    }
}
function getLangMenuText() {
   
    $("#mnhienthitatca").text(apiLstLangmn.lang_menuhienthitatca);
    $("#mntkxq").text(apiLstLangmn.lang_menudiemdoxungquanh);
    $("#mndsq").text(apiLstLangmn.lang_menudanhsachdiemdo);
    $("#mntkc").text(apiLstLangmn.lang_menutimkiemchung);
    $("#mnddtx").text(apiLstLangmn.lang_menudiemdothuongxuyen);
    $("#mndsq").text(apiLstLangmn.lang_menudanhsachdiemdo);
    $("#thietlap_m").text(apiLstLangmn.lang_menuthietlap);
    $("#mntruynhapdangxuat").text(apiLstLangmn.lang_menudanhsachdiemdo);
    $("#mntruynhapdangxuat").text(apiLstLangmn.lang_menutruynhapdangxuat);
    $("#mndangky").text(apiLstLangmn.lang_menudangky);
    $("#mntrogiup").text(apiLstLangmn.lang_menutrogiup);
    $("#mnthongtin").text(apiLstLangmn.lang_menuthongtinungdung);
}
function CheckThietLap() {
    apiLstLangmn = [];
    var url = "master/lang.json";
    f_langInit_mn(url, getLangMenuText);
}
// check  lang page master
var apiLstLangmn = [];
function f_langInit_mn(url, getText) {
    try {
        $.getJSON(url, function (data) {
            var thietlap = JSON.parse(localStorage.getItem("thietlap"));
            var lst = data[thietlap.lang];
            $.each(lst, function (key, val) {
                $("." + key).html(val);
                var info = "{\"" + key + "\":\"" + val + "\"}";
            });
            apiLstLangmn = lst;
        }).done(function () {
            getText();
        });
    } catch (e) { console.log(e); }
}
function setToggles() {
    
    var toggles = localStorage.getItem("settoggle");
    if (toggles != null) {
       
        booleanToggles = toggles == 0 ? true : false;
        setTogglesId = toggles;
        console.log("c: " +booleanToggles);
      
    }
    $('.subhienthitatca.toggle').toggles({ on: booleanToggles });
}