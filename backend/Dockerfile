# Backend: build TypeScript and run node
FROM node:18-alpine AS builder
WORKDIR /app

# copy package files for install
COPY backend/package*.json ./
COPY backend/tsconfig.json ./
COPY backend/src ./src

# install dependencies and build
RUN npm install
RUN npm run build

# run the built backend
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node","dist/index.js"]
