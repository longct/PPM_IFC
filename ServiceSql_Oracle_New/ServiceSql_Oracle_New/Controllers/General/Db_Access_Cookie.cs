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
    public class Db_Access_Cookie
    {
        public string checkCookie( HttpCookie cookie, Dictionary<string, string> dicAppSet,string config)
        {
            WriterLogTracking("start...");
            try
            {
                deleteDataOld(dicAppSet);
                // neu goi thu tuc login se tao cookie
                if (config != null && config.ToUpper().IndexOf("LOGIN")>=0)
                {
                   var  guid =  Guid.NewGuid().ToString() +"_" + DateTime.Now.ToString("ddMMyyyyHHmmss");
                    insertHeader(guid, dicAppSet);
                    return guid;
                }
               
                var strSelect = "select * from Cookie where cookie_value ='" + cookie.Value + "' ";
                var ds = ExcuteAccess(strSelect, dicAppSet["pathfileaccess"]);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    return "OK";
                }
                return "ERROR";
            }
            catch (Exception ex)
            {
                WriterLogTracking(ex.Message);
                return "";
            }
            finally
            {              
            }
        }
        
        public void insertHeader(string cookie, Dictionary<string, string> dicAppSet)
        {
            try
            {                
                 var str = @"insert into Cookie(cookie_value,timeinput) values('" + cookie+"',#" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "#)";
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
                var time = DateTime.Now.AddMinutes(-Convert.ToInt32(dicAppSet["cookietimeout"])).ToString("yyyy-MM-dd HH:mm:ss");
                var str = "delete from Cookie where timeinput <= #" + time+"#";
                ExcuteAccess(str, dicAppSet["pathfileaccess"]);
                WriterLogTracking("end");
            }
            catch(Exception ex)
            {
                WriterLogTracking(ex.Message);
            }
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