const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: String,
    timeToPrepare: Number,
    image: String,
    ingredient:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ing'
    }]
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food