using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Web;
using System.Web.Caching;
using System.Web.Http;
namespace ServiceSql_Oracle_New.Controllers
{
    public class ExcuteOracleController : ApiController
    {
        Dictionary<string, string> dicAppSet;
        Dictionary<string, string> dicProce;
        // GET api/ExcuteOracle
        public IEnumerable<string> Get()
        {
            try
            {
                OracleConnection conn = null;
                OracleCommand cmd = null;
                OracleDataAdapter adapter = null;
                try
                {

                    string connectOracle = ConfigurationManager.ConnectionStrings["ConnectOracle"].ConnectionString;
                    conn = new OracleConnection(connectOracle);
                    conn.Open();
                    cmd = new OracleCommand();
                    cmd.Connection = conn;
                    cmd.CommandText = "SELECT 'OK' OK FROM DUAL";
                    cmd.CommandType = CommandType.Text;
                    cmd.BindByName = true;
                    adapter = new OracleDataAdapter(cmd);
                    var ds = new DataSet();
                    adapter.Fill(ds);
                    general gn = new general();
                    var data = gn.ConvertDatasetToListJson(ds);
                    if (data == null) return new string[] { "ok 1", "1" };
                    var json = gn.ConvertListToJson(data);
                    var strResult = "{\"result\":\"OK\",\"data\":" + json + "}";
                    return new string[] { "ok 2", json };
                }
                catch (Exception ex)
                {
                    return new string[] { "ERROR 3", ex.Message };
                }
                finally
                {
                    if (cmd != null)
                    {
                        cmd.Dispose();
                    }
                    if (adapter != null)
                    {
                        adapter.Dispose();
                    }
                    if (conn != null && conn.State != ConnectionState.Closed)
                    {
                        conn.Close();
                    }
                }

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

            if (value == null || value.config == null) return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

            Db_Access ac = new Db_Access();
            var check = ac.checkRequertLienTuc(HttpContext.Current, dicAppSet, value.config, value.para);
            if (!check)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không cho phép request liên tục\"}]}";
            }
            //Db_Access_Cookie cook = new Db_Access_Cookie();
            //HttpCookie cookie = HttpContext.Current.Request.Cookies["Cookie"];
            //var checkCook = cook.checkCookie(cookie, dicAppSet, value.config);

            //var json = "";
            //if (checkCook == "ERROR")
            //{
            //    return "{\"result\":\"CookieError\",\"data\":[]}";
            //}
            //else
            //{
                gnOracle orc = new gnOracle();
              var  json = orc.ExcuteStores(value.config, value.para, dicAppSet);
          //  }
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
    public class ValueModelOracle
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
