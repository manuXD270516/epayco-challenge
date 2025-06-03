# Etapa 1: build de React
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: NGINX con inyección de env.js
FROM nginx:alpine

ARG API_URL
ENV API_URL=${API_URL}

WORKDIR /usr/share/nginx/html

# Copiar el build de React
COPY --from=builder /app/dist .

# Generar el archivo env.js después de copiar el build
RUN echo 'window.__ENV__ = { API_URL: "'${API_URL}'" };' > /usr/share/nginx/html/env.js

# Configuración de NGINX
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
