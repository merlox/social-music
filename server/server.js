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

app.use(bodyParser.json())

app.use('*', (req, res, next) => {
	// Logger
	let time = new Date()
	console.log(`${req.method} to ${req.originalUrl} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
	next()
})

// Compression request to send the valid build files
app.get('build.js', (req, res) => {
	if (req.header('Accept-Encoding').includes('br')) {
		res.set('Content-Encoding', 'br')
		res.set('Content-Type', 'application/javascript; charset=UTF-8')
		res.sendFile(path.join(__dirname, 'dist', 'build.js.br'))
	} else if(req.header('Accept-Encoding').includes('gz')) {
		res.set('Content-Encoding', '.gz')
		res.set('Content-Type', 'application/javascript; charset=UTF-8')
		res.sendFile(path.join(__dirname, 'dist', 'build.js.gz'))
	}
})
app.use(express.static(distFolder))

app.get('bundle.js', (req, res) => {
    res.sendFile(path.join(distFolder, 'bundle.js'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(distFolder, 'index.html'))
})

app.listen(port, '0.0.0.0', (req, res) => {
    console.log(`Server listening on localhost:${port}`)
})
