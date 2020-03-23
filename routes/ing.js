const express = require('express')
const methodOverride = require('method-override')
const formidable = require('formidable')
const fs = require('fs')

const router = express.Router()

// models
const Ing = require('../models/Ingredient')

// override with POST having ?_method=DELETE
router.use(methodOverride('_method'))
// gets form data
router.use(express.urlencoded({ extended: true }))

// GET - retrieve data
// POST - send data
// PUT/PATCH - update
// DELETE - removes

router.get('/ingredient', (req, res) => {
    Ing.find()
    .then(ing => {
        /* {ing: ing} || {ing}  
        if and only if they have the same name */
        res.render('ing/index', {ing})
    })
    .catch(err => {
        console.log(err)
    })
})

// create ingredient  route
router.get('/ingredient/create', (req, res) => {
        res.render('ing/create')
})

router.post('/ingredient/create', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        let oldPath = files.ingImage.path
        // display image in food/index.ejs file
        let imagePath =`/images/ingredients/${files.ingImage.name}`
        let uploadPath = `./public/images/ingredients/${files.ingImage.name}`

        fs.rename(oldPath, uploadPath, err => {
            if(err) throw err
                fields.ingImage = imagePath
                let ing = new Ing(fields)
                ing.save()
                .then(() => {
                    res.redirect('/ingredient')
                })
                .catch( err => {
                    console.log(err)
                    res.send('There is an error, check your terminal')
                })
        })
    })
})

router.delete('/ingredient/:id/delete', (req, res) => {
    Ing.findByIdAndDelete(req.params.id).then(ing => {
        res.redirect('/ingredient')
    })
})

module.exports = router