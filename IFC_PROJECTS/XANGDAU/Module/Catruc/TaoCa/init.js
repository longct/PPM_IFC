var countPage = 10;
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        loadthoitruc();
        loaddanhsachcatruc();
        $("#btn_catruc").click(function () {
            var check = chekckdieukien();
            if (check != "") {
                messInfo("messinfo_themcatruc", check, "error");
                return;
            }
            messInfo("messinfo_themcatruc", "", "error");
            f_confimYesNo("Bạn chắc chắn muốn thêm ", "Bỏ qua", "Xác nhận", function () {
                capnhapcatruc();
            });
           
        });
    } catch (e) {
        console.log(e);
    }
});

function f_loadChangeTree()
{
    loaddanhsachcatruc();
}

// do giua lieu vao combox
function loadthoitruc() {
    try{
        var config = { namesql: "PKG_CAKIP.THOIGIANTRUC", callback: "f_result_loadthoitruc", connstr: "ConnOracleXangDau" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthoitruc(config, para, lst) {
    try{
        var data = lst.data;
    
        dataToCob("cbthoigianbd_catruc", data, "time", "time");
        dataToCob("cbthoigiankt_catruc", data, "time", "time");
    } catch (e) {
        console.log(e);
    }
}
// load danh sach ca truc
function loaddanhsachcatruc() {
    try{
        var config = { namesql: "PKG_CAKIP.LOADCATRUC", callback: "f_result_loaddanhsachcatruc", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = { v_matram: infotree.code };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsachcatruc(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data.length == 0 || data == null) {
            messInfo("messinfo_themcatruc", "Không có dữ liệu hiển thị", "error");
            $("#table_catruc").empty();
            return;
        }
        messInfo("messinfo_themcatruc", "", "error");
        tableloaddanhsachcatruc(data);
    } catch (e) {
        console.log(e);
    }
}
function tableloaddanhsachcatruc(data) {
    try {
        $("#table_catruc").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tenca + "</td><td>"
                + val.giobatdau + "</td><td>"
                + val.gioketthuc + "</td><td>"
                + val.tentram + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-danger btn-action' data-toggle='modal' href='#confimYesNo' value='" + val.id_maca + "' id='btn_catruc" + val.id_maca + "'><i class='fa fa-trash-o'></i>Xóa</a></div></form></td> </tr>";

            $("#table_catruc").append(row);
           
            $("#btn_catruc" + val.id_maca).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn xóa", "Bỏ qua", "Xác nhận", function () {
                    load_xoacatruc(val.id_maca);
                });
            });

        });

    } catch (e) {
        console.log(e);
    }
}
// cap nhat cac ca truc 
function capnhapcatruc() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_CAKIP.CAPNHATCATRUC", callback: "f_result_capnhatcatrucdata", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_maid: '',
            v_matram: infotree.code,
            v_catruc: p.cbca_catruc,
            v_thoigianbd: p.cbthoigianbd_catruc,
            v_thoigiankt: p.cbthoigiankt_catruc,
            v_type: "CREATE"
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatcatrucdata(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_themcatruc", row, "ok");
            var p = getAllIdMod();
            var thoigiankt = p.cbthoigiankt_catruc;
            setValToTxt("cbthoigianbd_catruc", thoigiankt);
            loaddanhsachcatruc();
            setTimeout(function () { messInfo("messinfo_themcatruc", "", "ok");}, 4000);
             
        } else {
            messInfo("messinfo_themcatruc", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function chekckdieukien() {
    try{
        var p = getAllIdMod();
        var thoigianbd = p.cbthoigianbd_catruc;
        var thoigiankt = p.cbthoigiankt_catruc;
        var datasetbd = thoigianbd.replace(/\:/g, "");
        var datasetkt = thoigiankt.replace(/\:/g, "");
        if (p.cbca_catruc == "") return "Tên Ca không được để trống";
        //if (datasetbd > datasetkt) return "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc";
        if (datasetbd == datasetkt)  return "Thời gian bắt đầu không được bằng thời gian kết thúc";
        
        return "";    
    } catch (e) {
        console.log(e);
    }
}

function load_xoacatruc(val) {
    try{
        var p = getAllIdMod();
        var config = { namesql: "PKG_CAKIP.CAPNHATCATRUC", callback: "f_result_xoacatrucdata", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_maid:val,
            v_matram: '',
            v_catruc: '',
            v_thoigianbd: '',
            v_thoigiankt: '',
            v_type: "DELETE"
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoacatrucdata(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_themcatruc", row, "ok");
            loaddanhsachcatruc();
            setTimeout(function () {messInfo("messinfo_themcatruc", "", "ok");}, 4000);
        } else {
            messInfo("messinfo_themcatruc", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}


