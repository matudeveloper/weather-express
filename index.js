const express = require('express')
const app = express()

const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join( __dirname, 'views'))

app.get('/', function(reg, res){
    //res.send('Hello World')
    res.render('index')
})

app.listen(3000)