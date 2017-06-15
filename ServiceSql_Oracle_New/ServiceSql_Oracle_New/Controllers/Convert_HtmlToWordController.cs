using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Convert_HtmlToWordController : ApiController
    {
        // GET: api/Convert_HtmlToWord
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Convert_HtmlToWord/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Convert_HtmlToWord
        public string Post(HtmlToWord value)
        {
            try
            {
                Dictionary<string, string> dicAppSet;
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                if (dicAppSet == null || dicAppSet.Count == 0)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";

                var dicConfig = gn.ConfigConvertToDicConfig(value.config);
                if (dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                getTextInHtml html = new getTextInHtml();
                    string data = html.GetHTMLfromUrl(dicConfig["fromurl"]);

                    NoInkSoftware.HTMLtoDOCX NewFile = new NoInkSoftware.HTMLtoDOCX();
                    var namefile = dicAppSet["path_saveonserver"] + dicConfig["namefile"];
                    NewFile.CreateFileFromHTML(data, namefile);

                    return "{\"result\":\"OK\",\"data\":\"" + namefile + "\"}";
              
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // PUT: api/Convert_HtmlToWord/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Convert_HtmlToWord/5
        public void Delete(int id)
        {
        }
    }
    public class HtmlToWord
    {
        public string config { get; set; }
    }
}
