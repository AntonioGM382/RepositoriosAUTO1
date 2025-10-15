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
    public partial class Auricular : System.Web.UI.Page
    {
        StringBuilder tabla = new StringBuilder();
        StringBuilder userCheck = new StringBuilder();
        string usuarioConectado;

        // Al cargar nos muestra todos los artículos del tipo que sea la página
        protected void Page_Load(object sender, EventArgs e)
        {
            userCheck.Clear();
            botonAdmin.Visible = false;
            usuarioConectado = "";
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
            usuarioConectado = user;
            botonInicio.InnerHtml = userCheck.ToString();

            //--------------------------------------------------------------------------------------------------------------------------------------------------

            tabla.Clear();
            SqlConnection c = new SqlConnection(ConfigurationManager.ConnectionStrings["miconexion"].ToString());

            c.Open();

            SqlCommand com = new SqlCommand("SELECT * FROM ARTICULO AS art RIGHT JOIN AURICULAR AS aur ON art.codigo = aur.codigo", c);
            SqlDataReader dr = com.ExecuteReader();

            while (dr.Read())
            {
                tabla.Append("<div class=\"card\"> <div><img style=\"width: 50%\" src=\"" + dr["imagen"].ToString() + "\"@Data.imagen class=\"cardImg\" ID=\"articulo\" runat=\"server\" /> <div class=\"middle\"> Tipo: " + dr["tipo"].ToString() + " </br> Conexión: " + dr["conexion"].ToString() + " </br> Peso: " + dr["peso"].ToString() + "</div> </div> </br> ");

                tabla.Append("<div class=\"nombre\">" + dr["nombre"].ToString() + "</div>");
                tabla.Append("<div class=\"nombre\">" + dr["precio"].ToString() + "€</div> </br></br>");

                //Boton compra
                tabla.Append("<a id=\"MainContent_comprar\" class=\"comprar\" runat=\"server\" value=\"" + dr["codigo"].ToString() + "\" onclick=\"comprarClick(" + int.Parse(dr["codigo"].ToString()) + ", " + usuarioConectado + ", " + dr["precio"].ToString() + " )\"> Comprar </a></div>");
            }

            dr.Close();
            c.Close();

            PlaceHolder1.InnerHtml = tabla.ToString();
        }




        // Al buscar oculta PlaceHolder1 y PlaceHolder2 muestra resultados busqueda relacionado con la clase de la página
        protected void searchEnter(object sender, EventArgs e)
        {
            tabla.Clear();
            PlaceHolder1.Visible = false;
            PlaceHolder2.Visible = true;
            SqlConnection c = new SqlConnection(ConfigurationManager.ConnectionStrings["miconexion"].ToString());

            c.Open();

            SqlCommand com = new SqlCommand("SELECT * FROM ARTICULO AS art RIGHT JOIN AURICULAR AS aur ON art.codigo = aur.codigo WHERE UPPER(nombre) LIKE UPPER('%" + searchBar.Text + "%') OR UPPER(marca) LIKE UPPER('%" + searchBar.Text + "%')", c);
            SqlDataReader dr = com.ExecuteReader();

            while (dr.Read())
            {
                tabla.Append("<div class=\"card\"> <div ><img style=\"width: 50%\" src=\"" + dr["imagen"].ToString() + "\"@Data.imagen class=\"cardImg\" ID=\"articulo\" runat=\"server\" /> <div class=\"middle\"> Tipo: " + dr["tipo"].ToString() + " </br> Conexión: " + dr["conexion"].ToString() + " </br> Peso: " + dr["peso"].ToString() + "</div> </div> </br>");

                tabla.Append("<div class=\"nombre\">" + dr["nombre"].ToString() + "</div>");
                tabla.Append("<div class=\"nombre\">" + dr["precio"].ToString() + "€</div> </br></br>");

                //Boton compra
                tabla.Append("<a id=\"MainContent_comprar\" class=\"comprar\" runat=\"server\" value=\"" + dr["codigo"].ToString() + "\" onclick=\"comprarClick(" + int.Parse(dr["codigo"].ToString()) + ", " + usuarioConectado + ", " + dr["precio"].ToString() + " )\"> Comprar </a></div>");
            }

            dr.Close();
            c.Close();

            PlaceHolder2.InnerHtml = tabla.ToString();

            searchBar.Text = "";
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

        //Añadir articulo a cesta
        [System.Web.Services.WebMethod]
        public static void addCod(string cod, string user, string prec)
        {
            float precio = float.Parse(prec);

            SqlConnection c = new SqlConnection(ConfigurationManager.ConnectionStrings["miconexion"].ToString());

            c.Open();

            SqlCommand com = new SqlCommand("INSERT INTO PEDIDO(articulo, usuario, cantidad, importe) VALUES ('" + "000000" + cod + "', '" + user + "', 1, " + precio + ")", c);
            SqlDataReader dr = com.ExecuteReader();
            c.Close();
        }

    }
}