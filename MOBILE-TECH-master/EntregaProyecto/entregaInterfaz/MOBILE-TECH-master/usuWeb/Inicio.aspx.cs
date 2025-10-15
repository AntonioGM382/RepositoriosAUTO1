using library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace mobileWeb
{
    public partial class Inicio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void LoginClick(object sender, EventArgs e)
        {
            if (email.Text == string.Empty || contra.Text == string.Empty)
            {
                Server.Transfer("LoginError.aspx");
            }
            else
            {
                ENUsuario en = new ENUsuario(email.Text, contra.Text, "", "", "", 0, 0);

                if (en.loginUsuario())
                {
                    en.inicioSesion();
                    Server.Transfer("OkLogin.aspx");
                }
                else
                {
                    Server.Transfer("LoginError.aspx");
                }
            }

        }


        protected void RegistrarClick(object sender, EventArgs e)
        {

            if (emailReg.Text == string.Empty || contraReg.Text == string.Empty || nombre.Text == string.Empty || apellidos.Text == string.Empty
                 || dni.Text == string.Empty || telef.Text == string.Empty || codPos.Text == string.Empty)
            {
                Server.Transfer("Error.aspx");
            }

            else
            {
                ENUsuario en = new ENUsuario(emailReg.Text, contraReg.Text, nombre.Text, apellidos.Text,
                    dni.Text, int.Parse(telef.Text), int.Parse(codPos.Text));

                if (en.createUsuario())
                {
                    Server.Transfer("OkRegister.aspx");
                }
                else
                {
                    Server.Transfer("Error.aspx");
                }
            }
        }
    }
}