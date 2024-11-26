# Desarrollo-Web

## Instrucciones para ejecutar el contenedor

### Prerrequisitos

Tener Docker instalado o descargarlo e instalarlo desde [Docker](https://www.docker.com/get-started).

### Pasos para ejecutar el contenedor

1. **Construir la imagen de Docker**:

   Navegar al directorio `URDeporteCultura` y ejecutar los siguientes comandos:

   ```bash
   docker-compose build
   docker-compose up
   ```

2. **Acceder a la app**:
    Desde el navegador ir a `http://localhost:3000/`

### 

**Para correr sin `Docker`**

- Navegar al directorio `URDeporteCultura` 
- Instalar dependencias `npm install`
- Ejecutar la app `npm start`
- Acceder `http://localhost:3000/`