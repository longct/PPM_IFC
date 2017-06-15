var array_tlncbvh = new Array();
var maXacThuc_tlncbvh = "";
var lstEmail_tlncbvh = "";
$(document).ready(function () {
    $('#cbwaning_type_tlncbvh').on("change", function () {
        GetListWarningByUserId();
    });
    $("#btn_close_tlncbvh").on("click", function () {
        $("#choncanhbao_tlncbvh").modal("hide");
    });

    // thiết lập mail

    $("#btxacthucmail_tlncbvh").on("click", function () {
        try {
            var check = f_checkEmailEmty();
            if (!check) return;
            // send email
            var chuDe = "Xác nhận email";

            for (var i = 0; i <= 9; i++) {
                maXacThuc_tlncbvh += randomNumber(0, 9);
            }
            var noiDung = "Bạn điền mã code " + maXacThuc_tlncbvh + " vào ô (nhập mã xác thực)";
            var toEmail = $('#txtemail_tlncbvh').val().trim();
            var toEmailcc = $("#txtemailcc_tlncbvh").val();
            var tenThayThe = "Xác thực";
            messInfo("messinfo_xtmail", "Vui lòng đợi", 'error');
            sendMail(chuDe, noiDung, toEmail, toEmailcc, tenThayThe);
          
        } catch (e) {
            console.log(e);
        }
    });
    $("#btn_closextmail_tlncbvh").on("click", function () {
        $("#thietlapemail_tlncbvh").modal("hide");
    });
    $("#btn_xacthuc_tlncbvh").on("click", function () {
        try {
            
            if ($('#txtemail_tlncbvh').val().trim() == "") {
                messInfo("messinfo_xtmail", "Vui lòng nhập email", 'error');
                return;
            }
            if ($('#txtnhapmaxt_tlncbvh').val().trim() == "") {
                messInfo("messinfo_xtmail", "Vui lòng nhập mã xác thực", 'error');
                return;
            }
            // check xem đã xác thực chưa, nếu chưa bắt xác thực
            if ($('#txtemail_tlncbvh').val().trim() != "" && $('#txtnhapmaxt_tlncbvh').val().trim() == maXacThuc_tlncbvh) {
                 f_saveEmail();
            } else {
                messInfo("messinfo_xtmail", "Vui lòng nhập mã chính xác!", 'sucess');
            }
        } catch (e) {
            console.log(e);
        }
    });
});

/*-----------------------------------------------------------*/
// chọn cảnh báo - thiet lap nhan canh bao van hanh
/*----------------------------------------------------------*/
function LoadDataTypeCanhBao() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "ADMISS_CANHBAOVANHANH_THIETLAP.GetWarningByType", callback: "result_getwarningbytype" };
        var para = {
            v_WarningType: '0',
            v_Langues: 'true'
        };
        var lst = ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_getwarningbytype(config, para, lst) {
    try {
        var data = lst.data;
        $('#cbwaning_type_tlncbvh').empty();
        $('#cbwaning_type_tlncbvh').append($('<option>', {
            value: '-1',
            text: '--TẤT CẢ--'
        }));
        $.each(data, function (key, val) {
            $('#cbwaning_type_tlncbvh').append($('<option>', {
                value: val.id.toUpperCase(),
                text: val.text.toUpperCase()
            }));
        });
        GetListWarningByUserId();
    } catch (e) {
        console.log(e);
    }
}
function GetListWarningByUserId() {
    try {
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var vWarnType = $("#cbwaning_type_tlncbvh option:selected").val();
        var config = { connstr: "ConnectOracle233", namesql: "ADMISS_CANHBAOVANHANH_THIETLAP.GetListWarningByUserId", callback: "result_GetListWarningByUserId" };
        var para = {
            v_WarnType: vWarnType,
            v_UserId: objuser.userid
        };
        var lst = ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_GetListWarningByUserId(config, para, lst) {
    var data = lst.data;
    try{
        $("#tbl_ccbvh tbody").empty();
        $.each(data, function (key, val) {
            try {
                var tr = "";
                tr += '<tr id='+val.id+'>' +
                      '<td class="a_c">' + val.stt + '</td>' +
                      '<td>' + setnull(val.group_name1) + '</td>' +
                      '<td>' + setnull(val.group_name2) + '</td>' +
                      '<td>' + setnull(val.name) + '</td>' +
                      '<td style="width:30px" class="a_c"><input type="checkbox" onchange="checkboxsingle(this,' + val.id + ')"></td>'
                tr += "</tr>";

                $("#tbl_ccbvh tbody").append(tr);
                // kiem tra checked in checkbox
                if ($("#chkAll").prop("checked") == true) {
                    $('#tbl_ccbvh tbody tr td input[type="checkbox"]').prop('checked', true);
                } else {
                    if (array_tlncbvh.indexOf(val.id) > -1) {
                        $('#tbl_ccbvh tbody tr td input[type="checkbox"]').prop('checked', true);
                    }
                }

            } catch (ex) { console.log(ex); }

        });
        //chọn all
        $('#chkAll').on('change', function () {
            var icheckAll = $(this).prop('checked');
            if (icheckAll) {
                $('tbody tr td input[type="checkbox"]').prop('checked', true);
                checkedmulti();
            } else {
                $('tbody tr td input[type="checkbox"]').prop('checked', false);
                Uncheckedmulti();
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function checkedmulti() {
    $("#tbl_cbmd tbody").empty();
    $("#tbl_ccbvh tbody").find("tr").each(function () {
        var id = $(this).attr("id");
        var name_group1 = $(this).children("td").eq(1).html();
        var name_group2 = $(this).children("td").eq(2).html();
        var name = $(this).children("td").eq(3).html();
        var tr = "";
        array_tlncbvh.push(id);
        tr += '<tr id=' + id + '>' +
                    '<td>' + name_group1 + '</td>' +
                    '<td>' + name_group2 + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td class="a_c"><input type="checkbox"></td>'
        tr += "</tr>";
        $("#tbl_cbmd tbody").append(tr);
       
    });
}
function Uncheckedmulti() {
    array_tlncbvh.length = 0;
    $('#tbl_cbmd tbody').empty();
}
function checkboxsingle(obj,id) {
    var boolcheck = $(obj).prop('checked');
    var id = id;
    var name_group1 = $('#tbl_ccbvh #' + id).children("td").eq(1).html();
    var name_group2 = $('#tbl_ccbvh #' + id).children("td").eq(2).html();
    var name = $('#tbl_ccbvh #' + id).children("td").eq(3).html();
    var tr = "";
    if (boolcheck) {
        array_tlncbvh.push(id);  
        tr += '<tr id=' + id + '>' +
                    '<td>' + name_group1 + '</td>' +
                    '<td>' + name_group2 + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td class="a_c"><input type="checkbox"></td>'
        tr += "</tr>";
        $("#tbl_cbmd tbody").append(tr);

    } else {
        $('#tbl_cbmd #' + id).remove();
        var index = array_tlncbvh.indexOf(id)
        array_tlncbvh.splice(index,1);
    }
}
/*-----------------------------------------------------------*/
// Thiết lập email - thiet lap nhan canh bao van hanh
/*----------------------------------------------------------*/

function sendMail(chuDe, noiDung, toEmail,toEmailcc, tenThayThe) {
    messInfo("messinfo_xtmail", "Một mã xác thực đã được gửi tới email : " + toEmail, 'sucess');
    $('#btn_xacthuc_tlncbvh').removeAttr('disabled');
    $("#tdnotesendmail").html("<i> (*) chú ý: Nếu quý vị không nhận được mã xác thực của chúng tôi vui lòng kiếm tra trong hộp thư spam hoặc thử lại với một email mới</i>");
    $("#txtnhapmaxt_tlncbvh").removeAttr("readonly");
 
    var config = {
        chuDe: chuDe,
        noiDung: noiDung,
        sendToMail: toEmail,
        sendCCToMail: toEmailcc,
        tenThayThe: tenThayThe
    }
    api_sendMail(config);

}

var f_checkEmailEmty = function () {
    if ($('#txtemail_tlncbvh').val().trim() == "") {
        messInfo("messinfo_xtmail", "Vui lòng nhập email", 'error');
        return false;
    }
    if (!IsEmail($('#txtemail_tlncbvh').val().trim())) {
        messInfo("messinfo_xtmail", "Phải nhập đúng định dạng các trường", 'error');
        return false;
    }
    return true;
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function f_saveEmail() {
    var email = $('#txtemail_tlncbvh').val();
    var emailcc = $('#txtemailcc_tlncbvh').val();
    lstEmail_tlncbvh = email.trim() + "," + emailcc.trim();
    var objuser = JSON.parse(localStorage.getItem("userinfo"));
    var vWarnType = $("#cbwaning_type_tlncbvh option:selected").val();
    var config = { connstr: "ConnectOracle233", namesql: "ADMISS_CANHBAOVANHANH_THIETLAP.CapNhatThongTin", callback: "result_saveEmail" };
    var para = {
        v_UserId: objuser.userid,
        v_Email: lstEmail_tlncbvh,
        v_XacThuc: maXacThuc_tlncbvh
    };
    var lst = ExecuteServiceSyns(config, para);
 
}
function result_saveEmail(config, para,lst) {
    var data = lst.data;
    if (data.length == 0) {
        showToast("Xác thực mail không thành công thành công", "error");
    } else {
        $("#thietlapemail_tlncbvh").modal("hide");
        $('#btn_xacthuc_tlncbvh').attr('disabled', 'disabled');
        $("#tdnotesendmail").html("");
        $("#txtnhapmaxt_tlncbvh").attr("readonly", 'readonly');
        $('#txtnhapmaxt_tlncbvh').val("");
        $("#txt_lstemail_tlncbvh").val(lstEmail_tlncbvh);
        showToast("Xác thực mail thành công", "success");
        messInfo("messinfo_xtmail", "");
    }
}