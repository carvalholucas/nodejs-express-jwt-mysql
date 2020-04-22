const express = require('express')
const router = express.Router()
const login = require('../middleware/login')

const ProductsControllers = require('../controllers/products-controller')

router.get('/', ProductsControllers.getAllProducts)

router.get('/:id', ProductsControllers.getProductById)

router.post('/', login, ProductsControllers.addProduct)

router.patch('/:id', login, ProductsControllers.editProduct)

router.delete('/:id', login, ProductsControllers.deleteProduct)

module.exports = router