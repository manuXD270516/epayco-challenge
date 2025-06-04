# 🧾 ePayco Wallet – Monedero Digital Fullstack

Plataforma web fullstack para la gestión de una billetera digital con funcionalidades como registro de clientes, recarga, consulta de saldo, pagos con token y confirmación.

---

## 🚀 Cómo ejecutar

### Opción 1: Usando Docker Compose (recomendado)

```bash
docker compose up -d --build
```

Abrir en el navegador:
- Frontend: http://localhost:5173
- API Backend: http://localhost:4000
- Adminer: http://localhost:8080

---

### Opción 2: Modo Debug / Desarrollo Manual

#### 1. Base de datos MySQL y Adminer (Docker)

```bash
docker compose up mysql adminer
```

#### 2. Backend DB Service (NestJS)

```bash
cd wallet-db-service
npm install
npm run start:dev
```

#### 3. Backend API Service (NestJS)

```bash
cd wallet-api-service
npm install
npm run start:dev
```

#### 4. Frontend (React + Vite)

```bash
cd wallet-frontend
npm install
npm run dev
```

Abrir en el navegador: http://localhost:5173

---

## 🔄 Flujos de Ejecución de Funcionalidades

### 1. Registro y Recarga de Cliente
1. El usuario accede al frontend y se registra como cliente (evita duplicados por documento).
2. Una vez registrado, puede realizar una recarga de saldo usando su documento o teléfono.
3. El saldo se actualiza dinámicamente y puede ser consultado en la sección de balance.

### 2. Pago con Token y Confirmación
1. El usuario inicia sesión y solicita un token de pago (válido por 5 minutos, visible con temporizador).
2. El usuario comparte el token con quien va a recibir el pago.
3. El receptor ingresa el token y confirma el pago (requiere sesión activa y token válido).
4. El sistema descuenta el saldo y actualiza los movimientos.

### 3. Consulta de Saldo
1. El usuario accede a la sección de balance.
2. El sistema calcula el saldo en tiempo real a partir de los movimientos registrados.

---

## 📁 Ejemplo de archivos .env

```env
# .env.mysql
DB_PASS=root
DB_NAME=walletdb

# wallet-db-service/.env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=walletdb

# wallet-api-service/.env
APP_ENV=docker
DB_SERVICE_URL_LOCAL=http://localhost:3000
DB_SERVICE_URL_DOCKER=http://wallet-db:3000
```

---

## 🛠️ Tecnologías utilizadas

### Backend:
- **NestJS**
- **TypeORM + MySQL**
- DTOs + Validación con `class-validator`
- Respuestas estructuradas `{ code, message, data? }`

### Frontend:
- **React + TypeScript + Vite**
- **Bootstrap 5**
- Componentes reutilizables (`InputField`, `AlertMessage`, `Navbar`)
- Hooks personalizados (`useForm`)
- Clean Code aplicado

---

## ⚙️ Funcionalidades

| Funcionalidad        | Descripción |
|----------------------|-------------|
| 📝 Registro de Cliente | Evita duplicados por documento. |
| 💰 Recarga           | Carga de saldo por documento/teléfono. |
| 📊 Consulta de saldo | Cálculo dinámico por movimientos. |
| 💳 Token de Pago     | Se genera y visualiza por 5 minutos con contador. |
| ✅ Confirmar Pago     | Requiere sesión y token activo. |

---

## 🖥️ UI Features

- Formulario centrado y responsivo
- Alertas visuales dinámicas
- Temporizador para token de pago
- Copiar al portapapeles `token` y `sessionId`

---

## 🧪 API Documentada – Postman

🔗 [https://documenter.getpostman.com/view/2654210/2sB2qi7cee](https://documenter.getpostman.com/view/2654210/2sB2qi7cee)

---