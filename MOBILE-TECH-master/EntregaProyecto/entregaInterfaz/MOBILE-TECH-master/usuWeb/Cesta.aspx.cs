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
using System.Web.Services;

namespace mobileWeb
{
    public partial class Cesta : System.Web.UI.Page
    {
        StringBuilder tabla = new StringBuilder();
        StringBuilder userCheck = new StringBuilder();

        // Al cargar nos muestra todos los artículos del tipo que sea la página
        protected void Page_Load(object sender, EventArgs e)
        {
            tabla.Clear();
            float importeTotal = 0;
            userCheck.Clear();
            botonAdmin.Visible = false;
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
                if (dr1["checkAdmin"].ToString() == "True")
                {
                    botonAdmin.Visible = true;
                }
            }

            dr1.Close();
            c1.Close();

            userCheck.Append("<a href=\" " + link + "\" class=\"button1\"  onclick=\" " + click + "\"> " + user + " &nbsp; <i class=\"" + ico + "\"></i> </a>");
            botonInicio.InnerHtml = userCheck.ToString();

            //----------------------------------------------------------------------------------------------------------------------------------------------------

            tabla.Clear();
            SqlConnection c = new SqlConnection(ConfigurationManager.ConnectionStrings["miconexion"].ToString());

            c.Open();

            SqlCommand com = new SqlCommand("SELECT * FROM ARTICULO AS art RIGHT JOIN PEDIDO AS ped ON ped.articulo=art.codigo WHERE ped.usuario='"+ user+"'", c);
            SqlDataReader dr = com.ExecuteReader();

            while (dr.Read())
            {
                tabla.Append("<div class=\"cardN\"> ");
                tabla.Append("<div style=\"float: left; width: 35%\"><img src=\"" + dr["imagen"].ToString() + "\"@Data.imagen class=\"cardNImg\" ID=\"articulo\" runat=\"server\" /></div>");
                tabla.Append("<div style=\"float: right;\" class=\"nombre\">" + dr["nombre"].ToString() + "</div></br></br>");
                tabla.Append("<div style=\"float: right;\" class=\"nombre\">" + dr["importe"].ToString() + "€</div> </br></br>");

                //Boton borrar
                tabla.Append("<a id=\"MainContent_borrar\" class=\"button3\" runat=\"server\" value=\"" + dr["codigo"].ToString() + "\" onclick=\"borrar(" + int.Parse(dr["articulo"].ToString()) + " )\"> X </a>");

                tabla.Append("</div></br></br></br>");
                importeTotal += float.Parse(dr["importe"].ToString());
            }

            dr.Close();
            c.Close();

            tabla.Append("<div class=\"menu\" style=\"text-align:center\"> Importe total: " + importeTotal + "€</div>");

            PlaceHolder1.InnerHtml = tabla.ToString();

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


        //Borrar articulo de cesta
        [System.Web.Services.WebMethod]
        public static void borrar(string cod)
        {
            SqlConnection c = new SqlConnection(ConfigurationManager.ConnectionStrings["miconexion"].ToString());

            c.Open();

            SqlCommand com = new SqlCommand("DELETE TOP (1) FROM PEDIDO WHERE articulo='000000" + cod + "'", c);
            SqlDataReader dr = com.ExecuteReader();
            c.Close();
        }

    }
}