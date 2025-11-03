// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Configuração CRUCIAL para Serverless: 
// 1. Você pode simular a rota GET/usuarios com dados estáticos se precisar
server.get('/login', (req, res) => {
    // Retorna uma lista de exemplo, pois não há persistência na Vercel
    res.status(200).json([
        { id: 1, nome: "Vercel Mock", email: "mock@vercel.com", categoria: "admin" }
    ]);
});


// 2. Simula o sucesso da rota POST (Cadastro)
server.post('/login', (req, res) => {
    const novoUsuario = req.body;
    
    // Simula a validação de email repetido (OPCIONAL, mas recomendável)
    if (novoUsuario.email === 'mock@vercel.com') {
        return res.status(400).json({
            sucesso: false,
            msg: 'Este e-mail já existe (Simulação Vercel).'
        });
    }

    // SIMULA o cadastro bem-sucedido
    // Retorna o novo objeto com um ID, mas não salva no db.json
    res.status(201).json({
        id: Date.now(), // Simula a geração de ID
        ...novoUsuario
    });
});

// A Vercel precisa que exportemos o servidor como um módulo.
// O json-server não é projetado para isso, então usamos a exportação padrão do Express
// (o json-server é construído com Express)
module.exports = server;