const express = require('express')
const { default: mongoose } = require('mongoose')
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app = express()
const router = require("./routes/routes")
const cronSchedule = require('./cron_scheduling/cron');

//cron job
cronSchedule.startCronJob();

app.use(cookieParser())
app.use(express.json())

app.use("/",express.static("./public/adminControl"))
app.use("/assets",express.static("./assets/"))

app.use("/adminControl", express.static("./public/adminOptions/"))

app.use("/members",express.static("./public/members/"))
app.use("/members/addMember",express.static('./public/addMember/'))

app.use('/projects',express.static("./public/projects/"))
app.use('/projects/addProject',express.static("./public/addProject/"))

app.use('/achievements',express.static("./public/achievements/"))
app.use('/achievements/addAchievement', express.static("./public/addAchievement/"))

app.use("/images",express.static("./images/"))
app.use("/api", router)

app.listen(5000,async()=>{
    await mongoose.connect(process.env.MONGO_URI)    
    console.log('Server connected at 5000....')
})