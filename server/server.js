const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const distFolder = path.join(__dirname, '../public', 'dist')
const yargs = require('yargs')
const argv = yargs.option('port', {
    alias: 'p',
    description: 'Set the port to run this server on',
    type: 'number',
}).help().alias('help', 'h').argv
if(!argv.port) {
    console.log('Error, you need to pass the port you want to run this application on with npm start -- -p 8001')
    process.exit(0)
}
const port = argv.port

app.use(express.static(distFolder))
app.use(bodyParser.json())

app.use('*', (req, res, next) => {
	// Logger
	let time = new Date()
	console.log(`${req.method} to ${req.originalUrl} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
	next()
})

app.get('bundle.js', (req, res) => {
    res.sendFile(path.join(distFolder, 'bundle.js'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(distFolder, 'index.html'))
})

app.listen(port, '0.0.0.0', (req, res) => {
    console.log(`Server listening on localhost:${port}`)
})
