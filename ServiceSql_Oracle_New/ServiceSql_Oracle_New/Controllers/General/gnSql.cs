using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;


namespace ServiceSql_Oracle_New.Controllers
{
    public class gnSql
    {
        general gn = new general();
        public string ExcuteStores(string config, string para, Dictionary<string, string> dicAppset, Dictionary<string, string> dicProce)
        {
            try
            {
                var lstPara = gn.ParaConvertListPara(para);
                var dicConfig = gn.ConfigConvertToDicConfig(config);
                if (lstPara == null && dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                var dicConfigOk = gn.DecodeProcedueConfig(dicConfig,dicProce);
                if(dicConfigOk==null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Chưa mã hóa thủ tục\"}]}";
                var paraOk = DecodeProceduePara(lstPara, dicConfigOk,dicAppset, dicProce);
                                                    
                var json = "";
                json = ExecuteSqlJson(dicConfig, paraOk);
                return json;
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

      
        public string ExecuteSqlJson(Dictionary<string, string> dicConfig, Dictionary<string, string> dicParr)
        {
            SqlConnection Conn = null;
            SqlCommand command = null;
            SqlDataAdapter adapter = null;
            try
            {
                string Connection = ConfigurationManager.ConnectionStrings[dicConfig["connstr"]].ConnectionString;
                var conStr = Connection != null ? Connection : "";
                if (conStr == "") 
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Lỗi khi gọi ConnectionString\"}]}";

                Conn = new SqlConnection(conStr);
                command= new SqlCommand { Connection = Conn };
                command.CommandText = dicConfig["namesql"];
                command.Parameters.Clear();
                command.CommandType = CommandType.StoredProcedure;

                //para
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
    
       
        public DataSet DynamicSelectDataset(string procName, SqlParameter[] sqlParameters, CommandType cmdType, string ConnStr)
        {
                SqlCommand command1 = null;
                SqlConnection ConnTo = null;
                SqlDataAdapter adapter = null;
                try
                {

                    ConnTo = new SqlConnection(ConnStr);
                    command1 = new SqlCommand { Connection = ConnTo };
                    //command1 = new SqlCommand();
                    command1.CommandText = procName;
                    command1.Parameters.Clear();
                    command1.CommandType = cmdType;
                    if (sqlParameters != null)
                        command1.Parameters.AddRange(sqlParameters);
                    if (ConnTo.State != ConnectionState.Open)
                        ConnTo.Open();
                    adapter = new SqlDataAdapter(command1);
                    var ds = new DataSet();
                    adapter.Fill(ds);
                    
                    return ds;

                }
                catch (Exception ex)
                {
                    return null;
                }
                finally
                {
                    if (command1 != null)
                    {
                        command1.Dispose();
                        command1 = null;
                    }
                    if (adapter != null)
                    {
                        //if(adapter.is)
                        adapter.Dispose();
                        adapter = null;
                    }
                    if (ConnTo.State != ConnectionState.Closed)
                    {
                        ConnTo.Close();
                    }
                }
            }
        public Dictionary<string, string> convertLstToDicPara(List<string> lstPara, DataTable dtPara)
        {
            var para = new Dictionary<string, string>();
            var i = 0;
            foreach (DataRow row in dtPara.Rows)
            {
                //if (row["DATA_TYPE"].ToString().ToLower() != "table type")
                para.Add(row["PARAMETER_NAME"].ToString().Replace("@", ""), lstPara[i]);
                i++;
            }
            return para;
        }

        public Dictionary<string, string> DecodeProceduePara(List<string> lstPara, Dictionary<string, string> dicConfig, Dictionary<string, string> dicAppset, Dictionary<string, string> dicProce)
        {
            var lst = dicConfig["namesql"].Replace("[", "").Replace("]", "").Split('.');
            var str = "select PARAMETER_NAME, DATA_TYPE from information_schema.parameters " +
                "where SPECIFIC_SCHEMA ='" + (lst.Length > 1 ? lst[0].ToUpper() : "") + "' AND specific_name='" + (lst.Length == 1 ? lst[0].ToUpper() : lst[1].ToUpper()) + "' " +
                      "ORDER BY ORDINAL_POSITION ASC";

            var ds = DynamicSelectDataset(str, null, CommandType.Text, dicAppset[dicConfig["connstr"].ToLower()]);
            if (ds == null || ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0) return null;
            var para = convertLstToDicPara(lstPara, ds.Tables[0]);
            return para;
        }

        public string BulkCopyToSql(DataTable dt, Dictionary<string, string> dicConfig, Dictionary<string, string> dicParr)
        {
            try
            {
                var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                prDt.Value = dt;
                
                List<SqlParameter> lstParr = new List<SqlParameter>();
                lstParr.Add(prDt);
                if (dicParr != null)
                {
                   
                    foreach (var item in dicParr)
                    {
                        lstParr.Add(new SqlParameter("@" + item.Key, item.Value));
                    }
                    //// trường hợp đặc biệt thêm mã hóa đăng nhập
                    //// encode: true, passold: "PP01000111917", passnew: "PasswordEncrypt"
                    //if (dicConfig.ContainsKey("encode") && Convert.ToBoolean(dicConfig["encode"]))
                    //{
                    //    string passEncrypt = SLCommon.Security.EncryptString(dicConfig["passold"]);
                    //    lstParr.Add(new SqlParameter("@" + dicConfig["passnew"], passEncrypt));
                    //}                  

                }
                string connect = ConfigurationManager.ConnectionStrings[dicConfig["connstr"]].ConnectionString;
                var ds = DynamicSelectDataset(dicConfig["namesql"], lstParr.ToArray(), CommandType.StoredProcedure, connect);
                if(ds==null || ds.Tables.Count==0)
                return 
                        "{\"result\":\"OK\",\"data\":\"[]\"}";

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

        }


        public string BulkCopyToSqlNoLower(DataTable dt, Dictionary<string, string> dicConfig, Dictionary<string, string> dicParr)
        {
            try
            {
                var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                prDt.Value = dt;

                List<SqlParameter> lstParr = new List<SqlParameter>();
                lstParr.Add(prDt);
                if (dicParr != null)
                {

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

                }
                string connect = ConfigurationManager.ConnectionStrings[dicConfig["connstr"]].ConnectionString;
                var ds = DynamicSelectDataset(dicConfig["namesql"], lstParr.ToArray(), CommandType.StoredProcedure, connect);

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

        }

        public DataSet BulkCopyToSqlDataset(DataTable dt, Dictionary<string, string> dicConfig, Dictionary<string, string> dicParr)
        {
            try
            {
                var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                prDt.Value = dt;

                List<SqlParameter> lstParr = new List<SqlParameter>();
                lstParr.Add(prDt);
                if (dicParr != null)
                {

                    foreach (var item in dicParr)
                    {
                        lstParr.Add(new SqlParameter("@" + item.Key, item.Value));
                    }
                }
                string connect = ConfigurationManager.ConnectionStrings[dicConfig["connstr"]].ConnectionString;
                var ds = DynamicSelectDataset(dicConfig["namesql"], lstParr.ToArray(), CommandType.StoredProcedure, connect);
                return ds;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

    }
}
