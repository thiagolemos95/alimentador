const getConnection = require("../config/postgres");
const promise = require("bluebird");
const jsonexport = require("jsonexport");
const options = {
  promiseLib: promise
};

const pgp = require("pg-promise")(options);
const db = pgp(getConnection());

const getAllLancamento = (req, res, next) => {
  db
    .any("SELECT * FROM lancamentos order by id")
    .then(function(data) {
      res.status(200).json({
        data: data
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

const getLancamentoById = (req, res, next) => {
  var id = parseInt(req.params.id);
  db
    .one("SELECT * FROM lancamentos WHERE id = $1", id)
    .then(function(data) {
      res.status(200).json({
        data: data
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

const getLancamentoByStatus = (req, res, next) => {
  let format = req.query.format || "json";
  let limit = parseInt(req.query.limit) || 1;
  db
    .any(
      "SELECT id , quantidade_prevista FROM lancamentos WHERE status = $1 LIMIT $2",
      [req.params.status, limit]
    )
    .then(function(data) {
      if (format === "json") {
        res.status(200).json({
          data: data
        });
      } else if (format === "csv") {
        let options = { includeHeaders: false };
        jsonexport(data, options, (err, csv) => {
          if (err) {
            next(err);
          } else {
            res.setHeader("Content-type", "text/plain");
            res.status(200).send(csv);
          }
        });
      }
    })
    .catch(function(err) {
      return next(err);
    });
};

const Lancamento = (req, res, next) => {
  let f;
  if (req.headers["content-type"] === "application/json") {
    f = [
      req.body.data_lancamento,
      req.body.tipo_lancamento,
      parseInt(req.body.hora),
      parseInt(req.body.minutos),
      parseInt(req.body.quantidade_prevista),
      parseInt(req.body.quantidade_realizada),
      req.body.status
    ];
  } else {
    f = [
      req.query.data_lancamento,
      req.query.tipo_lancamento,
      parseInt(req.query.hora),
      parseInt(req.query.minutos),
      parseInt(req.query.quantidade_prevista),
      parseInt(req.query.quantidade_realizada),
      req.query.status
    ];
  }
  db
    .none(
      "INSERT INTO lancamentos(data_lancamento, tipo_lancamento, hora, minutos,quantidade_prevista,quantidade_realizada,status) VALUES($1, $2, $3, $4, $5, $6, $7)",
      f
    )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Lancamento inserido"
      });
    })
    .catch(err => {
      console.log(err);
      return next(err.error);
    });
};

const updateLancamento = (req, res, next) => {
  const id = parseInt(req.params.id);
  db
    .none(
      "update lancamentos set quantidade_realizada=$2,status=$3 where id=$1",
      [id, parseInt(req.query.quantidade_realizada), req.query.status]
    )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "lancamento atualizado"
      });
    })
    .catch(err => {
      console.log(err);
      return next(err.error);
    });
};

module.exports = {
  getAllLancamento: getAllLancamento,
  getLancamentoById: getLancamentoById,
  Lancamento: Lancamento,
  updateLancamento: updateLancamento,
  getLancamentoByStatus: getLancamentoByStatus
};
