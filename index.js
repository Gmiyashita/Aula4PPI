import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0'; 

var listaEmpresa = []; 

function cadastroempresaView(req, resp) {
    resp.send(`
            <html>
                <head>
                    <title>Cadastro de Empresa</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-5">Cadastro de Empresa</h1>
                        <form method="POST" action="/cadastrarEmpresa" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="rsocial" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Razão Social</label>
                                <input type="text" class="form-control" id="rsocial" name="rsocial">
                             </div>
                             <div class="col-md-4">
                                <label for="nfantasia" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Nome Fantasia da Empresa</label>
                                <input type="text" class="form-control" id="nfantasia" name="nfantasia">
    
                             </div>
                             <div class="col-md-4">
                                <label for="email" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">email</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="email" name="email">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="end" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Endereço</label>
                                <input type="text" class="form-control" id="end" name="end">
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade">
                            </div>
                            <div class="col-md-3">
                                <label for="estado" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">UF</label>
                                <select class="form-select" id="estado" name="estado">
                                    <option selected value="SP">São Paulo</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="cep" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Cep:</label>
                                <input type="text" class="form-control" id="cep" name="cep">
                            </div>
                            <div class="col-md-3">
                                <label for="cnpj" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">CNPJ:</label>
                                <input type="text" class="form-control" id="cnpj" name="cnpj">
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
function cadastrarEmpresa(req, resp) {
    //recuperar os dados do formulário enviados para o servidor
    const rsocial = req.body.rsocial;
    const nfantasia = req.body.nfantasia;
    const email = req.body.email;
    const end = req.body.end;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const cep = req.body.cep;
    const cnpj = req.body.cnpj;

    
 

    if (rsocial && nfantasia && email && cidade && estado && cep) {
       
        const empresa = { rsocial, nfantasia, email, cidade, end, estado, cep, cnpj };

        listaEmpresa.push(empresa);

        resp.write(`
        <html>
            <head>
                <title>Lista de Empresas</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Razão Social</th>
                        <th scope="col">Nome Fantasia</th>
                        <th scope="col">Email</th>
                        <th scope="col">Endereço</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Cep</th>
                        <th scope="col">CNPJ</th>
                    </tr>
                </thead>
                <tbody>`);
       
       
        for (var i = 0; i < listaEmpresa.length; i++) {
            resp.write(`<tr>
                                    <td>${listaEmpresa[i].rsocial}</td>
                                    <td>${listaEmpresa[i].nfantasia}</td>
                                    <td>${listaEmpresa[i].email}</td>
                                    <td>${listaEmpresa[i].end}</td>
                                    <td>${listaEmpresa[i].cidade}</td>
                                    <td>${listaEmpresa[i].estado}</td>
                                    <td>${listaEmpresa[i].cep}</td>
                                    <td>${listaEmpresa[i].cnpj}</td>
                                </tr>
                        `);
        }

        resp.write(`</tbody> 
            </table>
            <a class="btn btn-primary" href="/cadastrarEmpresa">Continuar Cadastrando</a>
            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
            `);
    }
    else
    {

        const estados = {
            "AC": "Acre",
            "AL": "Alagoas",
            "AP": "Amapá",
            "AM": "Amazonas",
            "BA": "Bahia",
            "CE": "Ceará",
            "DF": "Distrito Federal",
            "ES": "Espírito Santo",
            "GO": "Goiás",
            "MA": "Maranhão",
            "MT": "Mato Grosso",
            "MS": "Mato Grosso do Sul",
            "MG": "Minas Gerais",
            "PA": "Pará",
            "PB": "Paraíba",
            "PR": "Paraná",
            "PE": "Pernambuco",
            "PI": "Piauí",
            "RJ": "Rio de Janeiro",
            "RN": "Rio Grande do Norte",
            "RS": "Rio Grande do Sul",
            "RO": "Rondônia",
            "RR": "Roraima",
            "SC": "Santa Catarina",
            "SP": "São Paulo",
            "SE": "Sergipe",
            "TO": "Tocantins"
        };

        resp.write(`
            <html>
                <head>
                    <title>Cadastro de Empresa</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-5">Cadastro de Empresa</h1>
                        <form method="POST" action="/cadastrarEmpresa" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="rsocial" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Razão Social</label>
                                <input type="text" class="form-control" id="rsocial" name="rsocial"  placeholder="Digite a Razão Social da Empresa" value="${rsocial}">
        `);
        if (!rsocial){
            resp.write(`
                <div>
                    <span><p class="alert alert-danger">Por favor, você deve informar a Razão Social da Empresa</p></span>
                </div>
                `);
        }
        resp.write(`</div>
                        <div class="col-md-4">
                        <label for="nfantasia" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Nome Fantasia da Empresa</label>
                        <input type="text" class="form-control" id="nfantasia" name="nfantasia" value="${nfantasia}">`);
        if (!nfantasia){
            resp.write(`
                <div>
                    <span><p class="alert alert-danger">Por favor, você deve informar o Nome Fantasia da Empresa</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
                <div class="col-md-4">
                    <label for="email" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">email</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" class="form-control" id="email" name="email" value="${email}">

            `);
        if (!email){
            resp.write(`
                <div>
                    <span><p class="alert alert-danger">Por favor, você deve informar o email da Empresa</p></span>
                </div>
                `);
        }
        resp.write(`</div>
            <div class="col-md-20">
            <label for="end" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Endereço da Empresa</label>
            <input type="text" class="form-control" id="end" name="end" value="${end}">`);
            if (!end){
            resp.write(`
                <div>
                    <span><p class="alert alert-danger">Por favor, você deve informar o Endereço da Empresa</p></span>
                </div>
                `);
            }
        resp.write(`
                    </div>
                </div>  
            <div class="col-md-6">
                <label for="cidade" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Cidade</label>
                <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}">
            `);

        if (!cidade){
            resp.write(`
                <div>
                    <span><p class="alert alert-danger">Por favor, informe a cidade!</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
            <div class="col-md-3">
                <label for="estado" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">UF</label>
                <select class="form-select" id="estado" name="estado">`);
        for (let [sigla, nomeEstado] of Object.entries(estados)){
            if (sigla == estado){
                resp.write(`<option selected value="${sigla}">${nomeEstado}</option>`);
            }
            else{
                resp.write(`<option value="${sigla}">${nomeEstado}</option>`);
            }
            
        }
        resp.write(`
                </select>
            </div>
            <div class="col-md-3">
                <label for="cep" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">Cep:</label>
                <input type="text" class="form-control" id="cep" name="cep" value="${cep}">
            `);
        if (!cep){
            resp.write(`
                <div>
                    <span><p class="alert alert-danger">Por favor, informe o cep!</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
            <div class="col-md-3">
                <label for="cnpj" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">CNPJ:</label>
                <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj}">
            `);
        if (!cnpj){
            resp.write(`
                <div>
                    <span><p class="alert alert-danger">Por favor, informe o cnpj!</p></span>
                </div>
                `)
        }
        

        resp.write(`
            </div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Cadastrar</button>
        </div>
        </form>
    </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </html> `);

    } 

    resp.end();
}

app.get('/', cadastroempresaView);
app.get('/cadastrarEmpresa', cadastroempresaView); 

app.post('/cadastrarEmpresa', cadastrarEmpresa);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});