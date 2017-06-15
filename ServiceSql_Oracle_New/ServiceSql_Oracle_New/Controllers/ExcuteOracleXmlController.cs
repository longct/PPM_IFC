using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Web;
using System.Web.Caching;
using System.Web.Http;
using System.Web.Mvc;

namespace ServiceSql_Oracle_New.Controllers
{
    public class ExcuteOracleXmlController : ApiController
    {
         Dictionary<string, string> dicAppSet;
         Dictionary<string, string> dicProce;
         // GET api/ExcuteOracle
        public IEnumerable<string> Get()
        {
            try
            {
                return new string[] { "value1", "value2" };
            }
            catch (Exception ex) { return new string[] { "errror 4 ", ex.Message }; }
        }

        // GET api/ExcuteOracle/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/ExcuteOracle
        public string Post(ValueModelOracle value)
        {           

            if (dicAppSet == null || dicAppSet.Count == 0)
            {
                    general gn = new general();
                    dicAppSet = gn.ReadAppseting();
                    if (dicAppSet == null || dicAppSet.Count == 0)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";            
            }
           
            if (value == null || value.config == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

            Db_Access ac = new Db_Access();
            var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, value.config, value.para);
            if (!check)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không cho phép request liên tục\"}]}";
            }

            var json = "";

            gnOracleXml orc = new gnOracleXml();
            json = orc.ExcuteStores(value.config, value.para, dicAppSet);

            return json;
        }

        // PUT api/ExcuteOracle/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/ExcuteOracle/5
        public void Delete(int id)
        {
        }
    }
    //public class ValueModelOracle
    //{
    //    public string config { get; set; }
    //    public string para { get; set; }
    //}
}
