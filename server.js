const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(middlewares);



// Rota de Login (Signin)
server.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const db = router.db;
    const user = db.get("usuarios").find({ email }).value();

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Comparando a senha fornecida com a senha armazenada
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const tokenFake = "token-qualquer-" + user.id;

    return res.json({
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email
      },
      token: tokenFake
    });
  } catch (error) {
    console.error("Erro no /login:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


// Rota de Cadastro (Signup)
server.post("/signup", async (req, res) => {
  try {
    console.log("Recebido corpo para signup:", req.body);

    const { nome, email, senha, categoria } = req.body;
    const db = router.db;

    if (!nome || !email || !senha) {
      console.log("Campos obrigatórios faltando");
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const userExistente = db.get("usuarios").find({ email }).value();
    if (userExistente) {
      console.log("Email já cadastrado:", email);
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const usuarios = db.get("usuarios").value();
    console.log("Usuários atuais:", usuarios);

    const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    console.log("Novo ID calculado:", novoId);

    const novaCozinheira = { id: novoId, nome, email, senha, categoria };

    await db.get("usuarios").push(novaCozinheira).write();

    console.log("Usuária cadastrada:", novaCozinheira);

    return res.status(201).json({
      message: "Usuária criada",
      id_usuario: novoId,
      usuario: novaCozinheira
    });

  } catch (err) {
    console.error("Erro no /signup:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


server.use(router);
server.listen(3000, () => {
  console.log('JSON Server rodando em http://localhost:3000');
});
