let express= require("express")
let path=require('path')
let {Router}= express
const app =express()
const router1= new Router()
const hbs= require('express-handlebars')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT=8000
let Contenedor=require('./components/contenedor/contenedor')
let contenedor= new Contenedor('./components/products/productos.txt')


router1.get("/",async (req,res, next)=>{
    res.render('index',{productos: await contenedor.getAll()})
})

router1.post("/",async (req,res, next)=>{
    await contenedor.save(req.body.producto)
    res.render('index',{productos: await contenedor.getAll()})
})

app.engine('handlebars',hbs.engine())
app.set('views','./views/hbs')
app.set('view engine','handlebars')


app.use('/productos',router1)
app.use('/',express.static(path.join(__dirname,'public')))



app.listen(PORT,()=>{
    console.log(`Mi servidor escuchando desde http://localhost:${PORT}`)
})