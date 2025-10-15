<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="mobileWeb.Admin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <!-- Hoja estilos -->
<link href="StyleSheet.css" rel="stylesheet" type="text/css" />

    <!-- Favicon -->
<link rel="icon" type="image/png" href="assets/favicon.png">
    
    <!-- Iconos-->
<script src="https://kit.fontawesome.com/a076d05399.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Administración</title>
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

                <div  id="botonInicio" runat="server" style="float: right;">
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
                          
                          </div>
            </div> 
           
            <!-- "Acordeón" para añadir smartphone, aurícular, cargador... Añadir o actualizar -->
            <div class="wrapper" id="contenedor" >

                <br />
                <br />
                            <div class="search2" >
                                  <!-- Enlaces del menu al resto de artículos -->
                                  <asp:LinkButton class="button2" id="showPhone" runat="server" OnClientClick="return false;"> <i class="fas fa-plus-square"></i> &nbsp; Smartphones &nbsp; <i class="fas fa-mobile-alt"></i></asp:LinkButton>
                                  <asp:LinkButton class="button2" id="showAur" runat="server" OnClientClick="return false;"><i class="fas fa-plus-square"></i> &nbsp; Aurículares &nbsp; <i class="fas fa-headphones"></i></asp:LinkButton>
                                  <asp:LinkButton class="button2" id="showCar" runat="server" OnClientClick="return false;"><i class="fas fa-plus-square"></i> &nbsp; Cargadores &nbsp; <i class="fas fa-charging-station"></i></asp:LinkButton>
                                  <asp:LinkButton class="button2" id="showFun" runat="server" OnClientClick="return false;"><i class="fas fa-plus-square"></i> &nbsp; Fundas y carcasas &nbsp; <i class="fas fa-shield-alt"></i></asp:LinkButton>
                                  <asp:LinkButton class="button2" id="showBat" runat="server" OnClientClick="return false;"><i class="fas fa-plus-square"></i> &nbsp; Batería externa &nbsp; <i class="fas fa-battery-half"></i></asp:LinkButton>
                            </div>
                

                        <div id="smartphone" dir="auto" class="menu" style="display:none;">
                                
                                <h2>Añadir smartphone</h2>

                               <asp:TextBox class="input" id="codigo" placeholder="Código" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="nombre" placeholder="Nombre" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="precio" placeholder="Precio" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="descnt" placeholder="Descuento" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="spec" placeholder="Especificaciones" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="img" placeholder="Imagen" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="cpu" placeholder="CPU" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="ram" placeholder="RAM" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="mem" placeholder="Memoria" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="pantalla" placeholder="Pantalla" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="so" placeholder="Sistema operativo" runat="server">
                               </asp:TextBox>

                                <br />

                                <asp:Button class="boton" ID="button" Text="Añadir producto" runat="server">
                                </asp:Button>   
                        </div> 


                        <div id="auriculares" dir="auto" class="menu" style="display:none;">

                                <h2>Añadir aurícular</h2>

                               <asp:TextBox class="input" id="codAur" placeholder="Código" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="nomAur" placeholder="Nombre" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="precAur" placeholder="Precio" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="descAur" placeholder="Descuento" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="specAur" placeholder="Especificaciones" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="imgAur" placeholder="Imagen" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="tipo" placeholder="Tipo" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="conex" placeholder="Conexión" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="peso" placeholder="Peso" runat="server">
                               </asp:TextBox>



                                <br />

                                <asp:Button class="boton" ID="botonAur" Text="Añadir producto" runat="server">
                                </asp:Button>   
                        </div> 


                        <div id="cargadores" dir="auto" class="menu" style="display:none;">

                                <h2>Añadir cargador</h2>

                               <asp:TextBox class="input" id="codCar" placeholder="Código" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="nomCar" placeholder="Nombre" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="precCar" placeholder="Precio" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="descCar" placeholder="Descuento" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="specCar" placeholder="Especificaciones" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="imgCar" placeholder="Imagen" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="tipoCar" placeholder="Tipo" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="long" placeholder="Longitud" runat="server">
                               </asp:TextBox>


                                <br />

                                <asp:Button class="boton" ID="botonCar" Text="Añadir producto" runat="server">
                                </asp:Button>   
                        </div> 


                        <div id="fundas" dir="auto" class="menu" style="display:none;">

                                <h2>Añadir funda o carcasa</h2>
                                
                               <asp:TextBox class="input" id="codFun" placeholder="Código" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="nomFun" placeholder="Nombre" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="precFun" placeholder="Precio" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="descFun" placeholder="Descuento" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="specFun" placeholder="Especificaciones" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="imgFun" placeholder="Imagen" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="disen" placeholder="Diseño" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="modelo" placeholder="Modelo" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="mat" placeholder="Material" runat="server">
                               </asp:TextBox>


                                <br />

                                <asp:Button class="boton" ID="botonFun" Text="Añadir producto" runat="server">
                                </asp:Button>   
                        </div> 

          
                        <div id="bateria" dir="auto" class="menu" style="display:none;">

                                <h2>Añadir batería externa</h2>

                               <asp:TextBox class="input" id="codBat" placeholder="Código" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="nomBat" placeholder="Nombre" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="precBat" placeholder="Precio" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="descBat" placeholder="Descuento" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="specBat" placeholder="Especificaciones" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="imgBat" placeholder="Imagen" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="amp" placeholder="Amperaje" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="pesPow" placeholder="Peso" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="puertos" placeholder="Puertos" runat="server">
                               </asp:TextBox>

                               <asp:TextBox class="input" id="tempCarga" placeholder="Tiempo de carga" runat="server">
                               </asp:TextBox>


                                <br />

                                <asp:Button class="boton" ID="botonBat" Text="Añadir producto" runat="server">
                                </asp:Button>   
                        </div> 

                <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
                <script type="text/javascript">
                    $("#showPhone").click(function () {
                        $("#smartphone").show();
                        $("#auriculares").hide();
                        $("#cargadores").hide();
                        $("#fundas").hide();
                        $("#bateria").hide();
                    });

                    $("#showAur").click(function () {
                        $("#smartphone").hide();
                        $("#auriculares").show();
                        $("#cargadores").hide();
                        $("#fundas").hide();
                        $("#bateria").hide();
                    });

                    $("#showCar").click(function () {
                        $("#smartphone").hide();
                        $("#auriculares").hide();
                        $("#cargadores").show();
                        $("#fundas").hide();
                        $("#bateria").hide();
                    });

                    $("#showFun").click(function () {
                        $("#smartphone").hide();
                        $("#auriculares").hide();
                        $("#cargadores").hide();
                        $("#fundas").show();
                        $("#bateria").hide();
                    });

                    $("#showBat").click(function () {
                        $("#smartphone").hide();
                        $("#auriculares").hide();
                        $("#cargadores").hide();
                        $("#fundas").hide();
                        $("#bateria").show();
                    });
                </script>
           </div>
       </div>
    </form>
</body>
</html>
