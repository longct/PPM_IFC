$(document).ready(function () {
    try {
        loadConetent();
        loadchecklog_master();
        loadcbthietlap();
        $("#cbchon_tlcb").change(function () {
            var p = getAllIdMod();
            var val = p.cbchon_tlcb;
            localStorage.setItem("txtidthietlap", val);
            if (val == "-1") {
                clearnullthemmoi();
            } else {
                $('#txt_tencauhinh_tlcb').val($("#cbchon_tlcb option:selected").text())
                loadthongtinIdthietlap(val);
            }
        });
        //xóa thông tin
        $("#btn_xoach_tlcb").click(function () {
            f_confimYesNo("Bạn chắc chắn muốn xóa bỏ thiết lập này ", "Bỏ qua", "Xác nhận", function () {
                Xoathongtin();
            });
        });

        // thêm 
        $("#btn_checkluu_tlcb").click(function () {
            var p = getAllIdMod();
            var val = p.cbchon_tlcb;
            if (val == "-1") {
                var check = checkvalidate_tlcb();
                if (check != "") {
                    messInfo("messinfo_tlcb", check, "error");
                    return;
                }
                messInfo("messinfo_tlcb", "", "ok");
                f_confimYesNo("Bạn chắc chắn muốn thêm ", "Bỏ qua", "Xác nhận", function () {
                    capnhat_tlcb();
                });
            } else {
                var val = localStorage.getItem("txtidthietlap");
                f_confimYesNo("Bạn chắc chắn muốn cập nhật ", "Bỏ qua", "Xác nhận", function () {
                    Capnhathongtin_tkl(val);
                });

            }



        });
        // apdung cấu hình 
        $("#btn_apdungC_tlcb").click(function () {
            var id = localStorage.getItem("txtidthietlap");
            var p = getAllIdMod();
            var val = p.cbchon_tlcb;
            if (val == "-1") {
                messInfo("messinfo_tlcb", 'Bạn chưa chọn cấu hình áp dụng thiết lập cảnh báo', "error");
            } else {

                f_confimYesNo("Bạn chắc chắn muốn áp dụng cấu hình", "Bỏ qua", "Xác nhận", function () {
                    apdungcauhinh(id);
                });
            }
        });

    } catch (e) {
        console.log(e);
    }

});
function checkvalidate_tlcb() {
    try {
        var p = getAllIdMod();
        if (p.txt_tencauhinh_tlcb == "") return "Tên cảnh báo không được bỏ trống";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function capnhat_tlcb() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_THIETLAPCANHBAO.CREATE_UPDATE_DELETE_CAUHINH", callback: "f_result_capnhacanhbao_tl", connstr: "ConnectOracleStreetLight" };
        var p = getAllIdMod();
        var para = {
            v_USERID: userinfo.idnhanvien,
            V_ACTION: 'CREATE',
            v_ID: "",
            v_UA_TREN: p.txt_UATren,
            v_UB_TREN: p.txt_UBTren,
            v_UC_TREN: p.txt_UCTren,
            v_IA_TREN: p.txt_IATren,
            v_IB_TREN: p.txt_IBTren,
            v_IC_TREN: p.txt_ICTren,
            v_UA_DUOI: p.txt_UADuoi,
            v_UB_DUOI: p.txt_UBDuoi,
            v_UC_DUOI: p.txt_UCDuoi,
            v_IA_DUOI: p.txt_IADuoi,
            v_IB_DUOI: p.txt_IBDuoi,
            v_IC_DUOI: p.txt_ICDuoi,
            v_name: p.txt_tencauhinh_tlcb,
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhacanhbao_tl(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tlcb", row, "ok");
            setTimeout(function () {
                clearnullthemmoi();
                loadcbthietlap();
            }, 1000);
        } else {
            messInfo("messinfo_tlcb", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function Capnhathongtin_tkl(val) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_THIETLAPCANHBAO.CREATE_UPDATE_DELETE_CAUHINH", callback: "f_result_capnhacanhbao_tl", connstr: "ConnectOracleStreetLight" };
        var p = getAllIdMod();
        var para = {
            v_USERID: userinfo.idnhanvien,
            V_ACTION: 'UPDATE',
            v_ID: val,
            v_UA_TREN: p.txt_UATren,
            v_UB_TREN: p.txt_UBTren,
            v_UC_TREN: p.txt_UCTren,
            v_IA_TREN: p.txt_IATren,
            v_IB_TREN: p.txt_IBTren,
            v_IC_TREN: p.txt_ICTren,
            v_UA_DUOI: p.txt_UADuoi,
            v_UB_DUOI: p.txt_UBDuoi,
            v_UC_DUOI: p.txt_UCDuoi,
            v_IA_DUOI: p.txt_IADuoi,
            v_IB_DUOI: p.txt_IBDuoi,
            v_IC_DUOI: p.txt_ICDuoi,
            v_name: p.txt_tencauhinh_tlcb,
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}





function clearnullthemmoi() {
    $('#txt_UATren').val("");
    $('#txt_UBTren').val("");
    $('#txt_UCTren').val("");
    $('#txt_IATren').val("");
    $('#txt_IBTren').val("");
    $('#txt_ICTren').val("");
    $('#txt_UADuoi').val("");
    $('#txt_UBDuoi').val("");
    $('#txt_UCDuoi').val("");
    $('#txt_IADuoi').val("");
    $('#txt_IBDuoi').val("");
    $('#txt_ICDuoi').val("");
}
function loadcbthietlap() {
    try {
        var config = { namesql: "PKG_THIETLAPCANHBAO.LSTLOADPROFILE2", callback: "f_result_lstloadthietlap", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstloadthietlap(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbchon_tlcb", data, "id", "name", "-1", "TẠO CẤU HÌNH MỚI");
    } catch (e) {
        console.log(e);
    }
}
// hien thi thong tin load
function loadthongtinIdthietlap(val) {
    try {
        var config = { namesql: "PKG_THIETLAPCANHBAO.LOAD_CB2", callback: "f_result_loadthongtinIdthietlap", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_ID: val
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtinIdthietlap(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        $('#txt_UATren').val(data[0].ua_tren);
        $('#txt_UBTren').val(data[0].ub_tren);
        $('#txt_UCTren').val(data[0].uc_tren);
        $('#txt_IATren').val(data[0].ia_tren);
        $('#txt_IBTren').val(data[0].ib_tren);
        $('#txt_ICTren').val(data[0].ic_tren);
        $('#txt_UADuoi').val(data[0].ua_duoi);
        $('#txt_UBDuoi').val(data[0].ub_duoi);
        $('#txt_UCDuoi').val(data[0].uc_duoi);
        $('#txt_IADuoi').val(data[0].ia_duoi);
        $('#txt_IBDuoi').val(data[0].ib_duoi);
        $('#txt_ICDuoi').val(data[0].ic_duoi);
    } catch (e) {
        console.log(e);
    }
}
// xoa thong tin thiet lập
function Xoathongtin() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var val = localStorage.getItem("txtidthietlap");
        var config = { namesql: "PKG_THIETLAPCANHBAO.CREATE_UPDATE_DELETE_CAUHINH", callback: "f_result_xoathongtinthietlap", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_USERID:"",
            V_ACTION: 'DELETE',
            v_ID: val,
            v_UA_TREN: "",
            v_UB_TREN: "",
            v_UC_TREN: "",
            v_IA_TREN: "",
            v_IB_TREN: "",
            v_IC_TREN: "",
            v_UA_DUOI: "",
            v_UB_DUOI: "",
            v_UC_DUOI: "",
            v_IA_DUOI: "",
            v_IB_DUOI: "",
            v_IC_DUOI: "",
            v_name: "",
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoathongtinthietlap(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tlcb", row, "ok");
            setTimeout(function () {
                clearnullthemmoi();
            }, 1000);
            loadcbthietlap();
        } else {
            messInfo("messinfo_tlcb", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function apdungcauhinh(id) {
    try {

        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_THIETLAPCANHBAO.LOADAPDUNG", callback: "f_result_apdungcauhinh", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_meter: '',
            v_PROFILEID: id,
            v_Edit: '',
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_apdungcauhinh(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tlcb", row, "ok");
            setTimeout(function () { messInfo("messinfo_tlcb", '', "ok"); }, 3000);
        } else {
            messInfo("messinfo_tlcb", row, "error");
        }
    } catch (e) {
        console.log();
    }
}