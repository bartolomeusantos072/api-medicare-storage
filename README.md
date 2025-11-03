Aqui está a tradução completa para o português:

---

# json-server com autenticação, autorização e servidor peerjs adicionados

Esta aplicação é destinada **apenas para fins de desenvolvimento web**.
Ela utiliza o pacote do Node [`json-server`](https://github.com/typicode/json-server) para gerar automaticamente uma **API REST** a partir de um arquivo de banco de dados JSON.

Esta versão adiciona:

* **Autenticação** usando *express-session*: login, logout e cadastro.
* **Autorização**: é possível configurar algumas rotas como privadas. Apenas usuários autenticados e donos das entidades podem acessá-las.
* **Servidor PeerJS**: acessa as funcionalidades de [peerjs-server](https://github.com/peers/peerjs-server) em `/peerjs`.
* **Servidor WebSocket** usando [socket.io](https://socket.io/).

### Pré-requisitos:

* Ter o [Node.js](https://nodejs.org) instalado.

---

### Para executar a aplicação:

* Execute `npm install`
* Execute `npm run start`
* A API estará disponível em `http://localhost:3000/api`
* O serviço PeerJS estará disponível em `http://localhost:3000/peerjs`

---

# Como funciona

O servidor lê um arquivo de configuração na inicialização para adicionar os recursos desejados.
Aqui está um exemplo:

```
{
  "authentication": {
    "private": false
  },
  "authorization": [
    "orders", "users"
  ],
  "fileUpload": true,
  "filter": [
    {
      "entity": "users",
      "fields": [
        "id",
        "username"
  ]}]
}
```

---

### Opções

#### `authentication` (autenticação)

Este é um objeto que pode conter o campo `private`.
Se este campo estiver presente, a autenticação será adicionada à API.
Nesse caso, o servidor **assume que existe uma entidade `users` no banco de dados**, contendo os campos `username` e `password`.
São criados três novos *endpoints*:

---

**`POST /users/login`**

* Espera um corpo JSON (`application/json`) com um objeto contendo dois campos: `username` e `password`.
* Se houver um usuário correspondente, o servidor armazena o ID do usuário na *session* do express, e as próximas requisições REST do mesmo cliente estarão autenticadas.

---

**`POST /users/logout`**

* Ignora o corpo da requisição e apenas remove o ID do usuário da *session* do express.
* Todas as requisições REST seguintes, vindas do mesmo cliente, deixarão de estar autenticadas.

---

**`GET /users/self`**

* Se o usuário estiver autenticado, retorna `200 OK` com as informações do usuário.
* Caso contrário, retorna `400 BAD_REQUEST` com informações de erro.

---

#### `authorization` (autorização)

Esta opção só é ativada se a autenticação estiver habilitada.
Ela permite **restringir o acesso a determinadas entidades apenas aos seus proprietários**.

Para que funcione, a entidade sujeita à autorização deve possuir um campo `userId`, cujo valor é o ID da entidade `users` (ou seja, o dono do recurso).

Este campo (`authorization`) contém um **array de strings** correspondentes às entidades que queremos restringir o acesso.

---

#### `fileUpload` (envio de arquivos)

Este campo deve ser um **objeto**.
Se estiver presente, um novo *endpoint* `files` é criado para **upload e download de arquivos binários**.

O objeto deve conter o campo `dest` com o **caminho relativo** para uma pasta existente onde os arquivos serão armazenados.
Opcionalmente, pode conter um campo booleano `keepNames`, caso você queira manter os nomes originais dos arquivos enviados.

---

**`POST /files`**

* Faz o upload de um conjunto de arquivos em um corpo *multipart*.
* Retorna um array com os nomes dos arquivos armazenados no servidor.

**`GET /files/:filename`**

* Retorna o arquivo cujo nome é `filename`.

---

#### `filter` (filtro)

Esse recurso permite restringir o acesso a entidades que o usuário **não possui**.
Para essas entidades, apenas os campos especificados no array `fields` serão exibidos.

⚠️ Este recurso **não deve ser usado junto com `authorization`** na mesma entidade.

---

#### `service` (serviços)

Esse recurso permite iniciar dois serviços adicionais:
[peerjs](https://peerjs.com/) e [socket.io](https://socket.io/).

Os valores aceitos são `peerjs` e `ws`.
Existem dois arquivos na pasta `public` para testar esses serviços:
`index_ws.html` e `index_peerjs.html`.
