# Frontend: build with Vite and serve with nginx
FROM node:18-alpine AS builder
WORKDIR /app

# Copy root package files so workspaces (shared) can be resolved during npm install
COPY ../package*.json ./
COPY ../package-lock.json ./

# Copy shared package and frontend sources
COPY ../shared ./shared

# copy frontend package and sources into /app/frontend so npm run build is available there
COPY ../frontend/package*.json ./frontend/
COPY ../frontend/tsconfig.json ./frontend/
COPY ../frontend/vite.config.ts ./frontend/
COPY ../frontend/src ./frontend/src
COPY ../frontend/public ./frontend/public
COPY ../frontend/index.html ./frontend/index.html

# Install at repo root to link workspaces, then build the frontend
RUN npm install
WORKDIR /app/frontend
RUN npm run build

# run with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
