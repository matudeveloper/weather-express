const express = require('express')
const app = express()
//const path = require('path')
const fetch = require('node-fetch')

const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join( __dirname, 'views'))

const key = '77f97b598769bf8861004c74e30ebbba';
let city = 'Tartu'

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(responce => {
                return responce.json()
            })
            .then((data) => {
                let description = data.weather[0].description
                let city = data.name
                let temp = Math.round(parseFloat(data.main.temp)-273.15)
                let result = {
                    description: description,
                    city: city,
                    temp: temp
                }
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

app.all('/', function (req, res){
    let city
    if(req.method == 'GET'){
        city = "Tartu"
    }
    if(req.method == 'POST'){
        city = req.body.cityname
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherDataPromise(url)
        .then(data => {
            res.render('index', data)
        })
})
/*
app.get('/', function (req, res){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            console.log(description)
            console.log(city)
            console.log(temp)

            res.render('index', {
                description: description,
                city: city,
                temp: temp
                })
            })
})

app.post('/', function (req, res){
console.log(req.body)
//res.redirect('/')

let city = req.body.cityname
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
.then((responce) => {
    return responce.json()
})
.then((data) => {
    let description = data.weather[0].description
    let city = data.name
    let temp = Math.round(parseFloat(data.main.temp)-273.15)
    res.render('index', {
        description: description,
        city: city,
        temp: temp
    })
})

})


 */
app.listen(3000)