CREATE DATABASE alimentador OWNER postgres;


CREATE TABLE lancamentos (

  id serial,
  data_cadastro text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYY-MM-DD'),
  data_lancamento TEXT,
  tipo_lacamento TEXT,
  hora INTEGER,
  minutos INTEGER,
  quantidade_prevista INTEGER,
  quantidade_realizada INTEGER,
  status TEXT

);



