const express = require("express")
const fs = require('fs/promises')
const {existsSync} = require('fs')
const { nextTick } = require("process")

const app = express()

app.set("view engine", "ejs")
app.use( express.urlencoded( {extended: true } ))

let lines = []
let linesObjArr = []
let random = Math.floor(Math.random() * 30)
let newArray

const readFile = async (req, res, next) =>{
    const fileContent = await fs.readFile('insults.txt', {encoding: 'utf8'})
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

app.get("/", readFile, (req, res) => {
    console.log("Successful?")
    const randomArrayIndex = Math.floor(Math.random() * newArray.length)
    console.log(newArray[randomArrayIndex])
})

app.get("/:severity", (req, res) => {
    console.log(req.params.severity)
    const insult = newArray.find((element) => element.severity == req.params.severity)
    console.log("Insult is: " + insult.insult)
    res.send(insult.insult)
    //res.send("Severity is: " + req.params.severity)
})

app.listen(8000, () => {
    console.log("App startad")
})