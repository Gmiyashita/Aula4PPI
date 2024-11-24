import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';


const app = express();

app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 1000 * 60 * 30 
    }
}));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));


app.use(express.static('./pages/public'));

const porta = 3000;
const host = '0.0.0.0'; 

var listaProdutos = []; 

function cadastroProdutoView(req, resp) {
    resp.send(`
            <html>
                <head>
                    <title>Cadastro de Produto</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-5">Cadastro de Produto</h1>
                        <form method="POST" action="/cadastrarproduto" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="codbarras" class="form-label">Código de Barras</label>
                                <input type="text" class="form-control" id="codbarras" name="codbarras">
                             </div>
                             <div class="col-md-4">
                                <label for="dscprod" class="form-label">Descrição do Produto</label>
                                <input type="text" class="form-control" id="dscprod" name="dscprod">
    
                             </div>
                             <div class="col-md-2">
                                <label for="pcusto" class="form-label">Preço de Custo</label>
                                <div class="input-group has-validation">
                                    <input type="text" class="form-control" id="pcusto" name="pcusto">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <label for="pvenda" class="form-label">Preço de Venda</label>
                                <input type="text" class="form-control" id="pvenda" name="pvenda">
                            </div>
                            <div class="col-md-2">
                                <label for="validade" class="form-label">Digite o prazo de validade</label>
                                <input type="text" class="form-control" id="validade" name="validade">
                            </div>
                            <div class="col-md-2">
                                <label for="qtd" class="form-label">Quantidade</label>
                                <input type="text" class="form-control" id="qtd" name="qtd">
                            </div>
                            <div class="col-md-3">
                                <label for="fabricante" class="form-label">Digite o nome do fabricante</label>
                                <input type="text" class="form-control" id="fabricante" name="fabricante">
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                            </div>
                            </form>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
    `);
}

function menuView(req, resp) {
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }

    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produto</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">MENU</a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="/cadastrarproduto">Cadastrar Produto</a>
                                <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Seu último acesso foi realizado em ${dataHoraUltimoLogin}</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
}

function cadastrarProduto(req, resp) {
    
    const codbarras = req.body.codbarras;
    const dscprod = req.body.dscprod;
    const pcusto = req.body.pcusto;
    const pvenda = req.body.pvenda;
    const validade = req.body.validade;
    const qtd = req.body.qtd;
    const fabricante = req.body.fabricante;

   
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }

    if (codbarras && dscprod && pcusto && pvenda && validade && qtd && fabricante) {
        const produto = { codbarras, dscprod, pcusto, pvenda, validade, qtd, fabricante};
        listaProdutos.push(produto);
        resp.write(`
        <html>
            <head>
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Código de Barras</th>
                        <th scope="col">Descrição do Produto</th>
                        <th scope="col">Preço de Custo</th>
                        <th scope="col">Preço de Venda</th>
                        <th scope="col">Data de validade</th>
                        <th scope="col">Quantidade em estoque</th>
                        <th scope="col">Fabricante</th>
                    </tr>
                </thead>
                <tbody>`);
        for (var i = 0; i < listaProdutos.length; i++) {
            resp.write(`<tr>
                                    <td>${listaProdutos[i].codbarras}</td>
                                    <td>${listaProdutos[i].dscprod}</td>
                                    <td>${listaProdutos[i].pcusto}</td>
                                    <td>${listaProdutos[i].pvenda}</td>
                                    <td>${listaProdutos[i].validade}</td>
                                    <td>${listaProdutos[i].qtd}</td>
                                    <td>${listaProdutos[i].fabricante}</td>
                                </tr>
                        `);
        }

        resp.write(`</tbody> 
            </table>
            <a class="btn btn-primary" href="/cadastrarproduto">Continuar Cadastrando</a>
            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
            `);
    }
    else
    {
        resp.write(`
            <html>
                <head>
                    <title>Cadastro de Produto</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-5">Cadastro de Produto</h1>
                        <form method="POST" action="/cadastrarproduto" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="codbarras" class="form-label">Codigo de Barras</label>
                                <input type="text" class="form-control" id="codbarras" name="codbarras"  placeholder="Digite o Código de Barras" value="${codbarras}">
        `);
        if (!codbarras){
            resp.write(`
                <div>
                    <span><p class="text-danger">Por favor, você deve informar o Código de Barras do produto</p></span>
                </div>
                `);
        }
        resp.write(`</div>
                        <div class="col-md-4">
                        <label for="dscprod" class="form-label">Descrição do Produto</label>
                        <input type="text" class="form-control" id="dscprod" name="dscprod" value="${dscprod}">`);
        if (!dscprod){
            resp.write(`
                <div>
                    <span><p class="text-danger">Por favor, você deve informar a descrição do produto</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
                <div class="col-md-2">
                    <label for="pcusto" class="form-label">Preço de Custo</label>
                    <div class="input-group has-validation">
                        <input type="text" class="form-control" id="pcusto" name="pcusto" value="${pcusto}">

            `);
        if (!pcusto){
            resp.write(`
                <div>
                    <span><p class="text-danger">Por favor, você deve informar o preço de custo</p></span>
                </div>
                `);
        }
        resp.write(`
                    </div>
                </div>  
            <div class="col-md-2">
                <label for="pvenda" class="form-label">Preço de Venda</label>
                <input type="text" class="form-control" id="pvenda" name="pvenda" value="${pvenda}">
            `);

        if (!pvenda){
            resp.write(`
                <div>
                    <span><p class="text-danger">Por favor, informe o preço de venda!</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
            <div class="col-md-2">
                <label for="validade" class="form-label">Data de validade</label>
                <input type="text" class="form-control" id="validade" name="validade" value="${validade}">
                `);
        if (!validade){
            resp.write(`
                <div>
                    <span><p class="text-danger">Por favor, informe a data de validade!</p></span>
                </div>
                `);
        }
        resp.write(`
                </select>
            </div>
            <div class="col-md-3">
                <label for="qtd" class="form-label">Quantidade:</label>
                <input type="text" class="form-control" id="qtd" name="qtd" value="${qtd}">
            `);
        if (!qtd){
            resp.write(`
                <div>
                    <span><p class="text-danger">Por favor, informe a quantidade!</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
                <div class="col-md-2">
                <label for="fabricante" class="form-label">Nome do fabricante</label>
                <input type="text" class="form-control" id="fabricante" name="fabricante">
            `);
        if (!fabricante){
            resp.write(`
                <div>
                    <span><p class="text-danger">Por favor, informe o nome do fabricante!</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Cadastrar</button>
        </div>
        </form>
    </div>
    <div>
        <p><span>Seu último acesso foi realizado em ${dataHoraUltimoLogin}</span></p>
    </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </html> `);

    } 

    resp.end();
}

function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha   = req.body.senha;

    if (usuario === 'admin' && senha === '123'){
        
        req.session.usuarioLogado = true;
        
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
        resp.redirect('/');
    }
    else{
        resp.send(`
                    <html>
                        <head>
                         <meta charset="utf-8">
                         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                               integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                        </head>
                        <body>
                            <div class="container w-25"> 
                                <div class="alert alert-danger" role="alert">
                                    Usuário ou senha inválidos!
                                </div>
                                <div>
                                    <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                                </div>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                                crossorigin="anonymous">
                        </script>
                    </html>
                  `
        );
    }
}

function verificarAutenticacao(req, resp, next){
    if (req.session.usuarioLogado){
        next(); 
    }
    else
    {
        resp.redirect('/login.html');
    }
}

app.get('/login', (req, resp) =>{
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp) => {
    req.session.destroy(); 
    resp.redirect('/login.html');
});

app.post('/login', autenticarUsuario);
app.get('/', verificarAutenticacao, menuView);
app.get('/cadastrarproduto', verificarAutenticacao, cadastroProdutoView); 
app.post('/cadastrarproduto', verificarAutenticacao, cadastrarProduto);


app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});