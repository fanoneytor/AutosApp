# AutosApp

Este proyecto consiste en una aplicación de backend construida con Spring Boot y una aplicación de frontend construida con React.

## Estructura del Proyecto

- `back-autos/`: Contiene la aplicación de backend de Spring Boot.
- `front-autos/`: Contiene la aplicación de frontend de React.

## Primeros Pasos

### Prerrequisitos

- Java 17 o superior
- Node.js (se recomienda la versión LTS)
- npm o yarn
- Maven

### Configuración del Backend (`back-autos`)

1.  Navega al directorio `back-autos`:
    ```bash
    cd back-autos
    ```
2.  Compila el proyecto usando Maven:
    ```bash
    ./mvnw clean install
    ```
3.  Ejecuta la aplicación:
    ```bash
    ./mvnw spring-boot:run
    ```
    El backend se iniciará en `http://localhost:8080`.

### Configuración del Frontend (`front-autos`)

1.  Navega al directorio `front-autos`:
    ```bash
    cd front-autos
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o yarn install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    # o yarn dev
    ```
    El frontend se iniciará en `http://localhost:5173` (o en otro puerto si el 5173 está en uso).

## Uso

### Autenticación

La aplicación utiliza JWT para la autenticación.

**Registrarse:**
- Navega a la página `/register` para crear un nuevo usuario.

**Iniciar Sesión:**
- Navega a la página `/login` para iniciar sesión con credenciales existentes.

### Gestión de Vehículos

Una vez iniciada la sesión, los usuarios pueden:
- Ver una lista de vehículos.
- Añadir nuevos vehículos.
- Editar los detalles de vehículos existentes.
- Eliminar vehículos.
- Filtrar vehículos por varios criterios.
- Subir URLs de imágenes para vehículos (o usar un marcador de posición predeterminado si no se proporciona ninguna).

### Funcionalidades de Administrador

Los usuarios con el rol `ADMIN` pueden:
- Gestionar otros usuarios (ver, editar, eliminar).

## Usuarios de Prueba

Puedes usar las siguientes credenciales para fines de prueba:

### Usuario Administrador

- **Nombre de usuario:** `admin`
- **Contraseña:** `adminpass`

### Usuario Regular

- **Nombre de usuario:** `user`
- **Contraseña:** `userpass`

**Nota:** Estas son credenciales de prueba predeterminadas y no deben usarse en un entorno de producción.
