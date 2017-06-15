var listmeter;
var madonvi;
var ucode = JSON.parse(localStorage.getItem("userinfo")).idnhanvien;
$(document).ready(function () {
    try
    {
        loadchecklog_master();
        getDonvi();
        $("#btn_CapNhat_chuyennhom").click(function(){
            var type = localStorage.getItem('change');
            if (type == "TU") {
                listmeter = $('input[name=checkboxlist]:checked').map(function () {
                    return $(this).context.id.substring(2);
                }).get();
            } else {
                listmeter = $('input[name=checkbox]:checked').map(function () {
                    return $(this).context.id.substring(2);
                }).get();
            }
    
            madonvi = $("select#cb_chonnhom option:selected").val();
           moveDonvi();
         
        })

     
        

    } catch (e) { console.log(e);}  

});


function getDonvi() {
    try {

        var config = { namesql: "PKG_NHOM.GETDONVI", callback: "f_get_donvi", connstr: "ConnectOracleStreetLight" };
        var para = {
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_get_donvi(config, para, lst) {
    try {
        var d = lst.data;
        var donvi = "<option value = '-1'>-- CHỌN NHÓM --</option>";
        for (var i = 0; i < d.length; i++) {
            donvi += "<option value='" + d[i].madonvi + "'>";
            if (d[i].madonvi.length == 4) {
                donvi += "--- " + d[i].tendonvi + "</option>";
            }
            else if (d[i].madonvi.length == 6) {
                donvi += "------- " + d[i].tendonvi + "</option>";
            }
            else if (d[i].madonvi.length == 8) {
                donvi += "--------- " + d[i].tendonvi + "</option>";
            }
            //d[i].tendonvi + "</option>";
        }
        //$("select#cb_chonnhom").empty();
        $("select#cb_chonnhom").append(donvi);
    } catch (e) {
        console.log(e);
    }
}

function moveDonvi() {
    try {
        var type = localStorage.getItem('change');
        var config = { namesql: "PKG_NHOMA.MOVE_DONVI", callback: "f_move_donvi", connstr: "ConnectOracleStreetLight" };
        var para = {
             v_listmeter : listmeter.toString(),
             v_madonvi :madonvi,
             v_userid: ucode,
             v_type: type
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_move_donvi(config, para, lst) {
    try {
       
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_Chuyennhom", row, "ok");
            $('#ChuyenNhom').modal('hide');
            f_loadChangeFilter();
        } else {
            messInfo("messinfo_Chuyennhom", row, "error");
        }

        
    } catch (e) {
        console.log(e);
    }
}
