$(document).ready(function () {
    $("#btn_EditAticle").on("click", function () {
        var check = validate_editnkldvh();
        if (check != "") {
            showToast(check, "error");
            return;
        }
       SaveEdit_nkldvh();
    });
    $("#txt_editfile").on("change", function () {
        checkfile_editnkldvh($("#txt_editfile"));
    });

    //save comment
 
    $("#txt_editcommentfile").on("change", function () {
        checkfile_editnkldvh($("#txt_editcommentfile"));
    });
    $("#btn_CommentAticle").on("click", function () {
        if ($("#txt_ndcomment_nkldvh").val() == "") {
            showToast("Vui lòng nhập nội dung trả lời", "error");
        } else {
            SaveComment_nkldvh();
        }
    });
});


/*Begin edit nhat ky lap dat van hanh */
function getDataArticleById(articleId) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHATKYLAPDATVANHANH.GETDETAILARTICLEBYID", callback: "result_getdetailarticleandcomment" };
        var para = {
            v_ARTICLEID: articleId
        };
        var lst = ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_getdetailarticleandcomment(config, para, lst) {
    var data = lst.data;
    setValToTxt("cb_editchude", data[0].typevalue);
    setValToTxt("txt_edittieude", data[0].title);
    setValToTxt("txt_editnoidung", data[0].body);
    setValToTxt("hdarticleId", data[0].articleid);
    var link = urli + "/home/DownloadFileMau/" + data[0].fileattachment;
    $("#hrfdinhkem").attr("href", link);
    $("#hrfdinhkem").attr("data-url", data[0].fileattachment);
}
function f_uploadFile_editnkldvh() {
    var fdata = new FormData();
    var file = $("#txt_editfile").get(0).files;
    fdata.append("file", file[0]);

    var config = { callback: "f_result_f_uploadFileMauHd_khau", namefile: file.name };
    api_uploadFileMau(config, fdata);
}




function SaveEdit_nkldvh() {
    try {
        var p = getAllIdMod();
        var v_eFILEATTACHMENT = $("#txt_editfile").get(0).files;
        if (v_eFILEATTACHMENT.length == 0) {
            v_eFILEATTACHMENTs = $("#hrfdinhkem").attr("data-url");
        } else {
            v_eFILEATTACHMENTs = $('#txt_editfile')[0].files[0].name;
            f_uploadFile_editnkldvh();
        }

        var v_Type ="UPDATE";
        var objuser = JSON.parse(localStorage.getItem("userinfo"));

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHATKYLAPDATVANHANH.INSERTUPDATEANARTICLE", callback: "result_updatenhatkylapdat" };
        var para = {
            v_Type: v_Type,
            v_ARTICLEID: $("#hdarticleId").val(),
            v_USERID: objuser.userid,
            v_TITLE: p.txt_edittieude,
            v_BODY: p.txt_editnoidung,
            v_FILEATTACHMENT: v_eFILEATTACHMENTs,
            v_Hienthi: p.cb_editchude
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_updatenhatkylapdat(config, para, lst) {
    var data = lst.data;
    var row = data[0].count;

    if (row.indexOf("OK") > -1) {

        showToast("Sửa thành công", "success");
        $("#sua_nkldvh").modal("hide");
        getDanhSachBaiViet($("#pagenumber").val());
    }
    else if (row.indexOf("Error") > -1) {
        showToast("Không sửa được", "error");
    }
}
function validate_editnkldvh() {
    try {
        var p = getAllIdMod();
        if (p.cb_editchude == "0") return "Vui lòng chọn loại chủ đề";
        if (p.txt_edittieude == "") return "Vui lòng nhập tiêu đề";
        return "";
    } catch (e) {
        console.log(e);
    }
}
/*end edit nhat ky lap dat van hanh*/
/*begin chi tiet lap dat van hanh*/
function getDataDetailCommentArticleById(articleId) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHATKYLAPDATVANHANH.GETDETAILARTICLEBYID", callback: "result_getdetailarticle_nkldvh" };
        var para = {
            v_ARTICLEID: articleId
        };
        var lst = ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_getdetailarticle_nkldvh(config, para, lst) {
    var data = lst.data;
    $("#hdcommentArticle_Id").val(data[0].articleid);
    $("#lblchude_nkldvh").html(data[0].typetext);
    $("#lblnguoitao_nkldvh").html(data[0].usercode);
    $("#lblngaytao_nkldvh").html(data[0].time);
    $("#lbltieude_nkldvh").html(data[0].title);
    $("#noidung_nkldvh").html(data[0].body);
    var link = urli + "/home/DownloadFileMau/" + data[0].fileattachment;
    $("#hrfdetaildinhkem_nkldvh").attr("href", link);
   
}
function SaveComment_nkldvh() {
    var p = getAllIdMod();
    var v_cFILEATTACHMENT = $("#txt_editcommentfile").get(0).files;
    if (v_cFILEATTACHMENT.length == 0) {
        v_cFILEATTACHMENTs ="";
    } else {
        v_cFILEATTACHMENTs = $('#txt_editcommentfile')[0].files[0].name;
        f_uploadFile_editnkldvh();
    }

    var v_Type = "INSERT";
    var v_USERID = JSON.parse(localStorage.getItem("userinfo"));

    var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHATKYLAPDATVANHANH.INSERTUPDATEDELETECOMMENT", callback: "result_insertcommentnhatkylapdat" };
    var para = {
        v_Type: v_Type,
        v_COMMENTID:0,
        v_ARTICLEID: $("#hdcommentArticle_Id").val(),
        v_USERID: v_USERID.userid,
        v_BODY: p.txt_ndcomment_nkldvh,
        v_FILEATTACHMENT: v_cFILEATTACHMENTs,
    };
    ExecuteServiceSyns(config, para);
}
function result_insertcommentnhatkylapdat(config, para, lst) {
    var data = lst.data;
    if (data.length > 0) {
        $("#detail_nkldvh").modal("hide");
        showToast("Trả lời thành công", "success");
    } else {
        showToast("Trả lời không được ", "success");
    }
   
}
/*end chi tiet lap dat van hanh*/
function checkfile_editnkldvh(inputfile) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        if (inputfile.get(0).files.length > 0) {
            var fsize = inputfile[0].files[0].size;
            var fname = inputfile[0].files[0].name;
            var fileExt = fname.split('.').pop();
            var array = ['png', 'jpg', 'gif', 'jpeg', 'pjpeg', 'docx', 'doc', 'xls', 'pdf', 'pptx']

            //kiểm tra file được phép tải lên
            if (array.indexOf(fileExt) == -1) {
                showToast("Unsupported File!", "success");
                $('input[type=file]').val('');
                return;
            }
            // kiểm tra dung lương file
            if (fsize > 2097152) //thuc hien dieu gi do neu dung luong file vuot qua 2MB
            {
                showToast("Tệp đính kèm < " + fsize, "success");
                $('input[type=file]').val('');
                return;
            }
        }


    } else {
        showToast("Please upgrade your browser, because your current browser lacks some new features we need!", "success");
    }
}