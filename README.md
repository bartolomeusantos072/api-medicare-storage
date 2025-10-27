# 🍽️ API Fake - Sistema de Refeições da Cozinha Escolar

Este projeto simula uma API RESTful simples para uso em estudos de **desenvolvimento front-end**, utilizando o [JSON Server](https://github.com/typicode/json-server) com dados inspirados em um sistema de refeições escolares.

---

## 🎯 Objetivo

Permitir que estudantes desenvolvam e testem aplicações front-end que:

- Consomem APIs REST com `fetch` ou `axios`
- Realizam operações de CRUD
- Trabalham com autenticação (simulada)
- Implementam lógica de filtros, votos, e associação de dados
- Entendem relações entre entidades como "usuário", "prato", "votação"

---

## 📦 Estrutura dos Dados

O banco simulado (`db.json`) possui as seguintes "tabelas":

### 👩‍🍳 `usuario`

Contém os dados das usuario que cadastram pratos.

```json
{
  "id_usuario": 1,
  "nome": "Maria",
  "email": "maria@medica.com",
  "senha": "senha_segura"
}
```

---


---

## 🚀 Como Rodar

1. Instale o JSON Server:

```bash
npm install -g json-server
```

2. Inicie o servidor com o arquivo:

```bash
json-server --watch db.json --port 3001
```

3. Acesse:

```
http://localhost:3001/prato_tb
http://localhost:3001/usuario_tb
http://localhost:3001/votacao_tb
```

---

## 🔐 Simulação de Permissões

**Alunos (usuários anônimos):**

- Podem **listar pratos**
- Podem **votar** via `POST` em `/votacao_tb`

**usuarios (login simulado):**

- Podem **cadastrar, editar e excluir** seus próprios pratos
- Só acessam pratos vinculados ao seu `id_usuario`

---

## 💡 Sugestões de Exercícios com Front-End

- Página pública com:
  - Listagem dos pratos do dia
  - Filtros por data, turno ou usuario
  - Botão "Curtir" para votar

- Painel administrativo para usuario:
  - Tela de login
  - Lista e formulário de cadastro e edição de pratos
  - Validação e proteção de rotas

---

## 🧠 Extras

- Simule login com `localStorage` e headers fake
- Use `axios.interceptors` para simular autenticação
- Implemente feedbacks visuais para votos e CRUD

---

> Projeto educacional para fins de aprendizado e prática com APIs REST. Divirta-se criando! 🎨💻
