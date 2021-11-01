const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    const [resources] = await mysqlDb.getConnection().query(
        'SELECT id, name FROM categories');
    res.send(resources);
});

router.get('/:id', async (req, res) => {
    const [resources] = await mysqlDb.getConnection().query(
        `SELECT * FROM categories where id = ?`,
        [req.params.id]);
    res.send(resources[0]);
});

router.post('/', async (req, res) => {
    const body = {
        name: req.body.name,
        description: req.body.description,
    };

    const newResources = await mysqlDb.getConnection().query(
        'INSERT INTO categories (name, description) values (?, ?)',
        [body.name, body.description]);

    res.send({
        ...body,
        id: newResources.insertId
    });
});

router.put('/:id', async (req, res) => {
    const body = {
        name: req.body.name,
        description: req.body.description,
    };

    const updateResources = await mysqlDb.getConnection().query(
        'UPDATE categories SET ? WHERE id = ?',
        [{...body}, req.params.id]);

    res.send({
        ...body
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const [resources] = await mysqlDb.getConnection().query(
            `DELETE FROM categories where id = ?`,
            [req.params.id]);
        res.status(204);
    } catch (e) {
        res.status(400).send({"message": e.sqlMessage});
    }
});

module.exports = router;