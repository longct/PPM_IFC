var countpage = 20;
var hd_usercode = "";
$(document).ready(function () {
    try {
        showhideTree();
        loadContent();
        selectlang();
        GetListUser(1);
        $("#btn_thaymatkhau_dlmk").on("click", function () {
            try {
                var check = checknull_dlmk();
                if (check != "") {
                    showToast(check, "error");
                    return;
                }
                f_thaydoimatkhau_dlmk();
            } catch (e) {
                console.log(e);
            }
        });
        $("#cancel_dmk_dlmk").on("click", function () {
            $("#md_datlaimatkhau").modal("hide");
            hd_usercode = "";
        });
        $("#btnsearch_dlmk").on("click", function () {
            GetListUser(1);
        });
    } catch (e) {
        console.log(e);
    }
});
function GetListUser(page) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        console.log(userinfo);
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_DATLAIMATKHAU.DANHSACHTAIKHOAN", callback: "f_result_danhsachtaikhoan_dlmk" };
        var para = {
            v_usercode: userinfo.usercode,
            v_keywords: $("#txtsearch_dlmk").val(),
            v_pagenum: page,
            v_numrecs:countpage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);

    }
}
function f_result_danhsachtaikhoan_dlmk(config, para,lst) {
    try {
       
        var data = lst.data;
        var strData = '';
        $("#tbl_dlmk_data tbody").empty();
        $.each(data, function (i, val) {
            var trangthai=val.trycount >= 3 ? "Đang khóa" : "Hiệu lực"
            strData += "<tr><td class='c'>"
                            + val.rnum + "</td><td>"
                            + val.usercode + "</td><td class='c'>"
                            + trangthai + "</td>"
                            + "<td class='c'><button data-modal='confirm_modal' content_modal='confirm_content' onclick=\"f_unlock_dlmk('" + val.usercode + "')\" class='btn btn-success' id='unlock_" + val.usercode + "' " + (val.trycount >= 3 ? "" : "disabled") + ">Mở khóa</button></td>"
                            + "<td class='c'><button data-modal='confirm_modal' content_modal='confirm_content' onclick=\"f_reset_dlmk('" + val.usercode + "')\"  class='btn btn-success' style='width:150px' id='reset_" + val.usercode + "' >Đặt lại mật khẩu</button></td>";
        });
        $("#tbl_dlmk_data tbody").append(strData);
        LoadPhanTrang("pageLst_dlmk", "pageCurent_dlmk", data, function () {
            GetListUser($("#pagenumber").val());
        });
    }
    catch (e) {
        console.log(e)
    }
}
function f_reset_dlmk(usercode) {
    $("#md_datlaimatkhau").modal("show");
    $("#myModalLabel").html(" Đặt mật khẩu cho tài khoản " + usercode);
    hd_usercode = usercode;
    $("#txt_nhapmoimk_dlmk").val("");
    $("#txt_nhaplaimk_dlmk").val("");
}
function checknull_dlmk() {
    try {
        var p = getAllIdMod();
        if (p.txt_nhapmoimk_dlmk == "") return "Mật khẩu mới không được bỏ trống";
        if (p.txt_nhaplaimk_dlmk != p.txt_nhapmoimk_dlmk) {
            return "Nhập lại mật khẩu mới chưa đúng";
        }
        return "";

    } catch (e) {
        console.log(e);
    }
}
function f_thaydoimatkhau_dlmk() {
    try {
        var p = getAllIdMod();

        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_DATLAIMATKHAU.THAYMATKHAU", callback: "f_result_resetpassword_dlmk" };
        var para = {
            v_TENDANGNHAP: hd_usercode,
            v_MATKHAUCU: p.txt_nhapmoimk_dlmk,
            v_MATKHAU: p.txt_nhaplaimk_dlmk
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_resetpassword_dlmk(config, para,lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        var row = data[0].count;
        if (row > 0) {
            showToast("Đặt lại mật khẩu cho tài khoản " + para.v_TENDANGNHAP + " thành công", "success");
            hd_usercode = "";
            $('#md_datlaimatkhau').modal('hide');
        } else {
            showToast("Đặt lại mật khẩu cho tài khoản " + para.v_TENDANGNHAP + " thất bại", "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function f_unlock_dlmk(usercode) {
    f_confimYesNo('Người dùng đồng ý mở khóa tài khoản ' + usercode + '?', "Hủy", "Đồng ý", fn_save_unlock_dlmk);
    hd_usercode = usercode;
}
function fn_save_unlock_dlmk() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_DATLAIMATKHAU.MOTAIKHOAN", callback: "f_result_save_unlock_dlmk" };
        var para = {
            v_usercode: hd_usercode
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_save_unlock_dlmk(config, para, lst) {
    try {
        var data = lst.data;
        if(data ==null)
            showToast("Mở khóa " + para.v_usercode + " thất bại", "error");
        var row = data[0].count;
        if (row > 0) {
            $("#unlock_" + para.v_usercode).attr("disabled", "disabled");
            showToast("Mở khóa " + para.v_usercode + " thành công", "success");
            hd_usercode = "";
        }
        else
            showToast("Mở khóa " + para.v_usercode + " thất bại", "error");
      
       
    } catch (e) {
        console.log(e);
    }
  
}