# Challenge Front 2

Sistema de gestão de empresas e fornecedores construído com Next.js, Mantine e Tailwind CSS.

🌐 **Acesso Online:** [https://challenge-front-2.vercel.app/](https://challenge-front-2.vercel.app/)

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática
- **Mantine v8** - Biblioteca de componentes UI
- **Tailwind CSS v4** - Framework CSS utilitário
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm ou npm

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm dev

# Build para produção
npm build

# Executar build de produção
npm start
```

### Outros Comandos

```bash
# Linting
npm lint
npm lint:fix

# Formatação
npm format
```

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Páginas (App Router)
├── components/          # Componentes organizados
│   ├── atoms/          # Componentes básicos
│   ├── molecules/      # Componentes compostos
│   └── organisms/      # Componentes complexos
├── services/           # Serviços de API
├── types/              # Definições TypeScript
└── schemas/            # Schemas de validação
```

## 🔗 Links Úteis

- [Mantine](https://mantine.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)

⚠️ Importante: Para o funcionamento correto do front-end, é necessário que a API esteja em execução. Certifique-se de iniciar a API antes de executar o front-end.

Para mais informações sobre como executar a API, consulte o README do projeto da API.