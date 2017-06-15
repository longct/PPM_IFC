using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Text_ReadFileController : ApiController
    {
        // GET: api/Text_ReadFile
        public IEnumerable<string> Get()
        {

            return new string[] { "value1", "value2" };
        }

        // GET: api/Text_ReadFile/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Text_ReadFile
        public string Post(readfiletext value)
        {
            try
            {
                if (value == null || value.config == null) return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                gnSqlNomal gn = new gnSqlNomal();
                var config = gn.convertConfigToDic(value.config);
                File.WriteAllText(config["pathfile"], config["content"]);

                return "{\"result\":\"OK\",\"data\":[{\"status\":\"Tạo file ok\"}]}";
            }
            catch(Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\""+ex.Message+"\"}]}";
            }
        }

        // PUT: api/Text_ReadFile/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/Text_ReadFile/5
        public void Delete(int id)
        {
        }
    }
    public class readfiletext
    {
        public string config { get; set; }
    }
}
