# Internship Manager – Mini Project for Opal Solutions

This is a **4-hour mini project** developed for an **interview at Opal Solutions**.  
It’s a simple **internship request manager** that allows users to:
- View current internship requests  
- Create a new internship request  
- Accept or refuse an existing request  

---

## 🧩 Project Structure

This is a **monorepo** containing both frontend and backend workspaces:  
```
/frontend
/backend
```

The monorepo setup makes communication between front and back easier and avoids synchronization issues, while keeping the project scalable and maintainable even if expanded later.

---

## 🚀 How to Run the Project

You can start the project in multiple ways:

### Option 1 – From root with npm workspaces
```bash
npm run start:frontend
npm run start:backend
```
These commands respectively run:
```json
"start:frontend": "npm --workspace frontend run dev",
"start:backend": "npm --workspace backend run dev"
```

### Option 2 – From each repository manually
```bash
cd frontend
npm run dev

cd backend
npm run dev
```

### Option 3 – With Docker
```bash
docker-compose up
```
or to rebuild the project:
```bash
docker-compose up --build
```

---

## 🧠 Development Reasoning

I started by implementing and testing the **backend**.  
Since it’s a small service with no complex dependencies between functions, I didn’t create unit tests but relied on **manual HTTP request testing**.

I chose **Prisma** for database management because it’s used at Opal Solutions and I wanted to explore this technology further. It turned out to be an efficient and elegant ORM for this kind of project.

After completing the backend, I moved on to the **frontend**, which I also tested manually.  
During development, I encountered a minor issue with data fetching due to a missing **CORS implementation** in the backend.

---

## ⚙️ Design Choices

- **Custom Router**:  
  Even though the app only handles a few routes, I decided to implement a simple personal router for scalability and maintainability.

- **Monorepo Architecture**:  
  This setup allows both frontend and backend to communicate easily from a single root.  
  For such a small project, this is not strictly necessary, but it demonstrates how a unified structure can help avoid communication mismatches — something that often happens in larger projects once deployed.

---

## 🧾 Notes

This project is not intended for production — it was developed as a **technical support project for an interview** and demonstrates reasoning, structure, and technical choices rather than full deployment readiness.
