
// to stor our article(that we have created) into database
const mongoose = require('mongoose')
// to create Markdown to HTML
const marked = require('marked')

// to write down and handle HTML code
const createDomPurify = require('dompurify')
const{JSDOM} = require('jsdom')
// creating our DOm purifier.,it allows us to create HTML code and purify it by using our new JSDOM()window object
// dompurify is to senitize our HTML
const dompurify = createDomPurify(new JSDOM().window)
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    markdown:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    sanitizedHtml: {
        type:String,
        required:true
    }        
})
// this pre validation function will run every time whether
// we creat, delete, update
articleSchema.pre('validate', function(next){
    if(this.markdown){
//  converting our markdown into a sanitized HTML
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
                   //and this^will purify html//  ^this will convert markdown into html                                // 
    }
    next()
})

module.exports = mongoose.model('Article',articleSchema)