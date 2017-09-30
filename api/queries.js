const getConnection = require("../config/postgres");
const promise = require("bluebird");
const options = {
  promiseLib: promise
};

const pgp = require("pg-promise")(options);
const db = pgp(getConnection());

const getAllLancamento = (req, res, next) => {
  db
    .any("SELECT * FROM lancamentos")
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

const Lancamento = (req, res, next) => {
  req.body.id = parseInt(req.body.id);
  db
    .none(
      "INSERT INTO lancamentos(data_lancamento, tipo_lancamento, hora, minutos, minutos, quantidade_realizada,status)" +
        "values(${data_lancamento}, ${tipo_lancamento}, ${hora}, ${minutos}, ${minutos}, ${quantidade_realizada}, ${status})",
      req.body
    )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Lancamento inserido"
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getAllLancamento: getAllLancamento,
  getLancamentoById: getLancamentoById,
  Lancamento: Lancamento
};
