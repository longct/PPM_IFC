var datasualtbsx = "";
$(document).ready(function () {
    try {

        $("#btn_checkluu_suastbi").click(function () {
            if ($("#txt_tentbi_suastbi").val() == "") {
                messInfo("messinfo_suastbi", "Tên nhà sản xuất khong được bỏ trống", "error");
                return;
            }
            capnhatnhaploathietbi();
           
        });
   
    } catch (e) {
        console.log(e);
    }

});

function loadsuanhaloaitbi_sua(val) {
    try {
        datasualtbsx = val;
        var config = { namesql: "IDTB_TBNhaploaitb", callback: "f_result_loadsuanhaloaitbi_sua", connstr: "ConnectEMS" };
        var para = {
            ID : val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadsuanhaloaitbi_sua(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        console.log(data);
        $("#txt_tentbi_suastbi").val(data[0].typedevicename);
        $("#cbchitietsoluong_sualtbi").val(data[0].typedetailorcount);
    } catch (e) {
        console.log(e);
    }
}
function capnhatnhaploathietbi() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "IDTB_CAPNHALOAITHBI", callback: "f_result_capnhatnhaploathietbi", connstr: "ConnectEMS" };
        var para = {
            ID: datasualtbsx,
            TEN: p.txt_tentbi_suastbi,
            TypeDetailOrCount: p.cbchitietsoluong_sualtbi
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatnhaploathietbi(config, para, lst) {
    try{
        var data = lst.data;
    
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suastbi", row, "ok");
            loaddatabase_tinhapltb();
        } else {
            messInfo("messinfo_suastbi", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}


