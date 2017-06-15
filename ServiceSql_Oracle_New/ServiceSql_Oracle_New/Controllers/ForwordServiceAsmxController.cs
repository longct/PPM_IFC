using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using ServiceSql_Oracle_New.WebReference;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
    
{
    public class ForwordServiceAsmxController : ApiController
    {
        // GET: api/ForwordServiceAsmx
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ForwordServiceAsmx/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ForwordServiceAsmx
        public string Post(ValueForart value)
        {
            try
            {
                var json = "";
                WS ws = new WS();

                return json;

            }catch(Exception ex)
            {
                return ex.Message;

            }
        }

        // PUT: api/ForwordServiceAsmx/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ForwordServiceAsmx/5
        public void Delete(int id)
        {
        }
    }
    public class ValueForart
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
