var listmeter;
var ucode = JSON.parse(localStorage.getItem("userinfo")).idnhanvien;
$(document).ready(function () {
    try
    {
        $("#btn_CapNhat_taonhom").click(function () {
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

            if ($("#text_input").val() != "") {
                createDonvi();
            } else {
                messInfo("messinfo_TaoNhom", "Chưa nhập tên nhóm", "error");
            }
        })
        

    } catch (e) { console.log(e);}  

});
function createDonvi() {
    try {
        var type = localStorage.getItem('change');
        var config = { namesql: "PKG_NHOMA.CREATE_DONVI", callback: "f_create_donvi", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_listmeter: listmeter.toString(),
            v_tendonvi: $("#text_input").val(),
            v_userid: ucode,
            v_type: type
        };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_create_donvi(config, para, lst) {
    try {
        //console.log(lst);
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_TaoNhom", row, "ok");
            $('#TaoNhom').modal('hide');
            f_loadChangeFilter();
        } else {
            messInfo("messinfo_TaoNhom", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
