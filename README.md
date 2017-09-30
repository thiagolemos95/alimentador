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

[POST] api/lancamento/data -- para salvar um lançamento

**um post com os campos:**

  data: 
   - data_lancamento TEXT,
   - tipo_lacamento TEXT,
   - hora INTEGER,
   - minutos INTEGER,
   - quantidade_prevista INTEGER,
   - quantidade_realizada INTEGER,
   - status TEXT


variaveis de ambiente de produção:

  - PG_HOST -- endereço do banco 
  - PG_USER -- nome do usuário
  - PG_PASSWORD -- senha
  - PG_PORT -- porta do banco
  - PG_DB -- nome do banco de dados

  - NODE_ENV -- prodution, **default:** development
  - HOST -- ip do host, **default:**  localhost
  - PORT  -- porta do host, **default:** 3000