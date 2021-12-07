let express= require("express")
let path=require('path')
let {Router}= express
const app =express()
const router1= new Router()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT=8080
let Contenedor=require('./components/contenedor/contenedor')
let contenedor= new Contenedor('./components/products/productos.txt')

router1.get('/', async(req,res)=>{
    res.render('ejs/index',{productos:await contenedor.getAll() })
})


router1.post("/",async (req,res, next)=>{
    await contenedor.save(req.body.producto)
    res.render('ejs/index',{productos: await contenedor.getAll()})
})

app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')

app.get('/about', function(req,res){
    res.render('ejs/about')
})


app.use('/productos',router1)
app.use('/',express.static(path.join(__dirname,'public')))


app.listen(PORT,()=>{
    console.log(`Mi servidor escuchando desde http://localhost:${PORT}`)
})