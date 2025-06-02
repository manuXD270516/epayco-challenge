# 💼 ePayco Wallet – Microservices Challenge

Este proyecto implementa una billetera virtual basada en arquitectura de microservicios. Incluye dos servicios RESTful desarrollados con **NestJS**, un sistema de persistencia con **MySQL**, y un cliente HTTP que actúa como gateway entre el frontend o consumidor y la base de datos.

## 📦 Arquitectura

- `wallet-db-service`: Servicio NestJS con acceso a base de datos. Contiene la lógica de negocio.
- `wallet-api-service`: Servicio NestJS que expone la API pública y se comunica con el servicio de BD vía HTTP.
- `mysql`: Base de datos para persistir clientes, transacciones y sesiones.
- `adminer`: Herramienta web para visualizar la base de datos.

## 🚀 Funcionalidades

- Registro de cliente
- Recarga de saldo
- Consulta de saldo
- Inicio de pago (generación de token)
- Confirmación de pago (validación de token)

## ⚙️ Tecnologías

- NestJS
- MySQL 8
- Docker & Docker Compose
- TypeORM
- RxJS + Axios (`HttpModule`)
- SOLID principles + modular architecture

## 📁 Estructura de carpetas

```
.
├── wallet-db-service/       # Servicio con acceso directo a BD
├── wallet-api-service/      # Servicio expuesto al cliente
├── docker-compose.yml
└── .env
```

## 🐳 Cómo ejecutar

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/epayco-wallet-challenge.git
cd epayco-wallet-challenge
```

### 2. Define las variables de entorno en `.env`

```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=walletdb
```

### 3. Ejecuta el entorno con Docker

```bash
docker-compose up --build
```

- API pública: http://localhost:4000
- Adminer (DB viewer): http://localhost:8080

---

## 📡 Endpoints disponibles (a través de `wallet-api-service`)

> Base URL: `http://localhost:4000`

### 1. Registrar cliente

```bash
curl -X POST http://localhost:4000/clients   -H "Content-Type: application/json"   -d '{"document":"12345678","fullName":"Juan Pérez","email":"juan@example.com","phone":"789456123"}'
```

### 2. Recargar billetera

```bash
curl -X POST http://localhost:4000/wallet/recharge   -H "Content-Type: application/json"   -d '{"document":"12345678","phone":"789456123","amount":100.00}'
```

### 3. Consultar saldo

```bash
curl -X POST http://localhost:4000/wallet/balance   -H "Content-Type: application/json"   -d '{"document":"12345678","phone":"789456123"}'
```

### 4. Iniciar pago (genera token)

```bash
curl -X POST http://localhost:4000/wallet/pay   -H "Content-Type: application/json"   -d '{"document":"12345678","phone":"789456123","amount":20.00}'
```

### 5. Confirmar pago

```bash
curl -X POST http://localhost:4000/wallet/confirm   -H "Content-Type: application/json"   -d '{"sessionId":"<copiar_id_de_sesion>","token":"<token_enviado>"}'
```

---

## 🔪 Acceder a Adminer

- URL: http://localhost:8080
- Sistema: MySQL
- Servidor: `mysql`
- Usuario: `root`
- Contraseña: `root`
- Base de datos: `walletdb`

---

## 📙 Video demostrativo

> 🔗 Incluir el enlace al video una vez grabado (máx. 15 minutos)

---

## 📚 Notas

- Todos los servicios se comunican por hostname interno de Docker (`wallet-db`)
- Se aplican buenas prácticas, validaciones y estructura modular
- API protegida por separación de responsabilidades (BD vs cliente)

---

## 👤 Autor

Desarrollado por [Tu Nombre] para el challenge técnico de **ePayco** a través de **Interfell**.