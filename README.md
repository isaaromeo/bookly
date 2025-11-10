

# Bookly - Encuentra recomendaciones y reseña tus libros favoritos
![Bookly Header](https://res.cloudinary.com/dxkccna0g/image/upload/v1762750748/header3_pr8rwm.png)
## 📚 Descripción del Proyecto
Bookly es una plataforma web estilo Goodreads diseñada para amantes de la lectura. Permite a los usuarios descubrir nuevos libros, escribir reseñas, seguir a otros lectores y gestionar su biblioteca personal.

---

## ✨ Características Principales

### 🔍 Búsqueda de Libros
- **Exploración por categorías:** Fantasy, Romance, Mystery, Sci-Fi, Adventure, Poetry, Dystopian, Business, Self-Help, Thriller  
- **Búsqueda avanzada:** Por título, autor o ISBN  
- **Libros trending:** Selección de libros populares  
- **Recomendaciones comunitarias:** Basadas en gustos de otros usuarios  

### 👥 Gestión de Usuario
- Perfiles personalizables con avatar e información personal  
- Biblioteca personal: Libros leídos y por leer (TBR --> To Be Read)  
- Sistema de seguimiento: Follow/Unfollow entre usuarios  
- Roles de usuario: Reader, Admin  

### 📁 Admin Tools
- Permiten a los usuarios Admin subir libros de forma masiva en formato CSV a la bbdd

### 📝 Sistema de Reseñas
- Calificación con estrellas (1-5)  
- Reseñas detalladas con título y contenido  
- Sistema de likes en reseñas  
- Gestión de reseñas propias (eliminar)  

### 🎨 Experiencia de Usuario
- Diseño responsive para todos los dispositivos  
- Interfaz intuitiva y moderna  
- Navegación fluida entre secciones  

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 19 + Vite - Framework principal y bundler  
- Chakra UI - Componentes de UI  
- Styled Components - Estilización  
- React Router DOM - Navegación  
- React Hook Form - Manejo de formularios  

### Backend
- API REST personalizada - Desarrollada específicamente para Bookly  
- Autenticación JWT - Gestión segura de sesiones  
- Base de datos MongoDB - Almacenamiento de datos  

### Características Técnicas
- Hooks personalizados para la comunicación con la API  
- Sistema de caching para mejor performance  
- Manejo de errores robusto  


---

## 🚀 Funcionamiento

### Flujo de Usuario
1. **Registro/Login:** Crear cuenta o iniciar sesión  
2. **Explorar:** Navegar por categorías o usar búsqueda  
3. **Descubrir:** Ver detalles de libros y reseñas de comunidad  
4. **Interactuar:** Añadir a biblioteca, escribir reseñas, seguir usuarios  
5. **Gestionar:** Administrar perfil y contenido personal  

### Funcionalidades Clave
- **Biblioteca Personal:** Añadir/eliminar libros leídos  
- **Lista TBR:** Libros "To Be Read"  
- **Sistema Social:** Seguir usuarios y ver su actividad  
- **Panel Admin:** Herramientas para administradores  


---

## 🎯 Mejoras Futuras Planeadas

### 🎭 Sistema de Roles Mejorado
- **Rol Author:** Perfiles verificados para autores reales  
- Badge de verificación  
- Página de autor dedicada  
- Gestión de libros publicados  
- Estadísticas de ventas/lecturas  

### 📖 Clubes de Lectura
- Creación de clubs temáticos o por libros específicos  
- Foros de discusión por capítulos  


### 🏆 Sistema de Niveles por Reseñas
- **Bookworm:** +10 reseñas  
- **Bookmouse:** +50 reseñas  
- **BookDragon:** +100 reseñas  
- Badges visuales en perfil  


### 👤 Mejoras de Perfil
- Diseño más atractivo con más información:
   - Libro favorito destacado 
   - Autor favorito 
   - Lectura actual en progreso  
   - Próxima lectura planeada 
- Estadísticas de lectura (libros/año, páginas, etc.)  
- Gráficos de progreso  
- Temas de perfil personalizados  

### 🔝 Mejoras en Header
- Libro favorito destacado  
- Autor favorito  
- Lectura actual en progreso  
- Próxima lectura planeada  
- Logros recientes  

### 🎨 Personalización y Temas
**Temas Disponibles**  
- Tema Bookly (oscuro principal)  
- Sistema de colores consistente con branding  

**Diseño Responsive**  
- Breakpoints personalizados para mejor experiencia  
- Navegación adaptativa  

---

## 🔐 Seguridad y Performance

### Características de Seguridad
- Autenticación JWT  
- Validación de formularios  
- Protección de rutas  
- Manejo seguro de datos de usuario  

### Optimizaciones
- Lazy loading de componentes  
- Caching inteligente  
- Optimización de imágenes  
- Bundle splitting  

---



