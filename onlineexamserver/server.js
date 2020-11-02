const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors =require('cors');

//load config
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(
	PORT,
	console.log(`Server running ${process.env.NODE_ENV} mode on ${PORT}`)
);
app.post("/wordcount", (req, res) => {
	const {answer} = req.body;
	let wordsList = [], ignoreList=["the","a","an","and",
	"it","his","with","to",
	"of","is","was","","by","then","them","he","she"];
	let j = 0;
	for (let i = 0; i <= answer.length; i++) {
	 	if (answer.charAt(i) == " " 
	 		|| answer.charAt(i)=="." 
	 		|| answer.charAt(i)==","
	 		|| i==answer.length) {
	 		let word = answer.slice(j,i)
	 	if(ignoreList.find(item => item == word.toLowerCase())===undefined  )
	 		{	wordsList.push(word); }
	 		j=i+1;
	 	}
	 }
	return res.status(200).json(wordsList);
});
//logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
