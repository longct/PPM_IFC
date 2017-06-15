var dataExcel = '';
$(document).ready(function () {
    try {
        setTitle("Cập nhật lỗi điểm đo");
        //loadInitDate();
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
        //messInfo("messinfo_themChiTietXuLy", '', "ok");

        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("uploadexcel_nhapketquadiemdo").files[0];

        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_capnhat", "Bạn chưa chọn file execl", "error");
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
            var rowth = "<thead>" +
                    "<tr>" +
                        "<th>STT</th>" +
                        "<th>Meterid</th>" +
                        "<th>Mã điểm đo</th>" +
                        "<th>Dự án</th>" +
                        "<th>Loại lỗi</th>" +
                        "<th>Chi tiết lỗi</th>" +
                        "<th>Ngày lỗi</th>" +
                        "<th>Trạng thái xử lý</th>" +
                        "<th>Ngày xử lý</th>" +
                        "<th>Kết quả xử lý</th>" +
                        "<th>Người xử lý</th>" +
                        "<th>Ngày tạo</th>" +
                        "<th>Ghi chú</th>" +
                    "</tr>" +

                "</thead>"
            //var rowth = "<thead><tr>";
            //for (var titile in data[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
            //rowth += "</tr></thead>";
            $(rowth).appendTo(table);
            $.each(data, function (index, value) {
                var row = "<tr>";
                $.each(value, function (key, val) {
                    if(key=="ngayloi" || key=="ngayxuly" || key=="ngaytao")
                        row += "<td>" + formatDate(val) + "</td>";
                    else
                        row += "<td>" + setnull(val) + "</td>";
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
            if (data[i].meterid != null && data[i].madiemdo != null && data[i].maduan != null) {
                var ID = {
                    meterid: data[i].meterid,
                    madiemdo: data[i].madiemdo,
                    maduan: data[i].maduan,
                    loailoi: data[i].loailoi,
                    chitietloi: data[i].chitietloi,
                    ngayloi: formatDate(data[i].ngayloi),
                    trangthaixuly: data[i].trangthaixuly,
                    ngayxuly: formatDate(data[i].ngayxuly),
                    ketquaxuly: data[i].ketquaxuly,
                    nguoixuly: data[i].nguoixuly,
                    ngaytao: formatDate(data[i].ngaytao),
                    ghichu: data[i].ghichu,
                };
                lstId.push(ID);
            } else {
                messInfo("messinfo_capnhat", 'File của bạn chưa đúng', "error");
                return;
            }
        }

        var config = {
            connstr: "Oracle_AmosiDefault", insertto: "TEMP_DATA_LOIDIEMDO",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
            capNhatThongTin();
        }
        else {
            messInfo("messinfo_capnhat", 'Lỗi cập nhật thông tin lỗi điểm đo', "error");
        }
        console.log(lst);
    } catch (e) {
        console.log(e);
    }
}

function capNhatThongTin() {
    try {
        var p = getAllIdMod();
        //var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DIEMDO.CAPNHATLOIDD_EXCEL", callback: "result_capnhatthongtin" };
        var para = {
            //v_userid: userinfo.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_capnhatthongtin(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].result;
        if (row.indexOf("ok") == 0) {
            messInfo("messinfo_capnhat", "Cập nhật thành công", "ok");
        } else {
            messInfo("messinfo_capnhat", "Cập nhật thất bại", "error");
        }

    } catch (e) {
        console.log(e);
    }
}

function formatDate(value) { 
    try {
        //if (value != null || value != "") {
        if (value != null) {
            var newdate = new Date(value);
            var dd = newdate.getDate();
            var mm = newdate.getMonth() + 1;
            var y = newdate.getFullYear();

            var someFormattedDate = (dd.toString().length == 1 ? "0" + dd : dd) + "/" + (mm.toString().length == 1 ? "0" + mm : mm) + "/" + y;
            return someFormattedDate;
        } else
            return "";
    } catch (e) {
        console.log(e);
    }
}