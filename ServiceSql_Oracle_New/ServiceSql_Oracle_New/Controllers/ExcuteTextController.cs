using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class ExcuteTextController : ApiController
    {
        // GET: api/ExcuteText
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ExcuteText/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ExcuteText

        public string Post(ValueText value)
        {

            if (value == null || value.connstr == null || value.connstr =="" || value.sqltext ==null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

            general gns = new general();
            var dicAppSet = gns.ReadAppseting();
            Db_Access ac = new Db_Access();
            var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, value.sqltext, "");
            if (!check)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không cho phép request liên tục\"}]}";
            }

            var dicConfig = new Dictionary<string, string>();
            dicConfig.Add("connstr", value.connstr);
            dicConfig.Add("namesql", value.sqltext);
            dicConfig.Add("commandtype", "Text");

            var json = "";

            gnOracle orc = new gnOracle();
            json = orc.ExcuteReturnJson(dicConfig, null);

            return json;
        }

        // PUT: api/ExcuteText/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ExcuteText/5
        public void Delete(int id)
        {
        }
    }
    public class ValueText
    {
        public string connstr { get; set; }
        public string sqltext { get; set; }
    }
}
