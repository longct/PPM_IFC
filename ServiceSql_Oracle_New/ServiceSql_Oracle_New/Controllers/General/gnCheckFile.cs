using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Data;
using Newtonsoft.Json;
using System.Globalization;

namespace ServiceSql_Oracle_New.Controllers
{
    public class gnCheckFile
    {
        public string SeartchAllFileHaveWord(string pathFolder, string content,string tungay, string tongay)
        {
            try
            {
                var dt = new DataTable("dt");
                dt.Columns.Add("pathfile");
                dt.Columns.Add("contentfile");
                dt.Columns.Add("time");
                dt.Columns.Add("namefile");
                var lstFile = Directory.GetFiles(pathFolder, "*.txt");
                var from = DateTime.ParseExact(tungay, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
                var to = DateTime.ParseExact(tongay, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
                foreach (var file in lstFile)
                {
                    var timeFile = File.GetCreationTime(file);
                    var compareTime = DateTime.Compare(timeFile, from);
                    if (DateTime.Compare(timeFile, from) > 0 && DateTime.Compare(timeFile, to) < 0)
                    {
                        var strfileInfo = File.ReadAllText(file);
                        if (strfileInfo.IndexOf(content) >= 0)
                        {
                            var start = strfileInfo.IndexOf(content);
                            var end = strfileInfo.Length - start;
                            if (end > 50)
                                end = 50;
                            var val = strfileInfo.Substring(start, end);
                            var modification = File.GetLastWriteTime(file).ToString("dd/MM/yyyy HH:mm");
                            var sp = file.Split('\\');
                            var namefile = sp[sp.Length - 1];

                            var formartContent = val.Replace(content, "<b>" + content + "</b>");
                            dt.Rows.Add(file, formartContent, modification,namefile);
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);

            }catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string ViewInFile(string pathFile,string keyword)
        {
            try
            {
                var dt = new DataTable("dt");
                dt.Columns.Add("pathfile");
                dt.Columns.Add("content");
                var lines = File.ReadAllLines(pathFile);

                var content = "";
                foreach(var line in lines)
                {
                    content += line + "<br/>";
                }
                var formartContent = content.Replace(keyword, "<b>" + keyword + "</b>");
                dt.Rows.Add(pathFile, formartContent);                       
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string GetDriverDefault()
        {
            try
            {
                DriveInfo[] drives = DriveInfo.GetDrives();
                var dt = new DataTable("dt");
                dt.Columns.Add("text");
                dt.Columns.Add("id");

                foreach (DriveInfo drive in drives)
                {
                    dt.Rows.Add(drive.Name, drive.Name );
                }
                return JsonConvert.SerializeObject(dt);
            }catch(Exception ex) { return ex.Message; }  
        }

        public string GetSubFolder(string pathFolder)
        {
            try
            {                
                var dt = new DataTable("dt");
                dt.Columns.Add("text");
                dt.Columns.Add("id");

                DirectoryInfo dInfo = new DirectoryInfo(pathFolder);
                DirectoryInfo[] subdirs = dInfo.GetDirectories();
                foreach(var sub in subdirs)
                {
                    dt.Rows.Add(sub,pathFolder +sub+"\\");
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex) { return ex.Message; }
        }

    }
}
