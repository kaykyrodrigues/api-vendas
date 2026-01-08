## API de Controle de Vendas 
API REST desenvolvida com a finalidade de gerenciar vendas, funcionando com um CRUD que permite cadastrar, consultar, atualizar e remover vendas. 

O projeto foi criado com a finalidade de aplicar boas práticas backend, arquitetura em camadas e também ser utilizado como ferramenta real de gerenciamento.

## 💻 Tecnologias
* Node.js
* Express
* MySQL
* JavaScript (ES Modules)
* UUID para identificação única
* dotenv para variáveis de ambiente

## Endpoints e Como rodar
- Endpoints:
```
POST   /sales
GET    /sales
GET    /sales/:id
PATCH    /sales/:id
DELETE /sales/:id
```
- Rodando o projeto:
```
git clone <url-do-repositorio>
npm install
npm run dev
```

## Modelagem das Vendas Diárias
A entidade **vendas_diarias** possui os seguintes campos:

* `id` (UUID)
* `sale_date` (date)
* `total_amount` (decimal)
* `cash_amount` (decimal)
* `pix_amount` (decimal)
* `credit_amount` (decimal)
* `notes` (varchar)
* `created_at` (timestamp)

As validações de regra de negócio são realizadas no backend. No banco de dados foram passados apenas valores padrões.

## Funcionalidades Futuras
* Documentação com Swagger
* Autenticação
* Integração com front-end

## Conhecimentos Obtidos
Sendo um projeto também de interesse acadêmico, voltado ao estudo da linguagem Node.js, pude aprender e reforçar conceitos importantes sobre backend. Durante a criação desse sistema, venho solidificando os meus conhecimentos acerca da criação da API's REST, como por exemplo na:
* Conexão com o banco de dados
* Organização do código com arquitetura em camadas (nesse projeto, simplificada, mas ainda usual)
* Descoberta e aprendizado de conceitos específicos como Paginação e Filtros
