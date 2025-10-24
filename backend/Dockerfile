# Backend: build TypeScript and run node
FROM node:18-alpine AS builder
WORKDIR /workspace/backend

# copy package files and prisma schema for install & client generation
COPY backend/package*.json ./
COPY backend/prisma ./prisma

# copy shared folder so relative imports to ../shared resolve during build
COPY shared ../shared

# install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# copy source and build
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build

# final runtime image
FROM node:18-alpine
WORKDIR /workspace/backend
COPY --from=builder /workspace/backend/package*.json ./
COPY --from=builder /workspace/backend/node_modules ./node_modules
COPY --from=builder /workspace/backend/dist ./dist
COPY --from=builder /workspace/backend/prisma ./prisma

EXPOSE 3000
# on container start, apply pending migrations then start the app
CMD ["sh","-c","npx prisma migrate deploy && node dist/backend/src/index.js"]
