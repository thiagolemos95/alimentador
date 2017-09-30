const express = require('express');
const router = express.Router();
const db = require('./queries');

router.get('/', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Vida longa e prospera!'
      });
});


router.get('/api/lancamentos', db.getAllLancamento);
router.get('/api/lancamento/:id', db.getLancamentoById);
router.post('/api/lancamento', db.Lancamento);

module.exports = router;
