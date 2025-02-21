# Gerenciamento de Heróis

Sistema de gerenciamento de heróis e seus superpoderes desenvolvido com .NET 9 (API) e Angular 19.


## 🚀 Tecnologias

### Backend
- .NET 9 API
- PostgreSQL
- Entity Framework Core
- AutoMapper
- Swagger

### Frontend
- Angular 19
- Angular Material
- FP-TS
- DayJS
- Zod
- RxJS
- TypeScript
- SCSS

## 📋 Funcionalidades

- Cadastro de heróis
- Listagem de heróis
- Busca de herói por ID
- Atualização de dados do herói
- Remoção de herói

## 💻 Pré-requisitos

- .NET 9 SDK
- Node.js
- Angular CLI
- PostgreSQL

## 🔧 Instalação

### API (.NET)
1. Navegue até a pasta da API:
```bash
cd api
```

2. Restaure os pacotes:
```bash
dotnet restore
```

3. Execute as migrações:
```bash
dotnet ef database update
```

4. Inicie a API:
```bash
dotnet run
```


### Frontend (Angular)

1. Navegue até a pasta web:
```bash
cd web
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação:
```bash
ng serve
```


## 🌐 Endpoints

A documentação completa da API está disponível via Swagger em: https://localhost:7241/swagger ou http://localhost:5267/swagger

## 🛠️ Estrutura do Projeto

### api/
```
├── Controllers/            # Controllers da API
├── Models/                 # Modelos de dados       
│── Dtos/                   # DTOs (Data Transfer Objects)
├── Services/               # Serviços
├── Repositories/           # Repositórios
├── Mappings/               # Mapeamento de objetos (AutoMapper)
└── Program.cs              # Ponto de entrada da API
```

### web/
```
├── src/
│   ├── app/
│   │   ├── components/             # Componentes Angular
│   │   ├── services/
│   │   │   ├── api/                # Serviços de comunicação com a API
│   │   │   └── ng/                 # Serviços Angular  
│   │   ├── models/                 # Modelos de dados  
│   │   └── app.component.ts        # Componente principal
│── environments/                   # Configurações de ambiente
```