# TestNestJS

## 📌 Descrição
Este é um projeto de backend construído com **NestJS** e **TypeORM**, utilizando **PostgreSQL** como banco de dados. O objetivo é fornecer uma API REST para gerenciar usuários e assinaturas.

---

## 🚀 Tecnologias Utilizadas
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (Opcional)
- [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) para padronização do código

---

## 📂 Estrutura do Projeto

```
TestNestJS/
│-- src/
│   ├── modules/
│   │   ├── user/
│   │   │   ├── entities/user.entity.ts
│   │   │   ├── user.module.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.controller.ts
│   │   ├── subscription/
│   │   │   ├── entities/subscription.entity.ts
│   │   │   ├── subscription.module.ts
│   │   │   ├── subscription.service.ts
│   │   │   ├── subscription.controller.ts
│   ├── app.module.ts
│   ├── main.ts
│-- .env
│-- package.json
│-- tsconfig.json
│-- README.md
```

---

## ⚙️ Configuração e Execução

### **1️⃣ Clonar o repositório**
```bash
git clone https://github.com/seu-usuario/TestNestJS.git
cd TestNestJS
```

### **2️⃣ Instalar dependências**
```bash
npm install
```

### **3️⃣ Configurar variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto e configure:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=test_nestjs
```

### **4️⃣ Rodar o Banco de Dados (Docker)**
Caso esteja usando Docker, rode:
```bash
docker-compose up -d
```

### **5️⃣ Executar o projeto**
```bash
npm run start:dev
```

---

## 🔥 Endpoints da API

### **Usuários**
📌 Criar um usuário
```http
POST /users
```
**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com"
}
```

📌 Listar usuários
```http
GET /users
```

### **Assinaturas**
📌 Criar uma assinatura
```http
POST /subscriptions
```
**Body:**
```json
{
  "plan": "Premium",
  "startDate": "2025-03-30",
  "endDate": "2025-06-30",
  "userId": 1
}
```

📌 Listar assinaturas
```http
GET /subscriptions
```

---

