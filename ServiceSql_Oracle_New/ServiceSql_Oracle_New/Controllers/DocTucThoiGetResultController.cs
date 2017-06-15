using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class DocTucThoiGetResultController : ApiController
    {
        Dictionary<string, string> dicAppSet;
        Dictionary<string, string> dicProce;
        // GET: api/DocTucThoiGetResult
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DocTucThoiGetResult/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DocTucThoiGetResult
        public string Post(DocTucThoi value)
        {
            try
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
                var json = "";

            gnDocTucThoi orc = new gnDocTucThoi();
            json = orc.getResultDocTucThoi(value.config, value.para, dicAppSet);

            return json;
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // PUT: api/DocTucThoiGetResult/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DocTucThoiGetResult/5
        public void Delete(int id)
        {
        }
    }
   
}
