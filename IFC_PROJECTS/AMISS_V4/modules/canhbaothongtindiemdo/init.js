var countpage = 20;
$(document).ready(function () {
   
    showhideTree();
    try {
        initformelement();
        loadContent();
        selectlang();

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
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
            $('#tbl_ddcdkb tbody').empty();
        }


     
        getCanhBaoThongTinDiemDo(1);
    } catch (e) {
        //console.log(e.message);
    }
});
function getCanhBaoThongTinDiemDo(page) {
    try {
        objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "AMISS_CANHBAOTHONGTINDIEMDO.GETDiemDoCanKhaiBaoNgay", callback: "f_resultCANHBAOTHONGTINDIEMDO" }
        var para = {
            v_Type: 1,
            v_Value: objFilter[0].code,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: "",
            v_TrangThai: "0",
            v_ChuKiChot: "0",
            v_UserId: objuser.userid,
            v_Permission: "1",
            v_pagenum: page,
            v_numrecs: countpage
        }
        ExecuteServiceSyns(config, para);
        //console.log(para);
    } catch (e) {
        console.log(e);
  
    }
}
function f_resultCANHBAOTHONGTINDIEMDO(config, para, lst) {
    var i = 1;
    var data = lst.data;
    $("#tbl_ddcdkb tbody").empty();
    if (data.length == 0) {
        $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
        $("#tbl_ddcdkb tbody").empty();
        $("#pageCurent_cbttdd").html('');
        $("#pageLst_cbttdd").html('');
        selectlang();
        stopLoad();
        return;
    }
    $(".sobanghi").html("Tổng số " + data.length + "<span tkey='banghi'></span>");
    var tr = "";
    $.each(data, function (key, val) {
        try {
            tr += '<tr>' +
                  '<td class="a_c">' + val.rnum + '</td>' +
                  '<td class="cc">' + setnull(val.madiemdo) + '</td>' +
                  '<td class="a_c">' + setnull(val.imei) + '</td>' +
                  '<td class="a_c">' + setnull(val.socongto) + '</td>' +
                  '<td>' + setnull(val.tendiemdo) + '</td>' +
                  '<td>' + setnull(val.loidinhdang) + '</td>'
            tr += "</tr>";
         
        } catch (ex) { //console.log(ex); }
    });
   
    $("#tbl_ddcdkb tbody").append(tr);
    LoadPhanTrang("pageLst_cbttdd", "pageCurent_cbttdd", data, function () {
        getCanhBaoThongTinDiemDo($("#pagenumber").val());
    });
    selectlang();
}
function xuatexcel_cbttdd() {
    try {
        var p = getAllIdMod();
        var date = gettimenow().replace("/", "_").replace("/", "_");
        var namef_l = 'CANHBAOTHONGTINDIEMDO_'+date;
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "AMISS_CANHBAOTHONGTINDIEMDO.GETDiemDoCanKhaiBaoNgay",namefile: namef_l}
        var para = {
            v_Type: 1,
            v_Value: objFilter[0].code,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: "",
            v_TrangThai: "0",
            v_ChuKiChot: "0",
            v_UserId: objuser.userid,
            v_Permission: "1",
            v_pagenum: 1,
            v_numrecs: 100000
        }
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
            { field: "imei", name: "imei", type: "Text" },
            { field: "socongto", name: "Số công tơ", type: "Text" },
            { field: "tendiemdo", name: "Tên khách hàng", type: "Text" },
            { field: "loidinhdang", name: "Ghi chú", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}
