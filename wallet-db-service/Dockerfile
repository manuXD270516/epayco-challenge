# Etapa 1: Build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Instalamos cliente mysql para usar mysqladmin en el script
RUN apk add --no-cache mysql-client

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/wait-for-mysql.sh ./wait-for-mysql.sh

RUN npm install --only=production
RUN chmod +x wait-for-mysql.sh

ENV NODE_ENV=production

CMD ["sh", "./wait-for-mysql.sh"]
