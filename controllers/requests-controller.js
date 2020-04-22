const mysql = require('../mysql')

exports.getAllRequests = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        const query = 'SELECT * FROM pedidos INNER JOIN produtos ON produtos.id_produto = pedidos.id_produto'

        conn.query(query, (error, result, fields) => {
            conn.release()

            if (error) return res.status(500).send({ error: error })

            res.status(200).send({ data: result })
        })
    })
}

exports.getRequestById = (req, res, next) => {
    const id = req.params.id

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM pedidos INNER JOIN produtos ON produtos.id_produto = pedidos.id_produto WHERE id_pedido = ?',
            [id],
            (error, result, fields) => {
                conn.release()

                if (error) return res.status(500).send({ error: error })

                res.status(200).send({ data: result })
            })
    })
}

exports.addRequest = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO pedidos (id_produto, quantidade) VALUES (?, ?)',
            [req.body.id_produto, req.body.quantidade],
            (error, result, fields) => {
                conn.release()

                if (error) return res.status(500).send({ error: error })

                res.status(201).send({
                    message: 'Pedido inserido com sucesso',
                    id: result.insertId
                })
            })
    })
}

exports.editRequest = (req, res, next) => {
    const id = req.params.id

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'UPDATE pedidos SET id_produto = ?, quantidade = ? WHERE id_pedido = ?',
            [req.body.id_produto, req.body.quantidade, id],
            (error, result, fields) => {
                conn.release()

                if (error) return res.status(500).send({ error: error })

                res.status(202).send({ message: 'Pedido alterado com sucesso' })
            }
        )
    })
}

exports.deleteRequest = (req, res, next) => {
    const id = req.params.id

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'DELETE FROM pedidos WHERE id_pedido = ?', [id], (error, result, fields) => {
                conn.release()

                if (error) return res.status(500).send({ error: error })

                res.status(202).send({ message: 'Pedido removido com sucesso' })
            }
        )
    })
}