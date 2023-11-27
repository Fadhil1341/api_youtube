let express = require('express')
let mongoose = require('mongoose')
const mma = require('./mma')
let cors = require('cors')



// create express app
let app = express()

// configure express app to encode/decode 
// JSON 
app.use(express.json())
// consfigure cors to allow ALL/selected incoming request
app.use(cors())

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

// add new video document to the database
// POST http://localhost:1234/1.0/youtube/add
app.post("/1.0/youtube/add", (request, response)=>{
    console.log("POST request for //1.0/youtube/add")
    console.log(request.body)
    console.log(request.body.title)
    console.log(request.body.vid)
    console.log(request.body.likes)
    console.log(request.body.dislikes)

    // create instance of model -> mma.js
    let mmaNew = new mma ({
        title:request.body.title,
        vid:request.body.vid,
        likes:request.body.likes,
        dislikes:request.body.dislikes

    })
    // save the model instance in database
    mmaNew.save()
            .then((data)=>{
                response.send({
                    "status":"success",
                    "saved":data
                })
            })
            .catch((error)=>{
                response.send(error)
            })


} )



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
