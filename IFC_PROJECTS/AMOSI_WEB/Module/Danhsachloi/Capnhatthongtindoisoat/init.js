var dataExcel = '';
$(document).ready(function () {
    try {
        loadInitDate();

        setValToTxt("tungay_tkt", gettimenow());
        setValToTxt("denngay_tkt", gettimenow());
    } catch (e) {
        console.log(e);
    }

    $("#btn_execl_tkt").click(function () {
        var check = checkvalidate();
        if (check != "") {
            messInfo("messinfo_thembong", check, "error");
            return;
        }
        f_UploadFile_xuatexcel();
        f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
            CapnhatKetQuaXuLy();
        });


    });
});

function checkvalidate() {
    try {
        var d = $('table#table_upketquaxuly table tbody tr').length;
        if (d == 0) return "Invalid data";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function f_UploadFile_xuatexcel() {
    try {
        messInfo("messinfo_themChiTietXuLy", '', "ok");

        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("uploadexcel_nhapketquadiemdo").files[0];

        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_xuatexcel", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_xuatexcel" };

        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_xuatexcel(config, para, lst) {
    try {
        var data = lst.data;
        dataExcel = data;
        $("#table_upketquaxuly").empty();
        $.makeTable = function (data) {
            var table = $('<table class="table table-responsive table-bordered">');
            var rowth = "<thead><tr>";
            for (var titile in data[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
            rowth += "</tr></thead>";
            $(rowth).appendTo(table);
            $.each(data, function (index, value) {
                var row = "<tr>";
                $.each(value, function (key, val) {
                    row += "<td>" + val + "</td>";
                });
                row += "</tr>";
                $(table).append(row);
            });
            return ($(table));
        };
        var table = $.makeTable(data);
        $(table).appendTo("#table_upketquaxuly");

    } catch (e) {
        console.log(e);
    }
}

function CapnhatKetQuaXuLy() {
    try {
        var lstId = [];
        var data = dataExcel;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if (data[i].socongto != null && data[i].madiemdo != null && data[i].imei != null) {
                var ID = {
                    imei: data[i].imei,
                    madiemdo: data[i].madiemdo,
                    socongto: data[i].socongto,
                    tenkhachhang: data[i].tenkhachhang,
                    dienluc: data[i].dienluc,
                    congtydienluc: data[i].congtydienluc,
                    trangthai: data[i].trangthai,
                };
                lstId.push(ID);
            } else {
                //themChiTietXuLy(data[i]);
                messInfo("messinfo_themChiTietXuLy", 'File của bạn chưa đúng', "error");
                return;
            }
        }


        var config = {
            connstr: "Oracle_AmosiDefault", insertto: "TEMP_DATA_DOISOAT",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
            capNhatThongTinDoiSoat();
        }
        else {
            messInfo("messinfo_themChiTietXuLy", 'Lỗi cập nhật thông tin đối soát', "error");
        }
        console.log(lst);
    } catch (e) {
        console.log(e);
    }
}

function capNhatThongTinDoiSoat() {
    try {
        var p = getAllIdMod();
        //var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DOISOAT.CAPNHATDOISOAT", callback: "result_capnhatthongtindoisoat" };
        var para = {
            //v_userid: userinfo.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_capnhatthongtindoisoat(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].result;
        if (row.indexOf("ok") > 0) {
            messInfo("messinfo_capnhat", "Cập nhật thành công", "ok");
        } else {
            messInfo("messinfo_capnhat", "Cập nhật thất bại", "error");
        }

    } catch (e) {
        console.log(e);
    }
}

function f_result_themChiTietXuLy(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("1") > 0) {
            messInfo("messinfo_themChiTietXuLy", row, "ok");
        } else {
            messInfo("messinfo_themChiTietXuLy", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}

function themChiTietXuLy(datai) {
    try {
        var config = { namesql: "PKG_XULYLOI.ImportXuLyLoi", callback: "f_result_themChiTietXuLy", connstr: f_getConnStrDonVi() };
        var para = {
            imei: datai.imei,
            madiemdo: datai.madiemdo,
            socongto: datai.socongto,
            tenkhachhang: datai.tenkhachhang,
            theolhd: 1,
            tinhtrangtruocxuly: datai.tinhtrangtruocxuly,
            cachxuly: datai.cachxuly,
            imeimoi: datai.imeimoi,
            maloi: datai.maloi,
            ketquaxuly: datai.ketquaxuly,
            ngayxuly: datai.ngayxuly
        };
        console.log('themChiTietXuLy************************');
        console.log(config, para);
        console.log('themChiTietXuLy************************end');
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}