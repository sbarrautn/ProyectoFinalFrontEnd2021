# DOCKER FOR PROYECTO APP - FRONTEND #

## Instrucciones para levantar el frontend ##

**IMPORTANTE**

Verificar las variables globables .env en el repositorio principal de docker.


## Si es la primera vez que se van a levantar los contenedores, se deben seguir los siguientes pasos: ##

1.- Clonar este repositorio en la carpeta correspondiente al contenedor WEB.

2.- Levantar los contenedores con *docker-compose up -d*


## Si se quiere realizar un cambio en el código y se necesita volver a compilar el frontend en un ambiente con contenedores activos, se deben seguir los siguentes pasos: ##

1.- Clonar la última versión de este repositorio en la carpeta correspondiente al contenedor WEB.

2.- Reconstruir el contenedor WEB con el siguiente comando *docker-compose build web*

3.- Actualizar contenedor web con *docker-compose up -d*