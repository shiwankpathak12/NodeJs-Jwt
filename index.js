const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()

const port=process.env.port||6500

app.get('/',(req,res)=>{
    res.json({
        msg:"All things working fine"
    })
})

app.post('/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json(
                {msg:"post created",
                data
            })
            
            
        }
    })

    
})

app.post('/login',(req,res)=>{
    const user={
        id:1,
        username:"shiwank",
        email:"shiwank@gmail.com"
    }
    jwt.sign({user:user},'secretkey',(err,token)=>{
        res.json({token:token})
    })
})
//Authorization: bearer <access-token>
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization']
    if(typeof bearerHeader!=='undefined')
    {
        const bearer=bearerHeader.split(' ')
        const bearerToken=bearer[1]
        req.token=bearerToken
        next()
    }
    else{
        res.sendStautus(403)
    }
    
}

app.listen(port,()=>{console.log(`server is listeing at port ${port}`)})
