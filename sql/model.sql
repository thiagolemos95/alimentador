set timezone="America/Sao_Paulo"


CREATE TABLE lancamentos (

  id serial,
  data_cadastro text NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYY-MM-DD HH:MI:SS'),
  data_lancamento TEXT,
  tipo_lacamento TEXT,
  hora INTEGER,
  minutos INTEGER,
  quantidade_prevista INTEGER,
  quantidade_realizada INTEGER,
  status TEXT

);




