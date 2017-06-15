//using SignLib.Certificates;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ServiceSql_Oracle_New.Controllers
{
    public class DigitallySign
    {
        public string GeneratePFX()
        {
            try
            {
                //string tempFolder = "H:\\chuky" + "\\cuongdq@infras.com.vn";


                //if (Directory.Exists(tempFolder) == false)
                //    Directory.CreateDirectory(tempFolder);

                ////create the client certificate
                ////in order to apply a timestamp to a PDF file, it must be digitally signed
                //X509CertificateGenerator certificate = new X509CertificateGenerator("YourSerialNumber");

                //certificate.AddToSubject(SubjectType.CN, "cuong");
                //certificate.AddToSubject(SubjectType.E, "cuongdq@infras.com.vn");
                //certificate.AddToSubject(SubjectType.O, "ifc");

                ////certificate Key Usage
                //certificate.Extensions.AddKeyUsage(CertificateKeyUsage.DigitalSignature);
                //certificate.Extensions.AddKeyUsage(CertificateKeyUsage.NonRepudiation);

                ////certificate Enhanced Key Usage - marked as critical extension
                //certificate.Extensions.AddEnhancedKeyUsage(CertificateEnhancedKeyUsage.DocumentSigning);
                //certificate.Extensions.EnhancedKeyUsageIsCritical = true;

                ////The certificate will be valid only 30 days on the demo version of the library
                //certificate.ValidTo = DateTime.Now.AddYears(5); //the certificate is valid 5 years

                ////write the certificate on the PFX file. The certificate is returned as byte[]
                //File.WriteAllBytes(tempFolder + "\\cuongdq@infras.com.vn.pfx", certificate.GenerateCertificate("PfX_P@ssw0rd"));

              
                return "H:\\chuky\\cuongdq@infras.com.vn\\cuongdq@infras.com.vn.pfx";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}