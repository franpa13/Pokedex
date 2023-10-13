const express = require("express")
const app = express()
const path = require("path")


//LLAMADO A LAS RUTAS
const indexRouter = require("./src/routes/indexRouter.js")

// view engine setup
app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, './public')));


app.use("/", indexRouter)





//CORRIENDO EL SERVIDOR 
const puerto = 3000
app.listen(puerto ,()=>{
    console.log("server runing on port "+ puerto);
})