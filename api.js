let express = require('express')
let mongoose = require('mongoose')
const mma = require('./mma')



// create express app
let app = express()

// configure express app to encode/decode 
// JSON 
app.use(express.json())

// connect to mongodb databasemongodb+srv://fadhilismail1341:<password>@airasia.uq749af.mongodb.net/
let dbstring ="mongodb+srv://fadhilismail1341:Password131313@airasia.uq749af.mongodb.net/youtube"
mongoose.connect(dbstring)
let db = mongoose.connection

// check if connection to db is success
db.on('open', ()=>{
    console.log("Connected to mongodb database in the cloud!");
})

// get the list of youtube video
// GET http://localhost:1234/1.0/youtube/all
app.get("/1.0/youtube/all", (request, response)=>{
    mma.find({})
            .then((data)=>{
                console.log("query success for /1.0/youtube/all")
                response.json(data)

            }) 
            .catch((error)=>{
                console.log("error for /1.0/youtube/all")
                response.json(error)

            })
})





// Get http://localhost:1234/
app.get("/", (request, response)=>{
    console.log("GET request received for / endpoint");
    response.send("Hello from express API, GET")
})

// Get http://localhost:1234/welcome
app.get("/welcome", (request, response)=>{
    console.log("GET request received for / endpoint");
    response.send("Hello from express API, GET")
})

//POST http://localhost:1234/welcome
app.post("/welcome", (request, response)=>{
    console.log("POST request received for / endpoint");
    response.send("Hello from express API, POST")
})

app.listen(1234, ()=>{
    console.log("Listening on port 1234")
})
