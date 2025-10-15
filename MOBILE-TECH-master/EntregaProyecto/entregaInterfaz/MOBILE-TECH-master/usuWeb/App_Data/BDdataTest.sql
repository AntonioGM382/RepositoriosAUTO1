/*#####################        ADD USUARIOS TEST        ######################*/

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test1@email.com', 'test123', 'Test', 'Test1', '123456A', '600000000', '1990-01-01', '01000', 'Vitoria', 'Álava', 'Calle test', '1', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test2@email.com', 'test234', 'Test', 'Test2', '123456B', '610000000', '1990-01-02', '02000', 'Albacete', 'Albacete', 'Calle test', '2', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test3@email.com', 'test345', 'Test', 'Test3', '123456C', '620000000', '1990-01-03', '03000', 'Alicante', 'Alicante', 'Calle test', '3', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test4@email.com', 'test456', 'Test', 'Test4', '123456D', '630000000', '1990-01-04', '04000', 'Almería', 'Almería', 'Calle test', '4', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test5@email.com', 'test567', 'Test', 'Test5', '123456E', '640000000', '1990-01-05', '05000', 'Ávila', 'Ávila', 'Calle test', '5', 0, 0)



/*#####################        ADD MARCAS TEST        ######################*/

INSERT INTO MARCA(marca, empresa, logo, enlace)
VALUES('iPhone', 'Apple', 'assets/iphoneLogo.png', 'http://www.apple.com/es/iphone/')

INSERT INTO MARCA(marca, empresa, logo, enlace)
VALUES('Galaxy', 'Samsung', 'assets/samsungLogo.png', 'https://www.samsung.com/es/smartphones/')



/*#####################        ADD ARTICULO TEST        ######################*/

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000001', 'iPhone 12', 979, 00.00, '256GB', 'assets/iphone12.png', 'iPhone')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000002', 'Galaxy S20', 489, 00.00, '128GB', 'assets/galaxy20.png', 'Galaxy')



/*#####################        INFO MOVIL TEST        ######################*/

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000001', 'A14 Bionic', '6GB', '256GB', '6.1', 'iOs 14')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000002', 'Qualcomm SDM8250', '12GB', '128GB', '6.2', 'Android Pie 10.0')



/*#####################        INFO STOCK TEST        ######################*/

INSERT INTO STOCK(articulo, disponible, entrega)
VALUES('0000001', 5, '24/48 horas')

INSERT INTO STOCK(articulo, disponible, entrega)
VALUES('0000002', 0, '1 semana')



/*#####################        CESTA        ######################*/

INSERT INTO CESTA(articulo, usuario, fecha)
VALUES('0000001', 'test1@email.com', '2021-04-15 15:15:15')

INSERT INTO CESTA(articulo, usuario, fecha)
VALUES('0000002', 'test1@email.com', '2021-04-15 15:15:25')

INSERT INTO CESTA(articulo, usuario, fecha)
VALUES('0000002', 'test2@email.com', '2021-04-16 14:00:00')



/*#####################      VALIDAR PRODUCTOS DE CESTA      ######################*/

INSERT INTO PEDIDO(numpedido, articulo, usuario, fecha, cantidad, importe)
VALUES(1, '0000001', 'test1@email.com', '2021-04-15 15:15:20', 2, 1958)

INSERT INTO PEDIDO(numpedido, articulo, usuario, fecha, cantidad, importe)
VALUES(2, '0000002', 'test1@email.com', '2021-04-15 15:15:25', 1, 489)

INSERT INTO PEDIDO(numpedido, articulo, usuario, fecha, cantidad, importe)
VALUES(3, '0000002', 'test2@email.com', '2021-04-16 14:00:00', 1, 489)



/*#####################    OBTENER IMPORTE TOTAL DE UN USUARIO    ######################*/

SELECT SUM(importe) importeTotal FROM PEDIDO
WHERE usuario = 'test1@email.com'



/*#####################   SI SE CONFIRMA COMPRA, BORRAR DATOS DE PEDIDO Y CEST   ######################*/

DELETE FROM PEDIDO
WHERE usuario = 'test1@email.com'

DELETE FROM CESTA
WHERE usuario = 'test1@email.com'



/*#####################      MANEJO CÓDIGO PROMOCIONAL     ######################*/

INSERT INTO PROMO(codProm, cantidad)
VALUES('prom30', 0.3)

SELECT cantidad FROM PROMO        /* float prom= 0.30 */
WHERE codProm = 'prom30'

SELECT SUM(importe) importeTotal2 FROM PEDIDO       /* float importe= 489.00 */
WHERE usuario = 'test2@email.com'

/* float importeTotal = importe * (1 - prom) */