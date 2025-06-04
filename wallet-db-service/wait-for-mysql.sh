#!/bin/sh

# Parámetros desde variables de entorno
DB_HOST=${DB_HOST:-mysql}
DB_PORT=${DB_PORT:-3306}

echo "Esperando a que MySQL esté disponible en ${DB_HOST}:${DB_PORT}..."

# Espera activa hasta que el servicio MySQL esté aceptando conexiones
until mysqladmin ping -h"${DB_HOST}" -P"${DB_PORT}" --silent; do
  echo "MySQL no está listo todavía..."
  sleep 2
done

echo "MySQL está disponible. Iniciando aplicación..."
exec node dist/main
