const express = require('express');
const router = express.Router();
const Item = require('../models/Items');
// Create a new item
router.post('/add', (req, res) => {
const newItem = new Item({
name: req.body.name,
description: req.body.description
});
newItem.save().then(item => res.json(item)).catch(err =>
res.status(400).json('Error: ' + err));
});
// Get all items
router.get('/', (req, res) => {
Item.find().then(items => res.json(items)).catch(err =>
res.status(400).json('Error: ' + err));
});
// Update an item
router.put('/update/:id', (req, res) => {
Item.findById(req.params.id).then(item => {
item.name = req.body.name;
item.description = req.body.description;
item.save().then(() => res.json('Itemupdated!')).catch(err => res.status(400).json('Error: ' + err));
}).catch(err => res.status(400).json('Error: ' + err));
});
// Delete an item
router.delete('/:id', (req, res) => {
Item.findByIdAndDelete(req.params.id).then(() =>
res.json('Item deleted.')).catch(err =>
res.status(400).json('Error: ' + err));
});
module.exports = router;
