using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Configuration;
using Oracle.DataAccess.Client;
using System.Web;

namespace ServiceSql_Oracle_New.Controllers
{
    public class BulkcopyOracleController : ApiController
    {
      
        // GET api/BulkcopyOracle
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/BulkcopyOracle/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/BulkcopyOracle
        public string Post(paraBulkTable value)
        {
            try
            {
                Dictionary<string, string> dicAppSet;
                Dictionary<string, string> dicProce;

                general gn = new general();
                dicAppSet = gn.ReadAppseting();

                var json = "";
                var dicConfig = gn.ConfigConvertToDicConfig(value.config);
                if(dicConfig==null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                var para = JObject.Parse(value.table);
                if (para == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                Db_Access ac = new Db_Access();
                var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, value.config, "");
                if (!check)
                {
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không cho phép request liên tục\"}]}";
                }

                foreach (var val in para)
                {
                    var dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);
                    gnBulkCopyOracle or = new gnBulkCopyOracle();
                   json= or.BulkCopyToOracle(dt, dicConfig);
                }
                return json;
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
            
        }

        // PUT api/BulkcopyOracle/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/BulkcopyOracle/5
        public void Delete(int id)
        {
        }

       
    }

    public class paraBulkTable
    {
        public string table { get; set; }
        public string config { get; set; }
    }
}
