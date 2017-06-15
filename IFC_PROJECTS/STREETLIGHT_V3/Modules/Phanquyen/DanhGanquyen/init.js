$(document).ready(function () {
    try {
        loadchecklog_master();
        
        lsttaikhoan();
        lsttaimau();
        $("#cb_danhsachmau_apquyen").change(function () {
            var id = $(this).val();
            if (id == "-1") {
                $("#table_apquyen").empty();
                return;
            }
            loadmauquyen_apquyen(id);
        });
        $("#cb_taikhoan_apquyen").change(function () {
            var id = $(this).val();
            if (id == "-1") {
                $("#table_apquyen").empty();
                return;
            }
            loadquyentheouser(id);
        });

        

        $("#bt_xemq_apquyen").change(function () {
            var checked_status = this.checked;
            $("input[name='xem_apquyen']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_themq_apquyen").change(function () {
            var checked_status = this.checked;
            $("input[name='them_apquyen']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_suaq_apquyen").change(function () {
            var checked_status = this.checked;
            $("input[name='sua_apquyen']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_xoaq_apquyen").change(function () {
            var checked_status = this.checked;
            $("input[name='xoa_apquyen']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_downloadq_apquyen").change(function () {
            var checked_status = this.checked;
            $("input[name='download_apquyen']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_inq_apquyen").change(function () {
            var checked_status = this.checked;
            $("input[name='in_apquyen']").each(function () {
                this.checked = checked_status;
            });
        });

        // click để cập nhật 
        $("#btn_capnhat_apquyen").click(function () {
            var check = validate_apquyen();
            if (check != "") { messInfo("messinfoxoa_apquyen", check, "error"); return; }
            messInfo("messinfoxoa_apquyen", '', "error");
            layid_ganquyen();
        });


    } catch (e) {
        console.log(e);
    }
});
function validate_apquyen() {
    try{
        var p = getAllIdMod();
        if (p.cb_taikhoan_apquyen == "-1") return "Vui lòng chọn tài khoản"; 
        return "";
    } catch (e) {
        console.log(e);
    }
}
function lsttaikhoan() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYENNGUOIDUNG.LSTNGUOIDUNG", callback: "result_lsttaikhoan" };
        var para = {
            v_USERID: userinfo.idnhanvien,
            v_CODE: userinfo.madonvi
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lsttaikhoan(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_taikhoan_apquyen", data, "id", "ten", "-1", "Chọn tài khoản");
    } catch (e) {
        console.log(e);
    }
}
function lsttaimau() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYENNGUOIDUNG.LSTMAU", callback: "result_lsttaimau" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lsttaimau(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_danhsachmau_apquyen", data, "id", "ten", "-1", "Chọn mẫu quyền");
    } catch (e) {
        console.log(e);
    }
}
// change mau quyen
function loadmauquyen_apquyen(id) {
    try {
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYEN.IDCHUNGQUYEN", callback: "resut_loadmauquyen_apquyen" };
        var para = {
            v_IDCHUNG: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
// change theo tai khoan
function loadquyentheouser(id) {
    try {
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYENNGUOIDUNG.LOADPHANQUYENTAIKHOAN", callback: "resut_loadmauquyen_apquyen" };
        var para = {
            v_USERID: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
//vẽ chung
function resut_loadmauquyen_apquyen(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            messInfo("messinfoxoa_apquyen", "Tài khoản này chưa được gán quyền", "error");
            $("#table_apquyen").empty();
            return;
        }
        messInfo("messinfoxoa_apquyen", "", "error");
        $("#table_apquyen").empty();
        $.each(data, function (key, val) {
            var tr = "";
            tr += "<tr idquyen='" + val.id_md + "'><td class='c'>"
                + val.stt + "</td><td class='l'>"
                 + val.ten_md + "</td><td class='c'>"
            if (val.xem == "1") {
                tr += '<input type="checkbox" checked name="xem_apquyen" class=" xem_apquyen" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="xem_apquyen" class="xem_apquyen" /> </td><td class="c">'
            }
            if (val.them == "1") {
                tr += '<input type="checkbox" checked name="them_apquyen" class=" them_apquyen" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="them_apquyen" class="them_apquyen" /> </td><td class="c">'
            }
            if (val.sua == "1") {
                tr += '<input type="checkbox" checked name="sua_apquyen" class=" sua_apquyen" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="sua_apquyen" class="sua_apquyen" /> </td><td class="c">'
            }
            if (val.xoa == "1") {
                tr += '<input type="checkbox" checked name="xoa_apquyen" class=" xoa_apquyen" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="xoa_apquyen" class="xoa_apquyen" /> </td><td class="c">'
            }
            if (val.download == "1") {
                tr += '<input type="checkbox" checked name="download_apquyen" class=" download_apquyen" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="download_apquyen" class="download_apquyen" /> </td><td class="c">'
            }
            if (val.ins == "1") {
                tr += '<input type="checkbox" checked name="in_apquyen" class=" in_apquyen" /> </td></tr>'
            }
            else {
                tr += '<input type="checkbox"  name="in_apquyen" class="in_apquyen" /> </td></tr>'
            }
            $("#table_apquyen").append(tr);
        });

    } catch (e) {
        console.log(e);
    }
}
function layid_ganquyen() {
    try {
        var paraa = [];
        $('#table_apquyen tr').each(function () {
            var xem = $(($(this).find(".xem_apquyen"))).is(':checked') == true ? 1 : 0;
            var them = $(($(this).find(".them_apquyen"))).is(':checked') == true ? 1 : 0;
            var sua = $(($(this).find(".sua_apquyen"))).is(':checked') == true ? 1 : 0;
            var xoa = $(($(this).find(".xoa_apquyen"))).is(':checked') == true ? 1 : 0;
            var download = $(($(this).find(".download_apquyen"))).is(':checked') == true ? 1 : 0;
            var ins = $(($(this).find(".in_apquyen"))).is(':checked') == true ? 1 : 0;
            var info = {
                id: $(this).attr("idquyen"), xem: xem, them: them, sua: sua, xoa: xoa, download: download, ins: ins
            };
            paraa.push(info);
        });
        if (paraa == "[]" || paraa.length==0) {
            messInfo("messinfoxoa_apquyen", 'Chưa chọn quyền cho tài khoản', "error");
            return;
        }
        var lstId = [];
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var data = paraa;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id != null) {
                var ID = {
                    cot1: data[i].id,
                    cot2: data[i].xem,
                    cot3: data[i].sua,
                    cot4: data[i].xoa,
                    cot5: data[i].download,
                    cot6: data[i].ins,
                    cot7: data[i].them,
                    cot8: userinfo.idnhanvien,
                    cot9: 'APQUYEN',

                };
                lstId.push(ID);
            } else {
                messInfo("messinfoxoa_apquyen", 'Quyền cập nhập không đúng', "error");
                return;
            }
        }
        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "HD_TEMNHIEU",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
            capnhatquyen_taikhoan();
        }
        else {
            messInfo("messinfo_sdquyen_sua", 'Lỗi cập nhật', "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function capnhatquyen_taikhoan() {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYENNGUOIDUNG.CAPQUYENUSER", callback: "resut_capnhatquyen_taikhoan" };
        var para = {
            v_USERID: userinfo.idnhanvien,
            v_IDSUDUNG: $("#cb_taikhoan_apquyen").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_capnhatquyen_taikhoan(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfoxoa_apquyen", row, 'ok');
            setTimeout(function () {
                var id = $("#cb_taikhoan_apquyen").val();
                loadquyentheouser(id);
                clear_taikhoan();
            }, 1000);
        } else {
            messInfo("messinfoxoa_apquyen", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function clear_taikhoan() {
    try {
        $("#bt_xemq_apquyen").attr("checked", false);
        $("#bt_themq_apquyen").attr("checked", false);
        $("#bt_suaq_apquyen").attr("checked", false);
        $("#bt_xoaq_apquyen").attr("checked", false);
        $("#bt_downloadq_apquyen").attr("checked", false);
        $("#bt_inq_apquyen").attr("checked", false);

    } catch (e) {
        console.log(e);
    }
}