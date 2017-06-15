using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Convert_HtmlToXmlController : ApiController
    {
        // GET: api/Convert_HtmlToXml
        public IEnumerable<string> Get()
        {            
            return new string[] { "value1", "value2" };
        }

        // GET: api/Convert_HtmlToXml/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Convert_HtmlToXml
        public string Post(HtmlToXml value)
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

                var namefile = dicAppSet["path_saveonserver"] + dicConfig["namefile"];
                //requesting the particular web page
                var httpRequest = (HttpWebRequest)WebRequest.Create(dicConfig["fromurl"]);

                //geting the response from the request url
                var response = (HttpWebResponse)httpRequest.GetResponse();

                //create a stream to hold the contents of the response (in this case it is the contents of the XML file
                var receiveStream = response.GetResponseStream();

                //creating XML document
                var mySourceDoc = new XmlDocument();

                //load the file from the stream
                mySourceDoc.Load(receiveStream);
                mySourceDoc.Save(namefile);
                //close the stream
                receiveStream.Close();
                return "{\"result\":\"OK\",\"data\":\"" + namefile + "\"}";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // PUT: api/Convert_HtmlToXml/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Convert_HtmlToXml/5
        public void Delete(int id)
        {
        }
    }
    public class HtmlToXml
    {
        public string config { get; set; }
    }
}
