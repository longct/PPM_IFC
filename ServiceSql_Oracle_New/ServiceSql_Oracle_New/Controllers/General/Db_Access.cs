using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.IO;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Db_Access
    {
        public bool checkRequertLienTuc(HttpContext requet, Dictionary<string, string> dicAppSet,string config,string para)
        {
            WriterLogTracking("start...");
            var statuss = "OK";
            try
            {
                String ip = requet.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (string.IsNullOrEmpty(ip))
                {
                    ip = requet.Request.ServerVariables["REMOTE_ADDR"];
                }

                var count = Convert.ToInt32(dicAppSet["time_requestlientuc"]);
                 var starttime = DateTime.Now.AddMilliseconds(-count).ToString("yyyy-MM-dd HH:mm:ss");
                //var starttime = DateTime.Now.AddHours(-5).ToOADate();
                var endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                //var strSelect = "select * from Header ";
                var strSelect = "select * from Header where IPs ='" + (ip == null ? "-1" : ip) + "' and TimeInput >=#" + starttime + "# and TimeInput < #" + endtime + "# and config like '%" + convertToUnSign3(config) + "%'  and para like '%" + convertToUnSign3(para) + "%'";
                var ds = ExcuteAccess(strSelect, dicAppSet["pathfileaccess"]);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    statuss = "ERROR";
                    return false;
                }
                statuss = "OK";
                return true;
            }
            catch(Exception ex)
            {
                WriterLogTracking(ex.Message);
                return true;
            }
            finally
            {
                insertHeader(requet, dicAppSet,config,para, statuss);
                deleteDataOld(dicAppSet);
            }
        }

        public void insertHeader(HttpContext requet, Dictionary<string,string> dicAppSet,string config,string para,string statuss)
        {
            try
            {
                String ip = requet.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (string.IsNullOrEmpty(ip))
                {
                    ip = requet.Request.ServerVariables["REMOTE_ADDR"];
                }

                 var str = @"insert into Header(IPs,TimeInput,config,para,statuss) values('" + (ip==null ?"-1":ip )+ "',#" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "#,'"+ convertToUnSign3(config) + "','"+ convertToUnSign3(para) + "','" + statuss + "')";
             //   var str = @"insert into Header(IPs,TimeInput,config,para,statuss) values('" + (ip == null ? "-1" : ip) + "','" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "','11','22','" + statuss + "')";
                ExcuteAccess(str, dicAppSet["pathfileaccess"]);
              
            }
            catch(Exception ex)
            {
                WriterLogTracking(ex.Message);
            }
        }
        public void deleteDataOld(Dictionary<string, string> dicAppSet)
        {
            try
            {
                var time = DateTime.Now.AddMinutes(-10).ToString("yyyy-MM-dd HH:mm:ss");
                var str = "delete from Header where TimeInput <= #" + time+"#";
                ExcuteAccess(str, dicAppSet["pathfileaccess"]);
                WriterLogTracking("end");
            }
            catch(Exception ex)
            {
                WriterLogTracking(ex.Message);
            }
        }
        public  string convertToUnSign3(string s)
        {
            try
            {
                if (s == null) return "-1";
                Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
                string temp = s.Normalize(NormalizationForm.FormD);
                var str = regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
                str = str.Replace("[", "_").Replace("]", "_").Replace("{", "_").Replace("}", "_").Replace(",", "_").Replace(";", "_").Replace(":", "_").Replace("\"", "_").Replace(".", "_").Replace("'","_");
                str = str.Length > 200 ? str.Substring(0, 200) : str;
                return str;
            }
            catch(Exception exp){ WriterLogTracking(exp.Message); return s; }
        }
        public DataSet ExcuteAccess(string strSQL, string pathFile)
        {           
                String connectionString =
                  @"Provider=Microsoft.ACE.OLEDB.12.0;Data"+ @" Source="+ pathFile;
            DataSet ds = new DataSet();
            OleDbConnection conn =
                  new OleDbConnection(connectionString);
            try
            {

                //Open Database Connection
                conn.Open();

                OleDbDataAdapter da =
                         new OleDbDataAdapter(strSQL, conn);

                //Fill the DataSet
                da.Fill(ds);
                return ds;          
            }
            catch (OleDbException exp)
            {
                WriterLogTracking(exp.Message);
                return null;
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }


        }


        public  void WriterLogTracking(string NoiDung)
        {
            try
            {
                return;
                var path = "H:\\log.txt" ;

                if (File.Exists(path))
                {
                    using (StreamWriter writer = File.AppendText(path))
                    {
                        writer.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff") + " " + NoiDung);
                        writer.Close();
                    }
                }
                else
                {
                    lock (path)
                    {
                        using (StreamWriter writer = File.AppendText(path))
                        {
                            writer.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff") + " " + NoiDung);
                            writer.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //WriterLogTracking(ex.Message);
            }
        }
    }
}