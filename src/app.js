const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harsh Rawat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harsh Rawat'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'For any help please contact Harsh Rawat @ harsh@xyz.com',
        name: 'Harsh Rawat'
    })

})

//for weather-app
app.get('/weather', (req, res) => {
    if(!req.query.addr){
        return res.send({
             error: 'Provide an Address'
         })
     }
     geocode(req.query.addr, (error, {longitude, latitude, place} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, {temprature, summary, precipProbability} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                place,
                temprature,
                precipProbability,
                summary
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'Provide a Search Term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*' , (req, res) =>{
    res.render('error', {
        title: '404 Error',
        message: 'Article Not Found',
        name: 'Harsh Rawat'
    })
}) 

app.get('*' , (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Page not Found',
        name: 'Harsh Rawat'
    })
})

app.listen(port, () => {
    console.log('server up on port ' + port)
})


    