require('dotenv').config()

const express=require("express")
const core= require("cors")
const router=require("./Router/router")
require("./DB/connection")


const THServer=express()

THServer.use(core())
THServer.use(express.json())
THServer.use(router)

THServer.use('/uploads',express.static('./uploads'))
THServer.use('/resume',express.static('./resume'))
THServer.use('/companyLogos',express.static('./companyLogos'))



const PORT=3000 || process.env.PORT

//run server to client request listen
THServer.listen(PORT,()=>{
    console.log(`Project Fair Server Started at ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})

THServer.get("/",(req,res)=>{
    res.status(200).send(`<h1>Server Started</h1>`)
})