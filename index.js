const express = require('express')
const app = express()

app.use(express.json()) 
app.use(verification)

let beers = [
    {
        id: 'abc123',
        marca: 'corona',
        tipo: 'pilsner',
        precio: 30
    },
    {
        id: 'abc124',
        marca: 'Heineken',
        tipo: 'lager',
        precio: 22
    },
    {
        id: 'abc125',
        marca: 'Bohemia',
        tipo: 'viena',
        precio: 25
    },
    {
        id: 'abc126',
        marca: 'Paulaner',
        tipo: 'lager',
        precio: 50
    }
]


app.get('/beers',(req,res)=>{
    res.json({
        success:true,
        data: {
            beers
        }
    })
})

app.get("/beers/:id",(req,res)=>{
    let beer = beers.find((beer)=>{
        return beer.id === req.params.id
    })
    res.json({
        success:true,
        data:{
            beer
        }
    })
})

app.post("/beers",(req,res)=>{
    beers.push(req.body)
    res.json({
        success:true,
        data:{
             beer: req.body
        }
    })
})

app.patch("/beers/:id",(req,res)=>{
    beers.forEach(koder =>{
        if(koder.id === req.params.id){
            koder.precio = 100
        }
    })
    res.json({
        success:true,
        message: 'The beer was updated',
        data:{
            beers
        }
    })
})

// app.put("/beers/:id",(req,res)=>{
//     let beer = beers.find((beer)=>{
//         return beer.id === req.params.id
//     })
//     console.log(beer.id)
//     beers.splice(parseInt(beer.id) - 1,1,req.body)
//     res.json({
//         success:true,
//         data:{
//             beer: req.body
//         }
//     })
// })

app.delete("/beers/:id",(req,res)=>{
    let deletedBeer = beers.find((beer)=>{
        return beer.id === req.params.id
    })
    let newBeers = beers.filter(beer =>{
        return beer.id !== deletedBeer.id
    })

    res.json({
        success:true,
        data:{
            newBeers
        }
    })
})

function verification(req,res,next){
    console.log(req.method + ": " + req.url)
    next()
}


app.listen(8080,()=>{
    console.log("Port 8080")
})