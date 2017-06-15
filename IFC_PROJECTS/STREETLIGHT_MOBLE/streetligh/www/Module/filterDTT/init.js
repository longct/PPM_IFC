var nameArr = [];
$(document).ready(function () {
    try {
  
        f_loadname();
        var wrapper_w = $(".wrapper").width();
        var wrapper_h = $(".wrapper").height();
        $(".tu_panel").css("width", wrapper_w / 5.2);
        $(".tu_panel").css("height", wrapper_w / 4.5);
        $(".panel").css("max-height", wrapper_h - 50);
        $(".filter").css("height", $(window).height());
        $(".filter").css("max-height", $(window).height());
        loadchecklog_master();
        $("#filter").click(function () {
            $(".filter").slideDown();
        });
        $(".close").click(function () {
            $(".filter").hide();
        });
        f_loadNhom_filter();

        $("#ChonNhom_filter").change(function () {
            f_loadData_filter();
        });
        $('input[type=radio][name=rdo_trangthai_filter]').change(function () {
            f_loadData_filter();
        });
        $('input[type=radio][name=rdo_canhbao_filter]').change(function () {
            f_loadData_filter();
        });

        $("#btn_search_filter").click(function () {
            f_loadData_filter();
        })
    } catch (e) {
        console.log(e);
    }
});

function f_loadNhom_filter()
{
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_NHOM.GETDONVI",
            callback: "f_result_loadNhom_filter"
        }
        var para = {
            //V_ID_NHOM: "-1"
        }
        var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_loadNhom_filter(config,para,lst)
{
    try{
        var d = lst.data;
        var donvi = "<option value = '-1'>-- TẤT CẢ --</option>";
        for (var i = 0; i < d.length; i++) {
            donvi += "<option value='" + d[i].madonvi + "'>";
            if (d[i].madonvi.length == 4) {
                donvi += "--- " + d[i].tendonvi + "</option>";
            }
            else if (d[i].madonvi.length == 6) {
                donvi += "------- " + d[i].tendonvi + "</option>";
            }
            else if (d[i].madonvi.length == 8) {
                donvi += "--------- " + d[i].tendonvi + "</option>";
            }
            //d[i].tendonvi + "</option>";
        }
        //$("select#cb_chonnhom").empty();
        $("select#ChonNhom_filter").append(donvi);
    } catch (e) {
        console.log(e);
    }
}

function show() {
    $(".filter").show();
}
function hide() {
    $(".filter").hide();
}

function f_loadData_filter()
{
    try
    {
        var ketnoi = $("input[type='radio'][name='rdo_trangthai_filter']:checked");
        var canhbao = $("input[type='radio'][name='rdo_canhbao_filter']:checked");
        var info = { nhom: $("#ChonNhom_filter option:selected").val(), trangthai: $(ketnoi).attr("value"), canhbao: $(canhbao).attr("value"), timkiem: $("#search_txt_filter").val() }
        
        localStorage.setItem("infofilter",JSON.stringify(info));
        try {
            f_loadChangeFilter()
        }catch(e){}
    } catch (e) { console.log(e);}
}
function f_loadname() {
    try {
        var filter = localStorage.getItem("infofilter");
        var filterJson = null;
        if (filter != null || filter != undefined)
            filterJson = JSON.parse(filter);
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_HOME.LOADMULTYTU",
            callback: "f_result_loadname"
        }
        var para = {
            V_ID_NHOM: filter == null || filter == undefined ? "-1" : filterJson.nhom,
            V_TIMKIEM: filter == null || filter == undefined ? "" : filterJson.timkiem,
            V_TRANGTHAI: filter == null || filter == undefined ? "-1" : filterJson.trangthai,
            V_CANHBAO: filter == null || filter == undefined ? "-1" : filterJson.canhbao
        }
    
        var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }

}
function f_result_loadname(config, para, lst) {
    try {
        var data = lst.data;
        var i = 0;
        nameArr.length = 0;
        $.each(data, function (key, val) {
            nameArr.push(val.tenkhachhang);
            i++;
        });
        var availableTutorials = nameArr;
        $("#search_txt_filter").autocomplete({
            minLength: 1,
            delay: 200,
            source: availableTutorials
        });
    } catch (e) { console.log(e); }
}
