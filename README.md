# 📘 Schema Visualizer – PostgreSQL & MongoDB

A full-stack **Next.js 14** application that visualizes database schemas using **React Flow**.  
It supports both **PostgreSQL** and **MongoDB**, showing tables/collections, fields, and relationships in an interactive UI.

---

##  Features

### PostgreSQL Viewer
- Visualize tables  
- List columns + datatypes  
- Detect primary/foreign keys  
- Auto-detect relationships  
- JSON export  

### MongoDB Viewer
- Visualize collections  
- Infer fields from sample documents  
- Support nested + embedded objects  
- Detect ObjectId-based references  
- JSON export  

### UI Features
- React Flow diagram  
- Minimap toggle  
- Smooth animations (Framer Motion)  
- Click-to-highlight relationships  
- Clean dark UI  

---

## Tech Stack

- Next.js 14 (App Router)  
- React Flow  
- TailwindCSS  
- TypeScript  
- Framer Motion  
- PostgreSQL  
- MongoDB  
- Node.js Serverless Runtime  

---

## Installation

```bash
npm install
# or
yarn
# or
pnpm install


## Running the Project

npm run dev


## Open at
http://localhost:3000


## Database Connection Strings

## PostgreSQL Example
postgres://user:password@host:5432/databasename

## MongoDB Example (Docker Replica Set)
mongodb://localhost:27017/test?directConnection=true&replicaSet=rs0

## MongoDB Atlas Example
mongodb+srv://username:password@cluster0.mongodb.net/test

