var countpage = 10;
$(document).ready(function () {
   
    showhideTree();
    try {

        initformelement();
        loadContent();
        selectlang();
        setValToTxt("txttungay_bchdnd", gettimenow());
        setValToTxt("txtdengay_bchdnd", gettimenow());
        getBaoCaoHDNguoiDung(1);
        $("#btnSearch_bchdnd").on("click", function () {
            getBaoCaoHDNguoiDung(1);
        });
    } catch (e) {
        //console.log(e.message);
    }
});
function getBaoCaoHDNguoiDung(page) {
    try {
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_BAOCAO_HDNGUOIDUNG.GET_LOGS", callback: "f_resultbaocaohoatdongnguoidung" }
        var para = {
            v_Code: objuser.code,
            v_Dfrom: $("#txttungay_bchdnd").val(),
            v_Dto: $("#txtdengay_bchdnd").val(),
            v_Keywords:$("#txtnguoidung_bchdnd").val(),
            v_CategoryIndex: $("#cboLogType_bchdnd").val(),
            v_pagenum: page,
            v_numrecs: countpage
        }
        //console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
  
    }
}
function f_resultbaocaohoatdongnguoidung(config, para, lst) {
    var i = 1;
    var data = lst.data;
    if (data.length == 0) {
        $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
        $("#tbl_bcshnd tbody").empty();
        $("#pageCurent_bchdnd").html('');
        $("#pageLst_bchdnd").html('');
        selectlang();
        stopLoad();
        return;
    }
    var tr = "";
    $(".sobanghi").html("");
    $.each(data, function (key, val) {
        try {
            tr += '<tr>' +
                  '<td class="a_c">' + val.rnum + '</td>' +
                  '<td class="cc">' + setnull(val.usercode) + '</td>' +
                  '<td>' + setnull(val.procdescription) + '</td>' +
                  '<td>' + setnull(val.note) + '</td>' +
                  '<td class=" a_c">' + setnull(val.inserteddate) + '</td>'
            tr += "</tr>";
         
        } catch (ex) { //console.log(ex); }
    });
    $("#tbl_bcshnd tbody").empty();
    $("#tbl_bcshnd tbody").append(tr);
    LoadPhanTrang("pageLst_bchdnd", "pageCurent_bchdnd", data, function () {
        getBaoCaoHDNguoiDung($("#pagenumber").val());
    });
}
function xuatexcel_bchdnd() {
    try {
        var p = getAllIdMod();
        var date = gettimenow().replace("/", "_").replace("/", "_");
        var namef_l = 'baocaohoatdongnguoidung_'+date;
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_BAOCAOHOATDONGNGUOIDUNG.GET_LOGS", namefile: namef_l }
        var para = {
             v_Code: objuser.code,
            v_Dfrom: $("#txttungay_bchdnd").val(),
            v_Dto: $("#txtdengay_bchdnd").val(),
            v_Keywords:$("#txtnguoidung_bchdnd").val(),
            v_CategoryIndex: $("#cboLogType_bchdnd").val(),
            v_pagenum: 1,
            v_numrecs: 1000000000
        }
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "Text" },
            { field: "usercode", name: "Người dùng", type: "Text" },
            { field: "procdescription", name: "Mô tả", type: "Text" },
            { field: "note", name: "Ghi chú", type: "Text" },
            { field: "inserteddate", name: "Thời gian thực hiện", type: "Text" },
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}
//function autoloadnguoidung_bchdnd() {
//    try {
//           var objuser = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { connstr: "ConnectOracle233", namesql: "ADMISS_BAOCAO_HDNGUOIDUNG.LSTNGUOIDUNG", callback: "result_autoloadnguoidung_bchdnd" };
//        var para = { v_Code: objuser.code};
//        ExecuteServiceSyns(config, para);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function result_autoloadnguoidung_bchdnd(config, para, lst) {
//    try {
//        var data = lst.data;

//        if (data == [] || data == null || data == undefined || data.length == 0) return;
//        var nameArr = [];
//        nameArr.length = 0;

//        $.each(data, function (key, val) {
//            nameArr.push({
//                label: val.usercode 
//                , value: val.usercode
//                , id: val.userid,
//            });
//        });
//        //console.log("user");
//        //console.log(nameArr);
//        $("#txtnguoidung_bchdnd").autocomplete({
//            minLength: 1,
//            delay: 200,
//            source: nameArr
//        });

//    } catch (e) {
//        console.log(e);
//    }
//}