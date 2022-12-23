const express = require("express")
const fs = require('fs')

const app = express()

app.set("view engine", "ejs")
app.use( express.static('public') )
app.use( express.urlencoded( {extended: true } ))

let lines = []
let linesObjArr = []
let random = Math.floor(Math.random() * 30)
let newArray

const readFile = async (req, res, next) =>{
    const fileContent =  fs.readFileSync('insults.txt', {encoding: 'utf8'})
    lines = fileContent.split("\n")

    console.log("Alex was here")

    for(let line of lines){
            let lineObj = {}
            lineObj['insult'] = line
            lineObj['severity'] = random += 1

            linesObjArr.push(lineObj)
        //console.log("Objects are: " + lineObj.insult + " And severtity is " + lineObj.severity)
    }
        newArray = linesObjArr.filter(function(line) {
        return line.insult.length > 10})

    for(let el of newArray){
        console.log("New array is: " + el.insult + " Severity: " + el.severity)
    }
    
    next()
}

app.get("/insults", (req, res) => {
    res.render('insults')
})

app.post("/insults", (req, res) => {
    console.log(req.body)
    console.log("Req body insult is: " + req.body.insult)
    console.log("Req body severity is: " + req.body.severity)
    let data = "\n\n" + req.body.insult
    fs.appendFileSync('insults.txt', data)
    res.redirect("/")
})

app.get("/", readFile, (req, res) => {
    console.log("Successful?")
    const randomArrayIndex = Math.floor(Math.random() * newArray.length)
    console.log(newArray[randomArrayIndex])

    //The following line prints the insult
    res.send(newArray[randomArrayIndex])
})

app.get("/:severity", (req, res) => {
    console.log(req.params.severity)
    const insult = newArray.find((element) => element.severity == req.params.severity)
    console.log("Insult is: " + insult) //undefined
    res.send(insult)
    //res.send("Severity is: " + req.params.severity)
})



app.listen(8000, () => {
    console.log("App startad")
})