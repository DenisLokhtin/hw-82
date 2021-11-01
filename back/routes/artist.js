const express = require('express');
const Artist = require('../models/Artist');

const router = express.Router();

router.get('/', async (req, res) => {
    const Artists = await Artist.find();
    res.send(Artists);
});

router.get('/:id', async (req, res) => {
    const [resources] = await mysqlDb.getConnection().query(
        `SELECT * FROM locations where id = ?`,
        [req.params.id]);
    res.send(resources[0]);
});


router.post('/', async (req, res) => {
    const body = {
        name: req.body.name,
        description: req.body.description,
    };

    const newResources = await mysqlDb.getConnection().query(
        'INSERT INTO locations (name, description) values (?, ?)',
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
        'UPDATE locations SET ? WHERE id = ?',
        [{...body}, req.params.id]);

    res.send({
        ...body
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const [resources] = await mysqlDb.getConnection().query(
            `DELETE FROM locations where id = ?`,
            [req.params.id]);
        res.status(204);
    } catch (e) {
        res.status(400).send({"message": e.sqlMessage});
    }
});

module.exports = router;