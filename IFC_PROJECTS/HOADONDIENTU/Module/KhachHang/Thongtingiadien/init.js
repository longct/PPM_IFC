$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        Loadthongtingiadien();

    } catch (e) {
        console.log(e);
    }

});
function Loadthongtingiadien() {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THONGTINGIADIEN.LDGIADIEN", callback: "result_Loadthongtingiadien" };
        var para = [];

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_Loadthongtingiadien(config, para, lst) {
    try{
        var data = lst.data;
        $("#table_thongtingiadt").empty();
        var cap = "cap1";
    

        $.each(data, function (key, val) {
            cap = (val.code_nhom.length == 2) ? "cap1" : (val.code_nhom.length == 4) ? "cap2" : (val.code_nhom.length == 6) ? "cap3" : "cap4";
            var row = "";
            row += "<tr ><td>"
                + key + "</td><td class='" + cap + " lop'>"
                + ten(tennhom(data, val.tennhom), nhomtt(data, val.mabcs)) + "</td><td>"
                + setnull(val.dongia) + "</td></tr";
            $("#table_thongtingiadt").append(row);
        });

   

    } catch (e) {
        console.log(e);
    }
}
function tennhom(data,tennhom) {
    try{
        var tennhoma = '';
    
        for (var i = 0; i < data.length - 1; i++) {
            if (tennhom[i + 1] == tennhom[i]) {
                tennhoma = tennhom;
            }
        }
        return tennhoma;
    } catch (e) {
        console.log(e);
    }
}
function nhomtt(data, tennhom) {
    try {
        var tennhoma = '';
        if (tennhom == null || tennhom == "") {
            return "";
        } else {
            for (var i = 0; i < data.length - 1; i++) {
                if (tennhom[i + 1] == tennhom[i]) {
                    tennhoma = tennhom;
                }
            }
        }
        return tennhoma;
    } catch (e) {
        console.log(e);
    }
}
function ten(tennhom, nhomtt) {
    try{
        if (nhomtt == "" || nhomtt == null) {
            return tennhom;
        } if (nhomtt === tennhom) {
            return tennhom;
        } else {
            return (tennhom + "-" + nhomtt);
        }

    } catch (e) {
        console.log(e);
    }
}



