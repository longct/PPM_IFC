var itemCountsua=0;
var paraTable_sua_KBHD = [];
var IDKBHDEDIT = 0;
var sltongkbhd = 0;
$(document).ready(function () {
    try {
        
        setValToTxt("txt_datebh_sua_kbhd", gettimenow());
        setValToTxt("txt_datektbh_sua_kbhd", gettimenow());
        setValToTxt("txt_thoigiangiao_sua_kbhd", gettimenow());
        loadall_sua();
        $("#cb_vendorid_sua_kbhd").change(function () {
            loadTenThietBi_Sua($(this).val());
        });
        $("#btnthem_sua_kbhd").click(function () {
            messInfo("msgerror_sua_kbhd", "", "error");
            var check = validate_sua_vttb_khhd();
            if (check != "") {
                messInfo("msgerror_sua_kbhd", check, "error");
                return;
            }
            itemCountsua++;
            f_addThemTBChoValue_sua_kbhd();
        });
        $("#btn_checkluu_sua_themkbhd").click(function () {
            messInfo("msgerror_sua_kbhd", "", "error");
            var check = validate_sua_khhd();
            if (check != "") {
                messInfo("msgerror_sua_kbhd", check, "error");
                return;
            }
            addSua_KBHD();
        });
    } catch (e) { console.log(e); }
});
//load thiet bi
//------------------------------------------------------
function loadTenThietBi_Sua(id) {
    try {
        var config = { connstr: "ConnectEMS", namesql: "TB_GetTenThietBi", callback: "result_loadtenthietbi_sua" };
        var para = {
            v_typedeviceid: parseInt(id)
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadtenthietbi_sua(config, para, lst) {
    try {
      
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data.length == 0 || data == undefined) {
            return;
        }
        dataToCob("cb_tenvt_sua_kbhd", data, "vendorid", "tenvattu", "-1", "--Chọn loại thiết bị--");
      
      
    } catch (e) {
        console.log(e);
    }
}
// load ban miền
function loadall_sua() {
    try {
        var config = { namesql: "TB_LoadAll", callback: "result_loadall_sua", connstr: "ConnectEMS" };
        var para = {
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadall_sua(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_vendorid_sua_kbhd", data[0].kq0, "code", "name", "-1", "[ Chọn vật tư thiết bị ]");
       
        dataToCob("cb_banmien_sua_kbhd", data[4].kq4, "code", "name", "-1", "[ Chọn ban miền ]");
    } catch (e) {
        console.log(e);
    }
}

//

function validate_sua_khhd() {
    try {
        var p = getAllIdMod();
        if (p.txttenhd_sua_hd == '') return "Bạn chưa nhập tên HD";

        if (p.txtsoluongtong_sua_hd == '' && p.cb_vendorid_kbhd != '1') return "Bạn chưa chọn số lượng theo hợp đồng";
       
        return "";

    } catch (e) {
        console.log(e);
    }
}
function validate_sua_vttb_khhd() {
    try {
        var p = getAllIdMod();
        if (p.cb_banmien_sua_kbhd == "-1") return "Vui lòng chọn ban miền";
        if (p.cb_vendorid_sua_kbhd == "-1") return "Vui lòng chọn vật tư thiết bị";
        if (p.cb_tenvt_sua_kbhd == "-1") return "Vui lòng chọn loại thiết bị";
        if (p.txt_datebh_sua_kbhd == "") return "Vui lòng nhập thời gian BĐ BH";
        if (p.txt_datektbh_sua_kbhd == "") return "Vui lòng nhập thời gian KT BH";
        if (p.txt_soluongvt_sua_kbhd == "") return "Vui lòng nhập số lượng giao";
        if (p.txt_thoigiangiao_sua_kbhd == "") return "Vui lòng chọn thời gian giao hàng";
        return "";
    
    } catch (e) {
        console.log(e);
    }
}
function loadthongtin_sua_kbhd(id) {
    try {
        IDKBHDEDIT = id;
        var config = { namesql: "TB_Import_LoadChiTietKBHD", callback: "f_TB_Import_LoadChiTietSuaKBHD", connstr: "ConnectEMS" };
        var para = { id: parseInt(id) };
      
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

// load ra chi tiet thiet bi
function f_TB_Import_LoadChiTietSuaKBHD(config, para, lst) {
    try {
        sltongkbhd = 0;
        messInfo("msgerror_sua_kbhd", "", "ok");
        messInfo("msgerror_sua_kbhd", "", "erorr");
        $("#myTableData_nhaphdsua").empty();
        var p = getAllIdMod();
        var data = lst.data[0].kq0[0];
      

        $("#txtMahopdongHead_suact").html("Thông tin chi tiết hợp đồng " + data.tenhd);
        setValToTxt('txtmahd_sua_hd', data.mahd);
        setValToTxt('txttenhd_sua_hd', data.tenhd);
        var sl = data.soluonghd != "" && data.soluonghd!=0 ? SetValnullNumber(data.soluonghd) : 0
        $("#txtsoluongtong_sua_hd").val(sl);
        setValToTxt('txtghichu_sua_hd', data.ghichu);
        $.each(lst.data[1].kq1, function (key, val) {
            sltongkbhd = sltongkbhd + val.soluong;
            var row = "";
            row += "<tr><td class='c'>"
                + val.stockcode + "</td><td class='c'>"
                + val.mavt + "</td><td>"
                + val.tenvt + "</td><td class='c'>"
                + val.tgbdbh + "</td><td class='c'>"
                + val.tgktbh + "</td><td class='c'>"
                + val.soluong + "</td><td class='c'>"
                + val.thoigiangh + "</td><td>"
                + val.ghichu + "</td><td>"
               + "<input type='button'  onclick='xoa_vttb_kbhd(" + val.id + ")'  value='Xóa'></td>";
            "</tr>";
            $("#myTableData_nhaphdsua").append(row);
        });
        if (sl==0)
            $("#txtsoluongtong_sua_hd").val(sltongkbhd);
        //var check = lst.data[2].kq2;
        //if (check.length > 0) {

        //}
       
    } catch (e) {
        console.log(e);
    }
}
// xóa vtttb da luu trong db
function xoa_vttb_kbhd(id) {
    f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý",
               function () { excute_xoa_khbkh(id); });
   
}
function excute_xoa_khbkh(id) {
    try {
       
        var config = { namesql: "TB_Lis_XoaVTTBKBKH", callback: "f_TB_xoa_sua_vttb_KBHD", connstr: "ConnectEMS" };
        var para = { v_id: parseInt(id) };

        ExecuteServiceSyns(config, para, false);
    }catch(e){
        console.log();
    }
}
function f_TB_xoa_sua_vttb_KBHD(config, para, lst) {
    try {
     
        if (lst == null || lst == undefined || lst == "[]") return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("msgerror_sua_kbhd", lst.data[0].result, "ok");
            loadthongtin_sua_kbhd(IDKBHDEDIT);
            loadtable_chitiet(1);
        }
        else
            messInfo("msgerror_sua_kbhd", lst.data[0].result, "error");
    } catch (e) {
        console.log(e);
    }
}
//==============================

function f_addThemTBChoValue_sua_kbhd() {
    try {
       
        var p = getAllIdMod();

        var temp = {
            MaHD: p.txtmahd_sua_hd,
            StockCode: p.cb_banmien_sua_kbhd,
            VendorId: parseInt(p.cb_tenvt_sua_kbhd),
            TenVT: p.cb_tenvt_sua_kbhd,
            TGBDBH: p.txt_datebh_sua_kbhd,
            TGKTBH: p.txt_datektbh_sua_kbhd,
            SoLuong: parseInt(p.txt_soluongvt_sua_kbhd),
            ThoiGianDK: p.txt_thoigiangiao_sua_kbhd,
            GhiChu: p.txt_ghichuvttb_sua_kbhd,
            Stt: itemCountsua
        };
       
        var sltheohd = parseFloat($("#txtsoluongtong_sua_hd").val());
        var sltheotb = parseFloat(parseInt(p.txt_soluongvt_sua_kbhd));
        sltongkbhd = sltongkbhd + sltheotb;
        if (sltheohd < sltongkbhd) {
            $("#txtsoluongtong_sua_hd").val(sltongkbhd);
        }
        
        paraTable_sua_KBHD.push(temp);
        if (p.cb_vendorid_sua_kbhd != '1') {
            f_kbhd_sua_check("PKG_ADDSOLUONG_CHECK", "result_pkg_kbhd_check");
        } else {
            f_addThemThietBiChoGrid_Sua_HD();
        }
       
    } catch (e) { console.log(e); }
}
function f_kbhd_sua_check(namesql, callBackTo) {
    try {
        if (paraTable_sua_KBHD == null || paraTable_sua_KBHD == undefined || paraTable_sua_KBHD == "" || paraTable_sua_KBHD == "[]" || paraTable_sua_KBHD.length == 0) {
            messInfo("msgerror_sua_kbhd", "Không có dữ liệu cập nhật", "error");
            return;
        }
        var p = getAllIdMod();
        var dt = '{ "table": ' + JSON.stringify(paraTable_sua_KBHD) + ' }';
        var config = { connstr: "ConnectEMS", namesql: namesql, callback: callBackTo };
        var para = {
            SoLuongHD: parseInt(p.txtsoluongtong_sua_hd),
            ThoiGianDK: p.txt_thoigiangiao_sua_kbhd,
            SoLuongGiao: parseInt(p.txt_soluongvt_sua_kbhd)
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
            messInfo("msgerror_sua_kbhd", lst.data[0].result, "error");
            paraTable_sua_KBHD.splice(paraTable_sua_KBHD.length - 1, 1);
        }
        else {

            //check ok moi xuong day 
            messInfo("msgerror_sua_kbhd", "", "ok");
            f_addThemThietBiChoGrid_Sua_HD();

        }
    } catch (e) {
        console.log(e);
    }
}
function f_addThemThietBiChoGrid_Sua_HD() {

    try {
        var pt = getAllIdModText();
        var html = "";

        html = "<tr id='tr" + itemCountsua + "'><td class='c'>" +
                            pt.cb_banmien_sua_kbhd + "</td> <td class='c'>" +
                            pt.cb_vendorid_sua_kbhd + "</td> <td>" +
                            pt.cb_tenvt_sua_kbhd + " </td> <td class='c'>" +
                            pt.txt_datebh_sua_kbhd + " </td><td class='c'>" +
                            pt.txt_datektbh_sua_kbhd + " </td><td class='slvttb" + itemCountsua + " c'>" +
                            pt.txt_soluongvt_sua_kbhd + " </td><td class='c'>" +
                            pt.txt_thoigiangiao_sua_kbhd + " </td> <td style='width:200px'>" +
                            pt.txt_ghichuvttb_sua_kbhd + " </td> <td>" +
                            "<input type='button'  id='delete_sua_themkbhd" + itemCountsua + "' value='Xóa'></td> </tr>";

        $("#myTableData_nhaphdsua").append(html);
        //----------------------reset----------------------
        //-----------------------delete-------------------
        $("#delete_sua_themkbhd" + itemCountsua).click(function () {
            var idremove = $(this).attr("id").replace("delete_sua_themkbhd", "");

            var sl = parseFloat($(this).parents().find("td.slvttb" + idremove + "").html());
            var sltong = parseFloat($("#txtsoluongtong_sua_hd").val());
            $("#txtsoluongtong_sua_hd").val(sltong - sl);
            for (var i = 0; i < paraTable_sua_KBHD.length; i++) {
                if (paraTable_sua_KBHD[i].Stt == idremove) {
                    paraTable_sua_KBHD.splice(i, 1);
                    break;
                }
            }
           
            $("#tr" + idremove).remove();
        });

    } catch (e) {
        console.log(e);
    }
}
function addSua_KBHD() {
    try {
       
        var p = getAllIdMod();
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var dt = '{ "table": ' + JSON.stringify(paraTable_sua_KBHD) + ' }';
        var config = { namesql: "TB_Lis_EDIT_KBHD", callback: "result_edit_kbhd", connstr: "ConnectEMS" };
        var para = {
            UserId: user.userid,
            MaHD: p.txtmahd_sua_hd,
            TenHD: p.txttenhd_sua_hd,
            SoLuongHD: parseInt(p.txtsoluongtong_sua_hd),
            GhiChu: p.txtghichu_sua_hd,
            IDHD:IDKBHDEDIT
        };
        
        if (paraTable_sua_KBHD.length == 0) {
            ExecuteServiceSyns(config, para, false);
        } else {
            ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
        }
        
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function result_edit_kbhd(config, para, lst) {
    try {
      
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("msgerror_sua_kbhd", "Lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {

            messInfo("msgerror_sua_kbhd", lst.data[0].result, "ok");
            clear_sua_chitiet();
            paraTable_sua_KBHD = [];
            loadtable_chitiet(1);
        }
        else
            messInfo("msgerror_sua_kbhd", lst.data[0].result, "error");

    } catch (e) {
        console.log(e);
    }
}
function clear_sua_chitiet() {
   
    setValToTxt('cb_banmien_sua_kbhd', '-1');
    setValToTxt('cb_vendorid_sua_kbhd', '-1');
    setValToTxt('cb_tenvt_sua_kbhd', '-1');
    setValToTxt('txt_soluongvt_sua_kbhd', '');
    setValToTxt("txt_datebh_sua_kbhd", gettimenow());
    setValToTxt("txt_datektbh_sua_kbhd", gettimenow());
    setValToTxt("txt_thoigiangiao_sua_kbhd", gettimenow());
    setValToTxt("txt_thoigiangiao_sua_kbhd", gettimenow());
}