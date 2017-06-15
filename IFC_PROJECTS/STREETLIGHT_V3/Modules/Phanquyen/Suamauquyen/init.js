var idchungquyen = "";
$(document).ready(function () {
    try {
        loadchecklog_master();
        $("#btn_themquyen_click").click(function () {
            messInfo("messinfo_sdquyen", '', 'error');
        });
        $("#bt_xemq_sua").change(function () {
            var checked_status = this.checked;
            $("input[name='xem_sua']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_themq_sua").change(function () {
            var checked_status = this.checked;
            $("input[name='them_sua']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_suaq_sua").change(function () {
            var checked_status = this.checked;
            $("input[name='sua_sua']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_xoaq_sua").change(function () {
            var checked_status = this.checked;
            $("input[name='xoa_sua']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_downloadq_sua").change(function () {
            var checked_status = this.checked;
            $("input[name='download_sua']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_inq_sua").change(function () {
            var checked_status = this.checked;
            $("input[name='in_sua']").each(function () {
                this.checked = checked_status;
            });
        });

        $("#btn_capnhat_mauquyen").click(function () {
            var check = check_suaquyen();
            if (check != "") {
                messInfo("messinfo_sdquyen_sua", check, 'error');
                return;
            }
            messInfo("messinfo_sdquyen_sua", '', 'error');
            layid_suaquyen();
        });

    } catch (e) {
        console.log(e);
    }
});
function check_suaquyen() {
    try {
        var p = getAllIdMod();
        if (p.txt_sd_tenmau == "") return "Tên mẫu không được để trống";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function loadmauquyen_suathem(id) {
    try {
        clear_load_sua();
        idchungquyen = id;
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYEN.IDCHUNGQUYEN", callback: "resut_loadmauquyen_suathem" };
        var para = {
            v_IDCHUNG : id
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function resut_loadmauquyen_suathem(config, para, lst) {
    try {
        var data = lst.data;
       
        $("#txt_sd_tenmau").val(data[0].tenmau);
        $("#table_capquyen_sua").empty();
        $.each(data, function (key, val) {
            var tr = "";
            tr += "<tr ida='" + val.id_md + "'><td class='c'>"
                + val.stt + "</td><td class='l'>"
                 + val.ten_md + "</td><td class='c'>"
            if (val.xem == "1") {
                tr += '<input type="checkbox" checked name="xem_sua" class=" xem_sua" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="xem_sua" class="xem_sua" /> </td><td class="c">'
            }
            if (val.them == "1") {
                tr += '<input type="checkbox" checked name="them_sua" class=" them_sua" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="them_sua" class="them_sua" /> </td><td class="c">'
            }
            if (val.sua == "1") {
                tr += '<input type="checkbox" checked name="sua_sua" class=" sua_sua" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="sua_sua" class="sua_sua" /> </td><td class="c">'
            }
            if (val.xoa == "1") {
                tr += '<input type="checkbox" checked name="xoa_sua" class=" xoa_sua" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="xoa_sua" class="xoa_sua" /> </td><td class="c">'
            }
            if (val.download == "1") {
                tr += '<input type="checkbox" checked name="download_sua" class=" download_sua" /> </td><td class="c">'
            }
            else {
                tr += '<input type="checkbox"  name="download_sua" class="download_sua" /> </td><td class="c">'
            }
            if (val.ins == "1") {
                tr += '<input type="checkbox" checked name="in_sua" class=" in_sua" /> </td></tr>'
            }
            else {
                tr += '<input type="checkbox"  name="in_sua" class="in_sua" /> </td></tr>'
            }
          

            $("#table_capquyen_sua").append(tr);
        });

    } catch (e) {
        console.log(e);
    }
}

function clear_load_sua() {
    try {
        messInfo("messinfo_sdquyen_sua", '', 'error');
        $("#txt_sd_tenmau").val();
        $("#bt_xemq_sua").attr("checked", false);
        $("#bt_themq_sua").attr("checked", false);
        $("#bt_suaq_sua").attr("checked", false);
        $("#bt_xoaq_sua").attr("checked", false);
        $("#bt_downloadq_sua").attr("checked", false);
        $("#bt_inq_sua").attr("checked", false);

    } catch (e) {
        console.log(e);
    }
}

function layid_suaquyen() {
    try {
        var paraa = [];
        $('#table_capquyen_sua tr').each(function () {
            var xem = $(($(this).find(".xem_sua"))).is(':checked') == true ? 1 : 0;
            var them = $(($(this).find(".them_sua"))).is(':checked') == true ? 1 : 0;
            var sua = $(($(this).find(".sua_sua"))).is(':checked') == true ? 1 : 0;
            var xoa = $(($(this).find(".xoa_sua"))).is(':checked') == true ? 1 : 0;
            var download = $(($(this).find(".download_sua"))).is(':checked') == true ? 1 : 0;
            var ins = $(($(this).find(".in_sua"))).is(':checked') == true ? 1 : 0;
            var info = {
                id: $(this).attr("ida"), xem: xem, them: them, sua: sua, xoa: xoa, download: download, ins: ins
            };

            paraa.push(info);

        });
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
                    cot9: 'QUYENSUA',

                };
                lstId.push(ID);
            } else {
                messInfo("messinfo_sdquyen_sua", 'Quyền cập nhập không đúng', "error");
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
            capnhatquyen_sua();
        }
        else {
            messInfo("messinfo_sdquyen_sua", 'Lỗi cập nhật', "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function capnhatquyen_sua() {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYEN.SUAQUYENMOI", callback: "resut_capnhatquyen_sua" };
        var para = {
            v_IDCHUNG: idchungquyen,
            v_USERID: userinfo.idnhanvien,
            v_TEN: $("#txt_sd_tenmau").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_capnhatquyen_sua(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sdquyen_sua", row, 'ok');
            setTimeout(function () {
                hienthi_mauquyen(1);
            }, 500);
        } else {
            messInfo("messinfo_sdquyen_sua", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}