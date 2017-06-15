function f_init_doctoadotu_dtdt(lstId)
{
    try{
        var lstData = f_guiToaDoTu_dtdt(lstId);
        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOT",
        }
        var table = {
            table: JSON.stringify(lstData)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null)
            f_updatetoado_dtdt();

    } catch (e) {
        console.log(e);
    }
    
}


function f_updatetoado_dtdt() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_DIEUKHIEN.CAPNHATLENHDIEUKHIEN",
            callback: "f_result_updatetoado_dtdt"
        }
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            V_USERID: userinfo.idnhanvien
        }
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function f_result_updatetoado_dtdt(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.length == 0)
            return;
        
        localStorage.setItem("dangguimathietlap", lst.data[0].mathietlap);
        f_startTimerDtt_prcess();
        $('#process_modal').modal('show');
    } catch (e) { console.log(e); }
}
function f_guiToaDoTu_dtdt(lst) {
    try {

        var lstObj = [];
        $.each(lst, function (key, val) {
            var cot = {
                Cot1: val.id,
                Cot2: "0",
                Cot3: "0",
                Cot4: "",
                Cot5: "TOADO",
                Cot6: "TU",
                Cot7: "TUCTHOI",
                Cot8: (key + 1),
                Cot9: "DIEUKHIEN"
            }
            lstObj.push(cot);
        });
        return lstObj;
    } catch (e) {
        console.log(e);
    }

}
