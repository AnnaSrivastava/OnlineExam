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
let keywordsList = [];
app.listen(
	PORT,
	console.log(`Server running ${process.env.NODE_ENV} mode on ${PORT}`)
);
app.post("/keywordsList", (req, res) => {
	const {data} = req.body;
	keywordsList = data;
	console.log(keywordsList);
	return res.status(200).json("All OK");
})
app.post("/studentAnswer", (req, res) => {
	const {answer} = req.body;
	let wordsList = [], ignoreList=["the","a","an","and","it","his","with","to","of","is","was","","by","then","them","he","she","may"];
	let score=0;
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
	 
	 let count=0;
	 score=0;
	 let maxScore=10;

     for(let i = 0; i < keywordsList.length ; i++) {
        for(let j = 0; j < wordsList.length ; j++) {
            if(keywordsList[i].toLowerCase() === wordsList[j].toLowerCase())
            {
                count++;
                break;
            }
        }
	 }
	 
     score=(count/keywordsList.length)*maxScore;
	 
	return res.status(200).json(wordsList);
});
//logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

