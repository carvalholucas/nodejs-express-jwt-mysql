const express = require('express')
const router = express.Router()
const login = require('../middleware/login')

const RequestsController = require('../controllers/requests-controller')

router.get('/', RequestsController.getAllRequests)

router.get('/:id', RequestsController.getRequestById)

router.post('/', login, RequestsController.addRequest)

router.patch('/:id', login, RequestsController.editRequest)

router.delete('/:id', login, RequestsController.deleteRequest)

module.exports = router