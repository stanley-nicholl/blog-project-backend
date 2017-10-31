const ctlr = require('../controller/controller')
const express = require('express')
const router = express.Router()


router.get('/', ctlr.getAll)
router.get('/:id', ctlr.getOne)
router.post('/', ctlr.create)
router.put('/:id', ctlr.update)
router.delete('/:id', ctlr.destroy)


module.exports = router
