const express = require('express')
const mongoose = require('mongoose')
const PORT = 5000



// ---initial express
const app = express()

// importing routes
const foodRoute = require('./routes/food')
const ingRoute = require('./routes/ing')

// Use food Routes
app.use(foodRoute)
// Use Ingredient Routes
app.use(ingRoute)

// look for static files here (CSS, JS, Image, Video, audio)
app.use(express.static('public'))

/* will tell nodejs to look in a folder
   called views for all ejs files */
app.set('view engine', 'ejs') 

// ---mongodb connection
mongoose.connect('mongodb://localhost/food',
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('mongodb connected!')
    }
)

app.listen(PORT, () => console.log(`listening to port ${PORT}`))