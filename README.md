# 📝 Gestor de Tareas

Aplicación web para la gestión de tareas, desarrollada con **Next.js**, **TypeScript** y **Tailwind CSS** en el frontend, y **Node.js + Express** en el backend. Almacena las tareas en un archivo **`.json`** que actúa como base de datos.

---

## 🚀 Funcionalidades

- Crear tareas con título y descripción
- Editar tareas existentes
- Marcar tareas como completadas o pendientes
- Eliminar tareas
- Filtrar por estado y búsqueda por texto
- Estadísticas automáticas de tareas
- Almacenamiento persistente en archivo JSON local

---

## 📁 Estructura del Proyecto

- /components → Componentes UI y lógicos (botones, diálogos, tarjetas)
- /lib → Funciones utilitarias como llamadas a la API
- /pages → Frontend con Next.js (principalmente index.tsx)
- /server
 ├─ /controllers → Lógica del backend (CRUD)
 ├─ /routes → Endpoints de la API con Express
 ├─ /data → Archivo JSON que actúa como base de datos (tasks.json)
 └─ index.ts → Servidor principal con Express


---

## 🛠️ Tecnologías Usadas

### Frontend
- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- Almacenamiento en archivo JSON (`server/data/tasks.json`)

---

## ⚙️ Instalación

```bash

### 1. Clonar el repositorio
git clone https://github.com/tu-usuario/gestor-tareas.git
cd gestor-tareas


### 2. Instalar dependencias
- npm install


### 3. Ejecutar el servidor backend
- npm run dev:backend


### 4. Ejecutar la app Next.js
- npm run dev
- Abrir: http://localhost:3000
