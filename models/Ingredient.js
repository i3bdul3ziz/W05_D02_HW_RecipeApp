const mongoose = require('mongoose')

const ingSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    ingImage: String,
    food: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }]
})

const Ing = mongoose.model('Ing', ingSchema)

module.exports = Ing