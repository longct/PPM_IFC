//var dthongtinhopdong = 0;
var itemCount = 0;
var paraTable_VTTB_HD = [];
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadall();
        setValToTxt("txt_datebh_kbhd", gettimenow());
        setValToTxt("txt_datektbh_kbhd", gettimenow());
        setValToTxt("txt_thoigiangiao_kbhd", gettimenow());     
        $("#cb_vendorid_kbhd").change(function () {
            loadTenThietBi($(this).val());
        });

        $("#btn_checkluu_themkbhd").click(function () {
            messInfo("msgerror_kbhd", "", "error");

            var check = validate_themVTTB();
            if (check != "") {
                messInfo("msgerror_kbhd", check, "error");
                return;
            }
          
            addThem_KBHD();
            
        });
        $("#btn_clear_kbhd").click(function () {
            clear_chitiet();
        });
        $("#btnthem_kbhd").click(function () {
            messInfo("msgerror_kbhd", "", "error");
            var check = validate_themVTTB();
            if (check != "") {
                messInfo("msgerror_kbhd", check, "error");
                return;
            }
            itemCount++;
            f_addThemTBChoValue_VTTB_kbhd();
        });
        $("#txt_mahd_kbhd").change(function () {
            KeyString($("#txt_mahd_kbhd").val())
        });
       
    } catch (e) {
        console.log(e);
    }

});
function KeyString(elm) {
    var pattern = /^[a-zA-Z0-9_-]*$/;

    if (!elm.match(pattern)) {
        alert("Vui lòng nhập mã hợp đồng chỉ nhập (chữ, số, ký tự _, viết liền, không dấu).");
    }
}
function addThem_KBHD() {
    try {
        if (paraTable_VTTB_HD == null || paraTable_VTTB_HD == undefined || paraTable_VTTB_HD == "" || paraTable_VTTB_HD == "[]" || paraTable_VTTB_HD.length == 0) {
            messInfo("msgerror_kbhd", "Hợp đồng chưa có thiết bị", "error");
            return;
        }
        var p = getAllIdMod();
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var dt = '{ "table": ' + JSON.stringify(paraTable_VTTB_HD) + ' }';
        var config = { namesql: "TB_Lis_ADD_KBHD", callback: "result_add_kbhd", connstr: "ConnectEMS" };
        var para = {
            UserId: user.userid,
            MaHD: p.txt_mahd_kbhd,
            TenHD: p.txt_tenhd_kbhd,
            SoLuongHD: parseInt(p.txt_soluong_kbhd),
            GhiChu: p.txt_ghichu_kbhd,
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function result_add_kbhd(config, para, lst) {
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("msgerror_kbhd", "Lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
          
            messInfo("msgerror_kbhd", lst.data[0].result, "ok");
            clear_chitiet();
        }
        else
            messInfo("msgerror_kbhd", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------

function validate_themVTTB() {
    try{
        var p = getAllIdMod();
        if (p.txt_mahd_kbhd == "") return "Vui lòng nhập mã HD";
        if (p.txt_tenhd_kbhd == '') return "vui lòng nhập tên HD";
       
        if (p.txt_soluong_kbhd == '' && p.cb_vendorid_kbhd!='1') return "Vui lòng nhập số lượng theo hợp đồng";
        if (p.cb_banmien_kbhd == "-1") return "Vui lòng chọn ban miền";
        if (p.cb_vendorid_kbhd == "-1") return "Vui lòng chọn vật tư thiết bị";
        if (p.cb_tenvt_kbhd == "-1") return "Vui lòng chọn loại thiết bị";
        if (p.txt_datebh_kbhd == "") return "Vui lòng nhập thời gian bắt đầu BH";
        if (p.txt_datektbh_kbhd == "") return "Vui lòng nhập thời gian kết thúc BH";
        if (p.txt_soluongvt_kbhd == "") return "Vui lòng nhập số lượng theo vật tư thiết bị";
        if (p.txt_thoigiangiao_kbhd == "") return "Vui lòng chọn thời gian giao hàng";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function clear_chitiet() {
    try {
        setValToTxt('txt_mahd_kbhd', '');
        setValToTxt('txt_tenhd_kbhd', '');
        setValToTxt('txt_soluong_kbhd', '');
        setValToTxt('txt_ghichu_kbhd', '');
        setValToTxt('cb_banmien_kbhd', '-1');
        setValToTxt('cb_vendorid_kbhd', '-1');
        setValToTxt('cb_tenvt_kbhd', '-1');
        setValToTxt('txt_datebh_kbhd', gettimenow());
        setValToTxt('txt_datektbh_kbhd', gettimenow());
        setValToTxt('txt_thoigiangiao_kbhd', gettimenow());
        setValToTxt('txt_soluongvt_kbhd', '');
      
        setValToTxt('txt_ghichuvttb_kbhd', '');
        $("#myTableData_danhsachVTTB_kbhd").empty();
        paraTable_VTTB_HD = [];
    } catch (e) {
        console.log(e);
    }
}

//------------------------------------------------------
function loadTenThietBi(id) {
    try {
        var config = { connstr: "ConnectEMS", namesql: "TB_GetTenThietBi", callback: "result_loadtenthietbi" };
        var para = {
            v_typedeviceid: parseInt(id)
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadtenthietbi(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data.length == 0 || data == undefined) {
            return;
        }
        dataToCob("cb_tenvt_kbhd", data, "vendorid", "tenvattu", "-1", "--Chọn loại thiết bị--");

    } catch (e) {
        console.log(e);
    }
}
function loadall() {
    try {
        var config = { namesql: "TB_LoadAll", callback: "result_loadall", connstr: "ConnectEMS" };
        var para = {
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadall(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_vendorid_kbhd", data[0].kq0, "code", "name", "-1", "--Chọn vật tư thiết bị--");
        dataToCob("cb_nhacungcap_kbhd", data[3].kq3, "code", "name", "-1", "--Chọn NCC--");
        dataToCob("cb_banmien_kbhd", data[4].kq4, "code", "name", "-1", "--Chọn kho--");
    } catch (e) {
        console.log(e);
    }
}

//------------------------------------------------------------------------------------------------------------------------------

function f_addThemTBChoValue_VTTB_kbhd() {
    try {

        var p = getAllIdMod();

        var temp = {
            MaHD: p.txt_mahd_kbhd,
            StockCode: p.cb_banmien_kbhd,      
            VendorId: parseInt(p.cb_tenvt_kbhd),
            TenVT: p.cb_tenvt_kbhd,
            TGBDBH: p.txt_datebh_kbhd,
            TGKTBH: p.txt_datektbh_kbhd,
            SoLuong: parseInt(p.txt_soluongvt_kbhd),
            ThoiGianDK: p.txt_thoigiangiao_kbhd,
            GhiChu: p.txt_ghichuvttb_kbhd,
            Stt: itemCount
        };
      
        paraTable_VTTB_HD.push(temp);
        if (p.cb_vendorid_kbhd != '1') {
            f_kbhd_check("PKG_ADDSOLUONG_CHECK", "result_pkg_kbhd_check");
        } else {
            f_addThemThietBiChoGrid_VTTB_HD();
        }
        

    } catch (e) { console.log(e); }
}
function f_kbhd_check(namesql, callBackTo) {
    try {

        if (paraTable_VTTB_HD == null || paraTable_VTTB_HD == undefined || paraTable_VTTB_HD == "" || paraTable_VTTB_HD == "[]" || paraTable_VTTB_HD.length == 0) {
            messInfo("msgerror_kbhd", "Không có dữ liệu cập nhật", "error");
            return;
        }
        var p = getAllIdMod();
        var dt = '{ "table": ' + JSON.stringify(paraTable_VTTB_HD) + ' }';
        var config = { connstr: "ConnectEMS", namesql: namesql, callback: callBackTo };
        var para = {
            SoLuongHD: parseInt(p.txt_soluong_kbhd),
            ThoiGianDK: p.txt_thoigiangiao_kbhd,
            SoLuongGiao: parseInt(p.txt_soluongvt_kbhd)
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));

    } catch (e) {
        console.log(e);
    }
}
function result_pkg_kbhd_check(config, para, lst) {
    try {
        
        if (lst != null && lst != undefined && lst.data != '[]') {
            // check loi vao day
            messInfo("msgerror_kbhd",lst.data[0].result, "error");
            paraTable_VTTB_HD.splice(paraTable_VTTB_HD.length - 1, 1);
        }
        else {
           
            //check ok moi xuong day 
            messInfo("msgerror_kbhd","", "ok");
            f_addThemThietBiChoGrid_VTTB_HD();

        }
    } catch (e) {
        console.log(e);
    }
}
function f_addThemThietBiChoGrid_VTTB_HD() {
    
    try {
        var pt = getAllIdModText();
        var html = "";

        html = "<tr id='tr" + itemCount + "'><td class='c'>" +
                            pt.cb_banmien_kbhd + "</td> <td class='c'>" +
                            pt.cb_vendorid_kbhd + "</td> <td class='c'>" +
                            pt.cb_tenvt_kbhd + " </td> <td class='c'>" +
                            pt.txt_datebh_kbhd + " </td> <td class='c'>" +
                            pt.txt_datektbh_kbhd + " </td> <td class='c'>" +
                            pt.txt_soluongvt_kbhd + " </td> <td class='c'>" +
                            pt.txt_thoigiangiao_kbhd + " </td> <td>" +
                             pt.txt_ghichuvttb_kbhd + " </td> <td>" +
                            "<input type='button'  id='delete_themkbhd" + itemCount + "' value='Xóa'></td> </tr>";

        $("#myTableData_danhsachVTTB_kbhd").append(html);
        //----------------------reset----------------------
        //setValToTxt('txt_soluongvt_kbhd', "");
        //setValToTxt('txt_thoigiangiao_kbhd', "");
        //-----------------------delete-------------------
        $("#delete_themkbhd" + itemCount).click(function () {
            var idremove = $(this).attr("id").replace("delete_themkbhd", "");
            for (var i = 0; i < paraTable_VTTB_HD.length; i++) {
                if (paraTable_VTTB_HD[i].Stt == idremove) {
                    paraTable_VTTB_HD.splice(i, 1);
                    break;
                }
            }

            $("#tr" + idremove).remove();

        });

    } catch (e) {
        console.log(e);
    }
}



