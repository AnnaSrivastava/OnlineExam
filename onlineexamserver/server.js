const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors =require('cors');
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Anushka:anushkaonlineexam@onlineexamcluster.a5kyj.mongodb.net/<dbname>?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

//load config
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
let keywordsList = [];
let answer="";
let score=0;
app.listen(
	PORT,
	console.log(`Server running ${process.env.NODE_ENV} mode on ${PORT}`)
);
app.get("/getAnswerScore?:productId", (req, res) => {
	return res.status(200).json({
		answer : answer,
		score: score,
	});
})

app.post("/keywordsList", (req, res) => {
	const {data} = req.body;
	keywordsList = data;
	console.log(keywordsList);
	return res.status(200).json("All OK");
})
app.post("/studentAnswer", (req, res) => {
	const {data} = req.body;
	answer = data;
	console.log(answer);
	let wordsList = [], ignoreList=["the","a","an","and","it","his","with","to","of","is","was","","by","then","them","he","she","may"];
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
	 
     score=Math.floor((count/keywordsList.length)*maxScore);
	 //console.log(score);
	return res.status(200).json(wordsList);
});
//logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

