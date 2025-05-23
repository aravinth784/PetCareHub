const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const pet = await Pet.create({ ...req.body, owner: req.user.id });
        res.json(pet);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;