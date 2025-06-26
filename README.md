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
- [Next.js 15](https://nextjs.org/) - Usada por: Soporte nativo para Typescript, framework React, optimización de recursos.
- [TypeScript](https://www.typescriptlang.org/) - Usado por: Typing estructurado, inferencia de tipos, mantenimiento a largo plazo.
- [Tailwind CSS](https://tailwindcss.com/) - Usado por: Organización de código, clases pre definidas, rápido y ligero, 

### Backend
- [Node.js](https://nodejs.org/) - Usado por: Misma tecnología para backend js o ts, .
- [Express](https://expressjs.com/) - Usado por: Flexibilidad, ecosistema maduro y compatible con cors.
- Almacenamiento en archivo JSON (`server/data/tasks.json`) - Simpley util. Formato muy usado.

---

## ⏱️ Tiempo Estimado
- Diseño inicial: ~2h
- Desarrollo frontend con Next.js y TailwindCSS: ~10h
- Desarrollo backend con Node.js + Express: ~4h
- Integración frontend/backend y conexión con archivo JSON: ~2h

**Total aproximado: 18 horas**

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
