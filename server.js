const express= require("express")
// AT LAST to store our newly created articles into DB named as blog
const mongoose=require('mongoose')
// will use it into get rquest to fetch Articles attributes 
const Article = require('./models/article')
// to delete
const methodOverride = require('method-override')

// <A> our article router is getting access in server.js through following line of code 
const articleRouter = require("./routes/articles")

const app=express()
mongoose.connect('mongodb://127.0.0.1:27017/blog')
// const port=5000
const path=require("path")

app.set("views",path.join(__dirname,"views"))

// app.use(express.static(path.join(__dirname,"public")))

// this ejs view engine will convert our ejs into HTML.
app.set("view engine","ejs")

//telling express, how to access all perameters(options), inside our post methode, to create a new Article form 
app.use(express.urlencoded({extended:false}))
// _methode will allow to call delete route
app.use(methodOverride('_method'))

app.get("/",async (req,res)=>{
    const articles = await Article.find().sort({createDate:'desc'})
    res.render("articles/index",{articles:articles})
})
// <B> now using our router...... using /article because we want url like that. 
app.use("/articles",articleRouter)

app.listen(7000,()=> console.log("server listening"))