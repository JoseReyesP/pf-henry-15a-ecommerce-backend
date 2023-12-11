ENDPOINTS 
 *********************  ACLARACIÓN 1: ENTIENDASE POR "PARAMETRO" LO QUE SE ESPERA QUE LLEGUE AL ENDPOINT *******************
 *********************  ACLARACIÓN 2: SE DEBE ESTAR LOGUEADO PARA HACER LA MAYORIA DE LAS SOLICITUDES *******************
  
LOGIN
RUTA: http://localhost:3001/auth/signin
--> metodo POST 
--> parametro :
              {
	              "email": "ejemplo@gmail.com",
	              "password":"contraseña123"
              } 

LOGOUT
RUTA: http://localhost:3001/auth/signout
--> metodo GET


USUARIOS
RUTA: http://localhost:3001/api/users

Crear usuario: 
--> metodo POST
--> parametro : 
               {
               "name": "Ejemplo",
	             "lastname": "Ejemplo2",
	             "email": "ejemplo@gmail.com",
               "password":"contraseñasegura2023"
               }
--> Autorización: false 

Lista de Usuarios:
--> metodo GET
--> parametro: http://localhost:3001/api/users    **EJEMPLO DE SOLICITUD**
--> Autorización: false

Buscar usuario por ID:
RUTA: http://localhost:3001/api/users/:ID
--> metodo GET
--> parametro: http://localhost:3001/api/users/65714c655e14b31484a1ca8e       **EJEMPLO DE SOLICITUD**
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

Borrar Usuario:
--> metodo DELETE
--> parametro: http://localhost:3001/api/users/65714c655e14b31484a1ca8e     **EJEMPLO DE SOLICITUD**
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token
    
Actualización de Usuarios:
RUTA: http://localhost:3001/api/users/:ID
--> metodo PUT
--> parametro: 
              {
                "name": "Luis ACTUALIZADO"  ==> **COLOCAR SOLO LOS PARAMETROS A ACTUALIZAR**
              }
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

PRODUCTOS
RUTA: http://localhost:3001/api/product

Crear Producto: 
--> metodo POST
--> parametro : 
               {
                 "title": "camisa",
		             "price": 29.99,
		             "description": "camisa blanca para toda ocasion",
                 "image": URL,
		             "category":  "657122b7fe7c6097f5167de9" ==> SE COLOCA EL ID DE LA CATEGORIA
		           }
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

Lista de Productos:
--> metodo GET
--> parametro: http://localhost:3001/api/product    **EJEMPLO DE SOLICITUD**
--> Autorización: false


Buscar producto por ID:
RUTA: http://localhost:3001/api/product/:ID
--> metodo GET
--> parametro: http://localhost:3001/api/product/65715211611f91f64a1ccab7       **EJEMPLO DE SOLICITUD**
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

Borrar Producto:
--> metodo DELETE
--> parametro: http://localhost:3001/api/product/65715211611f91f64a1ccab7     **EJEMPLO DE SOLICITUD**
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

Actualización de Producto:
RUTA: http://localhost:3001/api/users/:ID
--> metodo PUT
--> parametro: 
               {
                     "price": 1000     ==> **COLOCAR SOLO LOS PARAMETROS A ACTUALIZAR**
		           }
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

CATEGORIAS
RUTA: http://localhost:3001/api/category

Crear Categoria: 
--> metodo POST
--> parametro : 
               {
                "name": "Pantalones",
               }		           
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

Lista de Categorias:
--> metodo GET
--> parametro:  http://localhost:3001/api/category    **EJEMPLO DE SOLICITUD**
--> Autorización: false

Buscar categoria por ID:
RUTA: http://localhost:3001/api/category/:ID
--> metodo GET
--> parametro: http://localhost:3001/api/category/657122b7fe7c6097f5167de9       **EJEMPLO DE SOLICITUD**
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

Actualización de Categoria:
RUTA: http://localhost:3001/api/category/:ID
--> metodo PUT
--> parametro: 
               {
                     "name": "Nombre Actualiado"     ==> **COLOCAR SOLO LOS PARAMETROS A ACTUALIZAR**
		           }
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

Borrar Categoria:
--> metodo DELETE
--> parametro: http://localhost:3001/api/category/657122b7fe7c6097f5167de9     **EJEMPLO DE SOLICITUD**
--> Autorización: true
    1- En la solapa "auth" al lado de "body" cambiar el Auth Type a Barer Token
    2- Pegar el token

