DROP TABLE IF EXISTS [dbo].[PROMO]
DROP TABLE IF EXISTS [dbo].[CESTA]
DROP TABLE IF EXISTS [dbo].[PEDIDO]
DROP TABLE IF EXISTS [dbo].[USUARIOS]
DROP TABLE IF EXISTS [dbo].[STOCK]
DROP TABLE IF EXISTS [dbo].[PACK_CONTIENE]
DROP TABLE IF EXISTS [dbo].[MOVIL]
DROP TABLE IF EXISTS [dbo].[PACK]
DROP TABLE IF EXISTS [dbo].[ARTICULO]
DROP TABLE IF EXISTS [dbo].[MARCA]

CREATE TABLE [dbo].[PROMO]
(
    [codProm] NVARCHAR(10) NOT NULL,
    [cantidad] DECIMAL (2,2) NOT NULL,

 	PRIMARY KEY CLUSTERED  ([codProm] ASC)
) 



CREATE TABLE [dbo].[USUARIOS]
(
    [email] NVARCHAR (50) NOT NULL,
    [contraseña] NVARCHAR (100) NOT NULL,
    [nombre] NVARCHAR (50) NOT NULL,
    [apellidos] NVARCHAR (50) NOT NULL,
    [dni] NVARCHAR (12) NOT NULL,
    [telefono] NVARCHAR (12),
    [fechaNac] DATE  NOT NULL,
    [codPostal] NVARCHAR(5) NOT NULL,
    [ciudad] NVARCHAR (50) NOT NULL,
    [provincia] NVARCHAR (50) NOT NULL,
    [calle] NVARCHAR (50),
    [edificio] NVARCHAR (50),
    [checkAdmin] BIT NOT NULL,
    [checkPremium] BIT NOT NULL,

    PRIMARY KEY CLUSTERED  ([email] ASC),
    UNIQUE NONCLUSTERED ([dni] ASC)
) 



CREATE TABLE [dbo].[MARCA]
(
    [marca] NVARCHAR(32),
    [empresa] NVARCHAR (32),
    [logo] NVARCHAR (100),
    [enlace] NVARCHAR (100),

 	PRIMARY KEY CLUSTERED  ([marca] ASC)
) 



CREATE TABLE [dbo].[ARTICULO]
(
    [codigo] NVARCHAR(8),
    [nombre] NVARCHAR (32),
    [precio] DECIMAL (5, 2),
    [descuento] DECIMAL (2, 2),
    [especificaciones] TEXT,
    [imagen] NVARCHAR (50),
    [marca] NVARCHAR (32) NOT NULL,

 	PRIMARY KEY CLUSTERED  ([codigo] ASC),
    CONSTRAINT FK_ARTICULO_marca FOREIGN KEY ([marca]) 
        REFERENCES [dbo].[MARCA]  ([marca])
) 



CREATE TABLE [dbo].[PACK]
(
    [codigo] NVARCHAR(8) NOT NULL,

	PRIMARY KEY CLUSTERED  ([codigo] ASC),
    CONSTRAINT FK_PACK_codigo FOREIGN KEY ([codigo]) 
        REFERENCES [dbo].[ARTICULO]  ([codigo])
) 



CREATE TABLE [dbo].[MOVIL]
(
    [codigo] NVARCHAR(8) NOT NULL,
    [cpu] NVARCHAR (32),
    [ram] NVARCHAR (32),
    [memoria] NVARCHAR (32),
    [pantalla] NVARCHAR (32),
    [so] NVARCHAR (32),

 	PRIMARY KEY CLUSTERED  ([codigo] ASC),
    CONSTRAINT FK_MOVIL_codigo FOREIGN KEY ([codigo]) 
        REFERENCES [dbo].[ARTICULO]  ([codigo])
) 



CREATE TABLE [dbo].[PACK_CONTIENE]
(
    [articulo] NVARCHAR(8) NOT NULL,
    [pack] NVARCHAR(8) NOT NULL,

	PRIMARY KEY CLUSTERED  ([articulo], [pack] ASC),
    CONSTRAINT FK_PACKCONTIENE_articulo  FOREIGN KEY ([articulo]) 
        REFERENCES [dbo].[ARTICULO]  ([codigo]),
    CONSTRAINT FK_PACKCONTIENE_pack FOREIGN KEY ([pack]) 
        REFERENCES [dbo].[PACK]  ([codigo])
) 



CREATE TABLE [dbo].[STOCK]
(
    [articulo] NVARCHAR(8) NOT NULL,
    [disponible] INT NOT NULL,
    [entrega] NVARCHAR(15) NOT NULL,

	PRIMARY KEY CLUSTERED  ([articulo] ASC),
    CONSTRAINT FK_STOCK_articulo FOREIGN KEY ([articulo]) 
        REFERENCES [dbo].[ARTICULO]  ([codigo])
) 



CREATE TABLE [dbo].[PEDIDO]
(
    [numpedido] INT NOT NULL,
    [articulo] NVARCHAR(8) NOT NULL,
    [usuario] NVARCHAR(50) NOT NULL,
    [fecha] DATETIME NOT NULL,
    [cantidad] INT NOT NULL,
    [importe] DECIMAL(7, 2) NOT NULL,

    PRIMARY KEY CLUSTERED  ([numpedido] ASC),
    CONSTRAINT FK_PEDIDO_articulo FOREIGN KEY ([articulo]) 
        REFERENCES [dbo].[ARTICULO]  ([codigo]),
    CONSTRAINT FK_PEDIDO_usuario FOREIGN KEY ([usuario]) 
        REFERENCES [dbo].[USUARIOS]  ([email])
) 



CREATE TABLE [dbo].[CESTA]
(
    [articulo] NVARCHAR(8) NOT NULL,
    [usuario] NVARCHAR(50) NOT NULL,
    [fecha] DATETIME,

    PRIMARY KEY CLUSTERED  ([articulo], [usuario] ASC),
    CONSTRAINT FK_CESTA_articulo FOREIGN KEY ([articulo]) 
        REFERENCES [dbo].[ARTICULO]  ([codigo]),
    CONSTRAINT FK_CESTA_usuario FOREIGN KEY ([usuario]) 
        REFERENCES [dbo].[USUARIOS]  ([email])
)