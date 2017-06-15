$(document).ready(function () {
    
    try
    {
        try {
            //localStorage.setItem("istypemaster", JSON.stringify({ istype: 1 }));
            //localStorage.removeItem("infotree");
            var user =localStorage.getItem("userinfo");
            if (user == null || user == undefined)
            {
                window.location.href = "login.html";
                return;
            }
            var user = JSON.parse(localStorage.getItem("userinfo"));
            $("#lbUserFullName").html(user.fullname);
           
          
        } catch (e) { console.log(e); }
      
        f_checkPermistionaAll();
        $("#logout").click(function () {
            localStorage.removeItem("userinfo");
            window.location.href = "login.html";
        });
        //// giúp chuyển tap con bên trong 
        //$(".menunChuyenTap ul li").click(function () {
        //    setTimeout(f_ChuyenToiTapConNaoDo(this),30000);
        //});

    } catch (ex) { console.log(ex);}
});


//function f_ChuyenToiTapConNaoDo(thiss)
//{
//    console.log("cccccccc");
//    console.log(thiss);
//    var id = $(thiss).attr("href");
//    console.log(id);
//    if (id == null || id == undefined)
//        return;
//    $('a[href="' + id + '"]').click();
//}

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