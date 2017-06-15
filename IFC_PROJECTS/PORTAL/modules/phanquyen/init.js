$(document).ready(function () {
    showhideTree();
    getModPermission(JSON.parse(localStorage.getItem("userinfo")).usercode);
    loaddanhdanhtaikhoan();

    selectlang();
    var uid = JSON.parse(localStorage.getItem("userinfo")).userid;
    $("#btn_searchnguoidung").click(function () {
        var tendangnhap = $("#sl_nguoidung option:selected").text();
        getModPermission(tendangnhap);
    })
    $("#btn_luuphanquyen").click(function () {
        var child;
        for (var i = 0; i < $('#danhsachchucnang tr').length; i++) {
            child = $("tr[alt = '" + i + "'").children();
            //console.log(child);
            var record = { uid: uid, mid: $(child[1]).data("value"), per: replaceTF($(child[2]).children().children()[0].checked) + replaceTF($(child[3]).children().children()[0].checked) + replaceTF($(child[4]).children().children()[0].checked) + replaceTF($(child[5]).children().children()[0].checked) + replaceTF($(child[6]).children().children()[0].checked) };
            //console.log(record);
            luuPhanquyen(record);
        }
    })
});

function getModPermission(tendangnhap) {
    try {
        var uname = tendangnhap;
        var config = { namesql: "PKG_PHANQUYEN.GET_MODULES", callback: "f_result_modpermission", connstr: "ConnectOracle233" };
        var para = {
            v_tendangnhap: uname
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_modpermission(config, para, lst) {
    try {
        var modper = lst.data;
        var tr = "";
        for (var i = 0; i < modper.length; i++) {
            var m = modper[i];
            var permis = m.chitietquyen;
            tr += '<tr alt="'+i+'">' +
                  '<td class="a_c">' + (i + 1) + '</td>' +
                  '<td data-value="' + m.mid + '">' + m.tenmodule + '</td>' +
                  '<td class="a_c"><input type="checkbox" class="flat-red" ' + subpermiss(permis, 0) + ' ></td>' +
                  '<td class="a_c"><input type="checkbox" class="flat-red" ' + subpermiss(permis, 1) + ' ></td>' +
                  '<td class="a_c"><input type="checkbox" class="flat-red" ' + subpermiss(permis, 2) + ' ></td>' +
                  '<td class="a_c"><input type="checkbox" class="flat-red" ' + subpermiss(permis, 3) + ' ></td>' +
                  '<td class="a_c"><input type="checkbox" class="flat-red" ' + subpermiss(permis, 4) + ' ></td>' +
                  '</tr>';
                  
        }
        $('#danhsachchucnang').empty();
        $('#danhsachchucnang').append(tr);

        initformelement();
    } catch (e) {
        console.log(e);
    }
}
function replaceTF(tf){
    if(tf == true){
        return "1";
    }else{
        return "0";
    }
}


function luuPhanquyen(record) {
    try {
        var uname = $("#sl_nguoidung option:selected").val();
        var config = { namesql: "PKG_PHANQUYEN.PHANQUYEN", callback: "f_result_luuPhanquyen", connstr: "ConnectOracle233" };
        var para = {
            v_userid: record.uid,
            v_mid: record.mid,
            v_chitietquyen: record.per
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_luuPhanquyen(config, para, lst) {
    try {
        var kq = lst.data;
        console.log(kq);
        if (kq[0].count == "Phân quyền thành công") {
            showToast("Lưu phân quyền thành công", "success");
        }

    } catch (e) {
        console.log(e);
    }
}
function subpermiss(permiss, index) {
    if (permiss == null || index == null) {
        return "";
    }
    var q = permiss.charAt(index);
    if (q == "1") {
        return "checked";
    } else {
        return "";
    }
}


function loaddanhdanhtaikhoan() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "ConnectOracle233", namesql: "PKG_DANHSACHTAIKHOAN.DANHSACHTAIKHOAN", callback: "result_danhsachtaikhoan" };
        var para = {
            v_CODE: userinfo.code
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);

    }
}

function result_danhsachtaikhoan(para, config, lst) {
    try {
        var data = lst.data;
        ////console.log(data);
        var opt = '<option value="-1">-- Chọn người dùng --</option>';
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        for (var i = 0; i < data.length; i++) {
            opt += '<option value="' + data[i].userid + '">' + data[i].usercode + '</option>';
        }
        $("#sl_nguoidung").empty();
        $("#sl_nguoidung").append(opt);
    } catch (e) {
        console.log(e);
    }
}

