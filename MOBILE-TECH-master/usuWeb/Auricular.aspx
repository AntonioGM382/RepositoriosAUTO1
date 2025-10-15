<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Auricular.aspx.cs" Inherits="mobileWeb.Auricular" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

       <!-- Hoja estilos -->
<link href="StyleSheet.css" rel="stylesheet" type="text/css" />
    
    <!-- Iconos-->
<script src="https://kit.fontawesome.com/a076d05399.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

    <!-- Favicon-->
    <link rel="icon" type="image/png" href="assets/favicon.png">


<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
                    <div class="content">

                        <!-- Logo -->
                        <div class="header" style="text-align: left">

                            <!-- Botón para subir -->
                            <a id="buttonPrincipio"></a>
                            <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
                            <script type="text/javascript">
                                var btn = $('#buttonPrincipio');

                                $(window).scroll(function () {
                                    if ($(window).scrollTop() > 250) {
                                        btn.addClass('show');
                                    } else {
                                        btn.removeClass('show');
                                    }
                                });

                                btn.on('click', function (e) {
                                    e.preventDefault();
                                    $('html, body').animate({ scrollTop: 0 }, '300');
                                });
                            </script>

                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                <img src="/assets/logo.png" class="logo2" /> 
                            </a>

                            <!-- Enlaces a inicio de sesión y cesta -->
                            <asp:LinkButton  class="button1" runat="server" OnClick="goCesta" style="float: right;"> Cesta &nbsp; <i class="fas fa-shopping-cart"></i></asp:LinkButton>

                            <div  ID="botonInicio" runat="server" style="float: right;">
                            </div>

                            <!-- Enlace a administración -->
                            <div ID="botonAdmin" runat="server" Visible="false" style="float: right;">
                                <a href="/Admin.aspx" class="button1" Visible="false" > Admin &nbsp; <i class="fas fa-unlock-alt"></i></a>
                            </div>
                
                
                            <!-- Si usuario esta conectado(datos en EnUsuario), 
                                inicio sesion -> cerrar sesion
                                al pulsar botonInicio cierra sesión -->
                            <script>
                                function cerrar() {
                                    alert("Cerrando sesión...");
                                }
                            </script>

                            <br />
                                      <div class="search2" style="text-align: left">

                                          <!-- Enlaces del menu al resto de artículos -->
                                          <asp:LinkButton  class="button1" runat="server" OnClick="goBat" style="float: right;"> Batería externa &nbsp; <i class="fas fa-battery-half"></i></asp:LinkButton>
                                          <asp:LinkButton  class="button1" runat="server" OnClick="goFun" style="float: right;"> Fundas y carcasas &nbsp; <i class="fas fa-shield-alt"></i></asp:LinkButton>
                                          <asp:LinkButton  class="button1" runat="server" OnClick="goCar" style="float: right;"> Cargadores &nbsp; <i class="fas fa-charging-station"></i></asp:LinkButton>
                                          <asp:LinkButton  class="button1" runat="server" OnClick="goAur" style="float: right;"> Aurículares &nbsp; <i class="fas fa-headphones"></i></asp:LinkButton>
                                          <asp:LinkButton  class="button1" runat="server" OnClick="goPhone" style="float: right;"> Smartphones &nbsp; <i class="fas fa-mobile-alt"></i></asp:LinkButton>
                          
                                              <!-- Barra y botón de busqueda -->
                                              <asp:TextBox ID="searchBar" class="searchTerm" placeholder="Buscar en la tienda..." runat="server">
                                              </asp:TextBox>

                                              <asp:linkButton class="searchButton" ID="search" runat="server" OnClick="searchEnter">
                                                   <i class="fa fa-search"></i>
                                              </asp:linkButton>
                                      </div>
                        </div> 
                        <br />
           
                        <div class="wrapper" id="contenedor" >
                            <div class="subbody" style="text-align:center">

                                <!-- Muestra todos los artículos de la clase que sea la página -->
                                <div ID="PlaceHolder1" runat="server"></div>

                                <!-- Cuando se hace busqueda, PlaceHolder1 desaparece y aparece PlaceHolder2 con los resultados -->
                                <div ID="PlaceHolder2" runat="server" Visible="false"></div>


                                <!-- Añadir productos cesta -->
                                <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
                                </asp:ScriptManager>

                                <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
                                <script type="text/javascript">
                                    function comprarClick(cod, user, prec) {
                                        alert("Añadiendo a cesta: producto.cod(" + cod + ")");
                                        PageMethods.addCod(cod, user, prec);
                                    }
                                </script>

                           </div>
                       </div>
                   </div>
    </form>
</body>
</html>
