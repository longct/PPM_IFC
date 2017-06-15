
$(document).ready(function () {
    try {
        loadchecklog_master();
        initformelement();
        //loadInitDate();
        loadConetent();
        lstmayin_hd();
        lstmaytinh_hd();
        lstcty_hd();
        

        setValToTxt("date_dieu_adhd", gettimenow());
        setValToTxt("date_quyet_adhd", gettimenow());
        $("#cb_maytinh_adhd").change(function () {
            thongmaytinh();
        });
        $("#cb_mayin_adhd").change(function () {
            thongmayin();
        });
        $("#txt_tendonvi_adhd").change(function () {
            thongtincty();
        });
        $("#bt_loada").click(function () {
            loadlsthoadon();
            setTimeout(function () {
                kiemtra();
            }, 500);
        });

      
        // txt_file_adhd
        $("#bt_load").click(function () {
            giatrihoadon_adhd();
            setTimeout(function () {
                kiemtra();
            }, 1000);
        });
        // thêm hóa đơn

        $("#btn_them_adhd").click(function () {
            var check = checkvalidate();
            if (check != "") {
                //messInfo("messinfo_adhd", check, 'error');
                showToast(check, 'error');
                return;
            }
            f_confimYesNo("Cập nhật thông tin in hóa đơn", "Bỏ qua", "Xác nhận", function () {
                capnhat_adhd();
            });
        });

        $("#btn_inquyetdinh_adhd").click(function () {
            inquetdinh(true);
        });

        loadthongtinmoi();
    } catch (e) {
        console.log(e);
    }
});
function lstmayin_hd() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LSTMAYIN", callback: "result_lstmayin" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstmayin(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_mayin_adhd", data, "id", "ten", "", "Chọn máy in");
    } catch (e) {
        console.log(e);
    }
}
function thongmayin() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LUUTTMAYINHD.IDMAYIN", callback: "result_thongmayin" };
        var para = {
            v_ID: p.cb_mayin_adhd
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_thongmayin(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            $("#txt_sxin_adhd").val('');
            return;
        }
        $("#txt_sxin_adhd").val(data[0].hang);
        $("#txt_hieu_adhd").val(data[0].mahieuin);
    } catch (e) {
        console.log(e);
    }
}
function lstmaytinh_hd() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LSTTINH", callback: "result_lstmaytinh_hd" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstmaytinh_hd(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_maytinh_adhd", data, "id", "ten", "", "Chọn máy tính");
    } catch (e) {
        console.log(e);
    }
}
function thongmaytinh() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LUUTTMAYINHD.IDMAYTINH", callback: "result_thongmaytinh" };
        var para = {
            v_ID: p.cb_maytinh_adhd
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_thongmaytinh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            $("#txt_mahieu_adhd").val('');
            $("#txt_hedhmt_adhd").val('');
            $("#txt_cpumt_adhd").val('');
            $("#txt_rammt_adhd").val('');
            return;
        }
     
        $("#txt_mahieu_adhd").val(data[0].mahieu);
        $("#txt_sxmt_adhd").val(data[0].sanxuat)
        $("#txt_hedhmt_adhd").val(data[0].hedieuhanh);
        $("#txt_cpumt_adhd").val(data[0].vixuly);
        $("#txt_rammt_adhd").val(data[0].ram);
    } catch (e) {
        console.log(e);
    }
}
function lstcty_hd() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVICTY", callback: "result_tendonvi" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_tendonvi(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("txt_tendonvi_adhd", data, "id", "ten", "", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function thongtincty() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LUUTTMAYINHD.IDDONVICTY", callback: "result_thongtincty" };
        var para = {
            v_ID: p.txt_tendonvi_adhd
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_thongtincty(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            $("#txt_tai_adhd").val('');
            $("#txt_quetdinh_adhd").val('');
            $("#txt_dky_adhd").val('');
            $("#txt_nguoide_adhd").val('');
            return;
        }
        $("#txt_tai_adhd").val(data[0].diachi_cty);
        $("#txt_quetdinh_adhd").val(data[0].quyetdinhso);
        $("#txt_dky_adhd").val(data[0].dangkykd);
        $("#txt_nguoide_adhd").val(data[0].nguoi_ddpl);

    } catch (e) {
        console.log(e);
    }
}

// checkvaidate
function checkvalidate() {
    try {
        var p = getAllIdMod();
        if (p.txt_tendonvi_adhd == "-1") return "Vui lòng chọn đơn vị";
        if (p.txt_tai_adhd == "") return "Tại không được bỏ trống";
        if (p.txt_quetdinh_adhd == "") return "Quyết định không được bỏ trống";
        if (p.txt_dky_adhd == "") return "Đăng ký kinh doanh số không được bỏ trống";
        if (p.txt_nguoide_adhd == "") return "Người đề nghị không được bỏ trống";
        if (p.txt_dieu1_adhd == "") return "Điều không được bỏ trống";
        if (p.date_dieu_adhd == "") return "Ngày không được bỏ trống";
        if (p.cb_maytinh_adhd == "-1") return "Vui lòng chọn máy tính ";
        if (p.cb_mayin_adhd == "-1") return "Vui lòng chọn máy in";
        if (p.txt_phanmen_adhd == "") return "Tên phần mềm không được bỏ trống";
        if (p.txt_mucdinhs_adhd=="") return "Mục đích sử dụng không được bỏ trống"
        if (p.txt_dsachhd_adhd == "") return "Danh sach hóa đơn không được bỏ trống";
        if (p.txt_bensdpm_adhd == "") return "Bên sử dụng không được bỏ trống";
        if (p.txt_bophanketoan_adhd == "") return "Bộ phận kế toán không được bỏ trống";
        if (p.txt_bpkythuat_adhd == "") return "Bộ phận kỹ thuật không được bỏ trống";
        if (p.date_quyet_adhd == "") return "Ngày quyết định không được bỏ trống";
        if (p.txt_yeucauhd_adhd == "") return "Thông tin ngày quyết định không được bỏ trống";
        return "";

    } catch (e) {
        console.log(e);
    }
}



function loadlsthoadon() {
    try{
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_LOAIHOADON", callback: "result_loadlsthoadon" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadlsthoadon(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr class='checkone_ckbmd' value=" + val.kyhieu + "><td><input type='checkbox' id='btn_click" + val.kyhieu + "'/></td><td>"
                + setnull(val.tenloaihoadon) + "</td></tr>";
            $("#txt_table_adhd").append(row);
        });
                 

    } catch (e) {
        console.log(e);
    }
}


function giatrihoadon_adhd() {
    try {
        var lstObj = [];
        $(".checkone_ckbmd").each(function () {
            var id = $(this).attr("value");
            if ($("#btn_click" + id).prop("checked") == true) {
                var value = id;
                lstObj.push(value);
            }
        });
        setValToTxt("txt_dsachhd_adhd", lstObj);
    } catch (e) {
        console.log(e);
    }
}

//cập nhật 
function capnhat_adhd() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LUUTTMAYINHD.CAPNHATINHOADON", callback: "result_capnhata_adhd" };
        var para = {
            v_IDCTY:p.txt_tendonvi_adhd,
            v_IDMTINH:p.cb_maytinh_adhd,
            v_IDMIN:p.cb_mayin_adhd,
            v_DIEU1: p.txt_dieu1_adhd,
            v_NGAYDIEU: p.date_dieu_adhd,
            v_DIEU2: p.txt_dieu2_adhd,
            v_PHANMEM: p.txt_phanmen_adhd,
            v_BENSDPM: p.txt_bensdpm_adhd,
            v_BENCCPM: p.txt_benccpm_adhd,
            v_DSHD: p.txt_dsachhd_adhd,
            v_BOPBANHANG: p.txt_bopbhang_adhd,
            v_BOKETOAN: p.txt_bophanketoan_adhd,
            v_BOKYTHUA: p.txt_bpkythuat_adhd,
            v_NGAYQUYET: p.date_quyet_adhd,
            v_QUETDINH: p.txt_yeucauhd_adhd,
            v_MUDICHSD: p.txt_mucdinhs_adhd,
            v_USERID: userinfo.userid
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_capnhata_adhd(config, para, lst) {
    try{
        var data=lst.data; 
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            showToast(row, 'success');
            //messInfo("messinfo_adhd", row, 'ok');
            inquetdinh(false);
            //setTimeout(function () { loadthong(); }, 500);
        } else {
            showToast(row, 'error');
            //messInfo("messinfo_adhd", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}

//end cập nhật

//load thông tin mặc định
function loadthongtinmoi() {
    try{
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LUUTTMAYINHD.LOADTTAPDUNGHOADON", callback: "result_loadthongtin" };
        var para = { v_ID:''};
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthongtin(config, para, lst) {
    try{
        var data =lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
      
        setValToTxt("txt_dieu1_adhd", data[0].dieu1);
        setValToTxt("date_dieu_adhd", data[0].ndieu);
        setValToTxt("txt_dieu2_adhd", data[0].dieu2);
        setValToTxt("txt_dsachhd_adhd", data[0].dsloaihd);
        setValToTxt("txt_phanmen_adhd", data[0].ttphanmem);
        setValToTxt("txt_bensdpm_adhd", data[0].bensdpm);
        setValToTxt("txt_benccpm_adhd", data[0].beccpm);
        setValToTxt("txt_bopbhang_adhd", data[0].bophanbandien);
        setValToTxt("txt_bophanketoan_adhd", data[0].bophanketoan);
        setValToTxt("txt_bpkythuat_adhd", data[0].bophankythuat);
        //setValToTxt("date_quyet_adhd", data[0].nhieu);
        setValToTxt("txt_yeucauhd_adhd", data[0].lanhdaoyc);
        setValToTxt("txt_mucdinhs_adhd", data[0].mucdichsd);
        setTimeout(function () {
            thongtincty();
            thongmayin();
            thongmaytinh();
         
        }, 1000);

    } catch (e) {
        console.log(e);
    }
}

//end load

function inquetdinh(chodownload) {
    try {
        var p = getAllIdMod();
        var ngayhieu = p.date_dieu_adhd.split('/');
        var config = {
            filemau: "MAU_MAY_IN.dotx",
            filecreat: 'QUYETDINHIN_' + ngayhieu[0] + ngayhieu[1] + ngayhieu[2] + '.docx'
        };
        var maytinh = $("#cb_maytinh_adhd :selected").text();
        var p = getAllIdMod();
       
        var para = {
            ngay: ngayhieu[0],
            thang: ngayhieu[1],
            nam: ngayhieu[2],
            quyetdinh: p.txt_quetdinh_adhd,
            nguoiquetdinh: p.txt_nguoide_adhd,
            tenmaytinh: maytinh,
            mahieumt: p.txt_mahieu_adhd,
            hedieuhanhmaytinh: p.txt_hedhmt_adhd,
            boxuly: p.txt_cpumt_adhd,
            rammt: p.txt_rammt_adhd,
            sohieumayin: p.txt_hieu_adhd,
            nhasxin: p.txt_sxin_adhd,
            tenungdung: p.txt_phanmen_adhd,
            nhacungcap: p.txt_benccpm_adhd,
            masothue: p.txt_dky_adhd,
            mausods: p.txt_dsachhd_adhd,
            mucdichsd: p.txt_mucdinhs_adhd,
            nhanvienbanhang: p.txt_bopbhang_adhd,
            nhanvienketoan: p.txt_bophanketoan_adhd,
            bophankythuat: p.txt_bpkythuat_adhd,
            hieuluc: p.txt_yeucauhd_adhd
        }
        console.log(para);
        ExecuteCreateFileWord(config, para);
        if (chodownload)
        window.open(urli + "/home/DownloadFileSaveOnServer/" + config.filecreat);



    } catch (e) {
        console.log(e);
    }
}





















