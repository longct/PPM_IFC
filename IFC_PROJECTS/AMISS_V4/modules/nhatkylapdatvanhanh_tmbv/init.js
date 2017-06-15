$(document).ready(function () {
    loadContent();
    $("#btn_saveAticle").on("click", function () {
        var check = validate_nkldvh();
        if (check != "") {
            showToast(check, "error");
            return;
        }
        editandadd(0);
      
    });
   
    $("#txt_file").on("change", function () {
        checkfile_nkldvh($("#txt_file"));
    });
});

function checkfile_nkldvh(inputfile) {
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
function f_uploadFile_addnkldvh() {
    var fdata = new FormData();
    var file = $("#txt_file").get(0).files;
    fdata.append("file", file[0]);

    var config = { callback: "f_result_f_uploadFileMauHd_khau", namefile: file.name };
    api_uploadFileMau(config, fdata);
}




function editandadd(code) {
    try {
        var p = getAllIdMod();
        var v_FILEATTACHMENT =  $("#txt_file").get(0).files;
        if (v_FILEATTACHMENT.length==0) {
            v_FILEATTACHMENTs ="";
        } else {
            v_FILEATTACHMENTs = $('#txt_file')[0].files[0].name;
            f_uploadFile_addnkldvh();
        }
     
        var v_Type = code != 0 ? "UPDATE" : "INSERT";
        var v_USERID = localStorage.getItem("userinfo");

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHATKYLAPDATVANHANH.INSERTUPDATEANARTICLE", callback: "result_insertupdatenhatkylapdat" };
        var para = {
            v_Type: v_Type,
            v_ARTICLEID: code,
            v_USERID: JSON.parse(v_USERID).userid,
            v_TITLE: p.txt_tieude,
            v_BODY: p.txt_noidung,
            v_FILEATTACHMENT: v_FILEATTACHMENTs,
            v_Hienthi: p.cb_chude
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_insertupdatenhatkylapdat(config, para, lst) {
    console.log(para);
    var data = lst.data;
    var row = data[0].count;

    if (row.indexOf("OK") > -1) {

        showToast("thêm thành công", "success");
        clear_nkldvh();

    }
    else if (row.indexOf("Error") > -1) {
        showToast("không thêm được", "error");
    }
}
function clear_nkldvh() {
    setValToTxt("cb_chude","0");
    setValToTxt("txt_tieude","");
    setValToTxt("txt_noidung", "");
    setValToTxt("txt_file",$('input[type=file]').val(''));
}
function validate_nkldvh() {
    try{
        var p = getAllIdMod();
        if (p.cb_chude == "0") return "Vui lòng chọn loại chủ đề";
        if (p.txt_tieude == "") return "Vui lòng nhập tiêu đề";
        return "";
    } catch (e) {
        console.log(e);
    }
}

