# Tech Loja - E-Commerce

Sistema de e-commerce desenvolvido com Node.js, Express, MySQL e MongoDB seguindo o padrão MVC.

## 📋 Pré-requisitos

- **Node.js** v18 ou superior
- **MySQL** 8.0 ou superior
- **MongoDB** 6.0 ou superior
- **npm** (gerenciador de pacotes do Node.js)

## 🗄️ Arquitetura de Banco de Dados

O projeto utiliza uma arquitetura híbrida com dois bancos de dados:

### MySQL (Relacional)
Armazena dados estruturados e relacionamentos:
- **Usuario**: Cadastro de usuários
- **Pedido**: Histórico de pedidos
- **ItemPedido**: Itens de cada pedido

### MongoDB (Não-Relacional)
Armazena dados com schema flexível:
- **Produto**: Catálogo de produtos com detalhes técnicos variáveis

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/filipe4ndrade/projeto_backend_2.git
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar MySQL

Crie o banco de dados e usuário no MySQL:

```sql
CREATE DATABASE ecommerce;
CREATE USER 'fullstack'@'localhost' IDENTIFIED BY 'senha_fullstack';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'fullstack'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Configurar MongoDB

Certifique-se de que o MongoDB está rodando em `localhost:27017`.

```bash
# Inicie o MongoDB
mongod
```

### 5. Instalar Bootstrap (Offline)

Baixe o Bootstrap 5.3 e coloque os arquivos nas pastas:

- CSS: `public/stylesheets/bootstrap/`
- JS: `public/javascripts/bootstrap/`

Ou baixe de: https://getbootstrap.com/docs/5.3/getting-started/download/

Mas deixare ele no projeto*

## ▶️ Executar o Projeto

```bash
npm start
```

O servidor estará disponível em: **http://localhost:3000**

## 📊 Povoar Banco de Dados

Ao acessar o sistema pela primeira vez, clique em **"Povoamento Inicial"** no menu ou acesse:

```
http://localhost:3000/povoar
```

Isso criará:
- 3 usuários de exemplo
- 10 produtos variados (notebooks, celulares, tablets, etc.)


## 🔧 Configuração de Credenciais

As credenciais estão definidas em:

**MySQL** (`model/conexaoRelacional.js`):
```javascript
database: 'ecommerce'
user: 'fullstack'
password: 'senha_fullstack'
```

**MongoDB** (`model/conexaoNaoRelacional.js`):
```javascript
mongodb://localhost:27017/ecommerce
```

