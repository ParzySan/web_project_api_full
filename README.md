# web_project_api_full


# https://aplicacionwebparzy.mooo.com/

📌 Descripción de la aplicación
La aplicación API Full es un proyecto de desarrollo web que implementa una arquitectura completa de servidor y cliente, conectando una API RESTful con un frontend dinámico. Su propósito es demostrar la integración de tecnologías modernas para la gestión de usuarios y tarjetas (posts), aplicando estándares de seguridad, manejo de errores y persistencia de datos.

El sistema permite:
Registro e inicio de sesión de usuarios con autenticación segura mediante JWT (JSON Web Token).
Gestión de usuarios: actualización de perfil, avatar y datos personales.
Gestión de tarjetas (cards): creación, visualización, eliminación y sistema de likes.
Manejo de permisos y validación: solo el creador de una tarjeta puede eliminarla, y las rutas están protegidas para usuarios autenticados.
Manejo de errores personalizado para mejorar la experiencia y la robustez de la API.

⚙️ Tecnologías utilizadas
🔹 Backend
Node.js: entorno de ejecución para el servidor.
Express.js: framework para estructurar la API REST.
MongoDB + Mongoose: base de datos NoSQL para almacenar usuarios y tarjetas.
bcryptjs: encriptación de contraseñas.
jsonwebtoken (JWT): autenticación y autorización de usuarios.
Celebrate/Joi: validación de datos en el servidor.
CORS: control de accesos entre cliente y servidor.
Dotenv: manejo seguro de variables de entorno.

🔹 Frontend
React.js (con Vite o Create React App): interfaz de usuario basada en componentes.
React Router DOM: navegación entre vistas.
Context API: manejo de estado global (usuarios y tarjetas).
Fetch API / Axios: consumo de la API en el cliente.

CSS3 + BEM: estilos modulares y escalables.

Popup/Modal Components: interacción para edición de perfil, avatar y creación de tarjetas.
