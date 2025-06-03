# Etapa de build
FROM node:18 AS builder

WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# ✅ Copiar también el archivo .env
COPY .env .env

# Compilar el proyecto Nest
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env .env

# Instalar solo dependencias de producción
RUN npm install --only=production

ENV NODE_ENV=production

# Ejecutar la app
CMD ["node", "dist/main"]
