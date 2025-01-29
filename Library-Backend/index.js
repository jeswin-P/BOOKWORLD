var express = require('express')
var app = express()
var route= require("./Router")
var db_connect = require("./DB_connection")
var parser = require("body-parser")
app.use(parser.json())
var cors = require("cors")
app.use(cors())
app.use(express.static(`${__dirname}/upload`))


app.use("/",route)
var route=app.listen(4060,()=>{
    console.log("Connection Created")
})