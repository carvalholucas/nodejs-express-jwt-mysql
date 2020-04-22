const mysql = require('../mysql')

exports.getAllProducts = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query('SELECT * FROM produtos', (error, result, fields) => {
            conn.release()

            if (error) return res.status(500).send({ error: error })

            res.status(200).send({ data: result })
        }
        )
    })
}

exports.getProductById = (req, res, next) => {
    const id = req.params.id

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query('SELECT * FROM produtos WHERE id_produto = ?', [id], (error, result, fields) => {
            conn.release()

            if (error) return res.status(500).send({ error: error })

            res.status(200).send({ data: result })
        })
    })
}

exports.addProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [req.body.nome, req.body.preco], (error, result, fields) => {
            conn.release()

            if (error) return res.status(500).send({ error: error })

            res.status(201).send({
                message: 'Produto inserido com sucesso',
                id: result.insertId
            })
        })
    })
}

exports.editProduct = (req, res, next) => {
    const id = req.params.id

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, id],
            (error, result, fields) => {
                conn.release()

                if (error) return res.status(500).send({ error: error })

                res.status(202).send({ message: 'Produto alterado com sucesso' })
            }
        )
    })
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?', [id], (error, result, fields) => {
                conn.release()

                if (error) return res.status(500).send({ error: error })

                res.status(202).send({ message: 'Produto removido com sucesso' })
            }
        )
    })
}