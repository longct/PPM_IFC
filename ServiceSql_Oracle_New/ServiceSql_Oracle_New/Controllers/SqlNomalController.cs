using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class SqlNomalController : ApiController
    {
        // GET api/sqlnomal
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/sqlnomal/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/sqlnomal
        public string Post(ValueNomal value)
        {
            gnSqlNomal gn = new gnSqlNomal();
            general gns = new general();
            var  dicAppSet = gns.ReadAppseting();

            if (value == null || value.config == null) return "{\"result\":\"ERROR\",\"data\":\"Kiểm tra lại định dạng json đầu vào\"}";

            Db_Access ac = new Db_Access();
            var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, value.config, value.para);
            if (!check)
            {
                return "{\"result\":\"ERROR\",\"data\":\"Không cho phép request liên tục\"}";
            }

            var config = gn.convertConfigToDic(value.config);
            var para = gn.convertParaToDic(value.para);

            return gn.ExecuteSqlDataset(config,para);
        }

        // PUT api/sqlnomal/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/sqlnomal/5
        public void Delete(int id)
        {
        }
        
    }
    public class ValueNomal
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
