var countpage = 10;
$(document).ready(function () {

    showhideTree();
    try {

        initformelement();
        loadContent();
        selectlang();
        setValToTxt("txttungay_bctthd", gettimenow());
        setValToTxt("txtdengay_cbtthd", gettimenow());
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
            $('#tbl_bctthd tbody').empty();
        }


        getbaocaotrangthaihoatdong(1);
        $("#btnSearch_bctthd").on("click", function () {
            getbaocaotrangthaihoatdong(1);
        });
    } catch (e) {
        //console.log(e.message);
    }
});
function getbaocaotrangthaihoatdong(page) {
    try {
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "AMISS_BAOCAO_TTHOATDONG.BAOCAOTRANGTHAISUKIEN", callback: "f_resultbaocaotrangthaihoatdong" }
        var para = {
            v_type: 1,
            v_value: objFilter[0].meterid,
            v_datefrom: $("#txttungay_bctthd").val(),
            v_dateto: $("#txtdengay_cbtthd").val(),
            v_userid: objuser.userid,
            v_pagenum: page,
            v_numrecs: countpage
        }
        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);

    }
}
function f_resultbaocaotrangthaihoatdong(config, para, lst) {

    var i = 1;
    var data = lst.data;
    //console.log(data);

    if (data.length == 0) {
        $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
        $("#tbl_bctthd tbody").empty();
        $("#pageCurent_bctthd").html('');
        $("#pageLst_bctthd").html('');
        selectlang();
        stopLoad();
        return;
    }
    var tr = "";
    $.each(data, function (key, val) {
        try {
            tr += '<tr>' +
                  '<td class="a_c">' + val.ind + '</td>' +
                  '<td class="a_c">' + setnull(val.madiemdo) + '</td>' +
                  '<td>' + setnull(val.tendiemdo) + '</td>' +
                  '<td class="a_c">' + setnull(val.socongto) + '</td>' +
                  '<td class="a_c">' + setnull(val.trang_thai) + '</td>' +
                  '<td class="a_c">' + setnull(val.issync) + '</td>' +
                  '<td>' + setnull(val.iswarning) + '</td>' +
                  '<td class="a_c">' + setnull(val.status) + '</td>'
            tr += "</tr>";

        } catch (ex) { //console.log(ex); }
    });
    $("#tbl_bctthd tbody").empty();
    $("#tbl_bctthd tbody").append(tr);
    LoadPhanTrang("pageLst_bctthd", "pageCurent_bctthd", data, function () {
        getbaocaotrangthaihoatdong($("#pagenumber").val());
    });
}
function xuatexcel_bctthd() {
    try {
        var p = getAllIdMod();
        var date = gettimenow().replace("/", "_").replace("/", "_");
        var namef_l = 'baocaotrangthaihoatdong_' + date;
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "AMISS_BAOCAO_TTHOATDONG.BAOCAOTRANGTHAISUKIEN", namefile: namef_l }
        var para = {
            v_type: 1,
            v_value: objFilter[0].meterid,
            v_datefrom: $("#txttungay_bctthd").val(),
            v_dateto: $("#txtdengay_cbtthd").val(),
            v_userid: objuser.userid,
            v_pagenum: 1,
            v_numrecs: 1000000000
        }
        var colum = {
            kq: [
                { field: "ind", name: "STT", type: "Text" },
                { field: "madiemdo", name: "Mã điểm đo", type: "Text" },
                { field: "tendiemdo", name: "Tên khách hàng", type: "Text" },
                { field: "socongto", name: "Số công tơ", type: "Text" },
                { field: "trang_thai", name: "Tình trạng on/off", type: "Text" },
                { field: "issync", name: "Trạng thái dữ liệu", type: "Text" },
                { field: "iswarning", name: "Cảnh báo vận hành", type: "Text" },
                { field: "status", name: "Sự kiện công tơ", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}
