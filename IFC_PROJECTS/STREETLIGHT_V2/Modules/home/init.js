var dskh;
$(document).ready(function () {
    try {
        loadContent();
        loadInitDate();
        f_khoitaosukien_home1();
        //loadchecklog_master();
        $(".main-menu").click(function () {
            var id = $(this).data("target");
            clickMenu(id);
        });
        loadouthome();
        //$("#txt_tiemkiem_home").keyup(function (event) {
        //    if (event.keyCode == 13) {  
        //        $("#txt_tiemkiem_home").click(function () {
        //            alert('123');
        //            loadthongtin_timkiem();
        //        }); 
        //    }
        //});
    
        $('#txt_tiemkiem_home').keypress(function (e) {
            if (e.which == 13) {

                loadthongtin_timkiem();
            }
        });


    } catch (e) {
        console.log(e);
    }

});

function loadchecklog_master() {
    try {
        var userinfo = localStorage.getItem('userinfo');
        if (userinfo == null || userinfo == [] || userinfo == undefined) {
            window.location.href = "login.html";
            return;
        }
        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (user.manhanvien == null || user.manhanvien == [] || user.manhanvien == undefined) {
            window.location.href = "login.html";
            return;
        }
    } catch (e) {
        console.log(e);
    }
}
function clickMenu(id) {
    $(id).modal('show');
}
function loadInitDate() {
    try {
        $('.default-date-picker').datepicker({
            format: 'dd/mm/yyyy',
            // onRender: function (date) {
            //    return 'disabled';
            //}
        });
        //$('.dpYears').datepicker();
        $('.dpMonths').datepicker();

    } catch (e) {
        console.log(e);
    }
}

function f_khoitaosukien_home1() {
    try {

        $(".dimtucthoi_home_1tu").click(function () {
            if (localStorage.getItem("tuSelected")) {
                var lstId = [];
                var data = JSON.parse(localStorage.getItem("tuSelected"));
                var idtu = [];
                $.each(data, function (key, val) {
                    idtu.push({ id: val });
                })
                if (idtu.length == 0) {
                    showToast("Không có tủ nào được chọn", "error");
                    return;
                }
                $.each(idtu, function (key, val) {
                    var ID = { id: val.id, ten: "THIẾT LẬP DIM TỨC THỜI TOÀN BỘ BÓNG THUỘC TỦ" };
                    lstId.push(ID);
                });
                f_loadInfoOne_Dkdtt(lstId);
                var infoo = {
                    loaidk: "DIM",
                    loaithietbi: "TATCABONG",
                    loaichedo: "TUCTHOI"
                };

                localStorage.setItem("infodk", JSON.stringify(infoo));
                var id = $(this).data("target");
                $(id).modal("show");
            }
            else {
                showToast("Chưa chọn tủ để điều khiển", "error");
            }
        });

        $(".muccongsuat_home_1tu").click(function () {
            if (localStorage.getItem("tuSelected")) {
                var lstId = [];
                var data = JSON.parse(localStorage.getItem("tuSelected"));
                var idtu = [];
                $.each(data, function (key, val) {
                    idtu.push({ id: val });
                })
                if (idtu.length == 0) {
                    showToast("Không có tủ nào được chọn", "error");
                    return;
                }
                $.each(idtu, function (key, val) {
                    var ID = { id: val.id, ten: "THIẾT LẬP DIM TỰ ĐỘNG TOÀN BỘ BÓNG THUỘC TỦ" };
                    lstId.push(ID);
                });

                f_loadInfoOne_Dktdtd(lstId);
                var infoo = {
                    loaidk: "DIM",
                    loaithietbi: "TATCABONG",
                    loaichedo: "TUDONG"
                };

                localStorage.setItem("infodk", JSON.stringify(infoo));
                var id = $(this).data("target");
                $(id).modal("show");

            }
            else {
                showToast("Chưa chọn tủ để điều khiển", "error");
            }
        });

        $(".doctoadotutucthoi_home").click(function () {
            if (localStorage.getItem("tuSelected")) {
                var lstId = [];
                var data = JSON.parse(localStorage.getItem("tuSelected"));
                var idtu = [];
                $.each(data, function (key, val) {
                    idtu.push({ id: val });
                })
                if (idtu.length == 0) {
                    showToast("Không có tủ nào được chọn", "error");
                    return;
                }

                $.each(idtu, function (key, val) {
                    var ID = { id: val.id, ten: "ĐỌC TỌA ĐỘ TỦ TỨC THỜ" };
                    lstId.push(ID);
                });

                f_confimYesNo("Bạn chắc chắn muốn đọc tọa độ tủ ?", "Bỏ qua", "Xác nhận", function () {
                    f_init_doctoadotu_dtdt(lstId);
                });

            }
            else {
                showToast("Chưa chọn tủ để điều khiển", "error");
            }
        });

        $(".tucthoi_home_1tu").click(function () {
            if (localStorage.getItem("tuSelected")) {
                var lstId = [];
                var data = JSON.parse(localStorage.getItem("tuSelected"));
                var idtu = [];
                $.each(data, function (key, val) {
                    idtu.push({ id: val });
                })
                if (idtu.length == 0) {
                    showToast("Không có tủ nào được chọn", "error");
                    return;
                }

                $.each(idtu, function (key, val) {
                    var ID = { id: val.id, ten: "THIẾT LẬP TỨC THỜI TỦ ĐIỆN" };
                    lstId.push(ID);
                });

                f_loadInfoOne_Dktptt(lstId);
                var infoo = {
                    loaidk: "PHA",
                    loaithietbi: "TU",
                    loaichedo: "TUCTHOI"
                }
                localStorage.setItem("infodk", JSON.stringify(infoo));

                var id = $(this).data("target");
                $(id).modal("show");
            }
            else {
                showToast("Chưa chọn tủ để điều khiển", "error");
            }
        });

        $(".dongcatpha_home_1tu").click(function () {
            if (localStorage.getItem("tuSelected")) {
                var lstId = [];
                var data = JSON.parse(localStorage.getItem("tuSelected"));
                var idtu = [];
                $.each(data, function (key, val) {
                    idtu.push({ id: val });
                })
                if (idtu.length == 0) {
                    showToast("Không có tủ nào được chọn", "error");
                    return;
                }

                $.each(idtu, function (key, val) {
                    var ID = { id: val.id, ten: "THIẾT LẬP ĐÓNG CẮT PHA CỦA TỦ TRONG NGÀY" };
                    lstId.push(ID);
                });

                f_loadInfoOne_Dkttd(lstId);

                var infoo = {
                    loaidk: "PHA",
                    loaithietbi: "TU",
                    loaichedo: "TUDONG"
                }
                localStorage.setItem("infodk", JSON.stringify(infoo));

                var id = $(this).data("target");
                $(id).modal("show");
            }
            else {
                showToast("Chưa chọn tủ để điều khiển", "error");
            }
        });

        $(".thietlap_chedo").click(function () {
            if (localStorage.getItem("tuSelected")) {
                var lstId = [];
                var data = JSON.parse(localStorage.getItem("tuSelected"));
                var idtu = [];
                $.each(data, function (key, val) {
                    idtu.push({ id: val });
                })
                if (idtu.length == 0) {
                    showToast("Không có tủ nào được chọn", "error");
                    return;
                }
                $.each(idtu, function (key, val) {
                    var ID = { id: val.id, ten: "THIẾT LẬP DIM TỨC THỜI TOÀN BỘ BÓNG THUỘC TỦ" };
                    lstId.push(ID);
                });
                f_loadInfoOne_Dkdtt(lstId);
                var infoo = {
                    loaidk: "DIM",
                    loaithietbi: "TATCABONG",
                    loaichedo: "TUCTHOI"
                };

                localStorage.setItem("infodk", JSON.stringify(infoo));
                var id = $(this).data("target");
                $(id).modal("show");
            }
            else {
                showToast("Chưa chọn tủ để điều khiển", "error");
            }

        });

        //$(".chitiettu_home_1tu").click(function () {
        //    if (localStorage.getItem("tree_node")) {
        //        var tree = JSON.parse(localStorage.getItem("tree_node"));
        //        var idtu = tree[0].tu;

        //        var id = $(this).data("target");
        //        $(id).modal("show");
        //        //window.open('master.html#Module/tongquantu', '_blank');
        //    } else {
        //        showToast("Chưa chọn tủ để xem thông tin", "error");
        //    }
        //});



    } catch (e) {
        console.log(e);
    }
}
function showToast(msg, type) {
    $("#toast").html(msg);
    $("#toast").removeAttr("class");
    $("#toast").addClass(type);
    $('#toast').fadeIn(400).delay(2000).fadeOut(400); //fade out after 3 seconds
}
function loadthongtin_timkiem() {
    try {
        var timkiem = $("#txt_tiemkiem_home").val();
        var config = { namesql: "PKG_TIMKIEMHOME.TIMKIEMHOME", callback: "f_result_loadthongtintimkiem", connstr: "ConnectOracleStreetLight" };
        var para = { v_TIMKIEM: timkiem };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtintimkiem(config, para, lst) {
    try {
        var data = lst.data;
       
        if (data == undefined || data == "[]" || data == null || data.length == 0) {
            alert("Không có thông tin của tủ");
            return;
        }
        setTimeout(function () { $("#txt_tiemkiem_home").val(''); }, 3000);
        //$('#using_json_2').deselect_all(true);
        $('#using_json_2').jstree(true).deselect_all();
        $('#using_json_2').jstree('select_node', data[0].id);

        $('#using_json_2').change();
    } catch (e) {
        console.log(e);
    }
}

function loadthongtin_da(val) {
    try {
        var config = { namesql: "PKG_TIMKIEMHOME.TIMKIEMHOME", callback: "f_result_loadthongtintimkiem", connstr: "ConnectOracleStreetLight" };
        var para = { v_TIMKIEM: val };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function loadouthome() {
    try {
        var config = { namesql: "PKG_TIMKIEMHOME.LOAD", callback: "f_result_loadouthome", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadouthome(config, para, lst) {
    try{
        dskh = lst.data;
        var nameArr = [];
        nameArr.length = 0;
        $.each(dskh, function (key, val) {
            nameArr.push({
                label: val.ten + '\n',
                value: val.ten,
                id: val.socongto,
            });
        });
        $("#txt_tiemkiem_home").autocomplete({
            minLength: 1,
            delay: 200,
            source: nameArr,
            select: function (event, ui) {
                
                setTimeout(function () {
                    loadthongtin_da(ui.item.value);
                }, 300);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
