using library;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace mobileWeb
{
    public partial class Admin : System.Web.UI.Page
    {
        StringBuilder userCheck = new StringBuilder();

        // Al cargar nos muestra todos los artículos del tipo que sea la página
        protected void Page_Load(object sender, EventArgs e)
        {
            userCheck.Clear();
            string user = "Iniciar sesión";
            string click = "";
            string ico = "fas fa-user";
            string link = "/Inicio.aspx";

            SqlConnection c1 = new SqlConnection(ConfigurationManager.ConnectionStrings["miconexion"].ToString());

            c1.Open();

            SqlCommand com1 = new SqlCommand("SELECT * FROM USUARIOS WHERE checkLogin='1'", c1);
            SqlDataReader dr1 = com1.ExecuteReader();

            while (dr1.Read())
            {
                if (dr1["checkLogin"].ToString() == "True")
                {
                    user = dr1["email"].ToString();
                    click = "cerrar()";
                    ico = "fas fa-sign-out-alt";
                    link = "/Salir.aspx";
                }
            }

            dr1.Close();
            c1.Close();

            userCheck.Append("<a href=\" " + link + "\" class=\"button1\"  onclick=\" " + click + "\"> " + user + " &nbsp; <i class=\"" + ico + "\"></i> </a>");
            botonInicio.InnerHtml = userCheck.ToString();
        }




        protected void goCesta(object sender, EventArgs e)
        {
            Response.Redirect("Cesta.aspx");
        }

        protected void goPhone(object sender, EventArgs e)
        {
            Response.Redirect("Default.aspx");
        }

        protected void goAur(object sender, EventArgs e)
        {
            Response.Redirect("Auricular.aspx");
        }

        protected void goCar(object sender, EventArgs e)
        {
            Response.Redirect("Cargador.aspx");
        }

        protected void goFun(object sender, EventArgs e)
        {
            Response.Redirect("Funda.aspx");
        }

        protected void goBat(object sender, EventArgs e)
        {
            Response.Redirect("Powerbank.aspx");
        }
    }
}