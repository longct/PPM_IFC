using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class SqlNomalNoLowerController : ApiController
    {
        // GET api/SqlNomalNoLower
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/SqlNomalNoLower/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/SqlNomalNoLower
        public string Post(ValueNomal value)
        {
            gnSqlNomal gn = new gnSqlNomal();
            if (value == null || value.config == null)
            return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
            var config = gn.convertConfigToDic(value.config);
            var para = gn.convertParaToDic(value.para);
            return gn.ExecuteSqlDatasetNoLower(config,para);
        }

        // PUT api/SqlNomalNoLower/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/SqlNomalNoLower/5
        public void Delete(int id)
        {
        }
        
    }
    //public class ValueNomal
    //{
    //    public string config { get; set; }
    //    public string para { get; set; }
    //}
}
