const express = require('express')
const methodOverride = require('method-override')

const router = express.Router()

// models
const Food = require('../models/Food')
const Ing = require('../models/Ingredient')


// override with POST having ?_method=DELETE
router.use(methodOverride('_method'))

// gets form data
router.use(express.urlencoded({ extended: true }))

// GET - retrieve data
// POST - send data
// PUT/PATCH - update
// DELETE - removes

router.get('/food', (req, res) => {
    
    Food.find().populate('ingredient')
    .then(food => {
        /* {food: food} || {food} 
        if and only if they have the same name */
        res.render('food/index', {food})
        
    })
    .catch(err => {
        console.log(err)
    })
})

// create food route
router.get('/food/create', (req, res) => {
    Ing.find().populate('ingredient')
    .then(ing => {
        res.render('food/create', {ing})
    })
})

router.post('/food/create', (req, res) => {
    let food = new Food(req.body)
    // save food
    food
        .save()
        .then(() => {
        res.redirect('/food')
        })
        .catch( err => {
            console.log(err)
            res.send('Error!!!!!!')
        })
})
router.delete('/food/:id/delete', (req, res) => {
    Food.findByIdAndDelete(req.params.id).then(food => {
        res.redirect('/food')
    })
})

module.exports = router