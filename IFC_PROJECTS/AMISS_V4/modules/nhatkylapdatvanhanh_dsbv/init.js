var deleteId = 0;
var countpage = 20;
$(document).ready(function () {
    loadContent();
    $("#cb_dschude").change(function () {
        getDanhSachBaiViet(1);
    });
    $("#cb_dschude").trigger("change");
});
function getDanhSachBaiViet(page) {
    try {
      
        var p = getAllIdMod();
        var vUserId = JSON.parse(localStorage.getItem("userinfo"));
     
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHATKYLAPDATVANHANH.DANHSACHNHATKYLAPDAT", callback: "result_dsnhatkylapdat1" };
        var para = {
            v_Hienthi: p.cb_dschude,
            v_UserId: vUserId.userid,
            v_pagenum: page,
            v_numrecs: countpage
        };
      
      var lst= ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_dsnhatkylapdat1(config, para, lst) {
    try {
        var data = lst.data;
        var tr = "";
        $("#dsbv_details > tbody").empty();
        $.each(data, function (key, val) {
            tr += '<tr>' +
                        '<td>' + val.stt + '</td>' +
                        '<td id="' + val.code + '"class="td_donvi">' + val.title + '</td>' +
                        '<td style="width:120px">' + val.usercode + '</td>' +
                        '<td class="center" style="width:120px">' + val.time + '</td>' +
                        '<td class="center" style="width:120px">' + setnullnumber(val.countcomment) + '</td>' +
                        '<td style="width:120px">' + setnull(val.lastcommenttext) + '</td>' +
                        '<td class="center"><a  href="#"  onclick="fndetail_nkldvh(' + val.code + ')" ><span class="glyphicon glyphicon-eye-open"></span></a></td>' +
                         "<td style='width:130px'> <form class='form-inline' role='form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal'  onclick='fnedit("+val.code+")' >Sửa</a></div>&nbsp;<div class='form-group'><a class='btn btn-danger btn-action'  onclick='fndelete(" + val.code + ")'><i class='fa fa-trash-o'></i>Xóa</a></div></form></td> </tr>";
        });
        $("#dsbv_details > tbody").append(tr);
        LoadPhanTrang("pageLst_dsv", "pageCurent_dsbv", data, function () {
            getDanhSachBaiViet($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function fndetail_nkldvh(code) {
    $("#detail_nkldvh").modal("show");
    $("#txt_ndcomment_nkldvh").val("");
    $("#hdcommentArticle_Id").val("");
    $("input[type=file]").val("");
    getDataDetailCommentArticleById(code);
}
function fnedit(code) {
    $("#sua_nkldvh").modal("show");
    getDataArticleById(code);
}

function fndelete(code) {
    f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Xác nhận", function () {
        fndeleteok(code);
       
    });
}
function fndeleteok(deleteId) {
    try {
        var objuser =JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHATKYLAPDATVANHANH.DELETENHATKYLAPDATVANHANH", callback: "result_deletenhatkylapdat" };
        var para = {
            v_ARTICLEID: deleteId,
            v_UserId: objuser.userid
        };
        var lst = ExecuteServiceSyns(config, para);
       
    } catch (e) {
        console.log(e);
    }
}
function result_deletenhatkylapdat(config, para, lst) {
    try{
        $("#confimYesNo").modal("hide");

        var data = lst.data;
        var row = data[0].count;

        if (row.indexOf("OK") > -1) {

            showToast("Xóa thành công", "success");
            getDanhSachBaiViet($("#pagenumber").val());

        }
        else if (row.indexOf("Error") > -1) {
            showToast("Không xóa được", "error");
        }
    } catch (e) {
        console.log(e);
    }
}