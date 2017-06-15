var countpage = 20;
$(document).ready(function () {
   
    showhideTree();
    try {

        initformelement();
        loadContent();
        selectlang();
        setValToTxt("txttungay_cbmd", gettimenow());
        setValToTxt("txtdengay_cbmd", gettimenow());
        var objFilter = localStorage.getItem("tree_node");
        if (objFilter != null) {
            objFilter = JSON.parse(localStorage.getItem("tree_node"));
            var istype = objFilter[0].type;
            var socongto = objFilter[0].socongto;
            var tendiemdo = objFilter[0].tendiemdo;
            if (istype != "0" && istype != "4" && socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + " - <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            if (parseInt(objFilter[0].socongto) > 0) {
                $(".lbmadiemdo").hide();
            } else {
                $(".lbmadiemdo").show();
            }
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
            $('#tbl_cbmd tbody').empty();
        }

     
        getCanhBaoMatDien(objFilter, 1);
        $("#btnSearch_cbmd").on("click", function () {
            getCanhBaoMatDien(objFilter, 1);
        });
    } catch (e) {
        //console.log(e.message);
    }
});
function getCanhBaoMatDien(objFilter, page) {
    try {
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "AMISS_CANHBAODIENMAT.THONGBAOMATDIEN", callback: "f_resultcanhbaomatdien" }
        var para = {
            v_Type: 1,
            v_Value: parseInt(objFilter[0].socongto) == 0 ? objFilter[0].code : objFilter[0].meterid,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: "",
            v_TrangThai: "0",
            v_ChuKiChot: "0",
            v_UserId: objuser.userid,
            v_Permission: "1",
            v_TypeValue: parseInt(objFilter[0].socongto) ==0 ?  2: 1,
            v_HeThong:"1",
            v_Madiemdo: $("#txmadiemdo_cbmd").val(),
            v_dFrom: $("#txttungay_cbmd").val(),
            v_dTo: $("#txtdengay_cbmd").val(),
            v_pagenum: page,
            v_numrecs: countpage
        }
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
  
    }
}
function f_resultcanhbaomatdien(config, para, lst) {
    var objFilter = JSON.parse(localStorage.getItem("tree_node"));
    var i = 1;
    var data = lst.data;
    if (data.length == 0) {
        $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
        $("#tbl_cbmd tbody").empty();
        $("#pageCurent_cbmd").html('');
        $("#pageLst_cbmd").html('');
        selectlang();
        stopLoad();
        return;
    }
    $(".sobanghi").html("");
    var tr = "";
    $.each(data, function (key, val) {
        try {
            tr += '<tr>' +
                  '<td class="a_c">' + val.rnum + '</td>' +
                  '<td class="cc">' + setnull(val.wcontent) + '</td>' +
                  '<td class=" a_c">' + setnull(val.time_warning) + '</td>' +
                  '<td class=" a_c">' + setnull(val.time_fixed) + '</td>' +
                  '<td class=" a_c">' + setnull(val.timehet) + '</td>' +
                  '<td class=" a_c">' + setnull(val.khacphuc) + '</td>'
            tr += "</tr>";
         
        } catch (ex) { //console.log(ex); }
    });
    $("#tbl_cbmd tbody").empty();
    $("#tbl_cbmd tbody").append(tr);
    LoadPhanTrang("pageLst_cbmd", "pageCurent_cbmd", data, function () {
        getCanhBaoMatDien(objFilter, $("#pagenumber").val());
    });
}
function xuatexcel_cbmd() {
    try {
        var p = getAllIdMod();
        var date = gettimenow().replace("/", "_").replace("/", "_");
        var namef_l = 'CANHBAOMATDIEN_'+date;
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "AMISS_CANHBAODIENMAT.THONGBAOMATDIEN", namefile: namef_l }
        var para = {
            v_Type: 1,
            v_Value: parseInt(objFilter[0].socongto) == 0 ? objFilter[0].code : objFilter[0].meterid,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: "",
            v_TrangThai: "0",
            v_ChuKiChot: "0",
            v_UserId: objuser.userid,
            v_Permission: "1",
            v_TypeValue: parseInt(objFilter[0].socongto) == 0 ? 2 : 1,
            v_HeThong: "1",
            v_Madiemdo: $("#txmadiemdo_cbmd").val(),
            v_dFrom: $("#txttungay_cbmd").val(),
            v_dTo: $("#txtdengay_cbmd").val(),
            v_pagenum: 1,
            v_numrecs: 1000000000
        }
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "wcontent", name: "Nội dung", type: "Text" },
            { field: "time_warning", name: "Thời điểm mất điện", type: "Text" },
            { field: "time_fixed", name: "Thời điểm có điện", type: "Text" },
            { field: "timehet", name: "Tổng thời gian mất điện", type: "Text" },
            { field: "khacphuc", name: "Trạng thái khắc phục", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}
