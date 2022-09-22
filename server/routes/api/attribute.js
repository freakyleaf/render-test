import express from 'express';
import Attribute from '../../models/Attribute.js';

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
    try {
        const attributes = await Attribute.find();
        res.json(attributes);
        res.status(200);
    } catch (error) {
        res.json(error);
        res.status(400);
    }
});

// Get one
router.get('/:item', async (req, res) => {
    const queryType = req.query.type;

    if (queryType === 'name') {
        try {
            const attribute = await Attribute.findOne({
                name: req.params.item,
            });
            res.json(attribute);
            res.status(200);
        } catch (error) {
            res.json(error);
            res.status(400);
        }
    }

    if (queryType === 'id') {
        try {
            const attribute = await Attribute.findById(req.params.item);
            res.json(attribute);
            res.status(200);
        } catch (error) {
            res.json(error);
            res.status(400);
        }
    }
});

// Add
router.post('/', async (req, res) => {
    const attribute = new Attribute({
        contentPatterns: req.body.contentPatterns,
        description: req.body.description,
        name: req.body.name,
        notes: req.body.notes,
        notesOpinionated: req.body.notesOpinionated,
        references: req.body.references,
        since: req.body.since,
        subtypes: req.body.subtypes,
        type: req.body.type,
        typeAlsoGlobal: req.body.typeAlsoGlobal,
        valueTypes: req.body.valueTypes,
        valueValues: req.body.valueValues,
    });

    try {
        const savedAttribute = await attribute.save();
        res.json(savedAttribute);
        res.status(201);
    } catch (error) {
        res.json(error);
        res.status(400);
    }
});

// Remove
router.delete('/:_id', async (req, res) => {
    try {
        const deletedAttribute = await Attribute.deleteOne({
            _id: req.params._id,
        });
        res.json(deletedAttribute);
        res.status(200);
    } catch (error) {
        res.send(error);
        res.status(400);
    }
});

// Update
router.patch('/:_id', async (req, res) => {
    try {
        const updatedAttribute = await Attribute.updateOne(
            {
                _id: req.params._id,
            },
            {
                $set: {
                    contentPatterns: req.body.contentPatterns,
                    dateUpdated: new Date(),
                    description: req.body.description,
                    name: req.body.name,
                    notes: req.body.notes,
                    notesOpinionated: req.body.notesOpinionated,
                    references: req.body.references,
                    since: req.body.since,
                    subtypes: req.body.subtypes,
                    type: req.body.type,
                    typeAlsoGlobal: req.body.typeAlsoGlobal,
                    valueTypes: req.body.valueTypes,
                    valueValues: req.body.valueValues,
                },
            }
        );
        res.json(updatedAttribute);
        res.status(200);
    } catch (error) {
        res.json(error);
        res.status(400);
    }
});

export default router;
