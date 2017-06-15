using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Web.Http;
using Oracle.DataAccess.Client;
using System.Configuration;
using System.Data;
using Newtonsoft.Json;
using System.Web.Script.Serialization;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Check_REmailController : ApiController
    {
        Dictionary<string, string> dicAppSet;
        Dictionary<string, string> dicProce;
        public string Get(string config, string para)
        {
            try
            {
                string id = JsonConvert.DeserializeObject<Dictionary<string, string>>(para)["id"];
                if (id.Equals("id_user"))
                {
                    if (dicAppSet == null || dicAppSet.Count == 0)
                    {
                        general gn = new general();
                        dicAppSet = gn.ReadAppseting();
                        if (dicAppSet == null || dicAppSet.Count == 0)
                            return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";
                    }

                    if (config == null || para == null) return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                    Db_Access ac = new Db_Access();
                    var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, config, para);
                    if (!check)
                    {
                        return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không cho phép request liên tục\"}]}";
                    }

                    gnOracle orc = new gnOracle();
                    var json = orc.ExcuteStores(config, para, dicAppSet);
                    return json;
                } else
                    return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
	}
}