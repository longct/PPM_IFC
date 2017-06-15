$(document).ready(function () {
    selectlang();
    initformelement();
    loadContent();
});
function f_loadListdiemdoloi(inday, type, code) {
    try {
        var v_Type = type;
        var v_Value = code.split('_')[1];
        var v_InDay = inday

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_LOIDIEMDO.Get_diemdoloi", callback: "f_result_Get_diemdoloi" };
        var para = {
            v_Type: v_Type,
            v_Value: v_Value,
            v_InDay: v_InDay
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_Get_diemdoloi(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        //console.log(data);
        if (data.length == 0) return;
        $('#tblDanhsach_diemdoloi tbody').html('');
        $.each(data, function (idx, item) {
            var tr = "";
            tr = "<tr>"
           + "<td class='a_c'>" + (idx + 1) + "</td>"
           + "<td>" + item.tendiemdo + "</td>"
           + "<td class='a_c'>" + item.madiemdo + "</td>"
           + "<td class='a_c'>" + item.imei + "</td>"
           + "<td class='a_c'>" + item.socongto + "</td>"
           + "</tr>";

            $('#tblDanhsach_diemdoloi tbody').append(tr);
        });
    }
    catch (e) {
        console.log(e.message);
    }

}