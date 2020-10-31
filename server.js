const express = require('express')
const app = express()
const port = 3000

// app.get('/', (request, response) => {
//     response.send('Hello from Express!')
// })

//middleware 1
// app.use((request, response, next) => {
//     console.log("use 1 **********************************************")
//     console.log(request.headers)
//
//     next()
// })

////middleware 2
// app.use((request, response, next) => {
//     request.chance = Math.random()
//     console.log("use 2 **********************************************")
//     console.log(request)
//     next()
// })

app.use((request, response, next) => {
  console.log("url: " + request.url);
  next();

})

app.get('/', (request, response) => {

    //console.log("get **********************************************")
    //let chance = Math.random()

    // response.json({
    //     //chance: request.chance
    //     //chance
    //
    // })
    //throw new Error('oops')

    response.status(200)
    response.sendFile(__dirname + '/views/index.html')


})

app.get('/client.js', (request, response) => {
    response.sendFile(__dirname + '/client.js')
})
app.get('/css/index.css', (request, response) => {
    response.sendFile(__dirname + '/views/css/index.css')
})
app.get('/css/tiles.css', (request, response) => {
    response.sendFile(__dirname + '/views/css/tiles.css')
})
app.get('/css/menu.css', (request, response) => {
    response.sendFile(__dirname + '/views/css/menu.css')
})
app.get('/images/settings32.png', (request, response) => {
    response.sendFile(__dirname + '/images/settings32.png')
})


app.get('/rn', (request, response) => {
    let chance = Math.random()
    //response.chance = chance.toString()
    //response.end({chance})
    //response.json({chance});
    response.end(chance.toString())
})

//middleware for processing errors
app.use((err, request, response, next) => {
    // логирование ошибки, пока просто console.log
    console.log(err)
    response.status(500).send('Something broke!')
})


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})