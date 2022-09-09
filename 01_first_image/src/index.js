const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    return res.json({
        hello: 'World'
    })
})

app.listen(port, () => {
    console.log(`Running in: http://localhost:${port}`)
})