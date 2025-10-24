# Frontend: build with Vite and serve with nginx
FROM node:18-alpine AS builder
WORKDIR /app

COPY frontend/package*.json ./
COPY frontend/tsconfig.json ./
COPY frontend/vite.config.ts ./
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/public/index.html ./index.html

# install dependencies and build
RUN npm install
RUN npm run build

# run with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
