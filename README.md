
  

# Persona

**Persona** is a web application built with Next.js (frontend) and FastAPI (backend) using a PostgreSQL database. The project was created as a learning exercise to gain practical experience with these technologies. The app includes modules for task management, calendar, professional profile with CV generation, finance tracking, and a chat for user communication. Additionally, it features a personal AI assistant and is implemented as a PWA.

  


  

## 📖 About project

This project was created primarily as a learning exercise to deepen my understanding of Next.js, FastAPI, and PostgreSQL. It features several core modules including task management, calendar, and finance tracking — each with full CRUD operations tailored to individual users.

  

The application allows users to customize their professional profiles, which can then be used to generate a CV automatically. Additionally, it includes a built-in AI assistant based on the LLaMA 2 model, as well as a real-time chat system that leverages WebSockets for seamless communication between users.

  

The interface supports both dark and light themes, enhancing usability across different environments.

  

The main motivation behind building this app was to expand my knowledge of React by exploring server-side rendering (SSR) with Next.js and to develop a flexible custom API using FastAPI.

  



  

## ✨ Features

-  **Authentication** – Registration and authorization using JWT, with request handling based on tokens sent in API calls.

-  **Dashboard** – A summary view presenting key info from other modules, like finance charts, recent tasks, upcoming events, and latest transactions.

-  **CRUD** – Full create, read, update, delete functionality for tasks, calendar events, finances, and profile elements such as work experience, tech stack, personal data, account info, and profile picture.

-  **Chat** – WebSocket-based real-time chat for communicating with other users, with conversation history saved.

-  **AI Assistant** – Personal AI assistant powered by the LLaMA 2 model, supporting creation of new conversations to keep messages organized.

  

-  **PWA** - Progressive Web App with installable features and responsive design (offline mode not implemented yet).

  


  

## 🛠 Technologies

-  **Frontend:** Next.js, React, TypeScript, Tailwind CSS, React Query, Zustand, Shadcn UI, React Hook Form, Zod, PWA

-  **Backend:** FastAPI, Python, PostgreSQL, JWT, WebSocket, Pydantic-AI

-  **AI:** LLaMA 2

  


  

## 📦 Requirements

- Node.js v21.6.2

- npm

- PostgreSQL 17.5

- Python 3.13.5

- Ollama CLI