using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class BulkCopySqlController : ApiController
    {
        // GET: api/BulkCopySql
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BulkCopySql/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BulkCopySql
        public string Post(paraBulkTableSql value)
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                var json = "";
                var dicConfig = gn.ConfigConvertToDicConfig(value.config);
                if (dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                var table = JObject.Parse(value.table);
                if (table == null)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                Db_Access ac = new Db_Access();
                var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, value.config, "");
                if (!check)
                {
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không cho phép request liên tục\"}]}";
                }

                gnSqlNomal gns = new gnSqlNomal();
                var para = gns.convertParaToDic(value.para);
                    
                foreach (var val in table)
                {
                    var dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);
                    gnSql sql = new gnSql();
                    json = sql.BulkCopyToSql(dt, dicConfig, para);
                }
                return json;
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // PUT: api/BulkCopySql/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/BulkCopySql/5
        public void Delete(int id)
        {
        }

    }
    public class paraBulkTableSql
    {
        public string table { get; set; }
        public string config { get; set; }
        public string para { get; set; }
    }
}
