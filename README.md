# Controle de Estoque - Frontend

Este é o repositório do frontend para o sistema de controle de estoque. A aplicação é construída com React, TypeScript e Vite, utilizando Material-UI para os componentes de interface.

## ✨ Funcionalidades

O projeto está estruturado para suportar as seguintes funcionalidades:

-   **Autenticação:** Login de usuário para acesso ao sistema.
-   **Dashboard:** Painel principal com informações e navegação.
-   **Gerenciamento de Produtos:** Cadastro, edição e visualização de produtos.
-   **Gerenciamento de Estoque:** Controle de entrada e saída de itens.
-   **Gerenciamento de Usuários:** Administração de usuários do sistema.

## 🚀 Tecnologias Utilizadas

-   **[React](https://react.dev/)** - Biblioteca para construção de interfaces de usuário.
-   **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript que adiciona tipagem estática.
-   **[Vite](https://vitejs.dev/)** - Ferramenta de build moderna e rápida.
-   **[Material-UI (MUI)](https://mui.com/)** - Biblioteca de componentes React para um design mais rápido e fácil.
-   **[React Hook Form](https://react-hook-form.com/)** - Para gerenciamento de formulários.
-   **[Zod](https://zod.dev/)** - Para validação de esquemas de dados.
-   **[Axios](https://axios-http.com/)** - Cliente HTTP baseado em Promises.
-   **[ESLint](https://eslint.org/)** - Para linting e padronização de código.

## ⚙️ Como Começar

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
-   [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd front-storage-control
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute o comando:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

## 🛠️ Scripts Disponíveis

No `package.json`, você encontrará os seguintes scripts:

-   `npm run dev`: Inicia o servidor de desenvolvimento com Vite.
-   `npm run build`: Compila o projeto para produção na pasta `dist`.
-   `npm run lint`: Executa o linter (ESLint) para verificar a qualidade do código.
-   `npm run preview`: Inicia um servidor local para visualizar a build de produção.

## 📂 Estrutura de Pastas

A estrutura de pastas do projeto segue uma abordagem modular por funcionalidade (`feature`):

```
src/
├── assets/         # Imagens, ícones e outros arquivos estáticos
├── config/         # Configurações globais (ex: instância do Axios)
├── features/       # Módulos da aplicação (auth, products, etc.)
│   ├── auth/
│   └── ...
├── routes/         # Configuração de rotas da aplicação
├── schemas/        # Esquemas de validação (Zod)
├── shared/         # Componentes, hooks e layouts reutilizáveis
├── theme/          # Configuração de tema do Material-UI
└── main.tsx        # Ponto de entrada da aplicação React
```