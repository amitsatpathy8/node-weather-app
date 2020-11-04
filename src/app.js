const path = require('path')
const express = require('express')//expressjs.com
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forcast.js')

const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
//setup static directory to server ----- (that is the index kind of thing in PHP)
app.use(express.static(publicDirectoryPath))

// app.get('',(req,res) => {
//     res.send('<h1>Hello express!!!</h1>')
// }) 

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Amit Nabajyoti Satpathy'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        name: 'Amit Nabajyoti Satpathy',
        age: 21,
        title: 'Help',
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Amit Nabajyoti Satpathy',
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide a address'
        })  
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude, (error, forcastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forcast: forcastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide the search term'
        })   
    }
    console.log(req.query.search)
        res.send({
            products:[] 
        })
})

//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name : 'Amit Nabajyoti Satpathy',
        errorMessage: 'Help article is not found'
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Amit Nabajyoti Satpathy',
        errorMessage: 'Page not found'
    })
})
app.listen(port,() => {
    console.log('serveris up on port '+port)
})