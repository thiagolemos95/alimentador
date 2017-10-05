Alimentador - API REST
=====
Trabalho prático de Engenharia de computação.



Depedências:

[PostgreSQL](https://www.postgresql.org/)

instruções desenvolvimento:

```
npm install && npm start
```

Endpoints:

[GET] api/lancamentos -- para retornar todos os lançamentos

[GET] api/lancamento/id -- para retornar um lançamento

[GET] /api/lancamentos/status/nome_status -- para retornar um lançamento de acordo com o status 

[POST] api/lancamento/data -- para salvar um lançamento

[PACTH] api/lancamento/data -- para atualizar um lançamento

**um http post com os campos:**

  data: 
   - data_lancamento TEXT,
   - tipo_lancamento TEXT,
   - hora INTEGER,
   - minutos INTEGER,
   - quantidade_prevista INTEGER,
   - quantidade_realizada INTEGER,
   - status TEXT

Exemplo:
```
/api/lancamento?data_lancamento=2017-01-01&tipo_lancamento=asdf&hora=12&minutos=12&quantidade_prevista=12&quantidade_realizada=12&status=feito 
```

**um http patch com os campos:**

parâmetro:
  - status TEXT - nome do status

parâmetros query string(opcionais):

   - limit INTEGER - limite de retorno do banco
   - format TEXT - tipo de formato de retorno `json`(default) | `json`

data:
  - quantidade_realizada INTEGER,
  - status TEXT 

```
/api/lancamento/1?quantidade_realizada=10&status=aguardando

```
ou

```
/api/lancamentos/status/aguardando?limit=3&format=json
```

variaveis de ambiente de produção:

  - PG_HOST -- endereço do banco 
  - PG_USER -- nome do usuário
  - PG_PASSWORD -- senha
  - PG_PORT -- porta do banco
  - PG_DB -- nome do banco de dados

  - NODE_ENV -- prodution, **default:** development
  - HOST -- ip do host, **default:**  localhost
  - PORT  -- porta do host, **default:** 3000