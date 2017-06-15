using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ServiceSql_Oracle_New.Controllers
{
    public class gnSqlNomal
    {
        public string ExecuteSqlDataset(Dictionary<string, string> dicConfig, Dictionary<string, string> dicParr)
        {

            SqlConnection Conn = null;
            SqlCommand command = null;
            SqlDataAdapter adapter = null;
            try
            {
              //  SqlConnection Connection = new SqlConnection(ConfigurationManager.ConnectionStrings[_dicConfig["connstr"]].ConnectionString);
             //   var conStr = Connection != null ? Connection.ConnectionString : "";
                general gn = new general();
                var dicApp = gn.ReadAppseting();
                string Connection = dicApp[dicConfig["connstr"].ToString().ToLower()];// dicApp["connectsql"];
                var conStr = Connection != null ? Connection : "";
                if (conStr == "")
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Lỗi khi gọi ConnectionString\"}]}";

                Conn = new SqlConnection(conStr);
                command = new SqlCommand { Connection = Conn };
                command.CommandText = dicConfig["namesql"];
                command.Parameters.Clear();
                command.CommandType = CommandType.StoredProcedure;
                if (dicParr != null)
                {
                    List<SqlParameter> lstParr = new List<SqlParameter>();
                    foreach (var item in dicParr)
                    {
                        lstParr.Add(new SqlParameter("@" + item.Key, item.Value));
                    }
                    // trường hợp đặc biệt thêm mã hóa đăng nhập
                    // encode: true, passold: "PP01000111917", passnew: "PasswordEncrypt"
                    if (dicConfig.ContainsKey("encode") && Convert.ToBoolean(dicConfig["encode"]))
                    {
                        string passEncrypt = SLCommon.Security.EncryptString(dicConfig["passold"]);
                        lstParr.Add(new SqlParameter("@" + dicConfig["passnew"], passEncrypt));
                    }
                    command.Parameters.AddRange(lstParr.ToArray());

                }
                if (Conn.State != ConnectionState.Open)
                    Conn.Open();
                adapter = new SqlDataAdapter(command);
                var ds = new DataSet();
                adapter.Fill(ds);

                var data = gn.ConvertDatasetToListJson(ds);
                if (data == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Lỗi khi ConvertDatasetToListJson\"}]}";
                var json = gn.ConvertListToJson(data);
                var strResult = "{\"result\":\"OK\",\"data\":" + json + "}";
                return strResult;
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                    command = null;
                }
                if (adapter != null)
                {
                    //if(adapter.is)
                    adapter.Dispose();
                    adapter = null;
                }
                if (Conn.State != ConnectionState.Closed)
                {
                    Conn.Close();
                }
            }

        }

        public string ExecuteSqlDatasetNoLower(Dictionary<string, string> dicConfig, Dictionary<string, string> dicParr)
        {

            SqlConnection Conn = null;
            SqlCommand command = null;
            SqlDataAdapter adapter = null;
            try
            {
                //  SqlConnection Connection = new SqlConnection(ConfigurationManager.ConnectionStrings[_dicConfig["connstr"]].ConnectionString);
                //   var conStr = Connection != null ? Connection.ConnectionString : "";
                general gn = new general();
                var dicApp = gn.ReadAppseting();
                string Connection = dicApp[dicConfig["connstr"].ToString().ToLower()];// dicApp["connectsql"];
                var conStr = Connection != null ? Connection : "";
                if (conStr == "") 
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Lỗi khi gọi ConnectionString\"}]}";
                Conn = new SqlConnection(conStr);
                command = new SqlCommand { Connection = Conn };
                command.CommandText = dicConfig["namesql"];
                command.Parameters.Clear();
                command.CommandType = CommandType.StoredProcedure;
                if (dicParr != null)
                {
                    List<SqlParameter> lstParr = new List<SqlParameter>();
                    foreach (var item in dicParr)
                    {
                        lstParr.Add(new SqlParameter("@" + item.Key, item.Value));
                    }
                    // trường hợp đặc biệt thêm mã hóa đăng nhập
                    // encode: true, passold: "PP01000111917", passnew: "PasswordEncrypt"
                    if (dicConfig.ContainsKey("encode") && Convert.ToBoolean(dicConfig["encode"]))
                    {
                        string passEncrypt = SLCommon.Security.EncryptString(dicConfig["passold"]);
                        lstParr.Add(new SqlParameter("@" + dicConfig["passnew"], passEncrypt));
                    }
                    command.Parameters.AddRange(lstParr.ToArray());

                }
                if (Conn.State != ConnectionState.Open)
                    Conn.Open();
                adapter = new SqlDataAdapter(command);
                var ds = new DataSet();
                adapter.Fill(ds);

                var data = gn.ConvertDatasetToListJsonNoLower(ds);
                if (data == null)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Lỗi khi ConvertDatasetToListJson\"}]}";
                var json = gn.ConvertListToJson(data);
                var strResult = "{\"result\":\"OK\",\"data\":" + json + "}";
                return strResult;
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                    command = null;
                }
                if (adapter != null)
                {
                    //if(adapter.is)
                    adapter.Dispose();
                    adapter = null;
                }
                if (Conn.State != ConnectionState.Closed)
                {
                    Conn.Close();
                }
            }

        }

        public Dictionary<string, string> convertParaToDic(string para)
        {
            try
            {
                var dicPara = new Dictionary<string, string>();

                //para
                if (para == null || para == "" || para == "[]")
                    dicPara = null;
                else
                {
                    JObject pr = JObject.Parse(para);
                    foreach (var j in pr)
                    {
                        dicPara.Add(j.Key.Trim().ToLower(), j.Value.ToString().Trim());
                    }
                }
                return dicPara;
            }
            catch (Exception e)
            { return null; }
        }
        public Dictionary<string, string> convertConfigToDic(string config)
        {
            try
            {
                var dicConfig = new Dictionary<string, string>();

                // config
                if (config == null || config == "" || config == "[]")
                    return null;
                JObject cf = JObject.Parse(config);
                foreach (var j in cf)
                {
                    dicConfig.Add(j.Key.ToLower().Trim(), j.Value.ToString().Trim());
                }

              //  if (!dicConfig.ContainsKey("namesql"))
              //      return null;
                return dicConfig;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}