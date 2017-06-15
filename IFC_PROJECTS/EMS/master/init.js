$(document).ready(function () {
    
    try
    {
       
        var user =localStorage.getItem("userinfo");
        if (user == null || user == undefined)
        {
            window.location.href = "login.html";
            return;
        }
        $("#lbUserFullName").html(JSON.parse(user).fullname);
      //  f_checkPermistionaAll();
        loadquyendung();
        $("#logout").click(function () {
            localStorage.removeItem("userinfo");
            window.location.href = "login.html";
        });
        //// giúp chuyển tap con bên trong 
        //$(".menunChuyenTap ul li").click(function () {
        //    setTimeout(f_ChuyenToiTapConNaoDo(this),30000);
        //});
        f_loadCountPending();
    } catch (ex) { console.log(ex);}
});

function loadquyendung() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "ConnectEMS", namesql: "LOADQUYEN", callback: "result_loadquyen" };
        var para = { v_USERID: userinfo.userid };
        ExecuteServiceSyns(config, para);
       
    } catch (e) {
        console.log(e);
    }
}
function result_loadquyen(config, para, lst) {
    try {
        var data = lst.data;
        arrPhanQuyen = data;
        
        // Ẩn link menu ko có quyền xem
        $("li a.linktomod").each(function (i, item) {
            var classLink = $(item).attr('class').split(' ');
            classLink.splice(0, 1);
            
            if (classLink.length > 0 && classLink[0].indexOf('class') >= 0) {
                var quyenXem = $.grep(arrPhanQuyen,function (val, i) {
                    return (val.xem == 1 && val.classform == classLink[0]);
                });
                if (quyenXem.length == 0)
                    $(this).closest('li').hide();
            }
            
        });

        // Ẩn menu nếu ko có link menu nào
        $("button.btn_menu").each(function (i, item) {
            var liChildCount = $(this).next().find('li').length;
            var liHide = $(this).next().find('li').filter(function () {
                return $(this).css("display") == "none"
            });
            if (liChildCount == liHide.length) $(this).hide();
        });

    } catch (e) {
        console.log(e);
    }
}

function f_loadCountPending()
{
    try
    {
        var userInfo = localStorage.getItem("userinfo");
        if (userInfo == null || userInfo == undefined) {
            return;
        }
        var parseUser = JSON.parse(userInfo);
        var config = { namesql: "TB_ThongBao_TongSoPhieuChoDuyet", callback: "f_result_loadCountPending", connstr: "ConnectEMS" };
        var para = {
            UserId: parseUser.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) { console.log(e);}
}

function f_result_loadCountPending(config, para, lst)
{
    try
    {
        if (lst == null || lst == undefined)
            return;
            $("#lbPhieuChoDuyet").html(lst.data[0].tongchoduyet);
    } catch (e) { console.log(e);}
}
function f_checkPermistionaAll()
{
    try{
        var userInfo = localStorage.getItem("userinfo");
        if (userInfo == null || userInfo == undefined) {
            //window.location.href = "http://qlda.infras.com.vn:8888/Default.aspx";
            return;
        }
        var parseUser = JSON.parse(userInfo);
        var config = { namesql: "TB_Permistion_Modules", callback: "f_result_f_checkPermistionaAll", connstr: "ConnectEMS" };
        var para = {
            ModuleId: "-1",
            UserId: parseUser.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) { console.log(e);}
}
function f_result_f_checkPermistionaAll(config,para,lst)
{
    try{
        localStorage.setItem("PermisstionModul", JSON.stringify(lst.data));
    } catch (e) { console.log(e);}
}