var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Animal = sequelize.import('../models/animal');

router.post('/', (req, res) => {
    const animalFromRequest = {
        name: req.body.name,
        legNumber: req.body.legNumber,
        predator: req.body.predator,
    }
    Animal.create(animalFromRequest)
    .then(animal => res.status(200).json(animal))
    .catch(err => res.json(req.errors));
})

router.delete('/:name', (req, res) => {
    Animal.destroy({
        where: {
            name: req.params.name
        }
    })
    .then(animal => res.status(200).json(animal))
    .catch(err => res.json({
        error: err
    }))
})

router.put('/:id', (req, res) => {
    Animal.update(req.body, { where: { id: req.params.id }})
      .then(animal => res.status(200).json(animal))
      .catch(err => res.json({
          error :err 
  }))
})

router.get('/', (req, res) => {
    Animal.findAll()
        .then(animal => res.status(200).json(animal))
        .catch(err => res.status(500).json({
            error: err
        }))
})


module.exports = router;