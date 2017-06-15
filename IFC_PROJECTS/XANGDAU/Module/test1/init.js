
$(document).ready(function () {
    thuuuu();
});

function thuuuu()
{
    var config = { namesql: "PKG_TEST.GetTest", callback: "f_result_thuuuu", connstr: "ConnOracleXangDau" };
    var para = {
        v_Code: '0101'
    };
    ExecuteServiceSyns(config, para);
}

function f_result_thuuuu(config,para,lst)
{
    console.log(lst);
}