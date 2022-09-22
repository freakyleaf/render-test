import express from 'express';
import Tag from '../../models/Tag.js';

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
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
            const attribute = await Tag.findOne({
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
            const attribute = await Tag.findById(req.params.item);
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
    const tag = new Tag({
        attributes: req.body.attributes,
        contentPatterns: req.body.contentPatterns,
        description: req.body.description,
        name: req.body.name,
        notes: req.body.notes,
        notesOpinionated: req.body.notesOpinionated,
        references: req.body.references,
        type: req.body.type,
    });

    try {
        const savedTag = await tag.save();
        res.json(savedTag);
        res.status(201);
    } catch (error) {
        res.json(error);
        res.status(400);
    }
});

// Remove
router.delete('/:id', async (req, res) => {
    try {
        const deletedTag = await Tag.deleteOne({
            _id: req.params.id,
        });
        res.json(deletedTag);
        res.status(200);
    } catch (error) {
        res.send(error);
        res.status(400);
    }
});

// Update
router.patch('/:_id', async (req, res) => {
    try {
        const updatedTag = await Tag.updateOne(
            {
                _id: req.params._id,
            },
            {
                $set: {
                    attributes: req.body.attributes,
                    contentPatterns: req.body.contentPatterns,
                    dateUpdated: new Date(),
                    description: req.body.description,
                    name: req.body.name,
                    notes: req.body.notes,
                    notesOpinionated: req.body.notesOpinionated,
                    references: req.body.references,
                    type: req.body.type,
                },
            }
        );
        res.json(updatedTag);
        res.status(200);
    } catch (error) {
        res.json(error);
        res.status(400);
    }
});

export default router;
