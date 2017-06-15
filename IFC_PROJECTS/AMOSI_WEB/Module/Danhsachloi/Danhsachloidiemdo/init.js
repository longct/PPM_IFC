var manggiatri = [];
var countpage = 20;
$(document).ready(function () {
    try {
        setTitle("Danh sách lỗi điểm đo");
        loadConetent();
        loadInitDate();
        LoadDuAn();
        LoadComboDonvi();
        //LoadDonVi();
        setValToTxt("txt_tungay", gettimenow());
        setValToTxt("txt_denngay", gettimenow());
        LoadLoaiLoi();
        LoadChiTietLoi($("#cb_loailoi").val());

        $("#btn_laydulieu").click(function () {
            laydulieu(1);
        });

        $("#btn_xuatfileexcel").click(function () {
            if (manggiatri.length > 0 || (manggiatri.data && manggiatri.data.length>0))
                XuatExcel_ldd();
            else {
                messInfo("messinfo_ldd", "Không có dữ liệu để thực hiện", "error");
                return;
            }
        });

        $("#cb_loailoi").change(function () {
            LoadChiTietLoi($("#cb_loailoi").val());
        });
        
    } catch (e) {
        console.log(e);
    }

});

//function LoadDonVi() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "PKG_BAOCAOHETHONG.LoadDonVi", callback: "result_loaddonvi", connstr: "Oracle_AmosiDefault" };
//        var para = {};
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function result_loaddonvi(config, para, lst) {
//    try {
//        var data = lst.data;
//        dataToCob("cb_donvi", data, "code", "tendanhmuc", "-1", "--Chọn đơn vị--");
//    } catch (e) {
//        console.log(e);
//    }
//}

function LoadComboDonvi() {
    try {
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.GetComboDonvi", callback: "f_result_LoadComboDonvi" };
        var para = {
            v_Code: "",
            v_lenCode: 4
        };
        if (sessionStorage.getItem("combodonvi") != null && sessionStorage.getItem("combodonvi") != undefined) {
            f_result_LoadComboDonvi(config, para, JSON.parse(sessionStorage.getItem("combodonvi")))
        }
        else
            ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_LoadComboDonvi(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        console.log(data);
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '30px'
            });
            $('#jqxDropDonvi').on('select', function (event) {
                f_ComboDonvi_selected(event);
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.id,
                    "parentid": value.parentid,
                    "text": value.text,
                    "value": value.id
                }
                //console.log(item);
                dt.push(item);

            });
            //console.log(dt);
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id' },
                    { name: 'parentid' },
                    { name: 'text' },
                    { name: 'value' }
                ],
                id: 'id',
                localdata: dt
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
            $('#jqxDropDonvi').jqxTree({ source: records, width: '500px', height: '200px', });
            $('#jqxDropDonvi').jqxTree('selectItem', $("#01")[0]);
        }
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_ComboDonvi_selected() {
    //var args = event.args;
    var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
    //var item = $('#jqxDropDL_home').jqxTree('getItem', args.element);
    var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
    $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
    $('#dropDownButton').jqxDropDownButton('close');
    var code = item.value.split("_")[1];
    var maduan = item.value.split("_")[0];
    //Loadtoado(maduan);
}

function LoadDuAn() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_BAOCAOHETHONG.LOADDUAN", callback: "result_loadduan", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadduan(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_duan", data, "maduan", "tenduan", "-1", "--Chọn dự án--");
    } catch (e) {
        console.log(e);
    }
}

function LoadLoaiLoi() {
    try {
        var config = { namesql: "PKG_DANHMUCLOI.LoadLoaiLoi", callback: "result_loadloailoi", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadloailoi(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_loailoi", data, "maloai", "tenloai", "-1", "--Chọn loại lỗi--");
    } catch (e) {
        console.log(e);
    }
}

function LoadChiTietLoi(value) {
    try {
        var config = { namesql: "PKG_DANHMUCLOI.LoadChiTietLoi", callback: "result_loadchitietloi", connstr: "Oracle_AmosiDefault" };
        var para = {
            v_LoaiLoi: value
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadchitietloi(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_chitietloi", data, "matudien", "tentudien", "-1", "--Chọn chi tiết lỗi--");
    } catch (e) {
        console.log(e);
    }
}

function laydulieu(page) {
    try {
        var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
        if (item == '' || item == null || item == undefined) {
            messInfo("messinfo_ldd", "Không có dữ liệu hiển thị", "error");
            return;
        }
        var code = item.value.split("_")[1];
        var maduan = item.value.split("_")[0];
        var p = getAllIdMod();
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DIEMDO.DANHSACHLOI", callback: "result_laydulieu" };
        var para = {
            //v_donvi: p.cb_donvi,
            v_duan: maduan,
            v_tungay: p.txt_tungay,
            v_denngay: p.txt_denngay,
            v_loailoi: p.cb_loailoi,
            v_chitietloi: p.cb_chitietloi,
            v_trangthaixuly: p.cb_trangthai,
            v_ketquaxuly: p.cb_ketqua,
            v_pagenum: page,
            v_numrecs: countpage
        };
        if (config.connstr == '' || config.connstr == null || config.connstr == undefined) return;
        $("#processing-modal").modal("show");
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function result_laydulieu(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#processing-modal").modal("hide");
            messInfo("messinfo_ldd", "Không có dữ liệu hiển thị", "error");
            clearnull_ttddxl();
            $('#btnXemThem').css('display', 'none');
            return;
        }
        $("#messinfo_ldd").hide();
        $("#table_dsldd").empty();

        manggiatri = lst;

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.maduan + "</td><td>"
                + setnull(val.loailoi) + "</td><td>"
                + setnull(val.chitietloi) + "</td><td>"
                //+ setnull(val.tenloailoi) + "</td><td>"
                //+ setnull(val.tenchitietloi) + "</td><td>"
                + setnull(val.ngayloi) + "</td><td>"
                + setnull(val.trangthaixuly) + "</td><td>"
                + setnull(val.ngayxuly) + "</td><td>"
                + setnull(val.ketquaxuly) + "</td><td>"
                + setnull(val.nguoixuly) + "</td><td>"
                + setnull(val.ngaytao) + "</td><td>"
                + setnull(val.ghichu) + "</td><td>"
                + "<form class='form-inline' role='form'>"
                + "<div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_loidiemdo' value='" + val.id_auto + "' id='btn_sualoidiemdo" + val.id_auto + "'> <i class='fa fa-edit'></i> Sửa</a> &nbsp</div>"
                + "</form></td> </tr>";
            $("#table_dsldd").append(row);

            $("#btn_sualoidiemdo" + val.id_auto).click(function () {
                Idsua = val.id_auto;
                loadloidiemdosuaid(Idsua);

            });
        });
        $("#processing-modal").modal("hide");
        //LoadPhanTrang("pageLst_ttddxl", "pageCurent_ttddxl", data, function () {
        //    laydulieu($("#pagenumber").val());
        //});
        if (manggiatri.data.length > 0) {
            $('#btnXemThem').css('display', 'block');
            $('#btnXemThem').click(function () {
                try {
                    var page = manggiatri.data.length / 20;
                    page = page + 1;
                    countpage = page * 20;
                    laydulieu(1)
                } catch (e) {
                    console.log(e);
                }
            });
        }

    } catch (e) {
        console.log(e);
    }

}

function XuatExcel_ldd() {
    try {
        //var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namefile: "Loc-va-xuat-thong-tin-loi-diem-do_" + gettimenow().replace("/", "-"),
            connstr: "Oracle_AmosiDefault",
            userid: "123"
        };
        //var para = JSON.parse(localStorage.getItem("data_bckhotong_chitiet"));
        //var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var dt = '{ "data": ' + JSON.stringify(manggiatri) + ' }';
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "meterid", name: "meterid", type: "Text" },
               { field: "madiemdo", name: "Mã điểm đo", type: "Text" },
               { field: "maduan", name: "Dự án", type: "Text" },
               { field: "loailoi", name: "Loại lỗi", type: "Text" },
               { field: "chitietloi", name: "Chi tiết lỗi", type: "Text" },
                { field: "ngayloi", name: "Ngày lỗi", type: "Text" },
                { field: "trangthaixuly", name: "Trạng thái xử lý", type: "Text" },
               { field: "ngayxuly", name: "Ngày xử lý", type: "Text" },
               { field: "ketquaxuly", name: "Kết quả xử lý", type: "Text" },
               { field: "nguoixuly", name: "Người xử lý", type: "Text" },
               { field: "ngaytao", name: "Ngày tạo", type: "Text" },
                { field: "ghichu", name: "Ghi chú", type: "Text" }

            ]
        };
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    } catch (e) {
        console.log(e);
    }
}

function clearnull_ttddxl() {
    try {
        $("#table_dsldd").empty();
        //$("#pageCurent_ttddxl").empty();
        //$("#pageLst_ttddxl").empty();
    } catch (e) {
        console.log(e);
    }
}
