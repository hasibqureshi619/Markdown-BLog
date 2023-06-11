const express = require("express")
// importing or requiring our model after creating Schema  
// now we can use it to create new articles 
const Article = require('./../models/article')
const router = express.Router()

// work like app.get but through router
// it is in real- articles/new
// after creating an article using post request
router.get('/new',(req,res)=>{
// here we refer article as a new Artical(which is blank)
    res.render('articles/new',{article:new Article()})
})
// edit route
router.get('/edit/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article:article})
})

// creating rout for last lines, redirecting
// which is actually--articles/
router.get('/:id',async (req,res)=> {
    const article = await Article.findById(req.params.id)
//'/' is actually mean--articles/
    if(article==null) res.redirect('/')
    res.render('articles/show',{article:article})
})

router.post('/', async (req,res,next)=>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id',async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
// when submit the form action taken at'/'. which is actually--articles/
function saveArticleAndRedirect(path){
    return async(req,res)=>{
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.id}`)
        } catch (e){
            res.render(`articles/${path}`, {article:article})
        }
    }
}
module.exports = router