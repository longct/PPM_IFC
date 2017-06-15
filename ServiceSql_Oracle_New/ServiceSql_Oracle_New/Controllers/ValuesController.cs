using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.UI;

namespace ServiceSql_Oracle_New.Controllers
{
    public class ValuesController : ApiController
    {
        public  Dictionary<string, string> dicAppSet ;
        public  Dictionary<string, string> dicProce ; 
        // GET api/values
        public IEnumerable<string> Get()
        {
            general gn = new general();
            dicAppSet = gn.ReadAppseting();
           
            Db_Access ac = new Db_Access();

            var check=  ac.checkRequertLienTuc(HttpContext.Current, dicAppSet,"test","test");

            return new string[] { "value1", (!check ? "Không được thực hiện lệnh liên tục trong "+ dicAppSet["time_requestlientuc"] + " ms":"ok") };
        }

        // GET api/values/5
        public string Get(int id)
        {
        
            return "value";
        }
     
        public string Post(ValueModel value)
        {
            if (dicAppSet == null || dicAppSet.Count == 0)
            {
                    general gn = new general();
                    dicAppSet = gn.ReadAppseting();
                    if (dicAppSet == null || dicAppSet.Count == 0)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";
            }
            if (dicProce == null || dicProce.Count == 0)
            {
                    general gn = new general();
                    dicProce = gn.ReadFileJson(dicAppSet);
                    if (dicProce == null || dicProce.Count == 0)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc file json mã hóa procedue lỗi\"}]}";
            }
            Db_Access ac = new Db_Access();
            var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, value.config, value.para);
            if (!check)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không cho phép request liên tục\"}]}";
            }

            if (value == null || value.config == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
            var json = "";
          
                gnSql sql = new gnSql();
                json = sql.ExcuteStores(value.config, value.para,dicAppSet, dicProce);
          
            return json;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
    public class ValueModel
    {
        public string config { get; set; }
        public string para { get; set; }
    }

    
}