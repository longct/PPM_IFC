
$(document).ready(function () {
    try {
        setTitle("Thiết lập danh mục lỗi");
        loadgiaiphap();
        loadhethong();
        loaddanhmucloi();


        $("#btn_thietlap_tldmloi").change(function () {
            if (this.val() != -2) {
                $('#table_dm_hethong ').html()
            }
        });
        //--------------------------------------------------------------
        $('#cb_danhmucloi').change(function () {
            var ele = getAllIdMod();
            load_loailoi(ele.cb_danhmucloi);
        });
        //--------------------------------------------------------------
        $('#cb_hethong').change(function () {
            $('#txt_mahethong').prop('disabled', false);
            if ($('#cb_hethong').val() == -1) {
                $('#txt_mahethong').val("");
                $('#txt_tenhethong').val("");
            }
            else if ($('#cb_hethong').val() == -2) {
                $('#txt_mahethong').val("");
                $('#txt_tenhethong').val("");
            }
            else {
                $('#txt_mahethong').prop('disabled', true);
                $('#txt_mahethong').val($('#cb_hethong').val());
                $('#txt_tenhethong').val($('#cb_hethong :selected').text());
            }

        });
        //--------------------------------------------------------------
        $('#cb_giaiphap').change(function () {
            $('#txt_magiaiphap').prop('disabled', false);
            if ($('#cb_giaiphap').val() == -1) {
                $('#txt_magiaiphap').val("");
                $('#txt_tengiaiphap').val("");
            }
            else if ($('#cb_giaiphap').val() == -2) {
                $('#txt_magiaiphap').val("");
                $('#txt_tengiaiphap').val("");
            }
            else {
                $('#txt_magiaiphap').prop('disabled', true);
                $('#txt_magiaiphap').val($('#cb_giaiphap').val());
                $('#txt_tengiaiphap').val($('#cb_giaiphap :selected').text());
            }

        });
        //--------------------------------------------------------------
        $('#cb_loailoi').change(function () {
            $('#txt_maloi').prop('disabled', false);
            if ($('#cb_loailoi').val() == -1) {
                $('#txt_maloi').val("");
                $('#txt_tenloi').val("");
            }
            else if ($('#cb_loailoi').val() == -2) {
                $('#txt_maloi').val("");
                $('#txt_tenloi').val("");
            }
            else {
                $('#txt_maloi').prop('disabled', true);
                $('#txt_maloi').val($('#cb_loailoi').val());
                $('#txt_tenloi').val($('#cb_loailoi :selected').text());
            }

        });
        //--------------------------------------------------------------
        $('#btn_xoahethong').click(function () {
            var ele = getAllIdMod();
            if (ele.txt_mahethong == '' || ele.txt_mahethong == '') {
                messInfo("messinfo", 'Vui lòng nhập đầy đủ thông tin', "error");
                return;
            }
            f_confimYesNoXoa("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () {
                f_xoa_tudien("LOAI_HETHONG", ele.txt_mahethong);
            });
        });
        $('#btn_luu_hethong').click(function () {
            var ele = getAllIdMod();
            if (ele.txt_mahethong == '' || ele.txt_tenhethong == '') {
                messInfo("messinfo", 'Vui lòng nhập đầy đủ thông tin', "error");
                return;
            }
            if ($('#cb_hethong').val() == -2)
                f_confimYesNoXoa("Thêm hệ thống mới?", "Bỏ qua", "Đồng ý", function () {
                    f_them_tudien("LOAI_HETHONG", ele.txt_mahethong, ele.txt_tenhethong);
                });
            if ($('#cb_hethong').val() != -2 && $('#cb_hethong').val() != -1) {
                f_confimYesNoXoa("Sửa thông tin hệ thống?", "Bỏ qua", "Đồng ý", function () {
                    f_sua_tudien("LOAI_HETHONG", ele.txt_mahethong, ele.txt_tenhethong);
                });
            }

        });
        //-------------------------------------------------------------
        $('#btn_xoa_loi').click(function () {
            var ele = getAllIdMod();
            f_confimYesNoXoa("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () {
                f_xoa_tudien(ele.cb_danhmucloi, ele.txt_maloi);
            });
        });
        $('#btn_luu_loi').click(function () {
            var ele = getAllIdMod();
            if ($('#cb_loailoi').val() == -2)
                f_confimYesNoXoa("Thêm hệ thống mới?", "Bỏ qua", "Đồng ý", function () {
                    f_them_tudien(ele.cb_danhmucloi, ele.txt_maloi,ele.txt_tenloi);
                });
            if ($('#cb_loailoi').val() != -2 && $('#cb_loailoi').val() != -1) {
                f_confimYesNoXoa("Sửa thông tin hệ thống?", "Bỏ qua", "Đồng ý", function () {
                    f_sua_tudien(ele.cb_danhmucloi, ele.txt_maloi, ele.txt_tenloi);
                });
            }

        });
        //--------------------------------------------------------------
        $('#btn_xoa_thunghiem').click(function () {
            var ele = getAllIdMod();
            if (ele.txt_magiaiphap == '' || ele.txt_tengiaiphap == '') {
                messInfo("messinfo", 'Vui lòng nhập đầy đủ thông tin', "error");
                return;
            }
            f_confimYesNoXoa("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () {
                f_xoa_tudien("LOAI_THUNGHIEM", ele.txt_magiaiphap);
            });
        });
        $('#btn_luu_thunghiem').click(function () {
            var ele = getAllIdMod();
            if (ele.txt_magiaiphap == '' || ele.txt_tengiaiphap == '') {
                messInfo("messinfo", 'Vui lòng nhập đầy đủ thông tin', "error");
                return;
            }
            if ($('#cb_giaiphap').val() == -2)
                f_confimYesNoXoa("Thêm hệ thống mới?", "Bỏ qua", "Đồng ý", function () {
                    f_them_tudien("LOAI_THUNGHIEM", ele.txt_magiaiphap, ele.txt_tengiaiphap);
                });
            if ($('#cb_giaiphap').val() != -2 && $('#cb_giaiphap').val() != -1) {
                f_confimYesNoXoa("Sửa thông tin hệ thống?", "Bỏ qua", "Đồng ý", function () {
                    f_sua_tudien("LOAI_THUNGHIEM", ele.txt_magiaiphap, ele.txt_tengiaiphap);
                });
            }

        });
        //--------------------------------------------------------------
    } catch (e) {
        console.log(e);
    }

});

//----------------------------------------------------------------
function loadhethong() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_DANHMUCLOI.LoadHeThong", callback: "result_loadhethong", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadhethong(config, para, lst) {

    try {
        var data = lst.data;
        console.log(data)
        dataToCob("cb_hethong", data, "matudien", "tentudien", "-1", "-- Chọn hệ thống --");
        $('#cb_hethong').append("<option value='-2'>-- Thêm mới --</option>");
        $('#txt_mahethong').val("");
        $('#txt_tenhethong').val("");
    } catch (e) {
        console.log(e);
    }
}
//----------------------------------------------------------------
function loadgiaiphap() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_DANHMUCLOI.LoadGiaiPhap", callback: "result_loadgiaiphap", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadgiaiphap(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_giaiphap", data, "matudien", "tentudien", "-1", "--Chọn giải pháp--");
        $('#cb_giaiphap').append("<option value='-2'>-- Thêm mới --</option>")
        $('#txt_magiaiphap').val("");
        $('#txt_tengiaiphap').val("");
    } catch (e) {
        console.log(e);
    }
}
//----------------------------------------------------------------
function loaddanhmucloi() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_DANHMUCLOI.LoadLoaiLoi", callback: "result_loaddanhmucloi", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loaddanhmucloi(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_danhmucloi", data, "maloai", "tenloai", "-1", "--Chọn loại lỗi--");
        $('#txt_maloi').val("");
        $('#txt_tenloi').val("");
    } catch (e) {
        console.log(e);
    }
}
//----------------------------------------------------------------
function load_loailoi(v_LoaiLoi) {
    try {
        console.log(v_LoaiLoi);
        var p = getAllIdMod();
        var config = { namesql: "PKG_DANHMUCLOI.LoadChiTietLoi", callback: "result_load_chitiet", connstr: "Oracle_AmosiDefault" };
        var para = {
            v_LoaiLoi: v_LoaiLoi
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_load_chitiet(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        dataToCob("cb_loailoi", data, "matudien", "tentudien", "-1", "--Chọn loại lỗi--");
        $('#cb_loailoi').append("<option value='-2'>-- Thêm mới --</option>")
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------------------
function f_xoa_tudien(v_loaitudien, v_matudien_old) {
    try {
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DANHMUCLOI.them_sua_xoa_tudien", callback: "result_Xoa_tudien" };
        var para = {
            v_action: 'DEL',
            v_matudien_old: v_matudien_old,
            v_loaitudien: v_loaitudien,
            v_matudien_new: '',
            v_tentudien_new: '',
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_Xoa_tudien(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data != null && data[0].result == "ok") {
            messInfo("messinfo", 'Xóa thành công', "ok");
            f_load_again(para.v_loaitudien);
        } else {
            messInfo("messinfo", 'Xóa không thành công :' + data[0].result, "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function f_them_tudien(v_loaitudien, v_matudien_new, v_tentudien_new) {
    try {
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DANHMUCLOI.them_sua_xoa_tudien", callback: "result_them_tudien" };
        var para = {
            v_action: 'ADD',
            v_matudien_old: '',
            v_loaitudien: v_loaitudien,
            v_matudien_new: v_matudien_new,
            v_tentudien_new: v_tentudien_new,
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_them_tudien(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data != null && data[0].result == "ok") {
            messInfo("messinfo", 'Thêm mới thành công', "ok");
            f_load_again(para.v_loaitudien);
        }
        else {
            messInfo("messinfo", 'Sửa không thành công :' + data[0].result, "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function f_sua_tudien(v_loaitudien, v_matudien_old, v_tentudien_new) {
    try {
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DANHMUCLOI.them_sua_xoa_tudien", callback: "result_sua" };
        var para = {
            v_action: 'EDIT',
            v_matudien_old: v_matudien_old,
            v_loaitudien: v_loaitudien,
            v_matudien_new: '',
            v_tentudien_new: v_tentudien_new,
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_sua(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data != null && data[0].result == "ok") {
            messInfo("messinfo", 'Sửa thành công', "ok");
            f_load_again(para.v_loaitudien);
        }
        else {
            messInfo("messinfo", 'Sửa không thành công :' + data[0].result, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------------------
function f_load_again(combo) {
    switch (combo) {
        case "LOAI_HETHONG":
            loadhethong();
            break;
        case "LOAI_THUNGHIEM":
            loadgiaiphap();
            break;
        default:
            var ele = getAllIdMod();
            load_loailoi(ele.cb_danhmucloi);
            break;
    }
}