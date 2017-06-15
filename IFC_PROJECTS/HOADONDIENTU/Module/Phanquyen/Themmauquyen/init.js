
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        loadmauquyen();
        $("#btn_themquyen_click").click(function () {
            messInfo("messinfo_sdquyen", '', 'error');
        });
        $("#bt_xemq").change(function () {
            var checked_status = this.checked;
            $("input[name='xem']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_themq").change(function () {
            var checked_status = this.checked;
            $("input[name='them']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_suaq").change(function () {
            var checked_status = this.checked;
            $("input[name='sua']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_xoaq").change(function () {
            var checked_status = this.checked;
            $("input[name='xoa']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_downloadq").change(function () {
            var checked_status = this.checked;
            $("input[name='download']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#bt_inq").change(function () {
            var checked_status = this.checked;
            $("input[name='in']").each(function () {
                this.checked = checked_status;
            });
        });
        $("#btn_capnhat_mau").click(function () {
            var check = check_datequyen();
            if (check != "") {
                messInfo("messinfo_sdquyen", check, 'error');
                return;
            }
            messInfo("messinfo_sdquyen", '', 'error');
            capnhatid();
        });
    } catch (e) {
        console.log(e);
    }
});
function check_datequyen() {
    try{
        var p = getAllIdMod();
        if (p.txt_tenmau == "") return "Tên mẫu không được để trống";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function loadmauquyen() {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_PHANQUYEN.LOADMAUQUYEN", callback: "resut_loadmauquyen" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_loadmauquyen(config, para, lst) {
    try{
        var data = lst.data;
        
        $("#table_capquyen").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr  id_auto='" + val.id_md + "'><td class='c'>"
                + val.stt + "</td><td>"
                + val.ten_md + "</td><td class='c'>"
                + '<input type="checkbox" name="xem" class="xem"/>' + "</td><td  class='c'>"
                + '<input type="checkbox" name="them" class="them" />' + "</td><td  class='c'>"
                + '<input type="checkbox" name="sua" class="sua"/>' + "</td><td  class='c'>"
                + '<input type="checkbox" name="xoa" class="xoa"/>' + "</td><td  class='c'>"
                + '<input type="checkbox" name="download" class="download" />' + "</td><td  class='c'>"
                + '<input type="checkbox" name="in" class="in"/>' + "</td></tr>";
              
            $("#table_capquyen").append(row);
        });


    } catch (e) {
        console.log(e);
    }
}
function capnhatid() {
    try{
        var paraa = [];
        $('#table_capquyen tr').each(function () {
            var xem = $(($(this).find(".xem"))).is(':checked') == true ? 1 : 0;
            var them = $(($(this).find(".them"))).is(':checked') == true ? 1 : 0;
            var sua = $(($(this).find(".sua"))).is(':checked') == true ? 1 : 0;
            var xoa = $(($(this).find(".xoa"))).is(':checked') == true ? 1 : 0;
            var download = $(($(this).find(".download"))).is(':checked') == true ? 1 : 0;
             var ins = $(($(this).find(".in"))).is(':checked') == true ? 1 : 0;
            var info = {
                id: $(this).attr("id_auto"), xem: xem, them: them, sua: sua, xoa: xoa, download: download ,ins:ins
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
                    cot8: userinfo.userid,
                    cot9: 'QUYEN',
                  
                };
                lstId.push(ID);
            } else {
                messInfo("messinfo_sdquyen", 'Quyền cập nhập không đúng', "error");
                return;
            }
        }
        
        var config = {
            connstr: "Oracle_HDDT",
            insertto: "HD_TEMNHIEU",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
            capnhatquyen();
        }
        else {
            messInfo("messinfo_sdquyen", 'Lỗi cập nhật', "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function capnhatquyen() {

    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_PHANQUYEN.CAPNHATQUYENDANHSACH", callback: "resut_capnhatquyen" };
        var para = {
            v_USERID:userinfo.userid,
            v_TEN: $("#txt_tenmau").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_capnhatquyen(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sdquyen", row, 'ok');
            setTimeout(function () {
                loadmauquyen();
                hienthi_mauquyen(1);
                clear_madinhthem();
            }, 1000);
        } else {
            messInfo("messinfo_sdquyen", row, 'error');
        }
    
    } catch (e) {
        console.log(e);
    }
}
function clear_madinhthem() {
    try {
        messInfo("messinfo_sdquyen", '', 'error');
        $("#txt_tenmau").val();
        $("#bt_xemq").attr("checked", false);
        $("#bt_themq").attr("checked", false);
        $("#bt_suaq").attr("checked", false);
        $("#bt_xoaq").attr("checked", false);
        $("#bt_downloadq").attr("checked", false);
        $("#bt_inq").attr("checked", false);
       
    } catch (e) {
        console.log(e);
    }
}
