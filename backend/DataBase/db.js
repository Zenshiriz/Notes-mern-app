
const mongoose = require("mongoose")

const connectDB = async(url)=>{
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connect to database successfully")
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB