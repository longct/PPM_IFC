using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Check_CheckSqlController : ApiController
    {
        // GET: api/Check_CheckSql
        public string Get()
        {
           
            gnCheckSql ch = new gnCheckSql();
          return  ch.CheckSqlPing();
           
        }

        // GET: api/Check_CheckSql/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check_CheckSql
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Check_CheckSql/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check_CheckSql/5
        public void Delete(int id)
        {
        }
    }
}
