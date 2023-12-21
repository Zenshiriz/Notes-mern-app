require("dotenv").config()
const express = require("express")
const cors = require('cors')
const connectDB = require("./DataBase/db")
const app = express()
const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")
const { body } = require("express-validator")

app.use(cors())
app.use(express.json())
app.use("/api/auth",[body("email","enter valid email").isEmail(),body("password","min length must above 3 ").exists()],authRouter)
app.use("/api/notes",notesRouter)


const PORT = process.env.PORT || 5000
const start = async()=>{
    try { 
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>console.log(`port is listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}


start()
