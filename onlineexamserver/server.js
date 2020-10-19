const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

//load config
dotenv.config({ path: './config/config.env'})

const app = express()
const PORT = process.env.PORT || 3001
app.listen(
	PORT, 
	console.log(`Server running ${process.env.NODE_ENV} mode on ${PORT}`)
) 

//logging
if(process.env.NODE_ENV === 'development')
{
	app.use(morgan('dev'))
}