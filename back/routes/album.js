const express = require('express');
const Album = require('../models/Album');

const router = express.Router();

const upload = require('./routesConfig');

router.get('/', async (req, res) => {
    const [resources] = await mysqlDb.getConnection().query(
        'SELECT id, locations_id, categories_id, name FROM items',
        [req.params.name]);
    res.send(resources);
});

router.get('/:id', async (req, res) => {
    const [resources] = await mysqlDb.getConnection().query(
            `SELECT * FROM items where id = ?`,
        [req.params.id]);
    res.send(resources[0]);
});

router.post('/', upload.single('file'), async (req, res) => {
    const body = {
        name: req.body.name,
        description: req.body.description,
        locations_id: parseInt(req.body.locations_id),
        categories_id: parseInt(req.body.categories_id),
    };

    if (req.file) {
        body.file = req.file.filename;
    }

    console.log(req.file);

    const newResources = await mysqlDb.getConnection().query(
        'INSERT INTO items (locations_id, categories_id, name, description, image) values (?, ?, ?, ?, ?)',
        [body.locations_id, body.categories_id, body.name, body.description, body.file]);

    res.send({
        ...body,
        id: newResources[0].insertId
    })
});

router.put('/:id', upload.single('file'), async (req, res) => {
    const body = {
        name: req.body.name,
        description: req.body.description,
        locations_id: req.body.locations_id,
        categories_id: req.body.categories_id,
    };

    if (req.file) {
        body.image = req.file.filename;
    }

    res.send({
        ...body
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const [resources] = await mysqlDb.getConnection().query(
                `DELETE FROM items where id = ?`,
            [req.params.id]);
        res.status(204);
    } catch (e) {
        res.status(400).send({"message": e.sqlMessage});
    }
});

module.exports = router;