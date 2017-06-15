using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using SLCommon;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace ServiceSql_Oracle_New.Controllers
{
   public class general
   {

        public Dictionary<string, string> ReadFileJson(Dictionary<string, string> dicAppSet)
        {
            try
            {
                return null;
                if (!dicAppSet.ContainsKey("pathdecode")) return null;
                var path = dicAppSet["pathdecode"];
                Dictionary<string, string> dic = new Dictionary<string, string>();

                // var path = @"D:\Project\RestFulService_SQL_Oracle\SeviceSql_Oracle\SeviceSql_Oracle\bin\decode.json";
                // read JSON directly from a file
                lock (path)
                {
                    using (StreamReader file = File.OpenText(path))
                    using (JsonTextReader reader = new JsonTextReader(file))
                    {
                        JObject o2 = (JObject)JToken.ReadFrom(reader);
                        foreach (var val in o2)
                        {
                            dic.Add(val.Key.ToLower(), val.Value.ToString());
                        }
                    }
                    return dic;
                }

            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public Dictionary<string, string> ReadAppseting()
       {
           try
           {
               var dicPara = new Dictionary<string, string>();
               foreach (string key in ConfigurationManager.AppSettings)
               {
                   dicPara.Add(key.ToLower(), ConfigurationManager.AppSettings[key]);
               }
               foreach (ConnectionStringSettings css in ConfigurationManager.ConnectionStrings)
               {
                   dicPara.Add(css.Name.ToLower(), css.ConnectionString);
               }
               return dicPara;
           }
           catch (Exception ex)
           {
               return null;
           }
       }

       public List<string> ConvertDatasetToListJson(DataSet ds)
       {
           try
           {
               List<string> lstJson = new List<string>();

               for (int i = 0; i < ds.Tables.Count; i++)
               {
                   var rows = (from DataRow dr in ds.Tables[i].Rows select ds.Tables[i].Columns.Cast<DataColumn>().ToDictionary(col => col.ColumnName.ToLower().Trim(), col => dr[col])).ToList();
                   lstJson.Add(JsonConvert.SerializeObject(rows));
               }
               return lstJson;
           }
           catch (Exception ex)
           {
               return null;
           }
       }

        public List<string> ConvertDatasetToListJsonNoLower(DataSet ds)
        {
            try
            {
                List<string> lstJson = new List<string>();

                for (int i = 0; i < ds.Tables.Count; i++)
                {
                    var rows = (from DataRow dr in ds.Tables[i].Rows select ds.Tables[i].Columns.Cast<DataColumn>().ToDictionary(col => col.ColumnName.Trim(), col => dr[col])).ToList();
                    lstJson.Add(JsonConvert.SerializeObject(rows));
                }
                return lstJson;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public string ConvertListToJson(List<string> lst)
       {
           try
           {
               var json = "";
               if (lst == null || lst.Count == 0) return "";
               if (lst.Count == 1)
               {
                   json = lst[0];
                   return json;
               }
               else
               {
                   int i = 0;
                   foreach (var item in lst)
                   {
                       json += "{\"kq" + i + "\":" + item + "},";
                       i++;
                   }
                   var muti = "[" + json.Substring(0, json.Length - 1) + "]";
                   return muti;
               }
           }
           catch (Exception ex)
           {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }

       }

        public string ConvertListToJson2(List<string> lst)
        {
            try
            {
                var json = "";
                if (lst == null || lst.Count == 0) return "";
                if (lst.Count == 1)
                {
                    json = lst[0];
                    return json;
                }
                else
                {
                    int i = 0;
                    foreach (var item in lst)
                    {
                        json += "{\"item\":" + item + "},";
                        i++;
                    }
                    var muti = "[" + json.Substring(0, json.Length - 1) + "]";
                    return muti;
                }
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }

        }

        public List<string> ParaConvertListPara(string para)
        {
           try
           {
               var lst = new List<string>();
               //para
               if (para == null || para == "" || para == "[]")
                   lst = null;
               else
               {
                   var pr = JsonConvert.DeserializeObject<List<string>>(para);
                   foreach (var j in pr)
                   {
                       lst.Add(j);
                   }
               }
               return lst;
           }
           catch (Exception)
           {
               return null;
           }
       }

        public Dictionary<string, string> ParaConvertDicPara(string para)
        {
            try
            {
                var dicConfig = new Dictionary<string, string>();
                // config
                if (para == null || para == "" || para == "[]")
                    return null;
                JObject cf = JObject.Parse(para);
                foreach (var j in cf)
                {
                    dicConfig.Add(j.Key.ToLower().Trim(), j.Value.ToString().Trim());
                }

                //if (!dicConfig.ContainsKey("namesql"))
                //    return null;
                return dicConfig;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Dictionary<string, string> ConfigConvertToDicConfig(string config)
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

               //if (!dicConfig.ContainsKey("namesql"))
               //    return null;
               return dicConfig;
           }
           catch (Exception)
           {
               return null;
           }
       }

       public Dictionary<string, string> DecodeProcedueConfig(Dictionary<string, string> dicConfig, Dictionary<string, string> dicProce)
       {
           return dicConfig;
           if (!dicConfig.ContainsKey("namesql") || !dicProce.ContainsKey(dicConfig["namesql"])) return null;
           dicConfig["namesql"] = dicProce[dicConfig["namesql"].ToLower()];
           return dicConfig;
       }
      

       public static void WriterLogTracking(string NoiDung, Dictionary<string, string> dicAppSet)
       {
           try
           {
               if(! dicAppSet.ContainsKey("pathlog"))return;
               var path = dicAppSet["pathlog"];

               lock (path)
               {
                   if (File.Exists(path))
                   {
                       using (StreamWriter writer = File.AppendText(path))
                       {
                           writer.WriteLine(DateTime.Now + " " + NoiDung);
                           writer.Close();
                       }
                   }
                   else
                   {
                       lock (path)
                       {
                           using (StreamWriter writer = File.AppendText(path))
                           {
                               writer.WriteLine(DateTime.Now + " " + NoiDung);
                               writer.Close();
                           }
                       }
                   }
               }
           }
           catch (Exception ex)
           {
               //WriterLogTracking(ex.Message);
           }
       }
       public  DataTable ConvertJsonToDataTable(string sJsonOject, string tableName)
       {
           if (sJsonOject == "[]" || string.IsNullOrEmpty(sJsonOject)) return new DataTable();
           var jsonObjWithTableName = "{\"" + tableName + "\":" + sJsonOject.Trim() + "}";
           var ds = JsonConvert.DeserializeObject<DataSet>(jsonObjWithTableName);
           var dt = ds.Tables[tableName];
           return dt;
       }

        public SqlParameter[] ConvertDicToSqlPara(Dictionary<string,string> dicParr)
        {
            try
            {
                List<SqlParameter> lstParr = new List<SqlParameter>();
                foreach (var item in dicParr)
                {
                    lstParr.Add(new SqlParameter("@" + item.Key, item.Value));
                }
                return lstParr.ToArray();
            }
            catch { return null; }
        }

        public void ExportTable(DataTable dtt,Dictionary<string,string> dicConfig)
        {
            //DataSet ds = new DataSet();
            var ds = new DataSet();
            using (var rdr = new StringReader(dicConfig["header"]))
            {
                ds.ReadXmlSchema(rdr);
            }
            foreach (DataRow row in dtt.Rows)
            {
                ds.Tables[0].ImportRow(row);
            }

            string path = HttpContext.Current.Server.MapPath("~/UploadFile/Xml/"+dicConfig["namefile"]);

            ds.WriteXml(path, XmlWriteMode.WriteSchema);
        }

        public DataSet convertDatasetToLower(DataSet ds)
        {
            for(var i = 0 ; i <ds.Tables.Count; i++)
            {
                var j = 0;
                foreach(DataColumn col in ds.Tables[i].Columns)
                {
                    ds.Tables[i].Columns[j].ColumnName = ds.Tables[i].Columns[j].ColumnName.ToLower();
                    j++;
                }
            }
            return ds;
        }
        public DataSet convertDatasetToUpper(DataSet ds)
        {
            for (var i = 0; i < ds.Tables.Count; i++)
            {
                var j = 0;
                foreach (DataColumn col in ds.Tables[i].Columns)
                {
                    ds.Tables[i].Columns[j].ColumnName = ds.Tables[i].Columns[j].ColumnName.ToUpper();
                    j++;
                }
            }
            return ds;
        }

        public  byte[] HexToByteArray(string hex)
        {
            return Enumerable.Range(0, hex.Length)
                             .Where(x => x % 2 == 0)
                             .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                             .ToArray();
        }

        private IEnumerable<string> GetSubdirectoriesContainingOnlyFiles(string path)
        {
            return from subdirectory in Directory.GetDirectories(path, "*", SearchOption.AllDirectories)
                   where Directory.GetDirectories(subdirectory).Length == 0
                   select subdirectory;
        }
        public List<string> GetAllFolder(string PathFolder)
        {
            List<string> ListPath = new List<string>();
            var AllPath = GetSubdirectoriesContainingOnlyFiles(PathFolder);
            ListPath.Add(PathFolder);
            ListPath.AddRange(AllPath);

            return ListPath;
        }
    }
}
